import BalanceModel from '../../db/models/userBalance.js'
import User from '../../db/models/userModel.js';

export function generateRandomString() {
    const numbers = '0123456789'; 
    let result = 'OP';
    for (let i = 0; i < 8; i++) result += numbers.charAt(Math.floor(Math.random() * numbers.length));
    return result;
  }

const addTransaction = async(userEmail, transaction) =>{
    try {
        const balanceDoc = await BalanceModel.findOne({ userEmail });
        if (!balanceDoc) return;
        balanceDoc.history.push(transaction);
        await balanceDoc.save();
    } catch (err) {
        console.error("Error adding transaction to history:", err);
    }
}

const currDate = ()=>{
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

const editTransaction = async(userEmail, transactionId, updatedTransaction, currBalance) =>{
    let amount = parseInt(updatedTransaction.data.data.amount/100);
    if(!amount) amount = 0;
    let newBalance = currBalance + amount;
    let user;
    try {
        user = await User.findOne({userEmail});
        const newHistory = {
            invoice: generateRandomString(),
            date: currDate(),
            desc : "Amount transfered to your account via phonepe",
            name: user.userName,
            amount,
            via: "PhonePe",
            category: "Received"
        }
        user.history.push(newHistory);
        await user.save();
    } catch (error) {
        console.log("error in balanceutil user history update", error)
    }

    try {
        const balanceDoc = await BalanceModel.findOneAndUpdate(
            { userEmail, 'history.transactionId': transactionId },
            {
                $set: {     
                    'history.$.status': true,
                    balance : newBalance
                }
            },
            { new: true }
        );

        if (!balanceDoc) return 0;
        return newBalance;
    } catch (err) {
        console.error("Error updating transaction:", err);
    }
}
export default {addTransaction, editTransaction};
