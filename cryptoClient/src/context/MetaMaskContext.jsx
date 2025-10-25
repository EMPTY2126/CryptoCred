import { createContext, useContext, useState } from "react";
import Web3 from "web3";

export const MetaContext = createContext();

const getAccount = async () => {
  const acc = await window.ethereum.request({
    method: "eth_requestAccounts",
  });

  return acc[0];
};

export const MetaProvider = ({ children }) => {
  const [metaBalance, setMetaBalance] = useState(0);
  const [metaId, setMetaId] = useState(null);
  const [web3, setWeb3] = useState(new Web3(window.ethereum));
  return (
    <MetaContext.Provider
      value={{ setMetaId, metaId, metaBalance, setMetaBalance, web3, setWeb3 }}
    >
      {children}
    </MetaContext.Provider>
  );
};

export const MetaMaskContext = () => useContext(MetaContext);
