import React from "react";

function LoadingSpinner() {
  return (
    <div className="w-full h-full flex justify-center items-center gap-2">
      <div className="text-3xl">Loading</div>
      <span className="loading loading-infinity loading-xl text-[#fc5a02]"></span>
    </div>
  );
}

export default LoadingSpinner;
