import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useAuth } from "../../../context/AuthContext";

const getStatusLabel = (status) => {
  if (status === 1) return { label: "Receive", color: "text-green-400" };
  if (status === 0) return { label: "Deposit", color: "text-green-600" };
  if (status === -1) return { label: "Sent", color: "text-red-500" };
  if (status === -2) return { label: "Withdraw", color: "text-orange-500" };
  return { label: "Unknown", color: "text-gray-500" };
};

const TransacBottomFrame = () => {
  const {user} = useAuth();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [history,setHistory] = useState([]);

  const handleFilterChange = (filter) => {
    setSelectedFilter(filter);
  };

  const filteredRows =
    selectedFilter === "All"
      ? history
      : history.filter((row) => {
          if (selectedFilter === "Received") return row.status === 1;
          if (selectedFilter === "Deposit") return row.status === 0;
          if (selectedFilter === "Payments") return row.status === -1;
          if (selectedFilter === "Withdraw") return row.status === -2;
          return true;
        });


  useEffect(()=>{
    const getData = async()=>{
      const res = await axios.get(`http://localhost:5000/loan//userhistory/${user.userEmail}`);
      setHistory(res.data.history);
    }
    getData();
  })

  return (
    <div className="m-10 mt-[15%]">
      {/* Filter Buttons */}
      <div className=" text-xl font-bold ">
        {["All", "Received", "Deposit", "Payments", "Withdraw"].map((filter) => (
          <button
            key={filter}
            onClick={() => handleFilterChange(filter)}
            className={`px-6 mt-2 mr-1 py-4 rounded-t-xl ${
              selectedFilter === filter ? "text-orange-500 underline" : "text-white"
            } hover:text-orange-500 hover:underline`}
            style={{backgroundColor:"rgba(0,0,0,0.3)",backdropFilter:"blur(10px)"}}
          >
            {filter}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-transparent  rounded-lg overflow-hidden" style={{backgroundColor:"rgba(100,100,200,0.2)",backdropFilter:"blur(20px)"}}>
        {/* Scrollable Table Body */}
        <div className="overflow-y-auto max-h-[500px] scrollbar-custom">
          <table className="table table-pin-rows w-full">
            <thead className="bg-[#D9D9D9] text-xl text-white">
              <tr>
                <th className="font-bold">Name</th>
                <th className="font-bold text-right">Date</th>
                <th className="font-bold text-right">Invoice</th>
                <th className="font-bold text-right">Amount</th>
                <th className="font-bold text-right">Status</th>
                {/* <th className="font-bold text-right">Action</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredRows.length > 0 ? (
                filteredRows.map((row, index) => {
                  const status = getStatusLabel(row.status);
                  return (
                    <tr key={index} className="border-b text-white border-white">
                      <td>{row.name}</td>
                      <td className="text-right">{row.date}</td>
                      <td className="text-right">{row.invoice}</td>
                      <td className="text-right">{row.amount}</td>
                      <td className={`text-right font-bold ${status.color}`}>{row.category}</td>
                      {/* <td className="text-right">{row.action}</td> */}
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={6} className="text-center font-bold py-4">
                    No Data Available
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Custom Scrollbar CSS */}
      <style>
        {`
          .scrollbar-custom::-webkit-scrollbar {
            width: 10px;
          }
          
          .scrollbar-custom::-webkit-scrollbar-track {
            background: #f0f0f0;
            border-radius: 10px;
          }
          
          .scrollbar-custom::-webkit-scrollbar-thumb {
            background: #D9D9D9;
            border-radius: 10px;
          }
          
          .scrollbar-custom::-webkit-scrollbar-thumb:hover {
            background: #bfbfbf;
          }
        `}
      </style>
    </div>
  );
};

export default TransacBottomFrame;
