import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from './Navbar';

export default function OnboardingSelection() {
  const navigate = useNavigate();

  const handleRoleSelection = (selectedRole: 'client' | 'freelancer') => {
    if (selectedRole === 'client') {
      navigate('/signup/business');
    } else {
      navigate('/signup/hustler');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans flex flex-col items-center">
      <Navbar variant="skinny" />
      
      <main className="flex-1 w-full flex flex-col items-center justify-center pt-[80px] py-12 px-6">
        <div className="w-full max-w-[800px]">
          <div className="text-center mb-12">
            <h1 className="text-[32px] md:text-[32px] font-bold text-[#001e00] mb-4 font-display tracking-tight">
              Join the Referr ecosystem
            </h1>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Client Option */}
            <button
              onClick={() => handleRoleSelection('client')}
              className="relative flex flex-col p-8 border-2 border-slate-100 hover:border-[#1dbf73] transition-all duration-200 text-left rounded-[12px] group bg-white cursor-pointer hover:shadow-lg"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 self-start text-[#001e00] group-hover:text-[#1dbf73] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" data-name="Layer 1" viewBox="0 0 24 24" role="img" width="40" height="40">
                      <path fill="none" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19.28 21h-6.9a1.6 1.6 0 01-1.73-1.5v-4a1.6 1.6 0 011.73-1.5h6.9A1.59 1.59 0 0121 15.5v4a1.66 1.66 0 01-1.72 1.5z"></path>
                      <path fill="none" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.9 12h-2.15a.65.65 0 00-.72.66V14h3.59v-1.34a.65.65 0 00-.72-.66z"></path>
                      <line x1="10.65" x2="21" y1="17.29" y2="17.29" fill="none" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></line>
                      <circle cx="10.04" cy="5.73" r="2.73" fill="none" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></circle>
                      <path fill="none" vectorEffect="non-scaling-stroke" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 18.45v-.9a7 7 0 017-7h.09a6.73 6.73 0 011.91.27"></path>
                    </svg>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[20px] font-bold text-[#001e00] leading-tight font-display">
                      I'm a business, hiring trusted experts
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#5e6d55] font-display leading-relaxed">
                    Source and hire talent backed by professional referrals and verified track records.
                  </p>
                </div>
              </div>
            </button>

            {/* Freelancer Option */}
            <button
              onClick={() => handleRoleSelection('freelancer')}
              className="relative flex flex-col p-8 border-2 border-slate-100 hover:border-[#1dbf73] transition-all duration-200 text-left rounded-[12px] group bg-white cursor-pointer hover:shadow-lg"
            >
              <div className="flex flex-col h-full">
                <div className="mb-6 self-start text-[#001e00] group-hover:text-[#1dbf73] transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" aria-hidden="true" viewBox="0 0 24 24" role="img" width="40" height="40">
                      <path vectorEffect="non-scaling-stroke" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9.43 21H5.99M3 18.45v-.9a7 7 0 017-7h.09a6.94 6.94 0 013.79 1.12m5.5 9.33h-11L10 14h11l-1.62 7zm-4.69-3a.5.5 0 100-1 .5.5 0 000 1zM12.77 5.73a2.73 2.73 0 11-5.46 0 2.73 2.73 0 015.46 0z"></path>
                    </svg>
                </div>
                <div className="mt-4">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-[20px] font-bold text-[#001e00] leading-tight font-display">
                      I'm an expert, looking to join a referral network
                    </h3>
                  </div>
                  <p className="text-[14px] text-[#5e6d55] font-display leading-relaxed">
                    Build your professional reputation, get referred for top-tier work, and earn more.
                  </p>
                </div>
              </div>
            </button>
          </div>

          <div className="text-center pt-8">
            <p className="text-[16px] text-[#001e00] font-display">
              Already have an account? <Link to="/signin" className="text-[#1dbf73] font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
