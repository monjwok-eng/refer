import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FeaturesTicker } from "./FeaturesTicker";
import { MeetSection } from "./MeetSection";
import {
  LayoutTemplate,
  Megaphone,
  LineChart,
  Wallet,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  CreditCard,
  Shield,
  Award,
  Users,
  Star,
  Sparkles,
  Copy,
  ThumbsUp,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import FAQSection from "./FAQSection";
import ReadyToBuildSection from "./ReadyToBuildSection";
import TrustedBySection from "./TrustedBySection";
import DashboardShowcase from "./DashboardShowcase";
// @ts-ignore
import websiteBuilderImage from "../assets/images/website_builder_mock_1780153020304.png";
// @ts-ignore
import adNetworkImage from "../assets/images/ad_network_mock_1780154686892.png";

export default function BrandLandingPage() {
  const [demoScore, setDemoScore] = useState(8);
  const [activeTab, setActiveTab] = useState<"creators" | "benefits">("creators");

  const activeColor = demoScore >= 8 ? "rgb(29, 191, 115)" : demoScore >= 5 ? "rgb(249, 115, 22)" : "rgb(232, 31, 28)";
  const activeShadow = demoScore >= 8 
    ? "rgba(29, 191, 115, 0.65) 0px 0px 26.3228px 0px" 
    : demoScore >= 5 
    ? "rgba(249, 115, 22, 0.65) 0px 0px 26.3228px 0px" 
    : "rgba(232, 31, 28, 0.65) 0px 0px 26.3228px 0px";
  
  const activeBadgeBorderColor = demoScore >= 8 ? "rgb(20, 175, 105)" : demoScore >= 5 ? "rgb(240, 100, 20)" : "rgb(250, 83, 45)";
  const activeBadgeBgColor = demoScore >= 8 ? "rgb(29, 191, 115)" : demoScore >= 5 ? "rgb(249, 115, 22)" : "rgb(255, 84, 46)";
  const activeBadgeLabel = demoScore >= 8 ? "Trusted" : demoScore >= 5 ? "Growing" : "Untrusted";

  const cursorRotation = (demoScore - 5.5) * 23;
  
  const outerBoxShadows = demoScore >= 8 
    ? "rgba(0, 0, 0, 0.13) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.11) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.05) 0px 10px 10px -3.75px, rgba(247, 247, 247, 0.4) 0px 0px 0px 4px, rgba(29, 191, 115, 0.72) 0px 0.602187px 0.602187px -1.25px, rgba(29, 191, 115, 0.64) 0px 2.28853px 2.28853px -2.5px, rgba(29, 191, 115, 0.25) 0px 10px 10px -3.75px, rgba(0, 0, 0, 0.11) 0px -2px 16px 0px"
    : demoScore >= 5
    ? "rgba(0, 0, 0, 0.13) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.11) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.05) 0px 10px 10px -3.75px, rgba(247, 247, 247, 0.4) 0px 0px 0px 4px, rgba(249, 115, 22, 0.72) 0px 0.602187px 0.602187px -1.25px, rgba(249, 115, 22, 0.64) 0px 2.28853px 2.28853px -2.5px, rgba(249, 115, 22, 0.25) 0px 10px 10px -3.75px, rgba(0, 0, 0, 0.11) 0px -2px 16px 0px"
    : "rgba(0, 0, 0, 0.13) 0px 0.602187px 0.602187px -1.25px, rgba(0, 0, 0, 0.11) 0px 2.28853px 2.28853px -2.5px, rgba(0, 0, 0, 0.05) 0px 10px 10px -3.75px, rgba(247, 247, 247, 0.4) 0px 0px 0px 4px, rgba(232, 31, 28, 0.72) 0px 0.602187px 0.602187px -1.25px, rgba(232, 31, 28, 0.64) 0px 2.28853px 2.28853px -2.5px, rgba(232, 31, 28, 0.25) 0px 10px 10px -3.75px, rgba(0, 0, 0, 0.11) 0px -2px 16px 0px";

  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <Navbar />

      <main>
        {/* Responsive 2-Column Hero Section */}
        <section className="relative px-5 md:px-8 xl:px-16 py-10 sm:py-16 md:py-24 bg-[#050505] overflow-hidden mt-[-20px]">
          {/* Subtle background glows to augment visual depth */}
          <div className="absolute top-1/4 right-[10%] w-[500px] h-[500px] bg-purple-500/5 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-1/4 left-[10%] w-[400px] h-[400px] bg-[#ff6a00]/5 blur-[120px] rounded-full pointer-events-none" />

          <div className="mx-auto max-w-[1400px] relative z-10">
            {/* The Toggle (Beehiiv Style / For Brands active) */}
            <div className="flex justify-center w-full mb-10 md:mb-14">
              <div className="bg-[#1A1A1E] p-1.5 flex items-center rounded-full border border-white/10 shadow-inner">
                <Link to="/" className="text-white/50 hover:text-white px-6 py-2.5 rounded-full font-extrabold text-[12px] tracking-widest uppercase transition-colors flex items-center gap-2">
                  For Creators
                </Link>
                <div className="bg-white text-black px-6 py-2.5 rounded-full font-extrabold text-[12px] tracking-widest uppercase shadow-sm flex items-center gap-2">
                  For Brands
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 items-center gap-10 lg:gap-20 min-[890px]:grid-cols-[1.15fr_0.85fr]">
              
              {/* Left Column: Headline, Description & CTAs */}
              <div className="flex flex-col items-start text-white text-left lg:max-w-2xl xl:max-w-3xl">
                <h1 className="mb-4 text-[42px] font-black uppercase tracking-tight leading-[44px] sm:text-5xl sm:leading-[52px] md:text-[50px] md:leading-[54px] lg:text-[60px] lg:leading-[64px] xl:text-[70px] xl:leading-[74px] lg:mb-6">
                  POWERING THE INTERNET'S BEST{" "}
                  <span className="bg-gradient-to-r from-[#FFDCFF] to-[#FF5EC4] bg-clip-text text-transparent inline-block">
                    REFERRALS
                  </span>
                </h1>
                
                <p className="mb-6 text-lg sm:text-xl font-medium text-gray-300/90 leading-relaxed lg:mb-8">
                  The all-in-one platform that brings together rewards, tracking, and every tool you need to grow and earn through referrals.
                </p>

                {/* Rating & Social Proof */}
                <div className="flex flex-row items-center flex-wrap gap-2.5 sm:gap-4 mb-8">
                  <div className="flex items-center gap-0.5 sm:gap-1 text-[#FCD34D]">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-[14px] h-[14px] sm:w-4 sm:h-[15px]">
                        <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.857 1.4-8.168L.132 9.21l8.2-1.192z"/>
                      </svg>
                    ))}
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex -space-x-1 sm:-space-x-1.5">
                      <img 
                        alt="user avatar" 
                        src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=96,quality=75/www/homepage/hero-images/social-proof/jessica.jpg" 
                        className="h-[22px] w-[22px] sm:h-6 sm:w-6 rounded-full border border-[#050505] object-cover" 
                      />
                      <img 
                        alt="user avatar" 
                        src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=96,quality=75/www/homepage/hero-images/social-proof/kaitarford.jpg" 
                        className="h-[22px] w-[22px] sm:h-6 sm:w-6 rounded-full border border-[#050505] object-cover" 
                      />
                      <img 
                        alt="user avatar" 
                        src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=96,quality=75/www/homepage/hero-images/social-proof/shaan.jpg" 
                        className="h-[22px] w-[22px] sm:h-6 sm:w-6 rounded-full border border-[#050505] object-cover" 
                      />
                    </div>
                    <span className="text-[12px] sm:text-sm font-normal text-gray-300">
                      <strong className="text-white font-bold">4.9/5</strong> from <strong className="text-white font-bold">28k</strong> partners
                    </span>
                  </div>
                </div>

                {/* Interactive Google & Email Signup Buttons */}
                <div className="mt-6 flex w-full flex-col gap-4 min-[890px]:flex-row min-[890px]:gap-4">
                  <button className="custom-box-shadow-button relative flex cursor-pointer justify-center w-full min-[890px]:w-auto bg-transparent border-none outline-none p-0 select-none">
                    <div className="text-white bg-[#2F39BA] hover:bg-[#3d48cf] border-[#2F39BA] border rounded-[6px] text-base lg:text-lg font-bold leading-6 h-[58px] px-6 inline-flex items-center justify-center gap-3 whitespace-nowrap w-full text-center custom-box-shadow-text relative z-10">
                      <span className="flex shrink-0 items-center justify-center rounded-sm bg-white p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" className="h-4 w-4">
                          <path d="M975.28 510.79c0-35.14-3.15-68.92-9.01-101.36H499.59V601.1h266.67c-11.49 61.94-46.39 114.42-98.87 149.55v124.33h160.14c93.7-86.26 147.75-213.3 147.75-364.2Z" fill="#557ebf" />
                          <path d="M499.6 995.03c133.79 0 245.95-44.37 327.93-120.05L667.39 750.65c-44.37 29.73-101.13 47.3-167.79 47.3-129.06 0-238.29-87.16-277.26-204.28H56.79v128.38c81.54 161.94 249.11 272.98 442.8 272.98Z" fill="#36a852" />
                          <path d="M222.34 593.67c-9.91-29.73-15.54-61.49-15.54-94.15s5.63-64.42 15.54-94.15V276.99H56.79c-33.55 66.9-52.7 142.58-52.7 222.54s19.15 155.63 52.7 222.53l165.54-128.38Z" fill="#f9bc15" />
                          <path d="M499.6 201.1c72.75 0 138.06 25 189.42 74.1l142.12-142.12C745.32 53.12 633.15 4.02 499.6 4.02 305.9 4.02 138.33 115.06 56.8 277l165.54 128.38C261.31 288.26 370.54 201.1 499.6 201.1Z" fill="#e94435" />
                        </svg>
                      </span>
                      <span>Sign up with Google</span>
                    </div>
                    <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A] z-0"></div>
                    <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A] z-0"></div>
                  </button>
                  
                  <Link 
                    to="/signin" 
                    className="custom-box-shadow-button relative flex cursor-pointer justify-center w-full min-[890px]:w-auto select-none p-0 outline-none border-none bg-transparent"
                  >
                    <div className="text-white bg-[#131125] hover:bg-[#1C1A35] hover:border-white border-[#FCFCFD]/60 border rounded-[6px] text-base lg:text-lg font-bold leading-6 h-[58px] px-8 whitespace-nowrap w-full flex items-center justify-center text-center custom-box-shadow-text relative z-10">
                      Sign up with email
                    </div>
                    <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A] z-0"></div>
                    <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A] z-0"></div>
                  </Link>
                </div>

                <p className="mt-4 text-xs text-gray-400">Get started for free. No credit card required.</p>
              </div>

              {/* Right Column: Dashboard Showcase Image (No surrounding container or border styles) */}
              <div className="relative block w-full justify-center">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="w-full h-auto"
                >
                  <img
                    alt="Referr Dashboard Showcase"
                    width="1768"
                    height="1374"
                    decoding="async"
                    className="w-full h-auto object-cover block 2xl:scale-125"
                    style={{ color: "transparent" }}
                    srcSet="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=1920,quality=75/www/homepage/hero-images/ab-test/hero-1.png 1x, https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=3840,quality=75/www/homepage/hero-images/ab-test/hero-1.png 2x"
                    src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=3840,quality=75/www/homepage/hero-images/ab-test/hero-1.png"
                    data-cmp-ab="2"
                    data-cmp-info="10"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              </div>

            </div>
          </div>
        </section>

        {/* Trusted By Section (With beautiful alignment right next to Showcase) */}
        <TrustedBySection />

        {/* Categories Section */}
        <section id="categories" className="py-16 bg-[#050505] border-y border-[#4E4E6C]/20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
            <h2 className="text-[28px] sm:text-[32px] md:text-[40px] font-black text-white mb-10 clash-grotesk-font-family tracking-tight text-center md:text-left uppercase">
              Top professional categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
              {[
                "Graphic Design",
                "Digital Marketing",
                "Writing & Translation",
                "Video & Animation",
                "Music & Audio",
                "Programming & Tech",
                "Business",
                "Lifestyle",
                "Data",
                "Photography",
              ].map((cat) => (
                <div
                  key={cat}
                  className="bg-white/5 p-3.5 sm:p-5 md:p-6 border border-[#4E4E6C] hover:border-[#F092DD] transition cursor-pointer rounded-[4px] group shadow-sm hover:shadow-md flex items-center justify-center text-center min-h-[90px] sm:min-h-auto"
                >
                  <span className="font-bold text-[12px] md:text-[13px] text-[#D6D6E0] font-display group-hover:text-white transition-colors uppercase tracking-widest line-clamp-2 md:line-clamp-none">
                    {cat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Director Section */}
        <section id="trust" className="py-24 bg-[#050505] border-y border-[#4E4E6C]/20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="bg-black/40 border border-[#4E4E6C]/30 rounded-[20px] overflow-hidden flex flex-col lg:flex-row items-center shadow-2xl">
              <div className="p-8 md:p-12 lg:p-20 flex-1">
                <h2 className="text-[36px] md:text-[56px] font-black text-white mb-8 leading-[0.95] tracking-tighter clash-grotesk-font-family uppercase italic">
                  Hiring built <br/> on trust
                </h2>
                <p className="text-[18px] md:text-[20px] text-[#D6D6E0] mb-10 leading-relaxed max-w-xl font-medium">
                  Connect with professionals who come recommended by the people
                  you already trust. Our peer-to-peer verification ledger ensures every referral is backed by real reputation.
                </p>
                <div className="flex flex-wrap gap-6 items-center">
                  <Link
                    to="/how-it-works"
                    className="text-white font-black text-[14px] uppercase tracking-widest hover:text-[#F092DD] transition-all border-b-2 border-white/10 hover:border-[#F092DD] pb-1 clash-grotesk-font-family"
                  >
                    How Referrals Work
                  </Link>
                </div>
              </div>
              <div className="flex-1 w-full lg:w-1/2 group relative aspect-video lg:aspect-auto self-stretch overflow-hidden">
                <video
                  className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster="https://fiverr-res.cloudinary.com/video/upload/so_0,f_jpg,q_auto,w_1920,c_limit/v1/video-attachments/generic_asset/asset/14957b0be6378e1fd212193f81962000-1774365803723/all%20directors%20for%20gif%20fixed"
                >
                  <source
                    src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd_nl/v1/video-attachments/generic_asset/asset/14957b0be6378e1fd212193f81962000-1774365803723/all%20directors%20for%20gif%20fixed"
                    type="video/mp4"
                  />
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Website Builder Section */}
        <section id="website-builder" className="py-24 bg-[#050505] border-b border-[#4E4E6C]/20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col gap-6 items-start justify-between sm:flex-row sm:items-end">
              <div className="flex flex-col gap-4">
                <span className="text-base md:text-lg font-medium text-accent-pink font-bold">
                  Website Builder
                </span>
                <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl text-white">
                  NO CODE. NO LIMITS.
                </h2>
                <p className="text-lg md:text-xl font-medium text-[#D6D6E0] max-w-xl">
                  Our no-code website builder can give you a world-class website in minutes, not months. No design skills required.
                </p>
              </div>
              <Link
                to="/onboarding"
                className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"
              >
                <div className="text-white bg-[#2F39BA] border-[#2F39BA] border rounded-[6px] text-base lg:text-lg font-bold leading-6 py-2 px-6 inline-flex items-center gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">
                  Start building →
                </div>
                <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
              </Link>
            </div>
            
            {/* Website Builder Mockup Image */}
            <div className="mt-16 w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-4xl rounded-[12px] md:rounded-[24px] overflow-hidden border border-[#4E4E6C]/30"
                style={{
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), 0 0 40px rgba(47, 57, 186, 0.15)"
                }}
              >
                <img
                  src={websiteBuilderImage}
                  alt="Referr Website Builder Interface"
                  className="w-full h-auto block object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Ad Network Section */}
        <section id="ad-network" className="py-24 bg-[#050505] border-b border-[#4E4E6C]/20">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8">
            <div className="flex flex-col gap-6 items-start justify-between sm:flex-row sm:items-end">
              <div className="flex flex-col gap-4">
                <span className="text-base md:text-lg font-medium text-accent-pink font-bold">
                  Ad Network
                </span>
                <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl text-white">
                  Post ads anywhere
                </h2>
                <p className="text-lg md:text-xl font-medium max-w-xl text-[#D6D6E0]">
                  Effortlessly launch campaigns across Meta, TikTok, YouTube, and other platforms directly from your dashboard.
                </p>
              </div>
              <a href="https://app.beehiiv.com/signup" className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"> 
                <div className="text-white bg-[#2F39BA] border-[#2F39BA] border rounded-[6px] text-base lg:text-lg font-bold leading-6 py-2 px-6 inline-flex items-center gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">
                  Start advertising →
                </div>
                <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
              </a>
            </div>
            
            {/* Ad Network Mockup Image */}
            <div className="mt-16 w-full flex justify-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full max-w-4xl rounded-[12px] md:rounded-[24px] overflow-hidden border border-[#4E4E6C]/30"
                style={{
                  boxShadow: "0 20px 40px -10px rgba(0,0,0,0.8), 0 0 40px rgba(47, 57, 186, 0.15)"
                }}
              >
                <img
                  src={adNetworkImage}
                  alt="Referr Ad Network Interface"
                  className="w-full h-auto block object-cover"
                  referrerPolicy="no-referrer"
                />
              </motion.div>
            </div>
          </div>
        </section>


        {/* Meet Section */}
        <MeetSection />

        {/* For Businesses Section */}
        <section id="business" className="px-5 md:px-8 xl:px-32 py-10 sm:py-16 md:py-24 bg-[#050505] border-t border-[#4E4E6C]/20">
          <div className="mx-auto max-w-screen-xl">
          <div className="flex flex-col items-center gap-6">
            <span className="text-[12px] font-black text-[#F092DD] uppercase tracking-[0.2em] mb-2 px-4 py-1.5 border border-[#F092DD]/30 rounded-full bg-[#F092DD]/5">
              The one place to build
            </span>
            <h2 className="clash-grotesk-font-family uppercase font-black text-4xl md:text-6xl text-center text-white tracking-tight leading-none">
              BUILD YOUR CONTENT <br /> YOUR WAY
            </h2>
            <p className="text-lg md:text-xl font-medium max-w-2xl text-center text-[#D6D6E0] font-display">
              Our plans give you the tools and flexibility to create the best
              content of your career.
            </p>
            <Link
              to="/onboarding"
              className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"
            >
              <div className="text-white bg-[#131125] border-[#FCFCFD] border rounded-[6px] text-base lg:text-lg font-bold leading-6 py-2 px-6 inline-flex items-center gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">
                Find the best plan for you
                <ChevronRight size={20} className="ml-1" />
              </div>
              <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
              <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
            </Link>
          </div>
            
            <div>
              <div className="mt-16 grid gap-4 md:grid-cols-3">
                <div className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 shadow-md hover:border-white/20 transition-all">
                  <p className="text-2xl font-semibold text-white">Launch</p>
                  <div className="mt-4 border-y border-white/10 py-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-white/60">Starting at </span>
                      <span className="text-3xl font-bold text-white">$0</span>
                    </div>
                  </div>
                  <div className="mb-6 mt-6 flex-1">
                    <h3 className="text-md mb-2 hidden font-semibold md:block text-white">What's included...</h3>
                    <ul className={`${activeAccordion === 'launch' ? 'grid' : 'hidden'} gap-2 md:grid transition-all duration-300`}>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Ecommerce, Website, and Podcast</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Campaign Analytics</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Unlimited Email Sends</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Recommendation Network</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Optimized Deliverability</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Custom Domains</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Link-in-Bio</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>AI Website Builder</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>API Access (excluding Send API)</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Referr MCP</span>
                      </li>
                    </ul>
                    <div className="md:hidden">
                      <button 
                        onClick={() => toggleAccordion('launch')}
                        className="flex w-full items-center justify-between py-2 text-left font-medium text-white" 
                        type="button"
                      >
                        <span className="font-bold">What's included...</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth="1.5" 
                          stroke="currentColor" 
                          className={`h-5 w-5 transition-transform duration-200 ${activeAccordion === 'launch' ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link to="/onboarding" className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"> 
                      <div className="text-white bg-[#131125] border-[#FCFCFD] border rounded-[6px] w-full border-2 !p-2 font-bold text-cyber-ink custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">Sign up for free</div>
                      <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                      <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 shadow-md hover:border-white/20 transition-all">
                  <p className="text-2xl font-semibold text-white">Scale</p>
                  <div className="mt-4 border-y border-white/10 py-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-white/60">Starting at </span>
                      <span className="text-3xl font-bold text-white">$43</span>
                    </div>
                  </div>
                  <div className="mb-6 mt-6 flex-1">
                    <h3 className="text-md mb-2 hidden font-semibold md:block text-white">Everything on Launch +</h3>
                    <ul className={`${activeAccordion === 'scale' ? 'grid' : 'hidden'} gap-2 md:grid transition-all duration-300`}>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Ad Network</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Boosts Network</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>0% Take Rate on Paid Subscriptions</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Digital Products</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Email Automations</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Surveys &amp; Polls</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Advanced Website Analytics</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Webhooks</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Teams (3 Seats)</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Slack Community Access</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Human Support</span>
                      </li>
                    </ul>
                    <div className="md:hidden">
                      <button 
                        onClick={() => toggleAccordion('scale')}
                        className="flex w-full items-center justify-between py-2 text-left font-medium text-white" 
                        type="button"
                      >
                        <span className="font-bold">Everything on Launch +</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth="1.5" 
                          stroke="currentColor" 
                          className={`h-5 w-5 transition-transform duration-200 ${activeAccordion === 'scale' ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link to="/onboarding" className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"> 
                      <div className="text-white bg-[#2F39BA] border-[#2F39BA] border rounded-[6px] w-full border-2 !p-2 font-bold text-cyber-ink custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">Try for free</div>
                      <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                      <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                    </Link>
                  </div>
                </div>

                <div className="flex flex-col rounded-lg border border-white/10 bg-white/5 p-6 shadow-md hover:border-white/20 transition-all">
                  <p className="text-2xl font-semibold text-white">Max</p>
                  <div className="mt-4 border-y border-white/10 py-4">
                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium text-white/60">Starting at </span>
                      <span className="text-3xl font-bold text-white">$96</span>
                    </div>
                  </div>
                  <div className="mb-6 mt-6 flex-1">
                    <h3 className="text-md mb-2 hidden font-semibold md:block text-white">Everything on Scale +</h3>
                    <ul className={`${activeAccordion === 'max' ? 'grid' : 'hidden'} gap-2 md:grid transition-all duration-300`}>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Remove Referr Branding</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Sponsorship Storefront</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Growth Automation</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Digital Products (Appointments)</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>RSS to Send</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Up to 10 Publications</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Teams (Unlimited Seats)</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Priority Human Support</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Getty Image Credits</span>
                      </li>
                      <li className="flex items-center font-medium text-[#D9DBDF]">
                        <span className="mr-2 h-2 w-2 rounded-full bg-[#D9DBDF]"></span>
                        <span>Dynamic Content</span>
                      </li>
                    </ul>
                    <div className="md:hidden">
                      <button 
                        onClick={() => toggleAccordion('max')}
                        className="flex w-full items-center justify-between py-2 text-left font-medium text-white" 
                        type="button"
                      >
                        <span className="font-bold">Everything on Scale +</span>
                        <svg 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          strokeWidth="1.5" 
                          stroke="currentColor" 
                          className={`h-5 w-5 transition-transform duration-200 ${activeAccordion === 'max' ? 'rotate-180' : ''}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5"></path>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <div className="mt-auto">
                    <Link to="/onboarding" className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"> 
                      <div className="text-white bg-[#2F39BA] border-[#2F39BA] border rounded-[6px] w-full border-2 !p-2 font-bold text-cyber-ink custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">Try for free</div>
                      <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                      <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 flex flex-col items-center rounded-md border border-[#15194F] p-4 font-bold md:flex-row md:justify-between">
                <p className="text-center text-xl sm:text-left text-white">More than 100,000 subscribers? </p>
                <Link to="/onboarding" className="mt-2 flex items-center gap-2 rounded-md px-4 py-2 text-xl text-[#FF5EC4] hover:bg-[#131125] hover:text-white transition-colors duration-200 md:mt-0 md:text-lg">
                  Contact Sales 
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="3" stroke="currentColor" className="h-4 w-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                  </svg>
                </Link>
              </div>
            </div>
            
            <div className="mt-20">
              <FeaturesTicker />
            </div>
          </div>
        </section>



        {/* Integrations Section */}
        <section className="bg-[#050505] text-white">
          <div className="px-5 md:px-8 xl:px-32 py-10 sm:py-16">
            <div className="mx-auto max-w-screen-xl">
              <div className="mb-12 flex flex-col items-center gap-6 lg:flex-row lg:items-end lg:justify-between">
                <div className="flex flex-col gap-4 items-center text-center lg:items-start lg:text-left">
                  <h2 className="clash-grotesk-font-family uppercase font-bold text-4xl md:text-5xl">CONNECT YOUR BUSINESS<br/>WITH THE TOOLS YOU LOVE</h2>
                  <p className="text-lg md:text-xl font-medium">Seamless integrations with analytics, e-commerce, and automation platforms.</p>
                </div>
                <div className="min-w-fit">
                  <Link to="/signup" className="custom-box-shadow-button relative flex cursor-pointer justify-center gap-[10px]"> 
                    <div className="text-white bg-[#2F39BA] border-[#2F39BA] border rounded-[6px] text-base lg:text-lg font-bold leading-6 py-2 px-6 inline-flex items-center gap-2 max-w-fit whitespace-nowrap custom-box-shadow-text relative z-10 flex h-full w-full items-center justify-center text-center">
                      Sign up for free
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" aria-hidden="true" className="h-4 w-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"></path>
                      </svg>
                    </div>
                    <div className="bg-[#F092DD] rounded-[6px] transform-style-preserve-3d custom-box-shadow-2 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                    <div className="bg-[#FFC8EB] rounded-[6px] transform-style-preserve-3d custom-box-shadow-1 absolute inset-0 h-full w-full border border-[#0B0D2A]"></div>
                  </Link>
                </div>
              </div>
              <img alt="" loading="lazy" width="1000" height="500" decoding="async" className="mb-16 w-full" style={{color: 'transparent'}} src="https://media.beehiiv.com/cdn-cgi/image/fit=scale-down,onerror=redirect,format=auto,width=2048,quality=75/www/homepage/integrations-dark.png" />
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="flex items-start gap-4 border-t-2 border-[#FF5EC4] py-4">
                  <div className="relative top-[3px] flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#FF5EC4" aria-hidden="true" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 0 1-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 0 0 6.16-12.12A14.98 14.98 0 0 0 9.631 8.41m5.96 5.96a14.926 14.926 0 0 1-5.841 2.58m-.119-8.54a6 6 0 0 0-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 0 0-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 0 1-2.448-2.448 14.9 14.9 0 0 1 .06-.312m-2.24 2.39a4.493 4.493 0 0 0-1.757 4.306 4.493 4.493 0 0 0 4.306-1.758M16.5 9a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path>
                    </svg>
                  </div>
                  <p className="text-left font-medium">Effortlessly connect with Stripe, Zapier, Google Analytics, and more.</p>
                </div>
                <div className="flex items-start gap-4 border-t-2 border-[#FF5EC4] py-4">
                  <div className="relative top-[3px] flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#FF5EC4" aria-hidden="true" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
                    </svg>
                  </div>
                  <p className="text-left font-medium">Enhance your workflow with AI-powered recommendations and segmentation.</p>
                </div>
                <div className="flex items-start gap-4 border-t-2 border-[#FF5EC4] py-4">
                  <div className="relative top-[3px] flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="#FF5EC4" aria-hidden="true" className="h-6 w-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"></path>
                    </svg>
                  </div>
                  <p className="text-left font-medium">Sync your subscribers with CRM and marketing automation platforms.</p>
                </div>
              </div>
            </div>
          </div>
        </section>


      </main>

      <FAQSection />
      <ReadyToBuildSection />

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
