import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2, AlertCircle } from 'lucide-react';
import Navbar from './Navbar';

export default function HustlerSignup() {
  const [codeSent, setCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [timer, setTimer] = useState(0);
  const [formData, setFormData] = useState({ 
    firstName: '', 
    lastName: '', 
    phone: '', 
    otp: '',
    terms: false,
    promo: false 
  });
  const navigate = useNavigate();

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.firstName || !formData.lastName || !formData.phone) {
      setError('Please fill in all identity fields.');
      return;
    }
    
    setLoading(true);
    // Simulate sending OTP
    setTimeout(() => {
        setLoading(false);
        setCodeSent(true);
        setTimer(60); // 60 seconds expiry
    }, 1500);
  };

  const handleVerifyAndSignup = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (timer === 0 && codeSent) {
      setError('Your verification code has expired. Please request a new one.');
      return;
    }

    if (!formData.terms) {
      setError('You must agree to the Terms of Service to create an account.');
      return;
    }

    if (formData.otp.length !== 6) {
      setError('Please enter a valid 6-digit code.');
      return;
    }

    setLoading(true);
    // Simulate verification
    setTimeout(() => {
        setLoading(false);
        localStorage.setItem('hustlerName', `${formData.firstName} ${formData.lastName}`);
        localStorage.setItem('isAuthenticated', 'true');
        navigate('/welcome');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#404145]">
      <Navbar variant="skinny" showClientHelper={true} />

      <main className="w-full flex-1 flex flex-col items-center pt-10 pb-16 px-4">
        <div className="w-full max-w-[480px]">
          <header className="text-center mb-8">
            <h2 className="text-[28px] font-bold text-[#001e00] tracking-tight">
              Sign up to find work you love
            </h2>
          </header>

          {/* SSO Buttons */}
          {!codeSent && (
            <div className="space-y-3 mb-6">
              <button className="flex items-center justify-center gap-3 w-full h-[44px] border border-slate-300 rounded hover:border-slate-400 transition-all bg-white font-medium text-[15px]">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M15.117 3a3.908 3.908 0 01-.87 2.918 3.607 3.607 0 01-2.778 1.409 3.657 3.657 0 01.9-2.848A4.287 4.287 0 0115.117 3z" />
                  <path d="M18.295 18.381c.453-.69.844-1.42 1.17-2.178a3.997 3.997 0 01-.53-7.204 4.586 4.586 0 00-3.458-1.83c-.705.01-1.401.16-2.048.44-.433.22-.905.353-1.389.39a4.726 4.726 0 01-1.559-.36c-.6-.25-1.24-.388-1.888-.41a4.676 4.676 0 00-3.777 2.26c-1.31 1.998-1.09 5.805.999 8.992.79 1.2 1.808 2.508 3.127 2.508.46-.01.91-.123 1.32-.33a3.997 3.587 0 013.587 0c.395.217.838.334 1.289.34 1.329-.01 2.398-1.459 3.157-2.618z" />
                </svg>
                Continue with Apple
              </button>
              <button className="flex items-center justify-center gap-3 w-full h-[44px] border border-slate-300 rounded hover:border-slate-400 transition-all bg-white font-medium text-[15px]">
                <svg className="w-5 h-5" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                  <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" />
                  <path fill="#FBBC05" d="M3.964 10.71a5.41 5.41 0 0 1 0-3.42V4.958H.957a8.991 8.991 0 0 0 0 8.084l3.007-2.332z" />
                  <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z" />
                </svg>
                Continue with Google
              </button>
            </div>
          )}

          {!codeSent && (
            <div className="relative flex items-center justify-center my-6">
              <div className="absolute inset-x-0 top-1/2 border-t border-slate-200"></div>
              <span className="relative px-4 bg-white text-slate-400 text-[13px]">or</span>
            </div>
          )}

          <form onSubmit={codeSent ? handleVerifyAndSignup : handleSendOtp} className="space-y-4">
            {!codeSent && (
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label htmlFor="firstName" className="text-[13px] font-bold text-black mb-1.5 ml-1">First name</label>
                  <input 
                    id="firstName"
                    type="text" 
                    required 
                    className="w-full h-[44px] px-3 border border-slate-300 rounded focus:outline-none focus:border-[#1dbf73] transition-all text-[15px]"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="lastName" className="text-[13px] font-bold text-black mb-1.5 ml-1">Last name</label>
                  <input 
                    id="lastName"
                    type="text" 
                    required 
                    className="w-full h-[44px] px-3 border border-slate-300 rounded focus:outline-none focus:border-[#1dbf73] transition-all text-[15px]"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className="text-[13px] font-bold text-black mb-1.5 ml-1">{codeSent ? 'Verification Code (sent to ' + formData.phone + ')' : 'Phone number'}</label>
              {!codeSent ? (
                <div className="flex gap-2">
                    <input 
                        id="phone"
                        type="tel" 
                        required 
                        placeholder="+256 000 000 000"
                        className="flex-1 h-[44px] px-3 border border-slate-300 rounded focus:outline-none focus:border-[#1dbf73] transition-all text-[15px]"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                    <button
                        type="button"
                        onClick={handleSendOtp}
                        disabled={!formData.phone || loading || !formData.firstName || !formData.lastName}
                        className="px-4 h-[44px] bg-[#1dbf73] text-white rounded font-semibold text-[14px] hover:bg-[#19a463] transition-all disabled:opacity-50"
                    >
                        {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Send'}
                    </button>
                </div>
              ) : (
                <input 
                    id="otp"
                    type="text"
                    maxLength={6}
                    required
                    placeholder="000000"
                    className="w-full h-[44px] px-3 border border-slate-300 rounded focus:outline-none focus:border-[#1dbf73] transition-all text-[15px] font-mono tracking-[4px]"
                    value={formData.otp}
                    onChange={(e) => setFormData({...formData, otp: e.target.value})}
                />
              )}
            </div>

            {codeSent && (
              <div className="space-y-4 pt-2">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="mt-1 w-4 h-4 accent-[#1dbf73]"
                    checked={formData.promo}
                    onChange={(e) => setFormData({...formData, promo: e.target.checked})} 
                  />
                  <span className="text-[14px] text-slate-600 leading-snug">
                    Send me helpful emails to find rewarding work.
                  </span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input 
                    type="checkbox" 
                    required 
                    className="mt-1 w-4 h-4 accent-[#1dbf73]"
                    checked={formData.terms}
                    onChange={(e) => setFormData({...formData, terms: e.target.checked})} 
                  />
                  <span className="text-[14px] text-slate-600 leading-snug">
                    Yes, I agree to the <Link to="/terms" className="text-[#1dbf73]">Terms of Service</Link>, <Link to="/agreement" className="text-[#1dbf73]">User Agreement</Link>, and <Link to="/privacy" className="text-[#1dbf73]">Privacy Policy</Link>.
                  </span>
                </label>
              </div>
            )}

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 p-3 rounded text-red-600 text-[13px]"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button 
                type="submit" 
                disabled={loading || (codeSent ? formData.otp.length !== 6 || !formData.terms : !formData.phone)}
                className={`w-full h-[44px] rounded font-semibold text-[15px] transition-all ${
                    (loading || (codeSent ? formData.otp.length !== 6 || !formData.terms : !formData.phone))
                    ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                    : 'bg-[#1dbf73] text-white hover:bg-[#19a463]'
                }`}
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (codeSent ? 'Create Account' : 'Continue')}
            </button>

            <div className="text-center text-[14px] pt-4">
                <span className="text-slate-600">Already have an account? </span>
                <Link to="/signin" className="text-[#1dbf73] font-semibold hover:underline">Log In</Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );

}

