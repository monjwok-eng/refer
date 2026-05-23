import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  app.set("trust proxy", true);
  const PORT = 3000;

  app.use(express.json());

  const ai = new GoogleGenAI({ 
    apiKey: process.env.GEMINI_API_KEY || "",
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      }
    }
  });

  // Helper to handle Gemini errors consistently
  const handleGeminiError = (res: any, error: any, serviceName: string) => {
    console.error(`${serviceName} Error:`, error);
    if (error.status === 429 || error.message?.includes('quota') || error.message?.includes('429')) {
      return res.status(429).json({ 
        error: "QUOTA_EXCEEDED", 
        message: "I've hit my capacity for the moment. Please wait about 60 seconds before trying again." 
      });
    }
    res.status(500).json({ error: "API_ERROR", message: error.message });
  };

  // --- Authentication and Cookie Session Routes ---

  // Helper to parse session from cookie
  const getSessionFromCookie = (req: any) => {
    const cookieHeader = req.headers.cookie || "";
    const cookies = Object.fromEntries(
      cookieHeader.split(";").map((c: string) => {
        const [k, ...v] = c.trim().split("=");
        return [k, decodeURIComponent(v.join("="))];
      })
    );
    const sessionStr = cookies["referr_session"];
    if (!sessionStr) return null;
    try {
      return JSON.parse(sessionStr);
    } catch {
      return null;
    }
  };

  // Get current session
  app.get("/api/auth/me", (req, res) => {
    const session = getSessionFromCookie(req);
    if (session) {
      res.json({ authenticated: true, session });
    } else {
      res.json({ authenticated: false });
    }
  });

  // Traditional sign-in with cookie persistence
  app.post("/api/auth/signin", (req, res) => {
    const { email } = req.body;
    
    const isBusiness = email.includes("business") || email.includes("company") || email.includes("partner");
    const role: "business" | "hustler" = isBusiness ? "business" : "hustler";
    
    const userSession = {
      isAuthenticated: true,
      email: email,
      name: email.split("@")[0],
      picture: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
      userType: role,
      businessName: role === "business" ? "Aria Partner Co" : undefined,
    };

    res.setHeader(
      "Set-Cookie",
      `referr_session=${encodeURIComponent(JSON.stringify(userSession))}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=604800`
    );
    res.json({ success: true, session: userSession });
  });

  // Traditional sign-up with cookie persistence
  app.post("/api/auth/signup", (req, res) => {
    const { email, firstName, lastName, userType, companyName } = req.body;
    const finalName = `${firstName} ${lastName}`.trim() || email.split("@")[0];

    const userSession = {
      isAuthenticated: true,
      email: email,
      name: finalName,
      picture: `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`,
      userType: userType === "business" ? "business" : "hustler",
      businessName: userType === "business" ? companyName || "Aria Partner Co" : undefined,
    };

    res.setHeader(
      "Set-Cookie",
      `referr_session=${encodeURIComponent(JSON.stringify(userSession))}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=604800`
    );
    res.json({ success: true, session: userSession });
  });

  // Log-out / Clear cookie
  app.post("/api/auth/logout", (req, res) => {
    res.setHeader(
      "Set-Cookie",
      "referr_session=; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=0"
    );
    res.json({ success: true });
  });

  // Google OAuth URL generator
  app.get("/api/auth/google/url", (req, res) => {
    const { origin, role } = req.query;
    const client_id = process.env.GOOGLE_CLIENT_ID;

    if (client_id) {
      // Real Google OAuth Flow
      const providerAuthUrl = "https://accounts.google.com/o/oauth2/v2/auth";
      const redirectUri = `${origin || "http://localhost:3000"}/auth/google/callback`;
      const stateStr = `${role || "general"}|${origin || "http://localhost:3000"}`;
      const params = new URLSearchParams({
        client_id: client_id,
        redirect_uri: redirectUri,
        response_type: "code",
        scope: "openid email profile",
        state: stateStr,
        prompt: "select_account"
      });
      res.json({ url: `${providerAuthUrl}?${params}` });
    } else {
      // High-Fidelity Sandbox Mock Flow URL
      const mockLoginUrl = `${origin || "http://localhost:3000"}/auth/google/mock-login?origin=${encodeURIComponent(origin as string || "")}&role=${role || "general"}`;
      res.json({ url: mockLoginUrl });
    }
  });

  // Google SSO Mock Interactive Screen
  app.get("/auth/google/mock-login", (req, res) => {
    const { origin, role } = req.query;
    res.send(`
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Sign in - Google Accounts</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap');
    body {
      font-family: 'Roboto', sans-serif;
    }
  </style>
</head>
<body class="bg-[#f0f4f9] min-h-screen flex items-center justify-center p-4">
  <div class="bg-white rounded-[24px] max-w-[440px] w-full p-8 md:p-10 shadow-[0_4px_16px_rgba(0,0,0,0.08)]">
    <!-- Google Logo -->
    <div class="flex flex-col items-center mb-6">
      <svg class="w-12 h-12 mb-4" viewBox="0 0 24 24">
        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.67-.35-1.37-.35-2.09H5.84z"/>
        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
      </svg>
      <h1 class="text-[24px] font-medium text-[#1f1f1f] text-center mb-1">Sign in with Google</h1>
      <p class="text-[14px] text-gray-500 text-center">to continue to <span class="text-[#1dbf73] font-semibold">Referr</span></p>
    </div>

    <!-- Sandwich Warning Sandbox banner -->
    <div class="mb-5 px-4 py-2.5 bg-emerald-50 rounded-lg border border-emerald-200 text-[12.5px] text-emerald-800 flex items-start gap-2.5">
      <span class="text-[15px] mt-0.5">🟢</span>
      <span><strong>Sandbox Mode Active:</strong> Standard Google credentials are not configured. We provide real cookies and state sync!</span>
    </div>

    <!-- Account Chooser List -->
    <div class="space-y-3 mb-5">
      <button onclick="selectProfile('nyamedmeddi@gmail.com', 'Nyamed Meddi', 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nyamed')" class="w-full flex items-center gap-3 p-3 border-2 border-[#1dbf73] bg-[#1dbf73]/5 rounded-xl transition-all text-left font-sans group">
        <img class="w-10 h-10 rounded-full border border-gray-100 group-hover:scale-105 transition-transform" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Nyamed" alt="Nyamed">
        <div class="flex-1">
          <p class="text-[14px] font-semibold text-[#1f1f1f]">Nyamed Meddi</p>
          <p class="text-[12px] text-gray-500">nyamedmeddi@gmail.com</p>
        </div>
        <span class="text-[11px] font-medium text-[#1dbf73] uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded">Primary</span>
      </button>

      <button onclick="selectProfile('fiverr.referrer@example.com', 'Joe Referrer', 'https://api.dicebear.com/7.x/adventurer/svg?seed=Joe')" class="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left font-sans group">
        <img class="w-10 h-10 rounded-full border border-gray-100 group-hover:scale-105 transition-transform" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Joe" alt="Joe">
        <div class="flex-1">
          <p class="text-[14px] font-semibold text-[#1f1f1f]">Joe Referrer</p>
          <p class="text-[12px] text-gray-500">fiverr.referrer@example.com</p>
        </div>
        <span class="text-[11px] font-medium text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">Hustler</span>
      </button>

      <button onclick="selectProfile('arial.ai.partner@example.com', 'Sarah Business Owner', 'https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah')" class="w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left font-sans group">
        <img class="w-10 h-10 rounded-full border border-gray-100 group-hover:scale-105 transition-transform" src="https://api.dicebear.com/7.x/adventurer/svg?seed=Sarah" alt="Sarah">
        <div class="flex-1">
          <p class="text-[14px] font-semibold text-[#1f1f1f]">Sarah Business Owner</p>
          <p class="text-[12px] text-gray-500">arial.ai.partner@example.com</p>
        </div>
        <span class="text-[11px] font-medium text-gray-400 uppercase tracking-widest bg-gray-50 px-2 py-1 rounded">Business</span>
      </button>
    </div>

    <!-- Toggle Custom Account Form -->
    <button onclick="toggleCustomForm()" class="text-[13.5px] font-semibold text-[#4285F4] hover:underline flex items-center gap-1.5 mb-5">
      <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
      </svg>
      Or use custom credentials
    </button>

    <!-- Custom Account Input -->
    <div id="custom-form" class="hidden space-y-3 mb-5 border-t border-gray-100 pt-4">
      <div>
        <label class="text-[11px] font-bold text-gray-500 block mb-1">Custom Email</label>
        <input id="custom-email" type="email" placeholder="name@domain.com" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4285F4] text-[13.5px]">
      </div>
      <div>
        <label class="text-[11px] font-bold text-gray-500 block mb-1">Custom Name</label>
        <input id="custom-name" type="text" placeholder="Johnathan Doe" class="w-full px-3 py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#4285F4] text-[13.5px]">
      </div>
    </div>

    <!-- Role Picker for account setup -->
    <div class="border-t border-gray-150 pt-4 mb-6">
      <span class="text-[13px] font-bold text-gray-600 mb-2.5 block">Select Referr Account Role:</span>
      <div class="grid grid-cols-2 gap-3">
        <button id="role-hustler" onclick="setRole('hustler')" class="flex flex-col items-center justify-center p-3.5 border border-gray-200 rounded-xl hover:border-gray-300 transition-all font-sans">
          <span class="text-[20px] mb-1">🎒</span>
          <span class="text-[13px] font-bold text-gray-800">Hustler / Earner</span>
        </button>
        <button id="role-business" onclick="setRole('business')" class="flex flex-col items-center justify-center p-3.5 border border-gray-200 rounded-xl hover:border-gray-300 transition-all font-sans">
          <span class="text-[20px] mb-1">🏢</span>
          <span class="text-[13px] font-bold text-gray-800">Business / Hirer</span>
        </button>
      </div>
    </div>

    <!-- CTA Button -->
    <button onclick="submitGoogleLogin()" class="w-full h-11 bg-[#1dbf73] hover:bg-[#19a463] text-white font-bold rounded-lg transition-colors shadow-md text-[14px] cursor-pointer">
      Continue with Selected Credentials
    </button>
  </div>

  <script>
    let activeRole = 'hustler';
    let selectedEmail = 'nyamedmeddi@gmail.com';
    let selectedName = 'Nyamed Meddi';
    let selectedPicture = 'https://api.dicebear.com/7.x/adventurer/svg?seed=Nyamed';
    let showCustom = false;

    // Get default state from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const initialRole = urlParams.get('role');
    const targetOrigin = urlParams.get('origin');

    function setRole(role) {
      activeRole = role;
      const bHustler = document.getElementById('role-hustler');
      const bBusiness = document.getElementById('role-business');
      if (role === 'hustler') {
        bHustler.className = "flex flex-col items-center justify-center p-3.5 border-2 border-[#1dbf73] bg-[#1dbf73]/5 rounded-xl transition-all font-sans";
        bBusiness.className = "flex flex-col items-center justify-center p-3.5 border border-gray-200 rounded-xl hover:border-gray-300 transition-all font-sans";
      } else {
        bBusiness.className = "flex flex-col items-center justify-center p-3.5 border-2 border-[#1dbf73] bg-[#1dbf73]/5 rounded-xl transition-all font-sans";
        bHustler.className = "flex flex-col items-center justify-center p-3.5 border border-gray-200 rounded-xl hover:border-gray-300 transition-all font-sans";
      }
    }

    if (initialRole && (initialRole === 'hustler' || initialRole === 'business')) {
      setRole(initialRole);
    } else {
      setRole('hustler');
    }

    function selectProfile(email, name, picture) {
      selectedEmail = email;
      selectedName = name;
      selectedPicture = picture;
      showCustom = false;
      document.getElementById('custom-form').classList.add('hidden');
      
      // Auto-switch role for typical mock accounts
      if (email.includes('referrer')) {
        setRole('hustler');
      } else if (email.includes('partner') || email.includes('business')) {
        setRole('business');
      }
      
      // Update highlights
      document.querySelectorAll('button[onclick^="selectProfile"]').forEach(el => {
        el.className = "w-full flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-left font-sans group";
      });
      event.currentTarget.className = "w-full flex items-center gap-3 p-3 border-2 border-[#1dbf73] bg-[#1dbf73]/5 rounded-xl transition-all text-left font-sans group";
    }

    function toggleCustomForm() {
      showCustom = !showCustom;
      const f = document.getElementById('custom-form');
      if (showCustom) {
        f.classList.remove('hidden');
      } else {
        f.classList.add('hidden');
      }
    }

    function submitGoogleLogin() {
      let email = selectedEmail;
      let name = selectedName;
      let picture = selectedPicture;

      if (showCustom) {
        const customEmail = document.getElementById('custom-email').value.trim();
        const customName = document.getElementById('custom-name').value.trim();
        if (!customEmail) {
          alert("Please specify a custom email address.");
          return;
        }
        email = customEmail;
        name = customName || customEmail.split('@')[0];
        picture = 'https://api.dicebear.com/7.x/adventurer/svg?seed=' + encodeURIComponent(name);
      }

      const redirectUri = '/auth/google/callback?code=mock&email=' + encodeURIComponent(email) +
                          '&name=' + encodeURIComponent(name) +
                          '&role=' + encodeURIComponent(activeRole) +
                          '&picture=' + encodeURIComponent(picture) +
                          '&origin=' + encodeURIComponent(targetOrigin || '');
      
      window.location.href = redirectUri;
    }
  </script>
</body>
</html>
    `);
  });

  // Google OAuth callback endpoint
  app.get("/auth/google/callback", async (req, res) => {
    try {
      const { code, email, name, role, picture } = req.query;

      let finalEmail = "";
      let finalName = "";
      let finalPicture = "";
      let finalRole = "hustler";

      if (code === "mock") {
        finalEmail = (email as string) || "";
        finalName = (name as string) || "";
        finalPicture = (picture as string) || "";
        finalRole = (role as string) || "hustler";
      } else if (code) {
        // Exchange code using Google APIs
        const client_id = process.env.GOOGLE_CLIENT_ID;
        const client_secret = process.env.GOOGLE_CLIENT_SECRET;
        
        const stateStr = (req.query.state as string) || "";
        const stateParts = stateStr.split("|");
        const finalRoleFromState = stateParts[0] || "general";
        const resolvedOrigin = stateParts[1] || "";

        let redirectUri = "";
        if (resolvedOrigin) {
          redirectUri = `${resolvedOrigin}/auth/google/callback`;
        } else {
          // Fallback if state is malformed
          let proto = req.headers["x-forwarded-proto"] || req.protocol;
          if (typeof proto === "string" && proto.includes(",")) {
            proto = proto.split(",")[0].trim();
          }
          const host = req.get("host");
          redirectUri = `${proto}://${host}/auth/google/callback`;
        }

        console.log("Google Auth Token Exchange details:", {
          stateStr,
          resolvedOrigin,
          redirectUri
        });

        const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            client_id: client_id || "",
            client_secret: client_secret || "",
            code: code as string,
            redirect_uri: redirectUri,
            grant_type: "authorization_code",
          }),
        });

        if (!tokenRes.ok) {
          const errBody = await tokenRes.text();
          console.error("Google Token Exchange failed. Raw response:", errBody);
          throw new Error(`Failed to exchange code for tokens with Google: ${errBody}`);
        }

        const tokens = await tokenRes.json();
        const userRes = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokens.access_token}` },
        });

        if (!userRes.ok) {
          throw new Error("Failed to retrieve user info from Google.");
        }

        const userInfo = await userRes.json();
        finalEmail = userInfo.email || "";
        finalName = userInfo.name || userInfo.given_name || "";
        finalPicture = userInfo.picture || "";
        finalRole = finalRoleFromState === "business" ? "business" : "hustler";
      } else {
        return res.status(400).send("No authorization code provided.");
      }

      const userSession = {
        isAuthenticated: true,
        email: finalEmail,
        name: finalName || finalEmail.split("@")[0],
        picture: finalPicture || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(finalEmail)}`,
        userType: finalRole === "business" ? "business" : "hustler",
        businessName: finalRole === "business" ? "Aria Partner Co" : undefined,
      };

      // Set cookie - HttpOnly, Secure, SameSite=None required for AI Studio Iframe Context
      res.setHeader(
        "Set-Cookie",
        `referr_session=${encodeURIComponent(JSON.stringify(userSession))}; Path=/; HttpOnly; Secure; SameSite=None; Max-Age=604800`
      );

      // Return parent listener success notifying page
      res.send(`
        <html>
          <body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif; text-align:center; padding-top:50px; background:#f8f9fa;">
            <script>
              if (window.opener) {
                window.opener.postMessage({ 
                  type: 'OAUTH_AUTH_SUCCESS', 
                  session: ${JSON.stringify(userSession)}
                }, '*');
                window.close();
              } else {
                window.location.href = '/dashboard';
              }
            </script>
            <div style="max-width:320px; margin:0 auto; background:white; border-radius:12px; border:1px solid #e4e5e7; padding:30px; box-shadow:0 10px 15px -3px rgba(0,0,0,0.1);">
              <h3 style="color:#222325; margin-bottom:10px;">Authenticated Successfully!</h3>
              <p style="color:#62646a; font-size:14px; margin-bottom:20px;">We are returning you to the Referr interface.</p>
              <div style="border:3.5px solid #f3f3f3; border-top:3.5px solid #1dbf73; border-radius:50%; width:20px; height:20px; animation:spin 1s linear infinite; margin:0 auto;"></div>
              <style>@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }</style>
            </div>
          </body>
        </html>
      `);
    } catch (error: any) {
      console.error("Auth Callback Error:", error);
      res.status(500).send(`
        <html>
          <body style="font-family:sans-serif;text-align:center;padding:50px;">
            <h3 style="color:#ea4335">Authentication Failed</h3>
            <p>${error.message || "An error occurred during authentication."}</p>
            <button onclick="window.close()" style="padding:10px 20px; background:#1dbf73; color:white; border:none; border-radius:4px; font-weight:bold; cursor:pointer;">Close Window</button>
          </body>
        </html>
      `);
    }
  });

  // --- Core Gemini AI Routes ---

  app.post("/api/gemini/rationale", async (req, res) => {
    try {
      const { prompt } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{
          role: "user",
          parts: [{
            text: `You are Aria, an expert business and web design AI agent. 
      The user wants to build a referral-focused website for their business.
      User Prompt: "${prompt}"
      
      Provide a concise 2-3 sentence summary of the strategic design you are building for them. 
      Focus on how the layout and the referral system will help their specific business.
      Keep it professional, encouraging, and highly specific to the business type mentioned.`
          }]
        }]
      });

      res.json({ text: response.text || "" });
    } catch (error: any) {
      handleGeminiError(res, error, "Gemini Rationale");
    }
  });

  app.post("/api/gemini/update", async (req, res) => {
    try {
      const { prompt, currentConfig } = req.body;
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: [{
          role: "user",
          parts: [{
            text: `You are Aria, a website designer. Update the following site configuration based on this instruction: "${prompt}"
      
      Current Config: ${JSON.stringify(currentConfig)}
      
      Return ONLY a JSON object representing the UPDATED fields. Do not include fields that don't change.
      
      The JSON must follow the SiteConfig schema:
      - hero: { headline, subheadline, ctaText, description }
      - brand: { name, accentColor, tagline }
      - features: { title, items: [{ title, description }] }
      - stats: [{ label, value }]
      - customCode: A string containing a modern React/TypeScript component that could be used for a custom section.
      
      STRICT JSON MODE: Return valid JSON only. ALWAYS prioritize React/TypeScript over static HTML. BE BOLD AND CREATIVE with the copy.`
          }]
        }],
        config: {
          responseMimeType: "application/json"
        }
      });

      const text = response.text || "{}";
      res.json(JSON.parse(text));
    } catch (error: any) {
      handleGeminiError(res, error, "Gemini Update");
    }
  });

  app.post("/api/gemini/chat", async (req, res) => {
    try {
      const { messages } = req.body;
      const history = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      const lastMsg = messages[messages.length - 1];

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        history: history,
        config: {
          systemInstruction: "You are Aria, an expert business and web design AI agent. You are helping a user build a referral-based website. Be concise, professional, and helpful.",
        }
      });

      const response = await chat.sendMessage({ message: lastMsg.text });
      res.json({ text: response.text || "" });
    } catch (error: any) {
      handleGeminiError(res, error, "Gemini Chat");
    }
  });

  app.post("/api/gemini/rationale-stream", async (req, res) => {
    try {
      const { prompt } = req.body;
      const result = await ai.models.generateContentStream({
        model: "gemini-3-flash-preview",
        contents: [{
          role: "user",
          parts: [{
            text: `You are Aria, an expert business and web design AI agent. 
      The user wants to build a referral-focused website for their business.
      User Prompt: "${prompt}"
      
      Provide a concise 2-3 sentence summary of the strategic design you are building for them. 
      Focus on how the layout and the referral system will help their specific business.
      Keep it professional, encouraging, and highly specific to the business type mentioned.`
          }]
        }]
      });

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of result) {
        const text = chunk.text;
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      handleGeminiError(res, error, "Gemini Rationale Stream");
    }
  });

  app.post("/api/gemini/chat-stream", async (req, res) => {
    try {
      const { messages } = req.body;
      const history = messages.slice(0, -1).map((msg: any) => ({
        role: msg.role === 'assistant' ? 'model' : 'user',
        parts: [{ text: msg.text }]
      }));
      const lastMsg = messages[messages.length - 1];

      const chat = ai.chats.create({
        model: "gemini-3-flash-preview",
        history: history,
        config: {
          systemInstruction: "You are Aria, an expert business and web design AI agent. You are helping a user build a referral-based website. Be concise, professional, and helpful.",
        }
      });

      const result = await chat.sendMessageStream({ message: lastMsg.text });

      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      for await (const chunk of result) {
        const text = chunk.text;
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
      res.write('data: [DONE]\n\n');
      res.end();
    } catch (error: any) {
      handleGeminiError(res, error, "Gemini Chat Stream");
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*all", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
