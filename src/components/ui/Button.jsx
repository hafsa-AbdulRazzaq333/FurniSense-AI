import React from "react";
import { NavLink } from "react-router-dom";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  href,
  to,
  ...props
}) => {
  const sharedClasses = [
    "inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B5E3C] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F8F5F0]",
    size === "md"
      ? "px-6 py-3 text-sm sm:px-7 sm:py-3.5 sm:text-base"
      : "px-5 py-2.5 text-sm",
  ];

  const variants = {
    primary:
      "bg-[#8B5E3C] text-white shadow-[0_18px_35px_rgba(139,94,60,0.18)] hover:-translate-y-0.5 hover:bg-[#735033]",
    secondary:
      "border border-[#E8DED3] bg-white text-[#2D2D2D] hover:border-[#C89B6D] hover:text-[#8B5E3C] hover:shadow-[0_12px_30px_rgba(45,45,45,0.06)]",
  };

  const classes = [...sharedClasses, variants[variant], className].join(" ");

  if (to) {
    return (
      <NavLink to={to} className={classes} {...props}>
        {children}
        {Icon && <Icon size={18} />}
      </NavLink>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} {...props}>
        {children}
        {Icon && <Icon size={18} />}
      </a>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
      {Icon && <Icon size={18} />}
    </button>
  );
};

export default Button;
