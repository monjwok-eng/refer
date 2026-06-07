import React from "react";
import { motion } from "motion/react";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";

interface LoadingScreenProps {
  text?: string;
  fullScreen?: boolean;
}

export default function LoadingScreen({ text = "Loading your creative space...", fullScreen = true }: LoadingScreenProps) {
  const containerClasses = fullScreen 
    ? "fixed inset-0 z-[200] bg-white/95 backdrop-blur-md flex flex-col justify-center items-center p-6 select-none"
    : "flex flex-col justify-center items-center p-6 select-none w-full h-full min-h-[300px]";

  return (
    <div className={containerClasses}>
      <div className="relative flex flex-col items-center">
        {/* Spinning outer outline circle - Gradient themed with Referr palette */}
        <div className="absolute w-28 h-28 rounded-full border-4 border-t-[#ec4899] border-r-slate-100 border-b-[#db2777] border-l-slate-100 animate-spin duration-1000" />
        
        {/* Pulsing inner Referr icon */}
        <motion.div
          animate={{
            scale: [0.95, 1.1, 0.95],
            opacity: [0.8, 1, 0.8],
          }}
          transition={{
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut",
          }}
          className="w-24 h-24 flex items-center justify-center bg-transparent z-10"
        >
          <img
            src={logoIcon}
            alt="Referr Loading"
            className="h-16 w-16 object-contain scale-[1.3] drop-shadow-sm"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </div>
      
      {text && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-10 flex flex-col items-center gap-3"
        >
          <h4 className="text-[17px] font-black text-slate-800 tracking-tight text-center uppercase">
            Referr
          </h4>
          <p className="text-[14px] font-medium text-slate-500 tracking-wide text-center">
            {text}
          </p>
        </motion.div>
      )}
    </div>
  );
}
