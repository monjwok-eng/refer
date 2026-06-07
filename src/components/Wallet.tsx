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
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import LoadingScreen from "./LoadingScreen";

export default function Wallet({ userType: initialUserType }: { userType?: "hustler" | "business" }) {
  const [isLoading, setIsLoading] = useState(true);
  const userType = initialUserType || (localStorage.getItem("userType") as "hustler" | "business") || "hustler";

  const [methods, setMethods] = useState<any[]>(() => {
    const saved = localStorage.getItem("withdrawal_methods");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    return []; // Empty by default so the user adds them self!
  });

  const [showAddForm, setShowAddForm] = useState(false);
  const [newProvider, setNewProvider] = useState<"MTN" | "Airtel">("MTN");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [accountName, setAccountName] = useState("");

  const handleAddMethod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber || !accountName) return;
    
    const newMethod = {
      id: Date.now().toString(),
      provider: newProvider,
      phoneNumber: phoneNumber,
      accountName: accountName,
      endingDigits: phoneNumber.length > 4 ? phoneNumber.slice(-4) : phoneNumber
    };
    const updated = [...methods, newMethod];
    setMethods(updated);
    localStorage.setItem("withdrawal_methods", JSON.stringify(updated));
    
    setPhoneNumber("");
    setAccountName("");
    setShowAddForm(false);
  };

  const handleDeleteMethod = (idToDelete: string) => {
    const updated = methods.filter((m) => m.id !== idToDelete);
    setMethods(updated);
    localStorage.setItem("withdrawal_methods", JSON.stringify(updated));
  };

  const [balance, setBalance] = useState(() => {
    const saved = localStorage.getItem("hustler_balance");
    if (saved) return Number(saved);
    localStorage.setItem("hustler_balance", "0");
    return 0;
  });

  const [pending, setPending] = useState(() => {
    const saved = localStorage.getItem("hustler_pending");
    if (saved) return Number(saved);
    localStorage.setItem("hustler_pending", "0");
    return 0;
  });

  const [personalBalance, setPersonalBalance] = useState(() => {
    const saved = localStorage.getItem("personal_balance");
    if (saved) return Number(saved);
    localStorage.setItem("personal_balance", "0");
    return 0;
  });

  const [transactions, setTransactions] = useState<any[]>(() => {
    const saved = localStorage.getItem("hustler_transactions");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {}
    }
    const defaultTx: any[] = [];
    localStorage.setItem("hustler_transactions", JSON.stringify(defaultTx));
    return defaultTx;
  });

  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState("");
  const [selectedMethodId, setSelectedMethodId] = useState("");
  const [withdrawStep, setWithdrawStep] = useState<"form" | "loading" | "success">("form");
  const [withdrawError, setWithdrawError] = useState<string | null>(null);

  useEffect(() => {
    setSelectedMethodId(methods[0]?.id || "");
  }, [methods]);

  const handleWithdrawPrompt = () => {
    if (methods.length === 0) {
      alert("Please add at least one MTN or Airtel Mobile Money withdrawal method below to receive funds.");
      return;
    }
    setWithdrawError(null);
    setWithdrawAmount("");
    setWithdrawStep("form");
    setShowWithdrawModal(true);
  };

  const handleConfirmWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amountNum = Number(withdrawAmount);
    if (!amountNum || isNaN(amountNum) || amountNum <= 0) {
      setWithdrawError("Please enter a valid amount.");
      return;
    }
    if (amountNum > balance) {
      setWithdrawError(`Insufficient balance. You can withdraw up to UGX ${balance.toLocaleString()}.`);
      return;
    }
    if (!selectedMethodId) {
      setWithdrawError("Please select a Mobile Money target line.");
      return;
    }

    setWithdrawStep("loading");
    setWithdrawError(null);

    setTimeout(() => {
      const selectedMethod = methods.find(m => m.id === selectedMethodId);
      const updatedBalance = balance - amountNum;
      setBalance(updatedBalance);
      localStorage.setItem("hustler_balance", String(updatedBalance));

      const newTx = {
        id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
        time: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        name: `Mobile Money Payout (${selectedMethod?.provider || "MTN"})`,
        type: "Withdrawal Clearance",
        business: `Payout to ${selectedMethod?.phoneNumber || "****"}`,
        status: "Cleared",
        amount: `-UGX ${amountNum.toLocaleString()}`,
        isPositive: false
      };

      const updatedTxs = [newTx, ...transactions];
      setTransactions(updatedTxs);
      localStorage.setItem("hustler_transactions", JSON.stringify(updatedTxs));

      // Notification
      const name = localStorage.getItem("hustlerName") || "Hustler";
      const userTypeLocal = localStorage.getItem("userType") || "hustler";
      const notificationsKey = `notifications_hustler`;
      const curNots = JSON.parse(localStorage.getItem(notificationsKey) || "[]");
      const newNot = {
        id: Date.now(),
        type: "withdrawal_complete",
        title: "Withdrawal Request Processed",
        description: `UGX ${amountNum.toLocaleString()} successfully sent via Mobile Money to ${selectedMethod?.accountName}.`,
        timestamp: new Date().toISOString(),
        unread: true
      };
      localStorage.setItem(notificationsKey, JSON.stringify([newNot, ...curNots]));
      window.dispatchEvent(new Event("referr-notification-update"));

      setWithdrawStep("success");
    }, 1500);
  };

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) return <LoadingScreen text="Fetching wallet balances..." />;

  return (
    <div className="w-full pb-24 text-slate-900">
      <div className="max-w-7xl mx-auto pt-8 px-4 space-y-8 animate-fade-in">
        
        <header className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
                Earnings & Wallet
              </h1>
              <p className="text-slate-500 text-sm md:text-base">Manage your referrals, payouts, and financial growth.</p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={handleWithdrawPrompt}
                className="px-6 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-xs hover:bg-slate-800 transition-all cursor-pointer shadow-sm active:scale-[0.98] uppercase tracking-wider"
              >
                Withdraw Funds
              </button>
            </div>
          </div>
        </header>

        {/* Balance Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[180px]">
             <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Total Balance</p>
               <h2 className="text-3xl font-bold text-slate-900">UGX {balance.toLocaleString()}</h2>
             </div>
             <p className="text-xs text-slate-500">Available for withdrawal</p>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[180px]">
             <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Pending Clearance</p>
               <h2 className="text-3xl font-bold text-pink-600">UGX {pending.toLocaleString()}</h2>
             </div>
             <p className="text-xs text-slate-500">Expected in 14 days</p>
          </div>
          <div className="bg-white border border-slate-200/80 rounded-xl p-8 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between h-[180px]">
             <div>
               <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-2">Personal Balance</p>
               <h2 className="text-3xl font-bold text-slate-900">UGX {personalBalance.toLocaleString()}</h2>
             </div>
             {userType !== 'hustler' && (
               <p className="text-xs text-pink-600 font-bold underline cursor-pointer">Top up</p>
             )}
          </div>
        </div>

        {/* Transactions Table */}
        <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
          <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Financial Activity</h3>
            <div className="flex items-center gap-2">
              <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 focus:outline-none focus:border-slate-300">
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
                <tr className="bg-slate-50 border-b border-slate-100 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  <th className="px-6 py-4">Date</th>
                  <th className="px-6 py-4">Activity</th>
                  <th className="px-6 py-4">Business</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {transactions.length > 0 ? transactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4 text-xs text-slate-500">{tx.time}</td>
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-900">{tx.name}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5">{tx.type}</p>
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-600">{tx.business}</td>
                    <td className="px-6 py-4">
                       <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                         tx.status === 'Cleared' || tx.status === 'Completed' 
                          ? 'bg-pink-50 text-pink-700' 
                          : 'bg-amber-50 text-amber-700'
                       }`}>
                         {tx.status}
                       </span>
                    </td>
                    <td className={`px-6 py-4 text-xs font-bold text-right ${tx.isPositive ? 'text-pink-600' : 'text-slate-900'}`}>
                      {tx.amount}
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-20 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <History className="text-slate-300" size={32} />
                        <p className="text-slate-500 font-bold text-sm">No transactions found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50 text-center">
            <button className="text-sm font-bold text-pink-600 hover:text-pink-700 hover:underline transition-colors">
              View full financial statement
            </button>
          </div>
        </div>

        {/* Payout Methods */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="bg-white border border-gray-200 rounded-lg p-8 shadow-sm">
             <h3 className="text-lg font-bold text-[#222325] mb-6">Withdrawal Method</h3>
             
             <div className="space-y-3">
               {methods.length === 0 ? (
                 <div className="text-center py-6 border border-dashed border-gray-200 rounded-lg bg-gray-50/20">
                   <Smartphone className="mx-auto text-slate-300 mb-2" size={28} />
                   <p className="text-xs text-slate-400 font-semibold">No withdrawal methods added yet.</p>
                   <p className="text-[11px] text-slate-400/80">Add your MTN or Airtel line below.</p>
                 </div>
               ) : (
                 methods.map((m) => (
                   <div key={m.id} className="flex items-center justify-between p-4 border border-gray-200 rounded hover:border-[#ec4899] transition-colors group bg-white">
                     <div className="flex items-center gap-4">
                       <div className="w-12 h-12 rounded flex items-center justify-center overflow-hidden p-1 bg-slate-50 border border-slate-100 shrink-0">
                         {m.provider === "MTN" ? (
                           <img 
                             src="https://www.mtn.co.ug/wp-content/themes/mtn-vivid-wp/public/img/mtn-logo.svg" 
                             alt="MTN" 
                             className="w-full h-full object-contain" 
                           />
                         ) : (
                           <img 
                             src="https://upload.wikimedia.org/wikipedia/commons/f/fb/Bharti_Airtel_Logo.svg" 
                             alt="Airtel" 
                             className="w-full h-full object-contain" 
                           />
                         )}
                       </div>
                       <div>
                         <p className="font-bold text-sm text-[#404145]">{m.provider === 'MTN' ? 'MTN Mobile Money' : 'Airtel Money'}</p>
                         <p className="text-xs text-slate-500 font-medium mt-0.5">{m.accountName} • Ending in ****{m.endingDigits}</p>
                         <p className="text-[11px] text-slate-400 font-mono mt-0.5">{m.phoneNumber}</p>
                       </div>
                     </div>
                     <button 
                       onClick={() => handleDeleteMethod(m.id)}
                       title="Delete method"
                       className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-slate-100 rounded transition-colors"
                     >
                       <Trash2 size={15} />
                     </button>
                   </div>
                 ))
               )}
             </div>

             {/* Add Method Form Toggle */}
             {showAddForm ? (
               <form onSubmit={handleAddMethod} className="space-y-4 border border-gray-200 rounded-lg p-5 bg-slate-50/50 mt-4 transition-all">
                 <h4 className="text-sm font-bold text-[#222325]">Add Payout Phone</h4>
                 
                 <div className="space-y-1.5">
                   <span className="block text-xs font-bold text-[#62646a] uppercase tracking-wider font-mono">Select Provider</span>
                   <div className="flex items-center gap-6 mt-1">
                     <label className="flex items-center gap-2 text-sm font-bold text-[#404145] cursor-pointer">
                       <input 
                         type="radio" 
                         name="newProvider"
                         checked={newProvider === "MTN"}
                         onChange={() => setNewProvider("MTN")}
                         className="text-[#ec4899] focus:ring-[#ec4899]"
                       />
                       <span>MTN Mobile Money</span>
                     </label>
                     <label className="flex items-center gap-2 text-sm font-bold text-[#404145] cursor-pointer">
                       <input 
                         type="radio" 
                         name="newProvider"
                         checked={newProvider === "Airtel"}
                         onChange={() => setNewProvider("Airtel")}
                         className="text-[#ec4899] focus:ring-[#ec4899]"
                       />
                       <span>Airtel Money</span>
                     </label>
                   </div>
                 </div>

                 <div className="space-y-1">
                   <label className="block text-[11px] font-bold text-[#62646a] uppercase font-mono">Account Name (Full Legal Name)</label>
                   <input 
                     type="text" 
                     required
                     placeholder="e.g. Angella Namubiru"
                     value={accountName}
                     onChange={(e) => setAccountName(e.target.value)}
                     className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs font-medium text-[#404145] focus:outline-none focus:border-[#ec4899]"
                   />
                 </div>

                 <div className="space-y-1">
                   <label className="block text-[11px] font-bold text-[#62646a] uppercase font-mono">Phone Number</label>
                   <input 
                     type="text" 
                     required
                     placeholder="e.g. 0770 000 000 or +256 ..."
                     value={phoneNumber}
                     onChange={(e) => setPhoneNumber(e.target.value)}
                     className="w-full bg-white border border-gray-300 rounded px-3 py-2 text-xs font-medium text-[#404145] focus:outline-none focus:border-[#ec4899]"
                   />
                 </div>

                 <div className="flex items-center gap-3 pt-2">
                   <button 
                     type="submit"
                     className="px-4 py-2 bg-[#ec4899] hover:bg-[#159a58] text-white rounded font-bold text-xs uppercase tracking-wider transition-colors"
                   >
                     Add Method
                   </button>
                   <button 
                     type="button" 
                     onClick={() => {
                       setShowAddForm(false);
                       setPhoneNumber("");
                       setAccountName("");
                     }}
                     className="px-4 py-2 border border-gray-300 rounded text-[#62646a] font-bold text-xs uppercase tracking-wider hover:bg-gray-100 transition-colors"
                   >
                     Cancel
                   </button>
                 </div>
               </form>
             ) : (
               <button 
                 onClick={() => setShowAddForm(true)}
                 className="mt-6 flex items-center gap-2 text-sm font-bold text-[#ec4899] hover:underline"
               >
                  <Plus size={16} /> Add a new withdrawal method
               </button>
             )}
           </div>

           <div className="bg-[#ec4899]/5 border border-[#ec4899]/20 rounded-lg p-8 shadow-sm">
             <h3 className="text-lg font-bold text-[#222325] mb-2">Need help?</h3>

             {/* Interactive Withdrawal Modal Overlay */}
             {showWithdrawModal && (
               <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                 <div className="bg-white rounded-2xl border border-gray-100 p-8 max-w-sm w-full shadow-2xl space-y-5 text-left relative animate-fade-in">
                   <button 
                     type="button"
                     onClick={() => setShowWithdrawModal(false)}
                     className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 font-bold p-[4px] cursor-pointer"
                   >
                     ✕
                   </button>

                   {withdrawStep === "form" && (
                     <form onSubmit={handleConfirmWithdraw} className="space-y-4">
                       <div className="space-y-1">
                         <h3 className="text-lg font-black text-gray-900 leading-tight">Withdraw via Mobile Money</h3>
                         <p className="text-xs text-gray-500">Instant payout to your active telecom line.</p>
                       </div>

                       {withdrawError && (
                         <div className="p-3 bg-red-50 text-red-600 rounded text-xs font-semibold border border-red-100">
                           {withdrawError}
                         </div>
                       )}

                       <div className="space-y-1">
                         <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Available Balance</label>
                         <div className="text-xl font-black text-gray-950">UGX {balance.toLocaleString()}</div>
                       </div>

                       <div className="space-y-1">
                         <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Select Line</label>
                         <select 
                           value={selectedMethodId}
                           onChange={(e) => setSelectedMethodId(e.target.value)}
                           className="w-full bg-white border border-gray-300 rounded-lg p-2 text-xs font-bold focus:outline-none focus:border-[#ec4899]"
                         >
                           {methods.map((m) => (
                             <option key={m.id} value={m.id}>
                               {m.provider} - {m.accountName} ({m.phoneNumber})
                             </option>
                           ))}
                         </select>
                       </div>

                       <div className="space-y-1">
                         <label className="block text-[10px] font-bold text-gray-400 uppercase tracking-wider">Amount (UGX)</label>
                         <div className="relative">
                           <input 
                             type="number"
                             required
                             min="1000"
                             max={balance}
                             placeholder="e.g. 50000"
                             value={withdrawAmount}
                             onChange={(e) => setWithdrawAmount(e.target.value)}
                             className="w-full bg-white border border-gray-300 rounded-lg pl-12 pr-4 py-2 text-xs font-bold focus:outline-none focus:border-[#ec4899]"
                           />
                           <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-[10px]">UGX</span>
                         </div>
                         <p className="text-[10px] text-gray-400">A telecom tax of 0.5% applies.</p>
                       </div>

                       <div className="pt-2 flex items-center gap-2">
                         <button 
                           type="submit"
                           className="flex-1 py-2.5 bg-[#ec4899] hover:bg-[#159a58] text-white rounded-lg font-bold text-xs uppercase tracking-wider cursor-pointer text-center font-bold"
                         >
                           Confirm
                         </button>
                         <button 
                           type="button"
                           onClick={() => setShowWithdrawModal(false)}
                           className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-600 font-bold text-xs hover:bg-gray-100 transition-colors"
                         >
                           Cancel
                         </button>
                       </div>
                     </form>
                   )}

                   {withdrawStep === "loading" && (
                     <div className="py-8 flex flex-col items-center justify-center text-center space-y-3">
                       <div className="w-10 h-10 border-4 border-[#ec4899] border-t-transparent rounded-full animate-spin" />
                       <div className="space-y-1">
                         <p className="font-bold text-gray-900 text-sm">Processing mobile payout...</p>
                         <p className="text-[10px] text-gray-400">Verifying transfer state with Telecom...</p>
                       </div>
                     </div>
                   )}

                   {withdrawStep === "success" && (
                     <div className="py-6 flex flex-col items-center justify-center text-center space-y-4">
                       <div className="size-12 rounded-full bg-pink-100 text-[#ec4899] flex items-center justify-center shadow-sm">
                         <svg className="size-6 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                           <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                         </svg>
                       </div>
                       <div className="space-y-1">
                         <h3 className="text-base font-black text-gray-900">Transfer Initiated!</h3>
                         <p className="text-[11px] text-slate-500 leading-relaxed max-w-xs">
                           UGX {Number(withdrawAmount).toLocaleString()} is successfully sent. We notified your cellular device.
                         </p>
                       </div>
                       <button 
                         type="button"
                         onClick={() => setShowWithdrawModal(false)}
                         className="w-full py-2 bg-gray-950 text-white rounded-lg font-bold text-xs uppercase hover:bg-black transition-colors animate-fade-in"
                       >
                         Ok, Close
                       </button>
                     </div>
                   )}
                 </div>
               </div>
             )}
             <p className="text-sm text-slate-500 mb-6">Learn more about how our payout system works and when you can expect your funds.</p>
             <button className="px-6 py-2.5 border border-slate-900 text-slate-900 rounded-lg font-bold text-sm hover:bg-slate-900 hover:text-white transition-all">
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
