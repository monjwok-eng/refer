import React from "react";
import { motion } from "motion/react";
import {
  ArrowRight,
  Star,
  CheckCircle,
  Globe,
  Shield,
  Target,
} from "lucide-react";
import { SiteConfig } from "../types/site";

export const MinimalAgency = ({ config }: { config?: SiteConfig }) => (
  <div 
    className="@container bg-white min-h-full font-sans text-slate-900 selection:bg-black selection:text-white"
    style={{ backgroundColor: config?.brand.backgroundColor || "#ffffff" }}
  >
    <div className="p-8 md:p-16 max-w-[1400px] mx-auto">
      <nav className="flex justify-between items-center mb-32">
        <div className="flex items-center gap-3">
          <div 
             className="w-10 h-10 flex items-center justify-center font-black text-white text-xl"
             style={{ backgroundColor: config?.brand.accentColor || "black" }}
          >
            {config?.brand.name?.charAt(0) || "A"}
          </div>
          <div className="font-black text-2xl tracking-tighter uppercase">{config?.brand.name || "ARCHIVE."}</div>
        </div>
        <div className="hidden md:flex gap-16 text-[11px] font-black uppercase tracking-[0.4em] text-slate-400">
          <span className="text-slate-900 hover:tracking-[0.6em] transition-all cursor-pointer">
            Work
          </span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">
            Services
          </span>
          <span className="hover:text-slate-900 cursor-pointer transition-colors">
            Contact
          </span>
        </div>
      </nav>

      <main>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-[11px] font-black uppercase tracking-[0.6em] mb-12 flex items-center gap-4"
              style={{ color: config?.brand.accentColor || "#1dbf73" }}
            >
              <div className="h-px w-12" style={{ backgroundColor: config?.brand.accentColor || "#1dbf73" }} />
              {config?.hero.subheadline || "Creative Intelligence Agency"}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="text-[12cqw] lg:text-[9cqw] leading-[0.8] font-black tracking-tighter mb-24 uppercase break-words"
            >
              {config?.hero.headline || "CRAFTING DIGITAL EXCELLENCE."}
            </motion.h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-end">
          <div className="lg:col-span-5">
            <p className="text-2xl text-slate-500 font-medium leading-[1.5] tracking-tight border-l-4 border-slate-100 pl-8">
              {config?.hero.description || "We partner with visionary founders to build products that define categories and disrupt industries."}
            </p>
          </div>
          <div className="lg:col-span-7 flex flex-col items-end gap-16">
            <div className="flex gap-24 w-full justify-between lg:justify-end">
              {config?.stats ? config.stats.map((stat, i) => (
                <div key={i} className="group cursor-default">
                  <div 
                    className="text-6xl font-black mb-2 tracking-tighter transition-colors"
                    style={{ color: "var(--color-slate-900)" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    {stat.label}
                  </div>
                </div>
              )) : (
                <>
                  <div className="group cursor-default">
                    <div className="text-6xl font-black mb-2 tracking-tighter hover:text-[#1dbf73]">32</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Products</div>
                  </div>
                  <div className="group cursor-default">
                    <div className="text-6xl font-black mb-2 tracking-tighter hover:text-[#1dbf73]">127B</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Value</div>
                  </div>
                </>
              )}
            </div>
            <button 
              className="w-full lg:w-auto bg-black text-white px-16 py-8 rounded-full font-black text-xs uppercase tracking-[0.3em] flex items-center justify-center gap-8 hover:bg-[#1dbf73] transition-all group scale-105 hover:scale-110 active:scale-100"
              style={{ backgroundColor: "black" }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = config?.brand.accentColor || "#1dbf73"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "black"}
            >
              {config?.hero.ctaText || "Start Your Journey"}
              <ArrowRight
                size={24}
                className="group-hover:translate-x-4 transition-transform"
              />
            </button>
          </div>
        </div>

        <section className="mt-60">
          <div className="flex justify-between items-end mb-16 px-4">
            <h2 className="text-5xl font-black tracking-tighter italic text-slate-200 uppercase">
              {config?.features.title || "Releases / 24"}
            </h2>
            <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              Scroll to view
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-32">
            {(config?.features.items || []).map((item, i) => (
               <div key={i} className={`aspect-[4/5] bg-slate-50 relative overflow-hidden group cursor-pointer ${i % 2 === 1 ? 'lg:mt-24' : ''}`}>
               <img
                 src={`https://images.unsplash.com/photo-${1542744094 + i}-3a31f272c490?auto=format&fit=crop&w=1200&q=80`}
                 className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
               <div className="absolute bottom-12 left-12">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] mb-3" style={{ color: config?.brand.accentColor || "#1dbf73" }}>
                   {item.description}
                 </div>
                 <h3 className="text-3xl font-black text-white tracking-tight uppercase">
                   {item.title}
                 </h3>
               </div>
             </div>
            ))}
            {!config?.features.items && (
               <div className="aspect-[4/5] bg-slate-50 relative overflow-hidden group cursor-pointer">
               <img
                 src="https://images.unsplash.com/photo-1542744094-3a31f272c490?auto=format&fit=crop&w=1200&q=80"
                 className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
               <div className="absolute bottom-12 left-12">
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-[#1dbf73] mb-3">
                   Fintech Solution
                 </div>
                 <h3 className="text-3xl font-black text-white tracking-tight">
                   Vanguard Systems
                 </h3>
               </div>
             </div>
            )}
          </div>
        </section>
      </main>
    </div>
  </div>
);

export const ProfessionalServices = ({ config }: { config?: SiteConfig }) => (
  <div 
    className="@container bg-[#fcfdfe] min-h-full font-sans text-slate-900 selection:bg-[#1dbf73] selection:text-white"
    style={{ backgroundColor: config?.brand.backgroundColor || "#fcfdfe" }}
  >
    <div className="h-2" style={{ backgroundColor: config?.brand.accentColor || "#1dbf73" }} />
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 px-8 py-5 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-slate-900 rounded-2xl flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
            <Shield style={{ color: config?.brand.accentColor || "#1dbf73" }} size={24} />
          </div>
          <div className="flex flex-col -gap-1">
            <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">
              {config?.brand.name || "STRATOS"}
            </span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em]" style={{ color: config?.brand.accentColor || "#1dbf73" }}>
              {config?.brand.tagline || "Group Advisory"}
            </span>
          </div>
        </div>
        <nav className="hidden lg:flex gap-12 text-[12px] font-black uppercase tracking-widest text-slate-500">
          <span className="text-black border-b-2 border-black cursor-pointer">
            Approach
          </span>
          <span className="hover:text-black transition-colors cursor-pointer">
            Solutions
          </span>
          <span className="hover:text-black transition-colors cursor-pointer">
            Intelligence
          </span>
        </nav>
        <button 
           className="text-white px-8 py-3 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-slate-900 transition-all shadow-xl"
           style={{ backgroundColor: config?.brand.accentColor || "#1dbf73", boxShadow: `0 20px 25px -5px ${config?.brand.accentColor}33` }}
        >
          Secure Portal
        </button>
      </div>
    </header>

    <section className="px-8 pt-32 pb-40">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="space-y-12">
          <div className="inline-flex items-center gap-3 bg-white border border-slate-200 px-5 py-2.5 rounded-full shadow-sm">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-6 h-6 rounded-full border-2 border-white bg-slate-200 overflow-hidden"
                >
                  <img
                    src={`https://i.pravatar.cc/150?u=${i}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
            <span className="text-slate-500 font-bold text-xs tracking-tight">
              Trusted by 500+ Global Partners
            </span>
          </div>
          <h2 className="text-[12cqw] lg:text-[5.5cqw] font-black text-slate-900 leading-[0.95] tracking-tighter uppercase whitespace-pre-wrap">
            {config?.hero.headline || "Architecting the future of Global Capital."}
          </h2>
          <p className="text-slate-500 text-xl leading-relaxed max-w-xl pl-10 font-medium border-l-2" style={{ borderColor: config?.brand.accentColor || "#1dbf73" }}>
            {config?.hero.description || "We deliver uncompromising expertise in high-stakes market expansion, risk mitigation, and algorithmic diversification."}
          </p>
          <div className="flex flex-wrap gap-6 pt-4">
            <button className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-[#1dbf73] transition-all shadow-2xl"
               onMouseEnter={(e) => e.currentTarget.style.backgroundColor = config?.brand.accentColor || "#1dbf73"}
               onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgb(15, 23, 42)"}
            >
              {config?.hero.ctaText || "Partner with us"}
            </button>
            <button className="bg-white border border-slate-200 text-slate-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">
              Methodology 04
            </button>
          </div>
        </div>
        <div className="relative">
          <div className="absolute -inset-10 opacity-20 -z-10" style={{ backgroundImage: `radial-gradient(${config?.brand.accentColor || "#1dbf73"} 1px,transparent 1px)`, backgroundSize: '20px 20px' }} />
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-8 border-white group">
            <img
              src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute top-8 right-8 bg-white/90 backdrop-blur p-4 rounded-2xl shadow-xl border border-white">
              <div className="text-[40px] font-black text-slate-900 leading-none">
                A++
              </div>
              <div className="text-[10px] font-black uppercase tracking-widest" style={{ color: config?.brand.accentColor || "#1dbf73" }}>
                Service Level
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div className="bg-slate-900 text-white py-40">
      <div className="max-w-7xl mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16">
          {config?.stats ? config.stats.map((stat, i) => (
             <div key={i}>
                <div className="text-5xl font-black mb-4" style={{ color: config?.brand.accentColor || "#1dbf73" }}>{stat.value}</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] opacity-40">
                  {stat.label}
                </div>
            </div>
          )) : (
            <>
              <div>
                <div className="text-5xl font-black text-[#1dbf73] mb-4">4.2B</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Assets Protected</div>
              </div>
              <div>
                <div className="text-5xl font-black text-[#1dbf73] mb-4">24/7</div>
                <div className="text-xs font-black uppercase tracking-[0.3em] opacity-40">Monitoring</div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  </div>
);

export const EditorialPortfolio = ({ config }: { config?: SiteConfig }) => (
  <div 
    className="@container bg-[#0a0a0a] min-h-full font-serif text-white selection:bg-white selection:text-black"
    style={{ backgroundColor: config?.brand.backgroundColor || "#0a0a0a" }}
  >
    <div className="p-8 md:p-16 max-w-[1400px] mx-auto">
      <div className="flex justify-between items-start mb-48">
        <div className="space-y-2 group cursor-pointer">
          <div className="text-4xl font-light italic tracking-tight underline underline-offset-[12px] decoration-white/10 group-hover:decoration-white transition-all">
            {config?.brand.name || "Elias Thorne"}
          </div>
          <div className="text-[10px] uppercase tracking-[0.6em] text-white/30">
            {config?.hero.subheadline || "Cinematic Perspective / NYC"}
          </div>
        </div>
        <nav className="flex gap-16">
          {["Archive", "Manifesto", "Contact"].map((item) => (
            <div key={item} className="group cursor-pointer overflow-hidden relative">
              <div className="text-[11px] uppercase tracking-[0.4em] text-white/40 group-hover:text-white transition-all transform group-hover:-translate-y-full duration-500">
                {item}
              </div>
              <div className="text-[11px] uppercase tracking-[0.4em] text-white absolute inset-0 transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                {item}
              </div>
            </div>
          ))}
        </nav>
      </div>

      <main>
        <div className="relative mb-60">
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.5, ease: "circOut" }}
            className="absolute -left-12 top-0 h-px w-32 bg-white/20 origin-left"
          />
          <h1 className="text-[14cqw] lg:text-[10cqw] font-light leading-[0.9] tracking-tighter max-w-6xl uppercase">
            {config?.hero.headline.split(" ").slice(0, 3).join(" ")} {" "}
            <span className="italic font-normal text-white/40">{config?.hero.headline.split(" ").slice(3).join(" ")}</span>
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-32 mb-60">
          <div className="lg:col-span-4 flex flex-col gap-24">
            <div className="space-y-12">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 block">
                Philosophy
              </span>
              <p className="text-2xl font-light italic text-white/60 leading-relaxed underline underline-offset-8 decoration-white/5 whitespace-pre-line">
                "{config?.hero.description || "I believe that every shadows tells a secret that the light is too afraid to whisper."}"
              </p>
            </div>
            <div className="space-y-8">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-white/20 block uppercase">
                {config?.features.title || "Featured Commissions"}
              </span>
              <div className="space-y-6">
                {(config?.features.items || []).map(
                  (item, i) => (
                    <div
                      key={i}
                      className="flex justify-between items-center group cursor-pointer border-b border-white/5 pb-4"
                    >
                      <span className="text-lg font-light text-white/40 group-hover:text-white transition-colors italic">
                        {item.title}
                      </span>
                      <ArrowRight
                        size={16}
                        className="opacity-0 group-hover:opacity-100 transition-all -translate-x-4 group-hover:translate-x-0"
                      />
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-40 lg:pb-60">
            {(config?.features.items || []).map((item, i) => (
               <div key={i} className={`${i % 2 === 0 ? 'aspect-[4/5]' : 'aspect-[16/9]'} bg-neutral-900 group relative overflow-hidden`}>
               <img
                 src={`https://images.unsplash.com/photo-${1511988617509 + i}-a57c8a288659?auto=format&fit=crop&w=1500&q=80`}
                 className="w-full h-full object-cover grayscale opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-1000"
               />
               <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors duration-1000" />
               <div className="absolute bottom-12 right-12 text-[11px] uppercase tracking-[0.6em] italic opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0">
                 {item.description}
               </div>
             </div>
            ))}
          </div>
        </div>
      </main>

      <footer className="pt-32 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-12 pb-24">
        <div className="text-[12cqw] font-light leading-none opacity-5 italic tracking-tighter truncate max-w-full">
          {config?.brand.name || "ELIAS THORNE"}
        </div>
        <div className="flex flex-col items-center lg:items-end gap-4 shrink-0">
          <div className="text-[11px] uppercase tracking-[0.8em] text-white/20">
            Studio © 2026
          </div>
          <div className="flex gap-8 text-[10px] uppercase tracking-widest font-bold" style={{ color: config?.brand.accentColor === "#ffffff" ? "#1dbf73" : config?.brand.accentColor }}>
            <span>Instagram</span>
            <span>Foundation</span>
          </div>
        </div>
      </footer>
    </div>
  </div>
);
