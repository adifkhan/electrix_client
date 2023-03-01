import React from "react";
import "./Button.css";

const Button = ({ children }) => {
  return (
    <div>
      <button className="my__button uppercase text-white font-semibold bg-secondary">
        {children}
      </button>
    </div>
  );
};

export default Button;
