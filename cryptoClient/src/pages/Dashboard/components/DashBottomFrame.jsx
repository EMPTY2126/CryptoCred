import React from 'react';
import { Box,styled,Button } from '@mui/material';
import { useNavigate } from "react-router-dom";
import lendBg from "../../../assets/lendingIcon.png"

const LendButton = styled(Button)(({theme}) =>({
    backgroundColor:"#17153B",
    height:"70%",
    width:"46%",
    borderColor:"#F6851B",
    borderStyle:"solid",
    borderWidth: "2px",
    borderRadius:"15px",
    color:"#F6851B",
    fontWeight:"700",
    margin:"2%",
    transition:"background-color 3s",
//     backgroundImage:`url(${lendBg})`,
//     backgroundRepeat: "no-repeat",
//     backgroundSize:"cover",
//     backgroundPosition :"center",
    '&:hover':{
            backgroundColor:"#F6851B",
            color:"white",   
            fontSize:"32px",
            backgroundPosition:"Bottom",     
    },
    '&:focus&:active':{
            backgroundColor:"None",
            transition:"None",
    }       
}));


const BorrowButton = styled(Button)(({theme}) =>({
    backgroundColor:"#17153B",
    height:"70%",
    width:"46%",
    borderColor:"#F6851B",
    borderStyle:"solid",
    borderWidth: "2px",
    borderRadius:"15px",
    color:"#F6851B",
    fontWeight:"700",
    margin:"2%",
    transition:"background-color 3s",
    '&:hover':{
            backgroundColor:"#F6851B",
            color:"white",
            fontSize:"32px",                
    },
    '&:focus&:active':{
            backgroundColor:"None",
            transition:"None",
    }        
}));

function DashBottomFrame() {
        const navigate = useNavigate();
  return (
    <Box style={{position:"absolute",width:"95%",height:"42%",margin:"2%",marginTop:"32%"}} >
                <LendButton onClick={() => navigate("/lendingList")}>Lend Eth</LendButton>
                <BorrowButton onClick={() => navigate("/borrowSel")}>Borrow Eth</BorrowButton>
    </Box>
  )
}

export default DashBottomFrame