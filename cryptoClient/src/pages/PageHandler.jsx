import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./Login/LoginPage";
import SignUp from "./SignUp/SignUp";
import Dashboard from "./Dashboard/Dashboard";
import Transaction from "./Dashboard/Transaction";
import { useAuth } from "../context/AuthContext.jsx";
import Deposit from "./Deposit/Deposit.jsx";
import Withdraw from "./Withdraw/Withdraw.jsx";
import PaymentStatus from './Paymentstatus/PaymentStatus.jsx'
import Support from "./Support/Support.jsx";
import Settings from "./Settings/Settings.jsx";
import Helpcenter from "./Helpcenter/Helpcenter.jsx";
import RequestRaise from "./Borrowing/RequestRaise.jsx";
import LendingApprove from "./Lending/LendingApprove.jsx";
import LendingList from "./Lending/LendingList.jsx";
import RequestConfirmation from "./Borrowing/RequestConfirmation.jsx";
import RequestStatus from "./Borrowing/RequestStatus.jsx";
import ForgetPassword from "./ForgetPassword/ForgetPassword.jsx";
import BorrowSelection from "./Borrowing/BorrowSelection.jsx";
import RepaymentSelection from "./Borrowing/RepaymentSelection.jsx";
import SingleRequestStatus from "./Borrowing/SingleRequestStatus.jsx";
import RepayPage from "./Borrowing/RepayPage.jsx";
import LendingSelect from "./Lending/LendingSelect.jsx";
import LendingStatus from "./Lending/LendingStatus.jsx";
import LendingConfirm from "./Lending/LendingConfirm.jsx";


function PageHandler() {
  const { isAuth, setIsAuth, setUser, setUserBalance } = useAuth();

  
return (
    <Routes>
      <Route  path="/login" element={isAuth ? <Dashboard  /> : <LoginPage /> } />
      <Route  path="/signup" element={isAuth ? <Dashboard  /> : <SignUp /> } />
      <Route  path="/" element={isAuth ? <Dashboard  /> : <LoginPage/> } />
      <Route  path="/dashboard" element={isAuth ? <Dashboard   /> : <LoginPage /> } />
      <Route path="/deposit" element={isAuth ? <Deposit /> : <LoginPage />} />
      <Route path="/withdraw" element={isAuth ? <Withdraw /> : <LoginPage />} />
      <Route path="/paymentstatus/:merchenttransactionId" element={isAuth ? <PaymentStatus /> : <LoginPage />} />
      <Route path="/transaction" element={isAuth ? <Transaction /> : <LoginPage />} />
      <Route path="/support" element={isAuth ? <Support /> : <LoginPage />} />
      <Route path="/settings" element={isAuth ? <Settings /> : <LoginPage />} />
      <Route path="/helpcenter" element={isAuth ? <Helpcenter /> : <LoginPage />} />
      <Route path="/requestRaise" element={isAuth ? <RequestRaise /> : <LoginPage />} />
      <Route path="/borrowSel" element={isAuth ? <BorrowSelection /> : <LoginPage />} />
      <Route path="/repaySel" element={isAuth ? <RepaymentSelection /> : <LoginPage />} />
      <Route path="/reqSingle" element={isAuth ? <SingleRequestStatus /> : <LoginPage />} />
      <Route path="/repay" element={isAuth ? <RepayPage /> : <LoginPage />} />
      <Route path="/lendingList" element={isAuth ? <LendingSelect /> : <LoginPage />} />
      <Route path="/lending" element={isAuth ? <LendingList /> : <LoginPage />} />
      <Route path="/lendingApprove" element={isAuth ? <LendingApprove /> : <LoginPage />} />
      <Route path="/lendingStatus" element={isAuth ? <LendingStatus  /> : <LoginPage />} />
      <Route path="/lendingConfirm" element={isAuth ? <LendingConfirm  /> : <LoginPage />} />
      <Route path="/requestConfirmation" element={isAuth ? <RequestConfirmation /> : <LoginPage />} />
      <Route path="/requestStatus" element={isAuth ? <RequestStatus /> : <LoginPage />} />
      <Route path="/forgetpass" element={isAuth ? <Dashboard  /> : <ForgetPassword />} />
    </Routes>
  );
}

export default PageHandler;
