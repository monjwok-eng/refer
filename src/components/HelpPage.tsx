import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  MessageCircle,
  BookOpen,
  Mail,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  Zap,
  HelpCircle,
} from "lucide-react";
import { motion } from "motion/react";

export default function HelpPage() {
  const navigate = useNavigate();
  const commonQuestions = [
    {
      q: "How do referral payouts work?",
      a: "Payouts are processed automatically every 14 days once the referral window closes.",
    },
    {
      q: "Can I customize my referral landing page?",
      a: 'Yes, head to the "Editor" section to customize colors, fonts, and layouts.',
    },
    {
      q: "How many deals can I post?",
      a: "You can post unlimited deals, but we recommend focusing on 2-3 high-quality offers.",
    },
    {
      q: "Are there hidden fees?",
      a: "Referr takes a flat 5% fee on successful referral payouts only.",
    },
  ];

  const [searchTerm, setSearchTerm] = React.useState("");
  const [expandedIndex, setExpandedIndex] = React.useState<number | null>(null);

  const filteredQuestions = commonQuestions.filter(
    (q) =>
      q.q.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.a.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-[1000px] mx-auto pb-24 px-4 md:px-0 pt-16">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-[40px] font-bold text-[#222325] tracking-tight italic mb-4">
          How can we help?
        </h1>
        <div className="max-w-[600px] mx-auto relative">
          <Search
            className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300"
            size={20}
          />
          <input
            type="text"
            placeholder="Search for articles, guides, or help..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-white border-2 border-[#222325] py-6 pl-16 pr-8 text-[16px] outline-none transition-all shadow-sm italic focus:shadow-md"
          />
        </div>
      </div>

      {/* Categories - Hide if searching */}
      {searchTerm === "" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <CategoryCard
            icon={BookOpen}
            title="Documentation"
            desc="Learn how to use Referr like a pro with our guides."
            link="Read Guides"
            onClick={() => navigate("/docs#guides")}
          />
          <CategoryCard
            icon={ShieldCheck}
            title="Security & Trust"
            desc="Understand how we keep your data and payouts safe."
            link="Privacy Center"
            onClick={() => navigate("/docs#privacy")}
          />
          <CategoryCard
            icon={Zap}
            title="Quick Start"
            desc="Get your first referral campaign live in 5 minutes."
            link="Watch Video"
            onClick={() => navigate("/docs#video")}
          />
        </div>
      )}

      {/* FAQ Section */}
      <div className="bg-white border-2 border-[#222325] p-6 md:p-12">
        <h2 className="text-[20px] md:text-[24px] font-bold text-[#222325] mb-8 md:mb-12 tracking-tight italic">
          {searchTerm ? "Search Results" : "Common Questions"}
        </h2>
        <div className="space-y-4">
          {filteredQuestions.map((item, i) => (
            <div key={i} className="group cursor-pointer border border-transparent hover:border-slate-200 transition-all p-4 rounded-none" onClick={() => setExpandedIndex(expandedIndex === i ? null : i)}>
              <div className="flex items-center justify-between pointer-events-none mb-3">
                <h4 className={`text-[17px] font-bold transition-colors ${expandedIndex === i ? "text-[#1dbf73]" : "text-[#222325] group-hover:text-[#1dbf73]"}`}>
                  {item.q}
                </h4>
                <ChevronRight
                  size={18}
                  className={`text-slate-300 group-hover:text-[#222325] transition-all ${expandedIndex === i ? "rotate-90 text-[#222325]" : ""}`}
                />
              </div>
              <motion.div
                initial={false}
                animate={{ height: expandedIndex === i ? "auto" : 0 }}
                className="overflow-hidden"
              >
                <p className="text-slate-500 font-medium leading-relaxed max-w-[90%] pb-4 text-[15px]">
                  {item.a}
                </p>
              </motion.div>
              {i !== filteredQuestions.length - 1 && (
                <div className="border-b border-slate-100" />
              )}
            </div>
          ))}
          {filteredQuestions.length === 0 && (
            <p className="text-center text-slate-500 italic">No results found.</p>
          )}
        </div>
      </div>



      {/* Contact Section */}
      <div className="mt-16 flex flex-col items-center justify-center p-8 md:p-16 border-2 border-dashed border-slate-200 rounded-none bg-slate-50 mx-4 md:mx-0">
        <div className="w-20 h-20 bg-white border-2 border-[#222325] flex items-center justify-center text-[#222325] mb-6">
          <MessageCircle size={36} strokeWidth={2.5} />
        </div>
        <h3 className="text-[20px] font-bold text-[#222325] mb-2 tracking-tight">
          Still need backup?
        </h3>
        <p className="text-slate-400 mb-8 max-w-[400px] text-center font-light italic">
          Our support human team is available 24/7 to help you with anything.
        </p>
        <button className="bg-[#222325] text-white px-12 py-4 rounded-none font-bold hover:bg-black transition-all flex items-center gap-3 uppercase tracking-widest text-[13px]">
          <Mail size={18} />
          Contact Support
        </button>
      </div>

      </div>
    </div>
  );
}

function CategoryCard({ icon: Icon, title, desc, link, onClick }: any) {
  return (
    <div className="bg-white border-2 border-[#222325] p-10 hover:shadow-[8px_8px_0px_0px_rgba(29,191,115,0.2)] transition-all group flex flex-col">
      <div className="w-14 h-14 bg-white border-2 border-[#222325] flex items-center justify-center text-[#222325] mb-8 group-hover:bg-[#1dbf73] group-hover:text-white group-hover:border-[#1dbf73] transition-all duration-300">
        <Icon size={24} strokeWidth={2.5} />
      </div>
      <h3 className="text-[18px] font-bold text-[#222325] mb-3">{title}</h3>
      <p className="text-slate-400 text-[14px] font-light leading-relaxed mb-8 flex-1">
        {desc}
      </p>
      <button onClick={onClick} className="flex items-center gap-2 text-[#1dbf73] font-bold text-[13px] group-hover:underline">
        {link}
        <ExternalLink size={14} />
      </button>
    </div>
  );
}
