import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";
import LoadingScreen from "./LoadingScreen";
import {
  IconSprout,
  IconGraph,
  IconDiamond,
  IconCoins,
  IconPiggyBank,
  IconBriefcase,
  IconCompass,
  IconSearch,
  IconPackage,
} from "./CustomIcons";

export default function CreateProfile() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [selections, setSelections] = useState({
    ref: "",
    goal: "",
    workStyle: [] as string[],
  });
  const navigate = useNavigate();
  const userName =
    localStorage.getItem("hustlerName")?.split(" ")[0] || "there";

  const isNextDisabled = () => {
    if (step === 1) return !selections.ref;
    if (step === 2) return !selections.goal;
    if (step === 3) return selections.workStyle.length === 0;
    return false;
  };

  const loadingMessages = [
    "Building your profile",
    "Setting up your workspace",
    "Finding the best deals",
    "Almost ready",
  ];

  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        setLoadingStep((prev) =>
          prev < loadingMessages.length - 1 ? prev + 1 : prev,
        );
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isSubmitting]);

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate("/dashboard");
    }, 3500);
  };

  return (
    <div className="relative flex flex-col h-[100dvh] bg-[#FAFAFA] overflow-hidden">
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

      {isSubmitting && (
        <LoadingScreen text={loadingMessages[loadingStep]} />
      )}

      <div
        className={`flex flex-col h-full transition-all duration-1000 ${isSubmitting ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
      >
        <div className="w-full pt-6 md:pt-8 pb-0 flex justify-center z-20">
    <img
      src={logoIcon}
      alt="Referr Icon"
      className="h-24 w-24 md:h-32 md:w-32 object-contain scale-[1.2]"
      referrerPolicy="no-referrer"
    />
  </div>

        <main className="flex-1 flex flex-col pt-4 md:pt-6 max-w-5xl w-full mx-auto px-4 lg:px-12 overflow-hidden">
          {/* Progress Bar Fixed at Top */}
          <div className="w-full pb-6 md:pb-10 flex items-center gap-3 md:gap-4 flex-shrink-0">
            <span className="text-[12px] md:text-[14px] font-black text-[#ec4899] tracking-widest">
              {step}/3
            </span>
            <div className="flex-1 bg-[#f1f1f1] rounded-full h-1 overflow-hidden">
              <div
                className="bg-[#ec4899] h-full transition-all duration-300 ease-out"
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full pb-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex justify-center">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[800px]">
                <h2 className="text-[24px] md:text-[40px] font-medium text-[#222325] tracking-tight leading-tight mb-3 md:mb-4">
                  A few quick questions: first, have you freelanced before?
                </h2>
                <p className="text-[15px] md:text-[18px] text-[#62646a] mb-4 max-w-2xl font-light">
                  Tell us about your experience level.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                  {[
                    {
                      label: "I am brand new to this",
                      value: "NEW_TO_ME",
                      icon: IconSprout,
                    },
                    {
                      label: "I have some experience",
                      value: "NEEDS_TIP",
                      icon: IconGraph,
                    },
                    {
                      label: "I am an expert",
                      value: "EXPERT",
                      icon: IconDiamond,
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="group relative flex flex-col p-6 md:p-8 border border-[#e4e5e7] bg-white rounded-xl cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#ec4899] transition-all duration-300 has-[:checked]:border-[#ec4899] has-[:checked]:ring-1 has-[:checked]:ring-[#ec4899] has-[:checked]:bg-[#fafafa]"
                    >
                      <input
                        type="radio"
                        name="ref"
                        className="peer opacity-0 absolute inset-0 cursor-pointer"
                        value={option.value}
                        checked={selections.ref === option.value}
                        onChange={(e) =>
                          setSelections((prev) => ({
                            ...prev,
                            ref: e.target.value,
                          }))
                        }
                      />
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-5 h-5 rounded-full border border-[#c5c6c9] group-has-[:checked]:border-[#ec4899] group-has-[:checked]:bg-[#ec4899] flex items-center justify-center transition-colors">
                        <svg
                          className="w-3 h-3 text-white opacity-0 group-has-[:checked]:opacity-100"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="3"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                      </div>

                      <div className="mb-6 md:mb-10">
                        <option.icon
                          className="w-8 h-8 md:w-10 md:h-10 text-[#74767e] group-hover:text-[#ec4899] group-has-[:checked]:text-[#ec4899] transition-colors"
                          strokeWidth={1}
                        />
                      </div>
                      <span className="font-bold text-[15px] md:text-[16px] text-[#404145] leading-snug">
                        {option.label}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[800px]">
                <h2 className="text-[24px] md:text-[40px] font-medium text-[#222325] tracking-tight leading-tight mb-3 md:mb-4">
                  Got it. What's your biggest goal for freelancing?
                </h2>
                <p className="text-[15px] md:text-[18px] text-[#62646a] mb-4 max-w-2xl font-light">
                  What are you looking to achieve?
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
                  {[
                    {
                      label: "To earn my main income",
                      value: "MAIN_INCOME",
                      icon: IconCoins,
                    },
                    {
                      label: "To make money on the side",
                      value: "MONEY_ON_SIDE",
                      icon: IconPiggyBank,
                    },
                    {
                      label: "To get experience, for a full-time job",
                      value: "GET_EXPERIENCE",
                      icon: IconBriefcase,
                    },
                    {
                      label: "I don't have a goal in mind yet",
                      value: "EXPLORING",
                      icon: IconCompass,
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="group relative flex items-center p-4 md:p-6 border border-[#e4e5e7] bg-white rounded-xl cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#ec4899] transition-all duration-300 has-[:checked]:border-[#ec4899] has-[:checked]:ring-1 has-[:checked]:ring-[#ec4899] has-[:checked]:bg-[#fafafa]"
                    >
                      <input
                        type="radio"
                        name="goal"
                        className="peer opacity-0 absolute inset-0 cursor-pointer"
                        value={option.value}
                        checked={selections.goal === option.value}
                        onChange={(e) =>
                          setSelections((prev) => ({
                            ...prev,
                            goal: e.target.value,
                          }))
                        }
                      />
                      <div className="mr-4 md:mr-5 flex-shrink-0">
                        <option.icon
                          className="w-7 h-7 md:w-9 md:h-9 text-[#74767e] group-hover:text-[#ec4899] group-has-[:checked]:text-[#ec4899] transition-colors"
                          strokeWidth={1}
                        />
                      </div>
                      <div className="flex-1">
                        <span className="font-semibold text-[15px] md:text-[17px] text-[#222325]">
                          {option.label}
                        </span>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <div className="w-5 h-5 rounded-full border border-[#c5c6c9] group-has-[:checked]:border-[#ec4899] group-has-[:checked]:bg-[#ec4899] flex items-center justify-center transition-colors">
                          <svg
                            className="w-3 h-3 text-white opacity-0 group-has-[:checked]:opacity-100"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[800px]">
                <h2 className="text-[24px] md:text-[40px] font-medium text-[#222325] tracking-tight leading-tight mb-3 md:mb-4">
                  And how would you like to work?
                </h2>
                <p className="text-[15px] md:text-[18px] text-[#62646a] mb-4 max-w-2xl font-light">
                  Select your preferred ways to work.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[
                    {
                      label: "I'd like to find opportunities myself",
                      value: "SEARCH",
                      icon: IconSearch,
                      desc: "You can browse and bid for them, or get invited by a client.",
                    },
                    {
                      label:
                        "I'd like to package up my work for clients to buy",
                      value: "PACKAGE",
                      icon: IconPackage,
                      desc: "Define your service with prices and timelines: we'll list it.",
                    },
                  ].map((option) => (
                    <label
                      key={option.value}
                      className="group relative flex flex-col items-start p-6 md:p-8 border border-[#e4e5e7] bg-white rounded-xl cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#ec4899] transition-all duration-300 has-[:checked]:border-[#ec4899] has-[:checked]:ring-1 has-[:checked]:ring-[#ec4899] has-[:checked]:bg-[#fafafa]"
                    >
                      <div className="absolute top-6 right-6 md:top-8 md:right-8">
                        <input
                          type="checkbox"
                          name="work_style"
                          className="peer opacity-0 absolute inset-0 cursor-pointer"
                          value={option.value}
                          checked={selections.workStyle.includes(option.value)}
                          onChange={(e) => {
                            const val = e.target.value;
                            setSelections((prev) => ({
                              ...prev,
                              workStyle: e.target.checked
                                ? [...prev.workStyle, val]
                                : prev.workStyle.filter((i) => i !== val),
                            }));
                          }}
                        />
                        <div className="w-5 h-5 rounded border border-[#c5c6c9] group-has-[:checked]:border-[#ec4899] group-has-[:checked]:bg-[#ec4899] flex items-center justify-center transition-colors">
                          <svg
                            className="w-3.5 h-3.5 text-white opacity-0 group-has-[:checked]:opacity-100"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            ></path>
                          </svg>
                        </div>
                      </div>
                      <div className="mb-4 md:mb-6">
                        <option.icon
                          className="w-9 h-9 md:w-11 md:h-11 text-[#74767e] group-hover:text-[#ec4899] group-has-[:checked]:text-[#ec4899] transition-colors"
                          strokeWidth={1}
                        />
                      </div>
                      <span className="font-semibold text-lg md:text-xl text-[#222325] leading-snug mb-2 md:mb-3 pr-8">
                        {option.label}
                      </span>
                      <span className="text-[14px] md:text-[15px] text-[#62646a] font-light leading-relaxed">
                        {option.desc}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
        </main>

        {/* Footer fixed */}
        <footer className="w-full bg-transparent py-4 px-6 lg:px-12 flex-shrink-0 z-10">
          <div className="max-w-5xl mx-auto flex justify-between items-center">
            <button
              onClick={() => (step > 1 ? setStep(step - 1) : null)}
              className={`font-black text-[15px] md:text-[16px] uppercase tracking-widest px-6 py-3.5 rounded-[4px] transition-colors ${step > 1 ? "text-[#62646a] hover:bg-[#f5f5f5] cursor-pointer" : "text-[#c5c6c9] pointer-events-none opacity-0"}`}
            >
              Back
            </button>

            <button
              onClick={() => (step < 3 ? setStep(step + 1) : handleFinish())}
              disabled={isNextDisabled()}
              className={`flex-1 md:flex-none px-8 py-3.5 text-white font-black text-[15px] md:text-[16px] uppercase tracking-widest rounded-[4px] shadow-md transition-all active:scale-[0.98] ${
                isNextDisabled()
                  ? "bg-[#ec4899] opacity-40 cursor-not-allowed"
                  : "bg-[#ec4899] hover:bg-[#db2777] cursor-pointer"
              }`}
            >
              {step < 3 ? "Next" : "Finish"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
