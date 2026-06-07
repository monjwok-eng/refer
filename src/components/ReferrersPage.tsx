import React, { useState, useEffect } from "react";
import { Search, Filter, Heart, UserPlus, SlidersHorizontal, ShieldCheck, Calendar as CalendarIcon } from "lucide-react";
import { leaderboardData } from "./AnalyticsPage";
import LoadingScreen from "./LoadingScreen";
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

  if (isLoading) return <LoadingScreen text="Gathering your top referrers..." />;

  return (
    <div className="max-w-7xl mx-auto pb-12 md:pb-24 px-4 md:px-0">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
            Referrers
          </h1>
          <p className="text-slate-500 text-sm">
            Manage and discover advocates in your referral network.
          </p>
        </div>
        
        <div className="flex items-center gap-2 md:gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search referrers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-slate-100 transition-all"
            />
          </div>
          <div className="relative">
            <button 
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="p-2.5 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors text-slate-600"
            >
              <SlidersHorizontal size={18} />
            </button>
            {isFilterOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-slate-200 rounded-xl shadow-lg z-50 py-2">
                <div className="px-4 py-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Sort by</div>
                <button 
                  onClick={() => { setFilterMode("referrals-desc"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filterMode === "referrals-desc" ? "text-slate-900 font-semibold" : "text-slate-600"}`}
                >Most Referrals</button>
                <button 
                  onClick={() => { setFilterMode("referrals-asc"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filterMode === "referrals-asc" ? "text-slate-900 font-semibold" : "text-slate-600"}`}
                >Least Referrals</button>
                <button 
                  onClick={() => { setFilterMode("name-asc"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filterMode === "name-asc" ? "text-slate-900 font-semibold" : "text-slate-600"}`}
                >Name (A-Z)</button>
                <button 
                  onClick={() => { setFilterMode("name-desc"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${filterMode === "name-desc" ? "text-slate-900 font-semibold" : "text-slate-600"}`}
                >Name (Z-A)</button>
                <div className="px-4 py-2 mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-t border-slate-100 pt-3 mb-1">Filter</div>
                <button 
                  onClick={() => { setFilterMode("favorites"); setIsFilterOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 flex items-center justify-between ${filterMode === "favorites" ? "text-slate-900 font-semibold" : "text-slate-600"}`}
                >
                  <span>Favorites Only</span>
                  {filterMode === "favorites" && <Heart size={14} fill="currentColor" />}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {filteredReferrers.length > 0 ? (
          filteredReferrers.map((referrer) => {
            const isFav = favorites.includes(referrer.id);
            return (
              <div
                key={referrer.id}
                className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6 transition-all group hover:shadow-md"
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={referrer.avatar}
                      alt={referrer.name}
                      className="w-12 h-12 rounded-full border border-slate-100 object-cover"
                    />
                    <div>
                      <h3 className="text-base font-bold text-slate-900">
                        {referrer.name}
                      </h3>
                      <p className="text-pink-600 text-xs font-bold uppercase tracking-wide">
                        Top Tier
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleFavorite(referrer.id)}
                    className={`p-2 rounded-lg transition-colors ${isFav ? "text-rose-500 bg-rose-50" : "text-slate-300 hover:text-slate-500 hover:bg-slate-50"}`}
                    title={isFav ? "Remove from favorites" : "Add to favorites"}
                  >
                    <Heart size={18} fill={isFav ? "currentColor" : "none"} />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3 mb-6">
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Referrals</p>
                    <p className="text-lg font-bold text-slate-900">{(referrer as any).referrals}</p>
                  </div>
                  <div className="bg-slate-50 p-3 rounded-lg">
                    <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest">Status</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-pink-500"></div>
                      <p className="text-sm font-bold text-slate-900">Active</p>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4">
                  <p className="text-slate-400 text-[10px] uppercase font-bold tracking-widest mb-3">Collaboration</p>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <CalendarIcon size={14} />
                        <span>Member since</span>
                      </div>
                      <span className="font-semibold text-slate-900">{(referrer as any).joinedDate}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2 text-slate-500">
                        <ShieldCheck size={14} className="text-pink-500" />
                        <span>Reliability</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-pink-500" 
                            style={{ width: `${(referrer as any).reliabilityScore}%` }}
                          />
                        </div>
                        <span className="font-semibold text-slate-900">{(referrer as any).reliabilityScore}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="col-span-full border border-slate-200 border-dashed p-12 flex flex-col items-center justify-center text-center rounded-xl">
            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-slate-300 mb-4 rounded-full">
              <Search size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No referrers found</h3>
            <p className="text-slate-500 text-sm max-w-xs">
              Try adjusting your search term to find the advocate you're looking for.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
