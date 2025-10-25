import React, { useEffect } from 'react';
import { Box } from '@mui/material';
import LeftPanel from './components/LeftPanel';
import DashTopFrame from './components/DashTopFrame';
import TransacBottomFrame from './components/TransacBottomFrame';
import ethBg8 from "../../assets/ethBg8.jpg";


function Transaction() {

 
  return (
    <Box sx={{display:"flex"}}>
        <LeftPanel/>
    <div className="relative w-full h-[900px] bg-gradient-to-br from-[#433D8B] to-[#17153B] object-contain border-l-[5px] border-[#ffffff] rounded-tl-[48px]"
    style={{backgroundImage: `url(${ethBg8})`,
          backgroundSize: "cover",
          backgroundPosition:"center",
          backgroundRepeat: "no-repeat",
          backgroundBlendMode:"overlay",
          backgroundColor:"rgba(23,21,59,0.8"}}>
        <DashTopFrame/>
        <TransacBottomFrame/>    
    </div>
    </Box>
  )
}

export default Transaction