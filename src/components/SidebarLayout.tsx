import { ReactNode, useState, useEffect } from "react";
import { Link, useNavigate, useLocation, Outlet } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  LayoutDashboard,
  Wallet,
  Search,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Plus,
  HelpCircle,
  Menu,
  X,
  ChevronDown,
  Briefcase,
  PenTool,
  BarChart,
  Smartphone,
  FolderOpen,
  Heart,
  Users,
  DollarSign,
  Bell,
  PieChart,
} from "lucide-react";
import { Logo } from "./Navbar";
import { logout } from "../services/authService";

export default function SidebarLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    setIsProfileOpen(false);
    await logout();
    navigate("/signin");
  };
  const storedUserType = localStorage.getItem("userType") || "hustler";

  // Auto-switch mode globally if they land on a specific dashboard route
  useEffect(() => {
    if (
      location.pathname.startsWith("/business/") ||
      location.pathname === "/dashboard/business"
    ) {
      localStorage.setItem("userType", "business");
    } else if (
      location.pathname.startsWith("/hustler/") ||
      location.pathname === "/dashboard/hustler"
    ) {
      localStorage.setItem("userType", "hustler");
    }
  }, [location.pathname]);

  const isBusinessRoute =
    location.pathname.startsWith("/business/") ||
    location.pathname === "/dashboard/business" ||
    (location.pathname === "/dashboard/analytics" && localStorage.getItem("userType") === "business") ||
    location.pathname === "/dashboard/blog" ||
    location.pathname === "/dashboard/deals" ||
    location.pathname === "/site-app" ||
    location.pathname === "/editor";

  const isHustlerRoute =
    location.pathname.startsWith("/hustler/") ||
    location.pathname === "/dashboard/hustler" ||
    location.pathname === "/deals" ||
    location.pathname.startsWith("/deal/") ||
    location.pathname === "/profile" ||
    (location.pathname === "/dashboard/analytics" && localStorage.getItem("userType") === "hustler");

  const userType = isBusinessRoute
    ? "business"
    : isHustlerRoute
      ? "hustler"
      : localStorage.getItem("userType") || "hustler";

  const name =
    userType === "business"
      ? localStorage.getItem("businessName") || "Business"
      : localStorage.getItem("hustlerName") || "Hustler";
  const firstName = name.split(" ")[0];

  const userPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";

  const [isExpanded, setIsExpanded] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    const fetchNotifications = () => {
      const type = localStorage.getItem("userType") || "hustler";
      let key = "";
      
      if (type === "business") {
        const bName = localStorage.getItem("businessName") || "Business";
        key = `notifications_${bName}`;
      } else {
        const hName = localStorage.getItem("hustlerName") || "Hustler";
        key = `hustler_notifications_${hName}`;
      }
      
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      setNotifications(saved);
    };

    fetchNotifications();
    // Refresh notifications every 2 seconds to simulate real-time
    const interval = setInterval(fetchNotifications, 2000);
    
    window.addEventListener('storage', fetchNotifications);
    window.addEventListener('referr-notification-update', fetchNotifications);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', fetchNotifications);
      window.removeEventListener('referr-notification-update', fetchNotifications);
    };
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const clearAllNotifications = () => {
    const type = localStorage.getItem("userType") || "hustler";
    let key = "";
    
    if (type === "business") {
      const bName = localStorage.getItem("businessName") || "Business";
      key = `notifications_${bName}`;
    } else {
      const hName = localStorage.getItem("hustlerName") || "Hustler";
      key = `hustler_notifications_${hName}`;
    }
    
    localStorage.setItem(key, "[]");
    setNotifications([]);
    window.dispatchEvent(new Event("referr-notification-update"));
  };

  const markAsRead = (id: number) => {
    const type = localStorage.getItem("userType") || "hustler";
    let key = "";
    
    if (type === "business") {
      const bName = localStorage.getItem("businessName") || "Business";
      key = `notifications_${bName}`;
    } else {
      const hName = localStorage.getItem("hustlerName") || "Hustler";
      key = `hustler_notifications_${hName}`;
    }
    
    const updated = notifications.map(n => n.id === id ? { ...n, unread: false } : n);
    localStorage.setItem(key, JSON.stringify(updated));
    setNotifications(updated);
    window.dispatchEvent(new Event("referr-notification-update"));
  };

  const toggleSidebar = () => {
    const newState = !isExpanded;
    setIsExpanded(newState);
    setIsNotificationsOpen(false);
    setIsProfileOpen(false);
    if (window.innerWidth >= 1024) {
      localStorage.setItem("sidebar_expanded", String(newState));
    }
  };

  // Close menus when clicking elsewhere
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.dropdown-trigger')) {
        setIsAccountMenuOpen(false);
        setIsProfileOpen(false);
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const closeMobileSidebar = () => {
    if (window.innerWidth < 1024) {
      setIsExpanded(false);
    }
  };

  const NavItem = ({
    to,
    icon: Icon,
    label,
    badge,
  }: {
    to: string;
    icon: any;
    label: string;
    badge?: string;
  }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={closeMobileSidebar}
        title={isExpanded ? "" : label}
        className={`flex items-center py-2 mx-2 rounded-lg transition-all duration-200 group relative ${
          active
            ? "bg-[#ffffff12] text-[#1dbf73]"
            : "text-[#a4a4a4] hover:text-white hover:bg-[#ffffff08]"
        }`}
      >
        {/* Fixed-width container for Icon - keeps it perfectly stable during transition */}
        <div className="w-12 h-11 flex items-center justify-center shrink-0 ml-1">
          <Icon
            size={18}
            strokeWidth={1.5}
            className={`${active ? "text-[#1dbf73]" : "text-[#a4a4a4] group-hover:text-white transition-colors"}`}
          />
        </div>
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap pr-4 ml-3"
            >
              <span className="text-[14px] font-medium tracking-tight">
                {label}
              </span>
              {badge && (
                <span className="bg-[#1dbf73] text-[8px] font-black text-white px-1.5 py-0.5 rounded ml-2 shrink-0 tracking-widest uppercase">
                  {badge}
                </span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
        {active && !isExpanded && (
          <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#1dbf73] rounded-r" />
        )}
      </Link>
    );
  };

  const SubNavItem = ({
    to,
    label,
    badge,
  }: {
    to: string;
    label: string;
    badge?: string;
  }) => {
    const active = location.pathname === to;
    return (
      <Link
        to={to}
        onClick={closeMobileSidebar}
        className={`flex items-center py-2 px-12 relative ${
          active ? "text-[#1dbf73]" : "text-[#a4a4a4] hover:text-white"
        } transition-colors`}
      >
        {active ? (
          <div className="absolute left-[30px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#1dbf73]" />
        ) : (
          <div className="absolute left-[31px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#a4a4a4] opacity-40 group-hover:bg-white group-hover:opacity-100" />
        )}
        <span className="text-[14px] font-medium tracking-tight">{label}</span>
        {badge && (
          <span className="bg-[#1dbf73] text-[8px] font-black text-white px-1.5 py-0.5 rounded ml-2 shrink-0 tracking-widest uppercase">
            {badge}
          </span>
        )}
      </Link>
    );
  };

  const NavFolder = ({
    icon: Icon,
    label,
    children,
    activePaths,
  }: {
    icon: any;
    label: string;
    children: ReactNode;
    activePaths: string[];
  }) => {
    const isActive = activePaths.some((path) =>
      location.pathname.startsWith(path),
    );
    const [isOpen, setIsOpen] = useState(isActive);

    useEffect(() => {
      if (isActive) setIsOpen(true);
    }, [isActive]);

    const handleToggle = () => {
      if (!isExpanded) {
        setIsExpanded(true);
        localStorage.setItem("sidebar_expanded", "true");
        setIsOpen(true);
      } else {
        setIsOpen(!isOpen);
      }
    };

    return (
      <div className="flex flex-col mb-1 relative">
        <button
          onClick={handleToggle}
          title={isExpanded ? "" : label}
          className={`flex items-center py-2 mx-2 rounded-lg transition-all duration-200 group w-[calc(100%-16px)] ${
            (isActive && !isOpen) || (isActive && !isExpanded)
              ? "bg-[#ffffff12] text-[#1dbf73]"
              : "text-[#a4a4a4] hover:text-white hover:bg-[#ffffff08]"
          }`}
        >
          <div className="w-12 h-11 flex items-center justify-center shrink-0 ml-1">
            <Icon
              size={21}
              strokeWidth={1.5}
              className={`${isActive ? "text-[#1dbf73]" : "text-[#a4a4a4] group-hover:text-white transition-colors"}`}
            />
          </div>
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap pr-4 ml-3"
              >
                <span className="text-[14px] font-medium tracking-tight">
                  {label}
                </span>
                <ChevronDown
                  size={16}
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180 text-white" : "text-[#62646a]"}`}
                />
              </motion.div>
            )}
          </AnimatePresence>
          {isActive && (!isOpen || !isExpanded) && (
            <div className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-0.5 h-6 bg-[#1dbf73] rounded-r" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden flex flex-col py-1 relative"
            >
              {/* Folder indicator line */}
              <div className="absolute left-[33px] top-0 bottom-2 w-px bg-[#a4a4a4] opacity-20" />
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  const NavGroup = ({
    label,
    children,
  }: {
    label: string;
    children: ReactNode;
  }) => {
    return (
      <div className="flex flex-col gap-0.5 mb-6">
        <div className="h-4 flex items-center overflow-hidden mb-1">
          <AnimatePresence mode="wait" initial={false}>
            {isExpanded ? (
              <motion.h3
                key="title"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 0.8, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="text-[10px] font-bold text-[#62646a] uppercase tracking-widest px-10"
              >
                {label}
              </motion.h3>
            ) : (
              <motion.div
                key="divider"
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 0.1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="mx-auto h-[1.5px] bg-white w-6"
              />
            )}
          </AnimatePresence>
        </div>
        <div>{children}</div>
      </div>
    );
  };

  const hasSite = localStorage.getItem("site_created") === "true";

  return (
    <div className="min-h-screen bg-white flex font-sans text-gray-900 leading-tight">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsExpanded(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        animate={{ width: isExpanded ? 260 : 80, x: isExpanded ? 0 : 0 }}
        initial={false}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className={`bg-[#1a1a1a] flex flex-col pt-8 fixed lg:sticky top-0 h-screen border-r border-white/5 z-[60] overflow-hidden shrink-0 transition-transform duration-300 ${isExpanded ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        <div className="w-[260px] h-full flex flex-col">
          {/* Brand/Toggle */}
          <div className="flex items-center mb-10 h-10 px-3 shrink-0">
            <div className="w-12 h-10 flex items-center justify-center shrink-0">
              <button
                onClick={toggleSidebar}
                className="text-white hover:bg-white/5 p-2.5 rounded-xl transition-colors"
                aria-label="Toggle Sidebar"
              >
                {isExpanded ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </button>
            </div>
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="ml-2 text-white font-black text-2xl tracking-tighter italic whitespace-nowrap overflow-hidden"
                >
                  Referr
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="flex-1 overflow-y-auto no-scrollbar py-2">
            {userType === "business" ? (
              <>
                <NavGroup label="Insights">
                  <NavItem
                    to="/dashboard/business"
                    icon={LayoutDashboard}
                    label="Command Center"
                  />
                  <NavItem
                    to="/business/analytics"
                    icon={PieChart}
                    label="Analytics"
                  />
                  <NavItem
                    to="/business/referrers"
                    icon={Users}
                    label="Network"
                  />
                </NavGroup>

                <NavGroup label="Financing">
                  <NavItem
                    to="/business/wallet"
                    icon={Wallet}
                    label="Vault"
                  />
                  <NavItem
                    to="/business/payouts"
                    icon={DollarSign}
                    label="Payouts"
                  />
                </NavGroup>

                <NavGroup label="Publishing">
                  <NavFolder
                    icon={Briefcase}
                    label="Opportunities"
                    activePaths={["/dashboard/deals", "/dashboard/blog"]}
                  >
                    <SubNavItem
                      to="/dashboard/deals"
                      label="Manage Deals"
                    />
                    <SubNavItem to="/dashboard/blog" label="Campaigns" />
                  </NavFolder>
                  <NavItem
                    to="/business/favorites"
                    icon={Heart}
                    label="Shortlist"
                  />
                </NavGroup>

                <NavGroup label="Ecosystem">
                  <NavItem
                    to="/site-app"
                    icon={Smartphone}
                    label="Storefront"
                  />
                </NavGroup>
              </>
            ) : (
              <>
                <NavGroup label="Personal">
                  <NavItem
                    to="/dashboard/hustler"
                    icon={LayoutDashboard}
                    label="Dashboard"
                  />
                  <NavItem
                    to="/deals"
                    icon={Search}
                    label="Opportunities"
                  />
                  <NavItem 
                    to="/hustler/wallet" 
                    icon={Wallet} 
                    label="Wallet" 
                  />
                   <NavItem 
                    to="/hustler/analytics" 
                    icon={PieChart} 
                    label="Analytics" 
                  />
                  <NavItem 
                    to="/profile" 
                    icon={User} 
                    label="Public Profile" 
                  />
                </NavGroup>
              </>
            )}
          </div>

          {userType === "business" && (
            <div className="p-2 border-t border-white/5 flex flex-col justify-center shrink-0">
              <NavItem to="/editor" icon={PenTool} label="Edit Site" />
            </div>
          )}
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className={`flex-1 h-screen overflow-y-auto min-w-0 ${isHustlerRoute ? 'bg-[#f7f7f7]' : 'bg-white'}`} id="main-content-wrapper">
        {/* Referr Top Header */}
        <header 
          className={`h-[80px] px-4 md:px-8 flex items-center justify-between transition-all duration-300 sticky top-0 z-50 ${
            isHustlerRoute ? "bg-[#14151e] border-b border-white/5" : "bg-white border-b border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4 md:gap-6">
            <button
              onClick={toggleSidebar}
              className={`lg:hidden p-2 rounded-lg transition-colors ${
                isHustlerRoute ? "text-slate-400 hover:bg-white/5" : "text-slate-600 hover:bg-slate-100"
              }`}
              aria-label={isExpanded ? "Close Mobile Menu" : "Open Mobile Menu"}
            >
              {isExpanded ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
            </button>
            <Logo className={isHustlerRoute ? "invert brightness-200 scale-90 md:scale-100 origin-left" : ""} />
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            {/* Notification Bell */}
            <div className="relative dropdown-trigger">
              <button
                onClick={() => {
                  setIsNotificationsOpen(!isNotificationsOpen);
                  setIsAccountMenuOpen(false);
                  setIsProfileOpen(false);
                }}
                className={`w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all relative ${
                  isHustlerRoute 
                    ? "bg-[#1f212d] text-slate-300 hover:bg-[#2a2d3d]" 
                    : "text-black hover:bg-slate-100"
                }`}
              >
                <Bell size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={2} />
                {unreadCount > 0 && (
                  <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] md:min-w-[20px] md:h-[20px] px-1 bg-[#ff4d4d] rounded-full border-2 border-[#14151e] flex items-center justify-center text-[9px] md:text-[10px] font-black text-white shadow-sm ring-1 ring-white/10">
                    {unreadCount}
                  </div>
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className={`fixed inset-x-4 top-[85px] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-96 rounded-xl shadow-2xl border z-50 overflow-hidden ${
                      isHustlerRoute 
                        ? "bg-[#1f212d] border-white/10" 
                        : "bg-white border-slate-100"
                    }`}
                  >
                    <div className={`px-4 py-3 border-b flex items-center justify-between ${
                      isHustlerRoute ? "border-white/5 bg-[#2a2d3d]/50" : "border-slate-100 bg-slate-50/50"
                    }`}>
                      <span className={`text-sm font-black ${isHustlerRoute ? "text-white" : "text-[#222325]"}`}>Notifications</span>
                      {notifications.length > 0 && (
                        <button 
                          className="text-[10px] font-black text-slate-400 uppercase tracking-wider hover:text-red-500 transition-colors" 
                          onClick={clearAllNotifications}
                        >
                          Clear All
                        </button>
                      )}
                    </div>
                    <div className="max-h-[400px] overflow-y-auto no-scrollbar">
                      {notifications.length > 0 ? (
                        notifications.map((notif) => (
                          <div 
                            key={notif.id} 
                            onClick={() => markAsRead(notif.id)}
                            className={`p-4 border-b flex items-start gap-3 hover:bg-white/5 transition-colors cursor-pointer group ${
                              isHustlerRoute ? "border-white/5 text-slate-300" : "border-slate-50 text-slate-700"
                            } ${notif.unread ? (isHustlerRoute ? 'bg-[#1dbf73]/10' : 'bg-[#1dbf73]/5') : ''}`}
                          >
                            <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${
                              notif.type === 'sale' ? 'bg-emerald-500/20 text-emerald-400' : 
                              notif.type === 'payout' ? 'bg-blue-500/20 text-blue-400' : 'bg-slate-500/20 text-slate-400'
                            }`}>
                              {notif.type === 'sale' ? <DollarSign size={14} strokeWidth={3} /> : 
                               notif.type === 'payout' ? <Wallet size={14} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <p className={`text-[13px] ${notif.unread ? (isHustlerRoute ? 'font-black text-white' : 'font-black text-[#222325]') : 'font-bold opacity-70'}`}>
                                  {notif.title}
                                </p>
                                <span className="text-[10px] opacity-50 font-medium">{notif.time}</span>
                              </div>
                              <p className="text-[12px] opacity-60 leading-tight">
                                {notif.description}
                              </p>
                            </div>
                            {notif.unread && (
                              <div className="w-2 h-2 rounded-full bg-[#1dbf73] shrink-0 mt-1.5" />
                            )}
                          </div>
                        ))
                      ) : (
                        <div className="py-12 px-6 text-center">
                          <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Bell size={20} className="text-slate-500" />
                          </div>
                          <p className="text-sm font-bold text-slate-400">All caught up!</p>
                          <p className="text-xs text-slate-500 mt-1">No new notifications at the moment.</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Earnings Capsule */}
            {isHustlerRoute && (
              <div 
                className="bg-[#1f212d] hover:bg-[#2a2d3d] h-10 md:h-12 rounded-full flex items-center pl-1 pr-4 md:pr-6 gap-2 md:gap-3 transition-colors cursor-pointer group border border-white/5"
                onClick={() => navigate("/hustler/wallet")}
              >
                <div className="relative shrink-0">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-[#7cb3ff] to-[#9b8eff] p-[1.5px]">
                    <div className="w-full h-full rounded-full overflow-hidden">
                      <img
                        src={userPicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] md:text-[10px] font-black text-slate-500 uppercase tracking-widest leading-none mb-0.5 md:mb-1">Earnings</span>
                  <div className="flex items-center gap-1 md:gap-1.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#7cb3ff] md:w-3 md:h-3">
                      <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="text-sm md:text-lg font-black text-white leading-none">0</span>
                  </div>
                </div>
              </div>
            )}

            {!isHustlerRoute && (
              <div className="relative dropdown-trigger">
                <button
                  onClick={() => {
                    setIsProfileOpen(!isProfileOpen);
                    setIsAccountMenuOpen(false);
                    setIsNotificationsOpen(false);
                  }}
                  className="flex items-center gap-1.5 hover:bg-slate-50 p-1 rounded-full transition-colors ml-1"
                >
                  <div className="w-[30px] h-[30px] rounded-full overflow-hidden shrink-0">
                    <img
                      src={userPicture}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-slate-500 transition-transform duration-200 ml-0.5 mr-1 ${isProfileOpen ? "rotate-180" : ""}`}
                  />
                </button>

                <AnimatePresence>
                  {isProfileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 py-1 z-50 overflow-hidden"
                    >
                      <Link
                        to="/settings"
                        className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#222325] hover:bg-slate-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <Settings size={15} className="text-slate-400" />
                        Settings
                      </Link>
                      <Link
                        to="/help"
                        className="flex items-center gap-2 px-4 py-2 text-[13px] text-[#222325] hover:bg-slate-50 transition-colors"
                        onClick={() => setIsProfileOpen(false)}
                      >
                        <HelpCircle size={15} className="text-slate-400" />
                        Get Help
                      </Link>
                      <div className="h-px bg-slate-100 my-1"></div>
                      <button
                        className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#ff4d4d] hover:bg-[#ff4d4d0a] transition-colors"
                        onClick={handleLogout}
                      >
                        <LogOut size={15} />
                        Log out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

        </header>

        <main className={`flex-1 ${location.pathname === '/settings' ? 'pb-0' : 'pb-12'} ${isHustlerRoute ? 'p-0' : 'px-4 py-6 md:p-8 lg:p-12'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
