import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanel from "../Dashboard/components/LeftPanel";
import { IoArrowBack } from "react-icons/io5";
import { FaClock, FaCheckCircle } from "react-icons/fa"; // Import icons
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import bgEth from '../../assets/bgEth.png'

function SingleRequestStatus() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loan, setLoan] = useState(null);

  useEffect(() => {
    const fetchLoanDetails = async () => {
      try {
        // console.log(state);
        let res = await axios.get(
          `http://localhost:5000/loan/getloan/${state}`
        );
        setLoan(res.data.loan);
      } catch (error) {
        console.error("Error fetching loan details:", error);
      }
    };

    fetchLoanDetails();
  }, []);

  // Function to calculate total amount with compound interest
  const calculateTotalRepayment = () => {
    const P = loan.loanAmount;
    const r = loan.interestRate / 100 / 12; // Monthly interest rate
    const n = loan.duration; // Duration in months
    const totalAmount = P * Math.pow(1 + r, n);
    return totalAmount.toFixed(4);
    
  };

  return (
    <div className="flex">
      <LeftPanel />
      {/* Background Image with Reduced Opacity */}
      <div
        className="flex w-full justify-center items-center min-h-screen text-white border-l-[5px] border-[#ffffff] rounded-tl-[48px] p-8"
        style={{
          backgroundImage:
            `url(${bgEth})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(23, 21, 59, 0.8)", // Dark overlay for better visibility
        }}
      >
        {/* Back Button */}
        <button
          className="absolute top-6 left-[310px] flex items-center bg-[#fc5a02] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#d96924] transition"
          onClick={() => navigate(-1)}
        >
          <IoArrowBack className="mr-2 text-xl" /> Back
        </button>

        {/* Loan Details Card */}
        {loan ? (
          <div className="bg-[#17153B] p-8 rounded-xl shadow-lg w-[500px] text-center border border-[#fc5a02]">
            {/* Loan Status with Icon */}
            <div
              className={`flex items-center justify-center gap-2 px-4 py-2 text-lg font-bold rounded-lg mb-4 ${
                loan.approved ? "bg-green-500 text-white" : "bg-yellow-500 text-black"
              }`}
            >
              {loan.approved ? <FaCheckCircle size={22} /> : <FaClock size={22} />}
              {loan.approved ? "Approved" : "Pending"}
            </div>

            {/* Loan Details */}
            <h2 className="text-2xl font-bold text-[#fc5a02]">Loan Details</h2>
            <p className="text-gray-400 text-sm mt-2">Loan ID: {loan.loanId}</p>

            <div className="bg-[#19163d] p-4 rounded-lg mt-4 border border-gray-600 text-left">
              <p className="mb-2"><strong>Collateral:</strong> {loan.colaterlType}</p>
              <p className="mb-2"><strong>Created At:</strong> {new Date(loan.createdAt).toLocaleDateString()}</p>
              <p className="mb-2"><strong>Repayment Duration:</strong> {loan.duration} months</p>
              <p className="mb-2"><strong>Interest Rate:</strong> {loan.interestRate}%</p>
              <p className="mb-2"><strong>Loan Amount:</strong> {loan.loanAmount} ETH</p>
              <p className="text-lg font-semibold mt-4 text-[#fc5a02]">
                Total Payable: {calculateTotalRepayment(loan.loanAmount, loan.interestRate, loan.duration)} ETH
              </p>
              {loan.approved && <button
                  onClick={() => navigate("/repay",{state:loan})}
                  className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 mt-4 px-4 rounded"
                >
                  Repay Now
                </button>}
            </div>
          </div>
        ) : (
          <div className="text-gray-400"> <LoadingSpinner/>Loan Details...</div>
        )}
      </div>
    </div>
  );
}

export default SingleRequestStatus;
