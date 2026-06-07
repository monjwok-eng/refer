import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, AlertCircle, Clock } from "lucide-react";
import Navbar from "./Navbar";
import { openGoogleAuthPopup, signupWithEmail } from "../services/authService";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";

export default function BusinessSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    companyName: "",
    terms: false,
    promo: false,
  });
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email ||
      !formData.password ||
      !formData.companyName
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    if (!formData.terms) {
      setError("You must agree to the Terms of Service to create an account.");
      return;
    }

    setLoading(true);
    try {
      const session = await signupWithEmail({
        email: formData.email,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        userType: "business",
        companyName: formData.companyName
      });

      if (session) {
        localStorage.setItem("businessName", session.businessName || formData.companyName);
        localStorage.setItem("representativeName", session.name);
        localStorage.setItem("userEmail", session.email);
        if (session.picture) {
          localStorage.setItem("userPicture", session.picture);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", "business");
        navigate("/onboarding/business");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to register. Please check your credentials and try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    setError(null);
    openGoogleAuthPopup(
      "business",
      (session) => {
        localStorage.setItem("businessName", session.businessName || "Arial Partner Co");
        localStorage.setItem("representativeName", session.name);
        localStorage.setItem("userEmail", session.email);
        if (session.picture) {
          localStorage.setItem("userPicture", session.picture);
        }
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", "business");
        setLoading(false);
        navigate("/onboarding/business");
      },
      (errMessage) => {
        setError(errMessage);
        setLoading(false);
      }
    );
  };

  const isCredentialsComplete =
    formData.firstName.trim().length > 0 &&
    formData.lastName.trim().length > 0 &&
    formData.email.trim().length > 0 &&
    formData.password.trim().length > 0 &&
    formData.companyName.trim().length > 0 &&
    formData.terms === true;

  return (
    <div className="relative min-h-screen w-full flex flex-row justify-center pt-14 pb-14 px-6 sm:px-10 bg-[#FAFAFA] overflow-hidden">
      {/* Honeycomb Geometric Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] sm:opacity-[0.05] select-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="honeycomb-business" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.85)">
              <path d="M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
              <path d="M28 48.5 L56 64.66 L56 97 L28 113.16 L0 97 L0 64.66 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb-business)" />
        </svg>
      </div>

      {/* Soft warm/pink gradient glow behind the card for visual depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#F092DD]/5 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="flex flex-row items-center z-10 w-full max-w-[480px]">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full flex flex-col items-center gap-6"
        >
          {/* Exact custom black SVG logo */}
          <div className="flex justify-center items-center select-none">
            <img
              src={logoIcon}
              alt="Referr Icon"
              className="h-32 w-32 object-contain scale-[1.2]"
              referrerPolicy="no-referrer"
            />
          </div>

          <header className="text-center mb-2">
            <h2 className="text-2xl font-semibold text-gray-950 tracking-tight">
              Sign up to hire top talent
            </h2>
          </header>

          <form onSubmit={handleSignup} className="w-full flex flex-col gap-4">
            
            {/* Google Authentication Button nested inside form just like in SignIn */}
            <div className="flex flex-row justify-center">
              <div style={{ height: "40px" }}>
                <div className="S9gUrf-YoZ4jf relative">
                  <button
                    type="button"
                    onClick={handleGoogleSignup}
                    className="flex items-center justify-center cursor-pointer transition-all active:scale-[0.98]"
                    style={{
                      display: "flex",
                      position: "relative",
                      top: "0px",
                      left: "0px",
                      height: "44px",
                      width: "347px",
                      border: "0px",
                      margin: "-2px -10px",
                      backgroundColor: "#131314",
                      color: "#fff",
                      borderRadius: "4px",
                      padding: "0 12px",
                      fontFamily: "Roboto, arial, sans-serif",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                  >
                    <div style={{ marginRight: "12px", display: "flex", alignItems: "center" }}>
                      <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-[18px] w-[18px]">
                        <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                        <path fill="#4285F4" d="M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.55 2.87-2.22 5.37-4.72 7.04l7.35 5.69C43.71 36.63 46.5 30.93 46.5 24z"></path>
                        <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"></path>
                        <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.35-5.69c-2.22 1.48-5.07 2.38-8.54 2.38-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                      </svg>
                    </div>
                    <span className="text-sm font-medium">Continue with Google</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Separator line */}
            <div className="py-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-[#FAFAFA] text-sm text-gray-500">or</span>
                </div>
              </div>
            </div>

            {/* Company Name container */}
            <div>
              <div className="w-full isolate">
                <label htmlFor="companyName" className="block text-sm font-medium text-gray-900 mb-2">
                  Company Name<span>*</span>
                </label>
                <div className="relative flex min-w-0 w-full items-center">
                  <input
                    id="companyName"
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    placeholder="Acme Corporation"
                    className="flex-grow relative border-gray-300 hover:border-gray-400 text-gray-900 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:shadow-[0px_0px_0px_4px_#F092DD/10,0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:border-[#F092DD] focus:ring-0 text-sm placeholder-gray-400 bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* First & Last name inputs */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="w-full isolate">
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                    First Name<span>*</span>
                  </label>
                  <div className="relative flex min-w-0 w-full items-center">
                    <input
                      id="firstName"
                      type="text"
                      required
                      placeholder="Jane"
                      className="flex-grow relative border-gray-300 hover:border-gray-400 text-gray-900 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:shadow-[0px_0px_0px_4px_#F092DD/10,0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:border-[#F092DD] focus:ring-0 text-sm placeholder-gray-400 bg-white focus:outline-none transition-all"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div>
                <div className="w-full isolate">
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                    Last Name<span>*</span>
                  </label>
                  <div className="relative flex min-w-0 w-full items-center">
                    <input
                      id="lastName"
                      type="text"
                      required
                      placeholder="Doe"
                      className="flex-grow relative border-gray-300 hover:border-gray-400 text-gray-900 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:shadow-[0px_0px_0px_4px_#F092DD/10,0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:border-[#F092DD] focus:ring-0 text-sm placeholder-gray-400 bg-white focus:outline-none transition-all"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Email Field with customized isolate class */}
            <div>
              <div className="w-full isolate">
                <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                  Business Email<span>*</span>
                </label>
                <div className="relative flex min-w-0 w-full items-center">
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    autoComplete="email"
                    className="flex-grow relative border-gray-300 hover:border-gray-400 text-gray-900 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:shadow-[0px_0px_0px_4px_#F092DD/10,0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:border-[#F092DD] focus:ring-0 text-sm placeholder-gray-400 bg-white focus:outline-none transition-all"
                    style={{ height: "inherit" }}
                  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="w-full isolate">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900 mb-2">
                  Password<span>*</span>
                </label>
                <div className="relative flex min-w-0 w-full items-center">
                  <input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="••••••••"
                    className="flex-grow relative border-gray-300 hover:border-gray-400 text-gray-900 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:shadow-[0px_0px_0px_4px_#F092DD/10,0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:border-[#F092DD] focus:ring-0 text-sm placeholder-gray-400 bg-white focus:outline-none transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Checkboxes styled in pink */}
            <div className="space-y-3 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-[#ec4899] h-4 w-4 rounded text-[#ec4899] border-gray-300"
                  checked={formData.promo}
                  onChange={(e) => setFormData({ ...formData, promo: e.target.checked })}
                />
                <span className="text-xs text-slate-500 font-normal leading-snug">
                  Send me hiring tips and marketing updates.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 accent-[#ec4899] h-4 w-4 rounded text-[#ec4899] border-gray-300"
                  checked={formData.terms}
                  onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
                />
                <span className="text-xs text-slate-500 font-normal leading-snug">
                  Yes, I agree to the{" "}
                  <Link to="/terms" className="text-[#ec4899] hover:text-[#db2777] font-semibold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link to="/privacy" className="text-[#ec4899] hover:text-[#db2777] font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            {/* Errors */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden w-full"
                >
                  <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 p-2.5 rounded-md">
                    {error}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Account creation button - transitions form to black once all credentials are typed in */}
            <button
              type="submit"
              disabled={!isCredentialsComplete || loading}
              className={`border font-medium focus:outline-none focus:border-transparent inline-flex items-center whitespace-nowrap transition-all duration-300 focus:ring-1 rounded-md justify-center py-2 px-3 text-sm w-full mt-2 ${
                isCredentialsComplete
                  ? "bg-black hover:bg-neutral-800 text-white border-black cursor-pointer shadow-sm active:scale-[0.98]"
                  : "bg-[#E5E7EB] text-gray-400 border-gray-200 cursor-not-allowed opacity-80"
              }`}
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Create Business Account"
              )}
            </button>
          </form>

          {/* Login redirection links */}
          <div className="flex flex-col text-left space-y-6 w-full pt-4">
            <span className="text-center text-sm text-gray-500 font-normal">
              Looking to join as an expert?{" "}
              <Link to="/signup/hustler" className="text-[#ec4899] hover:text-[#db2777] underline font-semibold transition-colors">
                Sign up as Hustler
              </Link>
            </span>
            <span className="text-center text-sm text-gray-500 font-normal pt-2">
              Already have a referr account?{" "}
              <Link to="/signin" className="text-[#ec4899] hover:text-[#db2777] underline font-semibold transition-colors">
                Log in
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
