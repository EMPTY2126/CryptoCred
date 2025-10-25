import LoanModel from "../db/models/loanModel.js"
import User from "../db/models/userModel.js";
import { generateRandomString } from "./utils/balanceUtils.js";
import axios from "axios";

const currDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
}


const getHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({ userEmail: userId });
        res.json({ history: user.history });
    } catch (error) {
        console.log("error in loancontroller getHistory", error);
    }
}

const addHistory = async (req, res) => {
    let { invoice, name, date, desc, amount, via, type, userEmail } = req.body;
    amount = amount.toString();
    const category = type;
    const newHistory = {
        invoice,
        name,
        date,
        desc,
        amount,
        via,
        category
    };

    const updateUser = await User.findOne({ userEmail });
    try {
        updateUser.history.push(newHistory);
        await updateUser.save();
        res.json({ success: true });
    } catch (error) {
        res.json({ success: false });
        console.log("error in loancontroller addHistory", error);
    }
}
const loanStatus = async (req, res) => {
    const { loanId } = req.params;
    try {
        const loan = await LoanModel.findOne({ loanId: loanId });
        console.log(loan.approved);
        res.json({ approved: loan.approved });
    } catch (error) {
        console.log("error in loanStatus", error);
    }
}

const getLoanHistory = async (req, res) => {
    const { userId } = req.params;
    try {
        const loan = await User.findOne({ userEmail: userId });
        res.json({ loanHistory: loan.loanHistory });
    } catch (error) {
        console.log("error in loanStatus", error);
    }
}

// function generateRandomString() {
//     const numbers = '0123456789'; 
//     let result = 'OP';
//     for (let i = 0; i < 8; i++) result += numbers.charAt(Math.floor(Math.random() * numbers.length));
//     return result;
//   }

const loanRequest = async (req, res) => {
    const data = req.body;
    const loanId = generateRandomString();
    const newLoan = new LoanModel({
        userName: data.userName,
        userId: data.userId,
        loanAmount: data.amount,
        duration: data.repaymentPeriod,
        interestRate: data.interestRate,
        walletAddress: data.walletAddress,
        colaterlType: data.collateral,
        loanId
    });

    let newLoanHistory = {
        loanId,
        loanAmount: data.amount,
        duration: data.repaymentPeriod,

    }
    try {
        await newLoan.save();
        const user = await User.findOne({ userEmail: data.userId });
        user.loanHistory.push(newLoanHistory);
        await user.save();
        res.json({ loan: newLoan });
    } catch (error) {
        console.log("error in loanRequest", error);
    }

}

const getLoans = async (req, res) => {
    const { userId } = req.params;
    try {
        const loans = await LoanModel.find({ userId: { $ne: userId }, approved: false });
        res.json(loans);
    } catch (error) {
        console.log("error in getLoan", error);
    }
}

const getLoan = async (req, res) => {
    const { loanId } = req.params;
    try {
        const loan = await LoanModel.findOne({ loanId });
        res.json({ loan });
    } catch (error) {
        console.log("error in getLoan", error);
    }
}

const updateLoan = async (req, res) => {
    const { userId, loanId, duration } = req.body;
    try {
        const loan = await LoanModel.findOneAndUpdate(
            { loanId },
            {
                $set: {
                    borrower: userId,
                    borrowedDate: currDate(),
                    approved: true
                }
            },
            { new: true }
        );

        const newHistory = { invoice: loanId, date: currDate(), desc: `Loan lent to ${userId} for a duration of ${duration}`, amount: loan.loanAmount, via: "MetaMask", category: "Sent" };

        const approvedList = { loanId: loanId, address: loan.walletAddress, duration }

        const updatedUser = await User.findOneAndUpdate(
            { userEmail: userId },
            {
                $push: {
                    history: newHistory,
                    approvedList: approvedList
                }
            },
            { new: true }
        );

        const newHis = {
            invoice: loanId, date: currDate(), desc: `Loan borrowed from ${userId} for a duration of ${duration}`, amount: loan.loanAmount, via: "MetaMask", category: "Received"
        }

        const updateOtherUser = await User.findOneAndUpdate(
            { userEmail: loan.userId, 'loanHistory.loanId': loanId },
            {
                $set: {
                    'loanHistory.$.loanApproved': true,
                    'loanHistory.$.dueDate': currDate(),
                },
                $inc: {
                    loanAmount: loan.loanAmount,
                },
                $push: {
                    history: newHis
                }
            },
            { new: true }
        )
        res.json({success:true, msg: "updated successfully"});
    } catch (error) {
        console.log("error in updateLoan", error);
    }
}

const deleteLoan = async (req, res) => {
    const { loanId, userId } = req.params;
    const loan = await LoanModel.findOne({ loanId: loanId });
    console.log(loan);
    try {
        const noti = {ntype : "success", message : `${loan.loanAmount} ETH Repayed by ${loan.walletAddress}`}
        const nres = await axios.post(`http://localhost:5000/notification/${loan.borrower}`, noti);
        const deleteLoan = await LoanModel.findOneAndDelete({ loanId });
        await User.updateOne(
            { userEmail: loan.borrower, "approvedList.loanId": loanId },
            { $pull: { approvedList: { loanId: loanId } } }
        );

        await User.updateOne(
            { userEmail: userId },
            {
                $pull: { loanHistory: { loanId: loanId } }
            }
        );
        res.json({ success: true, msg: "loan request deletes successfully" });
    } catch (error) {
        console.log("error in loanController at loanDelete function", error);
        res.json({ success: false, msg: "internal server error" });
    }
}

const deleteLoanNoNotification = async (req, res) => {
    const { loanId, userId } = req.params;
    try {
        const deleteLoan = await LoanModel.findOneAndDelete({ loanId });
        await User.updateOne(
            { userEmail: userId },
            {
                $pull: { loanHistory: { loanId: loanId } }
            }
        );
        res.json({ success: true, msg: "loan request deletes successfully" });
    } catch (error) {
        console.log("error in loanController at loanDelete function");
        res.json({ success: false, msg: "internal server error" });
    }
}

const getApproved = async (req, res) => {
    const { userId } = req.params;
    const response = await User.findOne({ userEmail: userId });
    res.json({ approvedList: response.approvedList });

}


export default {
    loanRequest,
    getLoans,
    getHistory,
    loanStatus,
    getLoanHistory,
    updateLoan,
    getLoan,
    deleteLoan,
    addHistory,
    getApproved,
    deleteLoanNoNotification
}