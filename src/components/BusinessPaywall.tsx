import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ShieldCheck, CreditCard } from "lucide-react";
import LoadingScreen from "./LoadingScreen";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";

export default function BusinessPaywall() {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"monthly" | "annual">("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);
  const [loadingText, setLoadingText] = useState("");

  const handleStart = () => {
    setIsLoading(true);
    setLoadingText(selectedPlan === "monthly" ? "Creating your Monthly Pro workspace..." : "Creating your Annual Pro workspace...");
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("trial_started", "true");
      navigate("/dashboard/business");
    }, 2200);
  };

  const handleSkip = () => {
    setIsSkipping(true);
    setLoadingText("Initiating secure Stripe payment session...");
    setTimeout(() => {
      setIsSkipping(false);
      localStorage.setItem("trial_started", "true");
      navigate("/dashboard/business");
    }, 2200);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#FAFAFA] overflow-hidden">
      {/* Loading overlay with Referr icon */}
      <AnimatePresence>
        {(isLoading || isSkipping) && (
          <LoadingScreen text={loadingText} />
        )}
      </AnimatePresence>

      {/* Honeycomb Geometric Background Pattern - Matches Login Page */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] sm:opacity-[0.05] select-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="honeycomb-paywall" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.85)">
              <path d="M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
              <path d="M28 48.5 L56 64.66 L56 97 L28 113.16 L0 97 L0 64.66 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb-paywall)" />
        </svg>
      </div>

      {/* Soft gradient glow behind the card for visual depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#F092DD]/5 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="flex flex-col items-center z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="w-full flex flex-col items-center gap-6"
        >
          {/* logo container */}
          <div className="flex justify-center items-center select-none">
            <img
              src={logoIcon}
              alt="referr logo"
              className="h-24 w-24 md:h-28 md:w-28 object-contain scale-[1.2]"
              referrerPolicy="no-referrer"
            />
          </div>

          <div className="text-center flex flex-col space-y-2 w-full">
            <h4 className="text-2xl text-zinc-900 font-semibold tracking-tight">
              Scale your business on referr
            </h4>
            <p className="text-sm text-zinc-500 font-normal">
              Select your billing plan to unlock full access.
            </p>
          </div>

          <div className="w-full flex flex-col gap-4">
            <div className="space-y-3">
              {/* Monthly selector */}
              <div
                onClick={() => setSelectedPlan("monthly")}
                className={`border p-4 rounded-md cursor-pointer transition-all flex justify-between items-center ${
                  selectedPlan === "monthly"
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    selectedPlan === "monthly" ? "border-black" : "border-zinc-300"
                  }`}>
                    {selectedPlan === "monthly" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-zinc-900">
                      Monthly Pro Plan
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-zinc-900">$25/mo</div>
                </div>
              </div>

              {/* Annual Selector */}
              <div
                onClick={() => setSelectedPlan("annual")}
                className={`border p-4 rounded-md cursor-pointer transition-all flex justify-between items-center relative overflow-hidden ${
                  selectedPlan === "annual"
                    ? "border-black bg-zinc-50"
                    : "border-zinc-200 hover:border-zinc-300 bg-white"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                    selectedPlan === "annual" ? "border-black" : "border-zinc-300"
                  }`}>
                    {selectedPlan === "annual" && (
                      <div className="w-2.5 h-2.5 rounded-full bg-black" />
                    )}
                  </div>
                  <div>
                    <div className="font-semibold text-sm text-zinc-900">
                      Annual Pro Plan
                    </div>
                    <div className="text-[10px] text-[#ec4899] font-bold mt-0.5 uppercase tracking-wider">
                      Save $60/year
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-zinc-900">$240/yr</div>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <button
                onClick={handleStart}
                disabled={isLoading || isSkipping}
                className="w-full bg-black text-white hover:bg-neutral-800 font-semibold py-2.5 px-4 text-sm rounded-md transition-all shadow-sm active:scale-[0.98] flex items-center justify-center disabled:opacity-50"
              >
                Start Risk-Free 7-Day Trial
                <ArrowRight size={16} className="ml-2" />
              </button>

              <button
                onClick={handleSkip}
                disabled={isLoading || isSkipping}
                className="w-full bg-transparent hover:bg-zinc-50 text-zinc-500 hover:text-zinc-700 font-medium py-2 px-4 rounded-md transition-all text-[11px] flex items-center justify-center gap-1.5 disabled:opacity-50"
              >
                <CreditCard size={12} />
                Skip trial & pay {selectedPlan === "monthly" ? "$25" : "$240"} now
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-zinc-400 py-2">
              <ShieldCheck size={14} className="text-pink-500" />
              Anytime cancellation. Secure Stripe Checkout.
            </div>
          </div>

          <p className="text-center text-[10px] text-zinc-400 leading-normal max-w-xs mx-auto mt-4">
            Secure enterprise payment handling provided by Stripe. By starting a trial, you agree to our commercial terms.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
