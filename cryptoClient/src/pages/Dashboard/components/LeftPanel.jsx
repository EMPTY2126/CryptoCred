import React, { useEffect } from "react";
import CryptocredLogo from "../../../assets/CryptoCredLogo.png";
import homeIcon from "../../../assets/homeIcon.png";
import transacIcon from "../../../assets/transacationIcon.png";
import settingsIcon from "../../../assets/settingsIcon.png";
import profileIcon from "../../../assets/userIcon.png";
import support from "../../../assets/help.png";
import logoutIcon from "../../../assets/logoutIcon.png";
import { Box, styled, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import axios from "axios";
import { useAuth } from "../../../context/AuthContext";

const DashButton = styled(Button)(({ theme }) => ({
  width: "100%",
  height: "100px",
  display: "flex",
  "&:hover": {
    //   backgroundColor: purple[700],
    backgroundImage: "linear-gradient(to bottom right, #F6851B, #904E10)",
  },
  "&:pressed": {
    backgroundImage: "linear-gradient(to bottom right, #FFF, #FFF)",
  },
}));

function LeftPanel() {
  const navigate = useNavigate();
  const { setIsAuth, setUser } = useAuth();


  const handleLogout = () => {
    Cookies.remove("tokenn");
    setIsAuth(false);
    setUser(null);
  };

 

  return (
    <Box style={{ width: "300px", height: "950px" , backgroundColor:"#17153B"}}>
      <Box>
        <img
          style={{ height: "141px",objectFit:"contain" ,width:"80%", margin: "10%" }}
          src={CryptocredLogo}
          alt="cryptocredLogo"
        ></img>
      </Box>
      {/*cryptocred logo*/}

      {/*Dashboard button*/}
      <DashButton onClick={() => navigate("/dashboard")}>
        <img
          style={{ objectFit: "contain" }}
          src={homeIcon}
          alt="home icon"
        ></img>
        <Box
          style={{ color: "white" }}
          sx={{ fontSize: "25px", margin: "10px" }}
        >
          Dashboard
        </Box>
      </DashButton>

      {/*Transaction button*/}
      <DashButton onClick={() => navigate("/transaction")}>
        <img
          style={{ objectFit: "contain" }}
          src={transacIcon}
          alt="home icon"
        ></img>
        <Box
          style={{ color: "white" }}
          sx={{ fontSize: "25px", margin: "10px" }}
        >
          Transaction
        </Box>
      </DashButton>

      {/* <DashButton onClick={() => navigate("/support")}>
        <img
          className="objectFit w-10"
          src={support}
          alt="support icon"
        ></img>
        <Box
          style={{ color: "white" }}
          sx={{ fontSize: "25px", margin: "10px" }}
        >
          Support
        </Box>
      </DashButton> */}

      {/*Settings button*/}
      <DashButton onClick={() => navigate("/settings")}>
        <img
          style={{ objectFit: "contain" }}
          src={settingsIcon}
          alt="home icon"
        ></img>
        <Box
          style={{ color: "white" }}
          sx={{ fontSize: "25px", margin: "10px" }}
        >
          Settings
        </Box>
      </DashButton>

      {/*Profile button */}
      <DashButton className="flex" onClick={() => navigate("/helpcenter")}>
        <img
          style={{ objectFit: "contain", height:"40px", marginLeft:"20px"}}
          src={support}
          alt="home icon"
        ></img>
        <Box
          style={{ color: "white" }}
          sx={{ fontSize: "25px", margin: "10px" }}
        >
          Help
        </Box>
      </DashButton>

      {/*Logout button */}
      <DashButton onClick={handleLogout}>
        <img
          style={{ objectFit: "contain" }}
          src={logoutIcon}
          alt="home icon"
        ></img>
        <Box
          style={{ color: "white" }}
          sx={{ fontSize: "25px", margin: "10px" }}
        >
          Logout
        </Box>
      </DashButton>
    </Box>
  );
}

export default LeftPanel;
