// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import LeftPanel from "../Dashboard/components/LeftPanel";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { IoArrowBack } from "react-icons/io5";

// function RequestStatus() {
//   const navigate = useNavigate();
//   const {state} = useLocation()
//   const [loanRequests, setLoanRequests] = useState(state);
//   console.log(state);
//   return (
//     <div className="flex">
//       <LeftPanel />
//       {/* Background Image with Reduced Opacity */}
//       <div
//         className="flex w-full justify-center items-center min-h-screen text-white border-l-[5px] border-[#ffffff] rounded-tl-[48px] p-8"
//         style={{
//           // backgroundImage: `url(${bgImage})`,
//           backgroundImage: "url(https://img.freepik.com/premium-photo/ethereum-cryptocurrency-technology-abstract-background-concept-pink-blue-glow-logo-reflect-water-landscape-background-blue-3d-illustration-rendering_37129-2431.jpg)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//           backgroundBlendMode: "overlay",
//           backgroundColor: "rgba(23, 21, 59, 0.8)", // Dark overlay for better visibility
//         }}
//       >
//          <button
//                   className="absolute top-6 left-[310px] flex items-center bg-[#fc5a02] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#d96924] transition"
//                   onClick={() => navigate(-1)} // Navigate back
//                 >
//                   <IoArrowBack className="mr-2 text-xl" /> Back
//                 </button>
//         <div className="w-full">
//           <h2 className="text-4xl font-bold text-center text-[#fc5a02] mb-6">Your Loan Requests</h2>

//           {/* Scrollable Loan Cards Container */}
//           <div
//             className="h-[700px] w-full overflow-y-auto p-4 border border-[#fc5a02] rounded-xl shadow-md"
//             style={{
//               backgroundColor: "rgba(25, 22, 61, 0.7)", // Semi-transparent dark blue background
//               backdropFilter: "blur(0px)", // Adds a slight blur effect
//             }}
//           >
//             <div className="grid grid-cols-3 gap-6">
//               {loanRequests.length > 0 ? (
//                 loanRequests.map((loan, index) => (
//                   <div
//                     key={index}
//                     className="bg-[#17153B] p-6 rounded-lg shadow-lg border border-gray-600 flex flex-col items-center justify-center"
//                   >
//                     <h3 className="text-xl font-semibold mb-2 text-[#fc5a02]">Loan #{loan.loanId}</h3>
//                     <p><strong>Amount:</strong> {loan.loanAmount} ETH</p>
//                     <p><strong>Collateral:</strong> {loan.collateralType}</p>

//                     <p><strong>Interest Rate:</strong> {loan.interestRate}%</p>
//                     <p><strong>Wallet:</strong> {loan.walletAddress}</p>

//                     {/* Status Badge */}
//                     <div className={`mt-4 px-4 py-2 rounded-lg font-bold text-lg 
//                       ${loan.loanApproved ? "bg-green-500 text-white" : "bg-yellow-500 text-black"}`}>
//                       {loan.loanApproved ? "Approved" : "Pending Approval"}
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-400 text-center col-span-3">No loan requests found.</p>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default RequestStatus;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import LeftPanel from "../Dashboard/components/LeftPanel";
import { IoArrowBack } from "react-icons/io5";
import { FaClock, FaCheckCircle, FaTrash } from "react-icons/fa"; // Importing icons
import LoanReqStat from "../../assets/LoanReqStat.png"
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

function RequestStatus() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [loanRequests, setLoanRequests] = useState([]);
  const {user} = useAuth();

  // Delete handler (only for pending loans)
  const handleDelete = async(loanId) => {
    try {
      console.log("delete pressed 1")
      const res = await axios.delete(`http://localhost:5000/loan/deleteloanonly/${loanId}/${user.userEmail}`);
      console.log(res.data);
      if(res.data.success)
        {
      console.log("delete pressed 2")

          setLoanRequests(loanRequests.filter((loan) => loan.loanId !== loanId));
          console.log(`Loan ${loanId} deleted`);
        }   
    } catch (error) {
      console.log("error in handle delete", error);
    }
  };

  useState(()=>{
    const getLoans = async()=>{
      try {
        const res = await axios.get(`http://localhost:5000/loan/loanhistory/${user.userEmail}`);;
        setLoanRequests(res.data.loanHistory);
      } catch (error) {
        console.log("error in getLoans");
      }
    }
    getLoans(); 
  },[])

  return (
    <div className="flex">
      <LeftPanel />
      {/* Background Image with Reduced Opacity */}
      <div
        className="flex w-full justify-center items-center min-h-screen text-white border-l-[5px] border-[#ffffff] rounded-tl-[48px] p-8"
        style={{
          backgroundImage:
            `url(${LoanReqStat})`,
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

        <div className="w-full">
          <h2 className="text-4xl font-bold text-center text-[#fc5a02] mb-6">
            Your Loan Requests
          </h2>

          {/* Scrollable Loan Cards Container */}
          <div
            className="h-[700px] w-full overflow-y-auto p-4 border border-[#fc5a02] rounded-xl shadow-md"
            style={{
              backgroundColor: "rgba(25, 22, 61, 0.7)", // Semi-transparent dark blue background
              backdropFilter: "blur(0px)", // Adds a slight blur effect
            }}
          >
            <div className="grid grid-cols-3 gap-6">
              {loanRequests.length > 0 ? (
                loanRequests.map((loan, index) => (
                  <div
                    key={loan.loanId}
                    className="bg-[#17153B] p-6 rounded-lg shadow-lg border border-gray-600 flex flex-col items-center justify-center"
                  >
                    <h3 className="text-xl font-semibold mb-2 text-[#fc5a02]">
                      Loan #{index + 1}
                    </h3>
                    <p className="text-gray-400 text-sm">Loan ID: {loan.loanId}</p>
                    <p className="text-lg">
                      <strong>Amount:</strong> {loan.loanAmount} ETH
                    </p>

                    {/* Status & Delete Buttons */}
                    <div className="flex mt-4 space-x-4">
                      <button onClick={() => navigate("/reqSingle",{state:loan.loanId})}
                        className={`px-4 py-2 font-bold rounded-lg text-lg flex items-center gap-2 transition ${
                          loan.loanApproved
                            ? "bg-green-500 text-white hover:bg-green-600"
                            : "bg-yellow-500 text-black hover:bg-yellow-600"
                        }`}
                      >
                        {loan.loanApproved ? <FaCheckCircle /> : <FaClock />}
                        {loan.loanApproved ? "Approved" : "Pending"}
                      </button>

                      {/* Show Delete Button Only for Pending Loans */}
                      {!loan.loanApproved && (
                        <button
                          className="px-4 py-2 bg-red-500 text-white rounded-lg font-bold flex items-center gap-2 hover:bg-red-600 transition"
                          onClick={() => handleDelete(loan.loanId)}
                        >
                          <FaTrash /> Delete
                        </button>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400 text-center col-span-3">
                  No loan requests found.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestStatus;
