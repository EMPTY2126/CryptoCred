// import React, { useContext, useEffect, useState } from 'react';
// import LeftPanel from '../Dashboard/components/LeftPanel';
// import MessageBottom from "./Components/MessageBottom";
// import MessageBox from "./Components/MessageBox";
// import { useAuth } from '../../context/AuthContext';
// import axios from 'axios';
// import { io } from 'socket.io-client';
// import { jwtDecode } from "jwt-decode";
// import Cookies from 'js-cookie';
// import MessageBubbleRecive from './Components/MessageBubbleRecive';
// import MessageBubbleSend from './Components/MessageBubbleSend';
// import SendIcon from '../../../src/assets/paperAirplaneIcon.png';
// import DashTopFrame from '../Dashboard/components/DashTopFrame';

// function Support() {
//   const [socket, setSocket] = useState(null);
//   const [message, setMessage] = useState([]);
//   const [userId, setUserId] = useState("");

//   useEffect(() => {
//     const token = Cookies.get('tokenn');
//     const user = jwtDecode(token);
//     const userId = user.user.userEmail;
//     setUserId(userId);

//     const getMessage = async () => {
//       const newUser = await axios.get(`http://localhost:5001/cryptosupport/getchat/${userId}`);
//       const msgData = newUser.data.message;
//       const msg = msgData.map((ele, index) => {
//         if (ele.from === userId)
//           return <MessageBubbleRecive key={index} message={ele.content} />;
//         else return <MessageBubbleSend key={index} message={ele.content} />;
//       });
//       setMessage(msg);
//     };

//     const newSocket = io('http://localhost:5001', {
//       query: { userId: userId },
//     });

//     newSocket.on("messenger", (data) => {
//       if (data.sender === userId) {
//         let newMessage = <MessageBubbleRecive key={`${Date.now()}-${Math.random()}`} time={"9:00"} message={data.message} />;
//         setMessage((message) => [...message, newMessage]);
//       } else {
//         let newMessage = <MessageBubbleSend key={`${Date.now()}-${Math.random()}`} time={"9:00"} message={data.message} />;
//         setMessage((message) => [...message, newMessage]);
//       }
//     });

//     setSocket(newSocket);
//     getMessage();

//   }, []);

//   return (
//     <div className="flex">
//       <div>
//         <LeftPanel />
//       </div>

//       {/* Chat Section */}
//       <div className="relative w-full h-[900px] bg-gradient-to-br from-[#17153B] to-[#2E236C] object-contain border-l-[5px] border-[#ffffff] rounded-tl-[48px]">
//         {/* Top Bar with Weather & User Info (Already Made) */}
//         <DashTopFrame />

//         {/* Live Chat Header */}
//         <div className="text-center mt-[200px]">
//           <span className="bg-white px-8 py-2 rounded-b-2xl text-[#17153B] text-2xl font-bold">
//             Live chat support
//           </span>
//         </div>

//         {/* Chat Messages */}
//         <div className="flex flex-col justify-start px-10 py-6 space-y-4 h-[70%] overflow-y-auto">
//           {message}
//         </div>

//         {/* Chat Input Field */}
//         <div className="absolute bottom-6 left-10 right-10 flex items-center bg-[#17153b] rounded-full px-6 py-8">
//           <input
//             type="text"
//             placeholder="Write your queries here..."
//             className="flex-1 bg-transparent text-xl text-white placeholder-gray-400 outline-none"
//           />
//           <button className="ml-4">
//             <img src={SendIcon} alt="Send" className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Support;

import React, { useEffect, useState, useRef } from "react";
import LeftPanel from "../Dashboard/components/LeftPanel";
import DashTopFrame from "../Dashboard/components/DashTopFrame";
import MessageBubbleRecive from "./Components/MessageBubbleRecive";
import MessageBubbleSend from "./Components/MessageBubbleSend";
import axios from "axios";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import Cookies from "js-cookie";
import SendIcon from "../../../src/assets/paperAirplaneIcon.png";
import { IoArrowDown } from "react-icons/io5"; // Scroll to bottom icon
import blockBg from '../../assets/blockBg.jpg'

function Support() {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [userId, setUserId] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const chatRef = useRef(null);
  const [isScrolledUp, setIsScrolledUp] = useState(false);

  // const sendMessage = async () => {
  //   let msg = {
  //     reciver : "support" ,
  //     message : chatMessage
  //   }

  //   if(socket){
  //     console.log("message sent successfully",userId);
  //     await socket.emit('sendmessage',msg);
  //   }else{
  //     console.log("no socket found")
  //   }
  //   setChatMessage("");
  // };

  useEffect(() => {
    const token = Cookies.get("tokenn");
    if (!token) return;

    const user = jwtDecode(token);
    const userId = user.user.userEmail;
    setUserId(userId);

    const fetchMessages = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/cryptosupport/getchat/${userId}`);
        const chatData = response.data.message;
        const formattedMessages = chatData.map((msg, index) => 
          msg.from === userId 
            ? <MessageBubbleRecive key={index} message={msg.content} /> 
            : <MessageBubbleSend key={index} message={msg.content} />
        );
        setMessages(formattedMessages);
        scrollToBottom();
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    const newSocket = io("http://localhost:5001", { query: { userId } });

    newSocket.on("messenger", (data) => {
      const newMessageBubble = 
        data.sender === userId 
          ? <MessageBubbleRecive key={`${Date.now()}`} message={data.message} /> 
          : <MessageBubbleSend key={`${Date.now()}`} message={data.message} />;

      setMessages((prev) => [...prev, newMessageBubble]);
      if (!isScrolledUp) scrollToBottom();
    });

    setSocket(newSocket);
    fetchMessages();

  }, []);

  // Function to send a message
  const sendMessage = async() => {
    console.log("messahe sent");
    if (newMessage.trim() === "") return;

    // const userMessage = <MessageBubbleRecive key={`${Date.now()}`} message={newMessage} />;
    // setMessages((prev) => [...prev, userMessage]);
    if(socket) console.log("socket present")
      await socket.emit("sendmessage", { reciver: "support", message: newMessage });
    setNewMessage("");
    scrollToBottom();
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  // Scroll to bottom function
  const scrollToBottom = () => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    setIsScrolledUp(false);
  };

  // Detect if user scrolls up
  const handleScroll = () => {
    if (chatRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = chatRef.current;
      setIsScrolledUp(scrollTop + clientHeight < scrollHeight - 50);
    }
  };

  return (
    <div className="flex">
      <LeftPanel />

      {/* Chat Section */}
      <div className="relative  w-full h-[900px] bg-gradient-to-br from-[#17153B] to-[#2E236C] border-l-[5px] border-[#ffffff] rounded-tl-[48px]" >
        {/* Top Bar */}
        <DashTopFrame />

        {/* Live Chat Header */}
        <div className="text-center mt-[200px]">
          <span className="bg-white px-8 py-2 rounded-b-2xl text-[#17153B] text-2xl font-bold">
            Live Chat Support
          </span>
        </div>

        {/* Chat Messages */}
        <div
          ref={chatRef}
          className="flex flex-col rounded-3xl px-10 ml-[3%] mb-[2%] mr-[3%] py-6 space-y-4 h-[65%] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800"
          onScroll={handleScroll}
          style={{
            backgroundImage:
              `url(${blockBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundBlendMode: "overlay",
            backgroundColor: "rgba(43, 21, 59, 1)", // Dark overlay for better visibility
          }}
        >
          {messages}
        </div>

        {/* Scroll to Bottom Button */}
        {isScrolledUp && (
          <button
            className="absolute bottom-28 right-[5%] bg-[#fc5a02] p-3 rounded-full shadow-md hover:bg-[#d96924] transition"
            onClick={scrollToBottom}
          >
            <IoArrowDown className="text-white text-2xl" />
          </button>
        )}

        {/* Chat Input Field */}
        <div className="absolute bottom-6 left-10 right-10 flex items-center bg-[#17153b] rounded-full px-6 py-5 shadow-lg">
          <input
            // onKeyDown={(e)=>{if(e.key === 'Enter') sendMessage() }}
            type="text"
            placeholder="Write your queries here..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            className="flex-1 bg-transparent text-xl text-white placeholder-gray-400 outline-none"
          />
          <button onClick={sendMessage} className="ml-4">
            <img src={SendIcon} alt="Send" className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Support;
