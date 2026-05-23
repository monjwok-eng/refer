import React, { useState } from "react";
import { motion } from "motion/react";
import {
  Wallet,
  ArrowRight,
  History,
  Clock,
  ArrowUpCircle,
  MousePointer2,
  Clock3,
  CheckCircle2,
  TrendingUp,
  Bell,
  Award,
  ChevronRight,
  Briefcase,
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Plus,
  Eye,
  EyeOff,
  Search,
  ScanLine,
  PieChart,
  User,
  ArrowDown,
  ArrowUp,
  Share2,
  RefreshCw,
  Zap,
  Menu,
  ChevronDown,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";
import { Skeleton } from "./ui/Skeleton";

export default function HustlerDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [showBalance, setShowBalance] = useState(true);

  const userType = localStorage.getItem("userType") || "hustler";
  const name = userType === "business"
    ? localStorage.getItem("businessName") || "Business"
    : localStorage.getItem("hustlerName") || "Hustler";
  const userPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";

  React.useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const stats: any[] = [];
  const recentTransactions: any[] = [];

  const currencies = [
    { code: "UGX", name: "Uganda Shilling", rate: "1.0", bg: "bg-white" },
  ];

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 min-h-screen">
        <div className="flex items-center justify-between">
          <Skeleton className="h-10 w-48 rounded-full" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <Skeleton className="h-64 w-full rounded-3xl" />
        <div className="grid grid-cols-2 gap-4">
          <Skeleton className="h-32 rounded-3xl" />
          <Skeleton className="h-32 rounded-3xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24 md:pb-12 text-[#404145]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 space-y-8">
        {/* Fiverr-Style Top Stats Header */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Earnings in May", value: "UGX 0", detail: "Active referrals: 0" },
            { label: "Avg. Selling Price", value: "UGX 0", detail: "Last 30 days" },
            { label: "Orders in Queue", value: "0", detail: "No referrals pending" },
            { label: "Response Rate", value: "0%", detail: "In training status" }
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm flex flex-col justify-between">
              <p className="text-[14px] font-bold text-[#74767e] mb-2">{stat.label}</p>
              <div>
                <h4 className="text-xl md:text-2xl font-bold text-[#222325]">{stat.value}</h4>
                <p className="text-[12px] text-[#b5b6ba] mt-1">{stat.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Workspace Area */}
          <div className="flex-1 space-y-8">
            {/* Active Deals / Opportunities */}
            <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
               <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
                 <h3 className="text-lg font-bold text-[#222325]">Active Opportunities</h3>
                 <Link to="/deals" className="text-[#1dbf73] text-sm font-bold hover:underline">View All</Link>
               </div>
               
               <div className="divide-y divide-gray-100">
                  {(() => {
                    const savedDeals = localStorage.getItem("all_deals");
                    let deals = [];
                    try {
                      if (savedDeals) deals = JSON.parse(savedDeals);
                    } catch (e) {}
                    const displayDeals = deals.slice(0, 3);
                    
                    if (displayDeals.length === 0) {
                      return (
                        <div className="p-12 text-center">
                          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Briefcase className="text-gray-300" size={32} />
                          </div>
                          <h4 className="text-lg font-bold text-[#222325] mb-1">No active opportunities</h4>
                          <p className="text-sm text-[#74767e]">Check the marketplace to find deals to refer.</p>
                        </div>
                      );
                    }

                    return displayDeals.map((deal: any) => (
                      <div key={deal.id} className="p-6 flex items-center justify-between hover:bg-gray-50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-gray-100 rounded overflow-hidden">
                            <img src={deal.image || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"} alt={deal.business} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-[#222325] text-[15px] hover:underline cursor-pointer" onClick={() => navigate(`/deal/${deal.id}`)}>{deal.title}</h4>
                            <p className="text-[#74767e] text-sm">{deal.business || "Business"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-[#1dbf73] font-bold">{deal.price}</p>
                          <p className="text-[#74767e] text-[11px] uppercase tracking-wider font-bold">Reward</p>
                        </div>
                      </div>
                    ));
                  })()}
               </div>
               
               <div className="p-6 bg-gray-50/50 border-t border-gray-100">
                  <button 
                    onClick={() => navigate("/deals")}
                    className="w-full py-3 bg-white border border-gray-300 rounded text-sm font-bold text-[#404145] hover:bg-white/80 hover:border-gray-400 transition-all"
                  >
                    Explore Marketplace
                  </button>
               </div>
            </div>

            {/* Performance Snapshot */}
            <div className="bg-white p-8 rounded-lg border border-gray-200 shadow-sm relative overflow-hidden">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-xl font-bold text-[#222325] mb-1">Performance Snapshot</h3>
                    <p className="text-sm text-[#74767e]">Metrics that matter for your Referr account status.</p>
                  </div>
                  <button 
                    onClick={() => navigate("/hustler/analytics")}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1dbf73] text-white rounded font-bold text-sm hover:bg-[#19a463] transition-all"
                  >
                    Performance Report <TrendingUp size={16} />
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-[#404145]">Referral Success Rate</span>
                      <span className="text-sm font-black text-[#1dbf73]">0%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full">
                       <div className="h-full bg-[#1dbf73] w-0" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-[#404145]">On-time Approval</span>
                      <span className="text-sm font-black text-[#1dbf73]">0%</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full">
                       <div className="h-full bg-[#1dbf73] w-0" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-bold text-[#404145]">Network Growth</span>
                      <span className="text-sm font-black text-[#1dbf73]">N/A</span>
                    </div>
                    <div className="h-1 w-full bg-gray-100 rounded-full">
                       <div className="h-full bg-[#1dbf73] w-0" />
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar / Profile Area */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-gray-100 p-0.5">
                   <img 
                    src={userPicture} 
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute top-0 right-0 w-6 h-6 bg-[#1dbf73] border-4 border-white rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-[#222325]">{name}</h3>
              <p className="text-sm text-[#74767e] mb-4 italic">"Start referring to earn rewards."</p>
              
              <div className="pt-4 border-t border-gray-100 space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-[#b5b6ba]">Seller level</span>
                   <span className="font-bold text-[#404145]">New Seller</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-[#b5b6ba]">Member since</span>
                   <span className="font-bold text-[#404145]">May 2024</span>
                 </div>
              </div>
              
              <Link to="/profile" className="block w-full mt-6 py-2 border-2 border-[#404145] rounded font-bold text-sm text-[#404145] hover:bg-[#404145] hover:text-white transition-all">
                Public Profile
              </Link>
            </div>

            <div className="bg-[#fffbe5] p-6 rounded-lg border border-[#f5efc1] shadow-sm">
               <div className="flex items-center gap-2 mb-3">
                 <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-yellow-600 border border-yellow-100 font-black italic">!</div>
                 <h4 className="font-bold text-[#404145]">Referr Academy</h4>
               </div>
               <p className="text-sm text-[#62646a] leading-relaxed mb-4">
                 Learn how to maximize your earnings by identifying "Prime Opportunities".
               </p>
               <button className="text-[#1dbf73] font-bold text-sm hover:underline">Read Guide</button>
            </div>

            <div className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm">
               <h4 className="font-bold text-[#222325] mb-4">Referr Wallet</h4>
               <div className="space-y-4">
                 <div className="bg-gray-50 p-4 rounded-md">
                   <p className="text-[12px] font-bold text-[#b5b6ba] uppercase tracking-widest mb-1">Available for withdrawal</p>
                   <p className="text-2xl font-black text-[#222325]">UGX 0</p>
                 </div>
                 <Link to="/hustler/wallet" className="block w-full py-3 bg-[#1dbf73] text-center rounded font-bold text-sm text-white hover:bg-[#19a463] transition-all shadow-md">
                   Go to Wallet
                 </Link>
               </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
