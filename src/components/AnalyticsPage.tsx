import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  MousePointer2,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Heart,
} from "lucide-react";
import { Skeleton } from "./ui/Skeleton";

const mockData = {
  "7 Days": [
    { name: "Mon", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Tue", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Wed", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Thu", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Fri", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Sat", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Sun", referrals: 0, payouts: 0, clicks: 0 },
  ],
  "30 Days": [
    { name: "Week 1", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Week 2", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Week 3", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Week 4", referrals: 0, payouts: 0, clicks: 0 },
  ],
  "All Time": [
    { name: "Jan", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Feb", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Mar", referrals: 0, payouts: 0, clicks: 0 },
    { name: "Apr", referrals: 0, payouts: 0, clicks: 0 },
    { name: "May", referrals: 0, payouts: 0, clicks: 0 },
  ],
};

const mockStats = {
  "7 Days": [
    { label: "Total Referrals", value: "0", change: "0%", isPositive: true },
    { label: "Total Payouts", value: "UGX 0", change: "0%", isPositive: true },
    { label: "Deal Clicks", value: "0", change: "0%", isPositive: true },
    { label: "New Advocates", value: "0", change: "0%", isPositive: true },
  ],
  "30 Days": [
    { label: "Total Referrals", value: "0", change: "0%", isPositive: true },
    { label: "Total Payouts", value: "UGX 0", change: "0%", isPositive: true },
    { label: "Deal Clicks", value: "0", change: "0%", isPositive: true },
    { label: "New Advocates", value: "0", change: "0%", isPositive: true },
  ],
  "All Time": [
    { label: "Total Referrals", value: "0", change: "0%", isPositive: true },
    { label: "Total Payouts", value: "UGX 0", change: "0%", isPositive: true },
    { label: "Deal Clicks", value: "0", change: "0%", isPositive: true },
    { label: "New Advocates", value: "0", change: "0%", isPositive: true },
  ],
};

export const leaderboardData: any[] = [];

export default function AnalyticsPage({ userType: initialUserType }: { userType?: "hustler" | "business" }) {
  const [isLoading, setIsLoading] = useState(true);
  const [timeRange, setTimeRange] = useState<"7 Days" | "30 Days" | "All Time">("7 Days");
  const userType = initialUserType || (localStorage.getItem("userType") as "hustler" | "business") || "hustler";
  
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, [timeRange]);

  const businessStats = {
    "7 Days": [
      { label: "Referrals Received", value: "142", change: "+12.5%", isPositive: true },
      { label: "Marketing ROI", value: "4.8x", change: "+8.2%", isPositive: true },
      { label: "Active Advocates", value: "28", change: "-2.4%", isPositive: false },
      { label: "Conversion Rate", value: "3.2%", change: "+1.7%", isPositive: true },
    ],
    "30 Days": [
      { label: "Referrals Received", value: "582", change: "+22.1%", isPositive: true },
      { label: "Marketing ROI", value: "5.2x", change: "+14.3%", isPositive: true },
      { label: "Active Advocates", value: "85", change: "+4.1%", isPositive: true },
      { label: "Conversion Rate", value: "3.5%", change: "+9.5%", isPositive: true },
    ],
    "All Time": [
      { label: "Referrals Received", value: "2,450", change: "+148.5%", isPositive: true },
      { label: "Marketing ROI", value: "4.9x", change: "+182.2%", isPositive: true },
      { label: "Active Advocates", value: "342", change: "+94.4%", isPositive: true },
      { label: "Conversion Rate", value: "3.1%", change: "+118.7%", isPositive: true },
    ],
  };

  const currentData = mockData[timeRange];
  const currentStats = userType === 'business' ? businessStats[timeRange] : mockStats[timeRange];

  return (
    <div className="w-full pb-24 text-slate-900">
      <div className="max-w-7xl mx-auto pt-8">
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between mb-8 gap-6">
          <div className="space-y-1">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              Analytics Overview
            </h1>
            <p className="text-slate-500 text-sm">
              Track your performance and optimize referral strategies.
            </p>
          </div>
          <div className="w-full md:w-auto flex items-center gap-1 bg-white border border-slate-200 p-1 rounded-lg transition-all shadow-sm">
            {["7 Days", "30 Days", "All Time"].map((range) => (
              <button 
                key={range}
                onClick={() => setTimeRange(range as any)}
                className={`px-4 py-1.5 text-xs font-semibold rounded-md transition-all ${
                  timeRange === range 
                    ? "bg-slate-900 text-white shadow-sm" 
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                {range}
              </button>
            ))}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200/80 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
                <Skeleton className="w-10 h-10 mb-4" />
                <Skeleton className="w-24 h-3 mb-2" />
                <Skeleton className="w-20 h-8" />
              </div>
            ))
          ) : (
            <>
              <StatCard
                icon={TrendingUp}
                label={currentStats[0].label}
                value={currentStats[0].value}
                change={currentStats[0].change}
                isPositive={currentStats[0].isPositive}
              />
              <StatCard
                icon={DollarSign}
                label={currentStats[1].label}
                value={currentStats[1].value}
                change={currentStats[1].change}
                isPositive={currentStats[1].isPositive}
              />
              <StatCard
                icon={MousePointer2}
                label={currentStats[2].label}
                value={currentStats[2].value}
                change={currentStats[2].change}
                isPositive={currentStats[2].isPositive}
              />
              <StatCard
                icon={Users}
                label={currentStats[3].label}
                value={currentStats[3].value}
                change={currentStats[3].change}
                isPositive={currentStats[3].isPositive}
              />
            </>
          )}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Volume */}
          <div className="bg-white rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-slate-200/80">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Revenue Volume
                </h3>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">Earnings over time</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-pink-600">
                <TrendingUp size={20} />
              </div>
            </div>
            <div className="h-[250px] w-full">
              {isLoading ? (
                <div className="space-y-4 h-full flex flex-col justify-end">
                  <div className="flex items-end gap-2 h-full">
                    {[40, 70, 45, 90, 65, 80, 55].map((h, i) => (
                      <Skeleton
                        key={i}
                        className="flex-1 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={currentData}>
                    <defs>
                      <linearGradient id="colorRef" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fontWeight: 600, fill: "#94a3b8" }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fontWeight: 600, fill: "#94a3b8" }}
                    />
                    <Tooltip
                      contentStyle={{
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        padding: "10px",
                      }}
                      labelStyle={{ fontWeight: 700, marginBottom: '4px', color: '#0f172a' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="referrals"
                      stroke="#ec4899"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRef)"
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Campaign Clicks */}
          <div className="bg-white rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)] border border-slate-200/80">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  Campaign Clicks
                </h3>
                <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider font-bold">Interactions peak</p>
              </div>
              <div className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-center text-slate-900">
                <MousePointer2 size={20} />
              </div>
            </div>
            <div className="h-[250px] w-full">
              {isLoading ? (
                <div className="space-y-4 h-full flex flex-col justify-end">
                  <div className="flex items-end gap-2 h-full">
                    {[60, 40, 85, 30, 95, 50, 75].map((h, i) => (
                      <Skeleton
                        key={i}
                        className="flex-1 rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={currentData}>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f1f5f9"
                    />
                    <XAxis
                      dataKey="name"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fontWeight: 600, fill: "#94a3b8" }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 11, fontWeight: 600, fill: "#94a3b8" }}
                    />
                    <Tooltip
                      contentStyle={{
                        border: "none",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                        padding: "10px",
                      }}
                      labelStyle={{ fontWeight: 700, marginBottom: '4px', color: '#0f172a' }}
                    />
                    <Bar 
                      dataKey="clicks" 
                      fill="#0f172a" 
                      radius={[4, 4, 0, 0]} 
                      barSize={24}
                      animationDuration={1500}
                    />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, change, isPositive }: any) {
  return (
    <div className="bg-white rounded border border-gray-200 p-8 shadow-sm hover:border-[#ec4899] transition-all group relative">
      <div className="flex items-center justify-between mb-8 relative z-10 text-left">
        <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-lg flex items-center justify-center text-[#95979d] group-hover:bg-[#ec4899] group-hover:text-white transition-all duration-300">
          <Icon size={24} />
        </div>
        <div
          className={`flex items-center gap-1.5 px-2 py-1 rounded text-xs font-bold ${
            isPositive 
              ? "text-[#ec4899]" 
              : "text-rose-500"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {change}
        </div>
      </div>
      <div className="relative z-10 text-left">
        <p className="text-[#74767e] text-xs font-bold uppercase tracking-wider mb-1.5 leading-none">
          {label}
        </p>
        <p className="text-3xl font-bold text-[#222325] tracking-tight">
          {value}
        </p>
      </div>
    </div>
  );
}
