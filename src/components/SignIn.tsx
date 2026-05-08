import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { Logo } from './Navbar';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth
    setTimeout(() => {
      localStorage.setItem('hustlerName', 'Hustler');
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans text-[#404145]">
      {/* Header */}
      <header className="fixed top-0 w-full h-[80px] px-8 flex items-center justify-between border-b border-gray-100 bg-white/80 backdrop-blur-md z-50">
        <Logo />
        <div className="text-[14px]">
          <span className="text-[#62646a]">New to Referr? </span>
          <Link to="/onboarding" className="text-[#1dbf73] font-bold hover:underline">Join now</Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center pt-20 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-[400px] py-12"
        >
          <div className="mb-10">
            <h1 className="text-[32px] font-bold tracking-tight text-[#222325] mb-2">Sign in to Referr</h1>
            <p className="text-[#62646a] text-[16px]">Continue your journey in the referral economy.</p>
          </div>

          <form onSubmit={handleSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[14px] font-bold text-[#404145]">Phone Number</label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b5b6ba] group-focus-within:text-[#1dbf73] transition-colors">
                  <Phone size={18} />
                </div>
                <input 
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Enter your phone number"
                  className="w-full pl-12 pr-4 py-3 border border-[#e4e5e7] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#1dbf73]/20 focus:border-[#1dbf73] transition-all text-[15px]"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center">
                <label className="text-[14px] font-bold text-[#404145]">Password</label>
                <button type="button" className="text-[13px] font-bold text-[#1dbf73] hover:underline">Forgot password?</button>
              </div>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b5b6ba] group-focus-within:text-[#1dbf73] transition-colors">
                  <Lock size={18} />
                </div>
                <input 
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-12 pr-12 py-3 border border-[#e4e5e7] rounded-[4px] focus:outline-none focus:ring-2 focus:ring-[#1dbf73]/20 focus:border-[#1dbf73] transition-all text-[15px]"
                />
                <button 
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#b5b6ba] hover:text-[#404145] transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className={`w-full bg-[#1dbf73] text-white py-3 rounded-[4px] font-bold text-[16px] hover:bg-[#19a463] transition-all flex items-center justify-center gap-2 mt-4 shadow-sm ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Continue <ArrowRight size={18} /></>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#e4e5e7]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-[#b5b6ba] font-medium uppercase tracking-widest text-[11px]">OR</span>
            </div>
          </div>

          <div className="space-y-3">
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#e4e5e7] rounded-[4px] font-bold text-[#404145] hover:bg-gray-50 transition-all text-[15px]">
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/><path d="M3.964 10.706A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.706V4.962H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.038l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.962L3.964 7.294C4.672 5.167 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-[#e4e5e7] rounded-[4px] font-bold text-[#404145] hover:bg-gray-50 transition-all text-[15px]">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm3 8h-1.35c-.538 0-.65.221-.65.778v1.222h2l-.209 2h-1.791v7h-3v-7h-2v-2h2v-2.308c0-1.769.931-2.692 3.029-2.692h1.971v3z"/></svg>
              Continue with Facebook
            </button>
          </div>

          <p className="mt-10 text-[12px] text-[#74767e] text-center leading-relaxed">
            By continuing, you agree to Referr's <button className="underline hover:text-[#1dbf73]">Terms of Service</button> and <button className="underline hover:text-[#1dbf73]">Privacy Policy</button>.
          </p>
        </motion.div>
      </main>

      <footer className="py-8 bg-gray-50/50 mt-auto border-t border-gray-100 flex justify-center">
         <p className="text-[13px] text-[#b5b6ba]">© Referr International Ltd. 2026</p>
      </footer>
    </div>
  );
}
