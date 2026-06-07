import { auth, db } from "./firebaseService";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

export interface UserSession {
  isAuthenticated: boolean;
  email: string;
  name: string;
  picture?: string;
  userType: "hustler" | "business";
  businessName?: string;
  userId?: string;
  referralCode?: string;
}

export async function getCurrentSession(retries = 2): Promise<UserSession | null> {
  try {
    const response = await fetch("/api/auth/me");
    if (!response.ok) return null;
    const data = await response.json();
    if (data.authenticated && data.session) {
      return data.session;
    }
    return null;
  } catch (error) {
    if (retries > 0) {
      // Add a small delay and retry to handle backend cold starts or race conditions
      await new Promise(resolve => setTimeout(resolve, 800));
      return getCurrentSession(retries - 1);
    }
    console.error("Error getting session:", error);
    return null;
  }
}

export async function loginWithEmail(email: string, password: string): Promise<UserSession> {
  const response = await fetch("/api/auth/signin", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Authentication failed. Please verify your email and password.");
  }
  
  return data.session;
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
): Promise<UserSession> {
  const response = await fetch("/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.success) {
    throw new Error(data.message || "Failed to create account. Please try again.");
  }
  
  return data.session;
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
  localStorage.removeItem("userId");
  localStorage.removeItem("referralCode");
  
  return true;
}

export function openGoogleAuthPopup(
  role: "hustler" | "business" | "general",
  onComplete: (session: UserSession) => void,
  onError?: (errMessage: string) => void
) {
  const provider = new GoogleAuthProvider();
  provider.addScope("email");
  provider.addScope("profile");

  signInWithPopup(auth, provider)
    .then(async (result) => {
      const user = result.user;
      const email = user.email || "";
      const name = user.displayName || email.split("@")[0];
      const picture = user.photoURL || `https://api.dicebear.com/7.x/adventurer/svg?seed=${encodeURIComponent(email)}`;
      const uid = user.uid;

      // Determine the userType/role – defaulting to specified or "hustler" if general
      let finalRole: "hustler" | "business" = role === "general" ? "hustler" : role;

      try {
        const userDocRef = doc(db, "users", uid);
        const userDocSnap = await getDoc(userDocRef);

        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          if (userData.userType) {
            // Check for role crossover conflict on the client if already in Firestore
            if (role !== "general" && userData.userType !== role) {
              const targetRoleNode = role === "hustler" ? "Hustler" : "Business";
              const currentRoleNode = userData.userType === "hustler" ? "Hustler" : "Business";
              const errMessage = `You already have an account as a ${currentRoleNode} under this email. You cannot register as a ${targetRoleNode}.`;
              
              if (onError) {
                onError(errMessage);
              } else {
                alert(errMessage);
              }
              await auth.signOut();
              return;
            }
            finalRole = userData.userType;
          }
        }
      } catch (err) {
        console.warn("Firestore user profile collection lookup failed, continuing with other validation layers:", err);
      }

      // Sync backend cookie session with server to complete full-stack login
      try {
        const response = await fetch("/api/auth/firebase-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            name,
            picture,
            uid,
            userType: finalRole,
            targetRole: role
          })
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          if (errData.error === "ROLE_CONFLICT" || errData.message) {
            const errMsg = errData.message || `A role conflict was detected for this account.`;
            if (onError) {
              onError(errMsg);
            } else {
              alert(errMsg);
            }
            await auth.signOut();
            return;
          }
        }

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.session) {
            // New user registration - save to Firestore database under /users/{userId} if not already exists
            try {
              const userDocRef = doc(db, "users", uid);
              const userDocSnap = await getDoc(userDocRef);
              if (!userDocSnap.exists()) {
                await setDoc(userDocRef, {
                  userId: uid,
                  email: email,
                  userType: finalRole
                });
              }
            } catch (fsErr) {
              console.warn("Error creating user profile inside Firestore:", fsErr);
            }
            
            onComplete(data.session);
            return;
          }
        }
      } catch (err) {
        console.error("Failed to sync firebase login session to backend:", err);
      }

      // Safe local session fallback in case backend API doesn't mount instantly
      const fallbackSession: UserSession = {
        isAuthenticated: true,
        email,
        name,
        picture,
        userType: finalRole
      };
      onComplete(fallbackSession);
    })
    .catch((error) => {
      console.error("Firebase Auth sign-in error:", error);
      if (onError) {
        onError("Firebase Google Sign-In failed: " + (error as Error).message);
      } else {
        alert("Firebase Google Sign-In failed: " + (error as Error).message);
      }
    });
}
