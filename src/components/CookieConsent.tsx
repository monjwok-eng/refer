import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Cookie } from "lucide-react";
import { Link } from "react-router-dom";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted/declined cookies
    const consent = localStorage.getItem("cookieConsent");
    if (!consent) {
      // Delay showing for better UX
      const timer = setTimeout(() => setIsVisible(true), 500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  const handleDecline = () => {
    localStorage.setItem("cookieConsent", "declined");
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ type: "spring", damping: 25, stiffness: 220 }}
          className="fixed bottom-4 left-4 right-4 md:bottom-6 md:right-6 md:left-auto z-[9999] md:max-w-sm w-auto bg-white border border-slate-200/90 shadow-[0_20px_50px_rgba(34,35,37,0.15)] p-5 rounded-2xl flex flex-col gap-4 text-left"
        >
          <div className="flex items-start gap-3 text-left">
            <div className="w-10 h-10 rounded-xl bg-[#e8f8f1] flex items-center justify-center shrink-0 border border-[#b2ebd0]">
              <Cookie size={20} className="text-[#1dbf73]" />
            </div>
            <div className="text-left flex-1">
              <h3 className="text-sm font-bold text-[#222325] leading-tight flex items-center gap-1.5">
                Cookie Integrity <span className="w-1.5 h-1.5 rounded-full bg-[#1dbf73] animate-pulse"></span>
              </h3>
              <p className="text-[12px] text-[#74767e] mt-1.5 leading-relaxed">
                Referr uses secure cookies to calculate campaign clicks, track commission attributions, and authenticate your advocate profile correctly.
              </p>
            </div>
          </div>
          
          <div className="border-t border-slate-100 pt-3 text-left">
            <p className="text-[11px] text-[#74767e] leading-relaxed">
              We never sell or distribute personal metrics. By continuing, you agree to our digital tracking terms. Access the <Link to="/cookies-statement" onClick={() => setIsVisible(false)} className="text-[#1dbf73] font-bold hover:underline">Cookie Policy</Link>.
            </p>
          </div>

          <div className="flex items-center gap-2.5 w-full">
            <button
              onClick={handleDecline}
              className="flex-1 px-4 py-2.5 bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-bold text-xs rounded-xl transition-all cursor-pointer text-center flex items-center justify-center"
              style={{ minHeight: "44px" }}
            >
              Essential Only
            </button>
            <button
              onClick={handleAccept}
              className="flex-1 px-4 py-2.5 bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold text-xs rounded-xl transition-all cursor-pointer shadow-sm shadow-[#1dbf73]/20 hover:shadow-md text-center flex items-center justify-center"
              style={{ minHeight: "44px" }}
            >
              Accept & Support
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
