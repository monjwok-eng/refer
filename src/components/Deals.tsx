import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  Star, 
  Heart,
  Users,
  Coins,
  Sparkles,
  Percent,
} from "lucide-react";
import { Skeleton } from "./ui/Skeleton";
import { db } from "../services/firebaseService";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

export default function Deals() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", "Beauty", "Travel", "Hair", "Food", "Tech"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const [allDeals, setAllDeals] = useState<any[]>([]);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const dealsRef = collection(db, "deals");
        // We fetch all deals which ensures that newly posted deals (or legacy ones) aren't filtered out by orderBy field-existence constraints
        const snapshot = await getDocs(dealsRef);
        const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (docs.length > 0) {
          setAllDeals(docs);
        } else {
          // No deals found
          setAllDeals([]);
        }
      } catch (e) {
        console.error("Error fetching deals", e);
        setAllDeals([]); // Fallback to empty on error
      } finally {
        setIsLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const filteredDeals = useMemo(() => {
    return allDeals.filter((deal) => {
      const matchesCategory = activeCategory === "All" || deal.category === activeCategory;
      const matchesSearch = deal.title?.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           deal.business?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesVerified = !verifiedOnly || deal.verified;
      
      return matchesCategory && matchesSearch && matchesVerified;
    }).sort((a, b) => {
      if (sortBy === "Highest Payout") {
        const priceA = parseInt((a.price || "0").replace(/[^0-9]/g, ""));
        const priceB = parseInt((b.price || "0").replace(/[^0-9]/g, ""));
        return priceB - priceA;
      }
      if (sortBy === "Most Recent") {
        const timeA = a.createdAt?.toMillis ? a.createdAt.toMillis() : (a.createdAt ? new Date(a.createdAt).getTime() : 0);
        const timeB = b.createdAt?.toMillis ? b.createdAt.toMillis() : (b.createdAt ? new Date(b.createdAt).getTime() : 0);
        if (timeA || timeB) {
          return timeB - timeA;
        }
        const valA = a.id ? String(a.id) : "";
        const valB = b.id ? String(b.id) : "";
        return valB.localeCompare(valA);
      }
      return 0;
    });
  }, [allDeals, activeCategory, searchQuery, verifiedOnly, sortBy]);

  return (
    <div className="w-full pb-24 text-slate-900">
      <div className="max-w-7xl mx-auto pt-8 px-4 space-y-8 animate-fade-in">
        
        <header className="space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mt-1.5">
                Referral Opportunities
              </h1>
              <p className="text-slate-500 text-sm md:text-base">
                Active promotions: connect high-growth local brands with organic networks and claim instant payouts.
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border font-semibold text-xs uppercase tracking-wider transition-all cursor-pointer ${
                  isFilterOpen 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300'
                }`}
              >
                <SlidersHorizontal size={14} /> Filters
              </button>
            </div>
          </div>

          <div className="relative group max-w-2xl bg-white rounded-xl shadow-sm border border-slate-200/80 overflow-hidden">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What referral opportunity are you looking for?"
              className="w-full pl-12 pr-4 py-3 bg-transparent text-sm text-slate-900 font-medium focus:outline-none placeholder:text-slate-400"
            />
          </div>
        </header>

        {/* Filters Panel Overlay */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden"
            >
              <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Sort By</label>
                  <div className="flex flex-col gap-2">
                    {["Most Recent", "Highest Payout"].map(s => (
                      <button 
                        key={s}
                        type="button"
                        onClick={() => setSortBy(s)}
                        className={`text-left text-xs uppercase tracking-wider py-1 font-bold transition-colors ${sortBy === s ? 'text-slate-900' : 'text-slate-500 hover:text-slate-900'}`}
                      >
                        {sortBy === s && <span className="mr-1">●</span>} {s}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Guarantees</label>
                  <div className="flex items-center gap-3 pt-1">
                    <button 
                      type="button"
                      onClick={() => setVerifiedOnly(!verifiedOnly)}
                      className={`relative w-10 h-5 rounded-full transition-colors flex items-center ${verifiedOnly ? 'bg-slate-900' : 'bg-slate-200'}`}
                    >
                      <div className={`w-3.5 h-3.5 bg-white rounded-full transition-transform shadow-sm transform ${verifiedOnly ? 'translate-x-6' : 'translate-x-0.5'}`} />
                    </button>
                    <span className="text-xs font-semibold text-slate-600">Verified Partners Only</span>
                  </div>
                </div>

                <div className="flex items-end justify-end">
                  <button 
                    type="button"
                    onClick={() => setIsFilterOpen(false)}
                    className="w-full md:w-auto px-6 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-bold text-xs uppercase tracking-wider transition-all"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 border-b border-slate-100">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2.5 font-bold text-xs uppercase tracking-wider transition-all whitespace-nowrap border-b-2 ${
                activeCategory === cat
                  ? "text-slate-900 border-slate-900"
                  : "text-slate-500 border-transparent hover:text-slate-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden flex flex-col h-[400px]">
                <Skeleton className="h-40 w-full" />
                <div className="p-5 space-y-4 flex-1">
                  <Skeleton className="h-5 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          ) : filteredDeals.length === 0 ? (
            <div className="col-span-full py-20 text-center space-y-4 bg-white rounded-xl border border-slate-200/80 p-8">
              <div className="size-12 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <Search size={22} />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">No matched campaigns found</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">Try another keyword or category.</p>
              </div>
              <button 
                type="button"
                onClick={() => {setSearchQuery(""); setActiveCategory("All"); setVerifiedOnly(false);}}
                className="px-4 py-2 bg-slate-100 text-slate-900 rounded-lg font-bold text-xs uppercase hover:bg-slate-200 transition-all cursor-pointer"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            filteredDeals.map((deal, idx) => {
              const spentPercent = deal.allocatedBudget 
                ? Math.round(((deal.spentBudget || 0) / deal.allocatedBudget) * 100) 
                : 0;

              return (
                <motion.div
                  key={deal.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.04, duration: 0.3 }}
                  className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-md transition-all duration-300 flex flex-col h-full group overflow-hidden relative"
                >
                  
                  <div className="p-3 flex items-center justify-between border-b border-slate-100 bg-slate-50/50">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="size-7 rounded-full overflow-hidden border border-slate-100 shrink-0 bg-slate-100">
                        <img 
                          src={deal.businessLogo || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"} 
                          alt="" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <h4 className="text-[12px] font-bold text-slate-800 truncate">{deal.business}</h4>
                    </div>
                    {deal.verified && (
                      <span className="bg-pink-50 text-pink-700 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="h-40 w-full relative overflow-hidden bg-slate-100">
                    <img 
                      src={deal.image} 
                      alt={deal.title} 
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" 
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-widest text-slate-900">
                      {deal.category}
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-1">
                      <h3 className="text-slate-900 text-sm font-semibold group-hover:text-pink-700 transition-all line-clamp-2 h-10">
                        {deal.title}
                      </h3>
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-[11px] font-bold text-slate-700">{deal.rating || "4.9"}</span>
                      </div>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-2.5 border border-slate-100 space-y-2">
                       <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                          <span>Pool</span>
                          <span>{spentPercent}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-pink-500 rounded-full"
                            style={{ width: `${Math.min(100, spentPercent)}%` }}
                          />
                        </div>
                       </div>
                    </div>
                  </div>

                  <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
                    <p className="text-[11px] font-bold text-slate-500 uppercase">Payout</p>
                    <p className="text-sm font-black text-slate-900">{deal.price}</p>
                  </div>

                  <div className="px-4 pb-4">
                    <Link 
                      to={`/deal/${deal.id}`}
                      className="block w-full py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-center font-bold text-xs transition-all uppercase tracking-wide"
                    >
                      View Campaign
                    </Link>
                  </div>
                </motion.div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
