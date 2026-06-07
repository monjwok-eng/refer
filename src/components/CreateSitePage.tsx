import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  LayoutTemplate,
  Palette,
  CheckCircle2,
  Sparkles,
  Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Navbar";
import LoadingScreen from "./LoadingScreen";

export default function CreateSitePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);

  const [siteDescription, setSiteDescription] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteGoals, setSiteGoals] = useState("");

  const loadingTasks = [
    "Analyzing business requirements",
    "Synthesizing layout architecture",
    "Curating unique design tokens",
    "Generating responsive grid",
    "Injecting creative intelligence",
    "Preparing your workspace",
  ];

  useEffect(() => {
    if (showSpinner) {
      const interval = setInterval(() => {
        setLoadingStep((prev) => 
          prev < loadingTasks.length - 1 ? prev + 1 : prev
        );
      }, 1800);
      return () => clearInterval(interval);
    }
  }, [showSpinner]);

  const handleGenerate = () => {
    setShowSpinner(true);
    setTimeout(() => {
      navigate("/design-arial", {
        state: { siteName, siteDescription, siteGoals },
      });
    }, 11000); 
  };

  if (showSpinner) {
    return (
      <LoadingScreen 
        text={loadingTasks[loadingStep]} 
      />
    );
  }

  return (
    <div className="min-h-[100dvh] bg-white flex flex-col font-sans text-slate-900 overflow-x-hidden">
      {/* Header */}
      <header className="h-[64px] md:h-[80px] bg-white flex items-center justify-between px-5 md:px-12 z-20 shrink-0 border-b border-slate-100 sticky top-0">
        <Logo />
        <button
          onClick={() => navigate("/dashboard/business")}
          className="text-[14px] md:text-[15px] font-bold text-slate-500 hover:text-black transition-colors"
        >
          <span className="hidden sm:inline">Skip to Dashboard</span>
          <span className="sm:hidden">Skip</span>
        </button>
      </header>

      {/* Progress Bar */}
      {step > 0 && step <= 4 && (
        <div className="w-full h-1 bg-slate-100 shrink-0">
          <div
            className="h-full bg-[#ec4899] transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full px-5 md:px-6 pt-10 md:pt-12 pb-32 bg-[#FAFAFA]">
        {/* Honeycomb Background Pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] select-none z-0">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="honeycomb-create" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(1.2)">
                <path d="M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
                <path d="M28 48.5 L56 64.66 L56 97 L28 113.16 L0 97 L0 64.66 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#honeycomb-create)" />
          </svg>
        </div>

        <div className="w-full max-w-[800px] flex-1 flex flex-col justify-center mt-[-40px] md:mt-[-80px] z-10">
          {step === 0 && (
            <div className="animate-in fade-in zoom-in-95 duration-500 flex flex-col justify-center text-left">
              <h1 className="text-[28px] md:text-3xl font-black mb-3 md:mb-4 text-[#222325] tracking-tight leading-tight">
                Let's bring your ideas to life
              </h1>
              <p className="text-[#62646a] mb-8 md:mb-10 text-[16px] md:text-[18px] leading-relaxed">
                Answer a few quick questions to get a personalized site
                structured specifically for your goals.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-3 md:gap-4">
                <button
                  onClick={() => setStep(1)}
                  className="w-full sm:w-auto bg-black text-white px-8 h-[52px] md:h-auto md:py-3 rounded-[4px] font-bold hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 text-[16px] shadow-sm"
                >
                  Get started
                </button>
                <button
                  onClick={() => navigate("/dashboard/business")}
                  className="w-full sm:w-auto h-[52px] md:h-auto px-8 md:py-3 rounded-[4px] font-bold text-[#62646a] hover:bg-white border border-transparent hover:border-slate-200 transition-all flex items-center justify-center gap-2 text-[16px]"
                >
                  Skip for now
                </button>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col">
              <h1 className="text-[24px] md:text-[28px] font-black mb-6 md:mb-10 text-[#222325] tracking-tight leading-tight">
                First, what is your site all about?
              </h1>

              <div className="w-full flex flex-col gap-6 md:gap-10 items-start">
                <div className="w-full relative">
                  <div className="text-[14px] md:text-[16px] font-bold text-[#404145] mb-2 md:mb-3">
                    Describe briefly
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. An online store that sells..."
                    className="w-full border border-[#e4e5e7] rounded-[4px] bg-white px-4 md:px-5 py-3.5 md:py-4 text-[16px] md:text-[18px] font-medium text-[#222325] focus:outline-none focus:border-[#ec4899] transition-colors shadow-sm"
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="w-full">
                  <h3 className="text-[14px] md:text-[16px] font-bold text-[#404145] mb-3 md:mb-4">
                    Popular Options
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                      "Online store",
                      "Portfolio",
                      "Service provider",
                      "Blog",
                      "Landing page",
                      "Non-profit",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSiteDescription(suggestion)}
                        className="px-4 md:px-5 py-2.5 rounded-[4px] bg-white border border-[#e4e5e7] text-[#404145] font-semibold text-[14px] md:text-[15px] hover:border-[#ec4899] hover:text-[#ec4899] transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col">
              <h1 className="text-[24px] md:text-[28px] font-black mb-6 md:mb-10 text-[#222325] tracking-tight leading-tight">
                What's the name of your site?
              </h1>

              <div className="w-full flex flex-col gap-6 md:gap-10 items-start">
                <div className="w-full relative">
                  <div className="text-[14px] md:text-[16px] font-bold text-[#404145] mb-2 md:mb-3">
                    Site Name
                  </div>
                  <input
                    type="text"
                    placeholder="e.g. Trendy Boutique"
                    className="w-full border border-[#e4e5e7] rounded-[4px] bg-white px-4 md:px-5 py-3.5 md:py-4 text-[16px] md:text-[18px] font-medium text-[#222325] focus:outline-none focus:border-[#ec4899] transition-colors shadow-sm"
                    value={siteName}
                    onChange={(e) => setSiteName(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="w-full">
                  <h3 className="text-[14px] md:text-[16px] font-bold text-[#404145] mb-3 md:mb-4">
                    Ideas
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                      "ShopSphere",
                      "QuickCart",
                      "MarketMingle",
                      "ReferrHub",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => setSiteName(suggestion)}
                        className="px-4 md:px-5 py-2.5 rounded-[4px] bg-white border border-[#e4e5e7] text-[#404145] font-semibold text-[14px] md:text-[15px] hover:border-[#ec4899] hover:text-[#ec4899] transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="animate-in fade-in slide-in-from-right-8 duration-500 flex flex-col">
              <h1 className="text-[24px] md:text-[28px] font-black mb-6 md:mb-10 text-[#222325] tracking-tight leading-tight">
                What are your goals for this site?
              </h1>

              <div className="w-full flex flex-col gap-6 md:gap-10 items-start">
                <div className="w-full">
                  <div className="text-[14px] md:text-[16px] font-bold text-[#404145] mb-2 md:mb-3">
                    Site Goals
                  </div>
                  <textarea
                    placeholder="e.g. Boost online sales, Connect with customers"
                    className="w-full border border-[#e4e5e7] rounded-[4px] bg-white px-4 md:px-5 py-3.5 md:py-4 min-h-[140px] text-[16px] md:text-[18px] font-medium text-[#222325] focus:outline-none focus:border-[#ec4899] transition-colors resize-none shadow-sm"
                    value={siteGoals}
                    onChange={(e) => setSiteGoals(e.target.value)}
                    autoFocus
                  />
                </div>

                <div className="w-full">
                  <h3 className="text-[14px] md:text-[16px] font-bold text-[#404145] mb-3 md:mb-4">
                    Common Goals
                  </h3>
                  <div className="flex flex-wrap gap-2 md:gap-3">
                    {[
                      "Boost sales",
                      "Grow brand",
                      "Capture leads",
                      "Build loyalty",
                      "Share products",
                    ].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          const newGoals = siteGoals
                            ? `${siteGoals}, ${suggestion}`
                            : suggestion;
                          setSiteGoals(newGoals);
                        }}
                        className="px-4 md:px-5 py-2 rounded-[4px] bg-white border border-[#e4e5e7] text-[#404145] font-semibold text-[13px] md:text-[15px] hover:border-[#ec4899] hover:text-[#ec4899] transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Fixed Bottom Navigation */}
      {step > 0 && (
        <footer className="fixed bottom-0 left-0 right-0 h-[80px] md:h-20 bg-white border-t border-slate-100 px-5 md:px-12 flex items-center justify-between z-30 animate-in slide-in-from-bottom-8 duration-500 shadow-[0_-4px_12px_rgba(0,0,0,0.02)]">
          <button
            onClick={() => setStep(step - 1)}
            className="h-[52px] md:h-auto px-6 md:py-2.5 rounded-[4px] font-bold text-[#62646a] hover:bg-slate-50 transition-colors text-[15px] md:text-[16px]"
          >
            Back
          </button>
          <div className="flex items-center gap-2 md:gap-4">
            <button
              onClick={() => {
                if (step === 3) handleGenerate();
                else setStep(step + 1);
              }}
              className="h-[52px] md:h-auto px-4 md:px-6 md:py-2.5 rounded-[4px] font-bold text-[#62646a] hover:bg-slate-50 transition-colors text-[15px] md:text-[16px]"
            >
              Skip
            </button>
            <button
              onClick={() => {
                if (step === 3) handleGenerate();
                else setStep(step + 1);
              }}
              disabled={
                (step === 1 && !siteDescription.trim()) ||
                (step === 2 && !siteName.trim()) ||
                (step === 3 && !siteGoals.trim())
              }
              className="h-[52px] md:h-auto bg-black text-white px-8 md:py-2.5 rounded-[4px] font-extrabold text-[15px] md:text-[16px] hover:bg-zinc-800 transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-sm"
            >
              Continue
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
