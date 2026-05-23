import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  X,
  Globe,
  Pencil,
  ChevronRight,
  RefreshCcw,
  Smartphone,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import { SiteConfig } from "../types/site";

interface PublishModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteName: string;
  siteConfig?: SiteConfig;
  templateId?: number;
}

export default function PublishModal({
  isOpen,
  onClose,
  siteName,
  siteConfig,
  templateId = 1,
}: PublishModalProps) {
  const navigate = useNavigate();
  const [isPublished, setIsPublished] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const domainName = siteName.toLowerCase().replace(/\s+/g, "");
  const liveUrlPath = `/s/${domainName}`;
  const fullDomain = `${domainName}.referr.me`;

  const handleGoLive = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      const businessName = localStorage.getItem("businessName") || "Business";
      
      // Save global configuration state associated with this subdomain / slug
      localStorage.setItem(`site_created_${businessName}`, "true");
      localStorage.setItem(`site_created`, "true");
      localStorage.setItem(`site_published`, "true");
      
      localStorage.setItem(`published_site_config_${domainName}`, JSON.stringify(siteConfig || {}));
      localStorage.setItem(`published_site_template_${domainName}`, templateId.toString());

      // Save user business site reference
      localStorage.setItem("user_published_slug", domainName);
      
      // Set the simulation subdomain so it acts like a real domain locally
      localStorage.setItem("simulated_subdomain", domainName);
      
      // Notify components like dashboards to pull fresh values
      window.dispatchEvent(new Event("referr-notification-update"));
      
      setIsPublished(true);
    }, 2000);
  };

  const handleGoHome = () => {
    onClose();
    localStorage.removeItem("simulated_subdomain"); // Clear so they enter the standard dashboard correctly
    setIsPublished(false);
    navigate("/dashboard/business");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center md:items-start justify-center md:justify-end p-4 md:p-6 pointer-events-none text-[#222325]">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-[#222325]/40 md:bg-[#222325]/10 pointer-events-auto backdrop-blur-[2px] md:backdrop-blur-none"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-[420px] bg-white rounded-xl md:rounded-lg shadow-[0_20px_50px_rgba(0,0,0,0.2)] md:shadow-[0_20px_50px_rgba(0,0,0,0.15)] overflow-hidden flex flex-col pointer-events-auto border border-[#e4e5e7] md:mt-[72px]"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 hover:bg-[#f5f5f5] rounded-full transition-colors text-[#9ea0a5] hover:text-[#222325] z-10"
            >
              <X size={18} strokeWidth={2} />
            </button>

            {!isPublished ? (
              /* --- PRE-PUBLISH VIEW --- */
              <div className="p-8 flex flex-col gap-5">
                {/* Fake Browser Window Preview */}
                <div className="w-full bg-[#ffffff66] rounded-lg p-2 shadow-[3px_3px_12px_rgba(0,0,0,0.14)] border border-[#e4e5e7] relative aspect-[16/8] overflow-hidden flex flex-col">
                  <div className="flex items-center gap-1.5 mb-2 px-1 text-[#cbcdd1]">
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                    <div className="w-1.5 h-1.5 rounded-full bg-current" />
                  </div>
                  <div className="flex-1 bg-[#f8f9fb] rounded border border-[#e4e5e7] flex items-center justify-center opacity-40">
                    <Globe
                      size={40}
                      className="text-[#1dbf73]"
                      strokeWidth={1}
                    />
                  </div>
                </div>

                {/* Title Section */}
                <div className="mt-2 text-[#222325]">
                  <h2 className="text-[20px] font-bold leading-tight">
                    Go live with your site!
                  </h2>
                </div>

                {/* Standard URL Section */}
                <div className="flex flex-col gap-1">
                  <span className="text-[13px] text-[#62646a] font-light">
                    Your site's current domain:
                  </span>
                  <div className="flex items-center gap-3 p-1">
                    <div className="text-[#222325]/80">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="22"
                        height="22"
                      >
                        <path d="M12.36 5.01A6.995 6.995 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7 3.13-7 7-7l.36.01ZM10.39 15c.463 1.637 1.223 2.5 1.611 2.5.388 0 1.148-.863 1.611-2.5H10.39Zm-2.993 0A5.544 5.544 0 0 0 9.5 16.894 9.137 9.137 0 0 1 8.838 15H7.396Zm7.766 0a9.131 9.131 0 0 1-.662 1.894A5.543 5.543 0 0 0 16.605 15h-1.443Zm-8.452-4.5a5.477 5.477 0 0 0 0 3h1.871a13.837 13.837 0 0 1 0-3H6.71Zm3.383 0a12.288 12.288 0 0 0 0 3h3.814a12.288 12.288 0 0 0 0-3h-3.814Zm5.326 0a13.823 13.823 0 0 1 0 3h1.87a5.473 5.473 0 0 0 .001-3H15.42ZM9.5 7.104A5.545 5.545 0 0 0 7.396 9h1.442A9.139 9.139 0 0 1 9.5 7.104Zm2.5-.603c-.388 0-1.148.862-1.611 2.5h3.222c-.463-1.638-1.223-2.5-1.611-2.5Zm2.5.604c.27.552.496 1.191.663 1.896h1.442A5.545 5.545 0 0 0 14.5 7.105Z"></path>
                      </svg>
                    </div>
                    <span className="text-[13px] font-bold text-[#222325]">
                      monjwokalbino.buildersite.com/{domainName}
                    </span>
                    <button className="text-[#9ea0a5] hover:text-[#222325] transition-colors p-1">
                      <Pencil size={14} />
                    </button>
                  </div>
                </div>

                {/* Compliance / AI Tagline */}
                <div className="mt-2 border-t border-[#f1f2f4] pt-5">
                  <p className="text-[11px] leading-[1.6] text-[#74767e]">
                    You're responsible for verifying the accuracy and legality
                    of the published content, including AI-generated content.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="mt-4 flex items-center justify-between">
                  <button
                    onClick={onClose}
                    className="text-[14px] font-bold text-[#62646a] hover:text-[#222325] transition-colors"
                  >
                    View Draft
                  </button>
                  <button
                    disabled={isPublishing}
                    className="bg-[#1dbf73] text-white px-8 py-3 rounded text-[14px] font-bold hover:bg-[#19a463] transition-all shadow-lg shadow-green-100/50 flex items-center gap-2 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={handleGoLive}
                  >
                    {isPublishing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        Go Live Now
                        <ChevronRight size={18} />
                      </>
                    )}
                  </button>
                </div>
              </div>
            ) : (
               /* --- PUBLISHED SUCCESS VIEW --- */
              <div className="p-8 flex flex-col gap-5 text-[#222325]">
                {/* Congrats Section */}
                <div className="flex flex-col gap-1.5">
                  <h3 className="text-[20px] font-bold leading-tight">
                    Congrats, your site is published!
                  </h3>
                  <span className="text-[13px] text-[#62646a] font-light">
                    Visitors can find it online at this domain:
                  </span>
                </div>

                {/* domain Link Section */}
                <div className="pt-4 flex flex-col gap-4">
                  <div className="flex items-center gap-3 p-1 overflow-hidden">
                    <div className="text-[#222325]/80 shrink-0">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        width="22"
                        height="22"
                      >
                        <path d="M12.36 5.01A6.995 6.995 0 0 1 19 12c0 3.87-3.13 7-7 7s-7-3.13-7-7 3.13-7 7-7l.36.01ZM10.39 15c.463 1.637 1.223 2.5 1.611 2.5.388 0 1.148-.863 1.611-2.5H10.39Zm-2.993 0A5.544 5.544 0 0 0 9.5 16.894 9.137 9.137 0 0 1 8.838 15H7.396Zm7.766 0a9.131 9.131 0 0 1-.662 1.894A5.543 5.543 0 0 0 16.605 15h-1.443Zm-8.452-4.5a5.477 5.477 0 0 0 0 3h1.871a13.837 13.837 0 0 1 0-3H6.71Zm3.383 0a12.288 12.288 0 0 0 0 3h3.814a12.288 12.288 0 0 0 0-3h-3.814Zm5.326 0a13.823 13.823 0 0 1 0 3h1.87a5.473 5.473 0 0 0 .001-3H15.42ZM9.5 7.104A5.545 5.545 0 0 0 7.396 9h1.442A9.139 9.139 0 0 1 9.5 7.104Zm2.5-.603c-.388 0-1.148.862-1.611 2.5h3.222c-.463-1.638-1.223-2.5-1.611-2.5Zm2.5.604c.27.552.496 1.191.663 1.896h1.442A5.545 5.545 0 0 0 14.5 7.105Z"></path>
                      </svg>
                    </div>
                    <span className="text-[13px] font-bold text-[#222325] underline decoration-[#222325]/30 truncate flex-1 leading-none tracking-tight">
                      https://{fullDomain}
                    </span>
                    <button 
                      onClick={() => {
                        onClose();
                        localStorage.setItem("simulated_subdomain", domainName);
                        window.location.href = "/";
                      }}
                      className="text-[13px] font-bold text-[#1dbf73] hover:text-[#19a463] transition-colors shrink-0 px-2 py-1 bg-slate-50 border border-slate-100 rounded"
                    >
                      View Live
                    </button>
                  </div>

                  <button 
                    onClick={() => {
                      onClose();
                      localStorage.setItem("simulated_subdomain", domainName);
                      window.location.href = "/";
                    }}
                    className="flex items-center gap-2 text-[13px] font-light text-[#62646a] hover:text-[#222325] transition-all px-1 py-1 rounded w-fit group"
                  >
                    <Smartphone
                      size={16}
                      strokeWidth={1}
                      className="text-[#222325] group-hover:scale-110 transition-transform"
                    />
                    <span>View your site on custom domain root</span>
                    <ChevronRight
                      size={14}
                      className="opacity-0 group-hover:opacity-100 transition-opacity translate-x-[-4px] group-hover:translate-x-0 transition-all font-bold"
                    />
                  </button>
                </div>

                {/* Success Action */}
                <div className="mt-8 border-t border-[#f1f2f4] pt-8 flex justify-center">
                  <button
                    onClick={handleGoHome}
                    className="bg-[#222325] text-white px-10 py-3 rounded-lg text-[14px] font-bold hover:bg-black transition-all shadow-lg active:scale-[0.98]"
                  >
                    Go Home
                  </button>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
