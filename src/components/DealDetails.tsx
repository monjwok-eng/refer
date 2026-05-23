import React, { useRef, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DEALS } from "../constants";
import { Check, ChevronLeft, MapPin, Share2, Star, CheckCircle2, Copy, Download, Video, MessageSquare, Send } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { getBusinessRatings, addBusinessReview } from "../utils/ratingStore";

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

  // Ratings-related states
  const [ratings, setRatings] = React.useState(() => {
    return getBusinessRatings(deal ? deal.business : "");
  });

  const [newRating, setNewRating] = React.useState(5);
  const [newComment, setNewComment] = React.useState("");
  const [reviewerName, setReviewerName] = React.useState("");
  const [reviewSuccess, setReviewSuccess] = React.useState(false);

  // Banner generator config
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [bannerTheme, setBannerTheme] = React.useState<"emerald" | "cobalt" | "coral" | "obsidian">("emerald");
  const [customSubtitle, setCustomSubtitle] = React.useState("");
  const [copiedCaption, setCopiedCaption] = React.useState(false);

  // Update ratings when store updates
  useEffect(() => {
    const handleUpdate = () => {
      if (deal) {
        setRatings(getBusinessRatings(deal.business));
      }
    };
    window.addEventListener("referr-ratings-update", handleUpdate);
    return () => window.removeEventListener("referr-ratings-update", handleUpdate);
  }, [deal]);

  // Handle rating submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!deal || !newComment.trim() || !reviewerName.trim()) return;

    addBusinessReview(deal.business, {
      reviewerName: reviewerName.trim(),
      rating: newRating,
      comment: newComment.trim(),
      avatar: `https://images.unsplash.com/photo-${1500000000000 + Math.floor(Math.random() * 900000)}?w=100&h=100&fit=crop&q=80`
    });

    setNewComment("");
    setReviewerName("");
    setNewRating(5);
    setReviewSuccess(true);
    setTimeout(() => setReviewSuccess(false), 3000);
  };

  // Generate Canva Social Banner
  const drawBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas || !deal) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Canvas size (standard square social image 1080x1080)
    canvas.width = 1080;
    canvas.height = 1080;

    // Draw Background Gradient
    let gradient = ctx.createLinearGradient(0, 0, 1080, 1080);
    if (bannerTheme === "emerald") {
      gradient.addColorStop(0, "#064e3b"); // emerald-900
      gradient.addColorStop(1, "#10b981"); // emerald-500
    } else if (bannerTheme === "cobalt") {
      gradient.addColorStop(0, "#1e3a8a"); // blue-900
      gradient.addColorStop(1, "#3b82f6"); // blue-500
    } else if (bannerTheme === "coral") {
      gradient.addColorStop(0, "#7c2d12"); // orange-900
      gradient.addColorStop(1, "#f97316"); // orange-500
    } else {
      gradient.addColorStop(0, "#0f172a"); // slate-900
      gradient.addColorStop(1, "#dc2626"); // red-600
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1080, 1080);

    // Modern branding grids (subtle decoration)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
    ctx.lineWidth = 1;
    for (let i = 0; i < 1080; i += 60) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, 1080);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(1080, i);
      ctx.stroke();
    }

    // Outer border frame
    ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
    ctx.lineWidth = 24;
    ctx.strokeRect(12, 12, 1080 - 24, 1080 - 24);

    // Draw Top Badge "APPROVED BRAND OFFER"
    ctx.fillStyle = "rgba(255, 255, 255, 0.15)";
    const badgeWidth = 420;
    const badgeHeight = 60;
    const badgeX = (1080 - badgeWidth) / 2;
    const badgeY = 120;
    ctx.beginPath();
    ctx.roundRect(badgeX, badgeY, badgeWidth, badgeHeight, 30);
    ctx.fill();

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 20px system-ui, -apple-system, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("EXCLUSIVE REFERR PARTNER OFFER", 1080 / 2, badgeY + 38);

    // Business Name
    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "bold 32px system-ui, sans-serif";
    ctx.fillText(deal.business.toUpperCase(), 1080 / 2, 280);

    // Main Deal Title (Splitting across lines if long)
    ctx.fillStyle = "#ffffff";
    ctx.font = "black 72px system-ui, sans-serif";
    const words = deal.title.toUpperCase().split(" ");
    let line1 = "";
    let line2 = "";
    for (let i = 0; i < words.length; i++) {
      if (i < Math.ceil(words.length / 2)) {
        line1 += words[i] + " ";
      } else {
        line2 += words[i] + " ";
      }
    }
    
    ctx.fillText(line1.trim(), 1080 / 2, 420);
    if (line2) {
      ctx.fillText(line2.trim(), 1080 / 2, 510);
    }

    // Centered White Box for Commission / Reward
    ctx.fillStyle = "#ffffff";
    const boxWidth = 720;
    const boxHeight = 220;
    const boxX = (1080 - boxWidth) / 2;
    const boxY = 620;
    ctx.beginPath();
    ctx.roundRect(boxX, boxY, boxWidth, boxHeight, 24);
    ctx.fill();

    // Box text
    ctx.fillStyle = "#222325";
    ctx.font = "semibold 24px system-ui, sans-serif";
    ctx.fillText("COMMISSION REWARD FOR REFERRERS", 1080 / 2, boxY + 60);

    ctx.fillStyle = bannerTheme === "emerald" ? "#064e3b" : bannerTheme === "cobalt" ? "#1e3a8a" : "#7c2d12";
    ctx.font = "bold 84px system-ui, sans-serif";
    ctx.fillText(`EARN ${deal.price.toUpperCase()}`, 1080 / 2, boxY + 160);

    // Bottom Branding Stamp
    ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
    ctx.font = "medium 22px system-ui, sans-serif";
    ctx.fillText(
      customSubtitle.trim() || `Scan code or click referral link to request this service. verified on referr.`,
      1080 / 2,
      950
    );

    ctx.fillStyle = "#ffffff";
    ctx.font = "bold 26px system-ui, sans-serif";
    ctx.fillText("REFERRED VIA Referr™ COOP", 1080 / 2, 1000);
  };

  // Re-draw when config changes
  useEffect(() => {
    if (deal) {
      drawBanner();
    }
  }, [deal, bannerTheme, customSubtitle]);

  const handleDownloadBanner = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = `Referr_Social_Banner_${deal?.business?.replace(/\s+/g, "_")}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleCopyCaption = () => {
    if (!deal) return;
    const caption = `Hey friends! Check out this absolute deal from ${deal.business}: "${deal.title}". Use my verified Referr link to claim your offer and support me at the same time! 🚀🔗 Click here: https://referr.co/ref/${deal.id}`;
    navigator.clipboard.writeText(caption);
    setCopiedCaption(true);
    setTimeout(() => setCopiedCaption(false), 2000);
  };

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
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6 bg-white/95 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-lg">
          <Star size={14} className="fill-[#f59e0b] text-[#f59e0b]" />
          <span className="text-xs font-bold text-gray-900">{ratings.averageRating} Rating ({ratings.totalReviews} reviews)</span>
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

        {/* Marketing Assets Section with Live Creative Studio */}
        <div className="border-t border-gray-100 pt-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-4 gap-2">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Marketing Assets & Creative Studio</h3>
              <p className="text-xs text-gray-500 mt-1">
                Customize, generate and download banners or promotional swipe copy to boost your click rates.
              </p>
            </div>
            <div className="flex items-center bg-green-50 px-2.5 py-1 rounded border border-green-200 text-[#157945] text-xs font-bold uppercase tracking-wider gap-1.5 self-start md:self-auto">
              <CheckCircle2 size={12} /> Auto-Branded Builder
            </div>
          </div>

          {/* Interactive Generator Platform */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-50 border border-slate-200/60 p-5 rounded-2xl mb-6">
            {/* Visual Canvas Canvas Rendering */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-slate-200 w-full flex items-center justify-center aspect-square relative overflow-hidden group">
                <canvas 
                  ref={canvasRef} 
                  className="w-full h-full object-contain rounded-lg shadow-sm"
                  style={{ maxHeight: "280px" }}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2 p-2 pointer-events-none">
                  <span className="text-white text-xs font-bold tracking-tight">Active Canvas View (1080x1080)</span>
                  <span className="text-slate-300 text-[10px] text-center">High Quality vector export</span>
                </div>
              </div>
              <button
                onClick={handleDownloadBanner}
                className="w-full mt-3 bg-[#1dbf73] hover:bg-[#19a463] text-white py-2.5 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
              >
                <Download size={14} /> Download Ready Social Banner (PNG)
              </button>
            </div>

            {/* Live Controls */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3 text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Visual Preset Themes</label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { key: "emerald", label: "Emerald Glow", bg: "bg-emerald-600 border-emerald-900" },
                    { key: "cobalt", label: "Indigo Cyber", bg: "bg-blue-600 border-blue-900" },
                    { key: "coral", label: "Coral Sunset", bg: "bg-orange-500 border-orange-800" },
                    { key: "obsidian", label: "Dark Crimson", bg: "bg-slate-900 border-red-900" }
                  ].map((theme) => (
                    <button
                      key={theme.key}
                      onClick={() => setBannerTheme(theme.key as any)}
                      className={`flex flex-col items-center gap-1.5 p-2 rounded-xl border text-[10px] font-bold transition-all ${bannerTheme === theme.key ? "ring-2 ring-[#1dbf73] border-slate-400 bg-white shadow-smScale" : "bg-transparent border-slate-200 hover:bg-slate-100"}`}
                    >
                      <div className={`w-6 h-6 rounded-full ${theme.bg}`} />
                      <span className="text-slate-700 truncate w-full text-center">{theme.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2 text-left">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Custom Footer Stamp Text</label>
                <input
                  type="text"
                  placeholder="Defaults to: Scan code or click link..."
                  value={customSubtitle}
                  onChange={(e) => setCustomSubtitle(e.target.value)}
                  className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1dbf73]"
                />
              </div>

              <div className="border-t border-slate-200/60 pt-4 space-y-2 text-left">
                <span className="block text-xs font-bold text-slate-700 uppercase tracking-wider">Verified Social Sharing Text</span>
                <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-600 relative">
                  <p className="line-clamp-3 leading-relaxed pr-8">
                    Hey friends! Check out this absolute deal from {deal.business}: "{deal.title}". Use my verified Referr link to claim your offer! 🚀🔗 Click here: https://referr.co/ref/{deal.id}
                  </p>
                  <button 
                    onClick={handleCopyCaption}
                    className="absolute top-2.5 right-2 text-slate-400 hover:text-[#1dbf73] transition-colors bg-slate-50 p-1 rounded border border-slate-200"
                    title="Copy caption"
                  >
                    {copiedCaption ? <Check size={14} className="text-green-600" /> : <Copy size={14} />}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {/* Asset: Logo Download */}
            <div className="group relative aspect-square bg-white rounded-xl overflow-hidden border border-gray-100 p-4 flex flex-col items-center justify-center">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border border-gray-100 mb-2">
                 <img src={deal.image} alt={deal.business} className="w-full h-full object-cover group-hover:opacity-50 transition-opacity" />
              </div>
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">Standard Logo</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <a 
                  href={deal.image} 
                  download={`Logo_${deal.business}.jpg`}
                  className="bg-white text-gray-900 text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-colors pointer-events-auto"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Download size={14} /> Download File
                </a>
              </div>
            </div>

            {/* Asset: Video Short Download */}
            <div className="group relative aspect-square bg-slate-900 rounded-xl overflow-hidden border border-slate-800 p-4 flex flex-col items-center justify-center text-center">
              <div className="w-12 h-12 bg-rose-500/25 text-rose-400 rounded-full flex items-center justify-center mb-2 group-hover:scale-105 transition-transform">
                <Video size={20} />
              </div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-tight">15s Short / Reel Clip</span>
              <span className="text-[9px] text-slate-500 mt-1">Sized for Mobile Stories</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button 
                  onClick={() => alert("Simulating Video Asset Download: promo_short.mp4 has been prepared!")}
                  className="bg-white text-gray-900 text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Download size={14} /> Download MP4
                </button>
              </div>
            </div>

            {/* Asset: High Res Flyer */}
            <div className="group relative aspect-square bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl overflow-hidden border border-blue-100 p-4 flex flex-col items-center justify-center text-center">
              <span className="text-xl font-black text-indigo-700 mb-1">FLYER</span>
              <span className="text-[11px] font-bold text-slate-600 uppercase tracking-tight">Print Flyer Asset</span>
              <span className="text-[9px] text-slate-400 mt-1">A4 Standard Format</span>
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2">
                <button 
                  onClick={() => alert("Simulating Printable Flyer PDF download prep...")}
                  className="bg-white text-gray-900 text-xs font-bold py-1.5 px-3 rounded-full flex items-center gap-1.5 shadow-sm hover:bg-gray-50 transition-all cursor-pointer"
                >
                  <Download size={14} /> Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Business Reviews & Mutual Trust Section */}
        <div className="border-t border-gray-100 pt-8 pb-12 text-left">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Business Reviews & Trust Index</h3>
              <p className="text-xs text-gray-500">Verified reviews and comments posted by other referrers in the network.</p>
            </div>
            <div className="flex items-center gap-1.5 bg-yellow-50 px-3 py-1 rounded border border-yellow-200">
              <Star className="fill-amber-400 text-amber-400" size={14} />
              <span className="text-xs font-bold text-amber-950">{ratings.averageRating} Rating ({ratings.totalReviews} reviews)</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            {/* Reviews List */}
            <div className="md:col-span-7 space-y-4">
              {ratings.reviews.length === 0 ? (
                <div className="p-8 text-center bg-gray-50 border border-dashed border-gray-200 rounded-xl">
                  <p className="text-sm text-gray-400">No active reviews for this brand yet. Be the first to rate your experience!</p>
                </div>
              ) : (
                ratings.reviews.map((r) => (
                  <div key={r.id} className="p-4 bg-white border border-gray-100 rounded-xl shadow-sm space-y-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-full bg-indigo-50 flex items-center justify-center text-xs font-bold text-indigo-600 overflow-hidden border border-indigo-100">
                          {r.avatar ? <img src={r.avatar} alt={r.reviewerName} className="w-full h-full object-cover" /> : r.reviewerName.charAt(0)}
                        </div>
                        <div className="text-left">
                          <h4 className="text-xs font-bold text-gray-900">{r.reviewerName}</h4>
                          <span className="text-[10px] text-gray-400">{new Date(r.timestamp).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-0.5 text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            className={i < Math.floor(r.rating) ? "fill-amber-400" : "text-gray-200"} 
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed font-light pl-10">"{r.comment}"</p>
                  </div>
                ))
              )}
            </div>

            {/* Leave a Rating Form */}
            <div className="md:col-span-5 bg-slate-50 p-5 rounded-2xl border border-slate-200/60 self-start">
              <h4 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                <MessageSquare size={14} className="text-[#1dbf73]" /> Leave Brand Rating
              </h4>
              <p className="text-[11px] text-slate-500 mb-4">Support other creators! Rate your real interaction experience with {deal.business}.</p>

              <form onSubmit={handleSubmitReview} className="space-y-4">
                <div className="text-left">
                  <span className="block text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">Rating Score</span>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setNewRating(star)}
                        className="transition-transform active:scale-95 group"
                      >
                        <Star 
                          size={24} 
                          className={`${star <= newRating ? "fill-amber-400 text-amber-400" : "text-slate-300 hover:text-amber-300"}`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-slate-600 ml-2">({newRating} Stars)</span>
                  </div>
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Your Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sandra Nabankema"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1dbf73]"
                  />
                </div>

                <div className="text-left">
                  <label className="block text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1">Trust Feedback / Comment</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="e.g., Highly communicative on campaigns, fast payout approved on time!"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full text-xs px-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:border-[#1dbf73] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#222325] hover:bg-black text-white text-xs font-bold py-2.5 rounded-xl transition-all flex items-center justify-center gap-1.5"
                >
                  <Send size={12} /> Submit Verified Review
                </button>

                <AnimatePresence>
                  {reviewSuccess && (
                    <motion.p
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="text-xs text-green-600 font-bold text-center mt-2"
                    >
                      ✓ Thank you! Rating posted instantly.
                    </motion.p>
                  )}
                </AnimatePresence>
              </form>
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
