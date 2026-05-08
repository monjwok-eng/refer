import SidebarLayout from './SidebarLayout';
import { motion } from 'motion/react';
import { User, Mail, MapPin, Calendar, Camera, Edit2 } from 'lucide-react';

export default function Profile() {
  const name = localStorage.getItem('hustlerName') || 'Hustler';
  const firstName = name.split(' ')[0];

  return (
    <SidebarLayout title="Profile">
      <div className="mb-10">
        <h1 className="text-[32px] font-bold tracking-tight mb-2">My Profile</h1>
        <p className="text-[#62646a] text-lg font-light">Manage your public presence and account details.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="xl:col-span-1">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-[#e4e5e7] shadow-sm overflow-hidden"
          >
            <div className="p-8 flex flex-col items-center text-center">
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full bg-[#1dbf73] flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                  {firstName[0]}
                </div>
                <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full border border-[#e4e5e7] shadow-sm hover:bg-gray-50 transition-colors text-[#62646a]">
                  <Camera size={14} />
                </button>
              </div>
              <h2 className="text-xl font-bold mb-1">{name}</h2>
              <p className="text-[#62646a] text-[15px] mb-4">Level 2 Seller • Referral Expert</p>
              
              <button className="w-full py-2.5 px-4 rounded border border-[#222325] font-bold text-[14px] hover:bg-gray-50 transition-all mb-8">
                Preview Public Profile
              </button>

              <div className="w-full pt-6 border-t border-[#f1f1f1] space-y-4 text-left">
                <div className="flex items-center justify-between text-[14px]">
                  <div className="flex items-center gap-2 text-[#62646a]">
                    <MapPin size={16} />
                    <span>From</span>
                  </div>
                  <span className="font-bold">United States</span>
                </div>
                <div className="flex items-center justify-between text-[14px]">
                  <div className="flex items-center gap-2 text-[#62646a]">
                    <User size={16} />
                    <span>Member since</span>
                  </div>
                  <span className="font-bold">May 2024</span>
                </div>
                <div className="flex items-center justify-between text-[14px]">
                  <div className="flex items-center gap-2 text-[#62646a]">
                    <Calendar size={16} />
                    <span>Last Active</span>
                  </div>
                  <span className="font-bold">Just now</span>
                </div>
              </div>
            </div>
          </motion.div>

          <div className="mt-8 bg-white rounded-xl border border-[#e4e5e7] p-8 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold">Description</h3>
              <button className="text-[#1dbf73] font-bold text-[14px] hover:underline">Edit</button>
            </div>
            <p className="text-[#62646a] text-[15px] font-light italic">
              "Professional connector specializing in B2B sales and high-level networking. Helping businesses find the right partners through verified referrals."
            </p>
          </div>
        </div>

        {/* Account Settings / Info */}
        <div className="xl:col-span-2 space-y-8">
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white rounded-xl border border-[#e4e5e7] shadow-sm"
          >
            <div className="px-8 py-6 border-b border-[#e4e5e7] flex justify-between items-center">
              <h3 className="font-bold text-lg">Account Information</h3>
              <button className="flex items-center gap-2 text-[#1dbf73] font-bold text-[14px]">
                <Edit2 size={14} /> Edit Info
              </button>
            </div>
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-1">
                <label className="text-[13px] font-bold text-[#b5b6ba] uppercase tracking-wider">Full Name</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50/50 border border-[#e4e5e7] rounded-lg">
                  <User size={18} className="text-[#74767e]" />
                  <span className="text-[15px]">{name}</span>
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[13px] font-bold text-[#b5b6ba] uppercase tracking-wider">Email Address</label>
                <div className="flex items-center gap-3 p-3 bg-gray-50/50 border border-[#e4e5e7] rounded-lg">
                  <Mail size={18} className="text-[#74767e]" />
                  <span className="text-[15px]">user@example.com</span>
                </div>
              </div>
              {/* More fields can be added here */}
            </div>
          </motion.div>

          <div className="bg-white rounded-xl border border-[#e4e5e7] shadow-sm">
            <div className="px-8 py-6 border-b border-[#e4e5e7]">
              <h3 className="font-bold text-lg">Skills & Certifications</h3>
            </div>
            <div className="p-8">
              <div className="flex flex-wrap gap-2">
                {['Networking', 'Lead Gen', 'B2B Sales', 'Referral Strategy', 'Negotiation'].map(skill => (
                  <span key={skill} className="px-4 py-1.5 bg-gray-100 text-[#62646a] rounded-full text-[13px] font-medium border border-transparent hover:border-[#1dbf73] hover:text-[#1dbf73] cursor-default transition-all">
                    {skill}
                  </span>
                ))}
                <button className="px-4 py-1.5 border border-dashed border-[#b5b6ba] text-[#b5b6ba] rounded-full text-[13px] font-medium hover:border-[#1dbf73] hover:text-[#1dbf73] transition-all">
                  + Add New
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SidebarLayout>
  );
}
