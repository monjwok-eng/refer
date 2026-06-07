import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";
import LoadingScreen from "./LoadingScreen";

export default function OnboardingSelection() {
  const navigate = useNavigate();
  const [isNavigating, setIsNavigating] = useState(false);

  const handleRoleSelection = (selectedRole: "client" | "freelancer") => {
    setIsNavigating(true);
    setTimeout(() => {
      if (selectedRole === "client") {
        navigate("/signup/business");
      } else {
        navigate("/signup/hustler");
      }
    }, 1000);
  };

  if (isNavigating) {
    return <LoadingScreen text="Preparing your onboarding experience..." />;
  }

  return (
    <div className="relative min-h-screen w-full flex flex-row justify-center items-center pt-14 pb-14 px-6 sm:px-10 bg-[#FAFAFA] overflow-hidden">
      {/* Honeycomb Geometric Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] sm:opacity-[0.05] select-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="honeycomb-join" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.85)">
              <path d="M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
              <path d="M28 48.5 L56 64.66 L56 97 L28 113.16 L0 97 L0 64.66 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb-join)" />
        </svg>
      </div>

      {/* Soft warm/pink gradient glow behind the card for visual depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#F092DD]/5 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="flex flex-row items-center z-10 w-full max-w-[640px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center gap-6"
        >
          {/* Exact custom black SVG logo */}
          <div className="flex justify-center items-center select-none">
            <img
              src={logoIcon}
              alt="Referr Icon"
              className="h-32 w-32 object-contain scale-[1.2]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Heading */}
          <div className="text-center flex flex-col space-y-1.5 w-full">
            <h4 className="text-2xl text-gray-950 font-semibold tracking-tight">
              Join referr
            </h4>
            <p className="text-sm text-gray-500 max-w-sm mx-auto">
              Select how you want to participate in the referrals ecosystem and unlock premium opportunities.
            </p>
          </div>

          {/* Role Choice Cards */}
          <div className="w-full flex flex-col gap-4">
            
            {/* Business Card Button */}
            <button
              onClick={() => handleRoleSelection("client")}
              className="group relative flex flex-row items-center gap-5 p-5 border border-gray-200 hover:border-[#ec4899] bg-white transition-all text-left rounded-lg cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex-shrink-0 bg-pink-50 p-3 rounded-md text-[#ec4899] group-hover:scale-105 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-semibold text-gray-950 group-hover:text-[#ec4899] transition-colors">
                  I'm a business hiring experts
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Source and hire vetted talent backed by certified track records and verified professional references.
                </p>
              </div>
              <div className="flex-shrink-0 text-gray-300 group-hover:text-[#ec4899] transition-colors pr-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>

            {/* Hustler/Expert Card Button */}
            <button
              onClick={() => handleRoleSelection("freelancer")}
              className="group relative flex flex-row items-center gap-5 p-5 border border-gray-200 hover:border-[#ec4899] bg-white transition-all text-left rounded-lg cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.02)] hover:shadow-md hover:-translate-y-0.5"
            >
              <div className="flex-shrink-0 bg-pink-50 p-3 rounded-md text-[#ec4899] group-hover:scale-105 transition-transform">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="w-6 h-6"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-semibold text-gray-950 group-hover:text-[#ec4899] transition-colors">
                  I'm an expert looking to join
                </h3>
                <p className="text-xs text-gray-500 mt-1 leading-relaxed">
                  Join our elite network of professional referrers, claim premium engagements, and boost your personal tier.
                </p>
              </div>
              <div className="flex-shrink-0 text-gray-300 group-hover:text-[#ec4899] transition-colors pr-1">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </button>
            
          </div>

          {/* Underlined custom links aligned below */}
          <div className="flex flex-col text-center space-y-6 w-full mt-2">
            <span className="text-sm text-gray-500 font-normal">
              Already have a referr account?{" "}
              <Link
                to="/signin"
                className="text-[#ec4899] hover:text-[#db2777] underline font-semibold transition-colors"
              >
                Log in
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
