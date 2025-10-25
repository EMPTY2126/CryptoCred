import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import LeftPanel from "../Dashboard/components/LeftPanel";
import ethBg7 from "../../assets/ethBg7.jpg"
import axios from "axios";
import { MetaMaskContext } from "../../context/MetaMaskContext";
import { historyMaker } from "../../utils/userHistory";
import { useAuth } from "../../context/AuthContext";

function LendingStatus(){
  const navigate = useNavigate();
  const { state: loan_id } = useLocation();
  const [loading, setLoading] = useState(false);
  const [loan, setLoan] = useState("");
  const {web3, metaId} = MetaMaskContext();
  const [pay,setPay] = useState(0);
  const {user} = useAuth();

  const currDate = ()=>{
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0'); 
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  }

  const sendEth = async()=>{
    setLoading(true);
    const toAddress = loan.walletAddress;
    console.log(toAddress, loan);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });

    try {
      const tx = await web3.eth.sendTransaction({
        from: accounts[0],
        to: toAddress,
        value: web3.utils.toWei(pay, "ether"), 
        gas: 300000,
      }); 
      if(tx) {
        await historyMaker(loan.loanId, "Abhishek", currDate(), `An amount of ${pay}ETH transfered from ${accounts[0]} to ${toAddress}`, pay, "MetaMask", "Sent", user.userEmail);
        await axios.delete(`http://localhost:5000/loan/deleteloan/${loan_id.loanId}/${user.userEmail}`);
      }
      console.log("✅ Transfer successful!", tx);
      alert("Transfer successful!");
    } catch (error) {
      console.error("Error making transfer:", error);
      alert("Transfer failed!");
    } finally {
      setLoading(false);
    }
  }

  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return `${String(date.getDate()).padStart(2, "0")}-${String(date.getMonth() + 1).padStart(2, "0")}-${date.getFullYear()}`;
  };

  // Calculate total amount with Compound Interest
  const calculateTotalRepayment = (amt, interest, duration) => {
    const P = amt;
    const r = interest / 100 / 12; // Monthly interest rate
    const n = duration; // Duration in months
    const totalAmount = P * Math.pow(1 + r, n);
    let res =  Math.ceil(totalAmount * 1000000) / 1000000;
    setPay(res);
  };
  
  useEffect(()=>{
    const getLoan = async()=>{
      const res = await axios.get(`http://localhost:5000/loan/getloan/${loan_id.loanId}`);
      let ref = res.data.loan;
      calculateTotalRepayment(ref.loanAmount, ref.interestRate, ref.duration);
      setLoan(ref);
    }
    getLoan();
  },[])

  

  return (
    <div className="flex">
      <LeftPanel />
      <div
        className="relative w-full h-[900px]  border-l-[5px] border-[#ffffff] rounded-tl-[48px] p-8"
        style={{
          backgroundImage: `url(${ethBg7})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(123,21,59,0.8",
        }}
      >
        <div
          className=" relative h-4/5 w-1/2 mx-auto bg-gray-900 shadow-[#fc5a02] p-6 rounded-lg shadow-sm"
          style={{ backgroundColor: "rgba(23,21,59,0.7)" }}
        >
                {loading && (
        <div className="absolute top-[-1px] left-[-1px] rounded-lg shadow-sm mx-auto h-full w-full p-6 bg-black opacity-70 flex justify-center items-center" style={{ zIndex: 1 }}>
          <div className=" loading loading-infinity loading-lg" style={{ width: '70px', height: '70px' }}></div>
        </div>
        )}
          <button
            className="absolute top-4 left-4 flex items-center bg-[#fc5a02] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#d96924] transition"
            onClick={() => navigate(-1)}
          >
            <IoArrowBack className="mr-2 text-xl" /> Back
          </button>

          <h2 className="text-2xl mt-[12%] font-bold text-[#fc5a02] text-center">
            Confirm Loan Repayment
          </h2>

          {/* Loan Details */}
          <div
            className="p-[4%] mt-[4%] text-xl border rounded-lg"
            style={{
              backgroundColor: "rgba(0,0,0,0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <p className="text-gray-300">
              <strong>Loan ID:</strong>{" "}
              <span className="text-gray-400 text-2xl">{loan.loanId}</span>
            </p>
            <p className="text-gray-300">
              <strong>Amount:</strong> {loan.loanAmount} ETH
            </p>
            <p className="text-gray-300">
              <strong>Duration:</strong> {loan.duration} months
            </p>
            <p className="text-gray-300">
              <strong>Interest Rate:</strong> {loan.interestRate}%
            </p>
            <p className="text-gray-300">
              <strong>Due Date:</strong> {formatDate(loan.dueDate)}
            </p>
            <p className="text-gray-300">
              <strong>Total Amount(with interest):</strong> {pay} ETH
            </p>
          </div>

          {/* Repayment Options */}
          <div className="mt-20 flex gap-10">
          <button
              className="mt-4 bg-[#fc5a02] hover:bg-[#f79561] p-[3%] text-white font-bold  rounded w-full"
              onClick={()=> navigate('/lendingList')}
            >
              no idea
            </button>
            <button
              className="mt-4 bg-[#fc5a02] hover:bg-[#f49b6c] p-[3%] text-white font-bold  rounded w-full"
              onClick={()=>navigate('/lending')}
            >
              Loans List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LendingStatus;
