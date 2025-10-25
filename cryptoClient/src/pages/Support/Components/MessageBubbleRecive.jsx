import React from "react";

function MessageBubbleRecive({message,time}) {
  if(!time) time = "10:30"
  return (
      <div className="chat chat-end">
        <div className="max-w-[70%] p-4 rounded-xl text-white bg-gradient-to-r from-[#F1831B] to-[#995311] self-start">{message}
        <span className="text-xs block text-right mt-[2px] mb-[-4px] select-none">{time}</span>
        </div>
      </div>
  );
}

export default MessageBubbleRecive;
