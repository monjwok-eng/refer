import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, TrendingUp } from "lucide-react";
import { Skeleton } from "./ui/Skeleton";
import { auth, db, handleFirestoreError, OperationType } from "../services/firebaseService";
import { doc, getDoc, collection, getDocs, query, limit } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

import LoadingScreen from "./LoadingScreen";

export default function HustlerDashboard() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<any>({
    balance: 0,
    pendingBalance: 0,
    claimedDealsCount: 0,
  });
  const [activeDeals, setActiveDeals] = useState<any[]>([]);

  const userType = localStorage.getItem("userType") || "hustler";
  const name = userType === "business"
    ? localStorage.getItem("businessName") || "Business"
    : localStorage.getItem("hustlerName") || "Hustler";
  const userPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData();
      } else {
        // If not authenticated via Firebase but we have a session in localStorage, 
        // we might still be missing the Firebase Auth link.
        // For simplicity in this demo, if no user, we stop loading but data might be empty.
        setIsLoading(false);
      }
    });

    const fetchData = async () => {
      try {
        const user = auth.currentUser;
        if (user) {
          const path = `users/${user.uid}`;
          try {
            const userDocSnap = await getDoc(doc(db, "users", user.uid));
            if (userDocSnap.exists()) {
              const data = userDocSnap.data();
              setUserData({
                balance: data.balance || 0,
                pendingBalance: data.pendingBalance || 0,
                claimedDealsCount: data.claimedDeals?.length || 0,
              });
            }
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, path);
          }
        }

        // Fetch recent deals
        const dealsPath = "deals";
        try {
          const dealsSnapshot = await getDocs(query(collection(db, "deals"), limit(3)));
          const dealsList = dealsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
          setActiveDeals(dealsList);
        } catch (err) {
          handleFirestoreError(err, OperationType.LIST, dealsPath);
        }

      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    return () => unsub();
  }, []);

  const statsList = [
    { label: "Cleared Balance", value: `UGX ${userData.balance.toLocaleString()}`, detail: `Available for Mobile Money withdrawal` },
    { label: "Pending Clearance", value: `UGX ${userData.pendingBalance.toLocaleString()}`, detail: "Escrow verification check" },
    { label: "Active Campaigns", value: String(userData.claimedDealsCount), detail: `${userData.claimedDealsCount} promotions joined` },
    { label: "Earn Vouch Rating", value: userData.claimedDealsCount > 0 ? "98%" : "N/A", detail: userData.claimedDealsCount > 0 ? "Verified Pro Status" : "No active campaigns yet" }
  ];

  if (isLoading) return <LoadingScreen text="Syncing your recent referral payouts..." />;

  return (
    <div className="min-h-screen bg-white pb-24 md:pb-12 text-slate-600">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 space-y-8">
        {/* Top Stats Header */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {statsList.map((stat, i) => (
            <div key={i} className="bg-white p-5 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] flex flex-col justify-between min-h-[110px]">
              <p className="text-xs md:text-sm font-semibold text-slate-500 tracking-tight">{stat.label}</p>
              <div>
                <h4 className="text-xl md:text-2xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h4>
                <p className="text-[11px] font-medium text-slate-400 mt-1">{stat.detail}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Workspace Area */}
          <div className="flex-1 space-y-8">
            {/* Active Deals / Opportunities */}
            <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
               <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
                 <h3 className="text-base md:text-lg font-bold text-slate-900">Active Opportunities</h3>
                 <Link to="/deals" className="text-slate-800 text-sm font-bold hover:text-black hover:underline">View All</Link>
               </div>
               
               <div className="divide-y divide-slate-100">
                  {activeDeals.length === 0 ? (
                    <div className="p-12 text-center">
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Briefcase className="text-slate-300" size={32} />
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mb-1">No active opportunities</h4>
                      <p className="text-sm text-slate-500">Check the marketplace to find deals to refer.</p>
                    </div>
                  ) : (
                    activeDeals.map((deal: any) => (
                      <div key={deal.id} className="p-6 flex items-center justify-between hover:bg-slate-50/50 transition-colors">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded overflow-hidden">
                            <img src={deal.image || "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&q=80"} alt={deal.business} className="w-full h-full object-cover" />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-[15px] hover:underline cursor-pointer" onClick={() => navigate(`/deal/${deal.id}`)}>{deal.title}</h4>
                            <p className="text-slate-500 text-sm">{deal.business || "Business"}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-slate-900 font-bold">{deal.price}</p>
                          <p className="text-slate-400 text-[10px] uppercase tracking-wider font-bold">Reward</p>
                        </div>
                      </div>
                    ))
                  )}
               </div>
               
               <div className="p-6 bg-slate-50/40 border-t border-slate-100">
                  <button 
                    onClick={() => navigate("/deals")}
                    className="w-full py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm"
                  >
                    Explore Marketplace
                  </button>
               </div>
            </div>

            {/* Performance Snapshot */}
            <div className="bg-white p-8 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] relative overflow-hidden">
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-1">Performance Snapshot</h3>
                    <p className="text-sm text-slate-500">Metrics that matter for your Referr account status.</p>
                  </div>
                  <button 
                    onClick={() => navigate("/hustler/analytics")}
                    className="flex items-center gap-2 px-4 py-2.5 bg-[#0F172A] text-white rounded-lg font-bold text-sm hover:bg-[#1E293B] transition-all shadow-sm"
                  >
                    Performance Report <TrendingUp size={16} />
                  </button>
               </div>
               
               <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-semibold text-slate-700">Referral Success Rate</span>
                      <span className="text-sm font-black text-rose-600">{userData.claimedDealsCount > 0 ? "92%" : "0%"}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-rose-500" style={{ width: userData.claimedDealsCount > 0 ? "92%" : "0%" }} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-semibold text-slate-700">On-time Approval</span>
                      <span className="text-sm font-black text-pink-600">{userData.claimedDealsCount > 0 ? "100%" : "0%"}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-pink-500" style={{ width: userData.claimedDealsCount > 0 ? "100%" : "0%" }} />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-end">
                      <span className="text-sm font-semibold text-slate-700">Network Growth</span>
                      <span className="text-sm font-black text-blue-600">{userData.claimedDealsCount > 0 ? "+15.4%" : "N/A"}</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                       <div className="h-full bg-blue-500" style={{ width: userData.claimedDealsCount > 0 ? "85%" : "0%" }} />
                    </div>
                  </div>
               </div>
            </div>
          </div>

          {/* Sidebar / Profile Area */}
          <aside className="w-full lg:w-80 space-y-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] text-center">
              <div className="relative inline-block mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden border border-slate-200 p-1 bg-white">
                   <img 
                    src={userPicture} 
                    alt="Profile"
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className="absolute top-1 right-1 w-4 h-4 bg-pink-500 border-2 border-white rounded-full" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{name}</h3>
              <p className="text-xs text-slate-400 mb-4 italic">"Start referring to earn rewards."</p>
              
              <div className="pt-4 border-t border-slate-100 space-y-3">
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-400">Seller level</span>
                   <span className="font-bold text-slate-800">New Seller</span>
                 </div>
                 <div className="flex justify-between text-sm">
                   <span className="text-slate-400">Member since</span>
                   <span className="font-bold text-slate-800">May 2024</span>
                 </div>
              </div>
              
              <Link to="/profile" className="block w-full mt-6 py-2.5 border border-slate-200 rounded-lg font-bold text-sm text-slate-700 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all text-center shadow-sm">
                Public Profile
              </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
               <h4 className="font-bold text-slate-900 mb-4">Referr Wallet</h4>
               <div className="space-y-4">
                 <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Available for withdrawal</p>
                   <p className="text-2xl font-black text-slate-900">UGX {userData.balance.toLocaleString()}</p>
                 </div>
                 <Link to="/hustler/wallet" className="block w-full py-2.5 bg-[#0F172A] text-center rounded-lg font-bold text-sm text-white hover:bg-[#1E293B] transition-all shadow-sm">
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
