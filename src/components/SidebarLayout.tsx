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
  Megaphone,
} from "lucide-react";
import { Logo } from "./Logo";
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
      setIsExpanded(false); // Force close on dashboard/business
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

  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(typeof window !== "undefined" && window.innerWidth < 1024);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const showLabels = isExpanded || isMobile;

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
        title={showLabels ? "" : label}
        className={`flex items-center h-8 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-100 ${
          active ? "bg-gray-200/50 text-gray-900" : ""
        } ${showLabels ? "w-full p-2" : "w-full p-2 justify-start"}`}
      >
        {/* Container for Icon */}
        <div className="shrink-0 size-4 flex items-center justify-center text-black">
          <Icon
            size={16}
            strokeWidth={1.14}
          />
        </div>
        <span className={`whitespace-nowrap overflow-hidden ${showLabels ? "" : "hidden"} ml-2`}>
            {label}
        </span>
        {active && !showLabels && (
          <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary-accent rounded-r" />
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
          active ? "text-black font-bold" : "text-black hover:bg-slate-50"
        } transition-colors group`}
      >
        {active ? (
          <div className="absolute left-[30px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary-accent" />
        ) : (
          <div className="absolute left-[31px] top-1/2 -translate-y-1/2 w-1 h-1 rounded-full opacity-40 transition-all bg-slate-300 group-hover:bg-primary-accent group-hover:opacity-100" />
        )}
        <span className="text-[13px] font-medium tracking-tight">{label}</span>
        {badge && (
          <span className="bg-primary-accent text-[8px] font-black text-white px-1.5 py-0.5 rounded ml-2 shrink-0 tracking-widest uppercase">
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
      if (!showLabels) {
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
          title={showLabels ? "" : label}
          className={
            `flex items-center rounded-lg transition-all duration-200 group ${showLabels ? "w-[calc(100%-24px)] mx-3 py-2.5" : "w-full h-10 justify-start px-3"} ${
                  (isActive && !isOpen)
                    ? "bg-slate-105 text-black font-semibold"
                    : "text-black hover:bg-slate-50"
                }`
          }
        >
          <div className="shrink-0 size-4 flex items-center justify-center text-black">
            <Icon
              size={16}
              strokeWidth={1.75}
            />
          </div>
          <AnimatePresence initial={false}>
            {showLabels ? (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0 }}
                className="flex-1 flex items-center justify-between overflow-hidden whitespace-nowrap pr-4 ml-3"
              >
                <span className="text-[14px] font-medium tracking-tight">
                  {label}
                </span>
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""} text-black`}
                />
              </motion.div>
            ) : (
              <span className="whitespace-nowrap overflow-hidden hidden">{label}</span>
            )}
          </AnimatePresence>
          {isActive && !showLabels && (
            <div className="absolute left-[-6px] top-1/2 -translate-y-1/2 w-0.5 h-4 bg-primary-accent rounded-r" />
          )}
        </button>

        <AnimatePresence initial={false}>
          {isOpen && showLabels && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0 }}
              className="overflow-hidden flex flex-col py-1 relative"
            >
              {/* Folder indicator line */}
              <div className="absolute left-[29px] top-0 bottom-2 w-px bg-slate-200" />
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
      <div className="flex flex-col gap-0.5 mb-4">
        <div className={`overflow-hidden ${showLabels ? "h-auto mx-2" : "h-0"} mb-1`}>
            <div className={`px-2 pb-1 whitespace-nowrap text-xs text-slate-500 font-normal ${showLabels ? "" : "hidden"}`}>
                {label}
            </div>
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
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[35] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`bg-white border-r border-surface-200 flex flex-col pt-0 lg:pt-12 min-h-screen shrink-0 transition-all duration-300 ${
          isMobile 
            ? (isExpanded ? 'fixed inset-0 z-[60] w-full' : 'absolute w-0 -translate-x-full opacity-0')
            : (isExpanded ? 'w-[256px]' : 'w-16 px-2')
        }`}
      >

        <div className="w-full h-full flex flex-col pt-4 lg:pt-0">
          {isMobile && (
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 lg:hidden">
              <Logo size="md" theme="light" className="scale-125 origin-left" />
              <button 
                onClick={() => setIsExpanded(false)}
                className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 active:scale-95"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>
          )}
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
                </NavGroup>

                <NavGroup label="Network & Growth">
                  <NavItem
                    to="/business/referrers"
                    icon={Users}
                    label="Network"
                  />
                  <NavItem
                    to="/business/ad-networks"
                    icon={Megaphone}
                    label="Ad Networks"
                  />
                  <NavItem
                    to="/dashboard/deals"
                    icon={Briefcase}
                    label="Manage Deals"
                  />
                  <NavItem
                    to="/business/favorites"
                    icon={Heart}
                    label="Shortlist"
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

                <NavGroup label="Site">
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
            <div className="py-2 border-t border-slate-100 flex flex-col justify-center shrink-0">
              <NavItem to="/editor" icon={PenTool} label="Edit Site" />
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 h-screen overflow-y-auto min-w-0 bg-slate-50" id="main-content-wrapper">
        {/* Referr Top Header */}
        {userType === "business" ? (
          <header className="flex justify-between items-center print:hidden border-b border-surface-200 bg-white min-h-[56px] h-[56px] sticky top-0 z-50 px-4 md:px-6">
            <div className="w-full h-full flex flex-row items-center justify-between gap-3">
              
              <div className="flex items-center gap-3">
                {isMobile ? (
                  <button
                    onClick={toggleSidebar}
                    className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 active:scale-95 flex items-center justify-center shrink-0"
                    aria-label="Toggle Sidebar"
                  >
                    {isExpanded ? <X size={20} /> : <Menu size={20} />}
                  </button>
                ) : (
                  <button 
                    type="button" 
                    onClick={toggleSidebar}
                    className="px-1.5 py-2 bg-slate-50 border-slate-100 hover:bg-slate-100 border-y border-r rounded-r-lg cursor-pointer"
                    aria-label="Toggle Sidebar"
                  >
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor" 
                      aria-hidden="true" 
                      data-slot="icon" 
                      className={`h-4 w-4 text-slate-700 transition-transform duration-200 ${isExpanded ? "" : "rotate-180"}`}
                    >
                      <path fillRule="evenodd" d="M11.78 5.22a.75.75 0 0 1 0 1.06L8.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06l-4.25-4.25a.75.75 0 0 1 0-1.06l4.25-4.25a.75.75 0 0 1 1.06 0Z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
                {isMobile && (
                  <Logo size="md" className="scale-110 origin-left" theme="light" />
                )}
              </div>

              <div className="w-full flex-1 py-1 flex flex-row space-x-2 justify-end items-center">
                <button 
                  type="button" 
                  onClick={() => {
                    window.dispatchEvent(new CustomEvent("open-upgrade-modal"));
                  }}
                  className="flex shrink-0 items-center gap-1.5 sm:gap-2.5 px-2 sm:px-3 py-1.5 rounded-lg border border-violet-200 bg-violet-50 hover:bg-violet-100 transition-colors cursor-pointer"
                >
                  <span className="text-violet-900 whitespace-nowrap text-xs text-surface-900 font-medium">Scale trial</span>
                  <span className="hidden md:inline text-violet-600 whitespace-nowrap flex-1 text-xs text-surface-900 font-normal">Day 2 / 14</span>
                  <div className="flex items-center gap-1 px-1.5 py-0.5 rounded bg-white border border-violet-200 shadow-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-3 h-3 text-violet-600">
                      <path d="M11.983 1.907a.75.75 0 0 0-1.292-.657l-8.5 9.5A.75.75 0 0 0 2.75 12h6.572l-1.305 6.093a.75.75 0 0 0 1.292.657l8.5-9.5A.75.75 0 0 0 17.25 8h-6.572l1.305-6.093Z"></path>
                    </svg>
                    <span className="text-violet-900 text-xs text-surface-900 font-medium">Upgrade</span>
                  </div>
                </button>

                <div className="flex flex-row space-x-2 items-center">
                  <div className="flex lg:hidden">
                    <div>
                      <div>
                        <button 
                          data-tip="View site" 
                          type="button" 
                          onClick={() => navigate("/site-app")}
                          className="border font-medium focus:outline-none focus:border-transparent inline-flex items-center data-[display-disabled=true]:cursor-not-allowed whitespace-nowrap transition-colors duration-200 bg-transparent hover:bg-surface-100 text-gray-700 hover:text-gray-900 data-[display-disabled=true]:text-gray-300 data-[display-disabled=true]:bg-transparent border-transparent rounded-md justify-center p-2 text-sm cursor-pointer" 
                          data-display-disabled="false"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                            <path d="M16.555 5.412a8.028 8.028 0 0 0-3.503-2.81 14.899 14.899 0 0 1 1.663 4.472 8.547 8.547 0 0 0 1.84-1.662ZM13.326 7.825a13.43 13.43 0 0 0-2.413-5.773 8.087 8.087 0 0 0-1.826 0 13.43 13.43 0 0 0-2.413 5.773A8.473 8.473 0 0 0 10 8.5c1.18 0 2.304-.24 3.326-.675ZM6.514 9.376A9.98 9.98 0 0 0 10 10c1.226 0 2.4-.22 3.486-.624a13.54 13.54 0 0 1-.351 3.759A13.54 13.54 0 0 1 10 13.5c-1.079 0-2.128-.127-3.134-.366a13.538 13.538 0 0 1-.352-3.758ZM5.285 7.074a14.9 14.9 0 0 1 1.663-4.471 8.028 8.028 0 0 0-3.503 2.81c.529.638 1.149 1.199 1.84 1.66ZM17.334 6.798a7.973 7.973 0 0 1 .614 4.115 13.47 13.47 0 0 1-3.178 1.72 15.093 15.093 0 0 0 .174-3.939 10.043 10.043 0 0 0 2.39-1.896ZM2.666 6.798a10.042 10.042 0 0 0 2.39 1.896 15.196 15.196 0 0 0 .174 3.94 13.472 13.472 0 0 1-3.178-1.72 7.973 7.973 0 0 1 .615-4.115ZM10 15c.898 0 1.778-.079 2.633-.23a13.473 13.473 0 0 1-1.72 3.178 8.099 8.099 0 0 1-1.826 0 13.47 13.47 0 0 1-1.72-3.178c.855.151 1.735.23 2.633.23ZM14.357 14.357a14.912 14.912 0 0 1-1.305 3.04 8.027 8.027 0 0 0 4.345-4.345c-.953.542-1.971.981-3.04 1.305ZM6.948 17.397a8.027 8.027 0 0 1-4.345-4.345c.953.542 1.971.981 3.04 1.305a14.912 14.912 0 0 0 1.305 3.04Z" />
                          </svg>
                          <span className="sr-only">View site</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="hidden lg:flex space-x-2">
                    <button 
                      onClick={() => navigate("/site-app")}
                      type="button" 
                      className="border font-medium focus:outline-none focus:border-transparent inline-flex items-center data-[display-disabled=true]:cursor-not-allowed whitespace-nowrap transition-colors duration-200 bg-transparent hover:bg-surface-100 text-gray-700 hover:text-gray-900 data-[display-disabled=true]:text-gray-300 data-[display-disabled=true]:bg-transparent border-transparent rounded-md justify-center py-2 px-3 text-sm my-auto cursor-pointer" 
                      data-display-disabled="false"
                    >
                      View site
                    </button>
                    <button 
                      onClick={() => navigate("/business/wallet")}
                      type="button" 
                      className="border font-medium focus:outline-none focus:border-transparent inline-flex items-center data-[display-disabled=true]:cursor-not-allowed whitespace-nowrap transition-colors duration-200 bg-transparent hover:bg-surface-100 text-gray-700 hover:text-gray-900 data-[display-disabled=true]:text-gray-300 data-[display-disabled=true]:bg-transparent border-transparent rounded-md justify-center py-2 px-3 text-sm my-auto cursor-pointer" 
                      data-display-disabled="false"
                    >
                      Wallet
                    </button>
                    <button 
                      onClick={() => navigate("/help")}
                      type="button" 
                      className="border font-medium focus:outline-none focus:border-transparent inline-flex items-center data-[display-disabled=true]:cursor-not-allowed whitespace-nowrap transition-colors duration-200 bg-transparent hover:bg-surface-100 text-gray-700 hover:text-gray-900 data-[display-disabled=true]:text-gray-300 data-[display-disabled=true]:bg-transparent border-transparent rounded-md justify-center py-2 px-3 text-sm my-auto cursor-pointer" 
                      data-display-disabled="false"
                    >
                      Help
                    </button>
                  </div>



                  {/* Notifications Icon dropdown wrapper */}
                  <div className="relative dropdown-trigger">
                    <button 
                      onClick={() => {
                        setIsNotificationsOpen(!isNotificationsOpen);
                        setIsProfileOpen(false);
                        setIsAccountMenuOpen(false);
                      }}
                      title="View notifications" 
                      type="button" 
                      className="border font-medium focus:outline-none focus:border-transparent inline-flex items-center data-[display-disabled=true]:cursor-not-allowed whitespace-nowrap transition-colors duration-200 bg-transparent hover:bg-surface-100 text-gray-700 hover:text-gray-900 data-[display-disabled=true]:text-gray-300 data-[display-disabled=true]:bg-transparent border-transparent rounded-md justify-center p-2 text-sm relative cursor-pointer"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="w-5 h-5">
                        <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd"></path>
                      </svg>
                      <span className="sr-only">View notifications</span>
                      {unreadCount > 0 && (
                        <div className="absolute top-[3px] right-[3px] min-w-[16px] h-[16px] px-1 bg-[#ff4d4d] rounded-full border border-white flex items-center justify-center text-[8px] font-black text-white shadow-sm ring-1 ring-black/10">
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
                          className="fixed inset-x-4 top-[60px] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-96 rounded-xl shadow-2xl border z-50 overflow-hidden bg-white border-slate-100"
                        >
                          <div className="px-4 py-3 border-b flex items-center justify-between border-slate-100 bg-slate-50/50">
                            <span className="text-sm font-black text-[#222325]">Notifications</span>
                            {notifications.length > 0 && (
                              <button 
                                className="text-[10px] font-black text-slate-400 uppercase tracking-wider hover:text-red-500 transition-colors cursor-pointer" 
                                onClick={clearAllNotifications}
                              >
                                Clear All
                              </button>
                            )}
                          </div>
                          <div className="max-h-[300px] overflow-y-auto no-scrollbar justify-start flex flex-col">
                            {notifications.length > 0 ? (
                              notifications.map((notif) => (
                                <div 
                                  key={notif.id} 
                                  onClick={() => markAsRead(notif.id)}
                                  className={`p-4 border-b flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer group border-slate-50 text-slate-700 ${notif.unread ? 'bg-slate-55' : ''}`}
                                >
                                  <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${
                                    notif.type === 'sale' ? 'bg-pink-500/20 text-pink-600' : 
                                    notif.type === 'payout' ? 'bg-blue-500/20 text-blue-600' : 'bg-slate-500/20 text-slate-500'
                                  }`}>
                                    {notif.type === 'sale' ? <DollarSign size={14} strokeWidth={3} /> : 
                                     notif.type === 'payout' ? <Wallet size={14} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                                  </div>
                                  <div className="flex-1">
                                    <div className="flex items-center justify-between mb-1">
                                      <p className={`text-[13px] ${notif.unread ? 'font-black text-[#222325]' : 'font-bold opacity-70'}`}>
                                        {notif.title}
                                      </p>
                                      <span className="text-[10px] opacity-50 font-medium">{notif.time}</span>
                                    </div>
                                    <p className="text-[12px] opacity-60 leading-tight">
                                      {notif.description}
                                    </p>
                                  </div>
                                  {notif.unread && (
                                    <div className="w-2 h-2 rounded-full bg-[#0F172A] shrink-0 mt-1.5" />
                                  )}
                                </div>
                              ))
                            ) : (
                              <div className="py-12 px-6 text-center bg-white">
                                <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-3">
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

                  {/* Avatar Profile Trigger */}
                  <div className="relative inline-flex h-full items-center justify-center pl-2 my-auto dropdown-trigger">
                    <button 
                      onClick={() => {
                        setIsProfileOpen(!isProfileOpen);
                        setIsNotificationsOpen(false);
                        setIsAccountMenuOpen(false);
                      }}
                      className="inline-flex items-center justify-center cursor-pointer" 
                      type="button"
                    >
                      <div className="w-6 h-6 my-auto overflow-hidden rounded-full ring-2 ring-offset-2 ring-gray-150 hover:shadow-sm bg-surface-100 hover:bg-surface-200">
                        <img alt="avatar" className="object-cover w-full h-full" src={userPicture} />
                      </div>
                    </button>

                    <AnimatePresence>
                      {isProfileOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          transition={{ duration: 0.15 }}
                          className="absolute right-0 top-[40px] w-48 bg-white rounded-lg shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-100 py-1 z-50 overflow-hidden"
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
                            className="w-full flex items-center gap-2 px-4 py-2 text-[13px] font-medium text-[#ff4d4d] hover:bg-[#ff4d4d0a] transition-colors cursor-pointer"
                            onClick={handleLogout}
                          >
                            <LogOut size={15} />
                            Log out
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </div>
          </header>
        ) : (
          <header 
            className="h-[80px] px-4 md:px-8 flex items-center justify-between transition-all duration-300 sticky top-0 z-50 bg-white border-b border-slate-100"
          >
            <div className="flex items-center gap-4 md:gap-6">
              <button
                onClick={toggleSidebar}
                className="lg:hidden p-2 rounded-lg transition-colors text-slate-600 hover:bg-slate-100"
                aria-label={isExpanded ? "Close Mobile Menu" : "Open Mobile Menu"}
              >
                {isExpanded ? <X size={24} strokeWidth={2} /> : <Menu size={24} strokeWidth={2} />}
              </button>
              <Logo size="md" className="origin-left scale-[1.4]" theme="light" />
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
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all relative text-black hover:bg-slate-100"
                >
                  <Bell size={20} className="md:w-[22px] md:h-[22px]" strokeWidth={2} />
                  {unreadCount > 0 && (
                    <div className="absolute -top-1 -right-1 min-w-[18px] h-[18px] md:min-w-[20px] md:h-[20px] px-1 bg-[#ff4d4d] rounded-full border-2 border-white flex items-center justify-center text-[9px] md:text-[10px] font-black text-white shadow-sm ring-1 ring-black/10">
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
                      className="fixed inset-x-4 top-[85px] sm:absolute sm:inset-x-auto sm:right-0 sm:top-full sm:mt-2 w-auto sm:w-96 rounded-xl shadow-2xl border z-50 overflow-hidden bg-white border-slate-100"
                    >
                      <div className="px-4 py-3 border-b flex items-center justify-between border-slate-100 bg-slate-50/50">
                        <span className="text-sm font-black text-[#222325]">Notifications</span>
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
                              className={`p-4 border-b flex items-start gap-3 hover:bg-slate-50 transition-colors cursor-pointer group border-slate-50 text-slate-700 ${notif.unread ? 'bg-slate-55' : ''}`}
                            >
                              <div className={`w-8 h-8 rounded-full flex shrink-0 items-center justify-center ${
                                notif.type === 'sale' ? 'bg-pink-500/20 text-pink-600' : 
                                notif.type === 'payout' ? 'bg-blue-500/20 text-blue-600' : 'bg-slate-500/20 text-slate-500'
                              }`}>
                                {notif.type === 'sale' ? <DollarSign size={14} strokeWidth={3} /> : 
                                 notif.type === 'payout' ? <Wallet size={14} strokeWidth={3} /> : <div className="w-1.5 h-1.5 rounded-full bg-current" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center justify-between mb-1">
                                  <p className={`text-[13px] ${notif.unread ? 'font-black text-[#222325]' : 'font-bold opacity-70'}`}>
                                    {notif.title}
                                  </p>
                                  <span className="text-[10px] opacity-50 font-medium">{notif.time}</span>
                                </div>
                                <p className="text-[12px] opacity-60 leading-tight">
                                  {notif.description}
                                </p>
                              </div>
                              {notif.unread && (
                                <div className="w-2 h-2 rounded-full bg-[#0F172A] shrink-0 mt-1.5" />
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
                  className="bg-slate-50 hover:bg-slate-100 h-10 md:h-12 rounded-full flex items-center pl-1 pr-4 md:pr-6 gap-2 md:gap-3 transition-colors cursor-pointer group border border-slate-200"
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
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-[#3b82f6] md:w-3 md:h-3">
                        <path d="M12 19V5M12 5L5 12M12 5L19 12" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-sm md:text-lg font-black text-[#222325] leading-none">0</span>
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
        )}

        <main className={`flex-1 w-full ${location.pathname === '/settings' ? 'pb-0' : 'pb-12'} ${isHustlerRoute ? 'p-0' : 'px-4 md:px-6 py-6'}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
