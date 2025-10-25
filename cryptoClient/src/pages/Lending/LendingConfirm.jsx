import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import LeftPanel from "../Dashboard/components/LeftPanel";
import { MetaMaskContext } from "../../context/MetaMaskContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { IoArrowBack } from "react-icons/io5";
import { FaCheckCircle, FaTrash } from "react-icons/fa";
import cartoon1 from "../../assets/cartoon1.png";
import ethBg5 from "../../assets/ethBg5.jpg";
import axios from "axios";

function LendingConfirm() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { web3 } = MetaMaskContext();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const handleApprove = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const payload = {
      userId: user.userEmail,
      loanId: state.loanId,
      duration: state.duration,
    };
    setLoading(true);
    try {
      const tx = await web3.eth.sendTransaction({
        from: accounts[0],
        to: state.walletAddress,
        value: web3.utils.toWei(state.loanAmount, "ether"),
        gas: 300000,
      });

      if (tx) {
        const updateRequest = await axios.post(
          `http://localhost:5000/loan/updateloan`,
          payload
        );
        const noti = {ntype : "success", message : `${state.loanAmount} ETH Received from ${accounts[0]}`}
        const nres = await axios.post(`http://localhost:5000/notification/${state.userId}`, noti);
        console.log("success :",updateRequest);
        console.log("nRed :", nres.data);
        setLoading(false);
        state.heading = "Loan Approved Successfully!";
        state.secondheading = "You lended the requested amount successfully";
        navigate("/requestConfirmation",{state})
      }
    } catch (error) {
      console.error("Error making transfer:", error);
      setLoading(false);
      alert("Transfer failed!");
  };
}

  return (
    <div className="flex">
      <LeftPanel />
      <div
        className="flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-[#433D8B] to-[#17153B] object-contain border-l-[5px] border-[#ffffff] rounded-tl-[48px]"
        style={{
          backgroundImage: `url(${ethBg5})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode: "overlay",
          backgroundColor: "rgba(10,10,10,0.6)",
        }}
      >
        <button
          className="absolute top-6 left-[310px] flex items-center bg-[#fc5a02] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#d96924] transition"
          onClick={() => navigate(-1)} // Navigate back
        >
          <IoArrowBack className="mr-2 text-xl" /> Back
        </button>
        <div
          className="bg-[#17153B]  flex h-[650px] w-[1300px] p-6 rounded-3xl shadow-lg  shadow-[#fc5a02]"
          style={{
            background: "rgba(23,21,59,0.7)",
            backdropFilter: "blur(10px)",
          }}
        >
          {loading && (
            <div
              className="absolute top-[-1px] left-[-1px] rounded-lg shadow-sm mx-auto h-full w-full p-6 bg-black opacity-70 flex justify-center items-center"
              style={{ zIndex: 1 }}
            >
              <div
                className=" loading loading-infinity loading-lg"
                style={{ width: "70px", height: "70px" }}
              ></div>
            </div>
          )}
          <div className="flex flex-col items-center  p-[5%] lg:items-start w-full lg:w-1/2 rounded-3xl">
            <h1 className="text-[#fc5a02] text-6xl font-bold mb-3">
              Loan Approval
            </h1>
            <h2 className="text-white mt-8 text-3xl font-semibold mb-2">
              A Borrower is requesting for
            </h2>
            <p className="text-gray-300 mt-5 text-xl">
              Amount:{" "}
              <span className="text-white font-bold">{state.loanAmount} ETH </span>
            </p>
            <p className="text-gray-300 mt-2 text-xl">
              Loan Duration:{" "}
              <span className="text-white font-bold">{state.duration} Year </span>
            </p>
            <p className="text-gray-300 mt-2 text-xl">
              Collateral:{" "}
              <span className="text-white font-bold">{state?.colaterlType} </span>
            </p>
            <p className="text-gray-300 mt-2 text-xl">
              Interest Rate:
              <span className="text-white font-bold">{state.interestRate} % </span>
            </p>
            <p className="text-gray-300 mt-2 text-xl">
              Wallet Address:
              <span className="text-white font-bold"> {state?.walletAddress} </span>
            </p>

            <div className="flex gap-4 mt-8">
              <button
                onClick={handleApprove}
                className="bg-green-500 hover:bg-green-600 text-[20px] flex items-center text-white px-8 py-4 rounded"
              >
                {" "}
                <FaCheckCircle size={22} className="mr-3" /> Approve{" "}
              </button>
              <button
                onClick={() => navigate(-1)}
                className="bg-red-500 hover:bg-red-600 text-[20px] items-center  flex text-white px-8 py-4 rounded"
              >
                <FaTrash size={22} className="mr-3" /> Reject
              </button>
            </div>
          </div>

          <div className="flex justify-center w-1/2">
            <img
              src={cartoon1}
              className="max-w-sm rounded-lg "
              alt="Loan Request"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default LendingConfirm;
