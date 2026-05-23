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

export default function CreateSitePage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [showSpinner, setShowSpinner] = useState(false);

  const [siteDescription, setSiteDescription] = useState("");
  const [siteName, setSiteName] = useState("");
  const [siteGoals, setSiteGoals] = useState("");

  const handleGenerate = () => {
    setShowSpinner(true);
    setTimeout(() => {
      navigate("/design-aria", {
        state: { siteName, siteDescription, siteGoals },
      });
    }, 11000); // Further increased for a more deliberate transition
  };

  if (showSpinner) {
    const loadingTasks = [
      "Analyzing business requirements",
      "Synthesizing layout architecture",
      "Curating unique design tokens",
      "Generating responsive grid",
      "Injecting creative intelligence",
      "Preparing your workspace",
    ];

    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-white z-[1000] overflow-hidden text-[#222325] font-sans">
        {/* Minimal ambient light tint */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1dbf73]/[0.02] rounded-full blur-[100px] -mr-40 -mt-20" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#1dbf73]/[0.02] rounded-full blur-[100px] -ml-40 -mb-20" />

        <div className="relative z-10 w-full flex flex-col items-center px-6">
          {/* Minimal Spinner */}
          <div className="relative mb-8 md:mb-20">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 md:w-16 md:h-16 rounded-full border-[1px] border-slate-100 border-t-[#1dbf73]"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <Sparkles size={16} className="text-[#1dbf73] fill-[#1dbf73] md:w-5 md:h-5" />
            </div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="text-center mb-10 md:mb-16"
          >
            <h1 className="text-[24px] md:text-[28px] font-black tracking-tight text-[#222325] mb-3 md:mb-4">
              Designing{" "}
              {siteName ? (
                <span className="text-[#1dbf73]">{siteName}</span>
              ) : (
                "your vision"
              )}
            </h1>
            <p className="text-[#62646a] text-[14px] md:text-[15px] font-medium">
              Aria is crafting your unique ecosystem
            </p>
          </motion.div>

          {/* Sequential Task Feed */}
          <div className="flex flex-col items-start gap-3 md:gap-4 max-w-[280px] md:max-w-none">
            {loadingTasks.map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 + i * 1.5 }}
                className="flex items-center gap-3 md:gap-4 text-[13px] md:text-[14px] text-[#62646a] font-medium"
              >
                <motion.div
                  className="w-1.5 h-1.5 rounded-full bg-[#1dbf73] shrink-0"
                  animate={{
                    opacity: [0.3, 1, 0.3],
                    scale: [0.8, 1.2, 0.8],
                  }}
                  transition={{ duration: 2, delay: i * 1.5, repeat: Infinity }}
                />
                <span className="truncate">{text}</span>
              </motion.div>
            ))}
          </div>

          {/* Micro Progress Bar */}
          <div className="mt-16 md:mt-28 w-full max-w-[240px]">
            <div className="h-[2px] w-full bg-slate-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 11, ease: "easeInOut" }}
                className="h-full bg-[#1dbf73]"
              />
            </div>
            <div className="flex justify-between mt-3 px-1 text-[#222325]/30">
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em]">
                Processing
              </span>
              <motion.span
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em]"
              >
                Live
              </motion.span>
            </div>
          </div>
        </div>
      </div>
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
        <div className="w-full h-1.5 bg-slate-100 shrink-0">
          <div
            className="h-full bg-[#1dbf73] transition-all duration-500 ease-out"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center w-full px-5 md:px-6 pt-10 md:pt-12 pb-32 bg-[#f8f9fa]">
        <div className="w-full max-w-[800px] flex-1 flex flex-col justify-center mt-[-40px] md:mt-[-80px]">
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
                  className="w-full sm:w-auto bg-[#1dbf73] text-white px-8 h-[52px] md:h-auto md:py-3 rounded-[4px] font-bold hover:bg-[#19a463] transition-all flex items-center justify-center gap-2 text-[16px] shadow-md shadow-emerald-500/10"
                >
                  Get started
                </button>
                <button
                  onClick={() => navigate("/editor")}
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
                    className="w-full border border-[#e4e5e7] rounded-[4px] bg-white px-4 md:px-5 py-3.5 md:py-4 text-[16px] md:text-[18px] font-medium text-[#222325] focus:outline-none focus:border-[#1dbf73] transition-colors shadow-sm"
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
                        className="px-4 md:px-5 py-2.5 rounded-[4px] bg-white border border-[#e4e5e7] text-[#404145] font-semibold text-[14px] md:text-[15px] hover:border-[#1dbf73] transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
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
                    className="w-full border border-[#e4e5e7] rounded-[4px] bg-white px-4 md:px-5 py-3.5 md:py-4 text-[16px] md:text-[18px] font-medium text-[#222325] focus:outline-none focus:border-[#1dbf73] transition-colors shadow-sm"
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
                        className="px-4 md:px-5 py-2.5 rounded-[4px] bg-white border border-[#e4e5e7] text-[#404145] font-semibold text-[14px] md:text-[15px] hover:border-[#1dbf73] transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
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
                    className="w-full border border-[#e4e5e7] rounded-[4px] bg-white px-4 md:px-5 py-3.5 md:py-4 min-h-[140px] text-[16px] md:text-[18px] font-medium text-[#222325] focus:outline-none focus:border-[#1dbf73] transition-colors resize-none shadow-sm"
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
                        className="px-4 md:px-5 py-2 rounded-[4px] bg-white border border-[#e4e5e7] text-[#404145] font-semibold text-[13px] md:text-[15px] hover:border-[#1dbf73] transition-colors shadow-sm cursor-pointer whitespace-nowrap active:scale-95"
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
              className="h-[52px] md:h-auto bg-[#1dbf73] text-white px-8 md:py-2.5 rounded-[4px] font-extrabold text-[15px] md:text-[16px] hover:bg-[#19a463] transition-colors disabled:opacity-40 disabled:cursor-not-allowed shadow-md shadow-emerald-500/10"
            >
              Continue
            </button>
          </div>
        </footer>
      )}
    </div>
  );
}
