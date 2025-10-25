import React, { useEffect, useState, useContext } from "react";
import { Box, Button } from "@mui/material";
import userPic from "../../../assets/userPic.png";
import bellIcon from "../../../assets/bellIcon.png";
import axios from "axios";
import { AuthContext } from "../../../context/AuthContext";
import dashTopImgAsset from "../../../assets/topframeBgDashPage.png";

import Alert from "../../../components/Alert";

const messages = [
  { id: 1, text: "System update available : BLUE ", type: "info" },
  { id: 2, text: "Session update : YELLOW", type: "warning" },
  { id: 3, text: "Task Completion : GREEN", type: "success" },
  { id: 4, text: "Warning : RED", type: "error" },
];


function DashTopFrame() {
  const [weather, setWeather] = useState(null);
  const { user, userBalance } = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);


  const isLink = (str) => /^(https?:\/\/|www\.)[^\s]+$/.test(str);

  const removeGmailSuffix = (email) => {
    return email.endsWith("@gmail.com") ? email.slice(0, -10) : email;
  };

  const UID = "wqqw";

  const getW = async () => {
    const res = await axios.get(
      "http://api.weatherapi.com/v1/current.json?key=b5c68217e84e49498b9211538240312&q=Bhopal"
    );
    let localDate = new Date(res.data.location.localtime);
    res.data.location.localtime = localDate.toLocaleDateString("en-GB", {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    setWeather(res.data);
    return res.data;
  };

  
  const handleBellClick = () => {
    setShowAlert(true);
  };
  
  useEffect(() => {
    getW();
  }, []);
  
  return (
    <>
   

    <Box style={{ 
        position: "absolute",
        display: "flex",
        width: "100%",
        height: "200px",
        backgroundImage: `url(${dashTopImgAsset})`,
        backgroundSize: "cover", // Ensures the image covers the entire background
        backgroundPosition: "center", // Centers the background image
        backgroundRepeat: "no-repeat",
      }}
      sx={{
        borderTopLeftRadius: "50px",
      }}
    >
       <Alert userId = {user.userEmail} show={showAlert} onClose={() => setShowAlert(false)} />
      {/* Weather Stats */}
      <Box
        style={{
          width: "20%",
          display: "flex",
          marginLeft: "6%",
          marginTop: "5%",
          color: "white",
        }}
      >
        <Box>
          {weather && (
            <img src={weather.current.condition.icon} alt="weatherIcon"></img>
          )}
        </Box>
        <Box
          style={{
            marginLeft: "4%",
            marginTop: "4%",
            fontFamily: "Inter",
            fontWeight: "bold",
            fontSize: "18px",
          }}
          sx={{}}
        >
          {weather && weather.location.localtime}
        </Box>
      </Box>

      <Box style={{ width: "50%" }}></Box>

      <Box style={{ width: "20%", display: "flex", right: "0" }} sx={{ justifyContent: "space-between" }}>
        <div className="indicator">
          {/* <span className="indicator-item badge badge-secondary">12</span> */}
          <button onClick={handleBellClick} className="btn-link"> <img src={bellIcon} alt="bellIcon"></img> </button>
        </div>
        <img className="w-20 h-20 mt-[17%] rounded-full" alt="user profile" src={isLink(user.userImage)? user.userImage : userPic}/>
        <Box style={{ fontFamily: "Inter", color: "white", marginTop: "25%" }}>
          <Box style={{ fontSize: "20px" }} sx={{ textAlign: "center" }}> {user && user.userName} </Box>
          <Box style={{ fontSize: "14px", color: "#B0B0B0" }}> Client: {user && UID} </Box>
        </Box>
      </Box>
    </Box>
    </>
  );
}

export default DashTopFrame;
