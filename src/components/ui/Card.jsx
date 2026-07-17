import React from "react";

const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`rounded-[1.6rem] border border-[#E8DED3] bg-white/90 shadow-[0_20px_50px_rgba(45,45,45,0.06)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;
