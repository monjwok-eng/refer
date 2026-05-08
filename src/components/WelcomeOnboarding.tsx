import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { User, ClipboardCheck, ShieldCheck, ArrowRight, Star, Clock } from 'lucide-react';
import Navbar from './Navbar';

export default function WelcomeOnboarding() {
  const navigate = useNavigate();
  const userName = localStorage.getItem('hustlerName')?.split(' ')[0] || 'there';

  return (
    <div className="min-h-screen bg-white flex flex-col items-center font-sans overflow-x-hidden">
      {/* Header */}
      <Navbar variant="skinny" userName={userName} />

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-16 flex items-center justify-between gap-16 min-h-[calc(100vh-80px)]">
        
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl space-y-8"
        >
          {/* Heading */}
          <h2 className="text-[32px] md:text-[40px] font-normal text-slate-900 leading-[1.2] tracking-tight mb-8">
            Hey {userName}. Ready for your next big opportunity?
          </h2>

          {/* List of benefits */}
          <div className="space-y-6 pt-4">
            {[
              { icon: User, text: "Answer a few questions and start building your profile" },
              { icon: ClipboardCheck, text: "Apply for open roles or list services for clients to buy" },
              { icon: ShieldCheck, text: "Get paid safely and know we’re there to help" }
            ].map((item, idx) => (
              <motion.div key={idx} whileHover={{ x: 5 }} className="flex gap-4 items-start p-2 rounded-lg hover:bg-slate-50 transition-colors">
                <item.icon className="w-5 h-5 text-slate-500 mt-1 shrink-0" />
                <p className="text-[15px] text-slate-600 font-light">{item.text}</p>
              </motion.div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="flex flex-col items-start gap-4 pt-4">
            <button 
              onClick={() => navigate('/create-profile')}
              className="px-8 h-12 bg-[#1dbf73] text-white rounded font-medium text-[15px] hover:bg-[#19a463] transition-all flex items-center justify-center active:scale-[0.98]"
            >
              Get started
            </button>
            <p className="text-[13px] text-[#74767e] font-light">It only takes 5-10 minutes. We’ll save as you go.</p>
          </div>
        </motion.div>

        {/* Stories Video Container */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 1 }}
          className="relative w-[340px] h-[480px] shrink-0"
        >
          {[
            {
              src: "https://www.w3schools.com/tags/movie.mp4",
              className: "absolute top-0 left-0 w-44 h-72 rounded-2xl rotate-[-8deg] shadow-xl overflow-hidden border border-white z-10 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300"
            },
            {
              src: "https://www.w3schools.com/tags/movie.mp4",
              className: "absolute top-10 right-0 w-48 h-80 rounded-2xl rotate-[5deg] shadow-xl overflow-hidden border border-white z-20 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300"
            },
            {
              src: "https://www.w3schools.com/tags/movie.mp4",
              className: "absolute bottom-5 left-12 w-44 h-72 rounded-2xl rotate-[-2deg] shadow-lg overflow-hidden border border-white z-30 hover:z-50 hover:rotate-0 hover:scale-110 transition-all duration-300"
            }
          ].map((v, i) => (
            <motion.div key={i} className={v.className} whileHover={{ y: -10 }}>
              <video 
                src={v.src}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </motion.div>
      </main>

      {/* Bottom info for mobile */}
      <div className="lg:hidden w-full bg-slate-50 border-t border-slate-200 px-6 py-6 mt-auto">
        <p className="text-[#5e6d55] text-xs text-center flex items-center justify-center gap-2">
          <Clock className="w-3 h-3 text-[#1dbf73]" />
          5-10 minutes • Progress automatically saved
        </p>
      </div>
    </div>
  );
}
