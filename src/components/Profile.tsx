import { motion } from "motion/react";
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut, 
  DollarSign,
  Smartphone,
  ChevronRight, 
  Copy, 
  Award, 
  Users, 
  HandCoins, 
  CheckCircle2, 
  Phone, 
  Calendar,
  Shield,
  Bell,
  CreditCard,
  MessageSquare,
  RefreshCw,
  PieChart,
  QrCode,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../services/authService";

export default function Profile() {
  const navigate = useNavigate();
  const userType = localStorage.getItem("userType") || "hustler";
  const name = userType === "business"
    ? localStorage.getItem("businessName") || "Business"
    : localStorage.getItem("hustlerName") || "Hustler";
  const userPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";
  const userId = localStorage.getItem("userId") || `USR-${name.replace(/\s+/g, "").substring(0, 4).toUpperCase()}-1209`;
  const referralCode = localStorage.getItem("referralCode") || (localStorage.getItem("userEmail")
    ? localStorage.getItem("userEmail")?.split("@")[0].toUpperCase()
    : "MOSES2026");

  const profileStats = [
    { label: "My Referrals", value: "0", icon: Users },
    { label: "Avg. Commission", value: "0%", icon: DollarSign },
    { label: "Top Rank", value: "N/A", icon: Award },
    { label: "Success Rate", value: "0%", icon: CheckCircle2 },
  ];

  const sections = [
    {
      title: "Settings",
      items: [
        { label: "Personal Information", icon: User, desc: "Name, email, and social links" },
        { label: "Account Security", icon: Shield, desc: "Password and two-factor auth" },
        { label: "Phone & Identity", icon: Smartphone, desc: "Verified phone number" },
        { label: "Notifications", icon: Bell, desc: "Email and push alerts" },
      ]
    },
    {
      title: "Resources",
      items: [
        { label: "Referral Guidelines", icon: MessageSquare, desc: "How to earn more" },
        { label: "Help & Support", icon: HelpCircle, desc: "Contact our team" },
        { label: "Terms of Service", icon: CreditCard, desc: "Read the legal stuff" },
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24 md:pb-12 text-[#404145]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 space-y-8 text-left">
        {/* Profile Header */}
        <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm text-left">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="relative">
              <div className="w-32 h-32 rounded-full overflow-hidden border border-gray-100">
                <img 
                  src={userPicture} 
                  alt={name} 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="flex-1 space-y-4 text-center md:text-left">
              <div>
                <h1 className="text-3xl font-bold text-[#222325]">{name}</h1>
                <p className="text-[#62646a]">Senior Referrer • Based in Kampala, Uganda</p>
              </div>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                <button className="px-6 py-2 bg-[#222325] text-white rounded font-bold text-sm hover:bg-black transition-all">
                  Edit Profile
                </button>
                <button className="px-6 py-2 border border-gray-300 text-[#404145] rounded font-bold text-sm hover:bg-gray-50 transition-all">
                  View Public Page
                </button>
              </div>
            </div>

            <div className="bg-gray-50 border border-gray-100 rounded-lg p-6 w-full md:w-auto space-y-4">
               <div>
                 <p className="text-xs font-bold text-[#74767e] uppercase tracking-wider mb-1">Invite Code</p>
                 <div className="flex items-center gap-3">
                   <code className="text-sm font-mono font-bold text-[#222325]">{referralCode}</code>
                   <button 
                    onClick={() => navigator.clipboard.writeText(referralCode)}
                    className="p-1.5 text-[#1dbf73] hover:bg-[#1dbf73]/10 rounded transition-colors"
                    title="Copy Invite Code"
                   >
                     <Copy size={16} />
                   </button>
                 </div>
               </div>
               <div className="border-t border-gray-200/50 pt-3">
                 <p className="text-xs font-bold text-[#74767e] uppercase tracking-wider mb-1">System User ID</p>
                 <div className="flex items-center gap-3">
                   <code className="text-sm font-mono text-slate-500 font-medium">{userId}</code>
                   <button 
                    onClick={() => navigator.clipboard.writeText(userId)}
                    className="p-1.5 text-slate-400 hover:bg-slate-200 rounded transition-colors"
                    title="Copy System User ID"
                   >
                     <Copy size={16} />
                   </button>
                 </div>
               </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {profileStats.map((stat) => (
            <div key={stat.label} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
              <div className="flex items-center gap-3 mb-4 text-[#95979d]">
                <stat.icon size={18} />
                <span className="text-xs font-bold uppercase tracking-wider">{stat.label}</span>
              </div>
              <div className="text-3xl font-bold text-[#222325]">{stat.value}</div>
            </div>
          ))}
        </div>

        {/* Settings Sections */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {sections.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-xl font-bold text-[#222325] px-2">{section.title}</h3>
              <div className="bg-white border border-gray-200 rounded-lg shadow-sm divide-y divide-gray-100">
                {section.items.map((item) => (
                  <button 
                    key={item.label}
                    className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors group"
                  >
                    <div className="flex items-center gap-5">
                      <div className="w-12 h-12 bg-gray-50 rounded flex items-center justify-center text-[#95979d] group-hover:text-[#1dbf73] border border-gray-100 transition-colors">
                        <item.icon size={22} />
                      </div>
                      <div className="text-left">
                        <p className="text-base font-bold text-[#404145]">{item.label}</p>
                        <p className="text-sm text-[#62646a]">{item.desc}</p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-gray-300 group-hover:text-[#222325] transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Logout */}
        <div className="pt-8 text-center pb-20">
          <button 
            type="button"
            onClick={async () => {
              await logout();
              navigate("/signin");
            }}
            className="flex items-center gap-2 mx-auto text-rose-600 font-bold hover:underline cursor-pointer"
          >
            <LogOut size={18} /> Log out from Referr
          </button>
        </div>
      </div>
    </div>
  );
}
