import React, { useState } from "react";
import { 
  Users, 
  DollarSign, 
  CheckCircle2, 
  Clock, 
  ArrowUpRight,
  Filter,
  Search,
  ChevronRight,
  ExternalLink
} from "lucide-react";
import { motion } from "motion/react";

const payoutsData: any[] = [];

export default function BusinessPayouts() {
  const [filter, setFilter] = useState("all");
  const [isProcessing, setIsProcessing] = useState<string | null>(null);

  const filteredPayouts = payoutsData.filter(pay => {
    if (filter === "all") return true;
    if (filter === "ready") return pay.status === "Ready to Pay";
    if (filter === "pending") return pay.status === "Pending";
    return true;
  });

  const [showToast, setShowToast] = useState<string | null>(null);

  const handlePay = (id: string) => {
    setIsProcessing(id);
    setTimeout(() => {
      setIsProcessing(null);
      setShowToast("Payout processed successfully!");
      setTimeout(() => setShowToast(null), 3000);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto pt-8 px-4 pb-24">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Partner Payouts
          </h1>
          <p className="text-slate-500 text-sm">
            See who needs to be paid and manage your referral commissions.
          </p>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-3 text-slate-500">
              <Clock size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Ready to Pay</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">$147.50</p>
            <p className="text-xs text-slate-500 mt-2">2 partners reached threshold</p>
          </div>

          <div className="bg-white p-6 border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-3 text-slate-500">
              <DollarSign size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Total Paid</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">$4,850.00</p>
            <p className="text-xs text-slate-500 mt-2">All time commissions paid</p>
          </div>

          <div className="bg-white p-6 border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-3 mb-3 text-slate-500">
              <Users size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Active Partners</span>
            </div>
            <p className="text-3xl font-bold text-slate-900">156</p>
            <p className="text-xs text-slate-500 mt-2">Partners currently referring</p>
          </div>
        </div>

        {/* List Section */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex flex-wrap items-center gap-2">
              <button 
                onClick={() => setFilter("all")}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${filter === 'all' ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter("ready")}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${filter === 'ready' ? 'bg-pink-600 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Ready
              </button>
              <button 
                onClick={() => setFilter("pending")}
                className={`px-4 py-2 text-xs font-bold uppercase tracking-widest rounded-lg transition-colors ${filter === 'pending' ? 'bg-amber-500 text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'}`}
              >
                Pending
              </button>
            </div>
            
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search partners..."
                className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
              />
            </div>
          </div>

        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left min-w-[600px] md:min-w-0">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Partner</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Referrals</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Commission</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-4 md:px-6 py-3 md:py-4 text-[10px] md:text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPayouts.map((payout) => (
                <tr key={payout.id} className="group hover:bg-slate-50 transition-colors">
                  <td className="px-4 md:px-6 py-4">
                    <div className="flex items-center gap-2 md:gap-3">
                      <img src={payout.avatar} alt="" className="w-8 h-8 md:w-10 md:h-10 rounded-sm object-cover" />
                      <div className="min-w-0">
                        <p className="font-semibold text-slate-900 text-[13px] md:text-sm truncate">{payout.partner}</p>
                        <p className="text-[11px] md:text-xs text-slate-500 truncate">{payout.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <span className="text-[13px] md:text-sm font-semibold text-slate-900">{payout.referrals}</span>
                    <p className="text-[11px] md:text-xs text-slate-500">Qualified</p>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    <p className="text-base md:text-lg font-semibold text-slate-900">${payout.amount.toFixed(2)}</p>
                    <p className="text-[11px] md:text-xs text-slate-500">{payout.lastSale}</p>
                  </td>
                  <td className="px-4 md:px-6 py-4">
                    {payout.status === "Ready to Pay" && (
                      <span className="flex items-center gap-1 text-orange-700 bg-orange-50 px-2 py-0.5 text-[10px] md:text-xs font-medium w-fit border border-orange-100 whitespace-nowrap">
                        <Clock size={10} className="md:w-3 md:h-3" />
                        Ready
                      </span>
                    )}
                    {payout.status === "Pending" && (
                      <span className="flex items-center gap-1 text-blue-700 bg-blue-50 px-2 py-0.5 text-[10px] md:text-xs font-medium w-fit border border-blue-100 whitespace-nowrap">
                        <Clock size={10} className="md:w-3 md:h-3" />
                        Processing
                      </span>
                    )}
                    {payout.status === "Completed" && (
                      <span className="flex items-center gap-1 text-pink-700 bg-pink-50 px-2 py-0.5 text-[10px] md:text-xs font-medium w-fit border border-pink-100 whitespace-nowrap">
                        <CheckCircle2 size={10} className="md:w-3 md:h-3" />
                        Paid
                      </span>
                    )}
                  </td>
                  <td className="px-4 md:px-6 py-4 text-right">
                    {payout.status === "Ready to Pay" ? (
                      <button 
                        onClick={() => handlePay(payout.id)}
                        disabled={isProcessing === payout.id}
                        className="bg-slate-900 text-white px-3 md:px-4 py-1.5 md:py-2 text-[11px] md:text-xs font-semibold hover:bg-slate-800 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ml-auto"
                      >
                        {isProcessing === payout.id ? (
                          <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                        ) : (
                          <DollarSign size={12} className="md:w-3.5 md:h-3.5" />
                        )}
                        Pay
                      </button>
                    ) : (
                      <button className="p-1.5 md:p-2 text-slate-400 border border-slate-200 hover:border-slate-300 hover:text-slate-600 transition-all ml-auto">
                        <ChevronRight size={16} className="md:w-[18px] md:h-[18px]" />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile View */}
        <div className="md:hidden divide-y divide-slate-100">
          {filteredPayouts.map((payout) => (
            <div key={payout.id} className="p-5 bg-white space-y-4 active:bg-slate-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 min-w-0">
                  <img src={payout.avatar} alt="" className="w-11 h-11 rounded-sm object-cover border border-slate-100 shadow-sm shrink-0" />
                  <div className="min-w-0">
                    <p className="font-black text-[#222325] text-[15px] truncate leading-tight">{payout.partner}</p>
                    <p className="text-[12px] text-slate-500 font-medium truncate mt-0.5">{payout.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[16px] font-black text-slate-900 leading-tight">${payout.amount.toFixed(2)}</p>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-1">{payout.lastSale}</p>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                <div className="flex items-center gap-5">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Refs</span>
                    <span className="text-[13px] font-black text-slate-900">{payout.referrals}</span>
                  </div>
                  <div className="w-px h-7 bg-slate-100" />
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-black tracking-widest leading-none mb-1">Status</span>
                    {payout.status === "Ready to Pay" ? (
                      <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded-sm border border-orange-100">READY</span>
                    ) : payout.status === "Pending" ? (
                      <span className="text-[10px] font-black text-blue-600 uppercase bg-blue-50 px-1.5 py-0.5 rounded-sm border border-blue-100 leading-none">In Process</span>
                    ) : (
                      <span className="text-[10px] font-black text-pink-600 uppercase bg-pink-50 px-1.5 py-0.5 rounded-sm border border-pink-100">Paid</span>
                    )}
                  </div>
                </div>

                {payout.status === "Ready to Pay" ? (
                  <button 
                    onClick={() => handlePay(payout.id)}
                    disabled={isProcessing === payout.id}
                    className="bg-[#222325] text-white h-[44px] px-6 rounded-sm text-[12px] font-black uppercase tracking-widest active:scale-95 disabled:opacity-50 flex items-center gap-2 shadow-md"
                  >
                    {isProcessing === payout.id ? (
                      <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <DollarSign size={14} strokeWidth={3} />
                    )}
                    Pay
                  </button>
                ) : (
                  <button className="text-slate-400 h-[44px] w-[44px] flex items-center justify-center border border-slate-200 rounded-sm hover:border-slate-400 hover:text-slate-600 bg-white">
                    <ChevronRight size={20} strokeWidth={2.5} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="bg-slate-900 p-6 md:p-12 text-white">
        <div className="relative z-10">
          <h3 className="text-lg md:text-xl font-bold mb-6">How payouts work?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <div className="space-y-2 md:space-y-3">
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold bg-pink-500 text-slate-900 rounded-sm">1</div>
              <p className="font-semibold text-sm">Threshold Reach</p>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Once a partner's commission crosses $50, they are listed as "Ready to Pay".</p>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold bg-pink-500 text-slate-900 rounded-sm">2</div>
              <p className="font-semibold text-sm">One-Click Payment</p>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">Click "Pay Now" to send funds directly to their wallet via your connected provider.</p>
            </div>
            <div className="space-y-2 md:space-y-3">
              <div className="w-7 h-7 md:w-8 md:h-8 flex items-center justify-center text-xs md:text-sm font-bold bg-pink-500 text-slate-900 rounded-sm">3</div>
              <p className="font-semibold text-sm">Tax Compliance</p>
              <p className="text-xs md:text-sm text-slate-400 leading-relaxed font-medium">We automatically generate 1099 forms and detailed financial reports for your records.</p>
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#222325] text-white px-6 py-3 rounded shadow-xl flex items-center gap-3 border border-slate-700 font-medium text-sm md:text-base whitespace-nowrap"
        >
          <div className="bg-pink-500 rounded-full p-1 shrink-0">
            <CheckCircle2 size={16} className="text-white" />
          </div>
          {showToast}
        </motion.div>
      )}
    </div>
  );
}
