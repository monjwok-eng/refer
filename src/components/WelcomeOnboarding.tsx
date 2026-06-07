import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  User,
  ClipboardCheck,
  ShieldCheck,
  ArrowRight,
  Star,
  Clock,
} from "lucide-react";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";

export default function WelcomeOnboarding() {
  const navigate = useNavigate();
  const userName =
    localStorage.getItem("hustlerName")?.split(" ")[0] || "there";

  const handleGetStarted = () => {
    navigate("/create-profile");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] flex flex-col items-center font-sans overflow-x-hidden relative">
      {/* Honeycomb Geometric Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] sm:opacity-[0.05] select-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="honeycomb-onboard" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.85)">
              <path d="M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
              <path d="M28 48.5 L56 64.66 L56 97 L28 113.16 L0 97 L0 64.66 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb-onboard)" />
        </svg>
      </div>

      {/* Soft warm/pink gradient glow behind the card for visual depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#F092DD]/5 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />

      {/* Header */}
      <div className="w-full pt-6 md:pt-8 pb-0 flex justify-center z-20">
    <img
      src={logoIcon}
      alt="Referr Icon"
      className="h-24 w-24 md:h-32 md:w-32 object-contain scale-[1.2]"
      referrerPolicy="no-referrer"
    />
  </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-5 lg:px-6 pt-4 lg:pt-12 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 min-h-[calc(100vh-80px)]">
        {/* Stories Video Container - Hidden on mobile, visible on LG+ */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative hidden lg:block w-full max-w-[280px] sm:max-w-[340px] h-[300px] sm:h-[480px] shrink-0 lg:order-last"
        >
          {[
            {
              src: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=600&q=80",
              className:
                "absolute top-0 left-0 w-32 sm:w-44 h-52 sm:h-72 rounded-2xl rotate-[-8deg] shadow-xl overflow-hidden border border-white z-10 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300",
            },
            {
              src: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=600&q=80",
              className:
                "absolute top-10 right-0 w-36 sm:w-48 h-60 sm:h-80 rounded-2xl rotate-[5deg] shadow-xl overflow-hidden border border-white z-20 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300",
            },
            {
              src: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?auto=format&fit=crop&w=600&q=80",
              className:
                "absolute bottom-0 sm:bottom-5 left-8 sm:left-12 w-32 sm:w-44 h-52 sm:h-72 rounded-2xl rotate-[-2deg] shadow-lg overflow-hidden border border-white z-30 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300",
            },
          ].map((v, i) => (
            <motion.div key={i} className={v.className} whileHover={{ y: -10 }}>
              <img
                src={v.src}
                alt="Business success"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="w-full max-w-xl space-y-6 lg:space-y-8"
        >
          {/* Heading */}
          <h2 className="text-[26px] md:text-[40px] font-black text-[#404145] leading-[1.2] tracking-tight mb-4 lg:mb-8 text-center lg:text-left">
            Hey {userName}. Ready for your next big opportunity?
          </h2>

          {/* List of benefits */}
          <div className="space-y-4 lg:space-y-6 pt-2 lg:pt-4">
            {[
              {
                icon: User,
                text: "Answer a few questions and start building your profile",
              },
              {
                icon: ClipboardCheck,
                text: "Apply for open roles or list services for clients to buy",
              },
              {
                icon: ShieldCheck,
                text: "Get paid safely and know we’re there to help",
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ x: 5 }}
                className="flex gap-4 items-start p-2 rounded-[4px] hover:bg-slate-50 transition-colors"
              >
                <item.icon className="w-5 h-5 text-[#ec4899] mt-1 shrink-0" />
                <p className="text-[16px] text-[#404145] font-medium leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center lg:items-start gap-4 pt-4 pb-12 lg:pb-0">
            <button
              onClick={handleGetStarted}
              className="w-full sm:w-auto px-10 h-[48px] bg-[#ec4899] text-white rounded-[4px] font-black text-[15px] md:text-[16px] uppercase tracking-widest hover:bg-[#db2777] focus:ring-2 focus:ring-offset-2 focus:ring-[#ec4899] transition-colors flex items-center justify-center active:scale-[0.98]"
            >
              Get started
            </button>
            <p className="text-[14px] text-[#62646a] font-medium text-center lg:text-left">
              It only takes 5-10 minutes. We’ll save as you go.
            </p>
          </div>
        </motion.div>
      </main>

      {/* Bottom info for mobile */}
      <div className="lg:hidden w-full bg-transparent px-6 py-4 mt-auto">
        <p className="text-[#62646a] text-[13px] font-medium text-center flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-[#ec4899]" />
          5-10 minutes • Progress automatically saved
        </p>
      </div>
    </div>
  );
}
