import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const taglines = [
  "Empowering Decentralized Finance 💰",
  "Smart Contracts, Smarter Lending 🚀",
  "Secure & Transparent Transactions 🔒",
  "The Future of Lending, Today 🌍",
  "CryptoCred: Trust in Code ⚡",
];

const DynamicTitle = () => {
  const location = useLocation();
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const getPageTitle = () => {
      switch (location.pathname) {
        case "/":
          return "Home";
        case "/login":
          return "Login";
        case "/signup":
          return "Sign Up";
        case "/dashboard":
          return "Dashboard";
        case "/loanrepayment":
          return "Loan Repayment";
        case "/lendinglist":
          return "Lending List";
        default:
          return "CryptoCred";
      }
    };

    // Function to toggle between Page Title & Taglines
    const updateTitle = () => {
      document.title =
        // index % 2 === 0 ? `${getPageTitle()} | ${taglines[index % taglines.length]}` : `${getPageTitle()} | CryptoCred`;
        getPageTitle();
      setIndex((prev) => prev + 1);
    };

    // Initial title update
    // updateTitle();

    // Set interval to toggle title every 3 seconds
    // const interval = setInterval(updateTitle, 3000);

    // return () => clearInterval(interval); // Cleanup on unmount
  }, [location, index]);

  return null;
};

export default DynamicTitle;
