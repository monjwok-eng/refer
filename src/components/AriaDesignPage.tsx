import React, { useState, useEffect } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layout,
  Globe,
  Search,
  RefreshCw,
  Star,
  X,
  Maximize2,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { Logo } from "./Navbar";
import {
  MinimalAgency,
  ProfessionalServices,
  EditorialPortfolio,
} from "./RealWebsites";

const AriaAvatar = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Scale down movement for smaller avatar - Wide coverage for expressive tracking
      const x = (e.clientX / window.innerWidth - 0.5) * 32;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="relative w-[32px] h-[32px] shrink-0">
      <div className="absolute inset-0 bg-[#222325] rounded-full overflow-hidden shadow-sm flex items-center justify-center border border-slate-700">
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-white/10" />
        <motion.div
          className="flex gap-1.5 relative z-10"
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{ type: "spring", stiffness: 450, damping: 25 }}
        >
          <div className="w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_4px_white]" />
          <div className="w-[3px] h-[3px] bg-white rounded-full shadow-[0_0_4px_white]" />
        </motion.div>
      </div>
    </div>
  );
};

export default function AriaDesignPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [prompt, setPrompt] = useState("");
  const [isWritingPrompt, setIsWritingPrompt] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [viewport, setViewport] = useState<"desktop" | "mobile">("desktop");

  useEffect(() => {
    const state = location.state as any;
    if (state?.siteName) {
      setIsWritingPrompt(true);
      const fullPrompt = `Create a professional website for ${state.siteName}, a business that provides ${state.siteDescription || "diverse range of services"} designed to meet client needs, specializing in ${state.siteGoals || "various areas"} to ensure high-quality support and assistance.`;

      setPrompt("");
      let currentIdx = 0;

      // Artificial delay before typing starts
      const startDelay = setTimeout(() => {
        const typingInterval = setInterval(() => {
          setPrompt(fullPrompt.slice(0, currentIdx + 1));
          currentIdx++;

          if (currentIdx >= fullPrompt.length) {
            clearInterval(typingInterval);
            setIsWritingPrompt(false);
          }
        }, 15); // Fast typing speed

        return () => clearInterval(typingInterval);
      }, 1000);

      return () => {
        clearTimeout(startDelay);
      };
    }
  }, [location.state]);

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    navigate("/editor", {
      state: { templateId: selectedTemplate || 1, prompt },
    });
  };

  const templates = [
    {
      id: 1,
      title: "Strategic Consulting Foundation",
      image:
        "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      tag: "Soft",
      Component: MinimalAgency,
    },
    {
      id: 2,
      title: "Modern Venture Partners",
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      tag: "Editorial",
      Component: ProfessionalServices,
    },
    {
      id: 3,
      title: "Creative Studio Archetype",
      image:
        "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80",
      tag: "Simple",
      Component: EditorialPortfolio,
    },
  ];

  const openPreview = (id: number) => {
    setSelectedTemplate(id);
    setIsPreviewOpen(true);
    setViewport("desktop");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans selection:bg-[#1dbf73]/10 relative overflow-x-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none opacity-30" />

      {/* Top Bar - Dark Studio Style Navigation */}
      <header className="h-[52px] bg-[#1e1e1e] flex items-center justify-between px-2 md:px-4 shrink-0 sticky top-0 z-[50]">
        <div className="flex items-center">
          <button
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-1 md:gap-2 text-white/80 hover:text-white transition-colors text-[12px] md:text-[13px] font-light py-2 px-2 md:px-3 rounded hover:bg-white/5"
          >
            <ChevronLeft size={20} strokeWidth={1} />
            Back
          </button>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            onClick={() => navigate("/create-site")}
            className="flex items-center gap-1 md:gap-2 text-white/80 hover:text-white transition-colors text-[12px] md:text-[13px] font-light py-2 px-2 md:px-3 rounded hover:bg-white/5"
          >
            <span className="hidden sm:inline">Continue with setup</span>
            <span className="sm:hidden">Next</span>
            <ChevronRight size={20} strokeWidth={1} />
          </button>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center w-full bg-white">
        {/* Boxy Professional Generation Container - Moved up (pt-12) */}
        <section className="w-full max-w-[800px] flex flex-col items-center pt-10 md:pt-16 pb-12 md:pb-16 px-5 md:px-6 gap-[32px] md:gap-[48px] relative z-10">
          {/* Header Block - Reduced size and refined typography */}
          <div className="flex flex-col items-center gap-3 md:gap-[16px] text-center">
            <h1 className="text-[32px] md:text-[42px] font-normal text-[#222325] tracking-tighter leading-tight max-w-sm md:max-w-lg">
              Design your signature <br className="hidden sm:block" /> site with Aria
            </h1>
            <span className="text-[13px] md:text-[14px] text-[#62646a] font-light leading-relaxed max-w-[280px] md:max-w-sm">
              An intelligent design partner that crafts bespoke interactive
              foundations tailored to your identity.
            </span>
          </div>

          <div className="w-full flex flex-col gap-3">
            {/* Status & Avatar Row */}
            <div className="flex items-center gap-3 min-h-[28px] relative pl-10 md:pl-9">
              <div className="absolute left-0 top-1/2 -translate-y-1/2">
                <AriaAvatar />
              </div>
              <span
                className={`text-[12px] md:text-[13px] font-normal tracking-wide transition-colors duration-500 ${isWritingPrompt ? "text-slate-400 italic" : "text-[#1dbf73]"}`}
              >
                {isWritingPrompt ? (
                  <motion.span
                    animate={{ opacity: [1, 0.5, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    Aria is generating your blueprint...
                  </motion.span>
                ) : (
                  "Ready to generate."
                )}
              </span>
            </div>

            {/* Main Form Box - Boxy & Classy Structure with Premium Shimmer */}
            <div className="relative group w-full">
              {/* Animated Gradient Edge - Always visible with premium shimmer */}
              <motion.div
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute -inset-[1.5px] bg-[length:200%_auto] bg-gradient-to-r from-[#1dbf73] via-white via-[#1dbf73] to-[#1dbf73] rounded-[4px] opacity-40 group-hover:opacity-70 group-focus-within:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ backgroundSize: "200% auto" }}
              />

              <div className="relative bg-white border border-slate-200 rounded-[2px] p-[10px] md:p-[12px] flex flex-col gap-2 md:gap-[12px] group-focus-within:shadow-[12px_12px_40px_rgba(0,0,0,0.06)] group-focus-within:border-slate-900 transition-all">
                <div className="w-full">
                  <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    rows={2}
                    className="w-full h-[60px] md:h-[70px] max-h-[70px] bg-transparent text-[15px] md:text-[16px] text-[#222325] placeholder:text-[#d1d5db] font-normal focus:outline-none resize-none leading-relaxed p-1"
                    placeholder="Describe the site you want to create."
                  />
                </div>

                <div className="flex items-center justify-between w-full pt-2 md:pt-3 border-t border-slate-50">
                  <div /> {/* Left spacer */}
                  <button
                    onClick={handleGenerate}
                    disabled={!prompt.trim()}
                    className="bg-[#222325] text-white px-6 md:px-8 py-2.5 rounded-[2px] font-bold text-[11px] md:text-[12px] hover:bg-black transition-all disabled:bg-[#f3f3f3] disabled:text-[#b5b6ba] disabled:cursor-not-allowed flex items-center gap-2 md:gap-3 uppercase tracking-[0.15em] md:tracking-[0.2em] transition-all active:scale-[0.99] h-[48px] md:h-auto"
                  >
                    Generate Site <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Error/Safety Message */}
            <div className="flex items-center justify-center mt-2">
              <span className="text-[11px] font-light text-slate-400 tracking-wide">
                AI can make mistakes. Always double-check the results.
              </span>
            </div>
          </div>
        </section>

        {/* Foundation/Templates Grid (Always maintained) */}
        <section className="w-full max-w-7xl px-5 md:px-8 pb-32">
          <div className="flex items-center gap-4 mb-8 md:mb-10">
            <h2 className="text-[12px] md:text-[14px] font-black text-[#222325] uppercase tracking-[0.2em] md:tracking-[0.3em] whitespace-nowrap">
              Selected Blueprints
            </h2>
            <div className="flex-1 h-[1px] bg-slate-100" />
            <span className="hidden sm:inline text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Ready to interact
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {templates.map((template, idx) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 + idx * 0.1 }}
                className="group relative"
              >
                {/* Browser-style Frame */}
                <div className="relative aspect-[16/10] bg-white border border-slate-200 rounded-[4px] md:rounded-[2px] overflow-hidden transition-all duration-500 group-hover:border-slate-900 group-hover:shadow-[20px_20px_0px_rgba(0,0,0,0.02)]">
                  {/* Live Component Preview (Scaled Down) */}
                  <div className="absolute inset-0 pointer-events-none origin-top-left scale-[0.33] group-hover:scale-[0.34] transition-transform duration-700 select-none">
                    <div className="w-[303%] h-[303%] bg-white">
                      {React.createElement(template.Component)}
                    </div>
                  </div>

                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent pointer-events-auto" />

                  {/* Hover Interactivity Layer - Also clickable on mobile if button is tapped */}
                  <div className="absolute inset-0 bg-black/40 md:opacity-0 group-hover:opacity-100 transition-opacity duration-300 md:bg-black/40 flex items-center justify-center gap-3 md:gap-4 md:pointer-events-none group-hover:pointer-events-auto">
                    {/* On Desktop hidden until hover, on mobile maybe always visible buttons? 
                        Let's stick to showing them only when active. Actually for mobile, tapping the card should open preview. */}
                    <div className="flex gap-3 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openPreview(template.id);
                        }}
                        className="bg-white text-black px-5 md:px-6 py-2.5 md:py-2 rounded-[2px] font-bold text-[11px] uppercase tracking-widest hover:bg-[#1dbf73] hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                      >
                        View
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/editor");
                        }}
                        className="bg-black text-white border border-white/20 px-5 md:px-6 py-2.5 md:py-2 rounded-[2px] font-bold text-[11px] uppercase tracking-widest hover:bg-white hover:text-black transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 delay-75"
                      >
                        Edit
                      </button>
                    </div>
                  </div>

                  {/* Corner Label */}
                  <div className="absolute top-3 left-3 md:top-4 md:left-4 bg-white/90 backdrop-blur px-2 md:px-3 py-1 border border-slate-200 rounded-[1px] shadow-sm">
                    <span className="text-[9px] font-black uppercase tracking-widest text-slate-800">
                      FND 0{idx + 1}
                    </span>
                  </div>
                </div>

                <div className="mt-4 md:mt-6 flex flex-col gap-1 md:gap-1.5">
                  <div className="flex items-center justify-between">
                    <h3 className="text-[15px] md:text-[16px] font-bold text-[#222325] tracking-tight">
                      {template.title}
                    </h3>
                    <Globe size={14} className="text-slate-300" />
                  </div>
                  <p className="text-[11px] md:text-[12px] font-medium text-slate-400 leading-relaxed max-w-[95%] md:max-w-[90%]">
                    A professional {template.tag.toLowerCase()} groundwork
                    optimized for interactive experiences.
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Template Preview Popup */}
      <AnimatePresence mode="wait">
        {isPreviewOpen && selectedTemplate !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8 overflow-hidden"
          >
            {/* Backdrop with sophisticated blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPreviewOpen(false)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-[12px]"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ scale: 0.98, opacity: 0, y: 10 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.98, opacity: 0, y: 10 }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
              className="relative w-full max-w-[1400px] h-full bg-white md:rounded-xl shadow-[0_32px_120px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col border border-white/20"
            >
              {/* Modal Header - Studio Style */}
              <div className="relative h-[52px] md:h-[60px] bg-white border-b border-slate-100 flex items-center justify-between px-4 md:px-6 shrink-0">
                {/* Scroll Progress Bar */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-[#1dbf73] z-20"
                  style={{ width: "0%", scaleX: 0, originX: 0 }}
                  whileInView={{ scaleX: 1 }}
                />
                <div className="flex items-center gap-3 md:gap-6">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.4em] text-[#1dbf73] bg-[#1dbf73]/10 px-1.5 md:px-2 py-0.5 rounded whitespace-nowrap">
                      FND 0{selectedTemplate}
                    </span>
                    <h3 className="text-[12px] md:text-[14px] font-bold text-slate-900 tracking-tight truncate max-w-[120px] md:max-w-none">
                      {templates.find((t) => t.id === selectedTemplate)?.title}
                    </h3>
                  </div>

                  {/* Viewport Toggle */}
                  <div className="hidden sm:flex items-center bg-slate-50 p-1 rounded-full border border-slate-200">
                    <button
                      onClick={() => setViewport("desktop")}
                      className={`p-1 rounded-full transition-all ${viewport === "desktop" ? "bg-white shadow-sm text-slate-900 border border-slate-200" : "text-slate-400 hover:text-slate-600"}`}
                      title="Desktop View"
                    >
                      <Monitor size={14} />
                    </button>
                    <button
                      onClick={() => setViewport("mobile")}
                      className={`p-1 rounded-full transition-all ${viewport === "mobile" ? "bg-white shadow-sm text-slate-900 border border-slate-200" : "text-slate-400 hover:text-slate-600"}`}
                      title="Mobile View"
                    >
                      <Smartphone size={14} />
                    </button>
                  </div>
                </div>

                <div className="flex items-center gap-2 md:gap-4">
                  <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-amber-50 border border-amber-100 rounded text-amber-700">
                    <Star size={12} fill="currentColor" />
                    <span className="text-[11px] font-bold uppercase tracking-widest">
                      Premium
                    </span>
                  </div>
                  <div className="hidden sm:block h-6 w-px bg-slate-100 mx-1 md:mx-2" />
                  <button
                    onClick={() => navigate("/editor")}
                    className="bg-[#222325] text-white px-4 md:px-6 py-2 rounded-[2px] font-bold text-[10px] md:text-[11px] uppercase tracking-widest hover:bg-black transition-all active:scale-[0.98] shadow-lg shadow-black/10"
                  >
                    <span className="hidden sm:inline">Select Foundation</span>
                    <span className="sm:hidden">Select</span>
                  </button>
                  <button
                    onClick={() => setIsPreviewOpen(false)}
                    className="p-1 md:p-2 hover:bg-slate-50 rounded-full transition-colors text-slate-400 hover:text-slate-900"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Real Interactive Content with Framing */}
              <div className="flex-1 overflow-hidden bg-slate-50/50 p-3 md:p-8 flex justify-center">
                <motion.div
                  animate={{
                    width: viewport === "desktop" ? "100% " : "375px",
                    maxHeight: viewport === "mobile" ? "667px" : "none",
                  }}
                  className={`bg-white shadow-2xl transition-all duration-500 overflow-hidden relative ${viewport === "mobile" ? "rounded-[32px] border-[8px] border-slate-900 h-full" : "w-full h-full md:rounded-lg border border-slate-200"}`}
                >
                  {/* Mobile Status Bar Simulation */}
                  {viewport === "mobile" && (
                    <div className="h-6 bg-white w-full border-b border-slate-50" />
                  )}

                  <div className="h-full overflow-auto scrollbar-hide">
                    {React.createElement(
                      templates.find((t) => t.id === selectedTemplate)
                        ?.Component || "div",
                    )}
                  </div>

                  {/* Mobile Home Indicator Simulation */}
                  {viewport === "mobile" && (
                    <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1/3 h-1 bg-slate-200 rounded-full" />
                  )}
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
