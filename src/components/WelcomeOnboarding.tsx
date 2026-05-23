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
import Navbar from "./Navbar";

export default function WelcomeOnboarding() {
  const navigate = useNavigate();
  const userName =
    localStorage.getItem("hustlerName")?.split(" ")[0] || "there";

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans overflow-x-hidden">
      {/* Header */}
      <Navbar variant="skinny" userName={userName} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-5 lg:px-6 pt-24 lg:pt-32 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 min-h-[calc(100vh-80px)]">
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
                <item.icon className="w-5 h-5 text-[#1dbf73] mt-1 shrink-0" />
                <p className="text-[16px] text-[#404145] font-medium leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-center lg:items-start gap-4 pt-4">
            <button
              onClick={() => navigate("/create-profile")}
              className="w-full sm:w-auto px-10 h-[48px] bg-[#1dbf73] text-white rounded-[4px] font-bold text-[16px] hover:bg-[#19a463] focus:ring-2 focus:ring-offset-2 focus:ring-[#1dbf73] transition-colors flex items-center justify-center active:scale-[0.98]"
            >
              Get started
            </button>
            <p className="text-[14px] text-[#62646a] font-medium text-center lg:text-left">
              It only takes 5-10 minutes. We’ll save as you go.
            </p>
          </div>
        </motion.div>

        {/* Stories Video Container - Hidden on small mobile, shown from tablet up */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative w-full max-w-[280px] sm:max-w-[340px] h-[360px] sm:h-[480px] shrink-0 pb-10 lg:pb-0"
        >
          {[
            {
              src: "https://www.w3schools.com/tags/movie.mp4",
              className:
                "absolute top-0 left-0 w-32 sm:w-44 h-52 sm:h-72 rounded-2xl rotate-[-8deg] shadow-xl overflow-hidden border border-white z-10 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300",
            },
            {
              src: "https://www.w3schools.com/tags/movie.mp4",
              className:
                "absolute top-10 right-0 w-36 sm:w-48 h-60 sm:h-80 rounded-2xl rotate-[5deg] shadow-xl overflow-hidden border border-white z-20 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300",
            },
            {
              src: "https://www.w3schools.com/tags/movie.mp4",
              className:
                "absolute bottom-0 sm:bottom-5 left-8 sm:left-12 w-32 sm:w-44 h-52 sm:h-72 rounded-2xl rotate-[-2deg] shadow-lg overflow-hidden border border-white z-30 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300",
            },
          ].map((v, i) => (
            <motion.div key={i} className={v.className} whileHover={{ y: -10 }}>
              <video
                src={v.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Bottom info for mobile */}
      <div className="lg:hidden w-full bg-slate-50 border-t border-slate-200 px-6 py-4 mt-auto">
        <p className="text-[#62646a] text-[13px] font-medium text-center flex items-center justify-center gap-2">
          <Clock className="w-4 h-4 text-[#1dbf73]" />
          5-10 minutes • Progress automatically saved
        </p>
      </div>
    </div>
  );
}
