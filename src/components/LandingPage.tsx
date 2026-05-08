import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {LayoutTemplate, Megaphone, LineChart, Wallet, ChevronRight, ChevronDown, CheckCircle} from 'lucide-react';
import {motion} from 'motion/react';
import Footer from './Footer';
import Navbar from './Navbar';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <Navbar />

      <main className="pt-[80px]">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 md:px-6 min-h-[680px] flex flex-col justify-start overflow-hidden">
           <video 
             src="https://acquisition-ui-assets.static-upwork.com/brontes/canopy/hero-video-lg.mp4" 
             autoPlay 
             muted 
             loop 
             playsInline 
             className="absolute inset-0 w-full h-full object-cover"
           ></video>
           <div className="absolute inset-0 bg-slate-950/50"></div>
           
           <div className="w-full relative z-10 flex flex-col justify-start px-2 md:px-4 ml-0">
                <div className="mb-8">
                  <h1 className="text-5xl md:text-[84px] text-white leading-[1.05] tracking-[-0.06em] text-left font-display" style={{ fontWeight: 280 }}>
                    Your network <br/> will take it from here
                  </h1>
                </div>

                <div className="w-full max-w-[1100px] bg-white shadow-xl flex items-center mb-10 overflow-hidden rounded-[8px] p-1.5">
                   <div className="flex-1 flex items-center px-4">
                     <input 
                        type="search" 
                        placeholder="Who in your network would you refer for a job?" 
                        className="w-full py-3 text-[17px] outline-none text-[#404145] placeholder:text-[#95979d] font-display" 
                     />
                   </div>
                   <Link to="/onboarding" className="bg-[#1dbf73] text-white w-[54px] h-[48px] rounded-[6px] flex items-center justify-center hover:bg-[#19a463] transition cursor-pointer">
                      <svg width="18" height="18" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
                         <path d="m15.89 14.653-3.793-3.794a.37.37 0 0 0-.266-.109h-.412A6.499 6.499 0 0 0 6.5 0C2.91 0 0 2.91 0 6.5a6.499 6.499 0 0 0 10.75 4.919v.412c0 .1.04.194.11.266l3.793 3.794a.375.375 0 0 0 .531 0l.707-.707a.375.375 0 0 0 0-.53ZM6.5 11.5c-2.763 0-5-2.238-5-5 0-2.763 2.237-5 5-5 2.762 0 5 2.237 5 5 0 2.762-2.238 5-5 5Z"></path>
                      </svg>
                   </Link>
                </div>
                
                <div className="flex items-center gap-2.5 text-white overflow-x-auto no-scrollbar pb-2">
                    {[
                      { name: 'Endorse a Web Developer', to: '/services/web' },
                      { name: 'Vouch for a Designer', to: '/services/design' },
                      { name: 'Back a Growth Marketer', to: '/services/marketing' },
                      { name: 'Refer a Video Editor', to: '/services/video' },
                      { name: 'Recommend an AI Expert', to: '/services/ai' }
                    ].map(item => (
                        <Link 
                          key={item.name} 
                          to={item.to} 
                          className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/15 rounded-[4px] px-5 py-2 hover:bg-white/20 transition-all text-[14.5px] font-bold font-display group whitespace-nowrap shrink-0"
                        >
                          {item.name}
                          <ChevronRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                        </Link>
                    ))}
                </div>
          </div>
          
          {/* Trusted By Overlay */}
          <div className="absolute bottom-8 left-0 z-10 hidden md:flex w-full px-12 justify-start">
            <div className="flex items-center gap-8">
                <p className="text-white text-[16px] font-medium leading-none">Trusted by:</p>
                <div className="flex items-center gap-6">
                  <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">Meta</span>
                  <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">Airtel</span>
                  <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">Stanbic</span>
                  <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">Centenary</span>
                  <span className="font-bold text-xl text-white/90 tracking-tighter mix-blend-lighten uppercase">Jumia</span>
                </div>
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="py-16 bg-slate-50">
            <div className="max-w-[1400px] mx-auto px-8">
                <h2 className="text-[28px] md:text-[32px] font-bold text-[#404145] mb-8 font-display tracking-tight">Top referred professional services</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                    {['Graphic Design', 'Digital Marketing', 'Writing & Translation', 'Video & Animation', 'Music & Audio', 'Programming & Tech', 'Business', 'Lifestyle', 'Data', 'Photography'].map(cat => (
                        <div key={cat} className="bg-white p-6 border border-slate-200 hover:border-[#1dbf73] transition cursor-pointer rounded-[4px] group shadow-sm hover:shadow-md">
                            <span className="font-bold text-[16px] text-[#404145] font-display group-hover:text-[#1dbf73] transition-colors">{cat}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>

        {/* AI Director Section */}
        <section className="py-16 bg-white">
            <div className="max-w-[1400px] mx-auto px-8">
                <div className="bg-black rounded-[12px] overflow-hidden flex flex-col lg:flex-row items-center">
                    <div className="p-10 md:p-14 lg:p-16 flex-1">
                        <h2 className="text-[28px] md:text-[40px] font-bold text-white mb-4 leading-tight tracking-tight font-display">
                            Hiring built on trust
                        </h2>
                        <p className="text-base text-white/80 mb-8 leading-relaxed max-w-xl font-display font-light">
                            Connect with professionals who come recommended by the people you already trust.
                        </p>
                        <Link to="/how-it-works" className="inline-block bg-[#1dbf73] text-white font-bold px-7 py-3 rounded-[4px] hover:bg-[#19a463] transition-colors font-display text-[15px]">
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
                            <source src="https://fiverr-res.cloudinary.com/video/upload/t_fiverr_hd_nl/v1/video-attachments/generic_asset/asset/14957b0be6378e1fd212193f81962000-1774365803723/all%20directors%20for%20gif%20fixed" type="video/mp4" />
                        </video>
                    </div>
                </div>
            </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 bg-white border-b border-slate-200">
            <div className="max-w-[1400px] mx-auto px-8">
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="text-center md:text-left md:max-w-xs">
                         <h2 className="text-[28px] md:text-[32px] font-bold text-[#404145] tracking-tight mb-3 font-display">A community built on backing</h2>
                         <p className="text-[16px] text-[#74767e] font-display">Join thousands of professionals who grow their careers through quality referrals.</p>
                    </div>
                    
                    <div className="flex flex-wrap justify-center md:justify-end gap-10 lg:gap-16 flex-1">
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <span className="text-[40px] md:text-[52px] font-bold text-[#404145] tracking-tighter leading-none mb-1 font-display">10M+</span>
                            <span className="text-[13px] text-[#74767e] font-bold font-display uppercase tracking-widest">Companies Helped</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <span className="text-[40px] md:text-[52px] font-bold text-[#404145] tracking-tighter leading-none mb-1 font-display">120+</span>
                            <span className="text-[13px] text-[#74767e] font-bold font-display uppercase tracking-widest">Countries</span>
                        </div>
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <span className="text-[40px] md:text-[52px] font-bold text-[#404145] tracking-tighter leading-none mb-1 font-display">$2B+</span>
                            <span className="text-[13px] text-[#74767e] font-bold font-display uppercase tracking-widest">Earned</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* Referr Concept Section */}
        <section className="py-16 px-8 bg-white">
            <div className="max-w-[1400px] mx-auto rounded-[12px] bg-[#0d084d] text-white flex flex-col md:flex-row overflow-hidden">
                <div className="p-10 md:p-14 lg:p-16 flex-1 flex flex-col justify-center">
                    <h2 className="text-[28px] md:text-[36px] font-bold font-serif mb-5 leading-tight">
                        <span className="font-display font-black flex items-center gap-1 mb-3 text-[24px] tracking-tight uppercase">
                            The Reputation Ledger<span className="text-[#1dbf73] text-[28px] leading-[0]">.</span>
                        </span>
                        Turn your circle of trust into a circle of wealth
                    </h2>
                    <div className="space-y-4 mb-8">
                        <div className="flex items-start gap-3">
                            <span className="mt-1 shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1dbf73"/>
                                    <path d="M16 9.5L10.5 15L8 12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <p className="text-[17px] text-white/90 font-display font-medium">The Referral Dividend. High-value professional opportunities are the interest paid on your reputation.</p>
                        </div>
                        <div className="flex items-start gap-3">
                            <span className="mt-1 shrink-0">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" fill="#1dbf73"/>
                                    <path d="M16 9.5L10.5 15L8 12.5" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </span>
                            <p className="text-[17px] text-white/90 font-display font-medium">Network Equity. Build a verified profile where your connections are the ultimate guarantee of your market value.</p>
                        </div>
                    </div>
                    <div>
                        <Link to="/onboarding" className="inline-block bg-[#1dbf73] text-white hover:bg-[#19a463] font-bold px-7 py-3 rounded-[4px] text-[15px] transition-colors font-display">
                            Build Your Network Wealth
                        </Link>
                    </div>
                </div>
                <div className="flex-1 relative min-h-[400px] hidden md:block">
                    <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800" alt="Community" className="absolute inset-0 w-full h-full object-cover object-center" referrerPolicy="no-referrer" />
                </div>
            </div>
        </section>

        {/* Freelancers Banner */}
        <section className="py-16 px-8 bg-white">
            <div className="max-w-[1400px] mx-auto bg-[#4d1727] rounded-[12px] py-12 px-6 md:py-20 md:px-12 flex flex-col items-center text-center">
                <h2 className="text-[32px] md:text-[52px] font-serif text-white mb-8 leading-[1.1] max-w-3xl tracking-tight">
                    Quality work begins with a trusted referral
                </h2>
                <Link to="/join" className="inline-block bg-white text-[#404145] font-bold text-[15px] px-8 py-3 rounded-[4px] hover:bg-slate-100 transition-colors font-display tracking-wide uppercase">
                    Join now
                </Link>
            </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
