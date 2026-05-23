import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  LayoutTemplate,
  Megaphone,
  LineChart,
  Wallet,
  ChevronRight,
  ChevronDown,
  CheckCircle,
  CreditCard,
} from "lucide-react";
import { motion } from "motion/react";
import Footer from "./Footer";
import Navbar from "./Navbar";
import FAQSection from "./FAQSection";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />

      <main>
        {/* Hero Section */}
        <section className="relative pt-12 pb-16 px-4 md:px-6 min-h-[680px] flex flex-col justify-start overflow-hidden">
          <video
            src="https://acquisition-ui-assets.static-upwork.com/brontes/canopy/hero-video-lg.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          ></video>
          <div className="absolute inset-0 bg-slate-950/50"></div>

          <div className="w-full relative z-10 flex flex-col justify-start px-2 md:px-4 ml-0 pt-20 md:pt-32">
            <div className="mb-8 font-display">
              <h1
                className="text-[40px] md:text-[60px] text-white font-bold leading-[1.1] tracking-tight text-left"
              >
                Hire top talent, or earn <br /> by referring your network
              </h1>
            </div>

            <div className="w-full max-w-[1100px] bg-white shadow-xl flex flex-col md:flex-row items-center mb-10 overflow-hidden rounded-[8px] p-1.5 gap-2 md:gap-0">
              <div className="flex-1 flex items-center px-2 md:px-4 w-full">
                <input
                  type="search"
                  placeholder="Who in your network would you refer for a job?"
                  className="w-full py-3 text-[14px] md:text-[17px] outline-none text-[#404145] placeholder:text-[#95979d] font-display"
                />
              </div>
              <Link
                to="/onboarding"
                className="bg-[#1dbf73] text-white w-full md:w-[54px] h-[48px] rounded-[6px] flex items-center justify-center hover:bg-[#19a463] transition cursor-pointer font-bold md:font-normal"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
                </svg>
              </Link>
            </div>

            <div className="flex items-center gap-2.5 text-white overflow-x-auto no-scrollbar pb-2">
              {[
                { name: "Endorse a Web Developer", to: "/services/web" },
                { name: "Vouch for a Designer", to: "/services/design" },
                { name: "Back a Growth Marketer", to: "/services/marketing" },
                { name: "Refer a Video Editor", to: "/services/video" },
                { name: "Recommend an AI Expert", to: "/services/ai" },
              ].map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-[4px] px-5 py-2 hover:bg-white/20 transition-all text-[14.5px] font-bold font-display group whitespace-nowrap shrink-0"
                >
                  {item.name}
                  <ChevronRight
                    size={15}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </Link>
              ))}
            </div>
          </div>

          {/* Trusted By Overlay */}
          <div className="absolute bottom-8 left-0 z-10 hidden md:flex w-full px-12 justify-start">
            <div className="flex items-center gap-8">
              <p className="text-white text-[16px] font-medium leading-none">
                Trusted by:
              </p>
              <div className="flex items-center gap-6">
                <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">
                  Meta
                </span>
                <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">
                  Stanbic
                </span>
                <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">
                  Centenary
                </span>
                <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">
                  Jumia
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section id="categories" className="py-16 bg-slate-50">
          <div className="max-w-[1400px] mx-auto px-8">
            <h2 className="text-[28px] md:text-[32px] font-bold text-[#404145] mb-8 font-display tracking-tight">
              Top referred professional services
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
                  className="bg-white p-6 border border-slate-200 hover:border-[#1dbf73] transition cursor-pointer rounded-[4px] group shadow-sm hover:shadow-md"
                >
                  <span className="font-bold text-[16px] text-[#404145] font-display group-hover:text-[#1dbf73] transition-colors">
                    {cat}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Director Section */}
        <section id="trust" className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="bg-black rounded-[12px] overflow-hidden flex flex-col lg:flex-row items-center">
              <div className="p-6 md:p-10 lg:p-16 flex-1">
                <h2 className="text-[28px] md:text-[40px] font-bold text-white mb-4 leading-tight tracking-tight font-display">
                  Hiring built on trust
                </h2>
                <p className="text-base text-white/80 mb-8 leading-relaxed max-w-xl font-display font-light">
                  Connect with professionals who come recommended by the people
                  you already trust.
                </p>
                <Link
                  to="/how-it-works"
                  className="inline-block bg-[#1dbf73] text-white font-bold px-7 py-3.5 rounded-[4px] hover:bg-[#19a463] transition-all font-display text-[15px] shadow-md active:scale-95 w-full sm:w-auto text-center"
                >
                  How Referrals Work
                </Link>
              </div>
              <div className="flex-1 w-full lg:w-1/2 group relative aspect-video lg:aspect-auto self-stretch">
                <video
                  className="absolute inset-0 w-full h-full object-cover"
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
              </div>
            </div>
          </div>
        </section>

        {/* Start Simple Section */}
        <section id="start-simple" className="py-24 bg-white">
          <div className="max-w-[720px] mx-auto px-6 flex flex-col items-center text-center">
            <span className="px-5 py-1.5 rounded-full border border-slate-200 text-slate-600 text-[13px] font-medium mb-10">
              For businesses and professionals
            </span>
            
            <h2 className="text-[32px] md:text-[48px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-8 font-display">
              Refer. Hire. <br className="hidden md:block" /> Grow together.
            </h2>
            
            <div className="space-y-8 text-lg font-display text-slate-800 leading-[1.6]">
              <p>
                Businesses join Referr to find verified talent. Professionals join for {" "}
                <Link to="/onboarding" className="text-[#1dbf73] font-bold hover:underline">a simple way to earn money online</Link> {" "}
                by referring their network.
              </p>
              
              <p className="font-semibold text-slate-900 border-l-4 border-[#1dbf73] pl-6 py-2 bg-slate-50">
                The perfect ecosystem for quality work.
              </p>
              
              <p>
                Whether you are looking to hire the perfect candidate, or you have a strong professional network you want to monetize, Referr makes the connection seamless and rewarding for everyone involved.
              </p>
              
              <p>
                Every successful connection moves you forward.
              </p>
            </div>
            
            <div className="mt-12 flex flex-col sm:flex-row items-center gap-4">
              <Link 
                to="/onboarding" 
                className="bg-[#1dbf73] text-white font-bold px-8 py-3.5 rounded-[4px] hover:bg-[#19a463] transition-all text-[16px] shadow-lg shadow-[#1dbf73]/10 active:scale-95 uppercase tracking-wide font-display w-full sm:w-auto"
              >
                Hire Talent
              </Link>
              <Link 
                to="/onboarding" 
                className="bg-white text-[#1dbf73] border-2 border-[#1dbf73] font-bold px-8 py-3.5 rounded-[4px] hover:bg-slate-50 transition-all text-[16px] shadow-sm active:scale-95 uppercase tracking-wide font-display w-full sm:w-auto"
              >
                Start Referring
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section id="community" className="py-16 bg-white border-b border-slate-200">
          <div className="max-w-[1400px] mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6 md:gap-10">
              <div className="text-center md:text-left md:max-w-xs">
                <h2 className="text-[28px] md:text-[32px] font-bold text-[#404145] tracking-tight mb-3 font-display">
                  A community built on backing
                </h2>
                <p className="text-[16px] text-[#74767e] font-display">
                  Join thousands of professionals who grow their careers through
                  quality referrals.
                </p>
              </div>

              <div className="flex flex-wrap justify-center md:justify-end gap-6 md:gap-10 lg:gap-16 flex-1">
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-[40px] md:text-[52px] font-bold text-[#404145] tracking-tighter leading-none mb-1 font-display">
                    10M+
                  </span>
                  <span className="text-[13px] text-[#74767e] font-bold font-display uppercase tracking-widest">
                    Companies Helped
                  </span>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-[40px] md:text-[52px] font-bold text-[#404145] tracking-tighter leading-none mb-1 font-display">
                    120+
                  </span>
                  <span className="text-[13px] text-[#74767e] font-bold font-display uppercase tracking-widest">
                    Countries
                  </span>
                </div>
                <div className="flex flex-col items-center md:items-start text-center md:text-left">
                  <span className="text-[40px] md:text-[52px] font-bold text-[#404145] tracking-tighter leading-none mb-1 font-display">
                    $2B+
                  </span>
                  <span className="text-[13px] text-[#74767e] font-bold font-display uppercase tracking-widest">
                    Earned
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories Section */}
        <section id="success" className="py-16 bg-white border-t border-slate-50">
          <div className="max-w-[1400px] mx-auto px-6">
            <div className="flex flex-col gap-6 items-center text-center max-w-4xl mx-auto">
              <div>
                <h2 className="text-[28px] md:text-[36px] font-bold text-slate-900 leading-[1.1] tracking-tight mb-3 font-display">
                  What success on Referr looks like
                </h2>
                <p className="text-base text-slate-600 font-display">
                  Vontélle Eyewear turns to Referr experts to bring their vision to life.
                </p>
              </div>
              
              <div className="relative w-full aspect-video rounded-[8px] overflow-hidden shadow-xl bg-slate-100">
                <video 
                  className="w-full h-full object-cover"
                  autoPlay
                  controls
                  muted
                  loop
                  playsInline
                  poster="https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto/v1/attachments/generic_asset/asset/ef51b45f79342925d5268e0b2377eae8-1704717764992/thumbnail.png"
                  crossOrigin="anonymous"
                >
                  <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd/v1/video-attachments/generic_asset/asset/4934b0c8f6441211d97f83585a7c9c00-1722433273322/Vontelle%20Cutdown-%20Breakthrough%20V5" type="video/mp4" />
                </video>
              </div>
            </div>
          </div>
        </section>

        {/* For Businesses Section */}
        <section id="business" className="py-16 md:py-24 bg-[#0c2a1c] border-y border-[#0c2a1c]">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
              
              {/* Left Side: Value Props */}
              <div className="flex-1 w-full text-center lg:text-left flex flex-col items-center lg:items-start text-white">
                <span className="font-semibold text-[20px] mb-6 font-display flex items-center gap-2">
                  <span className="font-display font-black text-white/90 tracking-tight">referr</span>{" "}
                  <span className="font-serif italic text-white font-light tracking-wide px-3 py-1 rounded-[100px] border border-white/40">pro.</span>
                </span>
                
                <h2 className="text-[28px] md:text-[40px] lg:text-[44px] font-bold text-white leading-[1.1] md:leading-[1.05] tracking-tight mb-6 font-display">
                  Premium solutions for <br className="hidden md:block" /> scaling your business
                </h2>
                
                <ul className="space-y-4 md:space-y-6 w-full font-display mt-6">
                  <li className="flex items-start gap-3 text-white">
                    <CheckCircle size={24} className="text-white shrink-0 fill-transparent mt-1 opacity-90" strokeWidth={1.5} />
                    <div className="flex flex-col text-left">
                      <span className="text-[16px] md:text-[20px] font-bold text-white">Dedicated AI Agent Builder</span>
                      <span className="text-[14px] md:text-[16px] text-white/80 mt-1 leading-relaxed max-w-md">Create and launch a professional website instantly without writing a single line of code.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <CheckCircle size={24} className="text-white shrink-0 fill-transparent mt-1 opacity-90" strokeWidth={1.5} />
                    <div className="flex flex-col text-left">
                      <span className="text-[16px] md:text-[20px] font-bold text-white">Exclusive verified network</span>
                      <span className="text-[14px] md:text-[16px] text-white/80 mt-1 leading-relaxed max-w-md">Connect exclusively with the highest-rated professionals and top-tier talent.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3 text-white">
                    <CheckCircle size={24} className="text-white shrink-0 fill-transparent mt-1 opacity-90" strokeWidth={1.5} />
                    <div className="flex flex-col text-left">
                      <span className="text-[16px] md:text-[20px] font-bold text-white">Advanced referral routing</span>
                      <span className="text-[14px] md:text-[16px] text-white/80 mt-1 leading-relaxed max-w-md">Automate payouts and track incoming candidates across your entire hiring pipeline.</span>
                    </div>
                  </li>
                </ul>
              </div>
              
              {/* Right Side: Pricing Card */}
              <div className="w-full lg:w-[400px] shrink-0">
                <div className="bg-white rounded-[8px] p-6 md:p-8 flex flex-col shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1.5 bg-[#1dbf73]"></div>
                  <div className="flex items-start justify-between mb-6 pb-6 border-b border-[#e4e5e7]">
                     <div>
                       <h4 className="text-[20px] md:text-[22px] font-bold text-[#222325] mb-2 font-display">Referr Pro</h4>
                       <span className="text-[12px] md:text-[13px] font-semibold text-[#1dbf73] uppercase tracking-wider flex items-center gap-1.5">
                         <span className="w-2 h-2 rounded-full bg-[#1dbf73]"></span> 7-day free trial
                       </span>
                     </div>
                  </div>
                  
                  <div className="flex flex-col mb-8">
                    <span className="text-[13px] md:text-[14px] text-[#404145] font-medium mb-1">Monthly plan</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-[36px] md:text-[42px] font-bold text-[#222325] leading-none tracking-tighter">$25</span>
                      <span className="text-[#62646a] text-base md:text-lg font-medium">/ month</span>
                    </div>
                  </div>
                  
                  <Link 
                    to="/onboarding" 
                    className="w-full text-center bg-[#1dbf73] text-white font-semibold px-8 py-4 rounded-[4px] hover:bg-[#19a463] transition-colors shadow-sm active:scale-95 text-[15px] font-display mb-4 uppercase tracking-wide"
                  >
                    Start your 7-day trial
                  </Link>

                  <p className="text-[14px] text-[#62646a] text-center mb-6">
                    Cancel anytime. You won't be charged until trial ends.
                  </p>
                  
                  <div className="bg-[#fcfcfc] rounded-[4px] p-5 border border-[#e4e5e7] mt-4">
                    <p className="font-semibold text-[#222325] text-[14px] mb-3">Supported Payment Methods</p>
                    <div className="flex items-center flex-wrap gap-2.5">
                      <div className="bg-slate-100 border border-slate-200 rounded px-2.5 py-1.5 flex items-center justify-center">
                        <span className="text-[12px] font-bold text-slate-700">Credit Card</span>
                      </div>
                      <div className="bg-[#ffcc00]/10 border border-[#ffcc00]/20 rounded px-2.5 py-1.5 flex items-center justify-center">
                        <img src="https://www.mtn.co.ug/wp-content/themes/mtn-vivid-wp/public/img/mtn-logo.svg" alt="MTN" className="h-3 w-auto object-contain mix-blend-multiply" />
                      </div>
                      <div className="bg-red-50 border border-red-100 rounded px-2.5 py-1.5 flex items-center justify-center">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Bharti_Airtel_Logo.svg" alt="Airtel" className="h-3 w-auto object-contain mix-blend-multiply" />
                      </div>
                      <div className="bg-blue-50 border border-blue-100 rounded px-2.5 py-1.5 flex items-center gap-1">
                        <CreditCard size={14} className="text-blue-600" />
                        <span className="text-[12px] font-bold text-blue-900">Bank Transfer</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* Referr Concept Section */}
        <section id="ledger" className="py-16 px-8 bg-white">
          <div className="max-w-[1400px] mx-auto rounded-[12px] bg-[#14151e] text-white flex flex-col md:flex-row overflow-hidden">
            <div className="p-6 md:p-10 lg:p-16 flex-1 flex flex-col justify-center">
              <h2 className="text-[28px] md:text-[36px] font-bold font-serif mb-5 leading-tight">
                <span className="font-display font-black flex items-center gap-1 mb-3 text-[24px] tracking-tight uppercase tracking-widest text-[#1dbf73]">
                  The Reputation Ledger
                </span>
                Turn your circle of trust into a circle of wealth
              </h2>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <span className="mt-1 shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#1dbf73"
                      />
                      <path
                        d="M16 9.5L10.5 15L8 12.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-[17px] text-white/90 font-display font-medium">
                    The Referral Dividend. High-value professional opportunities
                    are the interest paid on your reputation.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
                        fill="#1dbf73"
                      />
                      <path
                        d="M16 9.5L10.5 15L8 12.5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <p className="text-[17px] text-white/90 font-display font-medium">
                    Network Equity. Build a verified profile where your
                    connections are the ultimate guarantee of your market value.
                  </p>
                </div>
              </div>
              <div>
                <Link
                  to="/onboarding"
                  className="inline-block bg-[#1dbf73] text-white hover:bg-[#19a463] font-bold px-7 py-3 rounded-[4px] text-[15px] transition-colors font-display"
                >
                  Build Your Network Wealth
                </Link>
              </div>
            </div>
            <div className="flex-1 relative min-h-[400px] hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800"
                alt="Community"
                className="absolute inset-0 w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </section>

        {/* Safe and Trusted Section */}
        <section id="safe" className="py-20 md:py-24 bg-white">
          <div className="max-w-[1400px] mx-auto px-6 md:px-8">
            <div className="max-w-[900px]">
              <h2 className="text-[28px] md:text-[36px] font-bold text-[#404145] leading-[1.2] pb-6 mb-6 font-display">
                100% safe and trusted
              </h2>
              
              <ul className="space-y-6 text-[#404145]">
                <li className="flex items-start gap-4">
                  <CheckCircle size={28} className="text-[#74767e] shrink-0 fill-none mt-1" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[18px] md:text-[20px] font-bold text-[#404145]">Secure, transparent earnings</span>
                    <span className="text-[16px] md:text-[18px] text-[#62646a] mt-1 leading-relaxed max-w-2xl">
                      Referr is built to give you reliable support from start to withdrawal. Every task comes from verified partners, ensuring fair crediting.
                    </span>
                  </div>
                </li>
                
                <li className="flex items-start gap-4">
                  <CheckCircle size={28} className="text-[#74767e] shrink-0 fill-none mt-1" strokeWidth={1.5} />
                  <div className="flex flex-col">
                    <span className="text-[18px] md:text-[20px] font-bold text-[#404145]">Clear flat-fee structure</span>
                    <span className="text-[16px] md:text-[18px] text-[#62646a] mt-1 leading-relaxed max-w-2xl">
                      We maintain a simple 3.0% withdrawal fee. You always see the exact payout before starting.
                    </span>
                  </div>
                </li>
              </ul>

              <div className="pt-8 mt-10 border-t border-slate-200">
                <div className="flex flex-col">
                  <span className="text-[14px] md:text-[16px] font-bold text-[#404145] mb-4">Supported Withdrawal Methods</span>
                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="px-3 py-2 border border-slate-200 rounded-[4px] flex items-center justify-center bg-white shadow-sm hover:border-slate-300 transition-colors cursor-default">
                      <img src="https://www.mtn.co.ug/wp-content/themes/mtn-vivid-wp/public/img/mtn-logo.svg" alt="MTN" className="h-5 w-auto object-contain" />
                    </div>
                    <div className="px-3 py-2 border border-slate-200 rounded-[4px] flex items-center justify-center bg-white shadow-sm hover:border-slate-300 transition-colors cursor-default">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Bharti_Airtel_Logo.svg" alt="Airtel" className="h-5 w-auto object-contain" />
                    </div>
                    <div className="px-4 py-2 border border-slate-200 rounded-[4px] flex items-center gap-2 bg-white shadow-sm hover:border-slate-300 transition-colors cursor-default">
                      <CreditCard size={18} className="text-slate-600" />
                      <span className="text-[14px] font-bold text-slate-700">Bank Transfer</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16 w-full grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
              {/* Stats Card 1: Total Paid Out */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#1dbf73] to-[#148b52] rounded-[8px] p-10 text-white h-[240px] flex flex-col items-center justify-center shadow-2xl">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl" />
                <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-white/10 rounded-full border border-white/20" />
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/5 rounded-full border border-white/10" />
                
                <p className="relative z-10 text-[15px] font-semibold mb-2 opacity-90">Total paid out</p>
                <div className="relative z-10 flex items-center gap-4">
                  <p className="text-[32px] md:text-[40px] font-semibold tracking-tighter leading-none">2 776 784</p>
                </div>
                <div className="absolute bottom-6 left-6 opacity-40">
                  <Wallet size={20} />
                </div>
              </div>

              {/* Stats Card 2: Registered Users */}
              <div className="relative overflow-hidden bg-[#222325] rounded-[8px] p-10 text-white h-[240px] flex flex-col items-center justify-center shadow-2xl border border-white/5">
                {/* Decorative pill shapes - Fiverr style branding elements */}
                <div className="absolute top-1/2 left-0 w-full h-[120px] flex justify-center items-center gap-8 opacity-10 rotate-[15deg]">
                  <div className="w-[180px] h-[300px] rounded-full border-8 border-white" />
                  <div className="w-[180px] h-[400px] rounded-full border-8 border-white" />
                  <div className="w-[180px] h-[300px] rounded-full border-8 border-white" />
                </div>
                
                <p className="relative z-10 text-[15px] font-semibold mb-2 opacity-90 text-slate-400">Registered users</p>
                <p className="relative z-10 text-[32px] md:text-[40px] font-semibold tracking-tighter leading-none text-[#1dbf73]">17 099 985</p>
              </div>

              {/* Stats Card 3: Completed Payouts */}
              <div className="relative overflow-hidden bg-[#7b3fe4] rounded-[8px] p-10 text-white h-[240px] flex flex-col items-center justify-center shadow-xl border border-purple-400/30">
                {/* Stripe pattern overlay */}
                <div className="absolute inset-0 opacity-[0.08]" 
                     style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 15px, #ffffff 15px, #ffffff 17px)' }}>
                </div>
                
                {/* Decorative floating bubbles/blobs */}
                <div className="absolute top-[10%] right-[10%] w-24 h-24 bg-white/10 rounded-full blur-2xl" />
                <div className="absolute bottom-[5%] left-[5%] w-32 h-32 bg-white/10 rounded-full blur-3xl" />
                <div className="absolute top-[40%] left-[20%] w-3 h-3 bg-white/10 rounded-full" />
                <div className="absolute bottom-[30%] right-[15%] w-4 h-4 bg-white/10 rounded-full" />
                
                <p className="relative z-10 text-[13px] md:text-[14px] font-semibold mb-2 opacity-80 text-purple-100 uppercase tracking-widest">Completed payouts</p>
                <p className="relative z-10 text-[32px] md:text-[40px] font-semibold tracking-tighter leading-none text-white">3 062 017</p>
                <div className="absolute bottom-6 left-6 opacity-60 bg-white/20 p-2 rounded-xl">
                  <LayoutTemplate size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Freelancers Banner */}
        <section className="py-16 px-4 md:px-8 bg-white max-w-[1440px] mx-auto">
          <div className="bg-black rounded-none py-24 px-6 md:py-32 md:px-12 flex flex-col justify-center items-center text-center relative overflow-hidden group cursor-pointer border-4 border-black">
            {/* Background patterns */}
            <div className="absolute inset-0 bg-black group-hover:bg-[#111] transition-colors duration-500"></div>
            <div 
              className="absolute inset-0 opacity-40 mix-blend-overlay group-hover:scale-105 transition-transform duration-[2s] ease-out bg-center bg-cover grayscale group-hover:grayscale-0"
              style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1522071820081-009f0129c71c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2850&q=80")' }}
            ></div>
            
            <h2 className="relative z-10 text-[40px] md:text-[64px] lg:text-[76px] font-black text-white mb-12 leading-[1.05] max-w-4xl tracking-tighter font-serif group-hover:-translate-y-2 transition-transform duration-700 ease-out italic drop-shadow-2xl">
              Find the right freelance<br className="hidden lg:block" /> service, right away
            </h2>
            <Link
              to="/onboarding"
              className="relative z-10 flex items-center gap-3 bg-white text-black font-black text-[16px] md:text-[18px] px-12 py-5 rounded-none hover:bg-[#1dbf73] hover:text-white transition-all duration-300 shadow-[8px_8px_0px_0px_rgba(29,191,115,1)] hover:shadow-none hover:translate-x-[8px] hover:translate-y-[8px] group/btn overflow-hidden uppercase tracking-wider"
            >
              <span>Get Started</span>
              <ChevronRight size={20} className="transform group-hover/btn:translate-x-1 transition-transform" />
            </Link>
          </div>
        </section>
      </main>

      <FAQSection />
      <Footer />
    </div>
  );
}
