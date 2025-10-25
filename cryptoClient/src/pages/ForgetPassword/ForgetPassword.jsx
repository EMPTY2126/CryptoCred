import React, { useState } from "react";
import cryptoCredLogoOrange from "../../assets/cryptocredLogoOrange.png";
import ethereumBg from "../../assets/Ethereum.png";
import { Navigate, useNavigate } from "react-router-dom";

function ForgetPassword() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const navigate = useNavigate();

  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value.slice(0, 1); // Allow only one digit per box
    setOtp(newOtp);

    // Move focus to the next input field
    if (value && index < otp.length - 1) {
      document.getElementById(`otp-${index + 1}`).focus();
    }
  };

  const handleVerify = () => {
    const otpValue = otp.join("");
    console.log("Entered OTP:", otpValue);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#17153B]" style={{
      backgroundImage: `url(${ethereumBg})`,
      // backgroundSize: "contain",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}>
      
      <div className="bg-white  p-8 rounded-xl shadow-lg w-[600px] text-center">
        {/* Logo */}
        <img src={cryptoCredLogoOrange} alt="CryptoCred Logo" className="mx-auto mb-2" />

        {/* Instruction */}
        <h2 className="text-lg text-gray-700">Please enter the One-time password to verify your account</h2>

        {/* OTP Inputs */}
        <div className="flex justify-center gap-2 my-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              id={`otp-${index}`}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              className="w-12 h-12 text-center text-{#17153B] text-2xl font-bold border rounded-lg focus:outline-none bg-gray-100"
            />
          ))}
        </div>

        {/* Resend Code */}
        <p className="text-gray-500 text-sm">
          Didn’t get the OTP?{" "}
          <span className="text-orange-500 font-semibold cursor-pointer">Resend Code</span>
        </p>


        <div className="flex">
          {/* Verify Button */}
          <button onClick={handleVerify} className="w-full m-4 bg-[#352A71] text-white text-lg font-semibold py-3 mt-4 rounded-lg hover:bg-[#2b2261]"> Verify </button>
          <button onClick={() => navigate("/login" )}  className="w-full m-4 bg-[#555555] text-white text-lg font-semibold py-3 mt-4 rounded-lg hover:bg-[#909090]">Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
