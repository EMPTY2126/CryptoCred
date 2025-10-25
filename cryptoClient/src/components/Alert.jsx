import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import './alert.css'

function Alert({ msg, show, onClose, userId }) {
  const alertRef = useRef(null);
  const [messages,setMessages] = useState(msg)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (alertRef.current && !alertRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    const getNotification = async()=>{
      const res = await axios.get(`http://localhost:5000/notification/${userId}`);
      setMessages(res.data);
    }
    getNotification();
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [show, onClose]);

  if (!show) return null;

  const typeStyles = {
    info: "bg-blue-500",
    warning: "bg-yellow-500",
    success: "bg-green-500",
    error: "bg-red-500",
  };

  const deleteNotification = async(key)=>{
    const newMessages = messages.filter((message)=> message.id !== key);
    setMessages(newMessages)
    const res = await axios.delete(`http://localhost:5000/notification/${userId}`, {id :key} );
    console.log(res.data);
  }

  return (
    <div
      ref={alertRef}
      role="alert"
      className="fixed top-5 right-[20%] min-w-[300px] max-w-[30%] p-4 bg-gray-800 text-white rounded-lg shadow-lg z-[1000] animate-slide-in"
      style={{ animation: "slide-in 0.5s ease" }}
    >
      <div className="max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
        {messages && messages.map((message) => (
          <div
            key={message.id}
            className={`flex items-center mb-2 p-3 rounded-md ${typeStyles[message.ntype]}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="h-6 w-6 shrink-0 stroke-current text-white mr-3"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <div className="flex-1">{message.message}</div>
            {/* <button
              className="bg-[#a25050] w-6 h-8 rounded-[50%] cursor-pointer"
              onClick={()=>deleteNotification(message.id)}
            >
              x
            </button> */}
          </div>
        ))}
      </div>
      <button
        onClick={onClose}
        className="mt-4 bg-gray-700 text-white hover:bg-gray-600 font-bold py-2 px-4 rounded focus:outline-none transition duration-300 ease-in-out"
      >
        ×
      </button>
    </div>
  );
}

export default Alert;
