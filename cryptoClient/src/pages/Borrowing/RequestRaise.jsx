import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LeftPanel from '../Dashboard/components/LeftPanel';
import { MetaMaskContext } from '../../context/MetaMaskContext';
import { IoArrowBack } from "react-icons/io5"; // Import back icon
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import { duration } from '@mui/material';

function RequestRaise() {
  const navigate = useNavigate();
  const {metaId, setMetaId} = MetaMaskContext();
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    amount: '',
    collateral: '',
    repaymentPeriod: '',
    interestRate: '',
    walletAddress: metaId,
    loanId:""
  });


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    formData.userName = user.userName;
    formData.userId = user.userEmail;
    formData.walletAddress = metaId;
    const res = await axios.post('http://localhost:5000/loan/requestloan', formData);
    formData.loanId = res.data.loan.loanId;
    const newFormData = {
      loanAmount:formData.amount,
      colaterlType:formData.collateral,
      duration:formData.repaymentPeriod,
      interestRate:formData.interestRate,
      walletAddress:formData.walletAddress,
      loanId:formData.loanId,
      heading:"Request Submitted Successfully!",
      secondheading: "Your Ethereum loan request has been successfully submitted.",
    }
    navigate('/requestConfirmation', { state: newFormData }); // Pass form data
  };


    useEffect(() => {
      const getAccount = async()=>{
        try {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setMetaId(accounts[0]);
        } catch (error) {
          console.error("Error connecting to MetaMask:", error);
        }
      }
      if (window.ethereum) {
        if(!metaId) {
          getAccount();
        };
      }
    }, []);

  return (
    <div className='flex'>
      <LeftPanel />
      <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-[#433D8B] to-[#17153B] border-l-[5px] border-[#ffffff] rounded-tl-[48px]">
         <button
                  className="absolute top-6 left-[310px] flex items-center bg-[#fc5a02] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#d96924] transition"
                  onClick={() => navigate(-1)} // Navigate back
                >
                  <IoArrowBack className="mr-2 text-xl" /> Back
                </button>
        <div className="m-10 hero border bg-gradient-to-br from-[#19163d] to-[#c2c2c2] h-[80%] w-[90%] rounded-xl p-6  items-center" style={{backgroundImage:"url(https://w0.peakpx.com/wallpaper/262/444/HD-wallpaper-artificial-intelligence-cyber-intelligence.jpg)", 
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(83, 21, 19, 0.8)",
          }}>
          <div className="flex flex-col items-center text-center w-full">
            <h1 className="text-7xl font-bold text-[#fc5a02] text-center">Raise a Loan Request</h1>
            <p className="py-4 text-white text-center">Fill out the details to request a loan in Ethereum.</p>
            <form onSubmit={handleSubmit} className="space-y-8 p-5 w-[60%]">
              <input type="number" name="amount" placeholder="Loan Amount (ETH)" value={formData.amount} onChange={handleChange} className="bg-transparent text-white input input-bordered w-full" style={{backgroundColor:"rgba(100,100,100,0.5)",backdropFilter: "blur(20px)"}} required />
              <input type="text" name="collateral" placeholder="Collateral Type" value={formData.collateral} onChange={handleChange} className="bg-transparent text-white input input-bordered w-full" style={{backgroundColor:"rgba(100,100,100,0.5)",backdropFilter: "blur(20px)"}} required />
              <input type="number" name="repaymentPeriod" placeholder="Repayment Period (months)" value={formData.repaymentPeriod} onChange={handleChange} className="bg-transparent text-white input input-bordered w-full" style={{backgroundColor:"rgba(100,100,100,0.5)",backdropFilter: "blur(20px)"}} required />
              <input type="number" name="interestRate" placeholder="Expected Interest Rate (%)" value={formData.interestRate} onChange={handleChange} className="bg-transparent text-white input input-bordered w-full" style={{backgroundColor:"rgba(100,100,100,0.5)",backdropFilter: "blur(20px)"}} required />
              <input type="text" name="walletAddress" value={metaId} disabled className="input bg-[#c9c9c9] input-bordered w-full" style={{backgroundColor:"rgba(100,100,100,0.5)",backdropFilter: "blur(20px)"}} required />
              <button type="submit" className="btn pb-[6%] text-center items-center text-xl btn-primary w-full bg-[#ffffff] hover:bg-[#fc5a02] p-[2%] text-[#17153B]">Submit Request</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestRaise;
