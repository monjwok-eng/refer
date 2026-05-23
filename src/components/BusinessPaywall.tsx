import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, ArrowRight } from "lucide-react";

export default function BusinessPaywall() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSkipping, setIsSkipping] = useState(false);

  const handleStart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      localStorage.setItem("trial_started", "true");
      navigate("/dashboard/business");
    }, 1500);
  };

  const handleSkip = () => {
    setIsSkipping(true);
    setTimeout(() => {
      setIsSkipping(false);
      localStorage.setItem("trial_started", "true");
      navigate("/dashboard/business");
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] bg-[#f8f9fa] flex flex-col h-screen overflow-y-auto font-sans">
      {/* Header */}
      <div className="px-8 py-5 border-b border-[#222325] bg-white flex items-center justify-between sticky top-0 z-50">
        <div className="text-2xl font-black tracking-tighter text-[#1dbf73]">
          Referr<span className="text-[#222325]">.</span>
        </div>
        <div className="text-[13px] font-bold text-[#222325] uppercase tracking-widest">
          Setup Phase
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 py-8">
        <div className="w-full max-w-[800px] border border-[#222325] bg-white flex flex-col md:flex-row shadow-[6px_6px_0_0_#222325]">
          {/* Left side */}
          <div className="flex-1 p-8 lg:p-10 border-b md:border-b-0 md:border-r border-[#222325] relative overflow-hidden bg-white">
            {/* Subtle Grid Pattern */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

            <div className="relative z-10 w-full max-w-md">
              <div className="inline-block border border-[#222325] text-[#222325] font-bold text-[10px] uppercase tracking-widest py-1 px-3 mb-6 bg-[#1dbf73]">
                PRO TIER
              </div>

              <h2 className="text-3xl lg:text-[36px] font-black text-[#222325] mb-4 tracking-tight leading-[1.05]">
                Scale your network,
                <br />
                not your ad spend.
              </h2>

              <p className="text-[#4a4a4a] mb-8 text-[14px] leading-relaxed font-medium">
                Turn your existing customers into your highest-converting
                marketing channel. Get full access to the complete referral
                suite.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center shrink-0 text-[#1dbf73]">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[#222325] font-bold text-[14px]">
                      Unlimited referral tracking
                    </div>
                    <div className="text-[#62646a] text-[12px] mt-0.5">
                      Track every click, lead, and conversion without limits.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center shrink-0 text-[#1dbf73]">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[#222325] font-bold text-[14px]">
                      Branded landing pages
                    </div>
                    <div className="text-[#62646a] text-[12px] mt-0.5">
                      Customizable sign-up pages for your advocates.
                    </div>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="mt-0.5 flex items-center justify-center shrink-0 text-[#1dbf73]">
                    <Check size={18} strokeWidth={3} />
                  </div>
                  <div>
                    <div className="text-[#222325] font-bold text-[14px]">
                      Deep audience insights
                    </div>
                    <div className="text-[#62646a] text-[12px] mt-0.5">
                      Advanced cohort analysis and traffic metrics.
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Right side */}
          <div className="w-full md:w-[340px] bg-[#fafafa] flex flex-col">
            <div className="p-8 pb-6 flex-1">
              <div className="mb-6">
                <h3 className="text-lg font-black text-[#222325] mb-1">
                  Select a plan
                </h3>
                <p className="text-[#62646a] text-xs font-medium">
                  No long-term contracts. Cancel anytime.
                </p>
              </div>

              <div className="space-y-4">
                <div className="border border-[#222325] bg-white p-4 relative">
                  <div className="absolute -top-2.5 right-3 bg-[#1dbf73] border border-[#222325] px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#222325]">
                    Most Popular
                  </div>
                  <div className="flex justify-between items-center mb-0.5">
                    <span className="font-bold text-[15px] text-[#222325]">
                      Monthly Pro
                    </span>
                    <div className="flex items-end gap-1">
                      <span className="font-black text-[20px] text-[#222325]">
                        $25
                      </span>
                      <span className="text-[#62646a] text-[10px] font-medium mb-0.5">
                        /mo
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-[#62646a] font-medium">
                    Includes 7-day free trial
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <button
                  onClick={handleStart}
                  disabled={isLoading || isSkipping}
                  className="w-full bg-[#1dbf73] text-[#222325] font-black py-3 px-6 text-[14px] transition-transform hover:-translate-y-1 hover:translate-x-1 border border-[#222325] shadow-[-4px_4px_0_0_#222325] flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[-4px_4px_0_0_#222325]"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-[#222325]/30 border-t-[#222325] rounded-full animate-spin" />
                  ) : (
                    <>
                      Start 7-Day Free Trial
                      <ArrowRight
                        size={16}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="p-6 border-t border-[#222325] bg-white">
              <button
                onClick={handleSkip}
                disabled={isLoading || isSkipping}
                className="w-full bg-white text-[#222325] font-bold py-2 px-6 border border-[#222325] hover:bg-[#f0f0f0] transition-colors flex items-center justify-center group text-[12px] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSkipping ? (
                  <div className="w-4 h-4 border-2 border-[#222325]/30 border-t-[#222325] rounded-full animate-spin" />
                ) : (
                  "Skip trial & Pay $25 now"
                )}
              </button>
              <p className="text-center text-[10px] text-[#62646a] font-medium mt-3 leading-relaxed">
                Secure payment processing via Stripe.
                <br />
                By continuing, you agree to our Terms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
