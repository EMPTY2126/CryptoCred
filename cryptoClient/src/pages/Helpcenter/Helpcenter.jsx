// import React from "react";
// import LeftPanel from "../Dashboard/components/LeftPanel";
// import FAQSection from "./components/FAQSection";
// import PolicySection from "./components/PolicySection";
// import ChatButton from "./components/ChatButton";

// function HelpCenter() {
//   return (
//     <div className="flex">
//       <LeftPanel />
//       <div className="relative w-full h-[900px] bg-gradient-to-br from-[#433D8B] to-[#2E236C] object-contain border-l-[5px] border-[#ffffff] rounded-tl-[48px]">
//         <FAQSection />
//         <PolicySection />
//         <ChatButton />
//       </div>
//     </div>
//   );
// }

// export default HelpCenter;


import React from "react";
import LeftPanel from "../Dashboard/components/LeftPanel";
import FAQSection from "./components/FAQSection";
import PolicySection from "./components/PolicySection";
import ChatButton from "./components/ChatButton";

function HelpCenter() {
  return (
    <div className="flex">
      <LeftPanel />

      <div className="relative w-full h-[900px] bg-gradient-to-br from-[#433D8B] to-[#2E236C] object-contain border-l-[5px] border-[#ffffff] rounded-tl-[48px]">
        
        <div className="overflow-y-auto max-h-[96%] p-4 pr-6 scrollbar-thin scrollbar-thumb-[#D9D9D9] scrollbar-track-[#2E236C] rounded-lg">
          <FAQSection />
          <PolicySection />
        </div>

        <ChatButton />
      </div>
    </div>
  );
}

export default HelpCenter;
