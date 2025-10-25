import LeftPanel from "../Dashboard/components/LeftPanel";


import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const RequestConfirmation = () => {
  const { state } = useLocation();
  const navigate = useNavigate();


  return (
    <div className="flex">
       <LeftPanel />
    <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-[#433D8B] to-[#17153B] border-l-[5px] border-[#ffffff] rounded-tl-[48px]">
      <div className="bg-[#19163d] p-8 rounded-xl shadow-md w-[500px] text-center border border-[#fc5a02]">
         <img className="ml-[100px] h-[240px]" src="https://static.vecteezy.com/system/resources/thumbnails/025/210/801/small_2x/check-mark-icon-transparent-background-checkmark-icon-approved-symbol-confirmation-sign-design-elements-checklist-positive-thinking-sign-correct-answer-verified-badge-flat-icon-png.png"  alt="confirmation Image"></img>
        <h2 className="text-2xl font-bold mt-4 text-[#fc5a02]">{state.heading}</h2>
        <p className="text-gray-300 mt-2">{state.secondheading}</p>

        <div className="bg-[#17153B] p-4 rounded-lg mt-4 border border-gray-600">
          <h3 className="text-lg font-semibold mb-2 text-[#fc5a02]">Loan Request Details</h3>
          <p><strong>Loan Amount:</strong> {state.loanAmount} ETH</p>
          <p><strong>Collateral:</strong> {state.colaterlType}</p>
          <p><strong>Duration:</strong> {state.duration} months</p>
          <p><strong>Interest Rate:</strong> {state.interestRate}%</p>
          <p><strong>Wallet Address:</strong> {state.walletAddress}</p>
        </div>

        <div className="flex justify-center gap-4 mt-6">
          <button onClick={() => navigate('/')} className="bg-[#fc5a02] px-4 py-2 rounded-lg text-white hover:bg-[#e54e00]">Go to Dashboard</button>
          <button onClick={() => navigate('/requestStatus', { state })} className="bg-[#17153B] border border-gray-600 px-4 py-2 rounded-lg text-white hover:bg-[#2a255f]">
            Check Status
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default RequestConfirmation;
