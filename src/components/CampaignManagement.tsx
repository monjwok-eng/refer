import React, { useState } from 'react';
import { Megaphone, Plus, AlertCircle, Check } from 'lucide-react';

export default function CampaignManagement() {
  const [campaign, setCampaign] = useState({ name: '', budget: '', url: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    try {
      // Future integration: call /api/ads/google/campaign
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setCampaign({ name: '', budget: '', url: '' });
    } catch (e) {
      setStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white border border-slate-200/80 rounded-xl shadow-[0_1px_2px_rgba(0,0,0,0.02)] p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 bg-slate-100 rounded-lg">
          <Megaphone size={20} className="text-slate-800" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900">Google Ads Campaign</h3>
          <p className="text-xs text-slate-500 font-medium">Configure and launch your campaign</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Campaign Name</label>
          <input 
            type="text" 
            value={campaign.name}
            onChange={(e) => setCampaign({ ...campaign, name: e.target.value })}
            className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] transition-all"
            placeholder="e.g. Summer Sale 2026"
            required
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Daily Budget ($)</label>
            <input 
              type="number" 
              value={campaign.budget}
              onChange={(e) => setCampaign({ ...campaign, budget: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] transition-all"
              placeholder="e.g. 50"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5">Target Link</label>
            <input 
              type="url" 
              value={campaign.url}
              onChange={(e) => setCampaign({ ...campaign, url: e.target.value })}
              className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-[#0F172A] focus:ring-1 focus:ring-[#0F172A] transition-all"
              placeholder="https://example.com"
              required
            />
          </div>
        </div>

        <button 
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#0F172A] text-white py-2.5 rounded-lg font-bold hover:bg-slate-800 transition-all active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
        >
          {isSubmitting ? 'Launching...' : 'Launch Campaign'}
        </button>
      </form>

      {status === 'success' && (
        <div className="mt-4 p-3 bg-pink-50 text-pink-700 rounded-lg text-xs font-bold flex items-center gap-2">
          <Check size={14} /> Campaign launched successfully!
        </div>
      )}
      {status === 'error' && (
        <div className="mt-4 p-3 bg-red-50 text-red-700 rounded-lg text-xs font-bold flex items-center gap-2">
          <AlertCircle size={14} /> Failed to launch campaign.
        </div>
      )}
    </div>
  );
}
