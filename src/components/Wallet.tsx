import { useState, useEffect } from "react";
import { motion } from "motion/react";
import {
  Wallet as WalletIcon,
  Smartphone,
  ChevronRight,
  TrendingUp,
  Calendar,
  CheckCircle2,
  ArrowUpRight,
  ArrowDownLeft,
  ArrowLeft,
  MoreVertical,
  Plus,
  CreditCard,
  Building2,
  QrCode,
  History,
  ArrowUp,
  ArrowDown,
  RefreshCw,
  PieChart as PieChartIcon,
  User as UserIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Wallet({ userType: initialUserType }: { userType?: "hustler" | "business" }) {
  const [isLoading, setIsLoading] = useState(true);
  const userType = initialUserType || (localStorage.getItem("userType") as "hustler" | "business") || "hustler";

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const transactions: any[] = [];

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f7f7]">
      <div className="w-10 h-10 border-4 border-[#1dbf73] border-t-transparent rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24 md:pb-12 text-[#404145]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 space-y-8 text-left">
        {/* Fiverr-Style Header */}
        <header className="flex flex-col gap-6 text-left">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1 text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-[#222325] tracking-tight">
                Earnings & Wallet
              </h1>
              <p className="text-[#62646a] text-lg">Manage your referrals, payouts, and financial growth.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="px-6 py-3 bg-[#222325] text-white rounded font-bold text-sm hover:bg-black transition-all">
                Withdraw Funds
              </button>
            </div>
          </div>
        </header>

        {/* Balance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col justify-between h-[180px]">
             <div>
               <p className="text-sm font-bold text-[#62646a] mb-1">Total Balance</p>
               <h2 className="text-4xl font-bold text-[#222325]">UGX 0</h2>
             </div>
             <p className="text-xs text-[#95979d]">Available for withdrawal</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col justify-between h-[180px]">
             <div>
               <p className="text-sm font-bold text-[#62646a] mb-1">Pending Clearance</p>
               <h2 className="text-4xl font-bold text-[#222325] text-[#1dbf73]">UGX 0</h2>
             </div>
             <p className="text-xs text-[#95979d]">Expected in 14 days</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm flex flex-col justify-between h-[180px]">
             <div>
               <p className="text-sm font-bold text-[#62646a] mb-1">Personal Balance</p>
               <h2 className="text-4xl font-bold text-[#222325]">UGX 0</h2>
             </div>
             {userType !== 'hustler' && (
               <p className="text-xs text-[#1dbf73] font-black underline cursor-pointer">Top up</p>
             )}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden text-left">
          <div className="p-6 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-lg font-bold text-[#222325]">Financial Activity</h3>
            <div className="flex items-center gap-2">
              <select className="bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium focus:outline-none focus:border-[#1dbf73]">
                <option>Everything</option>
                <option>Cleared</option>
                <option>Pending</option>
                <option>Withdrawals</option>
              </select>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-gray-50/50 border-b border-gray-100 text-[12px] font-bold text-[#74767e] uppercase tracking-wider">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Activity</th>
                  <th className="px-6 py-4">Business</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {transactions.length > 0 ? transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4 text-sm text-[#74767e]">{tx.time}</td>
                    <td className="px-6 py-4">
                      <p className="text-sm font-bold text-[#404145]">{tx.name}</p>
                      <p className="text-[12px] text-[#95979d]">{tx.type}</p>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#404145]">{tx.business}</td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-bold uppercase tracking-tight ${
                         tx.status === 'Cleared' || tx.status === 'Completed' 
                          ? 'bg-[#1dbf73]/10 text-[#1dbf73]' 
                          : 'bg-orange-100 text-orange-600'
                       }`}>
                         {tx.status}
                       </span>
                    </td>
                    <td className={`px-6 py-4 text-sm font-bold text-right ${tx.isPositive ? 'text-[#1dbf73]' : 'text-[#404145]'}`}>
                      {tx.amount}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <History className="text-gray-200" size={48} />
                        <p className="text-[#62646a] font-medium">No transactions found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-gray-100 bg-gray-50/30 text-center">
            <button className="text-sm font-bold text-[#1dbf73] hover:underline">
              View full financial statement
            </button>
          </div>
        </div>

        {/* Payout Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
             <h3 className="text-lg font-bold text-[#222325] mb-6">Withdrawal Method</h3>
             
             <div className="space-y-3">
               <div className="flex items-center justify-between p-4 border border-gray-200 rounded hover:border-[#1dbf73] transition-colors cursor-pointer group">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-[#ffcc00]/10 rounded flex items-center justify-center overflow-hidden p-2">
                     <img src="https://www.mtn.co.ug/wp-content/themes/mtn-vivid-wp/public/img/mtn-logo.svg" alt="MTN" className="w-full h-full object-contain" />
                   </div>
                   <div>
                     <p className="font-bold text-[#404145]">MTN Mobile Money</p>
                     <p className="text-xs text-[#95979d]">Ending in ****4590</p>
                   </div>
                 </div>
                 <button className="text-[12px] font-bold text-[#1dbf73] group-hover:underline">Edit</button>
               </div>

               <div className="flex items-center justify-between p-4 border border-gray-200 rounded hover:border-[#1dbf73] transition-colors cursor-pointer group">
                 <div className="flex items-center gap-4">
                   <div className="w-12 h-12 bg-red-50 rounded flex items-center justify-center overflow-hidden p-2">
                     <img src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Bharti_Airtel_Logo.svg" alt="Airtel Uganda Logo" className="w-full h-full object-contain" />
                   </div>
                   <div>
                     <p className="font-bold text-[#404145]">Airtel Money</p>
                     <p className="text-xs text-[#95979d]">Ending in ****8821</p>
                   </div>
                 </div>
                 <button className="text-[12px] font-bold text-[#1dbf73] group-hover:underline">Edit</button>
               </div>
             </div>

             <button className="mt-6 flex items-center gap-2 text-sm font-bold text-[#1dbf73] hover:underline">
                <Plus size={16} /> Add a new withdrawal method
             </button>
           </div>

           <div className="bg-[#1dbf73]/5 border border-[#1dbf73]/20 rounded-lg p-8 shadow-sm">
             <h3 className="text-lg font-bold text-[#222325] mb-2">Need help?</h3>
             <p className="text-sm text-[#62646a] mb-6">Learn more about how our payout system works and when you can expect your funds.</p>
             <button className="px-6 py-2 border border-[#222325] text-[#222325] rounded font-bold text-sm hover:bg-[#222325] hover:text-white transition-all">
               Visit Help Center
             </button>
           </div>
        </div>
      </div>
    </div>
  );
}

function SimplePaypalIcon({ size, className }: { size: number, className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M7 17.5l.3-2.3H5.7l1-7.7h6.2c3.5 0 4.6 1.7 4.1 4.5-.4 3.1-2.4 4.5-5.3 4.5H9.3l-.6 4.5H7z" />
    </svg>
  );
}

function RefreshCwIcon({ size }: { size: number }) {
  return <RefreshCw size={size} />;
}
