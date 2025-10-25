import React, { useState } from "react";
import LeftPanel from "../Dashboard/components/LeftPanel";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import visa from '../../assets/visa.png';
import master from '../../assets/master.png';
import rupay from '../../assets/Rupay.png';
import upi from '../../assets/upi.png'
import ethBg7 from "../../assets/ethBg7.jpg"

export default function Deposit() {
  const [amount, setAmount] = useState("");
    const {user} = useAuth();
    const navigate = useNavigate();
    const numberInput = (event) => {
        const value = event.target.value;
      
        if (/^\d*$/.test(value) && !(value.length > 1 && value.startsWith('0'))) {
          setAmount(value);
        }
      };

      const handleBeforeInput = (event) => {
        if (/[^\d]/.test(event.data)) {
          event.preventDefault();
        }
      };

      const depositAmount = async()=>{
        const payload = {user,amount};
        const response  = await axios.post('http://localhost:5000/payment/pay',payload);
        if(response.data.isSuccess) window.location.href = response.data.url;
        else console.log("deposit failed");
      }

      const cancelDeposit = ()=>{
        setAmount("");
        navigate('/');
      }
    
  return (
    <div className="flex ">
      <LeftPanel />
    <div className="relative w-full h-[900px] border-l-[5px] border-[#ffffff] rounded-tl-[48px]" 
          style={{backgroundImage: `url(${ethBg7})`,
          backgroundSize: "cover",
          backgroundPosition:"center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode:"overlay",
          backgroundColor:"rgba(123,21,59,0.8"}} >
      <div className="p-6 rounded-2xl mt-[10%] mx-auto shadow-lg w-[850px] h-[450px] border" style={{backgroundColor:"rgba(100,100,100,0.3)",backdropFilter:"blur(30px)"}
      }>
        <h2 className="text-[#f2f2f2] text-4xl font-semibold flex items-center gap-2">
          💰 Deposit Currency
        </h2>
        <div className="mt-4">
          <label className="text-gray-100 font-bold text-sm">Amount</label>
          <div className="flex items-center mt-1 bg-[#2e2e8b] px-3 py-4 rounded-lg">
            <span className="text-white text-3xl">₹</span>
            <input
              onChange={numberInput}
              onBeforeInput={handleBeforeInput}
              value={amount}
              type="number"
              placeholder="Enter the amount"
              className="bg-transparent outline-none text-white w-full px-2"
            />
            <span className="text-gray-300">INR</span>
          </div>
        </div>
        <p className="text-gray-200 text-xs mt-2">
          Accept, Process & Deposit Digital Payments For Your Business.
        </p>
        <div className="flex justify-space-between justify-center h-[60px] gap-8 mt-10">
          <img src={visa} alt="Visa" className="w-[100px]" />
          <img src={master} alt="Mastercard" className="w-[100px]" />
          <img src={rupay} alt="Rupay" className="w-[100px]" />
          <img src={upi} alt="Bank" className="h-[100%] w-[8%]" />
        </div>
        <div className="flex justify-between gap-4 mt-10">
          <button onClick={depositAmount} className="w-1/2 h-[80px] text-[25px] py-2 rounded-lg bg-orange-500 text-white font-semibold">
            Deposit
          </button>
          <button onClick={cancelDeposit} className="w-1/2 py-2 text-[25px] rounded-lg bg-gray-600 text-white font-semibold">
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );
}