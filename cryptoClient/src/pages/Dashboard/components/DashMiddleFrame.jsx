import React, { useContext, useEffect, useState } from "react";
import { Box, Button, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MetaMaskContext } from "../../../context/MetaMaskContext";
import { AuthContext, useAuth } from "../../../context/AuthContext";
import axios from "axios";

const DepositButton = styled(Button)(({ theme }) => ({
  backgroundImage: "linear-gradient(to bottom right, #F6851B, #904E10)",
  minHeight: "60.37px",
  minWidth: "230.26px",
  margin: "2%",
  borderRadius: "15px",
  color: "white",
  fontWeight: "700",
  "&:hover": {
    backgroundImage: "None",
    borderColor: "white",
    color: "white",
    borderStyle: "solid",
    borderWidth: "2px",
  },
}));

const WithdrawButton = styled(Button)(({ theme }) => ({
  backgroundImage: "linear-gradient(to bottom right, #F6851B, #904E10)",
  minHeight: "60.37px",
  minWidth: "230.26px",
  margin: "2%",
  borderRadius: "15px",
  color: "white",
  fontWeight: "700",
  "&:hover": {
    backgroundImage: "None",
    borderColor: "white",
    color: "white",
    borderStyle: "solid",
    borderWidth: "2px",
  },
}));

function DashMiddleFrame() {
  const navigate = useNavigate();
  const [loanAmount, setLoanAmount] = useState(0);
  const handleDeposit = () => {
    navigate("/deposit");
  };
  const { setMetaId, metaId, metaBalance, setMetaBalance } = MetaMaskContext();
  const { user, userBalance , setUserBalance} = useAuth();

  const getBalance = async () => {
    try {
      const bal = await axios.get(`http://localhost:5000/payment/balance/${user.userEmail}`);
      return bal.data;
    } catch (error) {
      console.error("Error fetching balance:", error);
      return null;
    }
  }

  useEffect(() => {
    const fetchBalance = async () => {
      const res = await getBalance(); 
      if (res) {
        setUserBalance(res.balance);
        setLoanAmount(res.loan);
      }
    };

    fetchBalance();
  }, []);

  return (
    <Box
      style={{
        position: "absolute",
        backgroundColor: "#17153B",
        width: "85%",
        height: "350px",
        marginTop: "10%",
        marginLeft: "8%",
        borderRadius: "40px",
      }}
      sx={{ filter: "drop-shadow(6px 6px 5px #F6851B)", zIndex: "19" }}
    >
      <Box style={{ display: "flex", marginTop: "2%" }}>
        <Box
          style={{
            color: "#B3B3B3",
            width: "60%",
            fontSize: "35px",
            fontWeight: "700",
          }}
          sx={{ fontFamily: "Inter", padding: "2%" }}
        >
          Overall Portfolio
        </Box>
        <Box
          style={{ display: "flex", width: "40%" }}
          sx={{ paddingRight: "5%" }}
        >
          <DepositButton onClick={handleDeposit}>Deposit</DepositButton>
          <WithdrawButton onClick={() => navigate("/withdraw")}>Withdraw</WithdrawButton>
        </Box>
      </Box>
      <Box
        style={{ display: "flex", margin: "8%", fontFamily: "Inter" }}
        sx={{ justifyContent: "space-between" }}
      >
        <Box style={{ display: "flex" }}>
          <Box>
            <Box
              style={{ color: "#A6A6A6", display: "block", fontSize: "16px" }}
            >
              My Balance
            </Box>
            <Box
              style={{ color: "#FFFFFF", display: "block", fontSize: "24px" }}
            >
             ₹ {userBalance !==null? userBalance : 3123}
            </Box>
          </Box>
          <Box style={{ color: "#00FF44", marginTop: "3%", fontSize: "16px" }}>
          </Box>
        </Box>
        <Box style={{ display: "flex" }}>
          <Box>
            <Box
              style={{ color: "#A6A6A6", display: "block", fontSize: "16px" }}
            >
              MetaMask Balance
            </Box>
            <Box
              style={{ color: "#FFFFFF", display: "block", fontSize: "24px" }}
            >
               Ξ {metaBalance? Math.ceil(metaBalance * 10000) / 10000 : "wallet not connected"}
            </Box>
          </Box>
          <Box style={{ color: "#00FF44", marginTop: "3%", fontSize: "16px" }}>
          </Box>
        </Box>
        <Box style={{ display: "flex" }}>
          <Box>
            <Box
              style={{ color: "#A6A6A6", display: "block", fontSize: "16px" }}
            >
              Loan Amount
            </Box>
            <Box
              style={{ color: "#FFFFFF", display: "block", fontSize: "24px" }}
            >
              Ξ {loanAmount.toFixed(5)}
            </Box>
          </Box>
          <Box style={{ color: "#FF0000", marginTop: "3%", fontSize: "16px" }}>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default DashMiddleFrame;
