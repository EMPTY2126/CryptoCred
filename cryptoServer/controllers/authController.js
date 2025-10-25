import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { genHS, verifyHS } from '../utils/pwdGenVerify.js'
import User from '../db/models/userModel.js'
import BalanceModel from '../db/models/userBalance.js'
import axios from 'axios';

dotenv.config();
const SECRET = process.env.SECRET;
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const currDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}

const changePass = async (req, res) => {
    const { pwd, newPwd, userEmail } = req.body;
    const user = await User.findOne({ userEmail });
    if (!user) res.status(200).json({ success: false, msg: 'user not found' }); //check for user
    else if (!verifyHS(pwd, user.hash, user.salt)) res.status(200).json({ success: false, msg: 'Wrong password' });
    else {
        const {hash, salt} = genHS(newPwd);
       try {
        const currUser = await User.findOneAndUpdate({ userEmail },
            {
                $set: {
                    salt : salt,
                    hash : hash
                },
            },
            { new: true }
        );

        const noti = {ntype : "info", message : `Pasword changed recently (${currDate()})`}
        const nres = await axios.post(`http://localhost:5000/notification/${userEmail}`, noti);
        console.log("changed pass");
        res.json({success:true, msg:"password changed"});
       } catch (error) {
        console.log("error in password change", error)
       }

    }
}

const signup = async (req, res) => {
    const { userName, pwd, userEmail, userPhone } = req.body; //get user detail
    if (!userName || !pwd) return res.status(201).json({ isSuccess: false, user: null, msg: "Invalid user name" });
    let isUser = await User.findOne({ userEmail });
    if (isUser !== null) return res.status(403).json({ isSuccess: false, msg: "User is already registred" });

    const { hash, salt } = genHS(pwd); //generate hash and salt 
    const newUser = new User({  // creating the new user
        userName,
        userImage: "nm",
        hash, salt,
        userEmail,
        userPhone,
    });
    try {
        const userId = await newUser.save(); // save the user in model and return user
        // console.log(userId);
        const newBalance = new BalanceModel({ id: userId, userEmail });
        const balance = await newBalance.save();
        newUser.balance = balance._id;
        await newUser.save();
        const newguy = await axios.get(`http://localhost:5001/cryptosupport/newuser/${userEmail}`);
        const newconversation = await axios.get(`http://localhost:5001/cryptosupport/newconversation/${userEmail}`);
        return res.status(201).json({ isSuccess: true, msg: "user created succesfully" });
    } catch (error) { //other error
        console.log("returned failuer in signup ", error);
        return res.status(500).json({ isSuccess: false, msg: "Internal server error" });
    }
}

const login = async (req, res) => {
    const { userEmail, pwd } = req.body;
    console.log(userEmail, pwd);
    if (userEmail === '' || pwd === '') res.status(200).json({ isSuccess: false, msg: 'Invalid user details' });
    try {
        const user = await User.findOne({ userEmail }).populate('balance').exec(); //destrecture data from request
        if (!user) res.status(200).json({ isSuccess: false, msg: 'user not found' }); //check for user
        else if (!verifyHS(pwd, user.hash, user.salt)) res.status(200).json({ isSuccess: false, msg: 'Wrong password' }); //verify password
        else {  //if user exist and password is correct 
            // delete user.hash; delete user.salt;
            const sendUser = {userEmail, userImage : user.userImage, userName : user.userName, balance : user.balance.balance, loanAmount : user.loanAmount} 
            console.log(sendUser);
            const token = jwt.sign({ user: sendUser }, SECRET, { expiresIn: '60h' }); //JWT token
            res.cookie('tokenn', token, { httpOnly: false, secure: false, maxAge: 3600000*24 });//setting cookie
            res.status(200).json({ sendUser, isSuccess: true, msg: 'user Logged in successfully' }); // returning user deatil
        }
    } catch (error) { // any other error
        console.log(error);
        res.status(500).json({ isSuccess: false, msg: 'Internal server error' });
    }
}

const authenticator = (req, res, next) => {
    const token = req.cookies.token; // get the cookie
    if (!token) res.status(401).json({ msg: 'Access denied' }); //check for token 
    try {
        jwt.verify(token, SECRET, (err, user) => { // verify token
            if (err) return res.status(403).json({ msg: 'Invaild token' }); // checks for any error in token
            req.user = user.user;
            next(); //procede next route
        });
    } catch (error) {
        return res.status(403).json({ msg: 'Server error from auth' });
    }

}


const googleLogin = async (req, res) => {
    const { tokenId } = req.body;
    console.log(tokenId)
    try {
        const { data } = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
            headers: {
                Authorization: `Bearer ${tokenId}`,
            },
        });
        console.log(data);
        let user = await User.findOne({ userEmail: data.email }).populate('balance').exec();
        let bal;
        if(user && user.balance) bal = user.balance.balance || 0;
        else bal = 0;
        let sendUser;
        if (!user) {
            user = new User({ userEmail: data.email, userName: data.name, userImage: data.picture });
            const userId = await user.save();
            const newBalance = new BalanceModel({ id: userId, userEmail: data.email });
            const balance = await newBalance.save();
            user.balance = balance._id;
            await user.save();
            user = { ...user, balance: newBalance.balance };
            sendUser = {userEmail:user.userEmail, userImage : user.userImage, userName : user.userName, balance : newBalance.balance, loanAmount : user.loanAmount}
            const newUser = await axios.get(`http://localhost:5001/cryptosupport/newuser/${data.email}`);
            const newconversation = await axios.get(`http://localhost:5001/cryptosupport/newconversation/${data.email}`);
            console.log("created newUser and newconversation");
        }else{
            sendUser = {userEmail:user.userEmail, userImage : user.userImage, userName : user.userName, balance : bal, loanAmount : user.loanAmount}
        }
        const token = jwt.sign({ user: sendUser }, SECRET, { expiresIn: '60h' }); //JWT token
        res.cookie('tokenn', token, { httpOnly: false, secure: false, maxAge: 3600000*24 });//setting cookie
        if (!user) res.status(200).json({ user, isSuccess: true, msg: 'user Logged in successfully', newUser: true });
        res.status(200).json({ sendUser, isSuccess: true, msg: 'user Logged in successfully' });// returning user deatil and token
    } catch (error) {
        console.error('Error in google login');
        console.log(error);
        res.status(500).json({ isSuccess: false, msg: 'internal server error' });
    }
}

const changeName = async (req, res) => {
    const { userEmail, userName } = req.body;
    try {
        const currUser = await User.findOneAndUpdate({ userEmail },
            {
                $set: {
                    userName: userName
                },
            },
            { new: true }
        );
        const noti = {ntype : "info", message : `Name changed recently (${currDate()})`}
        const nres = await axios.post(`http://localhost:5000/notification/${userEmail}`, noti);
        res.json({ success: true, msg: "name changed" });
    } catch (error) {
        console.log("error in changeName", error);
    }
}

export default {
    signup,
    login,
    authenticator,
    googleLogin,
    changeName,
    changePass
}