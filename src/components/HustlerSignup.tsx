import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, AlertCircle, Clock } from "lucide-react";
import Navbar from "./Navbar";
import { openGoogleAuthPopup, signupWithEmail } from "../services/authService";

export default function HustlerSignup() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    terms: false,
    promo: false,
  });
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!formData.firstName || !formData.lastName || !formData.email || !formData.password) {
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
        userType: "hustler"
      });

      if (session) {
        localStorage.setItem("hustlerName", session.name);
        localStorage.setItem("userType", "hustler");
        localStorage.setItem("userEmail", session.email);
        if (session.picture) {
          localStorage.setItem("userPicture", session.picture);
        }
        localStorage.setItem("isAuthenticated", "true");
        navigate("/welcome");
      } else {
        localStorage.setItem(
          "hustlerName",
          `${formData.firstName} ${formData.lastName}`
        );
        localStorage.setItem("userType", "hustler");
        localStorage.setItem("isAuthenticated", "true");
        navigate("/welcome");
      }
    } catch (err) {
      console.error(err);
      localStorage.setItem(
        "hustlerName",
        `${formData.firstName} ${formData.lastName}`
      );
      localStorage.setItem("userType", "hustler");
      localStorage.setItem("isAuthenticated", "true");
      navigate("/welcome");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = () => {
    setLoading(true);
    openGoogleAuthPopup("hustler", (session) => {
      localStorage.setItem("hustlerName", session.name);
      localStorage.setItem("userType", "hustler");
      localStorage.setItem("userEmail", session.email);
      if (session.picture) {
        localStorage.setItem("userPicture", session.picture);
      }
      localStorage.setItem("isAuthenticated", "true");
      setLoading(false);
      navigate("/welcome");
    });
  };

  return (
    <div className="min-h-screen bg-white font-sans text-[#404145]">
      <Navbar variant="skinny" showClientHelper={true} showLoginLink={true} />

      <main className="w-full flex-1 flex flex-col items-center pt-24 md:pt-24 pb-16 px-4">
        <div className="w-full max-w-[480px]">
          <header className="text-center mb-8">
            <h2 className="text-[28px] font-black text-[#404145] tracking-tight">
              Sign up to find work you love
            </h2>
          </header>

          {/* SSO Buttons */}
          <div className="space-y-3 mb-6">
            <button 
              type="button"
              onClick={handleGoogleSignup}
              className="flex items-center justify-center gap-3 w-full h-[48px] border border-[#c5c6c9] rounded-[4px] hover:border-[#1dbf73] transition-colors bg-white font-bold text-[15px] text-[#404145] shadow-sm cursor-pointer"
            >
              <svg className="w-5 h-5" viewBox="0 0 18 18">
                <path
                  fill="#4285F4"
                  d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z"
                />
                <path
                  fill="#34A853"
                  d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.964 10.71a5.41 5.41 0 0 1 0-3.42V4.958H.957a8.991 8.991 0 0 0 0 8.084l3.007-2.332z"
                />
                <path
                  fill="#EA4335"
                  d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29c.708-2.127 2.692-3.71 5.036-3.71z"
                />
              </svg>
              Continue with Google
            </button>
          </div>

          <div className="relative flex items-center justify-center my-6">
            <div className="absolute inset-x-0 top-1/2 border-t border-[#e4e5e7]"></div>
            <span className="relative px-4 bg-white text-[#62646a] font-bold text-[13px] uppercase tracking-wider">
              or
            </span>
          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="firstName"
                  className="text-[14px] font-bold text-[#404145] mb-1.5 block"
                >
                  First name
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  className="w-full h-[48px] px-4 border border-[#c5c6c9] rounded-[4px] focus:outline-none focus:border-[#1dbf73] transition-colors text-[16px] text-[#404145] font-medium shadow-sm"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                />
              </div>
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="lastName"
                  className="text-[14px] font-bold text-[#404145] mb-1.5 block"
                >
                  Last name
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  className="w-full h-[48px] px-4 border border-[#c5c6c9] rounded-[4px] focus:outline-none focus:border-[#1dbf73] transition-colors text-[16px] text-[#404145] font-medium shadow-sm"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="email"
                className="text-[14px] font-bold text-[#404145] mb-1.5 block"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="you@example.com"
                className="w-full h-[48px] px-4 border border-[#c5c6c9] rounded-[4px] focus:outline-none focus:border-[#1dbf73] transition-colors text-[16px] text-[#404145] font-medium shadow-sm"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>

            <div className="flex flex-col gap-1">
              <label
                htmlFor="password"
                className="text-[14px] font-bold text-[#404145] mb-1.5 block"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full h-[48px] px-4 border border-[#c5c6c9] rounded-[4px] focus:outline-none focus:border-[#1dbf73] transition-colors text-[16px] text-[#404145] font-medium shadow-sm"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>

            <div className="space-y-4 pt-2">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  className="mt-1 w-4 h-4 accent-[#1dbf73]"
                  checked={formData.promo}
                  onChange={(e) =>
                    setFormData({ ...formData, promo: e.target.checked })
                  }
                />
                <span className="text-[14px] text-slate-600 font-medium leading-snug">
                  Send me helpful emails to find rewarding work.
                </span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  className="mt-1 w-4 h-4 accent-[#1dbf73]"
                  checked={formData.terms}
                  onChange={(e) =>
                    setFormData({ ...formData, terms: e.target.checked })
                  }
                />
                <span className="text-[14px] text-slate-600 font-medium leading-snug">
                  Yes, I agree to the{" "}
                  <Link
                    to="/terms"
                    className="text-[#1dbf73] font-semibold hover:underline underline-offset-2"
                  >
                    Terms of Service
                  </Link>
                  ,{" "}
                  <Link
                    to="/agreement"
                    className="text-[#1dbf73] font-semibold hover:underline underline-offset-2"
                  >
                    User Agreement
                  </Link>
                  , and{" "}
                  <Link
                    to="/privacy"
                    className="text-[#1dbf73] font-semibold hover:underline underline-offset-2"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            </div>

            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="bg-red-50 p-3 rounded-[4px] text-red-600 border border-red-100 text-[14px] font-medium"
                >
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className={`w-full h-[52px] rounded-[4px] font-black text-[16px] transition-all shadow-md active:scale-[0.98] ${
                loading
                  ? "bg-[#1dbf73] opacity-40 text-white cursor-not-allowed"
                  : "bg-[#1dbf73] text-white hover:bg-[#19a463] hover:shadow-lg"
              }`}
            >
              {loading ? (
                <Loader2 className="w-5 h-5 animate-spin mx-auto" />
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}
