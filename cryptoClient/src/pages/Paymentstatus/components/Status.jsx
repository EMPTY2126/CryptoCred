import React, { useEffect } from "react";
import check from '../../../assets/check.png';
import faild from '../../../assets/remove.png';
import { useNavigate } from "react-router-dom";

function Status({success,amount,transactionId, user}) {
  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleDateString();
  const navigate = useNavigate();
  return (
    <div className="w-full h-full flex justify-center items-center">
    <div className="card bg-neutral text-neutral-content w-7/12">
      <div className="card-body items-center text-center">
        <img className="w-32 h-32" src={success? check : faild} alt="payment status"/>
        {success ? (<h2 className="card-title text-2xl">
          Payment Successfull
        </h2>
        ) :
        (<h2 className="card-title text-2xl">
          Payment Failed
        </h2>)}
      
        {success ? <p>Your payment has been processed successfully</p> : <p>Your payment process has been faild</p>}
        <div className="divider"/>
        <div className="text-left text-lg leading-6">
          <div className="leading-loose">Transaction Id: {transactionId}</div>
          <div className="leading-loose">Amount (INR) : {amount/100}.00</div>
          <div className="leading-loose space-x-[70px]"><span>Date</span> <span>: {formattedDate}</span> </div>
          
        </div>
        <div className="mt-9 divider" />
        <div className="card-actions justify-end">
          <button onClick={()=>navigate('/dashboard')} className="mt-11 btn bg-[#4dff4d] text-white text-xl w-56 hover:bg-[#35ae35]">Done</button>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Status;
