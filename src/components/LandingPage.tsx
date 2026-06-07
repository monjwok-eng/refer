import React from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Star, Youtube, Twitter, Instagram } from "lucide-react";
import { motion } from "motion/react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Navbar theme="light" />

      <main>
        {/* Creator Hero Section (Light Mode) */}
        <section className="relative px-5 md:px-8 xl:px-32 pt-8 sm:pt-16 md:pt-24 pb-0 overflow-hidden mt-[-20px]">
          {/* Light glowing orbs for texture */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-pink-500/10 blur-[150px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 left-[-10%] w-[500px] h-[500px] bg-orange-400/10 blur-[150px] rounded-full pointer-events-none" />
          
          <div className="mx-auto max-w-screen-xl relative z-10">
            {/* The Toggle (Beehiiv Style / For Creators active) */}
            <div className="flex justify-center w-full mb-10 md:mb-14">
              <div className="bg-gray-100/80 backdrop-blur-sm p-1.5 flex items-center rounded-full border border-gray-200 shadow-inner">
                <div className="bg-white text-black px-6 py-2.5 rounded-full font-extrabold text-[12px] tracking-widest uppercase shadow-sm border border-gray-200 flex items-center gap-2">
                  For Creators
                </div>
                <Link to="/brand" className="text-gray-500 hover:text-gray-900 px-6 py-2.5 rounded-full font-extrabold text-[12px] tracking-widest uppercase transition-colors flex items-center gap-2">
                  For Brands
                </Link>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center text-center">
              
              <div className="flex flex-col gap-4 items-center text-center">
                <p className="text-base md:text-lg font-medium text-[#F092DD] font-bold max-w-2xl mx-auto uppercase tracking-widest">
                  YOUR AUDIENCE
                </p>
                <h1 className="clash-grotesk-font-family uppercase font-black text-[42px] leading-[44px] sm:text-5xl md:text-[64px] md:leading-[66px] mx-auto max-w-5xl">
                  Create, share, and <span className="bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent inline-block">monetize</span> your influence
                </h1>
                <p className="text-lg md:text-xl font-medium text-gray-600 max-w-2xl mx-auto leading-relaxed">
                  The premier platform for influencers and content creators. Find high-paying brand deals, run exclusive referral campaigns, and turn every click into cash.
                </p>
              </div>

              <div className="flex flex-row flex-nowrap justify-center gap-3 sm:gap-6 mt-4 w-full px-2 sm:px-0">
                <Link
                  to="/signup/hustler"
                  className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"
                >
                  <div className="text-white bg-[#2F39BA] border-[#2F39BA] border rounded-[6px] text-sm sm:text-base lg:text-lg font-bold leading-6 py-2.5 sm:py-3 px-3 sm:px-8 inline-flex items-center gap-1 sm:gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 h-full w-full justify-center text-center">
                    <span>Start Earning</span>
                    <ChevronRight size={16} className="sm:w-[18px] sm:h-[18px]" />
                  </div>
                  <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                  <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                </Link>
                <Link
                  to="#how-it-works"
                  className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"
                >
                  <div className="text-[#3843D0] border-[#3843D0] border bg-white rounded-[6px] text-sm sm:text-base lg:text-lg font-bold leading-6 py-2.5 sm:py-3 px-3 sm:px-8 inline-flex items-center gap-1 sm:gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 h-full w-full justify-center text-center">
                    Learn more
                  </div>
                  <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                  <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                </Link>
              </div>

              <div className="mt-8 lg:mt-16 mx-auto w-full max-w-4xl">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-auto"
                >
                  <img
                    alt="Hero image"
                    width="1000"
                    height="500"
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-cover block shadow-2xl rounded-2xl border border-gray-200"
                    style={{ color: "transparent" }}
                    srcSet="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletter-feature-page/hero-2.png 1x, https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=2048,quality=75/www/newsletter-feature-page/hero-2.png 2x"
                    src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=2048,quality=75/www/newsletter-feature-page/hero-2.png"
                    data-cmp-ab="2"
                    data-cmp-info="10"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* Ticker Section */}
        <section className="bg-[#3843D0] border-b-2 text-[#FFFFFF]">
          <div className="py-10 sm:py-12 md:py-16">
            <div className="flex flex-col gap-4">
              <p className="text-sm font-medium text-center !font-bold uppercase tracking-[0.72px] max-w-2xl mx-auto">
                TRUSTED BY LEADING BUSINESS
              </p>
              <section className="ticker overflow-hidden flex w-full">
              {[1, 2].map((group) => (
                <div key={group} className="ticker-image-container duration-[85s] animate-ticker-left">
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Arnold Pump Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[80px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/arnold-pump.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Awa Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/awa.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="BGM Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/bgm-logo.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Blockworks Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/blockworks.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Brex Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[100px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/brex.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Clickhole Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/clickhole.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="CRE Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/cre.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Cult of Mac Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/cult-of-mac.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Daily Drop Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/daily-drop.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Exec Sum Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/exec-sum.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Fantasy Life Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/fantasy-life.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Friday Beers Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[80px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/friday-beers.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Futurepedia Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[150px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/futurepedia.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Milkroad Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[100px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/milkroad.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Mindstream Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[140px] h-[75px] object-contain" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/mindstream.png" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Miss Excel Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[100px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/miss-excel.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Overtime Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[80px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/overtime.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Rap TV Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[100px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/rap-tv.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Resume Worded Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[80px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/resume-worded.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="Texas Tribune Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[140px] h-[85px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/TTT.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="The Ringer Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[140px] h-[85px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/theringer.svg" 
                    />
                  </div>
                  <div className="mx-4 flex items-center justify-center">
                    <img 
                      alt="What Do You Meme Logo" 
                      loading="eager" 
                      width="500" 
                      height="500" 
                      className="max-w-[80px] h-[75px]" 
                      src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletters-logos-on-beehiiv-white/what-do-you-meme.svg" 
                    />
                  </div>
                </div>
              ))}
            </section>
          </div>
          </div>
        </section>

        {/* Operating System Section */}
        <section className="bg-cyber-ink relative text-white">
          <div className="px-5 md:px-8 xl:px-32 py-10 sm:py-16 md:py-24">
            <div className="mx-auto max-w-screen-xl">
              <div className="flex flex-col gap-4 items-center text-center">
                <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl max-w-3xl mx-auto">
                  The Platform for the Creator Economy
                </h2>
                <p className="text-lg md:text-xl font-medium">
                  Everything creators need to partner with top brands, seamlessly promote products, and get paid fast. With powerful tools built for modern creators, you can grow and monetize your audience easier than ever before.
                </p>
                <div className="mt-6">
                  <Link to="/signup" className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]">
                    <div className="text-black border border-white bg-cyber-ink text-white rounded-[6px] text-base lg:text-lg font-bold leading-6 py-2 px-6 inline-flex items-center gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">
                      Get Started
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                      </svg>
                    </div>
                    <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                    <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                  </Link>
                </div>
              </div>
              
              <div className="mt-10 grid lg:mt-20 lg:grid-cols-3">
                <Link to="/features" className="relative before:absolute before:inset-0 before:rounded-[12px] before:border before:border-[#4E4E6C]/30 rounded-lg border-opacity-20 p-6 transition-transform duration-300 cursor-pointer before:transition-all before:duration-300 before:hover:bg-gradient-to-b before:hover:from-[rgba(6,4,25,0.2)] before:hover:to-[rgba(78,78,108,0.2)]">
                  <div className="flex flex-grow flex-col">
                    <div className="flex flex-col gap-6">
                      <p className="mt-6 text-xl font-semibold">Premium Brand Deals</p>
                      <p className="text-base font-medium sm:max-w-sm">Access an exclusive network of high-paying brands looking for creators just like you. No more low-rate sponsorships and endless negotiation.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex min-h-[50px] items-center">
                    <img alt="Feature Icon" loading="lazy" width="500" height="500" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletter-feature-page/Effortless+Newsletter+Creation.png" />
                  </div>
                </Link>
                <Link to="/features" className="relative before:absolute before:inset-0 before:rounded-[12px] before:border before:border-[#4E4E6C]/30 rounded-lg border-opacity-20 p-6 transition-transform duration-300 cursor-pointer before:transition-all before:duration-300 before:hover:bg-gradient-to-b before:hover:from-[rgba(6,4,25,0.2)] before:hover:to-[rgba(78,78,108,0.2)]">
                  <div className="flex flex-grow flex-col">
                    <div className="flex flex-col gap-6">
                      <p className="mt-6 text-xl font-semibold">Instant Link Generation</p>
                      <p className="text-base font-medium sm:max-w-sm">Generate trackable, beautiful vanity links with one click. Share them anywhere — from your link-in-bio to your YouTube descriptions.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex min-h-[50px] items-center">
                    <img alt="Feature Icon" loading="lazy" width="500" height="500" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletter-feature-page/Audience+Growth+Tools.png" />
                  </div>
                </Link>
                <Link to="/features" className="relative before:absolute before:inset-0 before:rounded-[12px] before:border before:border-[#4E4E6C]/30 rounded-lg border-opacity-20 p-6 transition-transform duration-300 cursor-pointer before:transition-all before:duration-300 before:hover:bg-gradient-to-b before:hover:from-[rgba(6,4,25,0.2)] before:hover:to-[rgba(78,78,108,0.2)]">
                  <div className="flex flex-grow flex-col">
                    <div className="flex flex-col gap-6">
                      <p className="mt-6 text-xl font-semibold">Transparent Payouts</p>
                      <p className="text-base font-medium sm:max-w-sm">See exactly how much you're earning in real-time. Fast, on-time payments direct to your bank or crypto wallet without hidden fees.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex min-h-[50px] items-center">
                    <img alt="Feature Icon" loading="lazy" width="500" height="500" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletter-feature-page/Monetization+Made+Simple.png" />
                  </div>
                </Link>
                <Link to="/features" className="relative before:absolute before:inset-0 before:rounded-[12px] before:border before:border-[#4E4E6C]/30 rounded-lg border-opacity-20 p-6 transition-transform duration-300 cursor-pointer before:transition-all before:duration-300 before:hover:bg-gradient-to-b before:hover:from-[rgba(6,4,25,0.2)] before:hover:to-[rgba(78,78,108,0.2)]">
                  <div className="flex flex-grow flex-col">
                    <div className="flex flex-col gap-6">
                      <p className="mt-6 text-xl font-semibold">Data-Driven Performance</p>
                      <p className="text-base font-medium sm:max-w-sm">Track clicks, conversions, and revenue in real-time to optimize your content strategy and increase engagement across your channels.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex min-h-[50px] items-center">
                    <img alt="Feature Icon" loading="lazy" width="500" height="500" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletter-feature-page/Data-Driven+Performance+Insights.png" />
                  </div>
                </Link>
                <Link to="/features" className="relative before:absolute before:inset-0 before:rounded-[12px] before:border before:border-[#4E4E6C]/30 rounded-lg border-opacity-20 p-6 transition-transform duration-300 cursor-pointer before:transition-all before:duration-300 before:hover:bg-gradient-to-b before:hover:from-[rgba(6,4,25,0.2)] before:hover:to-[rgba(78,78,108,0.2)]">
                  <div className="flex flex-grow flex-col">
                    <div className="flex flex-col gap-6">
                      <p className="mt-6 text-xl font-semibold">Audience Analytics</p>
                      <p className="text-base font-medium sm:max-w-sm">Understand your community on a deeper level. Get detailed insights on viewer demographics and behavior to connect better with your fans.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex min-h-[50px] items-center">
                    <img alt="Feature Icon" loading="lazy" width="500" height="500" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletter-feature-page/Seamless+Integrations.png" />
                  </div>
                </Link>
                <Link to="/features" className="relative before:absolute before:inset-0 before:rounded-[12px] before:border before:border-[#4E4E6C]/30 rounded-lg border-opacity-20 p-6 transition-transform duration-300 cursor-pointer before:transition-all before:duration-300 before:hover:bg-gradient-to-b before:hover:from-[rgba(6,4,25,0.2)] before:hover:to-[rgba(78,78,108,0.2)]">
                  <div className="flex flex-grow flex-col">
                    <div className="flex flex-col gap-6">
                      <p className="mt-6 text-xl font-semibold">Automated Workflows</p>
                      <p className="text-base font-medium sm:max-w-sm">Automate your affiliate campaigns and link distribution. Free up more time for creativity and inspiration rather than manual tracking.</p>
                    </div>
                  </div>
                  <div className="mt-4 flex min-h-[50px] items-center">
                    <img alt="Feature Icon" loading="lazy" width="500" height="500" decoding="async" data-nimg="1" style={{ color: "transparent" }} src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1080,quality=75/www/newsletter-feature-page/Automated+Workflows.png" />
                  </div>
                </Link>
              </div>

              <div className="relative mt-20 pt-16 before:absolute before:left-0 before:right-0 before:top-0 before:h-[2px] before:bg-gradient-to-r before:from-[#FF5EC4] before:to-[#060419] md:pt-24">
                <div className="flex flex-col gap-4 items-center text-center lg:text-left lg:flex-row lg:justify-between w-full">
                  <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left">
                    <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl max-w-2xl">Ready to Monetize Your Audience?</h2>
                    <p className="text-xl md:text-2xl font-medium max-w-2xl text-gray-300">Join the community of successful creators earning with Referr today.</p>
                  </div>
                  <Link to="/signup" className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]">
                    <div className="text-black border border-white bg-cyber-ink text-white rounded-[6px] text-base lg:text-lg font-bold leading-6 py-2 px-6 inline-flex items-center gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">
                      Start Earning
                    </div>
                    <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                    <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                  </Link>
                </div>
              </div>

            </div>
          </div>
        </section>



        <section className="bg-white text-[#060419] border-b-2">
          <div className="px-5 md:px-8 xl:px-32 py-10 sm:py-16 md:py-24">
            <div className="mx-auto max-w-screen-xl">
              <div className="flex flex-col gap-4">
                <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl mb-12 text-center">
                  Frequently Asked Questions
                </h2>
                <div className="">
                  <details className="group scroll-mt-24">
                    <summary className="flex w-full px-4 py-6 justify-between items-center border-t-2 border-[#4E4E6C] text-left text-lg font-medium focus:outline-none cursor-pointer">
                      <h3 className="pr-2 text-xl font-semibold w-[95%]">What is Referr, and how does it work for creators?</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#B8B8C8" className="transform transition-transform duration-300 group-open:rotate-180 h-5 w-5 stroke-[2px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </summary>
                    <div className="rounded-b-lg px-4 pb-6 font-medium text-black">
                      <p>Referr is a platform designed to help creators easily partner with brands, generate trackable links, and monetize their content. It simplifies affiliate marketing with built-in tools for link generation, performance tracking, and direct payouts.</p>
                    </div>
                  </details>

                  <details className="group scroll-mt-24">
                    <summary className="flex w-full px-4 py-6 justify-between items-center border-t-2 border-[#4E4E6C] text-left text-lg font-medium focus:outline-none cursor-pointer">
                      <h3 className="pr-2 text-xl font-semibold w-[95%]">How does Referr support audience monetization?</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#B8B8C8" className="transform transition-transform duration-300 group-open:rotate-180 h-5 w-5 stroke-[2px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </summary>
                    <div className="rounded-b-lg px-4 pb-6 font-medium text-black">
                      <p>We support your monetization efforts by connecting you with high-paying brands, providing instant link generation, and offering transparent payouts so you can focus on creating.</p>
                    </div>
                  </details>

                  <details className="group scroll-mt-24">
                    <summary className="flex w-full px-4 py-6 justify-between items-center border-t-2 border-[#4E4E6C] text-left text-lg font-medium focus:outline-none cursor-pointer">
                      <h3 className="pr-2 text-xl font-semibold w-[95%]">How does Referr help with performance tracking?</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#B8B8C8" className="transform transition-transform duration-300 group-open:rotate-180 h-5 w-5 stroke-[2px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </summary>
                    <div className="rounded-b-lg px-4 pb-6 font-medium text-black">
                      <p>We provide real-time reporting on clicks, conversions, and revenue, helping you optimize your promotional strategy based on data-driven insights.</p>
                    </div>
                  </details>

                  <details className="group scroll-mt-24">
                    <summary className="flex w-full px-4 py-6 justify-between items-center border-t-2 border-[#4E4E6C] text-left text-lg font-medium focus:outline-none cursor-pointer">
                      <h3 className="pr-2 text-xl font-semibold w-[95%]">Can I integrate Referr with other tools I use?</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#B8B8C8" className="transform transition-transform duration-300 group-open:rotate-180 h-5 w-5 stroke-[2px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </summary>
                    <div className="rounded-b-lg px-4 pb-6 font-medium text-black">
                      <p>Yes, you can easily share your generated links across all your platforms: YouTube, Instagram, TikTok, newsletters, and more.</p>
                    </div>
                  </details>

                  <details className="group scroll-mt-24">
                    <summary className="flex w-full px-4 py-6 justify-between items-center border-t-2 border-[#4E4E6C] border-b-2 text-left text-lg font-medium focus:outline-none cursor-pointer">
                      <h3 className="pr-2 text-xl font-semibold w-[95%]">How secure are my payouts with Referr?</h3>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#B8B8C8" className="transform transition-transform duration-300 group-open:rotate-180 h-5 w-5 stroke-[2px]">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                      </svg>
                    </summary>
                    <div className="rounded-b-lg px-4 pb-6 pt-6 font-medium text-black border-b-2 border-[#4E4E6C]">
                      <p>We prioritize data security and use industry-standard payment processors like Stripe to ensure your payouts are secure and delivered on time.</p>
                    </div>
                  </details>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#3843D0] text-[#FFFFFF] border-b-2 border-[#3843D0]" style={{ backgroundImage: "url(https://media.beehiiv.com/www/prismic-components/hexagon+gradient.png)" }}>
          <div className="px-5 md:px-8 xl:px-32 py-10 sm:py-16 md:py-24">
            <div className="mx-auto max-w-screen-xl">
              <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
                <img alt="start your free trial today, rockets" loading="lazy" width="200" height="200" decoding="async" className="mb-4 max-w-[200px]" src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=640,quality=75/www/boosts-promo-2x/rockets.svg" />
                <div className="flex flex-col gap-4">
                  <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl mx-auto max-w-xl">
                    START EARNING TODAY
                  </h2>
                  <p className="text-xl md:text-2xl font-medium max-w-2xl mx-auto">
                    Join thousands of creators, brands, and media companies using Referr to grow their audience.
                  </p>
                </div>
                <Link to="/signup" className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]">
                  <div className="text-white bg-[#2F39BA] border-white border rounded-[6px] text-base lg:text-lg font-bold leading-6 py-2 px-6 inline-flex items-center gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">
                    Start Earning
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                    </svg>
                  </div>
                  <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                  <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />

      <div className="bg-[#050505] py-4 sm:py-9">
        <section className="ticker gap-[40px]">
          <div className="ticker-image-container duration-[200s] gap-[40px] animate-ticker-left">
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
          </div>
          <div className="ticker-image-container duration-[200s] gap-[40px] animate-ticker-left">
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
            <div><span className="whitespace-nowrap clash-grotesk-font-family mx-auto max-w-4xl text-left text-xl uppercase md:text-3xl lg:text-6xl gradient-text">the one place to build</span></div>
          </div>
        </section>
      </div>
    </div>
  );
}
