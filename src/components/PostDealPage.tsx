import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Trash2, Edit3, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { db, auth } from "../services/firebaseService";
import { collection, addDoc, getDocs, deleteDoc, doc, query, where, serverTimestamp } from "firebase/firestore";

interface Deal {
  id: any;
  title: string;
  reward: string;
  price?: string;
  description: string;
  active: boolean;
  usage: number;
  expiryDate?: string;
  category?: string;
  image?: string;
  business?: string;
  businessId?: string;
  businessLogo?: string;
  verified?: boolean;
  allocatedBudget?: number;
  spentBudget?: number;
  joinedCount?: number;
  rating?: number;
  reviewsCount?: number;
  requirements?: string[];
  resources?: any[];
  createdAt?: any;
}

export default function PostDealPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dealData, setDealData] = useState({
    title: "",
    description: "",
    rewardAmount: "",
    expiryDate: "",
    notifyFavorites: false,
    allocatedBudget: "",
    requirements: "",
    resources: "",
    imageUrl: ""
  });

  const [activeDeals, setActiveDeals] = useState<Deal[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;
        const dealsRef = collection(db, "deals");
        const q = query(dealsRef, where("businessId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedDeals: Deal[] = [];
        querySnapshot.forEach((docSnap) => {
          fetchedDeals.push({ id: docSnap.id, ...docSnap.data() } as Deal);
        });
        setActiveDeals(fetchedDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeals();
  }, [auth.currentUser]);

  const isValid =
    dealData.title && dealData.description && dealData.rewardAmount;

  const handleCreate = async () => {
    const user = auth.currentUser;
    if (!user) return;
    const businessPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";
    const rewardNum = Number(dealData.rewardAmount.replace(/[^0-9]/g, "")) || 15000;
    const computedAllocated = rewardNum > 1000 ? rewardNum * 150 : 5000000;
    
    const userAllocated = Number(dealData.allocatedBudget.replace(/[^0-9]/g, "")) || 0;
    const finalAllocated = userAllocated > 0 ? userAllocated : computedAllocated;

    // Split requirements by newline
    const reqs = dealData.requirements 
      ? dealData.requirements.split("\n").map(r => r.trim()).filter(Boolean)
      : [
          "Views must be authentic and organic through local connections",
          "Must include authorized campaign branding elements",
          "Verification screenshots must be clear and readable"
        ];

    // Split resources by newline
    const resList = dealData.resources
      ? dealData.resources.split("\n").map(r => r.trim()).filter(Boolean).map(line => {
          if (line.includes("|")) {
            const parts = line.split("|");
            return {
              name: parts[0].trim(),
              url: parts[1].trim(),
              type: parts[1].toLowerCase().includes("drive") ? "drive" : "pdf",
              subtitle: "Shared resource link"
            };
          }
          return {
            name: line.length > 25 ? line.substring(0, 25) + "..." : line,
            url: line.startsWith("http") ? line : "#",
            type: line.toLowerCase().includes("drive") ? "drive" : "pdf",
            subtitle: "Creative campaign asset"
          };
        })
      : [
          { url: "#", type: "drive", name: "Google Drive Assets Folder", subtitle: "High-Res Logo & Graphics Guidelines" },
          { url: "#", type: "pdf", name: "Campaign Creative Brief PDF", subtitle: "Official rules and branding package" }
        ];

    const newDealData: Omit<Deal, "id"> = {
      title: dealData.title,
      reward: dealData.rewardAmount.toLowerCase().includes("ugx") || dealData.rewardAmount.includes("$") 
        ? dealData.rewardAmount 
        : `UGX ${Number(dealData.rewardAmount).toLocaleString()}`,
      price: dealData.rewardAmount.toLowerCase().includes("ugx") || dealData.rewardAmount.includes("$") 
        ? dealData.rewardAmount 
        : `UGX ${Number(dealData.rewardAmount).toLocaleString()}`,
      description: dealData.description,
      active: true,
      usage: 0,
      expiryDate: dealData.expiryDate || undefined,
      category: "All", // Default category
      image: dealData.imageUrl?.trim() || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=650&q=80", // Premium default cover
      business: localStorage.getItem("businessName") || "Business",
      businessId: user.uid,
      businessLogo: businessPicture,
      verified: true,
      allocatedBudget: finalAllocated,
      spentBudget: 0,
      joinedCount: 0,
      rating: 5.0,
      reviewsCount: 0,
      requirements: reqs,
      resources: resList,
      createdAt: serverTimestamp()
    };

    try {
      const docRef = await addDoc(collection(db, "deals"), newDealData);
      const createdDeal: Deal = { id: docRef.id, ...newDealData };
      setActiveDeals([createdDeal, ...activeDeals]);
      
      const businessName = localStorage.getItem("businessName") || "Business";
      localStorage.setItem(`deal_posted_${businessName}`, "true"); // Track for checklist
      
      setDealData({
        title: "",
        description: "",
        rewardAmount: "",
        expiryDate: "",
        notifyFavorites: false,
        allocatedBudget: "",
        requirements: "",
        resources: "",
        imageUrl: ""
      });
      setIsModalOpen(false);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const deleteDeal = async (id: any) => {
    try {
      await deleteDoc(doc(db, "deals", String(id)));
      const updated = activeDeals.filter((d) => d.id !== id);
      setActiveDeals(updated);
      
      if (updated.length === 0) {
        const businessName = localStorage.getItem("businessName") || "Business";
        localStorage.removeItem(`deal_posted_${businessName}`);
      }
    } catch (e) {
      console.error("Error deleting deal: ", e);
    }
  };

  const updateField = (field: string, value: string) => {
    setDealData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <>
      <div className="max-w-[1000px] mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-8 md:mb-12 gap-4">
          <div>
            <h1 className="text-[32px] font-bold text-[#222325] tracking-tight">
              Deals
            </h1>
            <p className="text-slate-400 text-[14px] mt-1">
              Manage your active referral offers.
            </p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-auto justify-center bg-[#ec4899] text-white px-8 py-3 rounded-none font-bold hover:bg-[#db2777] transition-all flex items-center gap-2 active:scale-[0.98]"
          >
            <Plus size={18} strokeWidth={2.5} />
            Add Deal
          </button>
        </div>

        {/* Simplified List Area */}
        <div className="grid grid-cols-1 gap-4">
          {activeDeals.length > 0 ? (
            activeDeals.map((deal) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white border border-slate-200 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-[#ec4899] transition-colors gap-4 md:gap-0"
              >
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-[17px] font-bold text-slate-900 truncate tracking-tight">
                      {deal.title}
                    </h4>
                    <span className="text-[11px] font-bold text-[#ec4899] uppercase tracking-wider whitespace-nowrap">
                      ${deal.reward} Reward
                    </span>
                  </div>
                  <p className="text-[13px] text-slate-400 font-light truncate max-w-full md:max-w-[500px]">
                    {deal.description}
                  </p>
                </div>

                <div className="flex flex-row md:flex-row items-center gap-4 md:gap-6 w-full md:w-auto justify-between md:justify-end">
                  <div className="text-left md:text-right flex items-center md:block gap-2">
                    <p className="text-[15px] font-bold text-slate-900">
                      {deal.usage}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest hidden md:block">
                      Uses
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest md:hidden">
                      Uses
                    </p>
                  </div>

                  <div className="flex items-center gap-2 md:border-l md:border-slate-100 md:pl-6">
                    <button className="p-2 text-slate-300 hover:text-slate-900 transition-colors">
                      <Edit3 size={16} />
                    </button>
                    <button
                      onClick={() => deleteDeal(deal.id)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                    <button
                      onClick={() => navigate(`/deal/${deal.id}`)}
                      className="ml-2 bg-[#222325] text-white px-4 py-2 rounded-none text-[12px] font-bold hover:bg-black transition-all flex items-center gap-2"
                    >
                      Link
                      <ExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-32 flex flex-col items-center justify-center border border-slate-200 bg-white">
              <div className="w-12 h-12 mb-6 border border-slate-100 flex items-center justify-center text-slate-200">
                <Plus size={20} />
              </div>
              <h3 className="text-[16px] font-bold text-slate-900 mb-1">
                No deals yet
              </h3>
              <p className="text-slate-400 mb-8 text-[13px] font-light">
                Create an offer to start your referral engine.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-[#222325] text-white px-10 py-3 rounded-none font-bold hover:bg-black transition-all text-[12px] uppercase tracking-widest"
              >
                Create First Deal
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CREATE DEAL MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#222325]/40"
            />
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              className="relative w-full max-w-[500px] bg-white shadow-2xl flex flex-col max-h-[90vh]"
            >
              <div className="p-8 pb-0 flex justify-between items-start shrink-0">
                <h2 className="text-[22px] font-bold text-[#222325] tracking-tight italic">
                  New Deal
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-300 hover:text-slate-600 cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-5 overflow-y-auto max-h-[60vh] text-left">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-[#222325] font-mono block mb-1">Campaign Title</label>
                  <input
                    type="text"
                    value={dealData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full px-0 py-2 border-b border-slate-200 focus:border-[#ec4899] outline-none transition-colors text-[15px] font-medium"
                    placeholder="e.g. 50K Views Payout Promo"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-[#222325] font-mono block mb-1">Campaign Cover Image URL (Optional)</label>
                  <input
                    type="url"
                    value={dealData.imageUrl}
                    onChange={(e) => updateField("imageUrl", e.target.value)}
                    className="w-full px-0 py-2 border-b border-slate-200 focus:border-[#ec4899] outline-none transition-colors text-[13px] font-medium"
                    placeholder="e.g. https://images.unsplash.com/photo-..."
                  />
                </div>

                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-[#222325] font-mono block mb-1">Description</label>
                  <textarea
                    value={dealData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="w-full px-0 py-2 border-b border-slate-200 focus:border-[#ec4899] outline-none transition-colors text-[13px] min-h-[60px] resize-none font-light"
                    placeholder="What should influencers or marketers talk about?"
                  />
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#222325] font-mono block mb-1">Reward (per 1K views)</label>
                    <div className="flex items-center gap-2 border-b border-slate-200 focus-within:border-[#ec4899] transition-colors">
                      <span className="text-slate-400 font-medium text-xs">UGX</span>
                      <input
                        type="text"
                        value={dealData.rewardAmount}
                        onChange={(e) =>
                          updateField("rewardAmount", e.target.value)
                        }
                        className="w-full py-2 outline-none text-[15px]"
                        placeholder="e.g. 15,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#222325] font-mono block mb-1">Total Pool Budget</label>
                    <div className="flex items-center gap-2 border-b border-slate-200 focus-within:border-[#ec4899] transition-colors">
                      <span className="text-slate-400 font-medium text-xs">UGX</span>
                      <input
                        type="text"
                        value={dealData.allocatedBudget}
                        onChange={(e) =>
                          updateField("allocatedBudget", e.target.value)
                        }
                        className="w-full py-2 outline-none text-[15px]"
                        placeholder="e.g. 3,000,000"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#222325] font-mono block mb-1">Campaign Requirements (one per line)</label>
                    <textarea
                      value={dealData.requirements}
                      onChange={(e) => updateField("requirements", e.target.value)}
                      className="w-full px-2 py-2 border border-slate-200 focus:border-[#ec4899] outline-none rounded-lg transition-colors text-[12px] min-h-[80px] font-light"
                      placeholder="Line 1: Must tag @yourbrand&#10;Line 2: Minimum 1.5K organic Views&#10;Line 3: Keep clip live for at least 30 days"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#222325] font-mono block mb-1">Campaign Resources (Resource Title | Resource Link)</label>
                    <textarea
                      value={dealData.resources}
                      onChange={(e) => updateField("resources", e.target.value)}
                      className="w-full px-2 py-2 border border-slate-200 focus:border-[#ec4899] outline-none rounded-lg transition-colors text-[12px] min-h-[80px] font-light"
                      placeholder="Logo Pack | https://drive.google.com/...&#10;Video Script guide | https://vimeo.com/...&#10;Audio Clip Asset | https://drive.google.com/..."
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex-1">
                    <label className="text-[11px] font-black uppercase tracking-widest text-[#222325] font-mono block mb-1">Expiry Date</label>
                    <div className="flex items-center border-b border-slate-200 focus-within:border-[#ec4899] transition-colors">
                      <input
                        type="date"
                        value={dealData.expiryDate}
                        onChange={(e) =>
                          updateField("expiryDate", e.target.value)
                        }
                        className="w-full py-2 outline-none text-[13px] text-slate-500 bg-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 cursor-pointer group select-none" onClick={() => setDealData(prev => ({ ...prev, notifyFavorites: !prev.notifyFavorites }))}>
                    <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${dealData.notifyFavorites ? "bg-[#ec4899] border-[#ec4899]" : "border-slate-200 group-hover:border-slate-300"}`}>
                      {dealData.notifyFavorites && <div className="w-2 h-2 bg-white rounded-full"></div>}
                    </div>
                    <span className="text-[13px] text-slate-600 font-medium">Notify Favorites</span>
                  </div>
                </div>
              </div>

              <div className="p-8 pt-4 flex gap-3 border-t border-slate-100 shrink-0">
                <button
                  onClick={handleCreate}
                  disabled={!isValid}
                  className="flex-1 bg-[#ec4899] text-white py-4 rounded-none font-bold hover:bg-[#db2777] transition-all disabled:opacity-30 uppercase tracking-widest text-[12px]"
                >
                  Create Deal
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
