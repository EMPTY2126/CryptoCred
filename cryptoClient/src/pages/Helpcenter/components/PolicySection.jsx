import React from "react";

const PolicySection = () => {
  return (
    <fieldset className="m-4 mt-8 bg-gradient-to-br from-[#17153B] to-[#2E236C] border border-white p-4 rounded-box">
      <div className="font-bold m-2 mb-3 text-white text-4xl">Our Policy</div>

      {/* Introduction */}
      <div className="font-bold mt-5 text-xl">Introduction</div>
      <p>
        CryptoCred is committed to providing a secure, transparent, and decentralized platform for cryptocurrency lending and borrowing. This document outlines the platform’s policies to ensure responsible usage.
      </p>

      {/* Eligibility Criteria */}
      <div className="font-bold mt-5 text-xl">Eligibility Criteria</div>
      <ul className="ml-8 list-disc">
        <li>Users must be 18 years or older.</li>
        <li>Users must comply with local financial regulations.</li>
        <li>Loan eligibility is determined based on age, loan history, and collateral.</li>
      </ul>

      {/* Security and Data Protection */}
      <div className="font-bold mt-5 text-xl">Security and Data Protection</div>
      <ul className="ml-8 list-disc">
        <li>Transactions are secured via Ethereum blockchain.</li>
        <li>Data is immutable and encrypted to prevent tampering.</li>
        <li>Users' personal information is never shared; instead, zero-knowledge proofs ensure privacy.</li>
      </ul>

      {/* Loan and Repayment Terms */}
      <div className="font-bold mt-5 text-xl">Loan and Repayment Terms</div>
      <ul className="ml-8 list-disc">
        <li>Borrowers must repay within the agreed timeline.</li>
        <li>A 5% penalty is applied to overdue payments.</li>
        <li>Borrowers with multiple overdue loans may face restrictions on future borrowing.</li>
        <li>Loans are backed by crypto collateral, which may be liquidated in case of non-repayment.</li>
      </ul>

      {/* Fees and Charges */}
      <div className="font-bold mt-5 text-xl">Fees and Charges</div>
      <ul className="ml-8 list-disc">
        <li>Users are responsible for Ethereum gas fees.</li>
        <li>CryptoCred does not charge hidden fees, but a small platform fee may apply for loan processing.</li>
      </ul>

      {/* Collateral Management */}
      <div className="font-bold mt-5 text-xl">Collateral Management</div>
      <ul className="ml-8 list-disc">
        <li>Borrowers must maintain sufficient collateral to support their loans.</li>
        <li>If the collateral value falls below a threshold, liquidation will be triggered automatically.</li>
      </ul>

      {/* Governance and Community Participation */}
      <div className="font-bold mt-5 text-xl">Governance and Community Participation</div>
      <ul className="ml-8 list-disc">
        <li>CryptoCred is governed through a decentralized autonomous organization (DAO).</li>
        <li>Users holding governance tokens can vote on interest rate models, security upgrades, and platform rules.</li>
      </ul>

      {/* Prohibited Activities */}
      <div className="font-bold mt-5 text-xl">Prohibited Activities</div>
      <p>Users are strictly prohibited from:</p>
      <ul className="ml-8 list-disc">
        <li>Engaging in fraudulent loan applications.</li>
        <li>Using the platform for money laundering or illegal activities.</li>
        <li>Exploiting vulnerabilities in smart contracts for personal gain.</li>
      </ul>

      {/* Risk Disclaimer */}
      <div className="font-bold mt-5 text-xl">Risk Disclaimer</div>
      <ul className="ml-8 list-disc">
        <li>CryptoCred does not guarantee profits; crypto lending involves market volatility.</li>
        <li>Users should assess risks carefully before lending or borrowing.</li>
        <li>The platform does not provide financial advice.</li>
      </ul>

      {/* Dispute Resolution */}
      <div className="font-bold mt-5 text-xl">Dispute Resolution</div>
      <ul className="ml-8 list-disc">
        <li>Disputes will be handled transparently through smart contract rules.</li>
        <li>Community governance may be used for decision-making in exceptional cases.</li>
      </ul>
    </fieldset>
  );
};

export default PolicySection;
