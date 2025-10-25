import React, { useEffect, useState } from "react";
import DashMiddleFrame from "./components/DashMiddleFrame";
import DashBottomFrame from "./components/DashBottomFrame";
import DashTopFrame from "./components/DashTopFrame";
import LeftPanel from "./components/LeftPanel";
import { MetaMaskContext } from "../../context/MetaMaskContext";

function Dashboard() {
  const { setMetaId, metaId, metaBalance, setMetaBalance, web3 } = MetaMaskContext();
  const [loading, setLoading] = useState(true);

  const metamaskBalanceUpdate = async () => {
    if (window.ethereum && web3) {
      if(!web3) console.log("no web3");
      try {
        const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
        const currBalance = await web3.eth.getBalance(accounts[0]);
        const balance = web3.utils.fromWei(currBalance, "ether");
        if (metaBalance !== balance) setMetaBalance(balance);
      } catch (error) {
        console.error("Error connecting to MetaMask:", error);
      }
    } else {
      alert("MetaMask is not installed or web3 not available.");
    }
  };


 useEffect(() => {
    if (window.ethereum) {
      metamaskBalanceUpdate();
      window.ethereum.on("accountsChanged", (accounts) => {
        if (accounts.length > 0) {
          setMetaId(accounts[0]);
          metamaskBalanceUpdate();
        } else {
          setMetaId(null);
          setMetaBalance(null);
        }
      });

      window.ethereum.on("chainChanged", () => {
        window.location.reload();
      });

      setLoading(false);
    } else {
      console.log("Error in dashboard web3")
    }
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="btn btn-square loading"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <LeftPanel />
      <div className="relative w-full h-[900px] bg-gradient-to-tl from-[#2E236C] from-40% to-[#433D8B] t0-90% object-contain border-l-[5px] border-[#ffffff] rounded-tl-[48px]">
        <DashTopFrame />
        <DashMiddleFrame />
        <DashBottomFrame />
      </div>
    </div>
  );
}

export default Dashboard;