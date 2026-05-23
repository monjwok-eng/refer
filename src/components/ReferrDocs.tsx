
import React, { useEffect } from "react";
import { Rocket, Users, Shield, BookOpen, ChevronRight, LayoutGrid, FileText } from "lucide-react";
import { useLocation, Link } from "react-router-dom";

export default function ReferrDocs() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.querySelector(hash);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [hash]);

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <header className="h-[60px] md:h-20 border-b border-slate-200 bg-white/95 backdrop-blur-sm flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50">
        <Link to="/" className="flex items-baseline font-black text-[#404145] tracking-tighter font-display scale-[0.8] md:scale-100 origin-left">
          <span className="text-[32px] leading-none">Referr</span>
          <span className="text-[#1dbf73] text-[36px] leading-none ml-[0.5px]">.</span>
        </Link>
        <div className="flex items-center gap-4 md:gap-6">
          <span className="text-xs md:text-sm font-semibold text-slate-900 border-l border-slate-200 pl-4">Documentation</span>
        </div>
      </header>

      <div className="flex max-w-7xl mx-auto w-full">
        <aside className="w-64 border-r border-slate-200 bg-slate-50/50 sticky top-[60px] md:top-20 h-[calc(100vh-60px)] md:h-[calc(100vh-80px)] hidden lg:block py-16 pr-10">
          <nav className="space-y-12 pl-8">
            {[
              { title: "Fundamentals", links: [{ to: "#business", label: "For Businesses" }, { to: "#hustler", label: "For Hustlers" }] },
              { title: "Governance", links: [{ to: "#privacy", label: "Privacy & Security" }] }
            ].map(group => (
              <div key={group.title}>
                <h4 className="text-[11px] font-bold text-slate-900 uppercase tracking-[0.2em] mb-6">{group.title}</h4>
                <ul className="space-y-4">
                  {group.links.map(link => (
                    <li key={link.to}><Link to={link.to} className="block text-slate-600 hover:text-green-600 font-semibold text-[15px] transition-all duration-200">{link.label}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>

        <main className="flex-1 py-10 px-6 sm:px-10 lg:py-16 lg:px-20 overflow-y-auto">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter mb-6 md:mb-8 text-[#222325]">Documentation</h1>
            <p className="text-lg md:text-xl text-slate-600 mb-12 md:mb-16 leading-relaxed font-light">Comprehensive guides for Referr.</p>
            
            <section id="business" className="mb-16 md:mb-24">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 border-b border-slate-200 pb-6 md:pb-8 mb-8 md:mb-10">
                <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl w-fit"><Rocket className="w-8 h-8 md:w-8 md:h-8" /></div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#222325]">For Businesses</h2>
                  <p className="text-sm md:text-base text-slate-500 mt-1">Tools to build, manage, and scale.</p>
                </div>
              </div>
              <div className="space-y-8 md:space-y-12">
                {[
                  { title: "1. Campaign Setup", desc: "Define reward structures and generate tracking URLs." },
                  { title: "2. Payment Automation", desc: "Secure automated payouts to your referrers." },
                  { title: "3. Analytics & ROI", desc: "Real-time performance metrics." }
                ].map(item => (
                  <div key={item.title}>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#222325] mb-2 md:mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="hustler" className="mb-16 md:mb-24 pt-12 md:pt-16 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 border-b border-slate-200 pb-6 md:pb-8 mb-8 md:mb-10">
                <div className="p-3 bg-purple-50 text-purple-600 rounded-2xl w-fit"><Users className="w-8 h-8 md:w-8 md:h-8" /></div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#222325]">For Hustlers</h2>
                  <p className="text-sm md:text-base text-slate-500 mt-1">Strategies for referrers.</p>
                </div>
              </div>
              <div className="space-y-8 md:space-y-12">
                {[
                  { title: "1. Growing Your Network", desc: "Strategic promotion tips." },
                  { title: "2. Payout Optimization", desc: "Maximizing lifetime earnings." }
                ].map(item => (
                  <div key={item.title}>
                    <h3 className="text-xl md:text-2xl font-semibold text-[#222325] mb-2 md:mb-4">{item.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-base md:text-lg font-light">{item.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section id="privacy" className="mb-16 md:mb-24 pt-12 md:pt-16 border-t border-slate-200">
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 border-b border-slate-200 pb-6 md:pb-8 mb-8 md:mb-10">
                <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl w-fit"><Shield className="w-8 h-8 md:w-8 md:h-8" /></div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-[#222325]">Privacy & Security</h2>
                  <p className="text-sm md:text-base text-slate-500 mt-1">Safety first.</p>
                </div>
              </div>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#222325] mb-4 md:mb-6 tracking-tight">Payout Security</h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light">Secure and audited.</p>
              <h3 className="text-2xl md:text-3xl font-semibold text-[#222325] mt-10 md:mt-12 mb-4 md:mb-6 tracking-tight">Data Rights</h3>
              <p className="text-base md:text-lg text-slate-600 leading-relaxed font-light mb-8">Full control over your data.</p>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
