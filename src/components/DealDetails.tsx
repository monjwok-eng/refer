import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DEALS } from "../constants";
import { Check, ChevronLeft, MapPin, Share2, Star, CheckCircle2, Copy, Download, Video } from "lucide-react";
import { motion } from "framer-motion";

export default function DealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [deal, setDeal] = React.useState<any>(() => {
    const savedDeals = localStorage.getItem("all_deals");
    let allDeals = DEALS;
    if (savedDeals) {
      try {
        const parsed = JSON.parse(savedDeals);
        if (parsed && Array.isArray(parsed) && parsed.length > 0) {
          allDeals = parsed;
        }
      } catch (e) {}
    }
    return allDeals.find((d: any) => String(d.id) === id) || null;
  });

  const [copied, setCopied] = React.useState(false);
  const [isClaiming, setIsClaiming] = React.useState(false);
  const [claimed, setClaimed] = React.useState(() => {
    const claims = JSON.parse(localStorage.getItem("claimed_deals") || "[]");
    return claims.some((c: any) => String(c.dealId) === id);
  });

  if (!deal) return (
    <div className="max-w-4xl mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[50vh]">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Deal not found</h2>
      <button onClick={() => navigate(-1)} className="text-[#157945] hover:underline font-medium">Go back</button>
    </div>
  );

  const handleCopy = () => {
    navigator.clipboard.writeText(`https://test.com/ref/${deal.id}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      const claims = JSON.parse(localStorage.getItem("claimed_deals") || "[]");
      const hustlerName = localStorage.getItem("hustlerName") || "Hustler";
      const userPicture = localStorage.getItem("userPicture") || "https://images-wixmp-7ef3383b5fd80a9f5a5cc686.wixmp.com/27765ee8-82b7-404f-91cd-a507b11093a6/1741463568052/v1/fill/w_320,h_320/file.jpg";
      const claimId = `CLM-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

      const newClaim = {
        id: claimId,
        dealId: deal.id,
        title: deal.title,
        businessName: deal.business,
        claimedAt: new Date().toISOString(),
        status: "active"
      };

      // Add to private referrals for the specific business to see
      const businessKey = deal.business;
      const referralsKey = `referrals_${businessKey}`;
      const currentReferrals = JSON.parse(localStorage.getItem(referralsKey) || "[]");
      
      const newReferral = {
        id: claimId,
        referrerName: hustlerName,
        referrerAvatar: userPicture,
        dealTitle: deal.title,
        businessName: deal.business,
        joinedDate: "May 2026",
        referrals: 0,
        reliabilityScore: 85,
        status: "Active",
        timestamp: new Date().toISOString()
      };
      localStorage.setItem(referralsKey, JSON.stringify([newReferral, ...currentReferrals]));

      // Create notification for the specific business
      const notificationsKey = `notifications_${businessKey}`;
      const notifications = JSON.parse(localStorage.getItem(notificationsKey) || "[]");
      const newNotification = {
        id: Date.now(),
        type: "referral_started",
        title: "New Referral Started",
        description: `${hustlerName} started earning on your "${deal.title}" deal`,
        timestamp: new Date().toISOString(),
        unread: true
      };
      localStorage.setItem(notificationsKey, JSON.stringify([newNotification, ...notifications]));
      window.dispatchEvent(new Event("referr-notification-update"));

      localStorage.setItem("claimed_deals", JSON.stringify([...claims, newClaim]));
      setClaimed(true);
      setIsClaiming(false);
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 md:py-10 pb-32">
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 transition-colors mb-6 font-medium text-sm"
      >
        <ChevronLeft size={18} />
        Back to Deals
      </button>

      {/* Hero Image */}
      <div className="w-full h-48 md:h-72 rounded-2xl md:rounded-3xl overflow-hidden mb-6 md:mb-8 relative shadow-sm border border-gray-100">
        <img
          src={deal.image}
          alt={deal.business}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 directly to-transparent"></div>
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
          <Star size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
          <span className="text-xs font-bold text-gray-900">{deal.rating} Rating</span>
        </div>
      </div>

      {/* Header Info */}
      <div className="space-y-4 md:space-y-6">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div className="space-y-3">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight">
              {deal.title}
            </h1>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-gray-100">
                <img src={deal.image} alt={deal.business} className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-semibold text-gray-900">{deal.business}</h3>
                  {deal.verified && <CheckCircle2 size={14} className="text-[#157945]" />}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span>{deal.category}</span>
                  <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {deal.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-[#f0f9f4] border border-[#dcf2e6] rounded-xl p-4 md:min-w-[200px] flex flex-col justify-center shrink-0">
            <p className="text-xs font-bold text-[#157945] uppercase tracking-wider mb-1">Commission</p>
            <p className="text-2xl md:text-3xl font-bold text-green-800">Earn {deal.price}</p>
            <p className="text-xs font-semibold text-green-700/80 mt-1">Per successful lead</p>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-2">About this opportunity</h3>
          <p className="text-gray-600 leading-relaxed">
            {deal.description} This exclusive opportunity allows you to earn substantial commission by referring qualified leads to {deal.business}. 
            All referrals are tracked transparently through our platform.
          </p>
        </div>

        {/* Marketing Assets Section */}
        <div className="border-t border-gray-100 pt-6">
          <h3 className="text-lg font-bold text-gray-900 mb-3">Marketing Assets</h3>
          <p className="text-sm text-gray-600 mb-4">
            Downloadable images, banners, or video clips you can use on social media to promote this deal.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {/* Asset 1: Image */}
            <div className="group relative aspect-square bg-gray-50 rounded-xl overflow-hidden border border-gray-100">
              <img src={deal.image} alt="Asset banner" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button className="bg-white text-gray-900 text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-colors">
                  <Download size={14} /> Banner
                </button>
              </div>
            </div>
            
            {/* Asset 2: Logo */}
            <div className="group relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 p-4 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-100">
                 <img src={deal.image} alt={deal.business} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
              </div>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button className="bg-white text-gray-900 text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-colors">
                  <Download size={14} /> Logo
                </button>
              </div>
            </div>

            {/* Asset 3: Video Promo Placeholder */}
            <div className="group relative aspect-square bg-green-50/50 rounded-xl overflow-hidden border border-green-100 p-4 flex flex-col items-center justify-center">
              <div className="w-12 h-12 bg-green-100 text-green-700 rounded-full flex items-center justify-center mb-2 group-hover:scale-95 transition-transform">
                <Video size={24} />
              </div>
              <span className="text-xs font-medium text-green-800">Promo Clip</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button className="bg-white text-gray-900 text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-colors">
                  <Download size={14} /> MP4
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Action Footer */}
      <div className="fixed bottom-24 lg:bottom-8 left-4 right-4 md:left-1/2 md:-translate-x-1/2 md:max-w-2xl bg-white border border-gray-200 p-3 md:p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] z-40 flex items-center gap-3">
        <button
          onClick={handleCopy}
          className="w-12 h-12 md:w-14 md:h-14 shrink-0 rounded-xl bg-gray-50 hover:bg-gray-100 text-gray-700 flex items-center justify-center transition-colors border border-gray-200"
          title="Copy Link"
        >
          {copied ? <Check size={20} className="text-green-600" /> : <Copy size={20} />}
        </button>

        {claimed ? (
          <Link
            to="/dashboard/hustler"
            className="flex-1 h-12 md:h-14 bg-gray-900 text-white rounded-xl font-bold hover:bg-black transition-colors text-sm md:text-base flex items-center justify-center gap-2"
          >
            <CheckCircle2 size={18} className="text-[#1dbf73]" />
            View Active Referrals
          </Link>
        ) : (
          <button
            onClick={handleClaim}
            disabled={isClaiming}
            className="flex-1 h-12 md:h-14 bg-[#157945] text-white rounded-xl font-bold hover:bg-green-700 transition-colors text-sm md:text-base flex items-center justify-center gap-2 shadow-md active:scale-[0.98] disabled:opacity-70 disabled:pointer-events-none"
          >
            {isClaiming ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              "Start Earning Now"
            )}
          </button>
        )}
      </div>
    </div>
  );
}
