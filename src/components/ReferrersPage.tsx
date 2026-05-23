import React, { useState, useEffect } from "react";
import { Search, Filter, Heart, UserPlus, SlidersHorizontal, ShieldCheck, Calendar as CalendarIcon } from "lucide-react";
import { leaderboardData } from "./AnalyticsPage";
import { Skeleton } from "./ui/Skeleton";

export default function ReferrersPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<"referrals-desc" | "referrals-asc" | "name-asc" | "name-desc" | "favorites">("referrals-desc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorite_referrers");
    return saved ? JSON.parse(saved) : [];
  });

  const [allReferrers, setAllReferrers] = useState<any[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const bName = localStorage.getItem("businessName") || "Business";
      const refsKey = `referrals_${bName}`;
      const savedReferrals = localStorage.getItem(refsKey);
      let combined = [...leaderboardData];
      
      if (savedReferrals) {
        try {
          const parsed = JSON.parse(savedReferrals);
          const mappedReferrals = parsed.map((ref: any) => ({
            id: ref.id,
            name: ref.referrerName,
            avatar: ref.referrerAvatar,
            referrals: ref.referrals || 0,
            joinedDate: ref.joinedDate,
            reliabilityScore: ref.reliabilityScore,
            isNew: true
          }));
          
          // Avoid duplicates by name (simple logic for demo)
          const existingNames = new Set(combined.map(r => r.name));
          const uniqueNew = mappedReferrals.filter((r: any) => !existingNames.has(r.name));
          combined = [...uniqueNew, ...combined];
        } catch (e) {}
      }
      
      setAllReferrers(combined);
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const toggleFavorite = (id: string) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter((fid) => fid !== id)
      : [...favorites, id];
    setFavorites(newFavorites);
    localStorage.setItem("favorite_referrers", JSON.stringify(newFavorites));
  };

  let filteredReferrers = [...allReferrers].filter((referrer) =>
    referrer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (filterMode === "favorites") {
    filteredReferrers = filteredReferrers.filter(r => favorites.includes(r.id));
  }

  filteredReferrers.sort((a, b) => {
    switch (filterMode) {
      case "referrals-asc":
        return a.referrals - b.referrals;
      case "referrals-desc":
        return b.referrals - a.referrals;
      case "name-asc":
        return a.name.localeCompare(b.name);
      case "name-desc":
        return b.name.localeCompare(a.name);
      default:
        return b.referrals - a.referrals;
    }
  });

  return (
    <div className="max-w-[1200px] mx-auto pb-12 md:pb-24 px-4 md:px-0 text-left">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6 text-left">
        <div className="text-left">
          <h1 className="text-[28px] md:text-[32px] font-bold text-[#222325] tracking-tight italic text-left">
            Referrers
          </h1>
          <p className="text-slate-400 text-[13px] md:text-[14px] mt-1 text-left">
            Manage and discover advocates in your referral network.
          </p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto text-left">
          <div className="relative flex-1 md:w-64 text-left">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-left" />
            <input
              type="text"
              placeholder="Search referrers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 md:pl-10 pr-4 py-2 md:py-2.5 bg-white border border-slate-200 text-[13px] md:text-[14px] focus:outline-none focus:border-[#1dbf73] transition-colors text-left"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className={`p-2 md:p-2.5 bg-white border border-slate-200 hover:bg-slate-50 transition-colors text-left ${isFilterOpen ? "text-[#1dbf73] border-[#1dbf73]" : "text-slate-600"}`}
            >
              <SlidersHorizontal size={18} className="md:w-5 md:h-5" />
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 shadow-xl rounded z-50 py-2">
                <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 mb-2">Sort by</div>
                <button 
                  onClick={() => { setFilterMode("referrals-desc"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 ${filterMode === "referrals-desc" ? "text-[#1dbf73] font-bold bg-green-50/50" : "text-slate-600"}`}
                >Most Referrals</button>
                <button 
                  onClick={() => { setFilterMode("referrals-asc"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 ${filterMode === "referrals-asc" ? "text-[#1dbf73] font-bold bg-green-50/50" : "text-slate-600"}`}
                >Least Referrals</button>
                <button 
                  onClick={() => { setFilterMode("name-asc"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 ${filterMode === "name-asc" ? "text-[#1dbf73] font-bold bg-green-50/50" : "text-slate-600"}`}
                >Name (A-Z)</button>
                <button 
                  onClick={() => { setFilterMode("name-desc"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 ${filterMode === "name-desc" ? "text-[#1dbf73] font-bold bg-green-50/50" : "text-slate-600"}`}
                >Name (Z-A)</button>
                <div className="px-4 py-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-t border-slate-100 mb-2">Filter</div>
                <button 
                  onClick={() => { setFilterMode("favorites"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-[13px] hover:bg-slate-50 flex items-center justify-between ${filterMode === "favorites" ? "text-[#1dbf73] font-bold bg-green-50/50" : "text-slate-600"}`}
                >
                  <span>Favorites Only</span>
                  {filterMode === "favorites" && <Heart size={12} fill="currentColor" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 text-left">
        {isLoading ? (
          Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 p-4 md:p-6 text-left">
              <div className="flex items-center gap-4 mb-6 text-left">
                <Skeleton className="w-12 h-12 md:w-14 md:h-14 rounded-full text-left" />
                <div className="space-y-2 text-left">
                  <Skeleton className="w-24 md:w-32 h-4 rounded text-left" />
                  <Skeleton className="w-16 md:w-20 h-3 rounded text-left" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mb-6 text-left">
                <Skeleton className="h-8 md:h-10 rounded text-left" />
                <Skeleton className="h-8 md:h-10 rounded text-left" />
              </div>
              <div className="border-t border-slate-100 pt-4 mb-6 space-y-3">
                <Skeleton className="w-24 h-3 rounded" />
                <Skeleton className="w-full h-4 rounded" />
                <Skeleton className="w-full h-4 rounded" />
              </div>
            </div>
          ))
        ) : filteredReferrers.length > 0 ? (
          filteredReferrers.map((referrer) => {
            const isFav = favorites.includes(referrer.id);
            return (
              <div
                key={referrer.id}
                className="bg-white border border-slate-200 hover:shadow-[4px_4px_0_0_#1dbf73] md:hover:shadow-[8px_8px_0_0_#1dbf73] hover:-translate-y-0.5 md:hover:-translate-y-1 md:hover:translate-x-1 transition-all group text-left"
              >
                <div className="p-4 md:p-6 text-left">
                  <div className="flex items-start justify-between mb-4 md:mb-6 text-left">
                    <div className="flex items-center gap-3 md:gap-4 text-left">
                      <img
                        src={referrer.avatar}
                        alt={referrer.name}
                        className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-slate-100 object-cover text-left"
                      />
                      <div className="text-left">
                        <h3 className="text-[15px] md:text-[16px] font-bold text-[#222325] text-left">
                          {referrer.name}
                        </h3>
                        <p className="text-[#1dbf73] text-[11px] md:text-[12px] font-bold uppercase tracking-tight text-left">
                          Top Tier
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => toggleFavorite(referrer.id)}
                      className={`p-1.5 md:p-2 rounded-full transition-colors ${isFav ? "text-rose-500 bg-rose-50" : "text-slate-300 hover:text-slate-400 hover:bg-slate-50"}`}
                      title={isFav ? "Remove from favorites" : "Add to favorites"}
                    >
                      <Heart size={16} className="md:w-[18px] md:h-[18px]" fill={isFav ? "currentColor" : "none"} />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-4 md:mb-6 text-left">
                    <div className="bg-slate-50 p-2.5 md:p-3 text-left">
                      <p className="text-slate-400 text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-left">Referrals</p>
                      <p className="text-[16px] md:text-[18px] font-bold text-[#222325] text-left">{(referrer as any).referrals}</p>
                    </div>
                    <div className="bg-slate-50 p-2.5 md:p-3 text-left">
                      <p className="text-slate-400 text-[9px] md:text-[10px] uppercase font-bold tracking-widest text-left">Status</p>
                      <div className="flex items-center gap-1.5 mt-0.5 text-left">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#1dbf73] text-left"></div>
                        <p className="text-[12px] md:text-[14px] font-bold text-[#222325] text-left">Active</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-slate-100 pt-4 mb-4 md:mb-6">
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-3">Collaboration History</p>
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between text-[12px]">
                        <div className="flex items-center gap-2 text-slate-500">
                          <CalendarIcon size={14} />
                          <span>Member since</span>
                        </div>
                        <span className="font-bold text-[#222325]">{(referrer as any).joinedDate}</span>
                      </div>
                      <div className="flex items-center justify-between text-[12px]">
                        <div className="flex items-center gap-2 text-slate-500">
                          <ShieldCheck size={14} className="text-[#1dbf73]" />
                          <span>Reliability Score</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#1dbf73]" 
                              style={{ width: `${(referrer as any).reliabilityScore}%` }}
                            />
                          </div>
                          <span className="font-bold text-[#222325]">{(referrer as any).reliabilityScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full bg-white border border-slate-200 p-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 flex items-center justify-center text-slate-200 mb-6 rounded-full">
              <Search size={32} />
            </div>
            <h3 className="text-[20px] font-bold text-[#222325] mb-2">No referrers found</h3>
            <p className="text-slate-400 max-w-sm mb-0">
              Try adjusting your search term to find the advocate you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
