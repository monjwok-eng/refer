import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { DEALS } from "../constants";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, 
  SlidersHorizontal, 
  CheckCircle2, 
  Star, 
  MapPin, 
  ArrowRight,
  TrendingUp,
  X,
  Briefcase,
  Zap,
  Heart,
} from "lucide-react";
import { Skeleton } from "./ui/Skeleton";

export default function Deals() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const categories = ["All", "Beauty", "Travel", "Hair", "Phone", "Tech", "Food"];
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Most Recent");
  const [verifiedOnly, setVerifiedOnly] = useState(false);

  const [allDeals, setAllDeals] = useState<any[]>([]);

  useEffect(() => {
    const savedDeals = localStorage.getItem("all_deals");
    if (savedDeals) {
      try {
        setAllDeals(JSON.parse(savedDeals));
      } catch (e) {
        setAllDeals(DEALS);
      }
    } else {
      setAllDeals(DEALS);
    }
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
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
        return b.id - a.id;
      }
      return 0;
    });
  }, [allDeals, activeCategory, searchQuery, verifiedOnly, sortBy]);

  return (
    <div className="min-h-screen bg-[#f7f7f7] pb-24 md:pb-12 text-[#404145]">
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-12 pt-8 space-y-8">
        {/* Fiverr-Style Marketplace Header */}
        <header className="flex flex-col gap-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <h1 className="text-3xl md:text-4xl font-bold text-[#222325] tracking-tight">
                Opportunities Marketplace
              </h1>
              <p className="text-[#62646a] text-lg">Find the best deals to refer and earn commissions.</p>
            </div>
            <div className="flex items-center gap-3">
              <button 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className={`flex items-center gap-2 px-6 py-3 rounded border font-bold text-sm transition-all ${isFilterOpen ? 'bg-[#222325] text-white border-[#222325]' : 'bg-white text-[#404145] border-gray-300 hover:border-gray-400'}`}
              >
                 <SlidersHorizontal size={18} /> Filters
               </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative group max-w-3xl">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-[#95979d]" size={20} />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="What service are you looking to refer?"
              className="w-full pl-14 pr-32 py-4 bg-white border border-gray-300 rounded text-base focus:outline-none focus:border-[#1dbf73] transition-all placeholder:text-[#95979d]"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 h-[calc(100%-16px)] px-6 bg-[#1dbf73] text-white rounded font-bold text-sm hover:bg-[#19a463] transition-all hidden sm:block">
              Search
            </button>
          </div>
        </header>

        {/* Filters Overlay */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <label className="text-base font-bold text-[#222325]">Sort By</label>
                  <div className="flex flex-col gap-2">
                    {["Most Recent", "Highest Payout", "Nearest"].map(s => (
                      <button 
                        key={s}
                        onClick={() => setSortBy(s)}
                        className={`text-left text-sm py-1 transition-colors ${sortBy === s ? 'text-[#1dbf73] font-bold' : 'text-[#62646a] hover:text-[#222325]'}`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-4">
                  <label className="text-base font-bold text-[#222325]">Trust Status</label>
                  <div className="flex items-center gap-3">
                    <button 
                      onClick={() => setVerifiedOnly(!verifiedOnly)}
                      className={`relative w-12 h-6 rounded-full transition-colors ${verifiedOnly ? 'bg-[#1dbf73]' : 'bg-gray-200'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${verifiedOnly ? 'left-7' : 'left-1'}`} />
                    </button>
                    <span className="text-sm font-medium text-[#62646a]">Verified Businesses Only</span>
                  </div>
                </div>
                <div className="flex items-end justify-end">
                   <button 
                    onClick={() => setIsFilterOpen(false)}
                    className="px-8 py-3 bg-[#222325] text-white rounded font-bold text-sm hover:bg-black transition-all"
                  >
                    Apply Filters
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Categories Bar */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2 border-b border-gray-200">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-3 font-medium text-sm transition-all whitespace-nowrap border-b-2 ${
                activeCategory === cat
                  ? "text-[#1dbf73] border-[#1dbf73]"
                  : "text-[#62646a] border-transparent hover:text-[#222325]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Deals Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {isLoading ? (
            Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[400px]">
                <Skeleton className="h-48 w-full" />
                <div className="p-4 space-y-4 flex-1">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="p-4 border-t border-gray-100">
                  <Skeleton className="h-10 w-full" />
                </div>
              </div>
            ))
          ) : filteredDeals.length === 0 ? (
            <div className="col-span-full py-24 text-center space-y-4 bg-white rounded-lg border border-gray-200">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
                <Search className="text-gray-300" size={32} />
              </div>
              <h3 className="text-lg font-bold text-[#222325]">No deals found for "{searchQuery}"</h3>
              <p className="text-[#62646a]">Try adjusting your search or filters to find what you're looking for.</p>
              <button 
                onClick={() => {setSearchQuery(""); setActiveCategory("All");}}
                className="text-[#1dbf73] font-bold hover:underline"
              >
                Clear all filters
              </button>
            </div>
          ) : (
            filteredDeals.map((deal, idx) => (
              <motion.div
                key={deal.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-all flex flex-col h-full group cursor-pointer"
              >
                {/* Deal Image / Cover */}
                <div className="h-48 w-full relative overflow-hidden bg-gray-100">
                   <img src={deal.image} alt={deal.business} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                   {deal.verified && (
                     <div className="absolute top-3 left-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 text-[#1dbf73] shadow-sm">
                        <CheckCircle2 size={12} fill="currentColor" className="text-white" /> Verified
                     </div>
                   )}
                   <button className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur rounded-full flex items-center justify-center text-gray-400 hover:text-rose-500 transition-colors shadow-sm">
                      <Heart size={16} />
                   </button>
                </div>

                {/* Content */}
                <div className="p-4 flex-1 flex flex-col space-y-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden shrink-0">
                      <img src={deal.image} alt="" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[13px] font-bold text-[#404145] hover:underline truncate">{deal.business}</span>
                  </div>
                  
                  <h3 className="text-[#404145] text-base leading-snug group-hover:text-[#1dbf73] transition-colors line-clamp-2 h-12">
                    {deal.title}
                  </h3>

                  <div className="flex items-center gap-1 text-yellow-500">
                    <Star size={14} fill="currentColor" />
                    <span className="text-sm font-bold text-[#404145]">4.9</span>
                    <span className="text-sm text-[#b5b6ba]">(1k+)</span>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/30">
                   <p className="text-[10px] font-bold text-[#74767e] uppercase tracking-widest">Commission</p>
                   <div className="text-right">
                     <p className="text-[12px] text-[#74767e] leading-none mb-0.5">Starting at</p>
                     <p className="text-lg font-black text-[#404145] leading-none">{deal.price}</p>
                   </div>
                </div>
                
                <div className="p-4 pt-0">
                   <Link 
                    to={`/deal/${deal.id}`}
                    className="block w-full py-2.5 bg-white border border-gray-300 rounded text-center font-bold text-sm text-[#404145] hover:bg-[#404145] hover:text-white transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
