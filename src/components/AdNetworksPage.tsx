
import React, { useState, useEffect } from 'react';
import CampaignManagement from './CampaignManagement';
import { Search, ShieldAlert, Sparkles } from 'lucide-react';

export default function AdNetworksPage() {
  const [isLinked, setIsLinked] = useState(false);

  useEffect(() => {
    const linked = localStorage.getItem("google_ads_linked") === "true" || new URLSearchParams(window.location.search).get("authorized") === "true";
    if (linked) {
      setIsLinked(true);
      if (!localStorage.getItem("google_ads_linked")) {
        localStorage.setItem("google_ads_linked", "true");
      }
    }
  }, []);

  const handleAuthorize = async (useSandbox = false) => {
    try {
      const res = await fetch(`/api/ads/google/authorize?origin=${window.location.origin}${useSandbox ? '&sandbox=true' : ''}`);
      const data = await res.json();
      if (data.url) {
        window.open(data.url, "_blank", "width=600,height=700");
      }
    } catch (e) {
      console.error("Ads auth failed", e);
    }
  };

  return (
    <div className="max-w-7xl mx-auto pt-8 px-4">
      <h1 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8 tracking-tight">Ad Networks</h1>
      
      {!isLinked ? (
        <div className="space-y-6">
          <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-8 text-center max-w-2xl mx-auto">
            <div className="w-12 h-12 bg-pink-50 border border-pink-100 rounded-lg flex items-center justify-center text-[#ec4899] mx-auto mb-4">
              <Search size={20} />
            </div>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Connect Google Ads</h2>
            <p className="text-sm text-slate-500 mb-6">Link your AdWords account or simulate credentials validation to start managing campaigns directly.</p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => handleAuthorize(false)}
                className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 text-white rounded-lg font-bold text-sm hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
              >
                <Search size={16} />
                <span>Authorize Google Ads</span>
              </button>

              <button
                onClick={() => handleAuthorize(true)}
                className="w-full sm:w-auto px-5 py-2.5 bg-pink-100 text-pink-700 hover:bg-pink-200/80 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2"
              >
                <Sparkles size={16} className="text-[#ec4899]" />
                <span>Use Sandbox Demo Mode</span>
              </button>
            </div>
          </div>

          {/* Detailed Authorization & Redirect URI Troubleshooting Panel */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 max-w-2xl mx-auto text-left">
            <div className="flex items-start gap-3 mb-4">
              <ShieldAlert className="text-pink-600 mt-0.5 shrink-0" size={18} />
              <div>
                <h3 className="text-sm font-bold text-slate-800">Got an OAuth 400 error (redirect_uri_mismatch)?</h3>
                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                  Google limits OAuth callback requests to strictly pre-registered redirect URLs. You have two painless ways to proceed:
                </p>
              </div>
            </div>

            <div className="ml-7 space-y-4">
              {/* Option A */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-1">Option A: Click "Use Sandbox Demo Mode" (Recommended for Testing)</h4>
                <p className="text-xs text-slate-500 leading-relaxed font-light">
                  Highly responsive simulated authorization with identical cookie and state sync, skipping developer settings altogether.
                </p>
              </div>

              {/* Option B */}
              <div>
                <h4 className="text-xs font-bold text-slate-700 mb-2">Option B: Register Redirect URIs in your Google Developer Console</h4>
                <p className="text-xs text-slate-500 mb-2 leading-relaxed">
                  Add the exact callback URL matching your current environment under <strong>Authorized redirect URIs</strong>:
                </p>
                <div className="space-y-1.5">
                  <div className="p-2 bg-white border border-slate-200 rounded font-mono text-[10.5px] text-slate-600 break-all select-all">
                    https://ais-dev-e5c7xgl5vohy4nqqn2ckvp-283796243588.europe-west2.run.app/api/ads/google/callback
                  </div>
                  <div className="p-2 bg-white border border-slate-200 rounded font-mono text-[10.5px] text-slate-600 break-all select-all">
                    https://ais-pre-e5c7xgl5vohy4nqqn2ckvp-283796243588.europe-west2.run.app/api/ads/google/callback
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <CampaignManagement />
      )}
    </div>
  );
}
