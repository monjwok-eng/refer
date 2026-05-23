import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  Monitor,
  Smartphone,
  Undo2,
  Redo2,
  Plus,
  LayoutTemplate,
  ImageIcon,
  Palette,
  HelpCircle,
  Bot,
  Loader2,
  X,
  Send,
  MoreHorizontal,
  Settings,
  Code,
  Zap,
  ArrowLeft,
  Home,
  ChevronDown,
  Trash2,
  Sparkles
} from "lucide-react";
import {
  MinimalAgency,
  ProfessionalServices,
  EditorialPortfolio,
} from "./RealWebsites";
import PublishModal from "./PublishModal";
import { generateSiteRationale, continueChat, generateSiteUpdate } from "../services/geminiService";
import { SiteConfig, DEFAULT_CONFIGS, BLANK_CONFIG } from "../types/site";

const TEMPLATES: Record<number, React.ComponentType<{config?: SiteConfig}>> = {
  1: MinimalAgency,
  2: ProfessionalServices,
  3: EditorialPortfolio,
};

export default function SiteEditorPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const templateId = location.state?.templateId || 1;
  const initialPrompt = location.state?.prompt || "";
  const SelectedComponent = TEMPLATES[templateId] || MinimalAgency;

  const [siteName, setSiteName] = useState(
    location.state?.siteName || 
    localStorage.getItem("businessName") || 
    "My Awesome Site"
  );
  const [showSpinner, setShowSpinner] = useState(true);
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false);
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">("desktop");
  const [activeLeftTab, setActiveLeftTab] = useState("add");
  const [activeMobileView, setActiveMobileView] = useState<"chat" | "preview">("chat");
  
  // Site Config State
  const [siteConfig, setSiteConfig] = useState<SiteConfig>(() => {
    const base = DEFAULT_CONFIGS[templateId] || DEFAULT_CONFIGS[1];
    const businessName = localStorage.getItem("businessName") || "My Amazing Site";
    return {
      ...base,
      brand: {
        ...base.brand,
        name: businessName,
      }
    };
  });
  
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // AI Agent States
  const [isAiBuilding, setIsAiBuilding] = useState(!!initialPrompt);
  const [isAiSidebarOpen, setIsAiSidebarOpen] = useState(true);
  const [chatMessages, setChatMessages] = useState<{role: 'user' | 'assistant', text: string}[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isProcessingChat, setIsProcessingChat] = useState(false);
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatMessages, isProcessingChat]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setPreviewMode("mobile");
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const initBuild = async () => {
      if (initialPrompt) {
        setChatMessages([{ role: 'user', text: initialPrompt }]);
        setIsProcessingChat(true);
        setIsAiBuilding(true);

        let rationaleText = "";
        
        // 1. Generate Rationale with graceful fallback
        try {
          rationaleText = await generateSiteRationale(initialPrompt, (text) => {
            setChatMessages(prev => {
              const last = prev[prev.length - 1];
              if (last && last.role === 'assistant') {
                return [...prev.slice(0, -1), { role: 'assistant', text }];
              }
              return [...prev, { role: 'assistant', text }];
            });
          });
        } catch (e: any) {
          console.warn("Rationale API failed, triggering local fallback:", e);
          const bizName = localStorage.getItem("businessName") || "your business";
          rationaleText = `I am designing a modern, professional, referral-focused site tailored for your partnership campaign. The strategy places strong emphasis on clear tracking stats, direct conversion indicators, and frictionless sharing vectors to scale your brand virally.`;
          
          setChatMessages(prev => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', text: rationaleText }];
            }
            return [...prev, { role: 'assistant', text: rationaleText }];
          });
        }

        // 2. Generate Site Update with graceful fallback
        try {
          const update = await generateSiteUpdate(initialPrompt, siteConfig);
          setSiteConfig(prev => ({ ...prev, ...update }));
        } catch (e: any) {
          console.warn("Design Update API failed, applying customized default setup:", e);
          const bizName = localStorage.getItem("businessName") || "My Business Partnership";
          const baseTemplate = DEFAULT_CONFIGS[templateId] || DEFAULT_CONFIGS[1];
          
          const fallbackUpdate: Partial<SiteConfig> = {
            brand: {
              name: bizName.toUpperCase(),
              accentColor: baseTemplate.brand?.accentColor || "#1dbf73",
              tagline: "Professional Referral Hub"
            },
            hero: {
              headline: `GROW WITH REFERRALS AT ${bizName.toUpperCase()}.`,
              subheadline: `Exclusive Partnership Lounge`,
              ctaText: "Get Invitation Link",
              description: `Welcome to ${bizName}. Build custom links, send private referrals, and view high-paying commissions computed live on your dashboard.`
            },
            features: {
              title: "Affiliate Advantages",
              items: [
                { title: "Precise Analytics", description: "Monitor active hits, tracking codes, and validated target leads from a single client interface." },
                { title: "Direct Commissions", description: "Receive immediate commissions as soon as an introduction or lead converts." }
              ]
            },
            stats: [
              { label: "Partner Multiplier", value: "x2.5" },
              { label: "Avg Referral Duration", value: "3 mins" }
            ]
          };
          
          setSiteConfig(prev => ({ ...prev, ...fallbackUpdate }));

          // Add a gentle message regarding high-demand capacity fallback
          const limitExplanation = " (Note: live generation AI is experiencing temporary high demand, so I've booted a hand-crafted starting layout template for your business. You can fully customize stats, text, and themes manually or ask me to edit!)";
          setChatMessages(prev => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', text: last.text + limitExplanation }];
            }
            return [...prev, { role: 'assistant', text: rationaleText + limitExplanation }];
          });
        } finally {
          setIsProcessingChat(false);
          setIsAiBuilding(false);
        }
      } else {
        // Initial AI-driven greeting if no prompt
        try {
          const greeting = await continueChat([{ role: 'user', text: "Hello Aria. Tell the user that you are now online, powered by Gemini 1.5 Flash, and ask what they would like to build." }]);
          setChatMessages([{ role: 'assistant', text: greeting }]);
        } catch (e) {
          console.error("Failed to start chat:", e);
          setChatMessages([{ role: 'assistant', text: "Hello! I am Aria, your AI partner. How can I assist you with customizing your professional referral website or designing campaigns today?" }]);
        }
      }
      setShowSpinner(false);
    };

    initBuild();
  }, [initialPrompt]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isProcessingChat) return;
    
    const newMsg = { role: 'user' as const, text: inputValue };
    setChatMessages(prev => [...prev, newMsg]);
    setInputValue("");
    setIsProcessingChat(true);

    try {
      // Logic to check if it's a design update request
      const lowerInput = newMsg.text.toLowerCase();
      const designKeywords = ['change', 'update', 'design', 'make it', 'color', 'text', 'headline', 'title', 'brand', 'name', 'about', 'section'];
      const isDesignRequest = designKeywords.some(k => lowerInput.includes(k));

      if (isDesignRequest) {
        setIsAiBuilding(true);
        const update = await generateSiteUpdate(newMsg.text, siteConfig);
        setSiteConfig(prev => ({ ...prev, ...update }));
        
        await continueChat([...chatMessages, newMsg], (text) => {
          setChatMessages(prev => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', text }];
            }
            return [...prev, { role: 'assistant', text }];
          });
        });
        setIsAiBuilding(false);
      } else {
        await continueChat([...chatMessages, newMsg], (text) => {
          setChatMessages(prev => {
            const last = prev[prev.length - 1];
            if (last && last.role === 'assistant') {
              return [...prev.slice(0, -1), { role: 'assistant', text }];
            }
            return [...prev, { role: 'assistant', text }];
          });
        });
      }
    } catch (error: any) {
      console.error("Chat Error:", error);
      const errorMsg = error.message === "QUOTA_EXCEEDED"
        ? "I've hit my capacity for the moment. Please wait about 60 seconds before trying again."
        : "I encountered an error connecting to the API. Let's try again in a moment.";
        
      setChatMessages(prev => {
        const last = prev[prev.length - 1];
        if (last && last.role === 'assistant') {
          return [...prev.slice(0, -1), { role: 'assistant', text: errorMsg }];
        }
        return [...prev, { role: 'assistant', text: errorMsg }];
      });
    } finally {
      setIsProcessingChat(false);
    }
  };

  if (showSpinner) {
    return (
      <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#fdfdfd] z-50">
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border border-slate-200 rounded-full animate-ping absolute"></div>
          <div className="w-8 h-8 border-2 border-slate-200 border-t-emerald-500 rounded-full animate-spin relative z-10"></div>
          <div className="w-12 h-12 bg-emerald-500/10 rounded-full absolute blur-xl"></div>
        </div>
        <div className="mt-8 flex flex-col items-center">
          <h2 className="text-slate-800 font-medium tracking-wide text-sm font-mono uppercase">Initializing Workspace</h2>
          <div className="flex gap-1 mt-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className="w-1 h-1 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-[#f4f5f6] text-slate-800 font-sans flex flex-col overflow-hidden selection:bg-emerald-500/30 selection:text-emerald-900">
      <PublishModal
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        siteName={siteName}
        siteConfig={siteConfig}
        templateId={templateId}
      />

      {/* Desktop Header - Sleek Minimal Utility */}
      <header className="hidden md:flex h-14 border-b border-slate-200 bg-white items-center justify-between px-4 z-40 relative shrink-0">
        <div className="flex items-center gap-4 min-w-0 pr-4">
          <button 
            onClick={() => navigate("/")}
            className="w-8 h-8 flex flex-shrink-0 items-center justify-center rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            title="Return to Dashboard"
          >
            <ArrowLeft size={18} />
          </button>
          
          <div className="flex items-center gap-1 whitespace-nowrap text-ellipsis relative">
            <input 
              type="text"
              value={siteName}
              onChange={(e) => setSiteName(e.target.value)}
              className="text-sm font-bold text-slate-900 bg-transparent border border-transparent outline-none focus:border-slate-300 focus:bg-slate-50 hover:border-slate-200 hover:bg-slate-50 rounded-md px-2 py-1 max-w-[200px] w-full transition-all"
              placeholder="Project Name"
            />
            <div className="relative">
              <button 
                onClick={() => setIsProjectMenuOpen(!isProjectMenuOpen)}
                className={`w-6 h-6 flex items-center justify-center rounded-md transition-colors ${isProjectMenuOpen ? 'bg-slate-100 text-slate-800' : 'text-slate-400 hover:bg-slate-50 hover:text-slate-700'}`}
              >
                <ChevronDown size={14} />
              </button>
              {isProjectMenuOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsProjectMenuOpen(false)}></div>
                  <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-slate-200 rounded-lg shadow-lg py-1 z-50">
                    <button 
                      onClick={() => {
                        setIsProjectMenuOpen(false);
                        navigate("/");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors"
                    >
                      <Trash2 size={14} />
                      Delete Project
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Viewport Toggles - Pill Shape */}
        <div className="flex items-center p-1 bg-slate-100 border border-slate-200/60 rounded-full shadow-inner absolute left-1/2 -translate-x-1/2">
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`flex items-center justify-center w-10 h-7 rounded-full transition-all duration-300 ${
              previewMode === "desktop" ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Monitor size={14} />
          </button>
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`flex items-center justify-center w-10 h-7 rounded-full transition-all duration-300 ${
              previewMode === "mobile" ? "bg-white text-slate-800 shadow-sm border border-slate-200/50" : "text-slate-400 hover:text-slate-600"
            }`}
          >
            <Smartphone size={14} />
          </button>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1 mr-2 border-r border-slate-200 pr-3">
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Undo2 size={15} />
            </button>
            <button className="w-8 h-8 rounded-md flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors">
              <Redo2 size={15} />
            </button>
          </div>
          <button 
            onClick={() => setIsPublishModalOpen(true)}
            className="h-8 px-4 bg-emerald-500 hover:bg-emerald-400 text-white text-xs font-bold rounded-md shadow-[0_2px_8px_rgba(16,185,129,0.25)] hover:shadow-[0_4px_12px_rgba(16,185,129,0.35)] transition-all active:scale-95"
          >
            Deploy
          </button>
          <button 
            onClick={() => setIsAiSidebarOpen(!isAiSidebarOpen)}
            className={`h-8 w-8 rounded-md flex items-center justify-center transition-all ${isAiSidebarOpen ? "bg-emerald-50 text-emerald-600 border border-emerald-200 shadow-sm" : "bg-white border border-slate-200 text-slate-500 hover:text-slate-700 hover:bg-slate-50 shadow-sm"}`}
          >
            <Bot size={16} />
          </button>
        </div>
      </header>

      {/* Mobile Subheader - Simple & Flat per user request */}
      <header className="flex md:hidden h-[54px] bg-white border-b border-slate-200 items-center px-1 z-40 shadow-sm shrink-0">
        <button 
          onClick={() => navigate("/")}
          className="w-10 h-10 flex items-center justify-center text-slate-600 active:scale-95 transition-all"
          aria-label="Back to start"
        >
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>

        <div className="flex-1 flex justify-center">
          <div className="flex items-center bg-[#f2f2f2] p-[2px] rounded-md relative w-[160px] h-[32px]">
            <div 
              className={`absolute h-[28px] w-[calc(50%-2px)] bg-white rounded shadow-sm transition-all duration-200 ${
                activeMobileView === 'chat' ? 'left-[2px]' : 'left-[calc(50%)]'
              }`}
            />
            <button
              onClick={() => setActiveMobileView("chat")}
              className={`flex-1 h-full rounded text-[13px] font-bold z-10 transition-colors duration-200 ${
                activeMobileView === 'chat' ? 'text-black' : 'text-[#62646a]'
              }`}
            >
              Chat
            </button>
            <button
              onClick={() => setActiveMobileView("preview")}
              className={`flex-1 h-full rounded text-[13px] font-bold z-10 transition-colors duration-200 ${
                activeMobileView === 'preview' ? 'text-black' : 'text-[#62646a]'
              }`}
            >
              Preview
            </button>
          </div>
        </div>

        <div className="w-10"></div> {/* Symmetry spacer */}
      </header>

      {/* Main Workspace */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Toolbar - Icon Only (Hidden on Mobile) */}
        <aside className="hidden md:flex w-14 bg-white border-r border-slate-200 flex-col items-center py-4 z-20 shrink-0 shadow-[2px_0_12px_rgba(0,0,0,0.02)]">
          <div className="flex flex-col gap-3">
            {[
              { id: 'add', icon: Plus, tooltip: 'Add Elements' },
              { id: 'pages', icon: LayoutTemplate, tooltip: 'Pages & Layers' },
              { id: 'styles', icon: Palette, tooltip: 'Global Styles' },
              { id: 'media', icon: ImageIcon, tooltip: 'Media Library' },
              { id: 'code', icon: Code, tooltip: 'Custom Code' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveLeftTab(prev => prev === item.id ? "" : item.id)}
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all relative group ${
                  activeLeftTab === item.id 
                    ? "bg-slate-100 text-slate-800 border border-slate-200 shadow-sm" 
                    : "text-slate-400 hover:text-slate-600 hover:bg-slate-50"
                }`}
              >
                <item.icon size={18} strokeWidth={activeLeftTab === item.id ? 2 : 1.5} />
                <div className="absolute left-[calc(100%+8px)] px-2 py-1 bg-slate-800 border border-slate-700 text-white text-[11px] font-medium rounded shadow-xl opacity-0 -translate-x-2 pointer-events-none group-hover:opacity-100 group-hover:translate-x-0 transition-all whitespace-nowrap z-50">
                  {item.tooltip}
                </div>
              </button>
            ))}
          </div>
          
          <div className="mt-auto flex flex-col gap-3">
            <button className="w-10 h-10 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
              <Settings size={18} />
            </button>
            <button className="w-10 h-10 rounded-full bg-slate-100 border-2 border-slate-200 overflow-hidden mt-2 p-0 flex items-center justify-center text-[10px] font-bold text-slate-500 shadow-sm">
              JS
            </button>
          </div>
        </aside>

        {/* Side Panel for Tabs */}
        <AnimatePresence>
          {activeLeftTab && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className="w-[300px] bg-white border-r border-slate-200 flex flex-col z-10 overflow-hidden"
            >
              <div className="h-14 border-b border-slate-100 flex items-center justify-between px-5 shrink-0">
                <h3 className="text-sm font-bold uppercase tracking-widest text-slate-400">
                  {activeLeftTab === 'code' ? 'Custom Code' : activeLeftTab}
                </h3>
                <button onClick={() => setActiveLeftTab("")} className="text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-5">
                {activeLeftTab === 'code' ? (
                  <div className="space-y-4">
                    <p className="text-[12px] text-slate-500 leading-relaxed font-medium">
                      Aria generated React/TypeScript code for your site components.
                    </p>
                    <div className="bg-slate-900 rounded-lg p-4 overflow-x-auto">
                      <pre className="text-[11px] font-mono text-emerald-400 leading-relaxed">
                        <code>
                          {siteConfig.customCode || `import React from 'react';
import { motion } from 'framer-motion';

export const CustomHero = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-6xl font-black tracking-tighter"
      >
        ${siteConfig.brand.name || 'NEW PROJECT'}
      </motion.h1>
    </div>
  );
};`}
                        </code>
                      </pre>
                    </div>
                    <button className="w-full bg-slate-100 text-slate-600 py-3 rounded font-bold text-[10px] uppercase tracking-widest hover:bg-slate-200 transition-all">
                      Export Component
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-slate-300 gap-4">
                    <Bot size={32} />
                    <span className="text-xs font-mono uppercase tracking-widest">Panel Under Construction</span>
                  </div>
                )}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Builder Canvas Area */}
        <main className={`flex-1 overflow-hidden relative flex flex-col items-center justify-center ${activeMobileView === 'chat' ? 'hidden md:flex' : 'flex'} ${previewMode === 'mobile' ? 'bg-white md:bg-[#f4f5f6]' : 'bg-[#f4f5f6]'}`}>
          {/* Subtle Grid Background (Desktop Only) */}
          <div className="absolute inset-0 pointer-events-none hidden md:block" style={{
            backgroundImage: `radial-gradient(circle at 1.5px 1.5px, rgba(0,0,0,0.03) 1.5px, transparent 0)`,
            backgroundSize: `24px 24px`
          }}></div>

          <div
            className={`relative transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] flex flex-col ${
              previewMode === "desktop"
                ? "w-[min(calc(100%-80px),1280px)] md:h-[min(calc(100%-80px),800px)] h-[calc(100%-120px)] rounded-xl border border-slate-200/80 bg-white shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
                : "w-full md:w-[390px] md:h-[844px] h-full md:max-h-[calc(100%-80px)] rounded-none md:rounded-[2.5rem] md:border-[8px] border-transparent md:border-slate-100 bg-white md:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_20px_60px_rgba(0,0,0,0.1)] md:ring-1 md:ring-slate-200/50"
            }`}
          >
            {/* Browser Chrome for Desktop */}
            {previewMode === "desktop" && (
              <div className="h-10 bg-slate-50 border-b border-slate-200/80 shrink-0 flex items-center px-4 rounded-t-xl group">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-[#ff5f56] transition-colors border border-transparent group-hover:border-[#e0443e]"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-[#ffbd2e] transition-colors border border-transparent group-hover:border-[#dea123]"></div>
                  <div className="w-3 h-3 rounded-full bg-slate-300 group-hover:bg-[#27c93f] transition-colors border border-transparent group-hover:border-[#1aab29]"></div>
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white border border-slate-200 rounded-md px-16 py-1 text-[11px] font-mono text-slate-500 shadow-sm flex items-center gap-2">
                    <span className="w-2 h-2 rounded-sm bg-emerald-500/20 shadow-[0_0_8px_rgba(16,185,129,0.2)]"></span>
                    sandbox.local/preview
                  </div>
                </div>
              </div>
            )}

            {/* Mobile Notch (Desktop Simulation Only) */}
            {previewMode === "mobile" && (
              <div className="md:flex hidden absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-100 rounded-b-2xl z-50 justify-center items-center shadow-inner">
                <div className="w-12 h-1.5 bg-slate-300 rounded-full"></div>
              </div>
            )}

            {/* Canvas Content */}
            <div className={`flex-1 overflow-y-auto overflow-x-hidden relative bg-white ${previewMode === "desktop" ? "rounded-b-xl" : "md:rounded-[2rem] rounded-none"}`}>
              <div className={`w-full min-h-full transition-all duration-500 ${isAiBuilding ? 'opacity-40 blur-[1px]' : 'opacity-100'}`}>
                {siteConfig.brand.name ? (
                  <SelectedComponent config={siteConfig} />
                ) : (
                  <div className="w-full h-full bg-slate-50 flex items-center justify-center p-12 text-center">
                    <div className="max-w-md">
                      <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-200 mx-auto mb-6">
                        <Sparkles className="text-emerald-500 animate-pulse" size={32} />
                      </div>
                      <h3 className="text-slate-800 font-bold text-lg mb-2">Workspace Initialized</h3>
                      <p className="text-slate-500 text-sm leading-relaxed">
                        {isAiBuilding 
                          ? "Generating layout..."
                          : "Ready to design."}
                      </p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Construction Overlay */}
              {isAiBuilding && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none bg-white/40 backdrop-blur-[2px]">
                  <div className="bg-white/95 border border-slate-200 p-6 rounded-2xl shadow-2xl backdrop-blur-xl flex flex-col items-center">
                     <div className="relative">
                        <div className="w-12 h-12 border-2 border-slate-100 border-t-emerald-500 rounded-full animate-spin"></div>
                        <Bot size={20} className="text-slate-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                     </div>
                     <span className="text-slate-600 font-mono text-sm mt-4 tracking-wide font-medium">Compiling layout...</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>

        {/* Right Sidebar - AI Agent */}
        <aside 
          className={`flex flex-col bg-[#fdfdfd] border-l border-slate-200 shrink-0 transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] shadow-[-4px_0_24px_rgba(0,0,0,0.02)] ${
            isAiSidebarOpen ? 'w-full md:w-[380px] translate-x-0' : 'w-full md:w-[380px] translate-x-[380px] absolute right-0 top-0 bottom-0 opacity-0'
          } ${activeMobileView === 'preview' ? 'hidden md:flex' : 'flex'}`}
        >
          {/* AI Header (Hidden on Mobile as it's redundant with main header) */}
          <div className="hidden md:flex h-14 px-5 border-b border-slate-100 items-center justify-between shrink-0 bg-white/95 backdrop-blur-md relative z-10 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-8 h-8 rounded-md bg-emerald-50 border border-emerald-100 flex items-center justify-center text-emerald-500 shrink-0 shadow-[0_2px_4px_rgba(16,185,129,0.1)]">
                  <Bot size={16} />
                </div>
                {isProcessingChat && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.4)]"></span>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  Aria <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-700 font-semibold border border-emerald-200">Gemini 1.5 Flash</span>
                </h3>
              </div>
            </div>
            <button 
              onClick={() => setIsAiSidebarOpen(false)}
              className="text-slate-400 hover:text-slate-600 transition-colors p-1 rounded-md hover:bg-slate-50"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          {/* AI Chat History */}
          <div className="flex-1 overflow-y-auto p-4 md:p-5 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 scrollbar-track-transparent">
            {chatMessages.map((msg, i) => (
               <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded bg-emerald-50 border border-emerald-100 md:flex hidden items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                    <Bot size={12} className="text-emerald-500" />
                  </div>
                )}
                <div 
                  className={`max-w-[90%] md:max-w-[85%] px-4 py-3 text-[14px] md:text-[13px] leading-relaxed shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-slate-800 text-white rounded-2xl rounded-tr-sm' 
                      : 'bg-white text-slate-700 border border-slate-200 rounded-2xl rounded-tl-sm shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isProcessingChat && (
              <div className="flex justify-start">
                <div className="w-6 h-6 rounded bg-emerald-50 border border-emerald-100 md:flex hidden items-center justify-center shrink-0 mr-3 mt-1 shadow-sm">
                  <Bot size={12} className="text-emerald-500/80" />
                </div>
                <div className="bg-white border border-slate-200 px-4 py-4 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[pulse_1s_infinite_0ms]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[pulse_1s_infinite_200ms]"></span>
                  <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-[pulse_1s_infinite_400ms]"></span>
                </div>
              </div>
            )}
            
            <div ref={chatEndRef} />
          </div>

          {/* AI Chat Input - Tech Terminal Feel (Responsive) */}
          <div className="p-4 bg-white border-t border-slate-100 pb-10 md:pb-4">
            <div className="relative group rounded-xl bg-slate-50 p-1 border border-slate-200 focus-within:border-emerald-400 focus-within:shadow-[0_0_0_4px_rgba(16,185,129,0.1)] transition-all">
              <textarea
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                disabled={isProcessingChat}
                className="w-full bg-transparent p-3 pr-10 text-[15px] md:text-[13px] text-slate-800 placeholder:text-slate-400 focus:outline-none min-h-[48px] md:min-h-[44px] resize-none"
                placeholder={isProcessingChat ? "Analyzing request..." : "Instruct Aria..."}
                rows={1}
              />
              <button 
                onClick={handleSendMessage}
                disabled={isProcessingChat || !inputValue.trim()}
                className={`absolute right-2 bottom-2 w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                  isProcessingChat || !inputValue.trim() 
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed' 
                    : 'bg-emerald-500 text-white hover:bg-emerald-400 shadow-[0_2px_8px_rgba(16,185,129,0.3)] active:scale-95'
                }`}
              >
                <Send size={12} strokeWidth={2.5} className={inputValue.trim() && !isProcessingChat ? "translate-x-[1px] -translate-y-[-1px]" : ""} />
              </button>
            </div>
            <div className="flex justify-between items-center mt-3 px-1 opacity-60">
               <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider font-semibold">Aria Copilot Mode</span>
               <span className="text-[10px] text-slate-400 font-medium tracking-tight">Return to send</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
