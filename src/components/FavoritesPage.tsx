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
    <div className="max-w-7xl mx-auto pt-8 px-4 pb-24">
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight mb-2">
          Favorites
        </h1>
        <p className="text-slate-500 text-sm">
          Your handpicked top-performing referrers.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white border border-slate-200/80 rounded-xl p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Skeleton className="w-12 h-12 rounded-full" />
                <div className="space-y-2">
                  <Skeleton className="w-32 h-4 rounded" />
                  <Skeleton className="w-48 h-3 rounded" />
                </div>
              </div>
              <Skeleton className="w-10 h-10 rounded-lg" />
            </div>
          ))
        ) : favoriteReferrers.length > 0 ? (
          favoriteReferrers.map((referrer) => (
            <div
              key={referrer.id}
              className="bg-white border border-slate-200/80 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-md transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img
                    src={referrer.avatar}
                    alt={referrer.name}
                    className="w-14 h-14 rounded-full border border-slate-100 object-cover"
                  />
                  <div className="absolute -top-1 -right-1 bg-amber-400 text-white p-1 rounded-full shadow-sm">
                    <Star size={10} fill="currentColor" />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    {referrer.name}
                  </h3>
                  <div className="flex items-center gap-3 mt-1 text-xs">
                    <p className="text-slate-500">
                      <span className="font-bold text-pink-600">{(referrer as any).referrals}</span> Referrals
                    </p>
                    <div className="w-1 h-1 rounded-full bg-slate-300" />
                    <div className="flex items-center gap-1.5 text-pink-600 font-bold">
                      <ShieldCheck size={14} />
                      <span>{(referrer as any).reliabilityScore}% Reliability</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => removeFavorite(referrer.id)}
                className="p-2.5 text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all rounded-lg ml-auto"
                title="Remove from favorites"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="bg-white border border-slate-200/80 rounded-xl p-16 flex flex-col items-center justify-center text-center">
            <div className="w-12 h-12 bg-slate-50 flex items-center justify-center text-slate-300 mb-4 rounded-full">
              <Heart size={20} />
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-1">No favorites yet</h3>
            <p className="text-slate-500 text-sm max-w-xs mb-6">
              Handpick your favorite referrers from the Analytics leaderboard to stay connected.
            </p>
            <button
              onClick={() => window.location.href = "/dashboard/analytics"}
              className="bg-slate-900 text-white px-6 py-2.5 font-bold text-xs rounded-lg hover:bg-slate-800 transition-all uppercase tracking-wider"
            >
              Browse Referrers
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
