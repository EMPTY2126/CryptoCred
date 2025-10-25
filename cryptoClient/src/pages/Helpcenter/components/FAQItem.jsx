import React from "react";

const FAQItem = ({ question, answer }) => {
  return (
    <div className="collapse collapse-arrow">
      <input type="radio" name="faq-accordion" />
      <div className="collapse-title text-white font-semibold">{question}</div>
      <div className="collapse-content text-sm">{answer}</div>
    </div>
  );
};

export default FAQItem;
