import React from "react";
import FAQItem from "./FAQItem";

const faqs = [
    {
      question: "What is CryptoCred?",
      answer:
        "CryptoCred is a decentralized cryptocurrency lending and borrowing platform built on the Ethereum blockchain. It allows users to lend and borrow digital assets securely through automated smart contracts.",
    },
    {
      question: "How does CryptoCred ensure security?",
      answer:
        "CryptoCred utilizes blockchain technology to maintain a tamper-proof record of transactions. Smart contracts automate lending, borrowing, interest calculations, and repayment tracking, eliminating the risk of data manipulation.",
    },
    {
      question: "Who can use CryptoCred?",
      answer:
        "Anyone above the age of 18 who meets the eligibility criteria, including prior loan clearances and legal compliance, can use CryptoCred.",
    },
    {
      question: "How does the lending process work?",
      answer:
        "1. Lenders deposit crypto assets into the platform.\n2. Borrowers request loans, and smart contracts verify eligibility.\n3. If approved, the loan is issued with predefined terms.\n4. Repayment is tracked via blockchain, and penalties apply for late payments.",
    },
    {
      question: "How are interest rates determined?",
      answer:
        "Interest rates are dynamic and based on:\n● Age (Younger borrowers may have slightly higher rates)\n● Loan history\n● Market conditions (via oracles)\n● Collateral value.",
    },
    {
      question: "What happens if a borrower fails to repay on time?",
      answer:
        "A 5% penalty is applied to overdue payments. If a borrower defaults, collateral is liquidated automatically by the smart contract.",
    },
    {
      question: "Is there any collateral requirement?",
      answer:
        "Yes, borrowers must provide crypto assets as collateral. If the collateral value drops significantly, additional funds may be required, or the system may liquidate the collateral.",
    },
    {
      question: "Can lenders withdraw their funds anytime?",
      answer:
        "Yes, lenders can withdraw available funds, provided they are not currently being used in active loans.",
    },
    {
      question: "What blockchain is CryptoCred built on?",
      answer: "CryptoCred operates on Ethereum and leverages smart contracts written in Solidity.",
    },
    {
      question: "How is CryptoCred different from traditional lending platforms?",
      answer:
        "Unlike traditional lending, which relies on intermediaries, CryptoCred operates on decentralized finance (DeFi) principles, ensuring:\n● Transparency (All transactions are publicly verifiable)\n● Security (Blockchain prevents unauthorized modifications)\n● Efficiency (Smart contracts eliminate middlemen).",
    },
    {
      question: "Are my transactions private?",
      answer:
        "Yes, CryptoCred uses zero-knowledge proofs to verify transactions without revealing personal details.",
    },
    {
      question: "What fees are involved in transactions?",
      answer:
        "Transactions incur gas fees, which vary based on Ethereum network congestion.",
    },
    {
      question: "Can I vote on platform decisions?",
      answer:
        "Yes, active users earn governance tokens that allow them to participate in decisions regarding platform updates.",
    },
    {
      question: "What future improvements are planned?",
      answer:
        "Future enhancements include:\n● Layer-2 solutions to reduce gas fees\n● Decentralized credit scoring\n● More flexible penalty systems\n● Improved user interface and wallet integrations.",
    },
];
    

const FAQSection = () => {
  return (
    <fieldset className="m-4 mt-8 bg-gradient-to-br from-[#17153B] to-[#2E236C] border border-white p-4 rounded-box">
      <div className="font-bold m-2 mb-3 text-white text-4xl">Frequently Answered Questions</div>
      {faqs.map((faq, index) => (
        <FAQItem key={index} question={faq.question} answer={faq.answer} />
      ))}
    </fieldset>
  );
};

export default FAQSection;
