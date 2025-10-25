// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import LeftPanel from "../Dashboard/components/LeftPanel";
// import { useAuth } from "../../context/AuthContext";
// import axios from "axios";

// function LendingList() {
//   const navigate = useNavigate();
//   const {user} = useAuth();
//   const [loanRequests, setLoanRequests] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getLoans = async()=>{
//       const loans = await axios.get(`http://localhost:5000/loan/getloans/:${user.userEmail}`);
//       console.log(loans.data)
//       setLoanRequests(loans.data);
//       setLoading(false);
//     }
//     getLoans();
//   }, []);

//   return (
//     <div className="flex">
//       <LeftPanel />
//       { loading? <span className="flex justify-center items-center loading loading-infinity loading-xl"></span> :(
//       <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-[#433D8B] to-[#17153B] border-l-[5px] border-[#ffffff] rounded-tl-[48px]">
//         <div className="w-3/4 min-h-screen p-8 text-white">
//           <h1 className="text-5xl text-[#fc5a02] font-bold mb-[100px]">Borrowing List</h1>
//           <div className="bg-[#17153B] rounded-xl overflow-hidden">
//             <table className="w-full text-left">
//               <thead>
//                 <tr className="bg-[#fc590298]">
//                   <th className="p-4 font-semibold">Borrower's Name</th>
//                   <th className="p-4 font-semibold">Amount Requested</th>
//                   <th className="p-4 font-semibold">Duration</th>
//                   <th className="p-4 font-semibold">Details</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loanRequests.map((item, index) => (
//                   <tr key={index} className="border-t border-gray-600">
//                     <td className="p-4">{item.userName}</td>
//                     <td className="p-4">{item.loanAmount} ETH</td>
//                     <td className="p-4">{item.duration} months</td>
//                     <td 
//                       className="p-4 cursor-pointer text-orange-400 underline"
//                       onClick={() => navigate("/lendingApprove", { state: item })}
//                     >
//                       View Details
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//       )
//       }
//     </div>
//   );
// }

// export default LendingList;
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LeftPanel from "../Dashboard/components/LeftPanel";
import { useAuth } from "../../context/AuthContext";
import axios from "axios";
import bgImage from "../../assets/ethBg3.jpg"; // 🔥 Import your background image
import { IoArrowBack } from "react-icons/io5";
function LendingList() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loanRequests, setLoanRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getLoans = async () => {
      const loans = await axios.get(`http://localhost:5000/loan/getloans/:${user.userEmail}`);
      console.log(loans.data);
      setLoanRequests(loans.data);
      setLoading(false);
    };
    getLoans();
  }, []);

  return (
    <div className="flex">
      <LeftPanel />
      {loading ? (
        <span className="flex justify-center items-center loading loading-infinity loading-xl"></span>
      ) : (
        <div className="flex w-full justify-center items-center min-h-screen border-l-[5px] border-[#ffffff] rounded-tl-[48px] relative">
          
          {/* 🔥 Background Image with Opacity */}
          <div
            className="absolute top-0 left-0 w-full h-full bg-cover bg-no-repeat bg-left opacity-20"
            style={{ backgroundImage: `url(${bgImage})` }}
          >
            
          </div>
          <button
                    className="absolute top-6 left-12 flex items-center bg-[#fc5a02] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#d96924] transition"
                    onClick={() => navigate(-1)}
                  >
                    <IoArrowBack className="mr-2 text-xl" /> Back
                  </button>
          {/* 🔥 Content Above the Background */}
          <div className="w-3/4 min-h-screen p-8 text-white relative z-10">
           
            <h1 className="text-5xl text-[#fc5a02] font-bold mb-[100px]">Borrowing List</h1>
            <div className="bg-[#17153B] rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-[#fc590298]">
                    <th className="p-4 font-semibold">Borrower's Name</th>
                    <th className="p-4 font-semibold">Amount Requested</th>
                    <th className="p-4 font-semibold">Duration</th>
                    <th className="p-4 font-semibold">Details</th>
                  </tr>
                </thead>
                <tbody>
                  {loanRequests.map((item, index) => (
                    <tr key={index} className="border-t border-gray-600">
                      <td className="p-4">{item.userName}</td>
                      <td className="p-4">{item.loanAmount} ETH</td>
                      <td className="p-4">{item.duration} months</td>
                      <td
                        className="p-4 cursor-pointer text-orange-400 underline"
                        onClick={() => navigate("/lendingConfirm", { state: item })}
                      >
                        View Details
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default LendingList;
