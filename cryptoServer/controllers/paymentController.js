import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import SHA256 from 'crypto-js/sha256.js';
import BalanceModel from '../db/models/userBalance.js'
import balanceUtil from './utils/balanceUtils.js'
import User from "../db/models/userModel.js";

const salt_key = '96434309-7796-489d-8924-ab56988a6076';
const salt_index = 1
const merchantId = 'PGTESTPAYUAT86'
const phonePe_url = 'https://api-preprod.phonepe.com/apis/pg-sandbox'
const APIpayendpoint = "/pg/v1/pay";
const APIpaystatusendpoint = "/pg/v1/status";

const my_url = "http://localhost:3000";

const depositInit = async(req, res) => {
    let {user,amount} = req.body;
    user = user.userEmail;
    let amountInt = parseInt(amount, 10); 
    const merchantTransactionId = uuidv4();
    let payload = {
        merchantId: merchantId,
        merchantTransactionId: merchantTransactionId,
        merchantUserId: user,
        amount: amountInt*100,
        redirectUrl: `${my_url}/paymentstatus/${merchantTransactionId}`,
        redirectMode: "REDIRECT",
        mobileNumber: "9945242341",
        paymentInstrument: {
            type: "PAY_PAGE",
        },
    };
    const bufferObj = Buffer.from(JSON.stringify(payload), "utf8");
    const base64EncodedPayload = bufferObj.toString("base64");

    let string = base64EncodedPayload + "/pg/v1/pay" + salt_key;
    let sha256_val = SHA256(string);
    let xVerifyChecksum = sha256_val + "###" + salt_index;

    const options = {
        method: "post",
        url: `${phonePe_url}${APIpayendpoint}`,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-VERIFY": xVerifyChecksum
        },
        data: {
            request: base64EncodedPayload,
        }
    };

  const newHistory = {
    transactionId: merchantTransactionId,
    amount: amountInt,
    status: false,
    description: "not available rn"
  }


    try {
        const transactionRes = await balanceUtil.addTransaction(user,newHistory);
        const response = await axios.request(options);
        res.status(200).json({
          isSuccess: true,
          url: response.data.data.instrumentResponse.redirectInfo.url
        }); 
      } catch (error) {
        // console.error(error);
        console.log("error on payment")
        res.status(200).json({
          isSuccess: false
        });
      }
};

const getBalance = async(req,res) =>{
  const {userEmail} = req.params;
  try {
    const response = await BalanceModel.findOne({userEmail});
    const ress = await User.findOne({userEmail});
    res.json({balance : response.balance, loan : ress.loanAmount});
  } catch (error) {
    console.log("error from getBalance" , error);
    res.status(500).json({msg:"cant fetch the balance"});
  }
}

const getStatus = async (req,res)=>{
    const {userId ,merchenttransactionId} = req.body;
    let string = `/pg/v1/status/${merchantId}/${merchenttransactionId}` + salt_key;
    let sha256_val = SHA256(string);
    const x_verify = sha256_val + "###" + salt_index;
    const options = {
        method: "get",
        url: `${phonePe_url}${APIpaystatusendpoint}/${merchantId}/${merchenttransactionId}`,
        headers: {
            accept: "application/json",
            "Content-Type": "application/json",
            "X-MERCHANT-ID":merchenttransactionId,
            "X-VERIFY": x_verify
        }
    };

    try {
        const isBalance = await BalanceModel.findOne({userEmail:userId});
        const isTransaction = isBalance.history.find(tx => tx.transactionId === merchenttransactionId);
        const response = await axios.request(options);
        let bal = isBalance.balance;
        if(!isTransaction.status) { 
          bal = balanceUtil.editTransaction(userId, merchenttransactionId, response, isBalance.balance);
        }
        res.json({success:true, newBalance : bal, transaction:response.data});
      } catch (error) {
        res.json({success:false});
        console.error(error);
      }
}

const withdraw = async(req,res)=>{
  const {userId,amount} = req.body;
  const updateBalance = await BalanceModel.findOneAndUpdate(
    {userId},
    {$inc :{
      balance : -amount
    }},
    {new :true}
  )
  console.log("balance updated");
  res.json({success:true, msg : "updated balance"})
}

export default {getStatus, depositInit, getBalance, withdraw}