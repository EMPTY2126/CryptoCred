import axios from "axios";

export const historyMaker = async( invoice,name,date,desc,amount,via,type, userEmail)=>{
    let history = {invoice,name,date,desc,amount,via,type,userEmail}
    try {
        const res = await axios.post('http://localhost:5000/loan/userhistory',history);
        console.log("from 7 userHistory :",res.data);
        return res.data.success
    } catch (error) {
        console.log("Error in userHistory post");
        return false;
    }

}