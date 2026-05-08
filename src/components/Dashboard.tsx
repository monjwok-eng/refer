import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Briefcase, 
  TrendingUp, 
  CheckCircle2, 
  MoreHorizontal,
  Star,
  Plus
} from 'lucide-react';
import SidebarLayout from './SidebarLayout';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('Overview');
  const [tabs, setTabs] = useState(['Overview', 'Active Orders', 'My Gigs', 'Analytics']);
  const userType = localStorage.getItem('userType') || 'hustler';
  const name = userType === 'business' 
    ? (localStorage.getItem('businessName') || 'Business') 
    : (localStorage.getItem('hustlerName') || 'Hustler');
  const firstName = name.split(' ')[0];

  const stats = userType === 'business' ? [
    { label: 'Referrals Received', value: '12', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Qualified Leads', value: '8', icon: CheckCircle2, color: 'text-[#1dbf73]', bg: 'bg-green-50' },
    { label: 'Hiring Spending', value: '$2,400', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Network Reach', value: '850', icon: Star, color: 'text-orange-500', bg: 'bg-orange-50' },
  ] : [
    { label: 'Referrals Sent', value: '42', icon: Briefcase, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Successful Matches', value: '28', icon: CheckCircle2, color: 'text-[#1dbf73]', bg: 'bg-green-50' },
    { label: 'Total Commissions', value: '$3,840', icon: TrendingUp, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'Conversion Rate', value: '64%', icon: Star, color: 'text-orange-500', bg: 'bg-orange-50' },
  ];

  const activeReferrals = userType === 'business' ? [
    { id: 1, lead: 'Alex Johnson', opportunity: 'Senior React Dev', reward: '$500 bounty', status: 'In Review', trustScore: '96' },
    { id: 2, lead: 'Sarah Miller', opportunity: 'UX Designer', reward: '$300 bounty', status: 'Interviewing', trustScore: '99' },
    { id: 3, lead: 'David Chen', opportunity: 'Product Manager', reward: '$1,000 bounty', status: 'Hired', trustScore: '92' },
  ] : [
    { id: 1, lead: 'TechCore Systems', opportunity: 'AI CRM Integration', reward: '$50', status: 'In Discussion', trustScore: '98' },
    { id: 2, lead: 'Branding Inc', opportunity: 'Logo Rebrand Lead', reward: '$100', status: 'Qualified', trustScore: '92' },
    { id: 3, lead: 'SmallBiz Web', opportunity: 'E-commerce Build', reward: '$200', status: 'Matching', trustScore: '85' },
  ];

  const handleAddTab = () => {
    const newTab = prompt('Enter pipeline stage name:');
    if (newTab && !tabs.includes(newTab)) {
      setTabs([...tabs, newTab]);
    }
  };

  const handleRemoveTab = (e: React.MouseEvent, tab: string) => {
    e.stopPropagation();
    if (tabs.length > 1) {
      const newTabs = tabs.filter(t => t !== tab);
      setTabs(newTabs);
      if (activeTab === tab) setActiveTab(newTabs[0]);
    }
  };

  return (
    <SidebarLayout title="Referral Dashboard">
      {/* Welcome Section */}
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight mb-2">
          {userType === 'business' ? `Welcome back, ${firstName}` : `Network Hub, ${firstName}`}
        </h1>
        <p className="text-[#62646a] text-lg font-light">
          {userType === 'business' 
            ? 'Manage your hiring pipeline and reviewreferred candidates.' 
            : 'Monitor your referral flow and commission milestones.'}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {stats.map((stat, idx) => (
          <motion.div 
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl border border-[#e4e5e7] shadow-sm hover:shadow-md transition-shadow cursor-default"
          >
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
              </div>
              <button className="text-[#b5b6ba] hover:text-[#222325]">
                <MoreHorizontal size={20} />
              </button>
            </div>
            <h3 className="text-[#62646a] text-[14px] font-medium mb-1">{stat.label}</h3>
            <p className="text-[28px] font-bold">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Referral Pipeline Section */}
      <div className="bg-white rounded-xl border border-[#e4e5e7] shadow-sm overflow-hidden mb-10">
        <div className="border-b border-[#e4e5e7] px-8 flex items-center overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`py-5 px-6 text-[15px] font-semibold whitespace-nowrap relative transition-colors group flex items-center gap-2 ${
                activeTab === tab ? 'text-[#1dbf73]' : 'text-[#62646a] hover:text-[#222325]'
              }`}
            >
              {tab}
              {tabs.length > 1 && (
                <span 
                  onClick={(e) => handleRemoveTab(e, tab)}
                  className="opacity-0 group-hover:opacity-100 text-[#b5b6ba] hover:text-red-500 transition-opacity ml-1"
                >
                  &times;
                </span>
              )}
              {activeTab === tab && (
                <motion.div 
                  layoutId="tabUnderline" 
                  className="absolute bottom-0 left-0 right-0 h-[3px] bg-[#1dbf73]" 
                />
              )}
            </button>
          ))}
          <button 
            onClick={handleAddTab}
            className="p-2 ml-2 text-[#b5b6ba] hover:text-[#1dbf73] transition-colors rounded-full hover:bg-gray-50"
            title="Add Pipeline Stage"
          >
            <Plus size={20} />
          </button>
        </div>

        <div className="p-8">
          <AnimatePresence mode="wait">
            {activeTab === 'Overview' || activeTab === 'Active Orders' || activeTab === 'Referrals' ? (
              <motion.div 
                key="pipeline"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6"
              >
                <div className="flex justify-between items-center mb-2">
                  <h2 className="text-xl font-bold">{userType === 'business' ? 'Hiring Pipeline' : 'Referral Pipeline'}</h2>
                  <Link to="/deals" className="text-[#1dbf73] font-semibold text-[14px] hover:underline">
                    {userType === 'business' ? 'Post a Role' : 'Refer a Contact'}
                  </Link>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="text-[13px] text-[#b5b6ba] uppercase tracking-wider">
                      <tr>
                        <th className="pb-4 font-bold">{userType === 'business' ? 'Candidate' : 'Lead/Contact'}</th>
                        <th className="pb-4 font-bold">Opportunity</th>
                        <th className="pb-4 font-bold">{userType === 'business' ? 'Bounty/Salary' : 'Potential Reward'}</th>
                        <th className="pb-4 font-bold">Stage</th>
                        <th className="pb-4 font-bold">Match Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#e4e5e7]">
                      {activeReferrals.map((ref) => (
                        <tr key={ref.id} className="group hover:bg-gray-50/50 transition-colors">
                          <td className="py-5">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-[12px] font-bold">
                                {ref.lead.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span className="font-semibold text-[15px]">{ref.lead}</span>
                            </div>
                          </td>
                          <td className="py-5">
                            <p className="text-[15px] text-[#62646a]">{ref.opportunity}</p>
                          </td>
                          <td className="py-5">
                            <span className="font-bold text-[15px]">{ref.reward}</span>
                          </td>
                          <td className="py-5 text-[14px]">
                            <span className={`px-2.5 py-1 rounded-full text-[12px] font-bold uppercase tracking-wide ${
                              ref.status === 'In Discussion' ? 'bg-blue-50 text-blue-600' :
                              ref.status === 'Qualified' ? 'bg-green-50 text-green-600' :
                              'bg-orange-50 text-orange-600'
                            }`}>
                              {ref.status}
                            </span>
                          </td>
                          <td className="py-5">
                            <div className="flex items-center gap-2">
                              <div className="flex-1 h-1.5 w-16 bg-gray-100 rounded-full overflow-hidden">
                                <div className="h-full bg-[#1dbf73]" style={{ width: `${ref.trustScore}%` }} />
                              </div>
                              <span className="text-[13px] font-bold">{ref.trustScore}%</span>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 flex flex-col items-center text-center max-w-sm mx-auto"
              >
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6 text-[#b5b6ba]">
                  <Briefcase size={36} strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold mb-2">No activity in {activeTab}</h3>
                <p className="text-[#62646a] text-[15px]">You haven't submitted any referrals that are currently in the "{activeTab}" stage.</p>
                <button className="mt-8 px-8 py-3 bg-[#1dbf73] text-white font-bold rounded hover:bg-[#19a463] transition-all shadow-sm">
                  Find New Opportunities
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </SidebarLayout>
  );
}
