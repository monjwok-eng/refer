import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, ChevronLeft, Upload, Check, Layout, Briefcase, Globe, Info, Loader2 } from 'lucide-react';
import Navbar from './Navbar';

type Step = 'identity' | 'needs_website' | 'website_about' | 'website_name' | 'website_description' | 'website_url' | 'final';

export default function BusinessOnboarding() {
  const [currentStep, setCurrentStep] = useState<Step>('identity');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const [businessData, setBusinessData] = useState({
    name: localStorage.getItem('businessName') || '',
    industry: '',
    description: '',
    logo: null as string | null,
    website: '',
    needsWebsite: null as boolean | null,
    siteAbout: '',
    siteName: '',
    websiteDescription: ''
  });

  const industries = [
    'Technology & Software',
    'Creative & Design',
    'Marketing & Sales',
    'Business Services',
    'Education & Training',
    'Health & Wellness',
    'Retail & E-commerce',
    'Other'
  ];

  const handleNext = () => {
    if (currentStep === 'identity') setCurrentStep('needs_website');
    else if (currentStep === 'needs_website') {
      if (businessData.needsWebsite) setCurrentStep('website_about');
      else setCurrentStep('website_url');
    }
    else if (currentStep === 'website_about') setCurrentStep('website_name');
    else if (currentStep === 'website_name') setCurrentStep('website_description');
    else if (currentStep === 'website_description' || currentStep === 'website_url') setCurrentStep('final');
  };

  const handleBack = () => {
    if (currentStep === 'needs_website') setCurrentStep('identity');
    else if (currentStep === 'website_about' || currentStep === 'website_url') setCurrentStep('needs_website');
    else if (currentStep === 'website_name') setCurrentStep('website_about');
    else if (currentStep === 'website_description') setCurrentStep('website_name');
    else if (currentStep === 'final') {
      if (businessData.needsWebsite) setCurrentStep('website_description');
      else setCurrentStep('website_url');
    }
  };

  const handleComplete = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.setItem('isOnboarded', 'true');
      navigate('/dashboard');
    }, 1500);
  };



  return (
    <div className="min-h-screen bg-[#f7f7f7] font-sans text-[#222325]">
      <Navbar variant="skinny" />

      <main className="pt-20 pb-12 px-6 flex justify-center">
        <div className="w-full max-w-[800px] bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Progress Bar */}
          <div className="h-1.5 w-full bg-slate-100 flex">
             <div 
               className="h-full bg-[#1dbf73] transition-all duration-500" 
               style={{ width: 
                 currentStep === 'identity' ? '15%' : 
                 currentStep === 'needs_website' ? '30%' : 
                 currentStep === 'website_about' ? '45%' :
                 currentStep === 'website_name' ? '60%' :
                 currentStep === 'website_description' ? '75%' :
                 currentStep === 'website_url' ? '75%' : '100%' 
               }}
             />
          </div>

          <div className="p-8 md:p-12">
            <AnimatePresence mode="wait">
              {loading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6 py-12 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="text-[#1dbf73] mb-4"
                  >
                    <Loader2 size={48} />
                  </motion.div>
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight">Finalizing your workspace...</h2>
                    <p className="text-slate-500 max-w-sm mx-auto">We're preparing your hiring pipeline and professional profile.</p>
                  </div>
                </motion.div>
              ) : (
                <>
              {currentStep === 'identity' && (
                <motion.div
                  key="identity"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold mb-3 tracking-tight">Tell us about your business</h2>
                    <p className="text-slate-500 text-[15px]">Help us customize your workspace for the right results.</p>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#404145]">Business/Company Name</label>
                        <input 
                          type="text" 
                          value={businessData.name}
                          onChange={(e) => setBusinessData({...businessData, name: e.target.value})}
                          placeholder="e.g. Acme Creative"
                          className="w-full h-12 px-4 border border-slate-300 rounded focus:outline-none focus:border-[#1dbf73] transition-all"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#404145]">Industry</label>
                        <select 
                          value={businessData.industry}
                          onChange={(e) => setBusinessData({...businessData, industry: e.target.value})}
                          className="w-full h-12 px-4 border border-slate-300 rounded focus:outline-none focus:border-[#1dbf73] transition-all bg-white"
                        >
                          <option value="">Select your industry</option>
                          {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
                        </select>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'needs_website' && (
                <motion.div
                  key="needs_website"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold mb-3 tracking-tight text-[#001e00]">Do you need a website?</h2>
                    <p className="text-slate-500 text-[15px]">We can help you set up a professional presence or integrate with your existing one.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl mx-auto">
                    <button 
                      onClick={() => setBusinessData({...businessData, needsWebsite: true})}
                      className={`p-8 rounded-xl border-2 text-left transition-all group ${
                        businessData.needsWebsite === true ? 'border-[#1dbf73] bg-[#1dbf73]/5' : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                        businessData.needsWebsite === true ? 'bg-[#1dbf73] text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
                      }`}>
                        <Globe size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-1">Yes, I need one</h3>
                      <p className="text-sm text-slate-500">I want to create a new professional website for my business.</p>
                    </button>

                    <button 
                      onClick={() => setBusinessData({...businessData, needsWebsite: false})}
                      className={`p-8 rounded-xl border-2 text-left transition-all group ${
                        businessData.needsWebsite === false ? 'border-[#1dbf73] bg-[#1dbf73]/5' : 'border-slate-100 hover:border-slate-200'
                      }`}
                    >
                      <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-4 transition-colors ${
                        businessData.needsWebsite === false ? 'bg-[#1dbf73] text-white' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100'
                      }`}>
                        <Layout size={24} />
                      </div>
                      <h3 className="font-bold text-lg mb-1">No, I have one</h3>
                      <p className="text-sm text-slate-500">I already have a website and want to link it to my profile.</p>
                    </button>
                  </div>
                </motion.div>
              )}

              {currentStep === 'website_about' && (
                <motion.div
                  key="website_about"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold mb-3 tracking-tight text-[#001e00]">First, what is your site all about?</h2>
                    <p className="text-slate-500 text-[15px]">Briefly describe the main focus of your business or project.</p>
                  </div>

                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#404145]">Site Category/Focus</label>
                        <input 
                            type="text" 
                            value={businessData.siteAbout}
                            onChange={(e) => setBusinessData({...businessData, siteAbout: e.target.value})}
                            className="w-full h-12 px-4 border border-slate-300 rounded focus:outline-none focus:border-[#1dbf73] transition-all"
                            placeholder="e.g. Graphic Design Studio, Online Bakery, Tech Blog"
                        />
                        <p className="text-xs text-slate-400">This helps us suggest the best features for your site.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'website_name' && (
                <motion.div
                  key="website_name"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold mb-3 tracking-tight text-[#001e00]">What do you want to call your site?</h2>
                    <p className="text-slate-500 text-[15px]">Choose a catchy name for your professional online presence.</p>
                  </div>

                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#404145]">Site Name</label>
                        <input 
                            type="text" 
                            value={businessData.siteName}
                            onChange={(e) => setBusinessData({...businessData, siteName: e.target.value})}
                            className="w-full h-12 px-4 border border-slate-300 rounded focus:outline-none focus:border-[#1dbf73] transition-all"
                            placeholder="e.g. Acme Creative Studio"
                        />
                        <p className="text-xs text-slate-400">You can always change this later in your settings.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'website_description' && (
                <motion.div
                  key="website_description"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold mb-3 tracking-tight text-[#001e00]">Describe your vision</h2>
                    <p className="text-slate-500 text-[15px]">The more detail you provide, the better we can match you with the right creators.</p>
                  </div>

                  <div className="max-w-2xl mx-auto">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#404145]">What should your website achieve?</label>
                        <textarea 
                            rows={6}
                            value={businessData.websiteDescription}
                            onChange={(e) => setBusinessData({...businessData, websiteDescription: e.target.value})}
                            placeholder="e.g. We need a clean, minimalist portfolio that showcases our architecture projects. Key features: high-res gallery, client testimonial section, and a contact form..." 
                            className="w-full p-4 border border-slate-300 rounded-xl focus:outline-none focus:border-[#1dbf73] transition-all resize-none text-[15px] leading-relaxed shadow-sm"
                        ></textarea>
                        <div className="flex justify-between items-center mt-2 px-1">
                            <p className="text-xs text-slate-400 italic">Think about: pages needed, style, or specific apps/integrations.</p>
                            <span className="text-[11px] font-bold text-slate-300 uppercase tracking-widest">{businessData.websiteDescription.length} chars</span>
                        </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'website_url' && (
                <motion.div
                  key="website_url"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <h2 className="text-3xl font-bold mb-3 tracking-tight text-[#001e00]">Share your website</h2>
                    <p className="text-slate-500 text-[15px]">We'll use this to help our referrers understand your business better.</p>
                  </div>

                  <div className="max-w-md mx-auto space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-[#404145]">Website URL</label>
                        <div className="flex">
                            <span className="h-12 px-3 border border-r-0 border-slate-300 rounded-l flex items-center bg-slate-50 text-slate-400 text-sm">https://</span>
                            <input 
                                type="text" 
                                value={businessData.website}
                                onChange={(e) => setBusinessData({...businessData, website: e.target.value})}
                                className="flex-1 h-12 px-4 border border-slate-300 rounded-r focus:outline-none focus:border-[#1dbf73] transition-all"
                                placeholder="www.yourcompany.com"
                            />
                        </div>
                        <p className="text-xs text-slate-400">This will be featured on your partner profile.</p>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 'final' && (
                <motion.div
                  key="final"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-8 py-4"
                >
                  <div className="text-center max-w-lg mx-auto">
                    <div className="w-20 h-20 bg-[#1dbf73]/10 text-[#1dbf73] rounded-full flex items-center justify-center mx-auto mb-6">
                        <Briefcase size={40} />
                    </div>
                    <h2 className="text-3xl font-bold mb-3 tracking-tight">Ready to launch</h2>
                    <p className="text-slate-500 text-[15px]">Review your details before jumping into your new dashboard.</p>
                  </div>

                  <div className="bg-slate-50 p-6 rounded-lg border border-slate-200">
                     <h4 className="font-bold text-sm text-slate-400 uppercase tracking-widest mb-4">Summary</h4>
                     <div className="space-y-3">
                         <div className="flex justify-between items-center text-[15px]">
                            <span className="text-slate-500">Business</span>
                            <span className="font-bold">{businessData.name}</span>
                         </div>
                         <div className="flex justify-between items-center text-[15px]">
                            <span className="text-slate-500">Industry</span>
                            <span className="font-bold">{businessData.industry}</span>
                         </div>
                         {businessData.needsWebsite && (
                            <div className="flex justify-between items-center text-[15px]">
                                <span className="text-slate-500">Site Name</span>
                                <span className="font-bold">{businessData.siteName}</span>
                            </div>
                         )}
                     </div>
                  </div>
                </motion.div>
              )}
                </>
              )}
            </AnimatePresence>

            {!loading && (
              <div className="mt-12 flex items-center justify-between pt-8 border-t border-slate-100">
                <button 
                  onClick={handleBack}
                  disabled={currentStep === 'identity'}
                  className={`flex items-center gap-2 font-bold px-4 py-2 transition-all ${
                      currentStep === 'identity' ? 'opacity-0 pointer-events-none' : 'text-slate-400 hover:text-[#222325]'
                  }`}
                >
                  <ChevronLeft size={20} />
                  Back
                </button>

                <button 
                  onClick={currentStep === 'final' ? handleComplete : handleNext}
                  className="bg-[#1dbf73] text-white px-8 py-3 rounded font-bold hover:bg-[#19a463] transition-all flex items-center gap-2"
                >
                  {currentStep === 'final' ? 'Launch Dashboard' : 'Next Step'}
                  {currentStep !== 'final' && <ChevronRight size={20} />}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
