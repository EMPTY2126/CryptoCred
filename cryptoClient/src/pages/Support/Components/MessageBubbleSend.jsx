import React from "react";

function MessageBubbleSend({message,time}) {
  if(!time) time = "10:30"
  return (
    <div className="chat chat-start max-w-md">
  <div className="chat-bubble text-xl">
    {message}
    <span className="text-xs block text-left mt-[-2px] mb-[-4px] select-none">{time}</span>
  </div>
</div>
  );
}

export default MessageBubbleSend;
