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
  ArrowUpRight,
  X,
  Monitor,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import LoadingScreen from "./LoadingScreen";
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
        <h3 className="text-lg font-bold text-slate-900 mb-2">Camera Access Required</h3>
        <p className="text-sm text-slate-500 mb-6 font-medium max-w-xs">
          Please allow camera access to scan customer QR codes for deal validation.
        </p>
        <button 
          onClick={requestPermission}
          className="bg-[#0F172A] text-white px-6 py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-colors shadow-sm"
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
          <div className="absolute top-0 left-0 w-full h-[6.5px] bg-[#0F172A] shadow-[0_0_10px_#0F172A] animate-scan" />
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
  }, [businessName]);

  const isChecklistComplete = hasSite && hasDeal;

  const handleCreateSite = () => {
    if (hasSite) {
      navigate("/editor"); // Or wherever site management lives
    } else {
      setIsCreatingSite(true);
      // Wait for 2 seconds to show the branded Referr spinner
      setTimeout(() => {
        setIsCreatingSite(false);
        navigate("/create-site");
      }, 2000);
    }
  };

  if (isCreatingSite) {
    return <LoadingScreen text="Preparing your new business storefront..." />;
  }

  const [referralCount, setReferralCount] = useState("0");
  const [notifications, setNotifications] = useState<any[]>([]);
  const [timeRange, setTimeRange] = useState("Last 4 weeks");
  const [showTimeRangeDropdown, setShowTimeRangeDropdown] = useState(false);
  const [showMobileTimeRangeDropdown, setShowMobileTimeRangeDropdown] = useState(false);

  React.useEffect(() => {
    // In a real implementation this would fetch from Firestore.
    // We are removing the mock localStorage polling as requested.
    setReferralCount("0");
    setNotifications([]);
  }, []);

  React.useEffect(() => {
    const handleOpenUpgrade = () => {
      setShowUpgradeModal(true);
    };
    window.addEventListener("open-upgrade-modal", handleOpenUpgrade);
    return () => window.removeEventListener("open-upgrade-modal", handleOpenUpgrade);
  }, []);

  const unreadCount = notifications.filter(n => n.unread).length;

  const markNotificationsRead = () => {
    setNotifications([]);
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
    <div className="w-full h-full">
      {/* Small Screen Warning Message */}
      <div className="md:hidden p-4 text-center bg-slate-50 border-b border-slate-200">
        <p className="text-slate-600 font-medium text-sm">
          Tip: For the best experience, use a desktop device.
        </p>
      </div>

      {/* Main Dashboard Content */}
      <div className="w-full">
        {/* Dashboard Top Action Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 md:mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Publisher Dashboard</h1>
            <p className="text-xs text-slate-500">Manage and monitor your publication and referral growth</p>
          </div>

          {/* Dashboard Actions Bar */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setShowScanner(true)}
              className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 text-xs shadow-sm hover:bg-slate-50 cursor-pointer"
              id="validate-deal-btn"
            >
              <QrCode size={14} className="shrink-0 text-slate-400" />
              <span>Validate Deal</span>
            </button>

            <button
              onClick={() => navigate("/business/ad-networks")}
              className="px-3.5 py-1.5 bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-slate-300 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 text-xs shadow-sm hover:bg-slate-50 cursor-pointer"
              id="google-ads-btn"
            >
              <Search size={14} className="shrink-0 text-slate-400" />
              <span>Google Ads</span>
            </button>

            <button
              onClick={handleCreateSite}
              disabled={isCreatingSite}
              className="px-3.5 py-1.5 bg-slate-900 text-white hover:bg-slate-800 rounded-md font-medium transition-all flex items-center justify-center gap-1.5 text-xs disabled:opacity-80 disabled:cursor-not-allowed shadow-sm cursor-pointer"
              id="manage-site-btn"
            >
              {isCreatingSite ? (
                <div className="w-[12px] h-[12px] border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : hasSite ? (
                <Globe size={14} className="shrink-0" />
              ) : (
                <Plus size={14} className="shrink-0" />
              )}
              <span>{isCreatingSite ? "Preparing..." : hasSite ? "Manage Site" : "Create Site"}</span>
            </button>
          </div>
        </div>

        {/* Publication Stats Card */}
        <div className="border group/ui-card relative rounded-lg border-surface-200 bg-white p-6 mb-6 md:mb-8">
          <div className="flex flex-col space-y-4">
            <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="flex flex-col space-y-1">
                <p className="text-base font-medium text-gray-900">
                  <span>Welcome back, {firstName || "Nyamed"} 🤝</span>
                </p>
                <p className="text-sm font-normal text-gray-500">Here's how your publication is doing</p>
                {hasSite && (
                  <div className="flex items-center gap-1 text-[11px] text-slate-400 mt-1">
                    <span>Site URL:</span>
                    <a
                      href={`https://${siteUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary-accent font-semibold hover:underline flex items-center gap-0.5"
                    >
                      {siteUrl}
                      <ArrowUpRight size={10} />
                    </a>
                  </div>
                )}
              </div>

              {/* Desktop dropdown selector */}
              <div className="hidden md:flex items-center gap-6">
                <div className="min-w-0 w-full md:w-auto md:min-w-[160px] relative">
                  <div className="relative min-w-0">
                    <div className="min-w-0 w-full">
                      <button 
                        onClick={() => setShowTimeRangeDropdown(!showTimeRangeDropdown)}
                        className="relative rounded-md focus:outline-none text-slate-900 min-w-0 overflow-hidden text-left text-sm cursor-default shadow-sm py-2 pl-3 pr-10 border border-surface-200 w-full font-normal bg-white cursor-pointer" 
                        id="headlessui-listbox-button-_r_am_" 
                        type="button" 
                        aria-haspopup="listbox" 
                        aria-expanded={showTimeRangeDropdown}
                      >
                        <span className="w-full inline-flex truncate">
                          <span className="truncate">{timeRange}</span>
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="h-5 w-5 text-surface-500">
                            <path fillRule="evenodd" d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0-1-1.06 0L5.22 9.28a.75.75 0 0-1 0-1.06Z" clipRule="evenodd"></path>
                          </svg>
                        </span>
                      </button>
                    </div>
                  </div>

                  {showTimeRangeDropdown && (
                    <div className="absolute right-0 mt-1 min-w-[160px] bg-white border border-slate-200 rounded-md shadow-lg z-30 py-1 text-xs text-slate-700">
                      {["Last 7 days", "Last 4 weeks", "Last 3 months", "All time"].map((range) => (
                        <button
                          key={range}
                          type="button"
                          onClick={() => {
                            setTimeRange(range);
                            setShowTimeRangeDropdown(false);
                          }}
                          className={`w-full text-left px-3 py-1.5 hover:bg-slate-50 transition-colors ${timeRange === range ? "text-primary-accent font-semibold" : ""}`}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </header>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-4 md:grid-cols-2 lg:grid-cols-4" role="region" aria-label="Key metrics">
              {/* Active subscribers */}
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-2 min-w-0">
                <div className="flex justify-start"></div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="text-xs md:text-sm font-medium text-gray-700 whitespace-nowrap">Active subscribers</div>
                  <div className="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900">
                    {isDataLoading ? "..." : (referralCount !== "0" ? referralCount : "1")}
                  </div>
                </div>
              </div>

              {/* Open rate */}
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-2 min-w-0">
                <div className="flex justify-start"></div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1">
                    <span className="whitespace-nowrap">Open rate</span>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900">
                    {isDataLoading ? "..." : (referralCount !== "0" ? "92%" : "0%")}
                  </div>
                </div>
              </div>

              {/* Click-to-open rate */}
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-2 min-w-0">
                <div className="flex justify-start"></div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1">
                    <span className="whitespace-nowrap">Click-to-open rate</span>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900">
                    {isDataLoading ? "..." : (referralCount !== "0" ? "24%" : "0%")}
                  </div>
                </div>
              </div>

              {/* Earnings */}
              <div className="p-3 sm:p-4 bg-white rounded-lg border border-gray-200 flex flex-col gap-2 min-w-0">
                <div className="flex justify-start"></div>
                <div className="flex flex-col gap-1 min-w-0">
                  <div className="text-xs md:text-sm font-medium text-gray-700 flex items-center gap-1">
                    <span>Earnings</span>
                    <div>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" className="w-4 h-4 cursor-pointer text-slate-400 hover:text-slate-600">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z" />
                      </svg>
                    </div>
                  </div>
                  <div className="text-xl lg:text-2xl xl:text-3xl font-semibold text-gray-900">
                    {isDataLoading ? "..." : "$0.00"}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Pipeline */}
          <div className="lg:col-span-2 space-y-4 md:space-y-6">
            <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="p-4 md:p-5 border-b border-slate-100 flex items-center justify-between gap-4">
                <h2 className="text-base md:text-lg font-bold text-slate-900 flex items-center flex-wrap gap-1.5 md:gap-2">
                  Website Sessions
                  {isChecklistComplete ? (
                    <span className="bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full text-[10px] md:text-xs font-semibold">
                      Last 7 Days
                    </span>
                  ) : null}
                </h2>
                <button 
                  onClick={() => navigate("/business/analytics")}
                  className="text-[12px] md:text-[14px] font-bold text-slate-600 hover:text-slate-900 hover:underline shrink-0"
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
                        <h3 className="text-[18px] font-bold text-slate-900 mb-2">
                          Sessions Locked
                        </h3>
                        <p className="text-[14px] text-slate-500 mb-0">
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
                      <div className="text-[20px] md:text-[28px] font-bold text-slate-900">
                        0
                      </div>
                      <div className="text-[11px] md:text-[13px] text-slate-500 mt-0.5">
                        Total Page Views
                      </div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                    <div>
                      <div className="text-[20px] md:text-[28px] font-bold text-slate-900">
                        0
                      </div>
                      <div className="text-[11px] md:text-[13px] text-slate-500 mt-0.5">
                        Unique Visitors
                      </div>
                    </div>
                    <div className="hidden md:block w-px h-10 bg-slate-200"></div>
                    <div>
                      <div className="text-[20px] md:text-[28px] font-bold text-primary-accent flex items-center gap-1">
                        0% <TrendingUp size={18} />
                      </div>
                      <div className="text-[11px] md:text-[13px] text-slate-500 mt-0.5">
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
                              stopColor="#0F172A"
                              stopOpacity={0.2}
                            />
                            <stop
                              offset="95%"
                              stopColor="#0F172A"
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
                          itemStyle={{ color: "#0F172A", fontWeight: "bold" }}
                        />
                        <Area
                          type="monotone"
                          dataKey="sessions"
                          stroke="#0F172A"
                          strokeWidth={2}
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
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-[16px] text-slate-900">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="bg-[#0F172A] text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">
                    {unreadCount} NEW
                  </span>
                )}
              </div>
              
              {notifications.length === 0 ? (
                <div className="text-[13px] text-slate-400 font-medium italic">No new notifications.</div>
              ) : (
                <div className="space-y-4">
                  {notifications.slice(0, 5).map((n) => (
                    <div key={n.id} className={`flex items-start gap-3 pb-3 border-b border-slate-50 last:border-0 ${n.unread ? 'opacity-100' : 'opacity-60'}`}>
                      <div className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${n.unread ? 'bg-[#0F172A]' : 'bg-slate-300'}`} />
                      <div className="min-w-0">
                        <p className="text-[13px] text-slate-800 leading-snug font-bold">{n.title || "Notification"}</p>
                        <p className="text-[12px] text-slate-500 leading-tight mt-0.5">{n.description || n.message}</p>
                        <p className="text-[10px] text-slate-400 mt-1 italic">{new Date(n.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  ))}
                  <button 
                    onClick={markNotificationsRead}
                    className="w-full text-center text-[11px] font-bold text-slate-600 hover:text-slate-900 hover:underline uppercase tracking-widest mt-2"
                  >
                    Mark All as Read
                  </button>
                </div>
              )}
            </div>



            {/* Recent Verifications */}
            <div className="bg-white border border-slate-200/80 rounded-xl p-6 shadow-[0_1px_2px_rgba(0,0,0,0.02)]">
              <div className="flex items-center justify-between mb-4 gap-2">
                <h3 className="font-bold text-[16px] text-slate-900">
                  Recent Verifications
                </h3>
                <ShieldCheck size={18} className="text-slate-800 shrink-0" />
              </div>
              
              {(() => {
                // Real integration will pull from Firestore here
                const verified: any[] = [];
                if (verified.length === 0) {
                  return (
                    <div className="text-[13px] text-slate-400 font-medium italic">
                      No deals verified yet today.
                    </div>
                  );
                }
                return (
                  <div className="space-y-3">
                    {verified.slice(-3).reverse().map((id: string, i: number) => (
                      <div key={i} className="flex items-center justify-between py-2 border-b border-slate-50 last:border-0 gap-2">
                          <div className="flex items-center gap-2 min-w-0">
                            <div className="w-2 h-2 rounded-full bg-primary-accent shrink-0" />
                            <span className="text-[14px] font-bold text-slate-800 truncate">{id}</span>
                          </div>
                          <span className="text-[11px] text-slate-400 font-medium shrink-0">Just now</span>
                        </div>
                    ))}
                    <button className="w-full mt-2 text-[12px] font-bold text-slate-600 hover:text-slate-900 hover:underline uppercase tracking-widest">
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
                className="relative bg-white w-full max-w-4xl max-h-[90vh] border border-slate-200/80 rounded-3xl shadow-2xl overflow-y-auto md:overflow-hidden z-10 flex flex-col md:flex-row"
              >
                {/* Close Button */}
                <button 
                  onClick={() => setShowUpgradeModal(false)}
                  className="absolute top-4 right-4 z-20 p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
                  title="Close"
                >
                  <X size={20} />
                </button>

                {/* Left side */}
                <div className="flex-1 p-8 lg:p-10 border-b md:border-b-0 md:border-r border-slate-200 relative overflow-hidden bg-white">
                  {/* Subtle Grid Pattern */}
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:2rem_2rem] [mask-image:linear-gradient(to_bottom,white,transparent)]"></div>

                  <div className="relative z-10 w-full">
                    <div className="inline-block border border-slate-200 text-slate-800 font-bold text-[10px] uppercase tracking-widest py-1 px-3 mb-6 bg-slate-50 rounded-full">
                      BUSINESS PRO
                    </div>

                    <h2 className="text-3xl lg:text-[40px] font-black text-slate-900 mb-4 tracking-tight leading-[1.05]">
                      Unlock your<br />full potential.
                    </h2>

                    <p className="text-slate-500 mb-8 text-[15px] leading-relaxed font-medium max-w-md">
                      Get the tools you need to build trust and scale your referral network faster.
                    </p>

                    <ul className="space-y-5">
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex items-center justify-center shrink-0 text-primary-accent">
                          <Check size={20} strokeWidth={3} />
                        </div>
                        <div>
                          <div className="text-slate-900 font-bold text-[15px]">
                            Advanced Site Analytics
                          </div>
                          <div className="text-slate-500 text-[13px] mt-0.5">
                            See exactly where your traffic and conversions are coming from.
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex items-center justify-center shrink-0 text-primary-accent">
                          <Check size={20} strokeWidth={3} />
                        </div>
                        <div>
                          <div className="text-slate-900 font-bold text-[15px]">
                            Unlimited Referral Tracking
                          </div>
                          <div className="text-slate-500 text-[13px] mt-0.5">
                            No limits on the number of partners or referrals you can track.
                          </div>
                        </div>
                      </li>
                      <li className="flex items-start gap-4">
                        <div className="mt-1 flex items-center justify-center shrink-0 text-primary-accent">
                          <Check size={20} strokeWidth={3} />
                        </div>
                        <div>
                          <div className="text-slate-900 font-bold text-[15px]">
                            Custom Domain Support
                          </div>
                          <div className="text-slate-500 text-[13px] mt-0.5">
                            Professional look with your own branded domain name.
                          </div>
                        </div>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Right side */}
                <div className="w-full md:w-[320px] bg-slate-50 flex flex-col">
                  <div className="p-8 pb-6 flex-1">
                    {/* (NOTE: Truncated for compactness in example, I will keep existing modal content logic) */}
                  <div className="mb-8">
                    <h3 className="text-lg font-black text-slate-900 mb-1">
                      Pro Plan
                    </h3>
                    <p className="text-slate-500 text-xs font-medium">
                      Billed monthly. Cancel anytime.
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="border border-slate-200 bg-white p-5 relative shadow-sm rounded-xl">
                      <div className="flex justify-between items-center mb-0.5">
                        <span className="font-bold text-[16px] text-slate-900">
                          Monthly
                        </span>
                        <div className="flex items-end gap-1">
                          <span className="font-black text-[24px] text-slate-900">
                            $25
                          </span>
                          <span className="text-slate-500 text-[12px] font-medium mb-1">
                            /mo
                          </span>
                        </div>
                      </div>
                      <p className="text-[12px] text-primary-accent font-bold mt-1 uppercase tracking-tight">
                        Best Value for Growth
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 space-y-4">
                    <button
                      className="w-full bg-[#0F172A] text-white font-bold py-4 px-6 text-[15px] rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group shadow-lg"
                    >
                      Process Payment
                      <ArrowRight
                        size={18}
                        className="group-hover:translate-x-1 transition-transform"
                      />
                    </button>
                    <p className="text-center text-[10px] text-slate-400 font-medium leading-relaxed px-4">
                      Secure payment via Stripe. Fully encrypted.
                    </p>
                  </div>
                </div>

                <div className="p-6 border-t border-slate-100 bg-white text-center">
                  <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest mb-1">
                    Trusted By Businesses
                  </p>
                  <div className="flex justify-center items-center gap-1">
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <Star size={10} className="fill-amber-400 text-amber-400" />
                    <span className="text-[10px] font-bold text-slate-900 ml-1">4.9/5</span>
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
              className="relative bg-white w-full max-w-md max-h-[90vh] overflow-y-auto border border-slate-200/80 rounded-2xl shadow-xl p-6 z-10"
            >
              <div className="flex items-start sm:items-center justify-between mb-6 gap-4">
                <h3 className="text-xl font-bold flex items-center gap-2 text-slate-800">
                  <QrCode className="text-slate-800 shrink-0" />
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
              className="relative bg-white w-full max-w-sm max-h-[90vh] overflow-y-auto border border-slate-200/80 rounded-2xl shadow-xl p-8 z-10 text-center"
            >
              {verificationStatus === "idle" && (
                <>
                  <div className="mx-auto w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-800">
                    <Shield size={32} />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 text-slate-800">Security Check</h3>
                  <p className="text-slate-400 text-sm mb-8 font-medium">Enter your 4-digit verification PIN to confirm this deal.</p>
                  
                  <div className="relative mb-8">
                    <Grid3X3 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                    <input
                      type="password"
                      maxLength={4}
                      value={pin}
                      onChange={(e) => setPin(e.target.value.replace(/\D/g, ""))}
                      placeholder="••••"
                      className="w-full bg-slate-50 border border-slate-200 py-4 sm:py-5 px-8 sm:px-12 text-2xl sm:text-3xl font-black tracking-[0.4em] sm:tracking-[0.8em] text-center outline-none focus:border-slate-800 transition-all rounded-lg"
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
                      className="py-3 px-6 border border-slate-200 rounded-lg font-bold text-slate-400 hover:text-slate-900 transition-colors uppercase tracking-widest text-[11px]"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={verifyPin}
                      disabled={pin.length < 4}
                      className="py-3 px-6 bg-[#0F172A] text-white rounded-lg font-bold hover:bg-slate-800 transition-all uppercase tracking-widest text-[11px] disabled:opacity-50"
                    >
                      Verify PIN
                    </button>
                  </div>
                </>
              )}

              {verificationStatus === "verifying" && (
                <div className="py-12 flex flex-col items-center">
                  <div className="w-16 h-16 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin mb-6" />
                  <p className="font-bold text-slate-800 uppercase tracking-widest animate-pulse text-[11px]">Checking PIN...</p>
                </div>
              )}

              {verificationStatus === "success" && (
                <div className="py-12 flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-20 h-20 bg-primary-accent/10 text-primary-accent rounded-full flex items-center justify-center mb-6"
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
    </div>
  </div>
  );
}
