import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { loginWithEmail, openGoogleAuthPopup } from "../services/authService";
import logoIcon from "../assets/images/ChatGPT Image Jun 1, 2026, 01_07_17 AM.png";

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const session = await loginWithEmail(email, password);
      if (session) {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", session.userType);
        localStorage.setItem("userEmail", session.email);
        if (session.userType === "business") {
          localStorage.setItem("businessName", session.businessName || "Business");
          localStorage.setItem("representativeName", session.name);
        } else {
          localStorage.setItem("hustlerName", session.name);
        }
        if (session.picture) {
          localStorage.setItem("userPicture", session.picture);
        }
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Incorrect email or password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsLoading(true);
    setError(null);
    openGoogleAuthPopup(
      "general",
      (session) => {
        localStorage.setItem("isAuthenticated", "true");
        localStorage.setItem("userType", session.userType);
        localStorage.setItem("userEmail", session.email);
        if (session.userType === "business") {
          localStorage.setItem("businessName", session.businessName || "Business");
          localStorage.setItem("representativeName", session.name);
        } else {
          localStorage.setItem("hustlerName", session.name);
        }
        if (session.picture) {
          localStorage.setItem("userPicture", session.picture);
        }
        setIsLoading(false);
        navigate("/dashboard");
      },
      (errMessage) => {
        setError(errMessage);
        setIsLoading(false);
      }
    );
  };

  const isCredentialsComplete = email.trim().length > 0 && password.trim().length > 0;

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-6 bg-[#FAFAFA] overflow-hidden">
      {/* Honeycomb Geometric Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04] sm:opacity-[0.05] select-none z-0">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="honeycomb" width="56" height="97" patternUnits="userSpaceOnUse" patternTransform="scale(0.85)">
              <path d="M28 0 L56 16.16 L56 48.5 L28 64.66 L0 48.5 L0 16.16 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
              <path d="M28 48.5 L56 64.66 L56 97 L28 113.16 L0 97 L0 64.66 Z" fill="none" stroke="#000000" strokeWidth="1.2" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#honeycomb)" />
        </svg>
      </div>

      {/* Soft gradient glow behind the card for visual depth */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-gradient-to-tr from-[#F092DD]/5 to-transparent blur-[120px] rounded-full pointer-events-none z-0" />

      <div className="flex flex-col items-center z-10 w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="max-w-md flex flex-col w-full items-center gap-6"
        >
          {/* logo container with no background */}
          <div className="flex justify-center items-center select-none">
            <img
              src={logoIcon}
              alt="referr logo"
              className="h-24 w-24 md:h-28 md:w-28 object-contain scale-[1.2]"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Heading */}
          <div className="text-center flex flex-col space-y-2 w-full">
            <h4 className="text-2xl text-zinc-900 font-semibold tracking-tight">
              Log in to referr
            </h4>
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
                <p className="text-sm font-medium text-red-600 bg-red-50 border border-red-100 p-2.5 rounded-md text-center">
                  {error}
                </p>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSignIn} className="w-full flex flex-col gap-4">
            {/* Google Authentication Button styled exactly like the Google standard GSI filled_black */}
            <div className="flex flex-row justify-center w-full">
              <button
                type="button"
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center cursor-pointer transition-all active:scale-[0.98] hover:bg-neutral-800"
                style={{
                  display: "flex",
                  position: "relative",
                  height: "44px",
                  width: "347px",
                  maxWidth: "100%",
                  border: "0px",
                  backgroundColor: "#131314",
                  color: "#fff",
                  borderRadius: "4px",
                  padding: "0 16px",
                  fontFamily: "Roboto, arial, sans-serif",
                  fontSize: "14px",
                  fontWeight: 500,
                }}
                title="Sign in with Google Button"
              >
                <div style={{ marginRight: "12px", display: "flex", alignItems: "center" }}>
                  <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="h-[18px] w-[18px]">
                    <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                    <path fill="#4285F4" d="M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.55 2.87-2.22 5.37-4.72 7.04l7.35 5.69C43.71 36.63 46.5 30.93 46.5 24z"></path>
                    <path fill="#FBBC05" d="M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z"></path>
                    <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.35-5.69c-2.22 1.48-5.07 2.38-8.54 2.38-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  </svg>
                </div>
                <span className="text-sm font-medium">Sign in with Google</span>
              </button>
            </div>

            {/* Separator */}
            <div className="py-2">
              <div className="relative">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-zinc-200"></div>
                </div>
                <div className="relative flex justify-center">
                  <span className="px-2 bg-[#FAFAFA] text-sm text-zinc-500">or</span>
                </div>
              </div>
            </div>

            {/* Email field */}
            <div>
              <div className="w-full isolate">
                <div className="flex flex-row justify-between">
                  <label htmlFor="text-input-email" className="flex items-center gap-1 text-sm font-medium text-zinc-900">
                    Email
                  </label>
                </div>
                <div className="mt-2">
                  <div className="relative flex min-w-0 w-full items-center">
                    <input
                      id="text-input-email"
                      placeholder="name@email.com"
                      required
                      className="flex-grow relative border-zinc-200 hover:border-zinc-300 text-zinc-900 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:shadow-[0px_0px_0px_4px_#E5E7EB,0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:border-zinc-300 focus:ring-0 text-sm placeholder-gray-400 bg-white"
                      autoComplete="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      style={{ height: "inherit" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Password field - aligned in style */}
            <div>
              <div className="w-full isolate">
                <div className="flex flex-row justify-between">
                  <label htmlFor="text-input-password" className="flex items-center gap-1 text-sm font-medium text-zinc-900">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <div className="relative flex min-w-0 w-full items-center">
                    <input
                      id="text-input-password"
                      placeholder="••••••••"
                      required
                      className="flex-grow relative border-zinc-200 hover:border-zinc-300 text-zinc-900 appearance-none block w-full px-3 py-2 border rounded-md shadow-sm focus:shadow-[0px_0px_0px_4px_#E5E7EB,0px_1px_2px_0px_rgba(0,0,0,0.05)] focus:border-zinc-300 focus:ring-0 text-sm placeholder-gray-400 bg-white"
                      autoComplete="current-password"
                      type="password"
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      style={{ height: "inherit" }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit button following matching disabled / active styles */}
            <button
              type="submit"
              disabled={!isCredentialsComplete || isLoading}
              data-display-disabled={(!isCredentialsComplete || isLoading) ? "true" : "false"}
              className={`border font-medium focus:outline-none focus:border-transparent inline-flex items-center justify-center whitespace-nowrap transition-colors duration-200 focus:ring-1 rounded-md py-2 px-3 text-sm w-full mt-3 ${
                (!isCredentialsComplete || isLoading)
                  ? "bg-[#E5E7EB] text-gray-400 border-zinc-200 cursor-not-allowed"
                  : "bg-black text-white hover:bg-neutral-800 border-black cursor-pointer shadow-sm active:scale-[0.98]"
              }`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                "Sign in"
              )}
            </button>
          </form>

          {/* Links */}
          <div className="text-center w-full mt-2">
            <Link
              className="block text-[#ec4899] hover:text-[#db2777] font-semibold text-sm hover:underline transition-colors"
              to="/request_password_reset"
            >
              Forgot your password?
            </Link>
          </div>

          <div className="flex flex-col text-left space-y-6 w-full">
            <span className="text-center text-sm text-zinc-500 font-normal">
              Don't have a referr account?{" "}
              <Link
                className="text-[#ec4899] hover:text-[#db2777] underline font-semibold transition-colors"
                to="/join"
              >
                Create one
              </Link>
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
