import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  User,
  Lock,
  Bell,
  Globe,
  Shield,
  CreditCard,
  Check,
  ChevronRight,
  LogOut,
  Camera,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const tabs = [
  { id: "profile", label: "Profile", icon: User },
  { id: "workspace", label: "Workspace", icon: Globe },
  { id: "billing", label: "Billing & Subscription", icon: CreditCard },
  { id: "security", label: "Security", icon: Lock },
  { id: "notifications", label: "Notifications", icon: Bell },
];

export default function SettingsPage() {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const userType = localStorage.getItem("userType") || "hustler";
  const name = userType === "business"
    ? localStorage.getItem("businessName") || "Business"
    : localStorage.getItem("hustlerName") || "Hustler";
  const userEmail = localStorage.getItem("userEmail") || "aria@referr.io";
  const userPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get("tab");
    if (tab && tabs.some(t => t.id === tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-[1000px] mx-auto pb-24 px-4 md:px-0">
      {/* Save Success Popup */}
      <AnimatePresence>
        {saved && (
          <motion.div
            initial={{ opacity: 0, y: -25, x: "-50%", scale: 0.95 }}
            animate={{ opacity: 1, y: 0, x: "-50%", scale: 1 }}
            exit={{ opacity: 0, y: -25, x: "-50%", scale: 0.95 }}
            className="fixed top-12 left-1/2 z-[200] bg-white px-8 py-5 flex items-center gap-6 shadow-[0_30px_70px_rgba(0,0,0,0.12)] border-l-[6px] border-[#1dbf73] min-w-[360px] border border-slate-100"
          >
            <div className="w-6 h-6 rounded-full bg-[#1dbf73] flex items-center justify-center text-white shrink-0">
              <Check size={14} strokeWidth={4} />
            </div>
            <div className="flex-1">
              <p className="text-[14px] font-black text-[#222325] uppercase tracking-wider italic leading-none mb-1">
                Synchronized
              </p>
              <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">
                System updated
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <div className="sticky top-[60px] z-[100] bg-white -mx-4 px-4 md:mx-0 md:px-0 py-6 md:py-8 flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-4 border-b border-slate-100">
        <div>
          <h1 className="text-[32px] font-bold text-[#222325] tracking-tight italic">
            Settings
          </h1>
          <p className="text-slate-400 text-[14px] mt-1">
            Manage your account and preferences.
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="w-full md:w-auto justify-center bg-[#1dbf73] text-white px-10 py-3 rounded-none font-bold hover:bg-[#19a463] transition-all flex items-center gap-2 uppercase tracking-widest text-[12px] disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_20px_rgba(29,191,115,0.2)]"
        >
          {isSaving ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : saved ? (
            <Check size={18} />
          ) : (
            "Save Changes"
          )}
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-12 relative items-start">
        {/* Sidebar Tabs */}
        <div className="w-full md:w-[240px] shrink-0 space-y-2 flex gap-2 md:block overflow-x-auto pb-2 md:pb-0 hide-scrollbar md:sticky md:top-[180px] z-50">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-shrink-0 md:w-full flex items-center gap-2 md:gap-4 px-4 md:px-6 py-3 md:py-4 rounded-none transition-all text-left ${
                  activeTab === tab.id
                    ? "bg-white border border-slate-200 text-[#1dbf73] md:border-l-4 md:border-l-[#1dbf73] border-b-4 border-b-[#1dbf73] md:border-b"
                    : "text-slate-400 hover:text-[#222325] hover:bg-white/50 border border-transparent md:border-transparent"
                }`}
              >
                <Icon
                  size={18}
                  strokeWidth={activeTab === tab.id ? 2.5 : 1.5}
                />
                <span
                  className={`text-[14px] font-bold ${activeTab === tab.id ? "" : "font-medium"}`}
                >
                  {tab.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="flex-1 w-full overflow-hidden">
          <div className="bg-white border border-slate-200 p-6 md:p-12">
            {activeTab === "workspace" && (
              <div className="space-y-10">
                <div className="space-y-2">
                  <h3 className="text-[18px] font-bold text-[#222325]">
                    Workspace Settings
                  </h3>
                  <p className="text-slate-400 text-[13px] font-light">
                    Manage your company workspace, team access, and unique brand identity.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                      Workspace Name
                    </label>
                    <input
                      type="text"
                      defaultValue="Aria Global"
                      className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[14px] outline-none focus:border-black transition-all italic font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                      Custom Domain
                    </label>
                    <div className="p-4 bg-emerald-50 border border-emerald-100 rounded flex items-center justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-[13px] font-bold text-emerald-900">Need help with DNS?</p>
                        <p className="text-[11px] text-emerald-700/80 italic font-light">Custom domains require technical setup. Our experts can handle this for you.</p>
                      </div>
                      <button className="text-[12px] font-black text-emerald-600 uppercase tracking-wider hover:underline whitespace-nowrap">
                        Hire an Expert →
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100 space-y-8">
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-bold text-[#222325]">
                      Team Members
                    </h3>
                    <p className="text-slate-400 text-[13px] font-light">
                      Invite collaborators to manage your business dashboard and referral campaigns.
                    </p>
                  </div>

                  <div className="space-y-6">
                    <div className="flex items-end gap-4">
                      <div className="flex-1 space-y-2">
                        <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="collaborator@company.com"
                          className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[14px] outline-none focus:border-black transition-all italic font-light"
                        />
                      </div>
                      <div className="w-1/3 space-y-2">
                        <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                          Role
                        </label>
                        <select className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[14px] outline-none focus:border-black transition-all italic font-light appearance-none rounded-none">
                          <option>Admin</option>
                          <option>Editor</option>
                          <option>Viewer</option>
                        </select>
                      </div>
                      <button className="bg-black text-white px-8 py-4 text-[14px] font-bold hover:bg-[#1dbf73] transition-colors whitespace-nowrap">
                        Invite
                      </button>
                    </div>

                    <div className="border border-slate-100 bg-slate-50/50 p-4 rounded flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-xs uppercase">
                          ME
                        </div>
                        <div>
                          <p className="text-[14px] font-bold text-[#222325]">Goldy (You)</p>
                          <p className="text-[12px] text-slate-400 font-light italic">owner@aria.com</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">Owner</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "profile" && (
              <div className="space-y-10">
                {/* Avatar Section */}
                <div className="flex items-center gap-8 pb-10 border-b border-slate-100">
                  <div className="relative group">
                    <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-100">
                      <img
                        src={userPicture}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <button className="absolute inset-0 bg-black/40 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <Camera size={20} />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-[18px] font-bold text-[#222325] mb-1">
                      Your Photo
                    </h3>
                    <p className="text-slate-400 text-[13px] font-light italic">
                      Recommended size: 400x400px. JPG, PNG or GIF.
                    </p>
                  </div>
                </div>

                {/* Form Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      defaultValue={name}
                      className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[14px] outline-none focus:border-black transition-all italic font-light"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                      Email Address
                    </label>
                    <input
                      type="email"
                      defaultValue={userEmail}
                      className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[14px] outline-none focus:border-black transition-all italic font-light"
                    />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                      Bio / Headline
                    </label>
                    <textarea
                      defaultValue="Building the next generation of referral marketing. CEO @ Aria."
                      className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[14px] outline-none focus:border-black transition-all italic font-light min-h-[100px] resize-none"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "security" && (
              <div className="space-y-10">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-bold text-[#222325]">
                      Account Password
                    </h3>
                    <p className="text-slate-400 text-[13px] font-light">
                      Update your password to keep your account secure.
                    </p>
                  </div>
                  <div className="space-y-6 max-w-[400px]">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                        Current Password
                      </label>
                      <input
                        type="password"
                        placeholder="••••••••"
                        className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[14px] outline-none focus:border-black transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                        New Password
                      </label>
                      <input
                        type="password"
                        placeholder="Min. 8 characters"
                        className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[14px] outline-none focus:border-black transition-all"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-10 border-t border-slate-100 space-y-6">
                  <div className="space-y-2">
                    <h3 className="text-[18px] font-bold text-[#222325]">
                      Verification PIN
                    </h3>
                    <p className="text-slate-400 text-[13px] font-light">
                      This 4-digit PIN is required when validating customer QR codes at your location.
                    </p>
                  </div>
                  <div className="max-w-[400px] space-y-4">
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-[#222325] uppercase tracking-[0.1em]">
                        4-Digit PIN
                      </label>
                      <input
                        type="text"
                        maxLength={4}
                        placeholder="1234"
                        defaultValue={localStorage.getItem("business_pin") || ""}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "");
                          if (val.length <= 4) {
                            localStorage.setItem("business_pin", val);
                          }
                        }}
                        className="w-full bg-slate-50 border border-slate-200 px-5 py-4 text-[24px] tracking-[0.5em] font-black outline-none focus:border-[#1dbf73] transition-all text-center"
                      />
                    </div>
                    <p className="text-[11px] text-slate-400 font-medium bg-slate-50 p-3 border border-slate-100 rounded">
                      <Shield size={12} className="inline mr-2 text-[#1dbf73]" />
                      Your PIN is stored locally and used for instant deal verification.
                    </p>
                  </div>
                </div>

                <div className="pt-6 border-t border-slate-100 italic font-light text-[13px] text-slate-400">
                  Two-factor authentication is currently{" "}
                  <span className="text-[#1dbf73] font-bold">Enabled</span>.
                </div>
              </div>
            )}

            {activeTab === "notifications" && (
              <div className="space-y-8">
                <NotificationToggle
                  title="New Referral"
                  desc="Get notified when someone uses your link."
                  defaultEnabled={true}
                />
                <NotificationToggle
                  title="Payout Success"
                  desc="Get notified when a payment is processed."
                  defaultEnabled={true}
                />
                <NotificationToggle
                  title="Campaign Updates"
                  desc="Important news about the referral program."
                  defaultEnabled={false}
                />
                <NotificationToggle
                  title="Community Activity"
                  desc="Follows, comments and reactions on posts."
                  defaultEnabled={true}
                />
              </div>
            )}

            {activeTab === "billing" && (
              <div className="space-y-10">
                <div className="p-8 bg-[#222325] text-white rounded-none flex items-center justify-between">
                  <div>
                    <p className="text-[#1dbf73] text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                      Current Plan
                    </p>
                    <h3 className="text-[24px] font-bold italic tracking-tight">
                      Enterprise Pro
                    </h3>
                  </div>
                  <button className="bg-white text-[#222325] px-8 py-3 rounded-none font-bold text-[12px] uppercase tracking-widest hover:bg-slate-100 transition-all">
                    Manage Subscription
                  </button>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[14px] font-black text-[#222325] uppercase tracking-[0.1em]">
                    Payment Methods
                  </h4>
                  <div className="flex items-center justify-between p-6 border border-slate-100 bg-slate-50">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-white border border-slate-200 flex items-center justify-center font-bold text-[10px] uppercase">
                        Visa
                      </div>
                      <div>
                        <p className="text-[14px] font-bold text-[#222325]">
                          •••• •••• •••• 4242
                        </p>
                        <p className="text-[12px] text-slate-400">
                          Expires 12/26
                        </p>
                      </div>
                    </div>
                    <button className="text-slate-400 hover:text-red-500 font-bold text-[12px] tracking-tight">
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function NotificationToggle({ title, desc, defaultEnabled }: any) {
  const [enabled, setEnabled] = useState(defaultEnabled);
  return (
    <div className="flex items-center justify-between group">
      <div>
        <h4 className="text-[16px] font-bold text-[#222325] mb-1">{title}</h4>
        <p className="text-slate-400 text-[13px] font-light italic">{desc}</p>
      </div>
      <button
        onClick={() => setEnabled(!enabled)}
        className={`w-14 h-7 rounded-full relative transition-colors ${enabled ? "bg-[#1dbf73]" : "bg-slate-200"}`}
      >
        <div
          className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full transition-transform ${enabled ? "translate-x-7" : ""} shadow-sm`}
        />
      </button>
    </div>
  );
}
