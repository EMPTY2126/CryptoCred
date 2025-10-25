import React, { useEffect, useState } from "react";
import astroPic from "../../assets/orangeAstro.png";
import orangeMan from "../../assets/orangeManSand.jpeg";
import { IoArrowBack } from "react-icons/io5";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";


const LoanRepayment = () => {
  const navigate = useNavigate();
  const { state : loans} = useLocation();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [repaymentType, setRepaymentType] = useState("");
  const {user} = useAuth();

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    return `${day}-${month}-${year}`;
  };
  return (
    <div className="relative w-full h-[980px] bg-gradient-to-tl flex justify-center from-[#2E236C] from-40% to-[#433D8B] to-90% border-l-[5px] border-[#ffffff] rounded-tl-[48px]">
      <div className=" pl-[10%] pr-[10%] pt-[3%] text-white rounded-2xl shadow-lg w-full m-[5%] relative overflow-hidden">
        
        {/* Background Image with Opacity */}
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center bg-no-repeat opacity-15"
          style={{ backgroundImage: `url(${orangeMan})`,
                    backgroundSize:"cover"}}
        > </div>

        {/* Content Above the Background */}
        <div className="relative z-10">
        <button
                  className="absolute top-6 left-6 flex items-center bg-[#fc5a02] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#d96924] transition"
                  onClick={() => navigate(-1)} // Navigate back
                >
                  <IoArrowBack className="mr-2 text-xl" /> Back
                </button>
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-2xl font-bold">Repayment</h1>
            <p className="text-gray-400">Make your repayment easily and securely</p>
          </div>

          <h2 className="text-lg font-semibold mb-4">Your Existing Loans</h2>

          {/* Scrollable Loan List */}
          <div className="max-h-[600px] overflow-y-auto space-y-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 pr-2">
            {loans.map((loan, index) => (
              <div
                key={index}
                className="bg-gray-800 p-8 rounded-lg flex justify-between items-center"
              >
                <div>
                  <h3 className="font-semibold">Loan #{index+1}</h3>
                  <p className="text-gray-300">Amount: {loan.loanAmount} ETH</p>
                  <p className="text-gray-300">Due Date: {formatDate(loan.dueDate)}</p>
                </div>
                <button
                  onClick={() => navigate("/repay",{state:loan})}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded"
                >
                  Repay Now
                </button>
              </div>
            ))}
          </div>

          {/* Repayment Options */}
          {selectedLoan && (
            <div className="mt-6 p-4 bg-gray-800 rounded-lg">
              <h2 className="text-lg font-semibold mb-3">Choose Repayment Option</h2>
              <select
                className="w-full p-2 text-black rounded-md"
                value={repaymentType}
                onChange={(e) => setRepaymentType(e.target.value)}
              >
                <option value="">Select an option</option>
                <option value="full">Full Repayment</option>
                <option value="partial">Partial Payment</option>
                <option value="emi">EMI (Monthly Installment)</option>
              </select>

              {repaymentType && (
                <button
                  className="mt-4 bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded w-full"
                  onClick={() => alert(`Processing ${repaymentType} for Loan #${selectedLoan}`)}
                >
                  Confirm {repaymentType === "full" ? "Full Payment" : repaymentType === "partial" ? "Partial Payment" : "EMI"}
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoanRepayment;
