import React from "react";
import { Link } from "react-router-dom";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";

interface LogoProps {
  className?: string;
  theme?: "dark" | "light";
  showText?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  theme = "dark",
  showText = false,
  size = "md"
}) => {
  const sizeClasses = {
    sm: "h-[40px] sm:h-[45px] md:h-[52px] w-auto",
    md: "h-[54px] sm:h-[60px] md:h-[68px] w-auto",
    lg: "h-[85px] sm:h-[100px] md:h-[115px] w-auto",
    xl: "h-[115px] sm:h-[145px] md:h-[165px] w-auto",
  };

  const selectedSize = sizeClasses[size];

  return (
    <Link to="/" className={`flex items-center gap-0.5 group ${className}`}>
      <img
        src={logoIcon}
        alt="referr logo"
        className={`${selectedSize} object-contain transition-transform duration-200 hover:scale-[1.05] ${theme === "dark" ? "brightness-0 invert" : "brightness-0"}`}
        referrerPolicy="no-referrer"
      />
      {showText && (
        <span className={`${theme === "dark" ? "text-white" : "text-black"} font-semibold text-2xl tracking-tighter italic whitespace-nowrap overflow-hidden ml-1`}>
          Referr
        </span>
      )}
    </Link>
  );
};

export default Logo;
