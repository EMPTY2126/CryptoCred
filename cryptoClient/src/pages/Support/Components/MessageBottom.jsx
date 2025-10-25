import React, { useState } from "react";
import { IoAddOutline, IoSendSharp } from "react-icons/io5";

function MessageBottom({ socket,userId }) {
  const [chatMessage, setChatMessage] = useState("");

  const sendMessage = async () => {
    let msg = {
      reciver : "support" ,
      message : chatMessage
    }

    if(socket){
      console.log("message sent successfully",userId);
      await socket.emit('sendmessage',msg);
    }else{
      console.log("no socket found")
    }
    setChatMessage("");
  };



  return (
    <div className="h-24 w-full flex justify-center items-center bg-slate-700">
      <div className="text-3xl mr-4">
        <IoAddOutline />
      </div>
      <input
        onKeyDown={(e)=>{if(e.key === 'Enter') sendMessage() }}
        value={chatMessage}
        onChange={(e) => setChatMessage(e.target.value)}
        placeholder="Type a message"
        className="p-5 outline-none w-3/4 h-12 rounded-lg  text-slate-300"
      ></input>
      <div onClick={sendMessage} className="text-3xl ml-4">
        <IoSendSharp />
      </div>
    </div>
  );
}

export default MessageBottom;
