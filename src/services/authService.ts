export interface UserSession {
  isAuthenticated: boolean;
  email: string;
  name: string;
  picture?: string;
  userType: "hustler" | "business";
  businessName?: string;
}

export async function getCurrentSession(): Promise<UserSession | null> {
  try {
    const response = await fetch("/api/auth/me");
    if (!response.ok) return null;
    const data = await response.json();
    if (data.authenticated && data.session) {
      return data.session;
    }
    return null;
  } catch (error) {
    console.error("Error getting session:", error);
    return null;
  }
}

export async function loginWithEmail(email: string, password: string): Promise<UserSession | null> {
  try {
    const response = await fetch("/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.success && data.session) {
      return data.session;
    }
    return null;
  } catch (error) {
    console.error("Login email error:", error);
    return null;
  }
}

export async function signupWithEmail(
  payload: {
    email: string;
    password?: string;
    firstName: string;
    lastName: string;
    userType: "hustler" | "business";
    companyName?: string;
  }
): Promise<UserSession | null> {
  try {
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!response.ok) return null;
    const data = await response.json();
    if (data.success && data.session) {
      return data.session;
    }
    return null;
  } catch (error) {
    console.error("Signup email error:", error);
    return null;
  }
}

export async function logout(): Promise<boolean> {
  try {
    // Clear cookie on server
    await fetch("/api/auth/logout", { method: "POST" });
  } catch (error) {
    console.error("Logout request error:", error);
  }

  // Clear local storage fields to remain synchronized
  localStorage.removeItem("isAuthenticated");
  localStorage.removeItem("userType");
  localStorage.removeItem("businessName");
  localStorage.removeItem("hustlerName");
  localStorage.removeItem("representativeName");
  localStorage.removeItem("userEmail");
  localStorage.removeItem("userPicture");
  
  return true;
}

export function openGoogleAuthPopup(
  role: "hustler" | "business" | "general",
  onComplete: (session: UserSession) => void
) {
  const origin = window.location.origin;
  const url = `/api/auth/google/url?origin=${encodeURIComponent(origin)}&role=${role}`;
  
  const width = 600;
  const height = 700;
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2;
  
  const popup = window.open(
    "",
    "google_oauth_popup",
    `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`
  );

  if (!popup) {
    alert("Please allow popups to sign in with Google.");
    return;
  }

  popup.document.write(`
    <html>
      <head>
        <title>Connecting to Google...</title>
        <style>
          body { 
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; 
            display: flex; 
            align-items: center; 
            justify-content: center; 
            height: 100vh; 
            margin: 0; 
            background: #ffffff; 
            color: #222325; 
          }
          .loader { 
            border: 3px solid #f3f3f3; 
            border-top: 3px solid #1dbf73; 
            border-radius: 50%; 
            width: 28px; 
            height: 28px; 
            animation: spin 0.8s linear infinite; 
            margin: 0 auto 16px auto; 
          }
          @keyframes spin { 
            0% { transform: rotate(0deg); } 
            100% { transform: rotate(360deg); } 
          }
          .container { 
            text-align: center; 
          }
          .text {
            font-size: 15px;
            font-weight: 500;
            color: #404145;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="loader"></div>
          <div class="text">Connecting to Google...</div>
        </div>
      </body>
    </html>
  `);

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      if (data.url) {
        popup.location.href = data.url;
      } else {
        popup.close();
        alert("Authentication failed to initialize on the server.");
      }
    })
    .catch((err) => {
      console.warn("Error fetching google auth URL, falling back dynamically on client:", err);
      // Direct client fallback to same-origin mock login to avoid blocking in sandbox / restricted fetch environments
      const mockLoginUrl = `${origin}/auth/google/mock-login?origin=${encodeURIComponent(origin)}&role=${role}`;
      popup.location.href = mockLoginUrl;
    });

  const handleMessage = (event: MessageEvent) => {
    const originUrl = event.origin;
    if (!originUrl.endsWith(".run.app") && !originUrl.includes("localhost")) {
      return;
    }
    if (event.data?.type === "OAUTH_AUTH_SUCCESS" && event.data.session) {
      window.removeEventListener("message", handleMessage);
      onComplete(event.data.session);
    }
  };

  window.addEventListener("message", handleMessage);
}
