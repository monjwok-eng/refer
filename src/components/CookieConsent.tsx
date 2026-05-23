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
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{ type: "spring", damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgb(0,0,0,0.05)] p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="flex-1 max-w-4xl">
            <div className="flex items-center gap-2 mb-2">
              <Cookie size={20} className="text-gray-700" />
              <h3 className="text-lg font-bold text-gray-900">This website uses cookies</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              We use cookies and similar technologies to provide the necessary site functionality, and improve your experience on our website.
              <span className="hidden sm:inline"> By clicking the "Accept All Cookies" button, you consent to our <Link to="/cookies-statement" onClick={() => setIsVisible(false)} className="text-primary underline font-medium hover:text-[#19a463]">use of cookies</Link> for all purposes.</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={handleDecline}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 transition-colors whitespace-nowrap"
            >
              Manage Cookie Preferences
            </button>
            <button
              onClick={handleAccept}
              className="w-full sm:w-auto px-6 py-3 rounded-full font-bold text-sm text-black bg-[#ffcc00] hover:bg-[#ffdb4d] transition-colors whitespace-nowrap"
            >
              Accept All Cookies
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
