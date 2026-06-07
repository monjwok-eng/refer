import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronDown,
  CheckCircle2,
  ChevronRight,
  Activity,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { Logo } from "./Navbar";
import { countries } from "../data/countries";

const services = [
  { id: "create-site", label: "Create a new website" },
  { id: "update-site", label: "Update an existing site" },
  { id: "ecommerce", label: "Set up eCommerce site" },
  { id: "seo", label: "Improve site SEO" },
  { id: "code-solutions", label: "Custom code solutions" },
  { id: "custom-domain", label: "Need a custom domain?" },
  { id: "business-email", label: "Need a business email?" },
  { id: "site-maintenance", label: "General tasks and site maintenance" },
  { id: "mobile-site", label: "Create a better mobile site" },
];

export default function HireProfessionalPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [name, setName] = useState(
    localStorage.getItem("businessName") || "Hustler",
  );
  const [emailValue, setEmailValue] = useState(
    localStorage.getItem("userEmail") || "nyamedmeddi@gmail.com",
  );
  const [isDetailsExpanded, setIsDetailsExpanded] = useState(false);
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (id: string) => {
    setSelectedServices(prev =>
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-[#f7f9fc] flex flex-col items-center justify-center p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white p-12 border-2 border-[#222325] text-center max-w-lg w-full"
        >
          <div className="w-20 h-20 bg-pink-50 border-2 border-[#222325] flex items-center justify-center mx-auto mb-6 text-[#ec4899]">
            <CheckCircle2 size={40} strokeWidth={2} />
          </div>
          <h3 className="text-xl font-black text-[#222325] mb-4 uppercase tracking-tight">
            Project request sent
          </h3>
          <p className="text-slate-600 text-[14px] leading-relaxed mb-8 font-medium">
            Your request has been matched with 3 professionals. They will reach out shortly to discuss your project needs.
          </p>
          <Link
            to="/dashboard/business"
            className="inline-block bg-[#222325] text-white font-black uppercase tracking-widest py-3 px-8 hover:bg-black transition-colors text-[14px]"
          >
            Return to Dashboard
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fc] flex flex-col overflow-hidden fixed inset-0">
      <header className="h-[72px] px-8 flex items-center shrink-0 border-b border-[#222325]">
        <Logo className="text-[24px]" />
      </header>

      <div className="flex-1 flex overflow-hidden w-full max-w-[1200px] mx-auto md:pb-6">
        <div className="flex flex-col md:flex-row w-full h-full">
          {/* Left Side Container */}
          <div className="w-full md:w-[420px] shrink-0 pt-6 px-6 md:pt-[54px] md:pr-8 md:pl-0 flex flex-col gap-4 md:gap-[30px] mb-6 md:mb-0">
            <h1 className="text-[24px] md:text-[32px] font-bold text-[#222325] leading-[1.2] md:leading-[1.15]">
              Hire the right Referr professional for your project
            </h1>
            <p className="text-[14px] md:text-[16px] text-[#62646a] font-normal leading-[1.6]">
              The Referr Marketplace has 2,000+ verified creators. Choose a
              service and we’ll match you with top professionals based on your
              needs. They’ll contact you directly to discuss your project before
              you hire.
            </p>
          </div>

          {/* Right Side Form Container */}
          <div className="flex-1 bg-white border-l border-[#222325] flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto px-5 py-6 md:px-[60px] md:pt-[60px]">
              <h2 className="text-[22px] md:text-[28px] font-bold text-[#222325] mb-6 tracking-tight">
                What can a professional do for you?
              </h2>

              <div className="flex flex-col gap-[6px] mb-8 md:mb-12">
                {services.map((service) => (
                  <label
                    key={service.id}
                    className={`flex items-center gap-[14px] p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedServices.includes(service.id)
                        ? "bg-[#f4f5f8]"
                        : "hover:bg-slate-50"
                    }`}
                  >
                    <div className="relative flex items-center justify-center w-[20px] h-[20px]">
                      <input
                        type="checkbox"
                        name="service"
                        value={service.id}
                        checked={selectedServices.includes(service.id)}
                        onChange={() => toggleService(service.id)}
                        className="peer appearance-none w-[20px] h-[20px] border-2 border-[#222325] bg-white transition-all cursor-pointer"
                      />
                      <Check
                        size={14}
                        className="absolute text-[#1dbf73] opacity-0 peer-checked:opacity-100 pointer-events-none stroke-[3px]"
                      />
                    </div>
                    <span className={`text-[15px] font-medium transition-colors select-none relative top-[-1px] ${
                        selectedServices.includes(service.id) ? "text-[#222325] font-bold" : "text-slate-600"
                    }`}>
                      {service.label}
                    </span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 max-w-full md:max-w-[80%]">
                <div className="md:col-span-5">
                  <label className="block text-[11px] font-black text-[#222325] uppercase tracking-widest mb-1.5">
                    Name <span className="text-[#1dbf73]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your full name"
                    className="w-full bg-white border-2 border-[#222325] px-[14px] py-1.5 text-[14px] outline-none transition-all placeholder:text-slate-400 h-10"
                  />
                </div>
                <div className="md:col-span-7">
                  <label className="block text-[11px] font-black text-[#222325] uppercase tracking-widest mb-1.5">
                    Email Address <span className="text-[#1dbf73]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white border-2 border-[#222325] px-[14px] py-1.5 text-[14px] outline-none transition-all placeholder:text-slate-400 h-10"
                  />
                </div>
              </div>

              <div className="flex items-center gap-2 mb-10">
                <div className="text-[#1dbf73] shrink-0">
                  <CheckCircle2 size={18} />
                </div>
                <p className="text-[13px] text-slate-500 font-medium">
                  Our professionals will contact you via email:{" "}
                  <span className="font-bold text-[#222325]">{emailValue}</span>
                </p>
              </div>

              <div>
                {!isDetailsExpanded ? (
                  <button
                    type="button"
                    onClick={() => setIsDetailsExpanded(true)}
                    className="flex items-center gap-2 text-[13px] font-black text-[#222325] uppercase tracking-widest hover:text-[#1dbf73] transition-colors border-b-2 border-[#222325]"
                  >
                    Add detailed project info{" "}
                    <ChevronDown size={14} />
                  </button>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="overflow-hidden"
                  >
                    <textarea
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Share additional info like specific instructions, timelines and budget."
                      className="w-full bg-white border-2 border-[#222325] px-[14px] py-3 text-[14px] outline-none transition-all min-h-[138px] max-h-[250px] resize-y placeholder:text-slate-400"
                    />
                  </motion.div>
                )}
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 px-6 py-3 md:px-[42px] flex flex-col md:flex-row items-center justify-between gap-4 bg-white shrink-0">
              <p className="text-[11px] text-slate-500 max-w-[500px] leading-relaxed">
                By clicking "Get Matched" you agree to the{" "}
                <a
                  href="#"
                  className="underline font-medium hover:text-black transition-colors"
                >
                  Referr Marketplace Terms of Use
                </a>{" "}
                and that Referr may share your information to enable
                professionals to contact you about your project.
              </p>
              <button
                onClick={handleSubmit}
                className="w-full md:w-auto shrink-0 bg-[#222325] text-white font-black uppercase tracking-widest py-3 px-10 hover:bg-black transition-colors text-[14px]"
              >
                Get Matched
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
