import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import Navbar from './Navbar';
import { IconSprout, IconGraph, IconDiamond, IconCoins, IconPiggyBank, IconBriefcase, IconCompass, IconSearch, IconPackage } from './CustomIcons';

export default function CreateProfile() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadingStep, setLoadingStep] = useState(0);
  const [selections, setSelections] = useState({
    ref: '',
    goal: '',
    workStyle: [] as string[]
  });
  const navigate = useNavigate();
  const userName = localStorage.getItem('hustlerName')?.split(' ')[0] || 'there';

  const isNextDisabled = () => {
    if (step === 1) return !selections.ref;
    if (step === 2) return !selections.goal;
    if (step === 3) return selections.workStyle.length === 0;
    return false;
  };

  const loadingMessages = [
    "Building your profile",
    "Setting up your workspace",
    "Finding the best deals",
    "Almost ready"
  ];

  useEffect(() => {
    if (isSubmitting) {
      const interval = setInterval(() => {
        setLoadingStep(prev => (prev < loadingMessages.length - 1 ? prev + 1 : prev));
      }, 800);
      return () => clearInterval(interval);
    }
  }, [isSubmitting]);

  const handleFinish = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      navigate('/dashboard');
    }, 3500);
  };

  return (
    <div className="relative flex flex-col h-screen bg-white overflow-hidden">
      {/* Loading Overlay */}
      <AnimatePresence>
        {isSubmitting && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-white/70 backdrop-blur-xl transition-all duration-700"
          >
            <div className="flex flex-col items-center max-w-sm px-6">
              <div className="relative w-20 h-20 mb-10">
                {/* Outer ring */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-[3px] border-[#e4e5e7]"
                />
                {/* Active segment */}
                <motion.div 
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 rounded-full border-[3px] border-transparent border-t-[#1dbf73]"
                />
                {/* Center dot */}
                <motion.div 
                  animate={{ scale: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-[32%] rounded-full bg-[#1dbf73]"
                />
              </div>
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={loadingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex flex-col items-center"
                >
                  <h3 className="text-[24px] font-medium text-[#222325] mb-2 text-center tracking-tight">
                    {loadingMessages[loadingStep]}
                  </h3>
                  <p className="text-[#62646a] font-light text-[16px]">One moment please...</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className={`flex flex-col h-full transition-all duration-1000 ${isSubmitting ? 'scale-95 opacity-50' : 'scale-100 opacity-100'}`}>
        <Navbar variant="skinny" userName={userName} />
        
        <main className="flex-1 flex flex-col pt-8 max-w-5xl w-full mx-auto px-6 lg:px-12 overflow-hidden">
          
          {/* Progress Bar Fixed at Top */}
          <div className="w-full pb-10 flex items-center gap-4 flex-shrink-0">
            <span className="text-[14px] font-bold text-[#404145] tracking-widest">{step}/3</span>
            <div className="flex-1 bg-[#e4e5e7] rounded-full h-1 overflow-hidden">
               <div className="bg-[#1dbf73] h-full transition-all duration-300 ease-out" style={{ width: `${(step / 3) * 100}%` }}></div>
            </div>
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full pb-12 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            {step === 1 && (
              <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[800px]">
                <h2 className="text-[32px] md:text-[40px] font-medium text-[#222325] tracking-tight leading-tight mb-4">
                  A few quick questions: first, have you freelanced before?
                </h2>
                <p className="text-[18px] text-[#62646a] mb-10 max-w-2xl font-light">
                  Tell us about your experience level.
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    { label: 'I am brand new to this', value: 'NEW_TO_ME', icon: IconSprout },
                    { label: 'I have some experience', value: 'NEEDS_TIP', icon: IconGraph },
                    { label: 'I am an expert', value: 'EXPERT', icon: IconDiamond }
                  ].map((option) => (
                    <label key={option.value} className="group relative flex flex-col p-8 border border-[#e4e5e7] bg-white rounded-xl cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#1dbf73] transition-all duration-300 has-[:checked]:border-[#1dbf73] has-[:checked]:ring-1 has-[:checked]:ring-[#1dbf73] has-[:checked]:bg-[#fafafa]">
                      <input 
                        type="radio" 
                        name="ref" 
                        className="peer opacity-0 absolute inset-0 cursor-pointer" 
                        value={option.value}
                        checked={selections.ref === option.value}
                        onChange={(e) => setSelections(prev => ({ ...prev, ref: e.target.value }))}
                      /> 
                      <div className="absolute top-6 right-6 w-5 h-5 rounded-full border border-[#c5c6c9] group-has-[:checked]:border-[#1dbf73] group-has-[:checked]:bg-[#1dbf73] flex items-center justify-center transition-colors">
                        <svg className="w-3 h-3 text-white opacity-0 group-has-[:checked]:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                      </div>
                      
                      <div className="mb-10">
                        <option.icon className="w-10 h-10 text-[#74767e] group-hover:text-[#1dbf73] group-has-[:checked]:text-[#1dbf73] transition-colors" strokeWidth={1} />
                      </div>
                      <span className="font-semibold text-lg text-[#222325] leading-snug">{option.label}</span>
                    </label>
                  ))}
                 </div>
              </div>
            )}
            
            {step === 2 && (
               <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[800px]">
                <h2 className="text-[32px] md:text-[40px] font-medium text-[#222325] tracking-tight leading-tight mb-4">
                  Got it. What's your biggest goal for freelancing?
                 </h2>
                 <p className="text-[18px] text-[#62646a] mb-10 max-w-2xl font-light">
                   What are you looking to achieve?
                 </p>
                 
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                   {[
                     { label: 'To earn my main income', value: 'MAIN_INCOME', icon: IconCoins },
                     { label: 'To make money on the side', value: 'MONEY_ON_SIDE', icon: IconPiggyBank },
                     { label: 'To get experience, for a full-time job', value: 'GET_EXPERIENCE', icon: IconBriefcase },
                     { label: "I don't have a goal in mind yet", value: 'EXPLORING', icon: IconCompass }
                   ].map((option) => (
                     <label key={option.value} className="group relative flex items-center p-6 border border-[#e4e5e7] bg-white rounded-xl cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#1dbf73] transition-all duration-300 has-[:checked]:border-[#1dbf73] has-[:checked]:ring-1 has-[:checked]:ring-[#1dbf73] has-[:checked]:bg-[#fafafa]">
                       <input 
                         type="radio" 
                         name="goal" 
                         className="peer opacity-0 absolute inset-0 cursor-pointer" 
                         value={option.value}
                         checked={selections.goal === option.value}
                         onChange={(e) => setSelections(prev => ({ ...prev, goal: e.target.value }))}
                       /> 
                       <div className="mr-5 flex-shrink-0">
                         <option.icon className="w-9 h-9 text-[#74767e] group-hover:text-[#1dbf73] group-has-[:checked]:text-[#1dbf73] transition-colors" strokeWidth={1} />
                       </div>
                       <div className="flex-1">
                         <span className="font-semibold text-[17px] text-[#222325]">{option.label}</span>
                       </div>
                       <div className="ml-4 flex-shrink-0">
                         <div className="w-5 h-5 rounded-full border border-[#c5c6c9] group-has-[:checked]:border-[#1dbf73] group-has-[:checked]:bg-[#1dbf73] flex items-center justify-center transition-colors">
                            <svg className="w-3 h-3 text-white opacity-0 group-has-[:checked]:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                         </div>
                       </div>
                     </label>
                   ))}
                 </div>
               </div>
             )}
   
             {step === 3 && (
               <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 max-w-[800px]">
                 <h2 className="text-[32px] md:text-[40px] font-medium text-[#222325] tracking-tight leading-tight mb-4">
                   And how would you like to work?
                 </h2>
                 <p className="text-[18px] text-[#62646a] mb-10 max-w-2xl font-light">
                   Select your preferred ways to work.
                 </p>
                 
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   {[
                     { label: "I'd like to find opportunities myself", value: 'SEARCH', icon: IconSearch, desc: "You can browse and bid for them, or get invited by a client." },
                     { label: "I'd like to package up my work for clients to buy", value: 'PACKAGE', icon: IconPackage, desc: "Define your service with prices and timelines: we'll list it." }
                   ].map((option) => (
                     <label key={option.value} className="group relative flex flex-col items-start p-8 border border-[#e4e5e7] bg-white rounded-xl cursor-pointer hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:border-[#1dbf73] transition-all duration-300 has-[:checked]:border-[#1dbf73] has-[:checked]:ring-1 has-[:checked]:ring-[#1dbf73] has-[:checked]:bg-[#fafafa]">
                       <div className="absolute top-8 right-8">
                         <input 
                           type="checkbox" 
                           name="work_style" 
                           className="peer opacity-0 absolute inset-0 cursor-pointer" 
                           value={option.value}
                           checked={selections.workStyle.includes(option.value)}
                           onChange={(e) => {
                             const val = e.target.value;
                             setSelections(prev => ({
                               ...prev,
                               workStyle: e.target.checked 
                                 ? [...prev.workStyle, val] 
                                 : prev.workStyle.filter(i => i !== val)
                             }))
                           }}
                         /> 
                         <div className="w-5 h-5 rounded border border-[#c5c6c9] group-has-[:checked]:border-[#1dbf73] group-has-[:checked]:bg-[#1dbf73] flex items-center justify-center transition-colors">
                           <svg className="w-3.5 h-3.5 text-white opacity-0 group-has-[:checked]:opacity-100" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
                         </div>
                       </div>
                       <div className="mb-6">
                         <option.icon className="w-11 h-11 text-[#74767e] group-hover:text-[#1dbf73] group-has-[:checked]:text-[#1dbf73] transition-colors" strokeWidth={1} />
                       </div>
                       <span className="font-semibold text-xl text-[#222325] leading-snug mb-3 pr-8">{option.label}</span>
                       <span className="text-[15px] text-[#62646a] font-light leading-relaxed">{option.desc}</span>
                     </label>
                   ))}
                 </div>
               </div>
             )}
           </div>
         </main>
   
         {/* Footer fixed */}
         <footer className="w-full bg-white border-t border-[#e4e5e7] py-6 px-6 lg:px-12 flex-shrink-0 z-10">
           <div className="max-w-5xl mx-auto flex justify-between items-center">
             <button 
               onClick={() => step > 1 ? setStep(step-1) : null} 
               className={`font-semibold text-[15px] transition-colors ${step > 1 ? 'text-[#222325] hover:text-[#1dbf73] cursor-pointer' : 'text-[#c5c6c9] pointer-events-none'}`}
             >
                Back
             </button>
             
             <button 
               onClick={() => step < 3 ? setStep(step + 1) : handleFinish()} 
               disabled={isNextDisabled()}
               className={`px-8 py-3 text-white font-semibold text-[15px] rounded transition-all duration-300 ${
                 isNextDisabled() 
                   ? 'bg-[#e4e5e7] text-[#c5c6c9] cursor-not-allowed opacity-70' 
                   : 'bg-[#1dbf73] hover:bg-[#19a463] cursor-pointer'
               }`}
             >
               {step < 3 ? 'Next' : 'Finish'}
             </button>
           </div>
         </footer>
       </div>
    </div>
  );
}
