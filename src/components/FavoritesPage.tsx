import React, { useState, useEffect } from "react";
import { Heart, Trash2, ExternalLink, Star, ShieldCheck } from "lucide-react";
import { leaderboardData } from "./AnalyticsPage";
import { Skeleton } from "./ui/Skeleton";

export default function FavoritesPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem("favorite_referrers");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const removeFavorite = (id: string) => {
    const newFavorites = favorites.filter((fid) => fid !== id);
    setFavorites(newFavorites);
    localStorage.setItem("favorite_referrers", JSON.stringify(newFavorites));
  };

  const favoriteReferrers = leaderboardData.filter((item) =>
    favorites.includes(item.id)
  );

  return (
    <div className="max-w-[1000px] mx-auto text-left">
      <div className="mb-12 text-left">
        <h1 className="text-[32px] font-bold text-[#222325] tracking-tight italic text-left">
          Favorites
        </h1>
        <p className="text-slate-400 text-[14px] mt-1 text-left">
          Your handpicked top-performing referrers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 text-left">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200 p-6 flex items-center justify-between text-left">
              <div className="flex items-center gap-4 text-left">
                <Skeleton className="w-16 h-16 rounded-full text-left" />
                <div className="space-y-2 text-left">
                  <Skeleton className="w-32 h-5 rounded text-left" />
                  <Skeleton className="w-48 h-4 rounded text-left" />
                </div>
              </div>
              <Skeleton className="w-24 h-10 rounded text-left" />
            </div>
          ))
        ) : favoriteReferrers.length > 0 ? (
          favoriteReferrers.map((referrer) => (
            <div
              key={referrer.id}
              className="bg-white border border-slate-200 p-6 hover:border-[#1dbf73] transition-all group text-left"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 text-left">
                <div className="flex items-center gap-5 text-left">
                  <div className="relative text-left">
                    <img
                      src={referrer.avatar}
                      alt={referrer.name}
                      className="w-16 h-16 rounded-full border-2 border-slate-50 object-cover text-left"
                    />
                    <div className="absolute -top-1 -right-1 bg-[#1dbf73] text-white p-1 rounded-full shadow-lg text-left">
                      <Star size={10} fill="currentColor" />
                    </div>
                  </div>
                  <div className="text-left">
                    <h3 className="text-[18px] font-bold text-[#222325] text-left">
                      {referrer.name}
                    </h3>
                    <div className="flex items-center gap-4 mt-1 text-left">
                      <p className="text-slate-400 text-[13px] text-left">
                        <span className="font-bold text-[#1dbf73] text-left">{(referrer as any).referrals}</span> Referrals
                      </p>
                      <div className="w-1 h-1 rounded-full bg-slate-200" />
                      <div className="flex items-center gap-1 text-[#1dbf73] text-[13px] font-bold">
                        <ShieldCheck size={14} />
                        <span>{(referrer as any).reliabilityScore}% Reliability</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-left">
                  <button
                    onClick={() => removeFavorite(referrer.id)}
                    className="p-3 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-none text-left"
                    title="Remove from favorites"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-slate-200 p-20 flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-slate-50 flex items-center justify-center text-slate-200 mb-6 rounded-full">
              <Heart size={32} />
            </div>
            <h3 className="text-[20px] font-bold text-[#222325] mb-2">No favorites yet</h3>
            <p className="text-slate-400 max-w-sm mb-8">
              Handpick your favorite referrers from the Analytics leaderboard to stay connected.
            </p>
            <button
              onClick={() => window.location.href = "/dashboard/analytics"}
              className="bg-[#1dbf73] text-white px-8 py-3 font-bold text-[13px] hover:bg-[#19a463] transition-all uppercase tracking-widest"
            >
              Browse Referrers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
