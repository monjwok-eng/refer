import SidebarLayout from './SidebarLayout';
import { motion } from 'motion/react';
import { Wallet as WalletIcon, ArrowUpRight, ArrowDownLeft, History } from 'lucide-react';

export default function Wallet() {
  const transactions = [
    { id: 1, type: 'Income', client: 'Alex Rivera', amount: '+$45.00', date: 'May 12, 2024', status: 'Completed' },
    { id: 2, type: 'Income', client: 'Marcus Thorne', amount: '+$80.00', date: 'May 10, 2024', status: 'Completed' },
    { id: 3, type: 'Withdraw', client: 'Bank Transfer', amount: '-$200.00', date: 'May 08, 2024', status: 'Processing' },
    { id: 4, type: 'Income', client: 'Sarah Chen', amount: '+$120.00', date: 'May 05, 2024', status: 'Completed' },
  ];

  return (
    <SidebarLayout title="Earnings">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight mb-2">Earnings</h1>
        <p className="text-[#62646a] text-lg font-light">Manage your balance and track your referral income.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
        {/* Main Balance Card */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="lg:col-span-2 bg-gradient-to-br from-[#1dbf73] to-[#19a463] p-10 rounded-2xl text-white shadow-lg relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-[14px] font-bold uppercase tracking-wider opacity-80 mb-2">Available Balance</h2>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-5xl font-extrabold tracking-tight">$450.00</span>
              <span className="text-xl opacity-80">USD</span>
            </div>
            
            <div className="flex gap-4">
              <button 
                onClick={() => alert('Withdrawal request initiated!')}
                className="bg-white text-[#1dbf73] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-all shadow-sm"
              >
                Withdraw Funds
              </button>
              <button className="bg-black/10 backdrop-blur text-white border border-white/20 px-8 py-3 rounded-full font-bold hover:bg-white/10 transition-all">
                Manage Payouts
              </button>
            </div>
          </div>
          
          <WalletIcon 
            size={200} 
            className="absolute -right-10 -bottom-10 opacity-10 rotate-12" 
            strokeWidth={1}
          />
        </motion.div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-[#e4e5e7] shadow-sm">
            <div className="flex items-center gap-4 mb-2 text-[#62646a]">
              <ArrowUpRight size={18} className="text-[#1dbf73]" />
              <span className="text-[14px] font-medium">Total Earned</span>
            </div>
            <p className="text-3xl font-bold text-[#222325]">$3,840.50</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-[#e4e5e7] shadow-sm">
            <div className="flex items-center gap-4 mb-2 text-[#62646a]">
              <History size={18} className="text-blue-500" />
              <span className="text-[14px] font-medium">Pending Clearance</span>
            </div>
            <p className="text-3xl font-bold text-[#222325]">$145.00</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl border border-[#e4e5e7] shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-[#e4e5e7] flex items-center justify-between">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <History size={20} className="text-[#b5b6ba]" />
            Transaction History
          </h2>
          <button className="text-[14px] font-bold text-[#1dbf73] hover:underline">Download CSV</button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="text-[13px] text-[#b5b6ba] uppercase tracking-wider bg-[#fafafa]">
              <tr>
                <th className="px-8 py-4 font-bold">Transaction</th>
                <th className="px-8 py-4 font-bold">Date</th>
                <th className="px-8 py-4 font-bold">Amount</th>
                <th className="px-8 py-4 font-bold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e4e5e7]">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        tx.type === 'Income' ? 'bg-green-50 text-[#1dbf73]' : 'bg-red-50 text-red-500'
                      }`}>
                        {tx.type === 'Income' ? <ArrowDownLeft size={16} /> : <ArrowUpRight size={16} />}
                      </div>
                      <div>
                        <p className="font-bold text-[15px]">{tx.type}</p>
                        <p className="text-[12px] text-[#62646a]">{tx.client}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] text-[#222325]">{tx.date}</td>
                  <td className={`px-8 py-5 font-bold ${tx.type === 'Income' ? 'text-[#1dbf73]' : 'text-red-500'}`}>
                    {tx.amount}
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wide ${
                      tx.status === 'Completed' ? 'bg-green-50 text-green-600' : 'bg-blue-50 text-blue-600'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </SidebarLayout>
  );
}
