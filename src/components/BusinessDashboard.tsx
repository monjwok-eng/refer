import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Users,
  Briefcase,
  TrendingUp,
  Star,
  Search,
  Plus,
  Globe,
  CheckCircle2,
  Clock,
  Lock,
  Check,
  ArrowRight,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import SetupWidget from "./SetupWidget";
import { Skeleton } from "./ui/Skeleton";
import { Html5Qrcode } from "html5-qrcode";
import { QrCode, Shield, ShieldCheck, ShieldAlert, Grid3X3, Camera, RefreshCw } from "lucide-react";

// Scanner Component
const ScannerView = ({ onScan }: { onScan: (text: string) => void }) => {
  const [hasPermission, setHasPermission] = React.useState<boolean | null>(null);
  const [cameras, setCameras] = React.useState<any[]>([]);
  const [activeCameraId, setActiveCameraId] = React.useState<string | null>(null);
  const [scannerError, setScannerError] = React.useState<string | null>(null);
  const scannerRef = React.useRef<Html5Qrcode | null>(null);

  React.useEffect(() => {
    return () => {
      if (scannerRef.current) {
        scannerRef.current.stop().catch(console.error);
      }
    };
  }, []);

  const requestPermission = async () => {
    setScannerError(null);
    try {
      console.log("Requesting camera permission...");
      
      // Check for camera permission first
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        // Stop the tracks immediately after getting permission
        stream.getTracks().forEach(track => track.stop());
      } catch (err) {
        console.error("Permission denied or user cancelled:", err);
        setHasPermission(false);
        setScannerError("Camera permission denied. Please allow camera access in your browser settings.");
        return;
      }
      
      console.log("Permission granted, enumerating devices...");
      const devices = await Html5Qrcode.getCameras();
      console.log("Cameras found:", devices);
      
      if (devices && devices.length > 0) {
        setHasPermission(true);
        setCameras(devices);
        
        let defaultCamera = devices[0].id;
        const backCamera = devices.find(c => c.label.toLowerCase().includes('back') || c.label.toLowerCase().includes('environment'));
        if (backCamera) {
          defaultCamera = backCamera.id;
        }
        
        setActiveCameraId(defaultCamera);
        startScanner(defaultCamera);
      } else {
        console.warn("No cameras found after permission grant.");
        setHasPermission(false);
        setScannerError("No cameras found on this device.");
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      setHasPermission(false);
      setScannerError("Camera access failed. Please try again or check your device settings.");
    }
  };

  const startScanner = (cameraId: string) => {
    setScannerError(null);
    if (scannerRef.current) {
      scannerRef.current.stop().then(() => {
        initScanner(cameraId);
      }).catch(console.error);
    } else {
      initScanner(cameraId);
    }
  };

  const initScanner = (cameraId: string) => {
    const html5QrCode = new Html5Qrcode("reader");
    scannerRef.current = html5QrCode;
    
    html5QrCode.start(
      cameraId,
      {
        fps: 10,
        qrbox: { width: 250, height: 250 }
      },
      (decodedText) => {
        onScan(decodedText);
      },
      (errorMessage) => {
        // Log errors but only show to user if it's a critical failure (e.g., camera not found)
        console.warn("Scanner error:", errorMessage);
        if (errorMessage.includes("Starting camera failed") || errorMessage.includes("NotAllowedError") || errorMessage.includes("NotFoundError")) {
             setScannerError(`Scanner error: ${errorMessage}`);
        }
      }
    ).catch((err) => {
        console.error(err);
        setScannerError(`Failed to start camera: ${err.message || err}`);
    });
  };

  const toggleCamera = () => {
    if (cameras.length > 1 && activeCameraId) {
      const currentIndex = cameras.findIndex(c => c.id === activeCameraId);
      const nextIndex = (currentIndex + 1) % cameras.length;
      const nextCameraId = cameras[nextIndex].id;
      setActiveCameraId(nextCameraId);
      startScanner(nextCameraId);
    }
  };

  if (hasPermission === null) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center w-full h-[300px] bg-slate-50">
        <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4">
          <Camera size={24} className="text-slate-500" />
        </div>
        <h3 className="text-lg font-bold text-[#222325] mb-2">Camera Access Required</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium max-w-xs">
          Please allow camera access to scan customer QR codes for deal validation.
        </p>
        <button 
          onClick={requestPermission}
          className="bg-[#1dbf73] text-white px-6 py-2.5 rounded font-bold hover:bg-[#19a463] transition-colors"
        >
          Grant Permission
        </button>
      </div>
    );
  }

  if (hasPermission === false) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center w-full h-[300px] bg-slate-50">
        <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
          <Camera size={24} className="text-red-500" />
        </div>
        <h3 className="text-lg font-bold text-[#222325] mb-2">Access Denied</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium max-w-xs">
          Camera access is required. Please enable it in your browser settings and try again.
        </p>
        <button 
          onClick={requestPermission}
          className="bg-slate-100 text-[#222325] border border-slate-200 px-6 py-2.5 rounded font-bold hover:bg-slate-200 transition-colors"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full min-h-[300px] flex flex-col bg-black overflow-hidden z-0">
      <div id="reader" className="w-full h-full"></div>
      
      {scannerError && (
        <div className="absolute inset-0 z-[100] bg-black/80 flex flex-col items-center justify-center p-6 text-center">
            <p className="text-red-400 font-bold mb-4">{scannerError}</p>
            <button 
                onClick={() => startScanner(activeCameraId || cameras[0].id)}
                className="bg-white text-[#222325] px-4 py-2 rounded font-bold"
            >
                Retry
            </button>
        </div>
      )}
      
      {/* Scanning Overlay */}
      <div className="absolute inset-0 z-[50] pointer-events-none flex items-center justify-center">
        <div className="w-[200px] h-[200px] border-2 border-white/50 rounded-lg relative">
          <div className="absolute inset-0 bg-white/5" />
          {/* Scanning Line Animation */}
          <div className="absolute top-0 left-0 w-full h-[6px] bg-[#1dbf73] shadow-[0_0_10px_#1dbf73] animate-scan" />
        </div>
      </div>
      
      {cameras.length > 1 && (
        <button 
          onClick={toggleCamera}
          className="absolute bottom-4 right-4 bg-white/20 hover:bg-white/30 border border-white/40 backdrop-blur-md text-white px-4 py-2.5 rounded-full transition-all flex items-center gap-2 z-[100]"
        >
          <RefreshCw size={16} />
          <span className="text-[13px] font-bold">Flip</span>
        </button>
      )}
    </div>
  );
};

const sessionData = [
  { day: "Mon", sessions: 0 },
  { day: "Tue", sessions: 0 },
  { day: "Wed", sessions: 0 },
  { day: "Thu", sessions: 0 },
  { day: "Fri", sessions: 0 },
  { day: "Sat", sessions: 0 },
  { day: "Sun", sessions: 0 },
];

export default function BusinessDashboard() {
  const navigate = useNavigate();
  const businessName = localStorage.getItem("businessName") || "Business";
  const firstName = businessName.split(" ")[0];

  const [hasSite, setHasSite] = useState(
    () => localStorage.getItem(`site_created_${businessName}`) === "true",
  );
  const [hasDeal, setHasDeal] = useState(
    () => localStorage.getItem(`deal_posted_${businessName}`) === "true",
  );
  const [hasBlog, setHasBlog] = useState(
    () => localStorage.getItem(`blog_posted_${businessName}`) === "true",
  );
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [hasStartedTrial, setHasStartedTrial] = useState(
    () => localStorage.getItem("trial_started") === "true",
  );
  const [isDataLoading, setIsDataLoading] = useState(true);
  const [isCreatingSite, setIsCreatingSite] = useState(false);
  const [showScanner, setShowScanner] = useState(false);
  const [scannerResult, setScannerResult] = useState<any>(null);
  const [showPinPrompt, setShowPinPrompt] = useState(false);
  const [pin, setPin] = useState("");
  const [verificationStatus, setVerificationStatus] = useState<"idle" | "verifying" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleScanSuccess = (decodedText: string) => {
    try {
      const data = JSON.parse(decodedText);
      if (data.claimId && data.dealId) {
        setScannerResult(data);
        setShowScanner(false);
        setShowPinPrompt(true);
      } else {
        throw new Error("Invalid QR code format");
      }
    } catch (e) {
      alert("Invalid QR Code");
    }
  };

  const verifyPin = () => {
    setVerificationStatus("verifying");
    const storedPin = localStorage.getItem("business_pin");
    
    setTimeout(() => {
      if (pin === storedPin || (!storedPin && pin === "1234")) {
        setVerificationStatus("success");
        // Mark deal as verified in local storage for this business
        const bName = localStorage.getItem("businessName") || "Business";
        const vKey = `verified_deals_${bName}`;
        const verifiedDeals = JSON.parse(localStorage.getItem(vKey) || "[]");
        localStorage.setItem(vKey, JSON.stringify([...verifiedDeals, scannerResult.claimId]));
        
        setTimeout(() => {
          setShowPinPrompt(false);
          setScannerResult(null);
          setPin("");
          setVerificationStatus("idle");
        }, 2000);
      } else {
        setVerificationStatus("error");
        setErrorMessage("Incorrect Security PIN");
        setTimeout(() => setVerificationStatus("idle"), 2000);
      }
    }, 1500);
  };

  React.useEffect(() => {
    const timer = setTimeout(() => setIsDataLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  React.useEffect(() => {
    setHasSite(localStorage.getItem(`site_created_${businessName}`) === "true");
    setHasDeal(localStorage.getItem(`deal_posted_${businessName}`) === "true");
    setHasBlog(localStorage.getItem(`blog_posted_${businessName}`) === "true");
  }, [businessName]);

  const isChecklistComplete = hasSite && hasDeal && hasBlog;

  const handleCreateSite = () => {
    if (hasSite) {
      navigate("/editor"); // Or wherever site management lives
    } else {
      setIsCreatingSite(true);
      setTimeout(() => navigate("/create-site"), 2000);
    }
  };

  const [referralCount, setReferralCount] = useState("0");
  const [notifications, setNotifications] = useState<any[]>([]);

  React.useEffect(() => {
    const updateDashboard = () => {
      const bName = localStorage.getItem("businessName") || "Business";
      const refsKey = `referrals_${bName}`;
      const notesKey = `notifications_${bName}`;

      const refs = JSON.parse(localStorage.getItem(refsKey) || "[]");
      setReferralCount(refs.length.toString());
      
      const notices = JSON.parse(localStorage.getItem(notesKey) || "[]");
      setNotifications(notices);
    };

    updateDashboard();
    const interval = setInterval(updateDashboard, 3000);
    
    window.addEventListener('storage', updateDashboard);
    window.addEventListener('referr-notification-update', updateDashboard);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('storage', updateDashboard);
      window.removeEventListener('referr-notification-update', updateDashboard);
    };
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markNotificationsRead = () => {
    const bName = localStorage.getItem("businessName") || "Business";
    const notesKey = `notifications_${bName}`;
    const updated = notifications.map(n => ({ ...n, unread: false }));
    setNotifications(updated);
    localStorage.setItem(notesKey, JSON.stringify(updated));
    window.dispatchEvent(new Event("referr-notification-update"));
  };

  const stats = [
    { label: "Active Sites", value: hasSite ? "1 / 1" : "0 / 1", icon: Globe },
    { label: "Total Referrals", value: referralCount, icon: Users },
    { label: "Partner Payouts", value: "$0", icon: TrendingUp },
    { label: "Trust Score", value: referralCount !== "0" ? "92%" : "0%", icon: Star },
  ];

  const siteUrl = `referr.me/${firstName.toLowerCase()}`;

  React.useEffect(() => {
    if (!hasStartedTrial) {
      navigate("/business-paywall");
    }
  }, [hasStartedTrial, navigate]);

  if (!hasStartedTrial) {
    return null;
  }

  return (
    <>
      {/* Trial Banner */}
      <div className="sticky top-[80px] z-40 bg-[#1dbf73] border-b text-white mb-6 md:mb-8 -mt-6 md:-mt-8 lg:-mt-12 -mx-4 md:-mx-8 lg:-mx-12 px-4 md:px-8 lg:px-12 py-2.5 md:py-3 flex flex-col md:flex-row items-center justify-between gap-3 md:gap-0 shadow-sm relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="flex items-center gap-2 md:gap-3 relative z-10 w-full md:w-auto justify-center md:justify-start">
          <div className="p-1 md:p-1.5 bg-white/20 rounded shrink-0 hidden sm:block">
            <Clock size={14} className="text-white md:w-4 md:h-4" />
          </div>
          <span className="text-[12px] md:text-[14px] font-medium tracking-wide text-center md:text-left leading-tight">
            You are on <strong className="font-bold">Day 1</strong> of your
            7-day free trial.
          </span>
        </div>
        <button
          onClick={() => setShowUpgradeModal(true)}
          className="text-[12px] md:text-[13px] font-bold bg-white text-[#1dbf73] px-6 md:px-5 py-2.5 md:py-2.5 rounded hover:bg-slate-50 transition-colors shadow-sm relative z-10 active:scale-[0.98] w-full md:w-auto"
        >
          Upgrade to Pro
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 md:mb-8 gap-6 md:gap-6 bg-white p-5 md:p-8 rounded-lg shadow-[0_1px_3px_rgb(0,0,0,0.1)] border border-slate-100">
        <div className="flex-1 min-w-0">
          {isDataLoading ? (
            <>
              <Skeleton className="h-9 w-48 mb-2" />
              <Skeleton className="h-5 w-72 mb-4" />
              <Skeleton className="h-4 w-32" />
            </>
          ) : (
            <>
              <div className="flex items-center gap-2 mb-1 justify-between md:justify-start">
                <h1 className="text-[22px] md:text-[28px] font-bold text-[#222325] truncate">
                  Hi, {firstName}
                </h1>
                {hasSite && (
                  <div className="flex items-center gap-1.5 px-2 py-0.5 bg-green-50 rounded-full border border-green-100 shrink-0">
                    <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1dbf73] opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-[#1dbf73]"></span>
                    </span>
                    <span className="text-[9px] md:text-[10px] font-bold text-[#1dbf73] uppercase tracking-wider whitespace-nowrap">
                      Live
                    </span>
                  </div>
                )}
              </div>
              <p className="text-[#62646a] text-[13px] md:text-[15px] mb-3 md:mb-4">
                {hasSite
                  ? "Your site is live! Here's how your referrals are performing."
                  : "Welcome back! Let's get your business site up and running."}
              </p>

              {hasSite && (
                <div className="flex items-center gap-1 md:gap-2 text-[12px] md:text-[13px] group max-w-fit overflow-hidden">
                  <span className="text-[#a4a4a4] shrink-0">Site URL:</span>
                  <a
                    href={`https://${siteUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#1dbf73] font-medium hover:underline flex items-center gap-1 truncate"
                  >
                    {siteUrl}
                    <Globe size={12} className="shrink-0" />
                  </a>
                </div>
              )}
            </>
          )}
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:gap-3 shrink-0 w-full md:w-auto mt-0 md:mt-0">
          {isDataLoading ? (
            <Skeleton className="h-[52px] w-full md:w-[160px] rounded" />
          ) : (
            <>
              <button
                onClick={() => setShowScanner(true)}
                className="w-full md:w-auto h-[52px] md:h-auto justify-center bg-white border-2 border-[#222325] text-[#222325] px-6 py-2.5 rounded font-black hover:bg-slate-50 transition-all flex items-center gap-2 active:scale-95 shadow-[4px_4px_0_0_#222325] text-[15px] md:text-[14px]"
              >
                <QrCode size={20} className="shrink-0" />
                <span>Validate Deal</span>
              </button>

              <button
                onClick={handleCreateSite}
                disabled={isCreatingSite}
                className="w-full md:w-auto h-[52px] md:h-auto justify-center bg-[#1dbf73] text-white px-6 py-2.5 rounded font-black hover:bg-[#19a463] transition-all flex items-center gap-2 active:scale-95 shadow-md disabled:opacity-80 disabled:cursor-not-allowed text-[15px] md:text-[14px]"
              >
                {isCreatingSite ? (
                  <div className="w-[18px] h-[18px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : hasSite ? (
                  <Globe size={20} className="shrink-0" />
                ) : (
                  <Plus size={20} className="shrink-0" />
                )}
                <span>{isCreatingSite ? "Preparing..." : hasSite ? "Manage Site" : "Create Site"}</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        {isDataLoading
          ? Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="p-3 md:p-5 bg-white rounded border border-slate-200 shadow-sm flex items-center gap-3 md:gap-4 overflow-hidden"
                >
                  <Skeleton className="w-10 h-10 md:w-11 md:h-11 rounded shrink-0" />
                  <div className="flex-1 min-w-0">
                    <Skeleton className="h-5 md:h-8 w-12 md:w-16 mb-1.5 md:mb-2" />
                    <Skeleton className="h-3 md:h-4 w-16 md:w-24" />
                  </div>
                </div>
              ))
          : stats.map((stat, i) => (
              <div
                key={i}
                className="p-3 md:p-4 bg-white rounded border border-slate-200 shadow-sm flex items-center gap-3 md:gap-4 overflow-hidden"
              >
                <div className="p-2.5 md:p-3 bg-slate-50 text-[#1dbf73] rounded flex items-center justify-center shrink-0">
                  <span className="block md:hidden"><stat.icon size={18} /></span>
                  <span className="hidden md:block"><stat.icon size={20} /></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-lg md:text-2xl font-bold text-[#222325] leading-tight truncate">
                    {stat.value}
                  </div>
                  <div className="text-[11px] md:text-[14px] text-[#62646a] truncate">{stat.label}</div>
                </div>
              </div>
            ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Pipeline */}
        <div className="lg:col-span-2 space-y-4 md:space-y-6">
          <div className="bg-white border border-slate-200 rounded shadow-sm overflow-hidden">
            <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between gap-4">
              <h2 className="text-base md:text-lg font-bold text-[#222325] flex items-center flex-wrap gap-1.5 md:gap-2">
                Website Sessions
                {isChecklistComplete ? (
                  <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium">
                    Last 7 Days
                  </span>
                ) : null}
              </h2>
              <button 
                onClick={() => navigate("/business/analytics")}
                className="text-[12px] md:text-[14px] font-bold text-[#1dbf73] hover:underline shrink-0"
              >
                Full Report
              </button>
            </div>

            <div className="relative min-h-[250px] md:min-h-[300px]">
              {isDataLoading && (
                <div className="absolute inset-0 z-20 bg-white p-5 space-y-4">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="flex-1"><Skeleton className="h-10 w-full" /></div>
                    <div className="flex-1"><Skeleton className="h-10 w-full" /></div>
                    <div className="flex-1"><Skeleton className="h-10 w-full" /></div>
                  </div>
                  <Skeleton className="h-[180px] w-full" />
                </div>
              )}
              {/* Empty State Overlay / Checklist */}
              <AnimatePresence>
                {!isChecklistComplete && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 z-10 flex flex-col items-center justify-start pt-8 pb-4 px-6 backdrop-blur-sm bg-white/60"
                  >
                    <div className="w-full max-w-sm text-center bg-white p-6 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100">
                      <div className="flex justify-center mb-4">
                        <div className="w-12 h-12 bg-slate-50 flex items-center justify-center rounded-full">
                          <Lock size={20} className="text-slate-400" />
                        </div>
                      </div>
                      <h3 className="text-[18px] font-bold text-[#222325] mb-2">
                        Sessions Locked
                      </h3>
                      <p className="text-[14px] text-[#62646a] mb-0">
                        Complete your setup guide steps to unlock your website
                        sessions dashboard.
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Faded Background Content */}
              <div
                className={`transition-all duration-500 p-4 md:p-5 h-auto min-h-[300px] md:h-[320px] w-full flex flex-col ${!isChecklistComplete ? "pointer-events-none opacity-40 select-none blur-[3px]" : ""}`}
              >
                <div className="grid grid-cols-2 md:flex flex-wrap items-center gap-y-4 gap-x-6 md:gap-6 mb-6 md:mb-6">
                  <div>
                    <div className="text-[20px] md:text-[28px] font-bold text-[#222325]">
                      0
                    </div>
                    <div className="text-[11px] md:text-[13px] text-[#62646a] mt-0.5">
                      Total Page Views
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                  <div>
                    <div className="text-[20px] md:text-[28px] font-bold text-[#222325]">
                      0
                    </div>
                    <div className="text-[11px] md:text-[13px] text-[#62646a] mt-0.5">
                      Unique Visitors
                    </div>
                  </div>
                  <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                  <div>
                    <div className="text-[20px] md:text-[28px] font-bold text-[#1dbf73] flex items-center gap-1">
                      0% <TrendingUp size={18} />
                    </div>
                    <div className="text-[11px] md:text-[13px] text-[#62646a] mt-0.5">
                      vs Last Week
                    </div>
                  </div>
                </div>

                <div className="flex-1 min-h-[150px] md:min-h-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={sessionData}
                      margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                    >
                      <defs>
                        <linearGradient
                          id="colorSessions"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#1dbf73"
                            stopOpacity={0.4}
                          />
                          <stop
                            offset="95%"
                            stopColor="#1dbf73"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#E2E8F0"
                      />
                      <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748B" }}
                        dy={10}
                      />
                      <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#64748B" }}
                      />
                      <Tooltip
                        contentStyle={{
                          borderRadius: "8px",
                          border: "none",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                        }}
                        itemStyle={{ color: "#1dbf73", fontWeight: "bold" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="sessions"
                        stroke="#1dbf73"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorSessions)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Active Widget */}
          <SetupWidget onCreateSite={handleCreateSite} isCreatingSite={isCreatingSite} />

          {/* Notifications */}
          <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-[16px] text-[#222325]">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="bg-rose-500 text-white text-[10px] font-black px-1.5 py-0.5 rounded-full animate-pulse">
                  {unreadCount} NEW
                </span>
              )}
            </div>
            
            {notifications.length === 0 ? (
              <div className="text-[13px] text-slate-400 italic">No new notifications.</div>
            ) : (
              <div className="space-y-4">
                {notifications.slice(0, 5).map((n) => (
                  <div key={n.id} className={`flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 ${n.unread ? 'opacity-100' : 'opacity-60'}`}>
                    <div className={`mt-1 w-2 h-2 rounded-full shrink-0 ${n.unread ? 'bg-[#1dbf73]' : 'bg-slate-300'}`} />
                    <div className="min-w-0">
                      <p className="text-[13px] text-[#222325] leading-snug font-bold">{n.title || "Notification"}</p>
                      <p className="text-[12px] text-slate-500 leading-tight mt-0.5">{n.description || n.message}</p>
                      <p className="text-[10px] text-slate-400 mt-1 italic">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={markNotificationsRead}
                  className="w-full text-center text-[11px] font-bold text-[#1dbf73] hover:underline uppercase tracking-widest mt-2"
                >
                  Mark All as Read
                </button>
              </div>
            )}
          </div>

          {/* Blog Status */}
          <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
            <h3 className="font-bold text-[16px] mb-4 text-[#222325]">
              Blog Status
            </h3>
            <div className="flex items-center justify-between">
                <span className="text-[14px] text-[#62646a]">
                    {hasBlog ? "Blog is published" : "No blog posts yet"}
                </span>
                {hasBlog ? (
                    <CheckCircle2 size={16} className="text-[#1dbf73]" />
                ) : (
                    <button 
                        onClick={() => navigate("/dashboard/blog")}
                        className="text-[12px] font-bold text-[#1dbf73] hover:underline"
                    >
                        Write Blog
                    </button>
                )}
            </div>
          </div>

          {/* Recent Verifications */}
          <div className="bg-white border border-slate-200 rounded p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4 gap-2">
              <h3 className="font-bold text-[16px] text-[#222325]">
                Recent Verifications
              </h3>
              <ShieldCheck size={18} className="text-[#1dbf73] shrink-0" />
            </div>
            
            {(() => {
              const bName = localStorage.getItem("businessName") || "Business";
              const vKey = `verified_deals_${bName}`;
              const verified = JSON.parse(localStorage.getItem(vKey) || "[]");
              if (verified.length === 0) {
                return (
                  <div className="text-[13px] text-slate-400 italic">
                    No deals verified yet today.
                  </div>
                );
              }
              return (
                <div className="space-y-3">
                  {verified.slice(-3).reverse().map((id: string, i: number) => (
                    <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 gap-2">
                        <div className="flex items-center gap-2 min-w-0">
                          <div className="w-2 h-2 rounded-full bg-[#1dbf73] shrink-0" />
                          <span className="text-[14px] font-bold text-[#222325] truncate">{id}</span>
                        </div>
                        <span className="text-[11px] text-slate-400 font-medium shrink-0">Just now</span>
                      </div>
                  ))}
                  <button className="w-full mt-2 text-[12px] font-bold text-[#1dbf73] hover:underline uppercase tracking-widest">
                    View History
                  </button>
                </div>
              );
            })()}
          </div>
        </div>
      </div>

      {/* Upgrade Modal */}
      <AnimatePresence>
        {showUpgradeModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowUpgradeModal(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative bg-white w-full max-w-4xl max-h-[90vh] border border-[#222325] shadow-[6px_6px_0_0_#222325] md:shadow-[12px_12px_0_0_#222325] overflow-y-auto md:overflow-hidden z-10 flex flex-col md:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setShowUpgradeModal(false)}
                className="absolute top-4 right-4 z-20 p-2 text-[#222325] hover:bg-slate-100 rounded-full transition-colors"
                title="Close"
              >
                <X size={20} />
              </button>

              {/* Left side */}
              <div className="flex-1 p-8 lg:p-10 border-b md:border-b-0 md:border-r border-[#222325] relative overflow-hidden bg-white">
                {/* Subtle Grid Pattern */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

                <div className="relative z-10 w-full">
                  <div className="inline-block border border-[#222325] text-[#222325] font-bold text-[10px] uppercase tracking-widest py-1 px-3 mb-6 bg-[#1dbf73]">
                    BUSINESS PRO
                  </div>

                  <h2 className="text-3xl lg:text-[40px] font-black text-[#222325] mb-4 tracking-tight leading-[1.05]">
                    Unlock your<br />full potential.
                  </h2>

                  <p className="text-[#4a4a4a] mb-8 text-[15px] leading-relaxed font-medium max-w-md">
                    Get the tools you need to build trust and scale your referral network faster.
                  </p>

                  <ul className="space-y-5">
                    <li className="flex items-start gap-4">
                      <div className="mt-1 flex items-center justify-center shrink-0 text-[#1dbf73]">
                        <Check size={20} strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-[#222325] font-bold text-[15px]">
                          Advanced Site Analytics
                        </div>
                        <div className="text-[#62646a] text-[13px] mt-0.5">
                          See exactly where your traffic and conversions are coming from.
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 flex items-center justify-center shrink-0 text-[#1dbf73]">
                        <Check size={20} strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-[#222325] font-bold text-[15px]">
                          Unlimited Referral Tracking
                        </div>
                        <div className="text-[#62646a] text-[13px] mt-0.5">
                          No limits on the number of partners or referrals you can track.
                        </div>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="mt-1 flex items-center justify-center shrink-0 text-[#1dbf73]">
                        <Check size={20} strokeWidth={3} />
                      </div>
                      <div>
                        <div className="text-[#222325] font-bold text-[15px]">
                          Custom Domain Support
                        </div>
                        <div className="text-[#62646a] text-[13px] mt-0.5">
                          Professional look with your own branded domain name.
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Right side */}
              <div className="w-full md:w-[320px] bg-[#fafafa] flex flex-col">
                <div className="p-8 pb-6 flex-1">
                  <div className="mb-8">
                    <h3 className="text-lg font-black text-[#222325] mb-1">
                      Pro Plan
                    </h3>
                    <p className="text-[#62646a] text-xs font-medium">
                      Billed monthly. Cancel anytime.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-[#222325] bg-white p-5 relative shadow-sm">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[16px] text-[#222325]">
                          Monthly
                        </span>
                        <div className="flex items-end gap-1">
                          <span className="font-black text-[24px] text-[#222325]">
                            $25
                          </span>
                          <span className="text-[#62646a] text-[12px] font-medium mb-1">
                            /mo
                          </span>
                        </div>
                      </div>
                      <p className="text-[12px] text-[#1dbf73] font-bold mt-1 uppercase tracking-tight">
                        Best Value for Growth
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <button
                      className="w-full bg-[#1dbf73] text-[#222325] font-black py-4 px-6 text-[15px] transition-transform hover:-translate-y-1 hover:translate-x-1 border border-[#222325] shadow-[-4px_4px_0_0_#222325] flex items-center justify-center gap-2 group active:translate-x-0 active:translate-y-0 active:shadow-none"
                    >
                      Process Payment
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <p className="text-center text-[10px] text-[#62646a] font-medium leading-relaxed px-4">
                      Secure payment via Stripe. Fully encrypted.
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-[#222325] bg-white text-center">
                  <p className="text-[11px] text-[#62646a] font-black uppercase tracking-widest mb-1">
                    Trusted By Businesses
                  </p>
                  <div className="flex justify-center items-center gap-1">
                    <Star size={10} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <Star size={10} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <Star size={10} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <Star size={10} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <Star size={10} className="fill-[#ffb33e] text-[#ffb33e]" />
                    <span className="text-[10px] font-bold text-[#222325] ml-1">4.9/5</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Scanner Modal */}
      <AnimatePresence>
        {showScanner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowScanner(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white w-full max-w-md max-h-[90vh] overflow-y-auto border border-[#222325] shadow-[6px_6px_0_0_#222325] md:shadow-[12px_12px_0_0_#222325] p-6 z-10"
            >
              <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-xl font-bold flex items-center gap-2 italic">
                  <QrCode className="text-[#1dbf73] shrink-0" />
                  <span>Scan Customer QR</span>
                </h3>
                <button onClick={() => setShowScanner(false)} title="Close" className="shrink-0 p-1 bg-slate-100 rounded-full hover:bg-slate-200">
                  <X size={20} />
                </button>
              </div>
              
              <div className="border-4 border-slate-100 rounded-lg overflow-hidden bg-slate-50 aspect-square flex items-center justify-center">
                <ScannerView onScan={handleScanSuccess} />
              </div>
              
              <p className="mt-6 text-sm text-center text-slate-400 italic">
                Position the QR code within the frame to automatically scan and verify the deal.
              </p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* PIN Prompt Modal */}
      <AnimatePresence>
        {showPinPrompt && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="relative bg-white w-full max-w-sm max-h-[90vh] overflow-y-auto border border-[#222325] shadow-[6px_6px_0_0_#222325] md:shadow-[12px_12px_0_0_#222325] p-8 z-10 text-center"
            >
              {verificationStatus === "idle" && (
                <>
                  <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-[#1dbf73]">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 italic">Security Check</h3>
                  <p className="text-slate-400 text-sm mb-8 italic">Enter your 4-digit verification PIN to confirm this deal.</p>
                  
                  <div className="relative mb-8">
                    <Grid3X3 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••"
                      className="w-full bg-slate-50 border border-slate-200 py-4 sm:py-5 px-8 sm:px-12 text-2xl sm:text-3xl font-black tracking-[0.4em] sm:tracking-[0.8em] text-center outline-none focus:border-[#1dbf73] transition-all"
                      autoFocus
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <button
                      onClick={() => {
                        setShowPinPrompt(false);
                        setScannerResult(null);
                        setPin("");
                      }}
                      className="py-3 px-6 border border-slate-200 font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-xs"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={verifyPin}
                      disabled={pin.length < 4}
                      className="py-3 px-6 bg-[#1dbf73] text-[#222325] font-black hover:bg-[#19a463] transition-all uppercase tracking-widest text-xs disabled:opacity-50"
                    >
                      Verify PIN
                    </button>
                  </div>
                </>
              )}

              {verificationStatus === "verifying" && (
                <div className="py-12 flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-[#1dbf73]/20 border-t-[#1dbf73] rounded-full animate-spin mb-6" />
                  <p className="font-bold text-[#222325] uppercase tracking-widest italic animate-pulse">Checking PIN...</p>
                </div>
              )}

              {verificationStatus === "success" && (
                <div className="py-12 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6"
                  >
                    <ShieldCheck size={48} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Verified!</h3>
                  <p className="text-slate-400 text-sm italic">Deal has been successfully validated.</p>
                </div>
              )}

              {verificationStatus === "error" && (
                <div className="py-12 flex flex-col items-center">
                  <motion.div
                    initial={{ x: -10 }}
                    animate={{ x: [ -10, 10, -10, 10, 0 ] }}
                    className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-6"
                  >
                    <ShieldAlert size={48} />
                  </motion.div>
                  <h3 className="text-2xl font-bold mb-2">Access Denied</h3>
                  <p className="text-red-500 font-bold uppercase tracking-widest text-[10px]">{errorMessage}</p>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
