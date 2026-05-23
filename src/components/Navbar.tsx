import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutTemplate,
  Megaphone,
  CheckCircle,
  Menu,
  X,
  ChevronDown,
} from "lucide-react";

export const Logo = ({
  className = "",
  hideText = false,
}: {
  className?: string;
  hideText?: boolean;
}) => {
  return (
    <Link
      to="/"
      className={`flex items-center font-bold text-[#222325] tracking-tighter font-display shrink-0 ${className}`}
    >
      {!hideText && (
        <span className="text-[20px] md:text-[28px] leading-none">Referr</span>
      )}
      <span className="text-[#1dbf73] text-[24px] md:text-[32px] leading-none ml-[-1px]">
        .
      </span>
    </Link>
  );
};

const NavDropdown = ({
  title,
  items,
}: {
  title: string;
  items: {
    name: string;
    to: string;
    description?: string;
    icon?: React.ReactNode;
  }[];
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative h-[80px] flex items-center group/nav"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <button className="flex items-center gap-2 text-[#404145] font-semibold group-hover/nav:text-[#1dbf73] transition-colors text-[16px] h-full bg-transparent outline-none border-none cursor-pointer font-display px-4">
        {title}
        <ChevronDown size={14} className={`transition-transform duration-300 text-slate-400 group-hover/nav:text-[#1dbf73] ${isOpen ? "rotate-180" : ""}`} />
      </button>
      <div className={`absolute bottom-0 left-4 right-4 h-[3px] rounded-t-sm transition-colors duration-200 bg-transparent group-hover/nav:bg-[#1dbf73] ${isOpen ? "bg-[#1dbf73]" : ""}`} />
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute top-full left-0 w-[340px] bg-white border border-slate-100 shadow-[0_12px_44px_rgba(0,0,0,0.12)] z-[100] p-4 rounded-xl"
          >
            <div className="flex flex-col gap-2">
              {items.map((item) => (
                <Link
                  key={item.name}
                  to={item.to}
                  onClick={(e) => {
                    if (item.to.startsWith("/#")) {
                      const id = item.to.substring(2);
                      const el = document.getElementById(id);
                      if (el) {
                        e.preventDefault();
                        el.scrollIntoView({ behavior: "smooth" });
                        setIsOpen(false);
                      }
                    }
                  }}
                  className="flex items-start gap-4 p-4 hover:bg-slate-50 transition-all rounded-xl group/item"
                >
                  {item.icon && (
                    <div className="shrink-0 text-slate-400 group-hover/item:text-[#1dbf73] transition-colors bg-slate-50 p-2.5 rounded-xl group-hover/item:bg-white border border-transparent group-hover/item:border-slate-100">
                      {item.icon}
                    </div>
                  )}
                  <div className="flex flex-col">
                    <span className="text-[16px] font-semibold text-[#404145] leading-tight mb-1">
                      {item.name}
                    </span>
                    {item.description && (
                      <span className="text-[14px] text-[#74767e] leading-snug font-display">
                        {item.description}
                      </span>
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
  variant?: "full" | "skinny" | "onboarding";
  showClientHelper?: boolean;
  showHustlerHelper?: boolean;
  showLoginLink?: boolean;
  showRegisterLink?: boolean;
  userName?: string;
}

export default function Navbar({
  variant = "full",
  showClientHelper = false,
  showHustlerHelper = false,
  showLoginLink = false,
  showRegisterLink = false,
  userName,
}: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const stickyHeaderClasses =
    "sticky top-0 w-full z-[100] bg-white border-b border-slate-100 min-h-[80px] flex items-center shadow-sm transition-all duration-300";

  if (variant === "onboarding" || variant === "skinny") {
    return (
      <header className="fixed top-0 w-full z-[100] bg-white h-[80px] flex items-center border-b border-slate-100">
        <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full flex items-center justify-between h-full">
          <Logo className="scale-[1.3] md:scale-[1.4] origin-left" />
          {showLoginLink && (
            <p className="text-[14px] md:text-[15px] text-[#404145] font-medium hidden sm:block">
              Already have an account?{" "}
              <Link
                to="/signin"
                className="text-[#1dbf73] font-bold hover:underline underline-offset-2"
              >
                Log in
              </Link>
            </p>
          )}
          {showRegisterLink && (
            <p className="text-[14px] md:text-[15px] text-[#404145] font-medium hidden sm:block">
              Don't have an account?{" "}
              <Link
                to="/join"
                className="text-[#1dbf73] font-bold hover:underline underline-offset-2"
              >
                Join Referr
              </Link>
            </p>
          )}
        </div>
      </header>
    );
  }

  return (
    <nav className={stickyHeaderClasses}>
      <div className="max-w-[1400px] mx-auto px-4 md:px-12 w-full flex items-center justify-between h-full">
        {/* Left Side: Hamburger + Logo + Nav */}
        <div className="flex items-center h-full gap-4 md:gap-8">
          {/* Hamburger (Mobile/Tablet) */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 -ml-2 text-slate-700 hover:bg-slate-50 rounded-lg transition-colors lg:hidden active:scale-95"
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          <Logo className="scale-[1.3] md:scale-[1.4] origin-left" />

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-1 h-full ml-10">
            <NavDropdown 
              title="Discover" 
              items={[
                { name: "Top Categories", to: "/#categories", description: "Top referred professional services", icon: <CheckCircle size={20} /> },
                { name: "Success Stories", to: "/#success", description: "What success on Referr looks like", icon: <LayoutTemplate size={20} /> },
                { name: "Community Backing", to: "/#community", description: "A community built on backing", icon: <Megaphone size={20} /> },
              ]}
            />
            <NavDropdown 
              title="Trust & Safety" 
              items={[
                { name: "Hiring on Trust", to: "/#trust", description: "Connect with recommended professionals", icon: <CheckCircle size={20} /> },
                { name: "Reputation Ledger", to: "/#ledger", description: "Turn your circle into wealth", icon: <LayoutTemplate size={20} /> },
                { name: "100% Safe", to: "/#safe", description: "Secure earning & transparent payouts", icon: <Megaphone size={20} /> },
              ]}
            />
            <NavDropdown 
              title="For business" 
              items={[
                { name: "Premium Solutions", to: "/#business", description: "Premium scaling for your business", icon: <Megaphone size={20} /> },
                { name: "Start Simple", to: "/#start-simple", description: "Refer. Hire. Grow together.", icon: <CheckCircle size={20} /> },
              ]}
            />
          </div>
        </div>

        {/* Right Side: Actions */}
        <div className="flex items-center gap-4 md:gap-8">
          <Link
            to="/onboarding"
            className="hidden xl:inline-flex text-[#404145] font-semibold hover:text-[#1dbf73] transition-colors text-[16px] font-display"
          >
            Become a Partner
          </Link>
          <Link
            to="/signin"
            className="hidden sm:inline-flex text-[#404145] font-semibold hover:text-[#1dbf73] transition-colors text-[16px] font-display px-2"
          >
            Sign In
          </Link>
          <Link
            to="/onboarding"
            className="border border-[#1dbf73] text-[#1dbf73] px-4 md:px-5 py-1.5 md:py-2 rounded-[4px] font-semibold text-[14px] md:text-[16px] hover:bg-[#1dbf73] hover:text-white transition-all font-display shadow-sm active:scale-95"
          >
            Join
          </Link>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute top-full left-0 w-full bg-white border-t border-slate-100 overflow-hidden shadow-xl z-[90] lg:hidden"
          >
            <div className="p-8 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <span className="text-[12px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2">Main Menu</span>
                <Link to="/tasks" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#404145] hover:text-[#1dbf73] py-2">Ways to earn</Link>
                <Link to="/payouts" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#404145] hover:text-[#1dbf73] py-2">Payouts</Link>
                <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#404145] hover:text-[#1dbf73] py-2">About</Link>
                <Link to="/business" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#404145] hover:text-[#1dbf73] py-2">For business</Link>
                <Link to="/signin" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-bold text-[#404145] hover:text-[#1dbf73] py-2">Sign In</Link>
              </div>
              <div className="pt-6 border-t border-slate-100 flex flex-col gap-4">
                <Link to="/onboarding" onClick={() => setIsMobileMenuOpen(false)} className="w-full bg-[#1dbf73] text-white py-4 rounded-lg font-bold text-center shadow-lg text-lg">Join Referr</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-[80px] bg-slate-900/40 backdrop-blur-sm z-[80] lg:hidden"
          />
        )}
      </AnimatePresence>
    </nav>
  );
}

