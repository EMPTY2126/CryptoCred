import React from 'react'
import { useNavigate } from 'react-router-dom';
import bgImage from "../../assets/ethBg4.jpg"
import LeftPanel from '../Dashboard/components/LeftPanel';
import { IoArrowBack } from "react-icons/io5"; // Import back icon


function LendingSelect() {
    const navigate = useNavigate();
    return (
        <div className="flex">
          <LeftPanel />
          <div
            className="relative w-full h-[900px] bg-gradient-to-tl flex justify-center from-[#2E236C] from-40% to-[#433D8B] to-90% border-l-[5px] border-[#ffffff] rounded-tl-[48px] p-6"
            style={{
              backgroundImage: `url(${bgImage})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundRepeat: "no-repeat",
              backgroundBlendMode: "overlay",
              backgroundColor: "rgba(23, 21, 59, 0.5)", // Dark overlay for better visibility
            }}
          >
            {/* Back Button */}
            <button
              className="absolute top-6 left-6 flex items-center bg-[#fc5a02] text-white px-4 py-2 rounded-lg shadow-md hover:bg-[#d96924] transition"
              onClick={() => navigate(-1)} // Navigate back
            >
              <IoArrowBack className="mr-2 text-xl" /> Back
            </button>
    
            {/* Main Content */}
            <div className="flex items-center justify-center m-10 w-full">
              <button
                className="btn card rounded-box grid h-[400px] text-white grow place-items-center bg-[#2E236C] transition-all duration-200 ease-in-out hover:bg-[#fc5a02] hover:text-[#17153B] hover:text-2xl"
                onClick={() => navigate("/lending")}
              >
                Approve Loan
              </button>
              <div className="divider divider-horizontal">OR</div>
              
              <button
                className="btn card rounded-box grid grow place-items-center h-[400px] bg-[#2E236C] text-white transition-all duration-200 ease-in-out hover:bg-[#fc5a02] hover:text-[#17153B] hover:text-2xl"
                onClick={() => navigate("/lendingApprove")}
              >
                Approved Status
              </button>
            </div>
          </div>
        </div>
      );
}

export default LendingSelect