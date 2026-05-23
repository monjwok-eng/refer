import { motion, AnimatePresence } from "motion/react";
import {
  Check,
  ExternalLink,
  ChevronDown,
  PenTool,
  LayoutDashboard,
  Zap,
  Activity,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BarChart,
  Bar,
  ResponsiveContainer,
  Tooltip,
  Cell
} from "recharts";

export default function SiteMobileApp() {
  const navigate = useNavigate();
  const businessName =
    localStorage.getItem("businessName") || "My Business Site";

  // Check multiple keys to verify if the site has been created/published
  const checkHasSite = () => {
    return (
      localStorage.getItem(`site_created_${businessName}`) === "true" ||
      localStorage.getItem("site_created") === "true" ||
      localStorage.getItem("site_published") === "true"
    );
  };

  const [hasSite, setHasSite] = useState(checkHasSite());
  const firstName = businessName.split(" ")[0];
  const publishedSlug = localStorage.getItem("user_published_slug") || firstName.toLowerCase();
  const siteUrl = `https://${publishedSlug}.referr.me`;
  const liveUrlPath = `/s/${publishedSlug}`;
  const [showActions, setShowActions] = useState(false);

  const handleUnpublish = () => {
    localStorage.removeItem(`site_created_${businessName}`);
    localStorage.removeItem("site_created");
    localStorage.removeItem("site_published");
    setHasSite(false);
    setShowActions(false);
    window.dispatchEvent(new Event("referr-notification-update"));
  };

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to delete your website? This action cannot be undone.")) {
      localStorage.removeItem(`site_created_${businessName}`);
      localStorage.removeItem("site_created");
      localStorage.removeItem("site_published");
      setHasSite(false);
      setShowActions(false);
      window.dispatchEvent(new Event("referr-notification-update"));
    }
  };

  // Mock data for analytics
  const trafficData = [
    { day: "Mon", visitors: 45 },
    { day: "Tue", visitors: 72 },
    { day: "Wed", visitors: 65 },
    { day: "Thu", visitors: 88 },
    { day: "Fri", visitors: 95 },
    { day: "Sat", visitors: 120 },
    { day: "Sun", visitors: 110 },
  ];

  return (
    <div className="max-w-[1200px] mx-auto w-full pt-4 md:pt-0 pb-20 px-4 md:px-6">
      {/* Header section */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-8 pb-6 border-b border-gray-100 gap-6 md:gap-0">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-[#222325] tracking-tight mb-2">
            Website Overview
          </h1>
          <p className="text-[#62646a] text-[15px] md:text-[15px] max-w-2xl font-medium">
            Manage your website, domains, SEO and more.
          </p>
        </div>
        <div className="flex items-center gap-2 md:gap-3">
          {hasSite && (
            <div className="relative flex-1 md:flex-none">
              <button
                onClick={() => setShowActions(!showActions)}
                className="w-full md:w-auto h-[48px] md:h-9 px-6 md:px-4 py-2 border border-gray-200 rounded text-[14px] font-black text-[#222325] hover:border-slate-400 transition-colors flex items-center justify-center md:justify-start gap-2 bg-white shadow-sm active:bg-gray-50"
              >
                Actions
                <ChevronDown size={14} className={`text-gray-500 transition-transform duration-200 ${showActions ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {showActions && (
                  <>
                    {/* Mobile Backsheet overlay */}
                    <div 
                      className="fixed inset-0 z-40 lg:hidden bg-black/5" 
                      onClick={() => setShowActions(false)}
                    />
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: -10 }}
                      className="absolute right-0 left-0 md:left-auto md:w-52 mt-2 bg-white border border-gray-200 rounded-xl shadow-[0_10px_40px_rgba(0,0,0,0.12)] z-50 overflow-hidden"
                    >
                      <button 
                        onClick={() => {
                          localStorage.setItem("simulated_subdomain", publishedSlug);
                          window.location.href = "/";
                        }}
                        className="w-full text-left px-5 py-4 md:py-3 hover:bg-gray-50 text-[14px] font-bold text-[#222325] flex items-center justify-between border-b border-gray-50 md:border-none transition-colors"
                      >
                        View Site
                        <ExternalLink size={14} className="text-gray-400" />
                      </button>
                      <button 
                        onClick={handleUnpublish}
                        className="w-full text-left px-5 py-4 md:py-3 hover:bg-gray-50 text-[14px] font-bold text-[#222325] transition-colors"
                      >
                        Unpublish
                      </button>
                      <div className="h-px bg-gray-50 hidden md:block"></div>
                      <button 
                        onClick={handleDelete}
                        className="w-full text-left px-5 py-4 md:py-3 hover:bg-red-50 text-[14px] font-bold text-red-600 transition-colors"
                      >
                        Delete Site
                      </button>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          )}
          {hasSite && (
            <button 
              onClick={() => navigate("/editor")}
              className="flex-1 md:flex-none h-[48px] md:h-9 px-6 md:px-5 py-2 bg-[#1dbf73] text-white rounded text-[14px] font-black hover:bg-[#19a463] transition-colors flex items-center justify-center md:justify-start gap-2 shadow-md active:scale-95"
            >
              <PenTool size={14} strokeWidth={3} />
              Edit
            </button>
          )}
        </div>
      </div>

      {hasSite ? (
        <div className="flex flex-col gap-6">
          {/* Main Site Card */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-[0_2px_12px_rgba(0,0,0,0.06)] overflow-hidden">
            <div className="p-5 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 md:gap-10">
                {/* Thumbnail */}
                <div className="w-full md:w-[240px] h-[180px] md:h-[150px] bg-gradient-to-br from-gray-100 to-gray-200 rounded-sm shrink-0 border border-gray-200 shadow-inner overflow-hidden relative">
                  {/* Mock Site Preview */}
                  <div className="absolute inset-0 bg-white">
                    <div className="h-5 bg-gray-50 border-b border-gray-200 px-2.5 flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-red-400 opacity-60"></div>
                      <div className="w-2 h-2 rounded-full bg-amber-400 opacity-60"></div>
                      <div className="w-2 h-2 rounded-full bg-green-400 opacity-60"></div>
                    </div>
                    <div className="p-4">
                      <div className="w-2/3 h-3 bg-gray-100 rounded mb-4"></div>
                      <div className="w-full h-1 bg-gray-50 rounded mb-1.5"></div>
                      <div className="w-3/4 h-1 bg-gray-50 rounded mb-4"></div>
                      <div className="w-full h-12 bg-gray-50 rounded border border-dashed border-gray-200 flex items-center justify-center">
                          <Activity size={16} className="text-gray-200" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Site Info */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between md:justify-start gap-4 mb-5 md:mb-1">
                      <h3 className="text-[22px] md:text-2xl font-black text-[#222325] tracking-tight truncate">
                        {businessName}
                      </h3>
                      <div className="flex items-center gap-2 px-2.5 py-1 bg-emerald-50 rounded-sm border border-emerald-100 shrink-0">
                        <span className="relative flex h-2.5 w-2.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1dbf73] opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#1dbf73]"></span>
                        </span>
                        <span className="text-[11px] font-black text-[#1dbf73] uppercase tracking-widest">
                          Live
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 md:mt-8 pt-6 border-t border-gray-100 flex flex-col md:flex-row md:items-center flex-wrap gap-y-4 md:gap-x-8 text-[13px]">
                    <div className="flex items-center justify-between md:justify-start gap-4 min-w-[140px] w-full md:w-auto">
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Plan</span>
                      <div className="flex items-center gap-2">
                          <span className="font-black">Free</span>
                          <button className="text-[#1dbf73] hover:underline font-black">
                            Upgrade
                          </button>
                      </div>
                    </div>

                    <div className="w-px h-6 bg-gray-100 hidden md:block"></div>

                    <div className="flex items-center justify-between md:justify-start gap-4 min-w-[200px] w-full md:w-auto">
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Domain</span>
                      <div className="flex items-center gap-3 min-w-0">
                          <a
                            href="#"
                            onClick={(e) => {
                              e.preventDefault();
                              localStorage.setItem("simulated_subdomain", publishedSlug);
                              window.location.href = "/";
                            }}
                            className="text-gray-800 hover:underline flex items-center gap-2 font-black truncate max-w-[140px] md:max-w-none"
                          >
                            {siteUrl.replace('https://', '')}
                            <ExternalLink size={14} className="text-gray-400 shrink-0" />
                          </a>
                      </div>
                    </div>

                    <div className="w-px h-6 bg-gray-100 hidden md:block"></div>

                    <div className="flex items-center justify-between md:justify-start gap-4 min-w-[160px] w-full md:w-auto">
                      <span className="text-gray-500 font-bold uppercase tracking-widest text-[10px]">Email</span>
                      <button className="text-[#1dbf73] hover:underline font-black">
                        Manage
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {/* Traffic Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 md:p-6 flex flex-col h-[200px] md:h-[220px] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-[#222325] text-sm md:text-base flex items-center gap-2">
                    <Activity size={16} className="text-[#1dbf73]" />
                    Visitors (Last 7 Days)
                  </h4>
                  <span className="text-[10px] md:text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded flex items-center gap-1">
                      <ArrowUpRight size={12} />
                      +12%
                  </span>
              </div>
              
              <div className="flex-1 min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={trafficData}>
                      <Bar dataKey="visitors" radius={[2, 2, 0, 0]}>
                        {trafficData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === trafficData.length - 1 ? "#1dbf73" : "#e2e8f0"} />
                        ))}
                      </Bar>
                      <Tooltip cursor={{ fill: 'transparent' }} contentStyle={{fontSize: '12px', padding: '8px', borderRadius: '4px', border: '1px solid #e2e8f0'}}/>
                    </BarChart>
                  </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Index */}
            <div className="bg-white rounded-lg border border-gray-200 p-5 md:p-6 flex flex-col min-h-[200px] md:h-[220px] shadow-[0_2px_8px_rgba(0,0,0,0.02)] overflow-hidden relative">
              <div className="flex items-start justify-between relative z-10 gap-2">
                <div className="flex-1">
                  <h4 className="font-semibold text-[#222325] text-sm md:text-base mb-2 flex items-center gap-2">
                    <Zap size={16} className="text-amber-500" />
                    Performance Score
                  </h4>
                  <div className="flex flex-col gap-2.5 md:gap-3 mt-4">
                      <div className="flex items-center justify-between gap-4">
                          <span className="text-[11px] md:text-xs text-gray-500">Uptime</span>
                          <span className="text-[11px] md:text-xs font-bold text-gray-900">99.9%</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                          <span className="text-[11px] md:text-xs text-gray-500">Page Load</span>
                          <span className="text-[11px] md:text-xs font-bold text-gray-900">1.2s</span>
                      </div>
                      <div className="flex items-center justify-between gap-4">
                          <span className="text-[11px] md:text-xs text-gray-500">SEO Score</span>
                          <span className="text-[11px] md:text-xs font-bold text-gray-900">92/100</span>
                      </div>
                  </div>
                </div>
                <div className="w-14 h-14 md:w-16 md:h-16 bg-amber-50 rounded-full flex items-center justify-center border border-amber-100 shrink-0">
                  <span className="text-amber-600 font-bold text-base md:text-lg">94</span>
                </div>
              </div>
              <div className="mt-6 md:mt-auto pt-4 relative z-10 w-full border-t border-gray-50">
                <button className="text-[12px] md:text-[13px] font-medium text-[#222325] hover:text-[#1dbf73] transition-colors hover:underline">
                  View full report
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-100 p-8 md:p-20 flex flex-col items-center justify-center text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <LayoutDashboard className="text-gray-300" size={40} />
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-[#222325] mb-2 leading-tight">
            Start Your Business Site
          </h2>
          <p className="text-[#62646a] text-sm md:text-base max-w-md mb-8">
            Create a professional site to capture referrals, showcase your
            services, and grow your business.
          </p>
          <button 
            onClick={() => navigate("/create-site")}
            className="w-full md:w-auto h-11 px-8 bg-[#1dbf73] text-white rounded font-bold hover:bg-[#19a463] transition-colors shadow-sm active:scale-95"
          >
            Create Site Now
          </button>
        </div>
      )}
    </div>
  );
}
