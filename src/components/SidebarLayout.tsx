import { ReactNode } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  LayoutDashboard, 
  Wallet, 
  Search, 
  User, 
  MessageSquare, 
  Settings,
  LogOut,
  Bell,
  ChevronRight
} from 'lucide-react';
import { Logo } from './Navbar';

interface SidebarLayoutProps {
  children: ReactNode;
  title: string;
}

export default function SidebarLayout({ children, title }: SidebarLayoutProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const userType = localStorage.getItem('userType') || 'hustler';
  const name = userType === 'business' 
    ? (localStorage.getItem('businessName') || 'Business') 
    : (localStorage.getItem('hustlerName') || 'Hustler');
  const firstName = name.split(' ')[0];

  const NavItem = ({ to, icon: Icon, label, hidden }: { to: string, icon: any, label: string, hidden?: boolean }) => {
    if (hidden) return null;
    const active = location.pathname === to;
    return (
      <Link 
        to={to} 
        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          active 
            ? 'bg-[#1dbf73]/10 text-[#1dbf73] font-semibold' 
            : 'text-[#62646a] hover:bg-gray-100 hover:text-[#222325]'
        }`}
      >
        <Icon size={20} className={`${active ? 'text-[#1dbf73]' : 'text-[#74767e] group-hover:text-[#222325]'}`} />
        <span className="text-[15px]">{label}</span>
        {active && <motion.div layoutId="activeNav" className="ml-auto w-1 h-5 bg-[#1dbf73] rounded-full" />}
      </Link>
    );
  };

  return (
    <div className="min-h-screen bg-[#f7f7f7] flex font-sans text-[#222325]">
      {/* Sidebar */}
      <aside className="w-72 bg-white border-r border-[#e4e5e7] flex flex-col sticky top-0 h-screen overflow-y-auto hidden lg:flex">
        <div className="p-8">
          <Logo />
        </div>
        
        <nav className="flex-1 px-4 space-y-1">
          <div className="px-4 text-[12px] font-bold text-[#b5b6ba] uppercase tracking-wider mb-4 mt-2">Workspace</div>
          <NavItem to="/dashboard" icon={LayoutDashboard} label="Overview" />
          <NavItem 
            to="/deals" 
            icon={Search} 
            label={userType === 'business' ? 'Find referrers' : 'Explore Deals'} 
          />
          <NavItem 
            to="/wallet" 
            icon={Wallet} 
            label={userType === 'business' ? 'Payments' : 'Commissions'} 
          />
          <NavItem to="/messages" icon={MessageSquare} label="Inbox" />
          
          <div className="px-4 text-[12px] font-bold text-[#b5b6ba] uppercase tracking-wider mb-4 mt-8">Account</div>
          <NavItem to="/profile" icon={User} label="Profile" />
          <NavItem to="/settings" icon={Settings} label="Settings" />
        </nav>

        <div className="p-4 border-t border-[#e4e5e7]">
          <button 
            onClick={() => { localStorage.clear(); navigate('/'); }}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[#62646a] hover:bg-red-50 hover:text-red-600 transition-colors"
          >
            <LogOut size={20} />
            <span className="text-[15px] font-medium">Log out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-[80px] bg-white border-b border-[#e4e5e7] px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="lg:hidden">
            <Logo />
          </div>
          
          <div className="hidden lg:flex items-center gap-2 text-[14px] text-[#62646a]">
            {location.pathname.split('/').filter(Boolean).map((path, index, arr) => (
              <div key={path} className="flex items-center gap-2 uppercase tracking-tight font-medium">
                <span className={index === arr.length - 1 ? "text-[#222325]" : "text-[#62646a]"}>
                  {path}
                </span>
                {index < arr.length - 1 && <ChevronRight size={14} />}
              </div>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button className="relative p-2 text-[#74767e] hover:text-[#222325] transition-colors">
              <Bell size={22} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <Link to="/profile" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#1dbf73] flex items-center justify-center text-white font-bold text-lg border-2 border-transparent group-hover:border-[#1dbf73]/30 transition-all">
                {firstName[0]}
              </div>
              <div className="hidden md:block">
                <p className="text-[14px] font-bold leading-none mb-1 group-hover:text-[#1dbf73] transition-colors">{name}</p>
                <p className="text-[12px] text-[#74767e]">Verified Member</p>
              </div>
            </Link>
          </div>
        </header>

        <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
