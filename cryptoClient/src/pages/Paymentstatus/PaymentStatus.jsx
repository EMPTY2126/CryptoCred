import React,{useContext, useEffect,useState} from "react";
import LeftPanel from "../Dashboard/components/LeftPanel";
import { useParams } from "react-router-dom";
import axios from "axios";
import LoadingSpinner from "../../components/LoadingSpinner";
import Status from "./components/Status";
import { AuthContext } from "../../context/AuthContext";

function PaymentStatus() {
  const [loading,setLoading] = useState(true);
  const { merchenttransactionId } = useParams();
  const [transaction,setTransaction] = useState({});
  const { user } = useContext(AuthContext);

  useEffect(()=>{
    const getStatus = async()=>{
      let payload = {userId : user.userEmail, merchenttransactionId:merchenttransactionId}
      const res = await axios.post(`http://localhost:5000/payment/status`, payload);
      setTransaction(res.data.transaction);
      setLoading(false);
    }

    getStatus();
  },[]);

  return (
    <div className="flex ">
      <div>
        <LeftPanel />
      </div>
      <div className="relative w-full h-[900px] bg-gradient-to-br from-[#433D8B] to-[#2E236C] object-contain border-[20px] border-[#17153b] ">
      {loading?  <LoadingSpinner/> : <Status success={transaction.success} user={user} amount={transaction.data.amount} transactionId={transaction.data.transactionId} />}
      </div>
    </div>
  );
}

export default PaymentStatus;
