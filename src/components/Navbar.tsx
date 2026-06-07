import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutTemplate,
  Megaphone,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
  Sparkles,
  Users,
  Building2,
  BookOpen,
  Award,
  ArrowRight,
} from "lucide-react";
import { Logo } from "./Logo";
export { Logo };

const NavDropdown = ({
  title,
  items,
  theme = "dark"
}: {
  title: string;
  items: {
    name: string;
    to: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
  theme?: "dark" | "light";
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="h-[70px] flex items-center group/nav"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="relative h-full flex items-center">
        <button className={`dropdown-link group/btn flex cursor-default items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm font-medium transition-colors duration-200 bg-transparent border-none outline-none select-none ${theme === "light" ? "text-gray-700 hover:bg-gray-100/50" : "text-white hover:bg-white/10"}`}>
          {title}
          <ChevronDown
            size={12}
            className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
            style={{ strokeWidth: 3 }}
          />
        </button>
        <div
          className={`absolute bottom-0 left-2.5 right-2.5 h-[2.5px] rounded-t-sm transition-all duration-200 bg-transparent ${isOpen && theme === "dark" ? "bg-white" : isOpen && theme === "light" ? "bg-gray-900" : ""}`}
        />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed top-[70px] left-0 right-0 bottom-0 ${theme === 'light' ? 'bg-white/98 border-b-gray-200' : 'bg-[#050505]/98 border-b-white'} backdrop-blur-md z-[100] shadow-2xl overflow-hidden py-10`}
          >
            <div className="mx-auto max-w-screen-xl w-full h-full px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-6 gap-8 text-left">
              {title === "Platform" && (
                <>
                  {/* Left Column content for Platform */}
                  <div className="col-span-1 flex flex-col md:col-span-2 lg:col-span-4">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 px-1 pb-6 border-b border-gray-200">
                      <Link
                        to="/#campaigns"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-4 rounded-lg p-3.5 text-left transition-all group/subitem ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                      >
                        <div className={`flex-shrink-0 rounded-lg p-2.5 border ${theme === "light" ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" : "border-blue-400 bg-blue-900/20 text-blue-400 group-hover/subitem:bg-blue-900/40"} transition-colors`}>
                          <LayoutTemplate className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`block font-bold text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>Campaign Builder</span>
                          <p className={`mt-1 text-xs font-normal ${theme === "light" ? "text-gray-500 group-hover/subitem:text-gray-700" : "text-white/50 group-hover/subitem:text-white/75"} transition-colors`}>
                            Build, launch, and manage custom referral campaigns in minutes.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/#adnetwork"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-4 rounded-lg p-3.5 text-left transition-all group/subitem ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                      >
                        <div className={`flex-shrink-0 rounded-lg p-2.5 border ${theme === "light" ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" : "border-blue-400 bg-blue-900/20 text-blue-400 group-hover/subitem:bg-blue-900/40"} transition-colors`}>
                          <Megaphone className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`block font-bold text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>Ad Network</span>
                          <p className={`mt-1 text-xs font-normal ${theme === "light" ? "text-gray-500 group-hover/subitem:text-gray-700" : "text-white/50 group-hover/subitem:text-white/75"} transition-colors`}>
                            Monetize your newsletters and sites with premium high-quality matched campaigns.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/#analytics"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-4 rounded-lg p-3.5 text-left transition-all group/subitem ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                      >
                        <div className={`flex-shrink-0 rounded-lg p-2.5 border ${theme === "light" ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" : "border-blue-400 bg-blue-900/20 text-blue-400 group-hover/subitem:bg-blue-900/40"} transition-colors`}>
                          <CheckCircle className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`block font-bold text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>Campaign Analytics</span>
                          <p className={`mt-1 text-xs font-normal ${theme === "light" ? "text-gray-500 group-hover/subitem:text-gray-700" : "text-white/50 group-hover/subitem:text-white/75"} transition-colors`}>
                            Real-time attribution, conversion logs, and automated fraud-protection filters.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/#integration"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-4 rounded-lg p-3.5 text-left transition-all group/subitem ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                      >
                        <div className={`flex-shrink-0 rounded-lg p-2.5 border ${theme === "light" ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" : "border-blue-400 bg-blue-900/20 text-blue-400 group-hover/subitem:bg-blue-900/40"} transition-colors`}>
                          <Sparkles className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`block font-bold text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>Widgets & Developer SDK</span>
                          <p className={`mt-1 text-xs font-normal ${theme === "light" ? "text-gray-500 group-hover/subitem:text-gray-700" : "text-white/50 group-hover/subitem:text-white/75"} transition-colors`}>
                            Beautiful ready-made client widgets with a single script injection.
                          </p>
                        </div>
                      </Link>
                    </div>

                    {/* Subcategories */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 px-1">
                      <div>
                        <span className={`text-xs font-bold tracking-wider uppercase ${theme === "light" ? "text-gray-500" : "text-white/40"}`}>Integrations</span>
                        <div className="mt-2.5 space-y-2">
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Next.js Helper</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ React SDK</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Webflow Tracker</Link>
                        </div>
                      </div>
                      <div>
                        <span className={`text-xs font-bold tracking-wider uppercase ${theme === "light" ? "text-gray-500" : "text-white/40"}`}>Use Cases</span>
                        <div className="mt-2.5 space-y-2">
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ SaaS Rewards</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Newsletter Milestones</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ E-commerce Referrals</Link>
                        </div>
                      </div>
                      <div>
                        <span className={`text-xs font-bold tracking-wider uppercase ${theme === "light" ? "text-gray-500" : "text-white/40"}`}>Platforms</span>
                        <div className="mt-2.5 space-y-2">
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ WordPress Plugin</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Shopify App</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right Column Tour for Platform */}
                  <div className={`col-span-1 lg:col-span-2 relative hidden h-full flex-col justify-between p-6 pb-2 text-left lg:flex rounded-xl border overflow-hidden ${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-[#0D0B28] border-white/10"}`}>
                    <div className="relative">
                      {/* Browser Mock Preview */}
                      <div className={`my-2.5 w-full rounded-lg border p-3 relative overflow-hidden backdrop-blur-md ${theme === "light" ? "border-gray-200 bg-white" : "border-white/10 bg-white/5"}`}>
                        <div className="flex items-center gap-1.5 mb-2.5">
                          <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                          <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
                          <div className={`ml-2 text-[10px] font-mono ${theme === "light" ? "text-gray-400" : "text-white/40"}`}>dashboard/referrals</div>
                        </div>
                        <div className="space-y-2">
                          <div className={`h-2 w-1/3 rounded ${theme === "light" ? "bg-gray-200" : "bg-white/20"}`} />
                          <div className="h-4 w-3/4 bg-gradient-to-r from-[#fc0] via-[#F092DD] to-[#00f2fe] rounded" />
                          <div className="grid grid-cols-3 gap-2 pt-1">
                            <div className={`h-6 rounded border flex items-center justify-center text-[9px] font-mono font-bold ${theme === "light" ? "bg-white border-gray-200 text-gray-800" : "bg-white/5 border-white/10 text-white/80"}`}>+189%</div>
                            <div className={`h-6 rounded border flex items-center justify-center text-[9px] font-mono font-bold ${theme === "light" ? "bg-white border-gray-200 text-gray-800" : "bg-white/5 border-white/10 text-white/80"}`}>$6.4k</div>
                            <div className={`h-6 rounded border flex items-center justify-center text-[9px] font-mono font-bold font-sans ${theme === "light" ? "bg-pink-100 border-pink-200 text-pink-700" : "bg-[#ec4899]/20 border-[#ec4899]/40 text-[#ec4899]"}`}>Live</div>
                          </div>
                        </div>
                      </div>

                      <h3 className={`mb-1 text-base font-bold leading-snug ${theme === "light" ? "text-gray-900" : "text-white"}`}>Take a tour of Referr</h3>
                      <p className={`mb-4 text-xs ${theme === "light" ? "text-gray-600" : "text-white/60"}`}>Explore how easily you can scale acquisition channels in minutes.</p>
                    </div>

                    <div className={`space-y-2 border-t pt-4 mt-2 ${theme === "light" ? "border-gray-200" : "border-white/10"}`}>
                      <Link to="/signin" onClick={() => setIsOpen(false)} className={`flex items-center gap-1.5 text-xs font-semibold group/tour ${theme === "light" ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-white/80"}`}>
                        Product Overview <ArrowRight size={12} className="group-hover/tour:translate-x-1 transition-transform" />
                      </Link>
                      <Link to="/join" onClick={() => setIsOpen(false)} className={`flex items-center gap-1.5 text-xs font-semibold group/tour ${theme === "light" ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-white/80"}`}>
                        Integrations Guide <ArrowRight size={12} className="group-hover/tour:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {title === "Referr for" && (
                <>
                  {/* Referr For Main Grid */}
                  <div className="col-span-1 flex flex-col md:col-span-2 lg:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 px-1 pb-6 border-b border-gray-200">
                      <Link
                        to="/join"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-4 rounded-lg p-3.5 text-left transition-all group/subitem ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                      >
                        <div className={`flex-shrink-0 rounded-lg p-2.5 border ${theme === "light" ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" : "border-blue-400 bg-blue-900/20 text-blue-400 group-hover/subitem:bg-blue-900/40"} transition-colors`}>
                          <Users className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`block font-bold text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>For Publishers & Creators</span>
                          <p className={`mt-1 text-xs font-normal ${theme === "light" ? "text-gray-500 group-hover/subitem:text-gray-700" : "text-white/50 group-hover/subitem:text-white/75"} transition-colors`}>
                            Promote high-quality products. Gain recurring sponsor fees, referral payouts, and access matched campaigns.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/join"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-4 rounded-lg p-3.5 text-left transition-all group/subitem ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                      >
                        <div className={`flex-shrink-0 rounded-lg p-2.5 border ${theme === "light" ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" : "border-blue-400 bg-blue-900/20 text-blue-400 group-hover/subitem:bg-blue-900/40"} transition-colors`}>
                          <Building2 className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`block font-bold text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>For SaaS & Businesses</span>
                          <p className={`mt-1 text-xs font-normal ${theme === "light" ? "text-gray-500 group-hover/subitem:text-gray-700" : "text-white/50 group-hover/subitem:text-white/75"} transition-colors`}>
                            Unlock dynamic affiliate circles, word-of-mouth growth loops, and direct payout pipelines.
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 px-1">
                      <div>
                        <span className={`text-xs font-bold tracking-wider uppercase ${theme === "light" ? "text-gray-500" : "text-white/40"}`}>Publishers</span>
                        <div className="mt-2.5 space-y-2">
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Newsletter Writers</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Tech Influencers & Blogs</Link>
                        </div>
                      </div>
                      <div>
                        <span className={`text-xs font-bold tracking-wider uppercase ${theme === "light" ? "text-gray-500" : "text-white/40"}`}>SaaS Companies</span>
                        <div className="mt-2.5 space-y-2">
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Early-stage B2B Apps</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Subscription Platforms</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side for Referr For */}
                  <div className={`col-span-1 lg:col-span-2 relative hidden h-full flex-col justify-between p-6 pb-2 text-left lg:flex rounded-xl border overflow-hidden ${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-[#0A1A10] border-white/10"}`}>
                    <div>
                      {/* Graphics box representing income/payments */}
                      <div className={`my-2.5 w-full rounded-lg border p-3.5 relative overflow-hidden backdrop-blur-md ${theme === "light" ? "border-green-300 bg-green-50" : "border-[#1ebd71]/20 bg-[#1ebd71]/5"}`}>
                        <div className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-1 font-sans ${theme === "light" ? "text-green-700" : "text-[#1ebd71]"}`}>Earning Loop Active</div>
                        <div className={`text-2xl font-bold mb-2 font-display ${theme === "light" ? "text-gray-900" : "text-white"}`}>$1,240.23</div>
                        <div className={`text-[11px] leading-relaxed font-sans ${theme === "light" ? "text-gray-700" : "text-white/50"}`}>
                          Average monthly payout to tech content creators utilizing Referr campaigns last quarter.
                        </div>
                      </div>

                      <h3 className={`mb-1 text-base font-bold leading-snug ${theme === "light" ? "text-gray-900" : "text-white"}`}>Scale advocate networks</h3>
                      <p className={`mb-4 text-xs font-sans ${theme === "light" ? "text-gray-600" : "text-white/60"}`}>Generate recursive growth using incentivized brand-sharing campaigns.</p>
                    </div>

                    <div className={`space-y-2 border-t pt-4 mt-2 ${theme === "light" ? "border-gray-200" : "border-white/10"}`}>
                      <Link to="/join" onClick={() => setIsOpen(false)} className={`flex items-center gap-1.5 text-xs font-semibold group/tour ${theme === "light" ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-white/80"}`}>
                        View Match Campaigns <ArrowRight size={12} className="group-hover/tour:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </>
              )}

              {title === "Resources" && (
                <>
                  {/* Resources Main Grid */}
                  <div className="col-span-1 flex flex-col md:col-span-2 lg:col-span-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5 px-1 pb-6 border-b border-gray-200">
                      <Link
                        to="/signin"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-4 rounded-lg p-3.5 text-left transition-all group/subitem ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                      >
                        <div className={`flex-shrink-0 rounded-lg p-2.5 border ${theme === "light" ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" : "border-blue-400 bg-blue-900/20 text-blue-400 group-hover/subitem:bg-blue-900/40"} transition-colors`}>
                          <BookOpen className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`block font-bold text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>Documentation & SDK</span>
                          <p className={`mt-1 text-xs font-normal ${theme === "light" ? "text-gray-500 group-hover/subitem:text-gray-700" : "text-white/50 group-hover/subitem:text-white/75"} transition-colors`}>
                            Technical guide on installing widgets, custom tracking scripts, and payout tracking endpoints.
                          </p>
                        </div>
                      </Link>

                      <Link
                        to="/#testimonials"
                        onClick={() => setIsOpen(false)}
                        className={`flex items-start gap-4 rounded-lg p-3.5 text-left transition-all group/subitem ${theme === "light" ? "hover:bg-gray-100" : "hover:bg-white/5"}`}
                      >
                        <div className={`flex-shrink-0 rounded-lg p-2.5 border ${theme === "light" ? "border-blue-200 text-blue-600 bg-blue-50 hover:bg-blue-100" : "border-blue-400 bg-blue-900/20 text-blue-400 group-hover/subitem:bg-blue-900/40"} transition-colors`}>
                          <Award className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`block font-bold text-base ${theme === "light" ? "text-gray-900" : "text-white"}`}>Customer Success Stories</span>
                          <p className={`mt-1 text-xs font-normal ${theme === "light" ? "text-gray-500 group-hover/subitem:text-gray-700" : "text-white/50 group-hover/subitem:text-white/75"} transition-colors`}>
                            Read how high-growth startups hyper-scaled loops, generating +323% more acquisitions.
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 px-1">
                      <div>
                        <span className={`text-xs font-bold tracking-wider uppercase ${theme === "light" ? "text-gray-500" : "text-white/40"}`}>Technical</span>
                        <div className="mt-2.5 space-y-2">
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ API Reference</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Webhook Setup</Link>
                        </div>
                      </div>
                      <div>
                        <span className={`text-xs font-bold tracking-wider uppercase ${theme === "light" ? "text-gray-500" : "text-white/40"}`}>Contact Support</span>
                        <div className="mt-2.5 space-y-2">
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Community Forum</Link>
                          <Link to="/join" onClick={() => setIsOpen(false)} className={`block text-sm hover:underline transition-colors ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-white/60 hover:text-white"}`}>→ Contact Developer Team</Link>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right side for Resources */}
                  <div className={`col-span-1 lg:col-span-2 relative hidden h-full flex-col justify-between p-6 pb-2 text-left lg:flex rounded-xl border overflow-hidden ${theme === "light" ? "bg-gray-100 border-gray-200" : "bg-[#111624] border-white/10"}`}>
                    <div>
                      {/* Graphics box representing blog/sandbox info */}
                      <div className={`my-2.5 w-full rounded-lg border p-3.5 relative overflow-hidden backdrop-blur-md ${theme === "light" ? "border-indigo-300 bg-indigo-50" : "border-indigo-400/20 bg-indigo-400/5"}`}>
                        <div className={`text-[10px] font-mono font-bold tracking-widest uppercase mb-1 font-sans ${theme === "light" ? "text-indigo-600" : "text-indigo-400"}`}>Developer Sandbox</div>
                        <div className={`text-sm font-bold mb-1 font-sans ${theme === "light" ? "text-gray-900" : "text-white"}`}>Webhook Playground</div>
                        <div className={`text-[11px] leading-relaxed font-sans mb-2 ${theme === "light" ? "text-gray-700" : "text-white/60"}`}>
                          Simulate client purchase callbacks, advocate payouts audits, and widget configurations live.
                        </div>
                      </div>

                      <h3 className={`mb-1 text-base font-bold leading-snug ${theme === "light" ? "text-gray-900" : "text-white"}`}>Join the affiliate chain</h3>
                      <p className={`mb-4 text-xs font-sans ${theme === "light" ? "text-gray-600" : "text-white/60"}`}>Help modern publishers and businesses scale while earning 30% lifetime.</p>
                    </div>

                    <div className={`space-y-2 border-t pt-4 mt-2 ${theme === "light" ? "border-gray-200" : "border-white/10"}`}>
                      <Link to="/join" onClick={() => setIsOpen(false)} className={`flex items-center gap-1.5 text-xs font-semibold group/tour ${theme === "light" ? "text-gray-900 hover:text-gray-700" : "text-white hover:text-white/80"}`}>
                        Become an Affiliate <ArrowRight size={12} className="group-hover/tour:translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NavbarProps {
  variant?: "full" | "skinny" | "onboarding";
  showClientHelper?: boolean;
  showHustlerHelper?: boolean;
  showLoginLink?: boolean;
  showRegisterLink?: boolean;
  userName?: string;
  theme?: "dark" | "light";
}

export default function Navbar({
  variant = "full",
  showClientHelper = false,
  showHustlerHelper = false,
  showLoginLink = false,
  showRegisterLink = false,
  userName,
  theme = "dark",
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const platformItems = [
    {
      name: "Campaign Builder",
      to: "/#campaigns",
      description: "Build, launch, and manage custom referral campaigns.",
      icon: <LayoutTemplate size={18} />,
    },
    {
      name: "Ad Network",
      to: "/#adnetwork",
      description: "Monetize content via high-quality matched publishers.",
      icon: <Megaphone size={18} />,
    },
    {
      name: "Campaign Analytics",
      to: "/#analytics",
      description: "Real-time metrics, attribution tracking, and dashboard.",
      icon: <CheckCircle size={18} />,
    },
  ];

  const referrForItems = [
    {
      name: "For Publishers & Creators",
      to: "/join",
      description: "Earn by referring quality customers to premium businesses.",
    },
    {
      name: "For SaaS & Businesses",
      to: "/join",
      description: "Scale your customer acquisition with word-of-mouth advocates.",
    },
  ];

  const resourcesItems = [
    {
      name: "Documentation & API",
      to: "/signin",
      description: "Developers' guide to setting up and integrating Referr tracker.",
    },
    {
      name: "Success Stories",
      to: "/#testimonials",
      description: "See how other top businesses are supercharging growth.",
    },
  ];

  const stickyHeaderClasses =
    "sticky top-0 w-full z-[100] bg-[#050505] min-h-[70px] flex items-center transition-all duration-300";

  if (variant === "onboarding" || variant === "skinny") {
    const bgColor = theme === "light" ? "bg-white" : "bg-[#050505]";
    const textColor = theme === "light" ? "text-[#404145]" : "text-[#b0b3b8]";
    const linkColor = theme === "light" ? "text-black" : "text-white";
    const borderColor = theme === "light" ? "border-b border-slate-100" : "";

    return (
      <header className={`fixed top-0 w-full z-[100] ${bgColor} ${borderColor} h-[70px] flex items-center`}>
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full flex items-center justify-between h-full">
          <Logo className={`scale-[1.3] origin-left ${theme === "light" ? "text-black" : "text-white"}`} theme={theme} />
          {showLoginLink && (
            <p className={`text-[14px] ${textColor} font-medium hidden sm:block`}>
              Already have an account?{" "}
              <Link
                to="/signin"
                className={`${linkColor} font-bold hover:underline underline-offset-2`}
              >
                Log in
              </Link>
            </p>
          )}
          {showRegisterLink && (
            <p className={`text-[14px] ${textColor} font-medium hidden sm:block`}>
              Don't have an account?{" "}
              <Link
                to="/join"
                className={`${linkColor} font-bold hover:underline underline-offset-2`}
              >
                Sign up
              </Link>
            </p>
          )}
        </div>
      </header>
    );
  }

  return (
    <nav className={`sticky top-0 w-full z-[100] ${theme === "light" ? "bg-white text-gray-900 shadow-transparent after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-black/60 after:to-transparent" : "bg-[#050505] text-white after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-white/50 after:to-transparent"} min-h-[70px] flex items-center relative`}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full flex items-center justify-between h-full">
        {/* Left Side: Logo & Desktop Navigation */}
        <div className="flex items-center gap-8">
          <Logo className={`scale-[1.3] origin-left ${theme === "light" ? "text-gray-900" : "text-white"}`} theme={theme} />
          
          {/* Desktop Inline Actions/Dropdowns */}
          <div className="hidden lg:flex items-center gap-1">
            <NavDropdown title="Platform" items={platformItems} theme={theme} />
            <Link to="/#features" className={`flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-200 font-sans ${theme === "light" ? "text-gray-700 hover:bg-gray-100/50" : "text-white hover:bg-white/10"}`}>Features</Link>
            <NavDropdown title="Referr for" items={referrForItems} theme={theme} />
            <Link to="/#pricing" className={`flex items-center rounded-lg px-2 py-2 text-sm font-medium transition-colors duration-200 font-sans ${theme === "light" ? "text-gray-700 hover:bg-gray-100/50" : "text-white hover:bg-white/10"}`}>Pricing</Link>
            <NavDropdown title="Resources" items={resourcesItems} theme={theme} />
          </div>
        </div>

        {/* Right Side: Login, Sign Up, and Hamburger */}
        <div className="flex items-center gap-4 md:gap-5">
          <Link
            to="/signin"
            className={`font-medium transition-colors text-[15px] font-sans ${theme === "light" ? "text-gray-600 hover:text-gray-900" : "text-[#b0b3b8] hover:text-white"}`}
          >
            Login
          </Link>
          {theme === "light" ? (
            <Link
              to="/join"
              className="px-4 py-1.5 rounded-none font-bold text-[14px] transition-all font-sans shadow-sm active:scale-95 bg-[#2F39BA] text-white hover:bg-[#202882]"
            >
              Sign up
            </Link>
          ) : (
            <Link
              to="/join"
              className="px-4 py-1.5 rounded-none font-bold text-[14px] transition-all font-sans shadow-sm active:scale-95 bg-white text-black hover:bg-slate-200"
            >
              Sign up
            </Link>
          )}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`p-1 -mr-2 rounded-lg transition-colors active:scale-95 lg:hidden ${theme === "light" ? "text-gray-800 hover:bg-gray-100" : "text-white hover:bg-white/10"}`}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 h-full w-full bg-[#050505] z-[200] lg:hidden overflow-y-auto"
          >
            <div className="flex items-center justify-between p-4 bg-[#050505]">
              <Logo size="md" />
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-1 rounded-lg text-white hover:bg-white/10"
              >
                <X size={28} />
              </button>
            </div>

            <div className="p-4 flex flex-col gap-6">
              <div className="grid grid-cols-2 gap-3">
                <Link to="/demo" onClick={() => setIsMobileMenuOpen(false)} className="w-full border border-white text-white py-3 rounded-lg font-bold text-center text-sm hover:bg-white/10 transition-all">Get a demo</Link>
                <Link to="/join" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-white text-black py-3 rounded-lg font-bold text-center text-sm hover:bg-slate-200 transition-all">Sign up for free</Link>
              </div>

              <div className="flex flex-col">
                {["Features", "Enterprise", "Ad Network", "Pricing"].map((item) => (
                  <Link key={item} to={`/${item.toLowerCase().replace(" ", "-")}`} onClick={() => setIsMobileMenuOpen(false)} className="text-[17px] font-medium text-white py-4 border-b border-white/10">{item}</Link>
                ))}
                
                {["Platform", "Referr for", "Resources", "Help", "Company"].map((item) => (
                    <div key={item} className="flex justify-between items-center py-4 border-b border-white/10">
                        <span className="text-[17px] font-medium text-white">{item}</span>
                        <ChevronDown size={20} className="text-white/50" />
                    </div>
                ))}
                
                <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)} className="text-[17px] font-medium text-white py-4">Login</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

