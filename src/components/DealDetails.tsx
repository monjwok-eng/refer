import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { DEALS } from "../constants";
import { 
  Check, 
  ChevronLeft, 
  MapPin, 
  Share2, 
  Star, 
  CheckCircle2, 
  Copy, 
  Download, 
  Video,
  Shield,
  Award,
  Users,
  Trophy,
  BarChart2,
  Clock,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  Wallet,
  FileText
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebaseService";

export default function DealDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Resolve base deal data
  const [deal, setDeal] = useState<any>({
    id: Number(id) || 1,
    title: "Hey Lemon",
    business: "Hey Lemon",
    category: "Technology",
    image: "https://cdn.contentrewards.com/user_y4mHlomMCvC92/1778150565315.png",
    rating: "4.9",
    verified: true,
    price: "UGX 3,600"
  });
  const [isDealLoading, setIsDealLoading] = useState(true);

  useEffect(() => {
    const fetchDeal = async () => {
      if (!id) return;
      try {
        const docRef = doc(db, "deals", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setDeal({ id: docSnap.id, ...docSnap.data() });
        } else {
          // Fallback to local
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
          const found = allDeals.find((d: any) => String(d.id) === id);
          if (found) {
            setDeal(found);
          }
        }
      } catch (err) {
        console.error("Failed to fetch deal", err);
        const found = DEALS.find((d: any) => String(d.id) === id);
        if (found) setDeal(found);
      } finally {
        setIsDealLoading(false);
      }
    };
    fetchDeal();
  }, [id]);

  const [similarDeals, setSimilarDeals] = useState<any[]>([]);

  useEffect(() => {
    const fetchSimilar = async () => {
      try {
        const dealsRef = collection(db, "deals");
        const snapshot = await getDocs(dealsRef);
        let docs: any[] = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        if (docs.length === 0) {
          const savedDeals = localStorage.getItem("all_deals");
          if (savedDeals) {
            try {
              docs = JSON.parse(savedDeals);
            } catch (e) {}
          }
          if (!docs || docs.length === 0) {
            docs = DEALS;
          }
        }
        // Filter out current campaign
        const filtered = docs.filter((d: any) => String(d.id) !== id);
        // Take up to 3 similar campaigns
        setSimilarDeals(filtered.slice(0, 3));
      } catch (err) {
        console.error("Failed to fetch similar deals", err);
        const filtered = DEALS.filter((d: any) => String(d.id) !== id);
        setSimilarDeals(filtered.slice(0, 3));
      }
    };
    fetchSimilar();
  }, [id]);

  const [activeTab, setActiveTab] = useState<"overview" | "leaderboard" | "analytics">("overview");
  const [copied, setCopied] = useState(false);
  const [isClaiming, setIsClaiming] = useState(false);
  const [claimed, setClaimed] = useState(() => {
    const claims = JSON.parse(localStorage.getItem("claimed_deals") || "[]");
    return claims.some((c: any) => String(c.dealId) === id);
  });

  // Proof of Performance Submission States
  const [submissions, setSubmissions] = useState<any[]>(() => {
    try {
      const saved = localStorage.getItem(`submissions_${id}`);
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  const [clipPlatform, setClipPlatform] = useState<"tiktok" | "reels" | "shorts">("tiktok");
  const [clipUrl, setClipUrl] = useState("");
  const [clipViews, setClipViews] = useState("");
  const [submittingProof, setSubmittingProof] = useState(false);
  const [submitProgressStep, setSubmitProgressStep] = useState(0);
  const [rewardCalculated, setRewardCalculated] = useState(0);
  const [submissionComplete, setSubmissionComplete] = useState(false);

  const handleProofSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clipUrl || !clipViews) return;

    const viewsCount = Number(clipViews);
    if (isNaN(viewsCount) || viewsCount <= 0) {
      alert("Please enter a valid estimate of views count.");
      return;
    }

    // Determine CPM based on platform selection
    let cpm = 3600; // TikTok (UGX 3,600 / 1K views)
    if (clipPlatform === "reels") cpm = 2520; // Reels (UGX 2,520)
    if (clipPlatform === "shorts") cpm = 1800; // Shorts (UGX 1,800)

    const reward = Math.floor((viewsCount / 1000) * cpm);
    setRewardCalculated(reward);
    setSubmittingProof(true);
    setSubmitProgressStep(0);

    // Timed Verification simulation
    setTimeout(() => {
      setSubmitProgressStep(1);
      setTimeout(() => {
        setSubmitProgressStep(2);
        setTimeout(() => {
          setSubmitProgressStep(3);
          setTimeout(() => {
            // Save inside submissions list
            const newSub = {
              id: `SUB-${Math.floor(1000 + Math.random() * 9000)}`,
              platform: clipPlatform,
              link: clipUrl,
              views: viewsCount,
              reward: `UGX ${reward.toLocaleString()}`,
              date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              status: "Approved & Cleared"
            };

            const updatedSubs = [newSub, ...submissions];
            setSubmissions(updatedSubs);
            localStorage.setItem(`submissions_${id}`, JSON.stringify(updatedSubs));

            // Increment Hustler Balance
            const currentBalance = Number(localStorage.getItem("hustler_balance") || "180000");
            const finalBalance = currentBalance + reward;
            localStorage.setItem("hustler_balance", String(finalBalance));

            // Append transaction inside history
            const txs = JSON.parse(localStorage.getItem("hustler_transactions") || "[]");
            const newTx = {
              id: `TX-${Math.floor(1000 + Math.random() * 9000)}`,
              time: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
              name: `Clip Performance Payout (${clipPlatform.toUpperCase()})`,
              type: "Video Clip Performance Payment",
              business: deal?.business || "Hey Lemon",
              status: "Cleared",
              amount: `+UGX ${reward.toLocaleString()}`,
              isPositive: true
            };
            localStorage.setItem("hustler_transactions", JSON.stringify([newTx, ...txs]));

            // Append notification in host
            const curNots = JSON.parse(localStorage.getItem("notifications_hustler") || "[]");
            const newNot = {
              id: Date.now(),
              type: "referral_earned",
              title: "Proof of Performance Cleared!",
              description: `You earned UGX ${reward.toLocaleString()} checkmarks for ${deal?.title || "campaign"} clip view performance.`,
              timestamp: new Date().toISOString(),
              unread: true
            };
            localStorage.setItem("notifications_hustler", JSON.stringify([newNot, ...curNots]));
            window.dispatchEvent(new Event("referr-notification-update"));

            // Complete UI
            setSubmittingProof(false);
            setSubmissionComplete(true);
            setClipUrl("");
            setClipViews("");
          }, 1200);
        }, 1200);
      }, 1200);
    }, 1000);
  };

  // Load Premium Mapped Asset details for high-fidelity feel
  const premium = React.useMemo(() => {
    const title = deal?.title || "";
    const business = deal?.business || "";
    const category = deal?.category || "";
    
    const normalizedTitle = title.toLowerCase();
    const normalizedBiz = business.toLowerCase();

    if (normalizedTitle.includes("lemon") || normalizedBiz.includes("lemon")) {
      return {
        title: "Hey Lemon",
        business: "Hey Lemon",
        category: "Technology",
        budgetSpent: 3288,
        totalBudget: 10000,
        verified: true,
        creatorsCount: 274,
        lastUpdated: "2 weeks ago",
        successRate: "49%",
        avatar: "https://assets-2-prod.whop.com/public/uploads/user_23939834/image/bots/2026-05-07/65f44f87-e97c-4671-bb88-444197cec340.png",
        payoutPlatforms: [
          { platform: "YouTube", cpm: "UGX 3,600", min: "UGX 3,600", max: "UGX 1,000,000", logoColor: "from-rose-500 to-red-600", active: true },
          { platform: "TikTok", cpm: "UGX 3,600", min: "UGX 3,600", max: "UGX 1,000,000", logoColor: "from-zinc-800 to-black", active: true },
          { platform: "Instagram", cpm: "UGX 3,600", min: "UGX 3,600", max: "UGX 1,000,000", logoColor: "from-fuchsia-500 via-purple-600 to-pink-500", active: true }
        ],
        requirements: [
          "The Lemon logo must appear in every clip. Use the files in the Brand Assets folder — no recreating or resizing from memory.",
          "Every video must include a clear verbal or on-screen CTA directing viewers to download Lemon at heylemon.ai.",
          "If posting on Instagram, tag @heylemon.ai in both the caption and the video itself.",
          "Target Tier 1 audiences only: USA, UK, Canada, and Australia"
        ],
        resources: [
          { name: "Brief", subtitle: "Official Document", url: "https://docs.google.com/document/d/1VYkQOkz5lFL6Hf33fmyKrPR_6TWu56ex5QYCYrwNtzg/edit?tab=t.0", type: "document" },
          { name: "Google Drive", subtitle: "Brand Assets", url: "https://drive.google.com/drive/u/0/folders/1Ip25Tz2coq4FjY5UKU6yNOkscWUz8jzX", type: "drive" }
        ]
      };
    }
    
    if (normalizedTitle.includes("fuel") || normalizedBiz.includes("aonic") || normalizedTitle.includes("aonic")) {
      return {
        title: "AONIC FUEL",
        business: "ClipHaus",
        category: "Product",
        budgetSpent: 1515.28,
        totalBudget: 25000,
        verified: true,
        creatorsCount: 996,
        lastUpdated: "3 days ago",
        successRate: "42%",
        avatar: "https://assets-2-prod.whop.com/public/uploads/user_15383090/image/bots/2026-03-25/c75744c0-3103-49f6-8c34-a2727a316f11.jpg",
        payoutPlatforms: [
          { platform: "Instagram", cpm: "UGX 38,000", min: "UGX 38,000", max: "UGX 5,500,000", logoColor: "from-fuchsia-500 via-purple-600 to-pink-500", active: true },
          { platform: "TikTok", cpm: "UGX 38,000", min: "UGX 38,000", max: "UGX 5,500,000", logoColor: "from-zinc-800 to-black", active: true },
          { platform: "YouTube", cpm: "UGX 38,000", min: "UGX 38,000", max: "UGX 5,500,000", logoColor: "from-rose-500 to-red-600", active: true }
        ],
        requirements: [
          "The Aonic Fuel shaker bottle must be clearly visible on camera for at least 5 seconds.",
          "Tag @aonicfuel and use hashtags #AonicFit in descriptions.",
          "High energy gym environments or lifestyle settings preferred.",
          "Do not mention competing, artificial brand names."
        ],
        resources: [
          { name: "Brand Brief", subtitle: "Official Document", url: "https://docs.google.com", type: "document" },
          { name: "Logo Pack", subtitle: "Brand Assets", url: "https://drive.google.com", type: "drive" }
        ]
      };
    }

    if (normalizedTitle.includes("mcgregor") || normalizedBiz.includes("energy") || normalizedTitle.includes("mac")) {
      return {
        title: "MAC ENERGY",
        business: "MAC ENERGY",
        category: "Entertainment",
        budgetSpent: 220,
        totalBudget: 5000,
        verified: false,
        creatorsCount: 24,
        lastUpdated: "1 day ago",
        successRate: "40%",
        avatar: "https://assets-2-prod.whop.com/public/uploads/user_27651756/image/bots/2026-05-24/9dab5209-272f-4d0a-ab22-3188b1c4c06e",
        payoutPlatforms: [
          { platform: "Instagram", cpm: "UGX 11,000", min: "UGX 11,000", max: "UGX 750,000", logoColor: "from-fuchsia-500 via-purple-600 to-pink-500", active: true },
          { platform: "TikTok", cpm: "UGX 11,000", min: "UGX 11,000", max: "UGX 750,000", logoColor: "from-zinc-800 to-black", active: true },
          { platform: "YouTube", cpm: "UGX 11,000", min: "UGX 11,000", max: "UGX 750,000", logoColor: "from-rose-500 to-red-600", active: true }
        ],
        requirements: [
          "Choose raw footage of UFC legend Conor McGregor and Rob O'Neill.",
          "Videos must include high retention captions and engaging sound overlays.",
          "Mentions must clear state MAC ENERGY landing in July.",
          "No static slideshows. Videos must be fully animated."
        ],
        resources: [
          { name: "Highlight Vault", subtitle: "20 min Uncut File", url: "https://youtube.com", type: "document" },
          { name: "Google Drive", subtitle: "Logos & Graphics", url: "https://drive.google.com", type: "drive" }
        ]
      };
    }

    // Default Fallback
    return {
      title: deal.title || "Exclusive Partnership Campaign",
      business: deal.business || "Vetted Sponsor",
      category: deal.category || "Technology",
      budgetSpent: 4200,
      totalBudget: 15000,
      verified: deal.verified || false,
      creatorsCount: 154,
      lastUpdated: "3 days ago",
      successRate: "65%",
      avatar: deal.image || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(deal.business || "Business")}`,
      payoutPlatforms: [
        { platform: "TikTok", cpm: "UGX 5,500", min: "UGX 5,500", max: "UGX 1,800,000", logoColor: "from-zinc-800 to-black", active: true },
        { platform: "Instagram", cpm: "UGX 5,500", min: "UGX 5,500", max: "UGX 1,800,000", logoColor: "from-fuchsia-500 via-purple-600 to-pink-500", active: true }
      ],
      requirements: [
        "Clearly display the sponsor landing link in bio or description.",
        "Highlight the ease of use and immediate client benefits on screen.",
        "Original captions required in first 2 seconds of short-form video.",
        "Approved videos enjoy lifetime commission tracking per client signup."
      ],
      resources: [
        { name: "Partner Brief", subtitle: "Rules & CTA Guide", url: "https://docs.google.com", type: "document" },
        { name: "Brand Media", subtitle: "Locker Assets", url: "https://drive.google.com", type: "drive" }
      ]
    };
  }, [deal]);

  const handleCopy = () => {
    const referralCode = localStorage.getItem("referralCode") || "REF-CODE";
    const refUrl = `${window.location.origin}/discover/${deal.id}?ref=${referralCode}`;
    navigator.clipboard.writeText(refUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClaim = () => {
    setIsClaiming(true);
    setTimeout(() => {
      const claims = JSON.parse(localStorage.getItem("claimed_deals") || "[]");
      const hustlerName = localStorage.getItem("hustlerName") || "Hustler";
      const userPicture = localStorage.getItem("userPicture") || "https://api.dicebear.com/7.x/adventurer/svg?seed=Hustler";
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
        referrerId: localStorage.getItem("userId") || "USR-UNKNOWN",
        referrerAvatar: userPicture,
        dealTitle: deal.title,
        businessName: deal.business,
        joinedDate: "May 2026",
        referrals: 0,
        reliabilityScore: 90,
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
        description: `${hustlerName} (${localStorage.getItem("userId") || "USR-UNKNOWN"}) started earning on your "${deal.title}" deal`,
        referrerId: localStorage.getItem("userId") || "USR-UNKNOWN",
        timestamp: new Date().toISOString(),
        unread: true
      };
      localStorage.setItem(notificationsKey, JSON.stringify([newNotification, ...notifications]));
      window.dispatchEvent(new Event("referr-notification-update"));

      localStorage.setItem("claimed_deals", JSON.stringify([...claims, newClaim]));
      setClaimed(true);
      setIsClaiming(false);
    }, 1200);
  };

  // Mock datasets for Leaderboard & Analytics tab
  const leaderboardCreators: any[] = [];

  // Load dynamic values from stored campaign or use premium fallbacks
  const totalBudget = deal.allocatedBudget !== undefined ? deal.allocatedBudget : premium.totalBudget;
  const budgetSpent = deal.spentBudget !== undefined ? deal.spentBudget : premium.budgetSpent;
  const creatorsCount = deal.joinedCount !== undefined ? deal.joinedCount : premium.creatorsCount;
  const avatar = deal.businessLogo || deal.image || premium.avatar;

  const isUGX = true;
  const currencySymbol = "UGX ";

  const budgetSpentFormatted = `${currencySymbol}${budgetSpent.toLocaleString()}`;
  const totalBudgetFormatted = `${currencySymbol}${totalBudget.toLocaleString()}`;
  const progressPercent = Math.min(100, Math.round((budgetSpent / totalBudget) * 100));

  const requirementsList = deal.requirements !== undefined 
    ? (Array.isArray(deal.requirements) ? deal.requirements : [deal.requirements]) 
    : premium.requirements;

  const resourcesList = deal.resources !== undefined 
    ? (Array.isArray(deal.resources) 
        ? deal.resources.map((r: any) => typeof r === 'string' ? { url: "#", type: "pdf", name: r, subtitle: "Creative resource file" } : r) 
        : [{ url: "#", type: "pdf", name: String(deal.resources), subtitle: "Creative resource file" }]
      ) 
    : premium.resources;


  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-slate-800 dark:text-slate-200">
      
      {/* Sticky Back Header */}
      <div className="sticky top-0 z-50 flex items-center h-14 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md border-b border-black/[0.06] dark:border-white/[0.06]">
        <div className="max-w-[1240px] mx-auto w-full px-4 sm:px-6 flex items-center">
          <button 
            onClick={() => navigate(-1)}
            className="campaign-back-btn flex items-center gap-2 h-9 pl-[10px] pr-4 rounded-full cursor-pointer bg-slate-100 hover:bg-slate-200 dark:bg-zinc-800 dark:text-white dark:hover:bg-zinc-700 transition-opacity duration-150 hover:opacity-90 active:scale-[0.97]"
          >
            <ChevronLeft size={16} />
            <span className="text-[14px] font-medium leading-[1.2]">Back to Discover</span>
          </button>
        </div>
      </div>

      {/* Main Campaign Container */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-24 font-sans">
        
        {/* Top Header Block / Split Section */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 pt-8 pb-4">
          <div className="lg:w-[540px] lg:shrink-0 space-y-6">
            
            {/* Avatar group & title description */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="relative size-10 shrink-0 rounded-full overflow-hidden shadow-[0_0_0_1px_rgba(0,0,0,0.12)] dark:shadow-[0_0_0_1px_rgba(255,255,255,0.4)] bg-white p-0.5">
                  <img src={avatar} alt={deal.business || premium.business} className="w-full h-full object-cover rounded-full" />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[14px] font-bold tracking-tight text-slate-600 dark:text-slate-300">
                    {deal.business || premium.business}
                  </span>
                  {premium.verified && (
                    <CheckCircle2 size={13} className="text-pink-500 fill-pink-500/10" strokeWidth={2.5} />
                  )}
                </div>
              </div>

              <h1 className="text-[32px] md:text-[40px] font-black leading-tight tracking-[-1px] text-slate-900 dark:text-white">
                {deal.title || premium.title}
              </h1>
            </div>

            {/* Actions Row */}
            <div className="flex items-center gap-3 pt-2">
              <button 
                onClick={claimed ? undefined : handleClaim}
                disabled={isClaiming}
                className={`relative flex items-center justify-center h-12 px-8 rounded-full cursor-pointer font-bold text-sm select-none transition-all duration-200 active:scale-[0.96] shadow-sm ${
                  claimed 
                    ? "bg-[#ec4899] text-white cursor-default" 
                    : "bg-slate-900 text-white hover:bg-black dark:bg-white dark:text-black dark:hover:bg-slate-100"
                }`}
              >
                {isClaiming ? (
                  <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                ) : claimed ? (
                  <span className="flex items-center gap-1.5">
                    <Check size={16} strokeWidth={3} /> Campaign Active
                  </span>
                ) : (
                  "Join Campaign"
                )}
              </button>

              <div className="relative">
                <button 
                  onClick={handleCopy}
                  aria-label="Copy Referral Link"
                  className="relative flex items-center justify-center size-12 rounded-full border border-slate-200 dark:border-zinc-800 cursor-pointer bg-white dark:bg-zinc-800 hover:bg-slate-50 dark:hover:bg-zinc-700 transition-[transform,background] duration-150 active:scale-[0.96]"
                >
                  <Share2 size={18} className="text-slate-600 dark:text-slate-300" />
                </button>
                
                {copied && (
                  <span className="absolute left-1/2 -bottom-9 px-2.5 py-1 rounded-full text-[11px] font-bold bg-[#ec4899] text-white whitespace-nowrap shadow-sm -translate-x-1/2 animate-bounce">
                    Copied!
                  </span>
                )}
              </div>
            </div>

          </div>

          {/* Desktop Right Side B Banner Showcase */}
          <div className="hidden lg:block lg:w-[600px] lg:shrink-0">
            <div className="aspect-[280/152] rounded-[24px] overflow-hidden shadow-sm border border-slate-200/50 dark:border-zinc-800 relative group bg-slate-900">
              <img 
                src={deal.image} 
                alt={premium.title} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
              <div className="absolute top-4 left-4 bg-white/90 dark:bg-zinc-900/90 backdrop-blur px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm">
                <Star size={12} className="fill-amber-400 text-amber-400" />
                <span className="text-[11px] font-black text-slate-800 dark:text-white">{deal.rating || "4.9"} rating</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile View Cover Image & Compact Budget Summary */}
        <div className="lg:hidden flex flex-col gap-4 my-6">
          <div className="aspect-[280/152] rounded-2xl overflow-hidden relative shadow-sm border border-slate-100 bg-slate-100">
            <img 
              src={deal.image} 
              alt={premium.title} 
              className="w-full h-full object-cover" 
            />
          </div>

          <div className="rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4">
            <div className="flex flex-col gap-1.5">
              <div className="text-[20px] font-bold text-slate-800 dark:text-white tracking-tight flex items-baseline">
                <span className="text-2xl font-black">{totalBudgetFormatted}</span>
                <span className="text-sm font-semibold text-slate-400 ml-2">Total Budget</span>
              </div>
              <div className="relative w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                <div className="absolute left-0 top-0 h-full bg-[#ec4899] rounded-full" style={{ width: `${progressPercent}%` }} />
              </div>
              <div className="flex justify-between text-xs font-semibold text-slate-400">
                <span>{budgetSpentFormatted} spent</span>
                <span>{progressPercent}% spent</span>
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Nav Tabs Navigation */}
        <div className="relative border-b border-slate-200/70 dark:border-zinc-800 my-8">
          <div className="flex items-end gap-5">
            {[
              { id: "overview", label: "Overview", icon: FileText },
              { id: "leaderboard", label: "Leaderboard", icon: Trophy },
              { id: "analytics", label: "Analytics", icon: BarChart2 }
            ].map((tab) => {
              const TabIcon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`relative pb-4 text-[14px] font-bold transition-all flex items-center gap-2 select-none px-1 ${
                    isActive 
                      ? "text-slate-900 dark:text-white font-extrabold" 
                      : "text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-300"
                  }`}
                >
                  <TabIcon size={14} className={isActive ? "text-[#ec4899]" : ""} />
                  {tab.label}
                  {isActive && (
                    <motion.div 
                       layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#ec4899] rounded-full"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabs Content Container */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* Main Content Area */}
          <div className="lg:w-[680px] lg:shrink-0 w-full min-w-0">
            <AnimatePresence mode="wait">
              {activeTab === "overview" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-8"
                >
                  {/* About / Description Description */}
                  <div className="space-y-3">
                    <p className="text-[14px] font-normal leading-[1.6] text-slate-600 dark:text-slate-300 pr-4 max-w-[620px]">
                      {deal.description || "The premier Referral Campaign ecosystem built on Referr."} Look at the verified brand criteria, download files from Google Drive locker, and submit proofs to obtain vouched verification!
                    </p>
                  </div>

                  {/* Requirements Sub-block */}
                  <div className="space-y-4">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[12px] font-mono">
                      Campaign Requirements
                    </h3>
                    
                    <div className="border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900 overflow-hidden shadow-sm">
                      <div className="p-5 space-y-4 bg-slate-50/50 dark:bg-zinc-900/40 border-b border-slate-100 dark:border-zinc-800">
                        <span className="text-[11px] font-black text-[#ec4899] font-mono tracking-widest uppercase bg-[#ec4899]/10 px-2 py-0.5 rounded">
                          Proof Rules
                        </span>
                      </div>
                      <div className="p-5 space-y-3">
                        {requirementsList.map((req, i) => (
                           <div key={i} className="flex items-start gap-4">
                            <div className="size-5 rounded-full bg-pink-500/10 text-pink-500 flex items-center justify-center shrink-0 mt-0.5">
                              <Check size={11} strokeWidth={3} />
                            </div>
                            <span className="text-[13px] font-medium leading-relaxed text-slate-600 dark:text-slate-300">
                              {req}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>                  {/* Similar Campaigns Section */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[12px] font-mono">
                      Similar Campaigns
                    </h3>
                    
                    {similarDeals.length === 0 ? (
                      <div className="border border-slate-200/50 dark:border-zinc-800 rounded-[20px] p-6 text-center bg-white dark:bg-zinc-900">
                        <p className="text-xs text-slate-400">No other active campaigns found.</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {similarDeals.map((sd, i) => (
                          <Link 
                            key={sd.id} 
                            to={`/deal/${sd.id}`}
                            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                            className="flex flex-col min-w-0 rounded-[20px] overflow-hidden border border-slate-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm hover:shadow-md transition-all group hover:border-[#ec4899]"
                          >
                            {/* Banner Image */}
                            <div className="aspect-[16/10] relative overflow-hidden bg-slate-100 dark:bg-zinc-800">
                              <img 
                                src={sd.image || "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=650&q=80"} 
                                alt={sd.title} 
                                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                              />
                              <div className="absolute top-2 left-2 bg-black/70 backdrop-blur px-2.5 py-0.5 rounded text-[9px] font-extrabold text-white uppercase tracking-wider">
                                {sd.category || "Promo"}
                              </div>
                            </div>
                            
                            {/* Card Content info */}
                            <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                              <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase truncate">
                                  {sd.business}
                                </p>
                                <h4 className="text-[13px] font-black text-slate-800 dark:text-white group-hover:text-[#ec4899] transition-colors mt-0.5 line-clamp-1">
                                  {sd.title}
                                </h4>
                              </div>
                              
                              <div className="pt-2 border-t border-slate-50 dark:border-zinc-800/60 flex items-center justify-between">
                                <span className="text-[10px] uppercase font-bold text-slate-400 font-mono">payout</span>
                                <span className="text-xs font-mono font-black text-[#ec4899]">{sd.price || sd.reward}</span>
                              </div>
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Resources / Assets locker */}
                  <div className="space-y-4 pt-2">
                    <h3 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[12px] font-mono">
                      Campaign Resources
                    </h3>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
                      {resourcesList.map((res, i) => (
                        <a
                          key={i}
                          href={res.url || "#"}
                          target="_blank"
                          rel="noreferrer"
                          className="group border border-slate-200/50 dark:border-zinc-800 rounded-2xl bg-white dark:bg-zinc-900 p-4 shadow-sm hover:shadow-md hover:border-[#ec4899] transition-all flex items-center justify-between gap-4"
                        >
                          <div className="flex items-center gap-3.5 min-w-0">
                            <div className="size-9 rounded-xl bg-slate-50 dark:bg-zinc-800 text-slate-500 dark:text-slate-300 flex items-center justify-center shrink-0 group-hover:bg-[#ec4899]/10 group-hover:text-[#ec4899] transition-colors">
                              {res.type === "drive" ? (
                                <svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
                                  <path d="M19.35 10.04L21.9 14.5h-5.11l-2.55-4.46h5.11zm-13.7 4.46L8.2 10.04h5.11l-2.55 4.46H5.65zm1.53-5.54L10 .04l3.18 5.54h-6.36z" />
                                </svg>
                              ) : (
                                <FileText size={15} />
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-[13px] font-bold text-slate-800 dark:text-white truncate">
                                {res.name}
                              </p>
                              <p className="text-[10px] text-slate-400 capitalize">
                                {res.subtitle}
                              </p>
                            </div>
                          </div>
                          <ChevronLeft size={14} className="rotate-180 text-slate-300 group-hover:text-[#ec4899] group-hover:translate-x-[2px] transition-all shrink-0" />
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Proof of Performance Submission Locker - Only if Joined */}
                  {claimed && (
                    <div className="space-y-6 pt-6 border-t border-slate-200/60 dark:border-zinc-800/80">
                      <div>
                        <h3 className="text-base font-bold text-slate-800 dark:text-white uppercase tracking-wider text-[12px] font-mono flex items-center gap-2">
                          <Shield size={14} className="text-[#ec4899]" /> Submit Proof of Performance
                        </h3>
                        <p className="text-[12px] text-slate-500 mt-1">Submit your published TikTok, Reels, or Shorts link to instantly clear views payouts to your dynamic profile balances.</p>
                      </div>                      {submissionComplete ? (
                        <motion.div 
                          initial={{ opacity: 0, scale: 0.98 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="bg-pink-500/5 border border-pink-500/20 rounded-2xl p-6 text-center space-y-4 max-w-lg"
                        >
                          <div className="size-12 rounded-full bg-pink-500/10 text-[#ec4899] flex items-center justify-center mx-auto">
                            <Sparkles size={24} className="animate-pulse" />
                          </div>
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Performance Verified & Cleared!</h4>
                            <p className="text-xs text-slate-500">
                              Your clip views was verified via Referr-Shield. We successfully added <strong className="text-slate-700 dark:text-white">UGX {rewardCalculated.toLocaleString()}</strong> to your live personal balance.
                            </p>
                          </div>
                          <button 
                            type="button"
                            onClick={() => setSubmissionComplete(false)}
                            className="px-4 py-2 bg-slate-900 dark:bg-zinc-800 hover:bg-slate-800 text-white rounded-lg text-xs font-bold font-mono transition-all uppercase tracking-wider"
                          >
                            Submit Another Clip
                          </button>
                        </motion.div>
                      ) : submittingProof ? (
                        <div className="border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900 p-8 max-w-lg shadow-sm flex flex-col items-center justify-center text-center space-y-4">
                          <div className="relative">
                            <div className="size-12 rounded-full border-4 border-[#ec4899] border-t-transparent animate-spin" />
                            <div className="absolute inset-0 flex items-center justify-center text-[#ec4899]">
                              <Shield size={14} />
                            </div>
                          </div>
                          <div className="space-y-1.5">
                            <h4 className="text-sm font-bold text-slate-800 dark:text-slate-100">Vouch-Shield Crawler Processing...</h4>
                            <div className="space-y-1 text-left max-w-xs mx-auto">
                              <p className={`text-xs ${submitProgressStep >= 0 ? "text-pink-500 font-bold" : "text-slate-400"}`}>
                                {submitProgressStep >= 0 ? "✓ 1. Validating link layout URL..." : "— 1. Validating link layout URL..."}
                              </p>
                              <p className={`text-xs ${submitProgressStep >= 1 ? "text-pink-500 font-bold" : "text-slate-400"}`}>
                                {submitProgressStep >= 1 ? "✓ 2. Loading video metrics from platform API..." : "— 2. Loading video metrics from platform API..."}
                              </p>
                              <p className={`text-xs ${submitProgressStep >= 2 ? "text-pink-500 font-bold" : "text-slate-400"}`}>
                                {submitProgressStep >= 2 ? "✓ 3. Calculating CPM payouts..." : "— 3. Calculating CPM payouts..."}
                              </p>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <form onSubmit={handleProofSubmit} className="border border-slate-200/60 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900 p-6 max-w-lg shadow-sm space-y-4">
                          <div className="space-y-2">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Platform</label>
                            <div className="grid grid-cols-3 gap-2">
                              {(["tiktok", "reels", "shorts"] as const).map((p) => (
                                <button
                                  key={p}
                                  type="button"
                                  onClick={() => setClipPlatform(p)}
                                  className={`py-2 text-xs font-bold rounded-lg border uppercase tracking-wider transition-all ${
                                    clipPlatform === p
                                      ? "bg-[#ec4899]/10 text-[#ec4899] border-[#ec4899]"
                                      : "bg-slate-50 dark:bg-zinc-800 text-slate-500 border-slate-100 dark:border-zinc-700 hover:bg-slate-100 dark:hover:bg-zinc-700"
                                  }`}
                                >
                                  {p === "tiktok" ? "TikTok" : p === "reels" ? "Reels" : "Shorts"}
                                </button>
                              ))}
                            </div>
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Video Link URL</label>
                            <input
                              type="url"
                              required
                              placeholder="e.g. https://www.tiktok.com/@my_profile/video/..."
                              value={clipUrl}
                              onChange={(e) => setClipUrl(e.target.value)}
                              className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#ec4899]"
                            />
                          </div>

                          <div className="space-y-1">
                            <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest font-mono">Simulated Video Views</label>
                            <div className="relative">
                              <input
                                type="number"
                                required
                                min="100"
                                placeholder="e.g. 15000"
                                value={clipViews}
                                onChange={(e) => setClipViews(e.target.value)}
                                className="w-full bg-slate-50 dark:bg-zinc-800/50 border border-slate-200 dark:border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 dark:text-slate-200 focus:outline-none focus:border-[#ec4899]"
                              />
                              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono uppercase font-bold text-slate-400">Views</span>
                            </div>
                            <p className="text-[10px] text-slate-400">Enter views count to test our payout calculator dynamically.</p>
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 bg-[#ec4899] hover:bg-[#db2777] text-white rounded-xl font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 cursor-pointer"
                          >
                            <Shield size={14} /> Submit Clip & Clear Earnings
                          </button>
                        </form>
                      )}

                      {/* Submitted Clips History Log */}
                      <div className="space-y-3 max-w-lg pt-2">
                        <h4 className="text-xs font-bold text-slate-700 dark:text-slate-200 uppercase tracking-wider font-mono">Your Video Submissions ({submissions.length})</h4>
                        {submissions.length === 0 ? (
                          <div className="text-center py-6 border border-dashed border-slate-200 dark:border-zinc-800/80 rounded-2xl bg-white dark:bg-zinc-900/40">
                            <p className="text-xs text-slate-400">No clips verified yet. Drop your first live clip link above!</p>
                          </div>
                        ) : (
                          <div className="border border-slate-200/50 dark:border-zinc-800 bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm">
                            <div className="overflow-x-auto">
                              <table className="w-full text-left text-[11px] font-medium text-slate-500">
                                <thead className="bg-slate-50/50 dark:bg-zinc-900/60 border-b border-slate-100 dark:border-zinc-800 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                  <tr>
                                    <th className="px-4 py-3">Platform</th>
                                    <th className="px-4 py-3">Views</th>
                                    <th className="px-4 py-3">Reward</th>
                                    <th className="px-4 py-3 text-right">Status</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100 dark:divide-zinc-800">
                                  {submissions.map((sub, idx) => (
                                    <tr key={idx} className="hover:bg-slate-50/40">
                                      <td className="px-4 py-2.5">
                                        <div className="flex items-center gap-1.5 capitalize font-bold text-slate-700 dark:text-slate-300">
                                          <Video size={10} className="text-[#ec4899]" /> {sub.platform}
                                        </div>
                                      </td>
                                      <td className="px-4 py-2.5 font-mono">{Number(sub.views).toLocaleString()}</td>
                                      <td className="px-4 py-2.5 font-mono font-bold text-[#ec4899]">{sub.reward}</td>
                                      <td className="px-4 py-2.5 text-right">
                                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold uppercase tracking-tight bg-pink-500/10 text-[#ec4899]">
                                          Cleared
                                        </span>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </motion.div>
              )}

              {activeTab === "leaderboard" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between pb-2">
                    <div>
                      <h3 className="text-[16px] font-bold text-slate-800 dark:text-white">Active Contest Leaderboard</h3>
                      <p className="text-xs text-slate-400">Updates live based on vouched submission views</p>
                    </div>
                  </div>

                  {/* Top 3 Graphic Cards layout */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                    {leaderboardCreators.slice(0, 3).map((u) => {
                      const colors = u.rank === 1 ? "border-amber-200 bg-amber-500/5" : u.rank === 2 ? "border-slate-300 bg-slate-500/5" : "border-amber-600/20 bg-amber-600/5";
                      const badgeColor = u.rank === 1 ? "bg-amber-400" : u.rank === 2 ? "bg-slate-300 text-slate-800" : "bg-amber-600";
                      return (
                        <div key={u.rank} className={`border ${colors} rounded-2xl p-5 flex flex-col items-center text-center relative overflow-hidden group hover:shadow-sm transition-all`}>
                          <span className={`absolute top-3 left-3 size-5 rounded-full ${badgeColor} text-white font-mono text-[10px] font-bold flex items-center justify-center`}>
                            {u.rank}
                          </span>
                          
                          <div className="size-14 rounded-full border bg-white dark:bg-zinc-800 overflow-hidden mb-3 relative group-hover:scale-105 transition-transform">
                            <img src={u.pfp} alt={u.name} className="w-full h-full object-cover" />
                          </div>
                          
                          <div className="min-w-0">
                            <h4 className="text-[14px] font-black text-slate-800 dark:text-white truncate">{u.name}</h4>
                            <p className="text-[10px] text-slate-400 mt-0.5 truncate">{u.role}</p>
                          </div>
                                        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-zinc-800/80 w-full">
                            <p className="text-[10px] uppercase font-bold text-slate-400">Total Bounty</p>
                            <p className="text-[15px] font-black text-[#ec4899] mt-0.5">{u.earnings}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Standard ranks table */}
                  <div className="border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/80 shadow-sm">
                    <div className="divide-y divide-slate-100 dark:divide-zinc-800">
                      {leaderboardCreators.map((u) => (
                        <div key={u.rank} className="p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-zinc-900/50 transition-colors">
                          <div className="flex items-center gap-4 min-w-0">
                            <span className="font-mono text-xs font-bold text-slate-400 pr-1 w-5 text-right">{u.rank}</span>
                            <div className="size-8 rounded-full overflow-hidden bg-slate-100 dark:bg-zinc-800 select-none shrink-0 border border-slate-200/50">
                              <img src={u.pfp} alt={u.name} className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-sm font-bold text-slate-800 dark:text-white truncate flex items-center gap-1.5">
                                {u.name}
                                <span className="inline-block size-1.5 rounded-full bg-[#ec4899]" title="Live referring" />
                              </p>
                              <p className="text-[11px] text-slate-400 truncate">{u.role} • Rating {u.rating}</p>
                            </div>
                          </div>
                          
                          <p className="font-mono text-sm font-black text-[#ec4899]">{u.earnings}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                </motion.div>
              )}

              {activeTab === "analytics" && (
                <motion.div 
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="space-y-6"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-[16px] font-bold text-slate-800 dark:text-white">Escrow & Submission Analytics</h3>
                      <p className="text-xs text-slate-400">Track view limits, secured funds, and payment clearances</p>
                    </div>
                  </div>

                  {/* Summary Metric Cards */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { label: "My Total Views", value: "0 views", desc: "Across TikTok/Reels", icon: Users },
                      { label: "Secured Escrow", value: "UGX 0", desc: "Guaranteed by Shield", icon: Wallet },
                      { label: "Sponsor Limit", value: totalBudgetFormatted, desc: "Remaining pool", icon: Shield },
                      { label: "Approval Rate", value: "100%", desc: "Direct trust verified", icon: Award }
                    ].map((item, i) => {
                      const Icon = item.icon;
                      return (
                        <div key={i} className="border border-slate-200/50 dark:border-zinc-800 rounded-xl p-4 bg-white dark:bg-zinc-900 shadow-sm flex flex-col justify-between h-28">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] text-slate-400 uppercase tracking-widest font-mono font-bold leading-none">{item.label}</span>
                            <Icon size={14} className="text-slate-400" />
                          </div>
                          <div>
                            <p className="text-base font-black text-slate-800 dark:text-white mt-1">{item.value}</p>
                            <p className="text-[9px] text-slate-400/80 leading-none mt-0.5">{item.desc}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Escrow Log / Safe transaction table */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1 font-mono">Escrow Log History</h4>
                    
                    <div className="border border-slate-100 dark:border-zinc-800 rounded-2xl overflow-hidden bg-white dark:bg-zinc-900/80">
                      <div className="p-4 bg-slate-50 dark:bg-zinc-900 border-b border-slate-100 dark:border-zinc-800 flex justify-between text-xs text-slate-400 font-bold font-mono">
                        <span>Transaction Action</span>
                        <span>Clearance Status</span>
                      </div>
                      
                      <div className="divide-y divide-slate-100 dark:divide-zinc-800 bg-white dark:bg-zinc-900">
                        <div className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/50 dark:hover:bg-zinc-800/40">
                          <div className="space-y-1">
                            <p className="font-bold text-slate-800 dark:text-white">Creator escrow pool allocated</p>
                            <p className="text-[10px] text-slate-400">2 weeks ago</p>
                          </div>
                          <span className="bg-pink-100 dark:bg-pink-950/40 text-pink-600 dark:text-pink-400 font-extrabold px-2.5 py-1 rounded-full font-mono text-[10px]">
                            ESCROW REPLENISHED
                          </span>
                        </div>
                        <div className="p-4 flex items-center justify-between text-xs hover:bg-slate-50/50 dark:hover:bg-zinc-800/40">
                          <div className="space-y-1">
                            <p className="font-bold text-slate-800 dark:text-white">Campaign opened to clippers</p>
                            <p className="text-[10px] text-slate-400">2 weeks ago</p>
                          </div>
                          <span className="bg-blue-100 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 font-extrabold px-2.5 py-1 rounded-full font-mono text-[10px]">
                            PLATFORM ACTIVE
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Desktop Right Side Sticky Panel */}
          <div className="hidden lg:block flex-1 min-w-0 w-full space-y-6 sticky top-[80px]">
            
            {/* Top Budget / Tracker Card */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-5 space-y-4 shadow-sm">
              <div className="flex flex-col gap-1.5">
                <div className="text-[20px] font-bold text-slate-800 dark:text-white tracking-tight flex items-baseline leading-none mb-1">
                  <span className="text-3xl font-black">{totalBudgetFormatted}</span>
                  <span className="text-sm font-semibold text-slate-400 ml-2">Total Budget</span>
                </div>
                
                <div className="relative w-full h-1.5 bg-slate-100 dark:bg-zinc-800 rounded-full overflow-hidden">
                  <div className="absolute left-0 top-0 h-full bg-[#ec4899] rounded-full transition-all" style={{ width: `${progressPercent}%` }} />
                </div>
                
                <div className="flex justify-between items-center text-xs font-bold text-slate-400 pt-1 font-mono">
                  <span>{budgetSpentFormatted} spent</span>
                  <span>{progressPercent}% spent</span>
                </div>
              </div>

              {/* Status Tags list row */}
              <div className="border-t border-slate-100 dark:border-zinc-800/80 pt-4 flex flex-wrap gap-1.5">
                <span className="inline-flex items-center gap-1 text-[11px] font-black font-mono tracking-widest text-pink-500 dark:text-pink-400 uppercase bg-pink-100/40 dark:bg-pink-950/20 px-2.5 py-1 rounded-full border border-pink-200/30">
                  ⚡ active
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-black font-mono tracking-widest text-[#ec4899] uppercase bg-[#ec4899]/10 px-2.5 py-1 rounded-full">
                  {deal.price || "UGX 3,600 / 1K views"}
                </span>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-400 border border-slate-200 dark:border-zinc-800 px-2.5 py-1 rounded-full">
                  {creatorsCount} Joined
                </span>
              </div>
            </div>

            {/* Campaign Summary / Verified list card */}
            <div className="rounded-2xl border border-slate-200/60 dark:border-zinc-800 bg-white dark:bg-zinc-900 overflow-hidden shadow-sm divide-y divide-slate-100 dark:divide-zinc-800">
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Category</span>
                <span className="font-bold text-slate-800 dark:text-white font-mono">{premium.category}</span>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Platforms Supported</span>
                <div className="flex items-center gap-2.5 text-slate-500 dark:text-slate-400 pr-1">
                  <Video size={14} className="hover:text-red-500 transition-colors cursor-pointer" />
                  <Users size={14} className="hover:text-blue-500 transition-colors cursor-pointer" />
                  <Sparkles size={14} className="hover:text-pink-500 transition-colors cursor-pointer" />
                </div>
              </div>
              <div className="p-4 flex items-center justify-between text-xs">
                <span className="text-slate-400 font-medium">Last Updated</span>
                <span className="font-bold text-slate-800 dark:text-white">{premium.lastUpdated}</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
