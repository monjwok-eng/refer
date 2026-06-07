import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import LoadingScreen from "./LoadingScreen";
import {
  ChevronRight,
  ChevronLeft,
  Briefcase,
  Globe,
  Layout,
} from "lucide-react";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";

type Step =
  | "identity"
  | "company_size"
  | "referral_goals"
  | "lead_description"
  | "needs_website";

export default function BusinessOnboarding() {
  const [currentStep, setCurrentStep] = useState<Step>("identity");
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const navigate = useNavigate();

  const [businessData, setBusinessData] = useState({
    name: localStorage.getItem("businessName") || "",
    industry: "",
    description: "",
    companySize: "",
    serviceFocus: "",
    logo: null as string | null,
    website: "",
    needsWebsite: null as boolean | null,
    siteAbout: "",
    siteName: "",
    websiteDescription: "",
    referralGoals: "",
  });

  const getLoadingMessages = () => [
    `Creating ${businessData.name || "your dashboard"}`,
    "Setting up your workspace",
    "Finalizing your hiring pipeline",
    "Almost ready",
  ];

  React.useEffect(() => {
    if (loading) {
      const messages = getLoadingMessages();
      const interval = setInterval(() => {
        setLoadingStep((prev) =>
          prev < messages.length - 1 ? prev + 1 : prev,
        );
      }, 800);
      return () => clearInterval(interval);
    }
  }, [loading, businessData.name]);

  const industries = [
    "Technology & Software",
    "Creative & Design",
    "Marketing & Sales",
    "Business Services",
    "Education & Training",
    "Health & Wellness",
    "Retail & E-commerce",
    "Other",
  ];

  const handleNext = () => {
    switch (currentStep) {
      case "identity":
        setCurrentStep("company_size");
        break;
      case "company_size":
        setCurrentStep("referral_goals");
        break;
      case "referral_goals":
        setCurrentStep("lead_description");
        break;
      case "lead_description":
        setCurrentStep("needs_website");
        break;
      case "needs_website":
        handleComplete();
        break;
      default:
        break;
    }
  };

  const handleBack = () => {
    switch (currentStep) {
      case "company_size":
        setCurrentStep("identity");
        break;
      case "referral_goals":
        setCurrentStep("company_size");
        break;
      case "lead_description":
        setCurrentStep("referral_goals");
        break;
      case "needs_website":
        setCurrentStep("lead_description");
        break;
      default:
        break;
    }
  };

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem("isOnboarded", "true");
      localStorage.setItem("userType", "business");
      localStorage.setItem("isAuthenticated", "true");
      localStorage.setItem("businessName", businessData.name);
      navigate("/business-paywall");
    }, 3500);
  };

  const getStepNumber = () => {
    const steps: Step[] = [
      "identity",
      "company_size",
      "referral_goals",
      "lead_description",
      "needs_website",
    ];
    return steps.indexOf(currentStep) + 1;
  };

  const getProgressPercentage = () => {
    return (getStepNumber() / 5) * 100;
  };

  const isNextDisabled = () => {
    if (currentStep === "identity")
      return !businessData.name || !businessData.industry;
    if (currentStep === "company_size") return !businessData.companySize;
    if (currentStep === "referral_goals") return !businessData.referralGoals;
    if (currentStep === "lead_description") return !businessData.serviceFocus;
    if (currentStep === "needs_website")
      return businessData.needsWebsite === null;
    return false;
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

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <LoadingScreen text={getLoadingMessages()[loadingStep]} />
        )}
      </AnimatePresence>

      <div
        className={`flex flex-col h-full transition-all duration-1000 ${loading ? "scale-95 opacity-50" : "scale-100 opacity-100"}`}
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
          <div className="w-full pb-4 md:pb-6 flex items-center gap-3 md:gap-4 flex-shrink-0">
            <span className="text-[11px] md:text-[14px] font-black text-[#ec4899] tracking-widest">
              {getStepNumber()}/5
            </span>
            <div className="flex-1 bg-[#f1f1f1] rounded-full h-1 overflow-hidden">
              <div
                className="bg-[#ec4899] h-full transition-all duration-300 ease-out"
                style={{ width: `${getProgressPercentage()}%` }}
              ></div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full pb-2 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex justify-center">
            <AnimatePresence mode="wait">
              {currentStep === "identity" && (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-[600px] mt-2 md:mt-2"
                >
                  <h2 className="text-[22px] md:text-[40px] font-black text-[#222325] tracking-tight leading-tight mb-2 md:mb-4">
                    First, tell us about your business
                  </h2>
                  <p className="text-[14px] md:text-[18px] text-[#62646a] mb-2 md:mb-4 font-medium">
                    Help us customize your workspace for the right results.
                  </p>
                  <div className="space-y-4 md:space-y-6 w-full">
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[13px] md:text-[14px] font-bold text-[#404145] mb-2 block">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={businessData.name}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            name: e.target.value,
                          })
                        }
                        placeholder="e.g. Acme Creative"
                        className="w-full px-4 py-3.5 md:py-4 border border-[#e4e5e7] rounded-[4px] focus:outline-none focus:border-[#ec4899] transition-colors bg-white text-[15px] md:text-[16px] text-[#404145] font-medium shadow-sm"
                      />
                    </div>
                    <div className="space-y-1.5 md:space-y-2">
                      <label className="text-[13px] md:text-[14px] font-bold text-[#404145] mb-2 block">
                        Industry
                      </label>
                      <select
                        value={businessData.industry}
                        onChange={(e) =>
                          setBusinessData({
                            ...businessData,
                            industry: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3.5 md:py-4 border border-[#e4e5e7] rounded-[4px] focus:outline-none focus:border-[#ec4899] transition-colors bg-white text-[15px] md:text-[16px] text-[#404145] font-medium shadow-sm appearance-none"
                      >
                        <option value="">Select your industry</option>
                        {industries.map((ind) => (
                          <option key={ind} value={ind}>
                            {ind}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === "company_size" && (
                <motion.div
                  key="company_size"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-[600px] mt-2 md:mt-2"
                >
                  <h2 className="text-[22px] md:text-[40px] font-black text-[#222325] tracking-tight leading-tight mb-2 md:mb-4">
                    How big is your team?
                  </h2>
                  <p className="text-[14px] md:text-[18px] text-[#62646a] mb-2 md:mb-4 font-medium">
                    This helps us understand your capacity for new referrals.
                  </p>
                  <div className="grid grid-cols-1 gap-2 md:gap-4">
                    {[
                      "1 - 10 employees",
                      "11 - 50 employees",
                      "51 - 200 employees",
                      "200+ employees",
                    ].map((size) => (
                      <label
                        key={size}
                        className="group relative flex items-center p-5 border border-[#e4e5e7] bg-white rounded-[4px] cursor-pointer hover:border-[#ec4899] transition-all duration-200 has-[:checked]:border-[#ec4899] has-[:checked]:ring-1 has-[:checked]:ring-[#ec4899] has-[:checked]:bg-pink-50/50"
                      >
                        <input
                          type="radio"
                          name="companySize"
                          className="peer opacity-0 absolute inset-0 cursor-pointer"
                          value={size}
                          checked={businessData.companySize === size}
                          onChange={(e) =>
                            setBusinessData({
                              ...businessData,
                              companySize: e.target.value,
                            })
                          }
                        />
                        <div className="flex-1">
                          <span className="font-bold text-[15px] md:text-[16px] text-[#404145]">
                            {size}
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
                </motion.div>
              )}

              {currentStep === "referral_goals" && (
                <motion.div
                  key="referral_goals"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-[600px] mt-2 md:mt-2"
                >
                  <h2 className="text-[22px] md:text-[40px] font-black text-[#222325] tracking-tight leading-tight mb-2 md:mb-4">
                    What are your goals?
                  </h2>
                  <p className="text-[14px] md:text-[18px] text-[#62646a] mb-2 md:mb-4 font-medium">
                    Help us tailor the referral experience.
                  </p>
                  <div className="w-full">
                    <textarea
                      value={businessData.referralGoals}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          referralGoals: e.target.value,
                        })
                      }
                      placeholder="e.g. Find qualified partners to refer lead opportunities..."
                      className="w-full h-24 md:h-32 px-4 py-3 border border-[#e4e5e7] rounded-[4px] focus:outline-none focus:border-[#ec4899] transition-colors bg-white text-[15px] md:text-[16px] text-[#404145] font-medium leading-relaxed shadow-sm resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === "lead_description" && (
                <motion.div
                  key="lead_description"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-[600px] mt-2 md:mt-2"
                >
                  <h2 className="text-[22px] md:text-[40px] font-black text-[#222325] tracking-tight leading-tight mb-2 md:mb-4">
                    What opportunities do you offer?
                  </h2>
                  <p className="text-[14px] md:text-[18px] text-[#62646a] mb-2 md:mb-4 font-medium">
                    Describe seekers so referrers know what to look for.
                  </p>
                  <div className="w-full">
                    <textarea
                      value={businessData.serviceFocus}
                      onChange={(e) =>
                        setBusinessData({
                          ...businessData,
                          serviceFocus: e.target.value,
                        })
                      }
                      placeholder="e.g. We are looking for mid-market manufacturing leads with automation needs..."
                      className="w-full h-24 md:h-32 px-4 py-3 border border-[#e4e5e7] rounded-[4px] focus:outline-none focus:border-[#ec4899] transition-colors bg-white text-[15px] md:text-[16px] text-[#404145] font-medium leading-relaxed shadow-sm resize-none"
                    />
                  </div>
                </motion.div>
              )}

              {currentStep === "needs_website" && (
                <motion.div
                  key="needs_website"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="w-full max-w-[600px] mt-2 md:mt-2"
                >
                  <h2 className="text-[22px] md:text-[40px] font-black text-[#222325] tracking-tight leading-tight mb-2 md:mb-4">
                    Do you need a website?
                  </h2>
                  <p className="text-[14px] md:text-[18px] text-[#62646a] mb-2 md:mb-4 font-medium">
                    We can help you set up professional presence.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
                    <label
                      onClick={() =>
                        setBusinessData({ ...businessData, needsWebsite: true })
                      }
                      className={`group relative flex flex-col p-4 md:p-6 border border-[#e4e5e7] bg-white rounded-[4px] cursor-pointer hover:border-[#ec4899] transition-all duration-200 ${businessData.needsWebsite === true ? "border-[#ec4899] ring-1 ring-[#ec4899] bg-pink-50/50" : ""}`}
                    >
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-5 h-5 rounded-full border border-[#c5c6c9] group-has-[:checked]:border-[#ec4899] group-has-[:checked]:bg-[#ec4899] flex items-center justify-center transition-colors">
                        {businessData.needsWebsite === true && (
                          <div className="w-5 h-5 rounded-full bg-[#ec4899] flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
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
                        )}
                      </div>
                      <div className="mb-4 md:mb-6">
                        <Globe
                          className={`w-7 h-7 md:w-8 md:h-8 text-[#b5b6ba] ${businessData.needsWebsite === true ? "text-[#ec4899]" : ""} group-hover:text-[#ec4899] transition-colors`}
                          strokeWidth={2}
                        />
                      </div>
                      <span className="font-bold text-[16px] md:text-[18px] text-[#404145] leading-snug mb-1 md:mb-2">
                        Yes, I need one
                      </span>
                      <span className="text-[12px] md:text-[14px] text-[#62646a] font-medium leading-snug">
                        Create and launch a professional landing page.
                      </span>
                    </label>

                    <label
                      onClick={() =>
                        setBusinessData({
                          ...businessData,
                          needsWebsite: false,
                        })
                      }
                      className={`group relative flex flex-col p-4 md:p-6 border border-[#e4e5e7] bg-white rounded-[4px] cursor-pointer hover:border-[#ec4899] transition-all duration-200 ${businessData.needsWebsite === false ? "border-[#ec4899] ring-1 ring-[#ec4899] bg-pink-50/50" : ""}`}
                    >
                      <div className="absolute top-4 right-4 md:top-6 md:right-6 w-5 h-5 rounded-full border border-[#c5c6c9] flex items-center justify-center transition-colors">
                        {businessData.needsWebsite === false && (
                          <div className="w-5 h-5 rounded-full bg-[#ec4899] flex items-center justify-center">
                            <svg
                              className="w-3 h-3 text-white"
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
                        )}
                      </div>
                      <div className="mb-4 md:mb-6">
                        <Layout
                          className={`w-7 h-7 md:w-8 md:h-8 text-[#b5b6ba] ${businessData.needsWebsite === false ? "text-[#ec4899]" : ""} group-hover:text-[#ec4899] transition-colors`}
                          strokeWidth={2}
                        />
                      </div>
                      <span className="font-bold text-[16px] md:text-[18px] text-[#404145] leading-snug mb-1 md:mb-2">
                        No, I have one
                      </span>
                      <span className="text-[12px] md:text-[14px] text-[#62646a] font-medium leading-snug">
                        Connect your current domain to Referr.
                      </span>
                    </label>
                  </div>
                </motion.div>
              )}

              {/* ... Website Steps Removed ... */}
            </AnimatePresence>
          </div>
        </main>

        <footer className="w-full bg-transparent py-4 px-6 lg:px-12 flex-shrink-0 z-10">
          <div className="max-w-5xl mx-auto flex justify-between items-center gap-4">
            <button
              onClick={handleBack}
              className={`font-black text-[15px] md:text-[16px] uppercase tracking-widest px-6 py-3.5 rounded-[4px] transition-colors ${currentStep !== "identity" ? "text-[#62646a] hover:bg-[#f5f5f5] cursor-pointer" : "text-[#c5c6c9] pointer-events-none opacity-0"}`}
            >
              Back
            </button>
            <button
              onClick={
                currentStep !== "needs_website" ? handleNext : handleComplete
              }
              disabled={isNextDisabled()}
              className={`flex-1 md:flex-none px-8 py-3.5 text-white font-black text-[15px] md:text-[16px] uppercase tracking-widest rounded-[4px] shadow-md transition-all active:scale-[0.98] ${
                isNextDisabled()
                  ? "bg-[#ec4899] opacity-30 cursor-not-allowed"
                  : "bg-[#ec4899] hover:bg-[#db2777] cursor-pointer"
              }`}
            >
              {currentStep === "needs_website" ? "Finish" : "Next"}
            </button>
          </div>
        </footer>
      </div>
    </div>
  );
}
