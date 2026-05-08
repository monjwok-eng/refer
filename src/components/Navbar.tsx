import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { LayoutTemplate, Megaphone, CheckCircle, Wallet } from 'lucide-react';

export const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-baseline font-black text-[#404145] tracking-tighter font-display ${className}`}>
    <span className="text-[32px] leading-none">Referr</span>
    <span className="text-[#1dbf73] text-[36px] leading-none ml-[0.5px]">.</span>
  </Link>
);

const NavDropdown = ({ title, items }: { title: string, items: { name: string, to: string, description?: string, icon?: React.ReactNode }[] }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative group" onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
      <button className="flex items-center gap-1 text-[#62646a] font-bold hover:text-[#1dbf73] transition-colors text-[16px] h-[80px] bg-transparent outline-none border-none cursor-pointer font-display">
        {title}
        <span className={`flex items-center transition-transform duration-300 ml-1 ${isOpen ? 'rotate-180' : ''}`}>
          <svg width="11" height="7" viewBox="0 0 11 7" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className={`absolute top-[80px] ${title === 'Referr Network' ? 'left-0' : 'left-0'} mt-0 ${title === 'Referr Network' ? 'w-[450px]' : 'w-[280px]'} bg-white border border-slate-200 shadow-[0_8px_24px_rgba(0,0,0,0.15)] z-50 p-4 rounded-[8px]`}
          >
            <div className="flex flex-col gap-2">
              {items.map(item => (
                <Link
                  key={item.name}
                  to={item.to}
                  className="flex items-start gap-4 p-4 hover:bg-[#f5f5f5] transition-colors rounded-[8px] group/item"
                >
                  {item.icon && (
                    <div className="shrink-0 text-[#404145] group-hover/item:text-[#1dbf73] transition-colors">
                      {item.icon}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[16px] font-bold text-[#404145] leading-tight mb-1">{item.name}</span>
                    {item.description && (
                      <span className="text-[14px] text-[#74767e] leading-snug">{item.description}</span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface NavbarProps {
  variant?: 'full' | 'skinny' | 'onboarding';
  showClientHelper?: boolean;
  showHustlerHelper?: boolean;
  userName?: string;
}

export default function Navbar({ 
  variant = 'full', 
  showClientHelper = false,
  showHustlerHelper = false,
  userName 
}: NavbarProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const commonClasses = "fixed top-0 w-full z-50 bg-white border-b border-slate-200 h-[80px] flex items-center";
  const innerClasses = "w-full px-8 flex justify-between items-center h-full";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (variant === 'onboarding') {
    return (
      <header className="fixed top-0 w-full z-50 bg-white h-[60px] flex items-center border-b border-slate-100">
        <div className="w-full px-6 flex items-center justify-between h-full">
          <Link to="/create-profile" className="flex items-center font-black text-[#404145] tracking-tighter font-display">
            <span className="text-[24px] leading-none">Referr</span>
            <span className="text-[#1dbf73] text-[28px] leading-none ml-[0.5px]">.</span>
          </Link>
          {userName && (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full hover:bg-slate-100 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600 text-sm">
                    {userName[0].toUpperCase()}
                  </div>
                  <span className="text-sm font-medium text-slate-800">{userName}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-lg py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                        {userName[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{userName}</div>
                        <div className="text-sm text-slate-500">Referer</div>
                      </div>
                    </div>
                    <ul className="py-2">
                       <li className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</li>
                      <li>
                        <Link to="/freelancers/settings/close-account" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          Close Account
                        </Link>
                      </li>
                      <li>
                        <button type="button" className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
          )}
        </div>
      </header>
    );
  }

  if (variant === 'skinny') {
    return (
      <header className={commonClasses}>
        <div className={innerClasses}>
          <div className="flex items-center">
            <Logo />
          </div>
          <div className="flex items-center gap-4">
            {showClientHelper && (
              <div className="text-[15px] mr-4 font-display">
                <span className="text-black font-medium">Here to hire talent? </span>
                <Link to="/signup/business" className="text-[#1dbf73] font-semibold hover:underline ml-1">Join as a client</Link>
              </div>
            )}
            {showHustlerHelper && (
              <div className="text-[15px] mr-4 font-display">
                <span className="text-black font-medium">Looking to join as a hustler? </span>
                <Link to="/signup/hustler" className="text-[#1dbf73] font-semibold hover:underline ml-1">Sign up as Hustler</Link>
              </div>
            )}
            {userName && (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-10 h-10 rounded-full bg-[#1dbf73]/10 flex items-center justify-center text-[#1dbf73] font-bold border border-[#1dbf73]/20"
                >
                  {userName[0].toUpperCase()}
                </button>
                {isDropdownOpen && (
                  <div className="absolute top-full right-0 mt-2 w-64 bg-white border border-slate-200 shadow-xl rounded-lg py-2 z-50">
                    <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center font-bold text-slate-600">
                        {userName[0].toUpperCase()}
                      </div>
                      <div>
                        <div className="font-bold text-slate-800">{userName}</div>
                        <div className="text-sm text-slate-500">Referer</div>
                      </div>
                    </div>
                    <ul className="py-2">
                       <li className="px-4 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">Account</li>
                      <li>
                        <Link to="/freelancers/settings/close-account" className="flex items-center px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                          Close Account
                        </Link>
                      </li>
                      <li>
                        <button type="button" className="flex items-center w-full px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                          <svg className="w-4 h-4 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                          Log out
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>
    );
  }

  return (
    <nav className={commonClasses}>
      <div className={innerClasses}>
        <div className="flex items-center">
          <Logo />
        </div>
        <div className="flex items-center gap-[40px]">
          <div className="hidden lg:flex items-center gap-[40px]">
            <NavDropdown
              title="Why Referr?"
              items={[
                {
                  name: "Built on Trust",
                  to: "/about",
                  description: "Learn how we use social proof to guarantee quality and reliability.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 48 48">
                      <path fill="#fff" d="M37.25 4.25a2 2 0 0 1 2 2v36a2 2 0 0 1-2 2h-26a2 2 0 0 1-2-2v-36a2 2 0 0 1 2-2z" stroke="#C5C6C9" strokeWidth="1.5"></path>
                      <path d="M24 12a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM16 28c0-4.418 3.582-8 8-8s8 3.582 8 8v2H16v-2Z" fill="#1dbf73"></path>
                    </svg>
                  )
                },
                {
                  name: "Community First",
                  to: "/community",
                  description: "Join a curated network of professionals who vouch for each other.",
                  icon: (
                    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 48 48">
                      <circle cx="24" cy="23.512" r="19.5" stroke="#C5C6C9" strokeWidth="1.5" fill="#fff"></circle>
                      <path d="M24 16a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM16 32c0-4.418 3.582-8 8-8s8 3.582 8 8v2H16v-2Z" fill="#1dbf73"></path>
                    </svg>
                  )
                }
              ]}
            />
            <NavDropdown
              title="Explore"
              items={[
                { name: 'Discover', to: '/discover', description: 'Inspiration from real projects', icon: <LayoutTemplate size={24} /> },
                { name: 'Guides', to: '/guides', description: 'Expert advice for your business', icon: <Megaphone size={24} /> },
                { name: 'Learn', to: '/learn', description: 'Professional online courses', icon: <CheckCircle size={24} /> },
                { name: 'Logo Maker', to: '/logo-maker', description: 'Create a logo in minutes', icon: <Wallet size={24} /> }
              ]}
            />
          </div>
          <button className="hidden lg:flex items-center gap-1.5 text-[#62646a] font-bold hover:text-[#1dbf73] transition-colors text-[16px] font-display bg-transparent border-none cursor-pointer">
            <svg width="20" height="20" viewBox="0 0 18 18" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M9 1C4.58875 1 1 4.58875 1 9C1 13.4113 4.58875 17 9 17C13.4113 17 17 13.4113 17 9C17 4.58875 13.4113 1 9 1ZM8.53125 4.92676C7.81812 4.89612 7.11218 4.7959 6.43811 4.63293C6.54578 4.37781 6.6626 4.13281 6.78857 3.90063C7.30542 2.94824 7.93994 2.27991 8.53125 2.03784V4.92676ZM8.53125 5.86499V8.53125H5.60339C5.64465 7.4906 5.82202 6.45752 6.11536 5.51782C6.8927 5.71362 7.70874 5.83215 8.53125 5.86499ZM8.53125 9.46875V12.135C7.70874 12.1678 6.8927 12.2864 6.11536 12.4822C5.82202 11.5425 5.64465 10.5094 5.60339 9.46875H8.53125ZM8.53125 13.0732V15.9622C7.93994 15.7201 7.30542 15.0518 6.78857 14.0994C6.6626 13.8672 6.54578 13.6222 6.43811 13.3671C7.11218 13.2041 7.81799 13.1039 8.53125 13.0732ZM9.46875 13.0732C10.1819 13.1039 10.8878 13.2041 11.5619 13.3671C11.4542 13.6222 11.3374 13.8672 11.2114 14.0994C10.6946 15.0518 10.0601 15.7201 9.46875 15.9622V13.0732ZM9.46875 12.135V9.46875H12.3966C12.3553 10.5094 12.178 11.5425 11.8846 12.4822C11.1073 12.2864 10.2913 12.1678 9.46875 12.135ZM9.46875 8.53125V5.86499C10.2913 5.83215 11.1073 5.71362 11.8846 5.51782C12.178 6.45752 12.3553 7.4906 12.3966 8.53125H9.46875ZM9.46875 4.92676V2.03784C10.0601 2.27991 10.6946 2.94824 11.2114 3.90063C11.3374 4.13281 11.4542 4.37781 11.5619 4.63293C10.8878 4.7959 10.1819 4.89612 9.46875 4.92676ZM12.0354 3.45349C11.8007 3.02087 11.5457 2.63953 11.2769 2.31421C12.2141 2.63428 13.0631 3.14636 13.7771 3.8031C13.3699 4.02124 12.931 4.21069 12.4694 4.36902C12.3384 4.0509 12.1936 3.74487 12.0354 3.45349ZM5.9646 3.45349C5.8064 3.74487 5.66162 4.0509 5.53064 4.36902C5.06897 4.21069 4.63013 4.02112 4.2229 3.8031C4.93689 3.14636 5.78589 2.63428 6.72314 2.31421C6.45435 2.63953 6.19946 3.02075 5.9646 3.45349ZM5.2135 5.25012C4.89355 6.27368 4.70544 7.38953 4.66492 8.53125H1.95349C2.05383 7.00769 2.63892 5.61438 3.5564 4.50525C4.06555 4.79724 4.62317 5.047 5.2135 5.25012ZM4.66492 9.46875C4.70544 10.6106 4.89355 11.7263 5.2135 12.7499C4.62317 12.953 4.06555 13.2028 3.5564 13.4948C2.63892 12.3856 2.05383 10.9923 1.95349 9.46875H4.66492ZM5.53064 13.631C5.66162 13.9491 5.8064 14.2551 5.9646 14.5465C6.19946 14.9791 6.45435 15.3605 6.72314 15.6858C5.78589 15.3657 4.93689 14.8536 4.22302 14.1969C4.63 13.9789 5.06897 13.7893 5.53064 13.631ZM12.0354 14.5465C12.1936 14.2551 12.3384 13.9491 12.4694 13.631C12.931 13.7893 13.3699 13.9789 13.7771 14.1969C13.0631 14.8536 12.2141 15.3657 11.2769 15.6858C11.5457 15.3605 11.8005 14.9792 12.0354 14.5465ZM12.7865 12.7499C13.1064 11.7263 13.2946 10.6105 13.3351 9.46875H16.0465C15.9462 10.9923 15.3611 12.3856 14.4436 13.4948C13.9344 13.2028 13.3768 12.953 12.7865 12.7499ZM13.3351 8.53125C13.2946 7.3894 13.1064 6.27368 12.7865 5.25012C13.3768 5.047 13.9344 4.79724 14.4436 4.50525C15.3611 5.61438 15.9462 7.00769 16.0465 8.53125H13.3351Z" strokeWidth="0.2"></path></svg>
            <span>EN</span>
          </button>
          <Link to="/partner" className="hidden lg:block text-[#62646a] font-bold hover:text-[#1dbf73] transition-colors text-[16px] font-display">Become a Partner</Link>
          <Link to="/signin" className="text-[#62646a] font-bold hover:text-[#1dbf73] transition-colors text-[16px] font-display">Sign in</Link>
          <Link to="/onboarding" className="text-[#1dbf73] border border-[#1dbf73] px-[22px] py-[8px] rounded-[4px] font-bold text-[16px] hover:bg-[#1dbf73] hover:text-white transition font-display">
            Join
          </Link>
        </div>
      </div>
    </nav>
  );
}
