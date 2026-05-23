import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Globe, ArrowLeft, Heart, Share2, Sparkles, Check } from "lucide-react";
import {
  MinimalAgency,
  ProfessionalServices,
  EditorialPortfolio,
} from "./RealWebsites";
import { SiteConfig, DEFAULT_CONFIGS } from "../types/site";

const TEMPLATES: Record<number, React.ComponentType<{ config?: SiteConfig }>> = {
  1: MinimalAgency,
  2: ProfessionalServices,
  3: EditorialPortfolio,
};

interface LiveSiteProps {
  forcedSlug?: string;
  isSubdomainDirect?: boolean;
}

export default function LiveSiteView({ forcedSlug, isSubdomainDirect }: LiveSiteProps = {}) {
  const { businessSlug } = useParams<{ businessSlug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // Normalize slug for comparison/fetching
  const slug = (forcedSlug || businessSlug || "").toLowerCase();

  // Try to find the site configuration and template ID
  const rawConfig = localStorage.getItem(`published_site_config_${slug}`);
  const rawTemplate = localStorage.getItem(`published_site_template_${slug}`);

  // Fallback check to support different store key matching patterns
  const finalConfig: SiteConfig | null = rawConfig
    ? JSON.parse(rawConfig)
    : (() => {
        // Search through all keys if slug is a variation
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i) || "";
          if (
            (key.startsWith("published_site_config_") || key.startsWith("site_config_")) &&
            key.toLowerCase().endsWith(slug)
          ) {
            const data = localStorage.getItem(key);
            if (data) return JSON.parse(data);
          }
        }
        return null;
      })();

  const templateId = rawTemplate
    ? parseInt(rawTemplate, 10)
    : (() => {
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i) || "";
          if (
            (key.startsWith("published_site_template_") || key.startsWith("site_template_")) &&
            key.toLowerCase().endsWith(slug)
          ) {
            const val = localStorage.getItem(key);
            if (val) return parseInt(val, 10);
          }
        }
        return 1; // Fallback to minimal agency
      })();

  // Use the fetched config, or fallback to DEFAULT_CONFIGS for that template
  const config = finalConfig || DEFAULT_CONFIGS[templateId] || DEFAULT_CONFIGS[1];
  
  // Custom display name
  const dispName = config?.brand?.name || businessSlug || "Live Business";

  // Share action
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const SelectedComponent = TEMPLATES[templateId] || MinimalAgency;

  if (isSubdomainDirect) {
    return (
      <div className="min-h-screen bg-white relative">
        <SelectedComponent config={config} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      {/* Sleek Referr Branding & Control Bar */}
      <div className="w-full bg-slate-900 text-white px-4 py-2 flex items-center justify-between text-xs font-medium shrink-0 z-50">
        <div className="flex items-center gap-2">
          <span className="bg-[#1dbf73] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider text-white">Live Site</span>
          <span className="text-slate-400 hidden sm:inline">Created by</span>
          <span className="font-bold flex items-center gap-1">
            <Sparkles size={12} className="text-amber-400" />
            {dispName}
          </span>
        </div>
        
        <div className="flex items-center gap-3">
          <button 
            onClick={handleShare}
            className="flex items-center gap-1.5 hover:text-[#1dbf73] transition-colors py-1 px-2.5 rounded bg-white/10"
          >
            {copied ? <Check size={12} className="text-emerald-400" /> : <Share2 size={12} />}
            <span>{copied ? "Copied Link!" : "Share"}</span>
          </button>
          
          <button 
            onClick={() => {
              if (isSubdomainDirect) {
                localStorage.removeItem("simulated_subdomain");
                window.location.href = "/dashboard/business";
              } else {
                navigate("/dashboard/business");
              }
            }}
            className="flex items-center gap-1 bg-[#1dbf73] hover:bg-[#19a463] text-white px-3 py-1 rounded font-bold transition-all text-[11px]"
          >
            <ArrowLeft size={12} />
            <span>{isSubdomainDirect ? "Exit & Return to Dashboard" : "Dashboard"}</span>
          </button>
        </div>
      </div>

      {/* Main Published Website Template Container */}
      <div className="flex-1 w-full bg-white relative overflow-y-auto">
        <SelectedComponent config={config} />
      </div>
    </div>
  );
}
