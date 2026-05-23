import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, X, Trash2, Edit3, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface Deal {
  id: number;
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
  verified?: boolean;
}

export default function PostDealPage() {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [dealData, setDealData] = useState({
    title: "",
    description: "",
    rewardAmount: "",
    expiryDate: "",
    notifyFavorites: false,
  });

  const [activeDeals, setActiveDeals] = useState<Deal[]>(() => {
    const businessPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";
    const saved = localStorage.getItem("all_deals");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Filter out deals not by this business if we wanted to, but currently there's no business separation. 
        // For now, let's just show all deals posted by "this" business. We assume local browser is one business for now, 
        // or we could filter by businessName.
        const businessName = localStorage.getItem("businessName") || "Business";
        return parsed.filter((d: any) => d.business === businessName);
      } catch (e) {}
    }
    return [
      {
        id: 1,
        title: "20% off for new customers",
        reward: "50",
        price: "$50",
        description: "Refer a friend and get $50 when they make their first purchase.",
        active: true,
        usage: 12,
        expiryDate: "2024-12-31",
        category: "Tech",
        image: businessPicture,
        business: localStorage.getItem("businessName") || "Business",
        verified: true,
      },
      {
        id: 2,
        title: "Summer Sale Referral",
        reward: "25",
        price: "$25",
        description: "Limited time summer referral bonus.",
        active: true,
        usage: 5,
        category: "Beauty",
        image: businessPicture,
        business: localStorage.getItem("businessName") || "Business",
        verified: true,
      },
    ];
  });

  const saveDealsToGlobalStore = (newDealsForThisBusiness: Deal[]) => {
    const businessName = localStorage.getItem("businessName") || "Business";
    const saved = localStorage.getItem("all_deals");
    let allDeals: Deal[] = [];
    if (saved) {
      try {
        allDeals = JSON.parse(saved);
      } catch (e) {}
    }
    // Remove old deals for this business
    let otherDeals = allDeals.filter(d => d.business !== businessName);
    // Add new ones
    const finalDeals = [...newDealsForThisBusiness, ...otherDeals];
    localStorage.setItem("all_deals", JSON.stringify(finalDeals));
  };

  // On mount, if all_deals is empty, let's populate it with activeDeals
  React.useEffect(() => {
    if (!localStorage.getItem("all_deals")) {
      saveDealsToGlobalStore(activeDeals);
    }
  }, []);

  const isValid =
    dealData.title && dealData.description && dealData.rewardAmount;

  const handleCreate = () => {
    const businessPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";
    const newDeal: Deal = {
      id: Date.now(),
      title: dealData.title,
      reward: dealData.rewardAmount,
      price: `$${dealData.rewardAmount}`,
      description: dealData.description,
      active: true,
      usage: 0,
      expiryDate: dealData.expiryDate || undefined,
      category: "All", // Default category
      image: businessPicture,
      business: localStorage.getItem("businessName") || "Business",
      verified: true
    };
    const newActiveDeals = [newDeal, ...activeDeals];
    setActiveDeals(newActiveDeals);
    saveDealsToGlobalStore(newActiveDeals);
    const businessName = localStorage.getItem("businessName") || "Business";
    localStorage.setItem(`deal_posted_${businessName}`, "true"); // Track for checklist
    setDealData({
      title: "",
      description: "",
      rewardAmount: "",
      expiryDate: "",
      notifyFavorites: false,
    });
    setIsModalOpen(false);
  };

  const deleteDeal = (id: number) => {
    const updated = activeDeals.filter((d) => d.id !== id);
    setActiveDeals(updated);
    saveDealsToGlobalStore(updated);
    if (updated.length === 0) {
      const businessName = localStorage.getItem("businessName") || "Business";
      localStorage.removeItem(`deal_posted_${businessName}`);
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
            className="w-full md:w-auto justify-center bg-[#1dbf73] text-white px-8 py-3 rounded-none font-bold hover:bg-[#19a463] transition-all flex items-center gap-2 active:scale-[0.98]"
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
                className="bg-white border border-slate-200 p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between group hover:border-[#1dbf73] transition-colors gap-4 md:gap-0"
              >
                <div className="flex-1 min-w-0 w-full">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="text-[17px] font-bold text-slate-900 truncate tracking-tight">
                      {deal.title}
                    </h4>
                    <span className="text-[11px] font-bold text-[#1dbf73] uppercase tracking-wider whitespace-nowrap">
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
              className="relative w-full max-w-[480px] bg-white shadow-2xl flex flex-col"
            >
              <div className="p-8 pb-0 flex justify-between items-start">
                <h2 className="text-[22px] font-bold text-[#222325] tracking-tight italic">
                  New Deal
                </h2>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-slate-300 hover:text-slate-600"
                >
                  <X size={20} />
                </button>
              </div>

              <div className="p-8 space-y-5">
                <div>
                  <input
                    type="text"
                    value={dealData.title}
                    onChange={(e) => updateField("title", e.target.value)}
                    className="w-full px-0 py-3 border-b border-slate-200 focus:border-[#1dbf73] outline-none transition-colors text-[16px] font-medium"
                    placeholder="Deal Title (e.g. 20% Off)"
                  />
                </div>

                <div>
                  <textarea
                    value={dealData.description}
                    onChange={(e) => updateField("description", e.target.value)}
                    className="w-full px-0 py-3 border-b border-slate-200 focus:border-[#1dbf73] outline-none transition-colors text-[14px] min-h-[80px] resize-none font-light"
                    placeholder="Short description..."
                  />
                </div>

                <div className="grid grid-cols-2 gap-8">
                  <div className="flex items-center gap-3 border-b border-slate-200 focus-within:border-[#1dbf73] transition-colors">
                    <span className="text-slate-400 font-medium">$</span>
                    <input
                      type="number"
                      value={dealData.rewardAmount}
                      onChange={(e) =>
                        updateField("rewardAmount", e.target.value)
                      }
                      className="w-full py-3 outline-none text-[16px]"
                      placeholder="Reward"
                    />
                  </div>

                  <div className="flex items-center border-b border-slate-200 focus-within:border-[#1dbf73] transition-colors">
                    <input
                      type="date"
                      value={dealData.expiryDate}
                      onChange={(e) =>
                        updateField("expiryDate", e.target.value)
                      }
                      className="w-full py-3 outline-none text-[13px] text-slate-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 py-2 cursor-pointer group" onClick={() => setDealData(prev => ({ ...prev, notifyFavorites: !prev.notifyFavorites }))}>
                  <div className={`w-5 h-5 border-2 flex items-center justify-center transition-all ${dealData.notifyFavorites ? "bg-[#1dbf73] border-[#1dbf73]" : "border-slate-200 group-hover:border-slate-300"}`}>
                    {dealData.notifyFavorites && <div className="w-2 h-2 bg-white rounded-full"></div>}
                  </div>
                  <span className="text-[14px] text-slate-600 font-medium select-none">Notify Favorites</span>
                </div>
              </div>

              <div className="p-8 pt-4 flex gap-3">
                <button
                  onClick={handleCreate}
                  disabled={!isValid}
                  className="flex-1 bg-[#1dbf73] text-white py-4 rounded-none font-bold hover:bg-[#19a463] transition-all disabled:opacity-30 uppercase tracking-widest text-[12px]"
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
