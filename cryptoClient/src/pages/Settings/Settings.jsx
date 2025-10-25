import React, { useState } from "react";
import LeftPanel from "../Dashboard/components/LeftPanel";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";
import ethBg6 from "../../assets/ethBg6.jpg"
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const {user, setUser} = useAuth();
  const [userName, setUserName]=  useState('');
  const [pwd, setPwd]=  useState('');
  const [newPwd, setNewPwd]=  useState('');
  const [cnfPwd, setCnfPwd] = useState('');
  const navigate = useNavigate();

  const changeName = async()=>{
    const payload = {userEmail : user.userEmail, userName : userName};
    const res = await axios.post('http://localhost:5000/api/rename', payload);
    if(res.data.success) {
      user.userName = userName;
      setUser(user);
      navigate("/dashboard");
    }
  }

  const changePassword = async()=>{
    const payload = {userEmail : user.userEmail, pwd, newPwd};
    const res = await axios.post('http://localhost:5000/api/newpwd', payload);
    console.log(res.data);
    navigate("/dashboard");
  }

  return (

    <div className="flex">
        <LeftPanel />
    <div className="flex w-full justify-center items-center min-h-screen bg-gradient-to-br from-[#433D8B] to-[#17153B] object-contain border-l-[5px] border-[#ffffff] rounded-tl-[48px]"
    style={{
            backgroundImage:`url(${ethBg6})`,
            backgroundPosition:"center",
            backgroundSize:"cover",
            backgroundRepeat:"no-repeat",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(10,10,10,0.6)",
          }}>
      <div className="w-full m-10 p-9 bg-[#17153B] rounded-2xl shadow-lg text-white" style={{backgroundColor:"rgba(23,21,59,0.5)"}}>
        <h2 className="text-3xl font-bold mb-4">Settings</h2>
        
        {/* Profile Settings */}
        <div className="p-4 border border-gray-500 rounded-xl mb-6" style={{backdropFilter:"blur(10px)"}}>
          <h3 className="text-xl font-semibold mb-2">Profile Settings</h3>
          <input type="file" placeholder="Choose File" className="input input-bordered p-4 h-[3%] w-full mt-1 text-[#bababa]" />
          <label className="block text-sm mt-2 font-medium">Change Profile Name</label>
          <input onChange={(e)=>setUserName(e.target.value)} value={userName} type="text"  placeholder="Profile Name" className="input input-bordered w-full mt-1 text-white" />
          <button onClick={changeName} className="btn bg-[#F6851B] text-white mt-4 w-full">Update Name</button>
        </div>
        
        {/* Password Change Section */}
        <div className="p-4 border border-gray-500 rounded-xl" style={{backdropFilter:"blur(10px)"}}>
          <h3 className="text-xl font-semibold mb-2">Change Password</h3>
          <label className="block text-sm font-medium">Current Password</label>
          <input type="password" value={pwd} onChange={(e)=>setPwd(e.target.value)} placeholder="Enter Current Password" className="input input-bordered w-full mt-1 text-white" />
          
          <label className="block text-sm font-medium mt-3">New Password</label>
          <input type="password" value={newPwd} onChange={(e)=>setNewPwd(e.target.value)} placeholder="Enter New Password" className="input input-bordered w-full mt-1 text-white" />
          
          <label className="block text-sm font-medium mt-3">Confirm New Password</label>
          <input type="password" value={cnfPwd} onChange={(e)=>setCnfPwd(e.target.value)} placeholder="Confirm New Password" className="input input-bordered w-full mt-1 text-white" />
          
          <button onClick={changePassword} className="btn bg-[#F6851B] text-white mt-4 w-full">Update Password</button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default Settings;