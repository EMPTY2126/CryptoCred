import React from 'react'
import Web3 from 'web3';

const  WebThree = ()=> {
    if(window.ethereum){
        console.log("etherium found");
        return new Web3(window.ethereum);
    }else{
        console.log("error while connecting web3")
        return null;
    }
};

export default WebThree