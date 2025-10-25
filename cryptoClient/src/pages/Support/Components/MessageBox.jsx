import React,{useEffect, useRef} from "react";
  
function MessageBox({message}) {
  const messageEndRef = useRef(null);



  useEffect(() => {
    // messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    const timeoutId = setTimeout(() => {
      messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, 0);

  return () => clearTimeout(timeoutId);
  
  }, [message]);

  return (
    message ?
    (
      <div className="w-full h-full bg-slate-700 overflow-y-auto ">
      {message}
      <div ref={messageEndRef} />
      </div>
    ):
    (
      <div className="w-full h-full flex justify-center items-center text-4xl  bg-slate-700">
        Start chatting Now
      </div>
    )
    
  );
}

export default MessageBox;
