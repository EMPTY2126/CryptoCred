// import React from "react";
// import Fab from "@mui/material/Fab";
// import ChatIcon from "../../../assets/chat.png";

// const ChatButton = () => {
//   return (
//     <Fab onClick={() => navigate("/support")}
//       style={{
//         height: "100px",
//         width: "100px",
//         position: "fixed",
//         bottom: "4%",
//         right: "2%",
//         backgroundColor: "#F6851B",
//       }}
//     >
//       <img style={{ padding: "24%" }} src={ChatIcon} alt="chat icon" />
//     </Fab>
//   );
// };

// export default ChatButton;


import React from "react";
import { useNavigate } from "react-router-dom";
import Fab from "@mui/material/Fab";
import ChatIcon from "../../../assets/chat.png";

const ChatButton = () => {
  const navigate = useNavigate(); // Import and use navigate

  return (
    <Fab
      onClick={() => navigate("/support")}
      style={{
        height: "100px",
        width: "100px",
        position: "fixed",
        bottom: "4%",
        right: "2%",
        backgroundColor: "#F6851B",
      }}
    >
      <img style={{ padding: "24%" }} src={ChatIcon} alt="chat icon" />
    </Fab>
  );
};

export default ChatButton;