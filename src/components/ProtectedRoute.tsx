import { ReactNode, useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getCurrentSession } from "../services/authService";

interface ProtectedRouteProps {
  children: ReactNode;
  allowedRole?: "hustler" | "business";
}

export default function ProtectedRoute({ children, allowedRole }: ProtectedRouteProps) {
  const [loading, setLoading] = useState(() => {
    return localStorage.getItem("isAuthenticated") !== "true";
  });
  const [authenticated, setAuthenticated] = useState(() => {
    return localStorage.getItem("isAuthenticated") === "true";
  });
  const [userRole, setUserRole] = useState<string | null>(() => {
    return localStorage.getItem("userType");
  });
  const location = useLocation();

  useEffect(() => {
    let active = true;
    
    // Only set loading to true if we are not already authenticated locally
    if (localStorage.getItem("isAuthenticated") !== "true") {
      setLoading(true);
    }

    getCurrentSession()
      .then((session) => {
        if (!active) return;
        if (session) {
          setAuthenticated(true);
          setUserRole(session.userType);
          localStorage.setItem("isAuthenticated", "true");
          localStorage.setItem("userType", session.userType);
          localStorage.setItem("userEmail", session.email);
          
          // Ensure a unique ID and a unique Referral Code are present for tracking
          const finalId = session.userId || localStorage.getItem("userId") || `USR-${session.name.replace(/\s+/g, "").substring(0, 4).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
          const finalRefCode = session.referralCode || localStorage.getItem("referralCode") || `${session.name.replace(/\s+/g, "").substring(0, 3).toUpperCase()}${Math.floor(100 + Math.random() * 899)}`;
          localStorage.setItem("userId", finalId);
          localStorage.setItem("referralCode", finalRefCode);

          if (session.userType === "business") {
            localStorage.setItem("businessName", session.businessName || "Arial Partner Co");
            localStorage.setItem("representativeName", session.name);
          } else {
            localStorage.setItem("hustlerName", session.name);
          }
          if (session.picture) {
            localStorage.setItem("userPicture", session.picture);
          }
        } else {
          setAuthenticated(false);
          setUserRole(null);
          localStorage.removeItem("isAuthenticated");
          localStorage.removeItem("userType");
          localStorage.removeItem("businessName");
          localStorage.removeItem("hustlerName");
          localStorage.removeItem("representativeName");
          localStorage.removeItem("userEmail");
          localStorage.removeItem("userPicture");
          localStorage.removeItem("userId");
          localStorage.removeItem("referralCode");
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error("Auth security fetch error:", err);
        if (!active) return;
        setAuthenticated(false);
        setLoading(false);
      });

    return () => {
      active = false;
    };
  }, [location.pathname]);

  if (loading) {
    return null;
  }

  if (!authenticated) {
    // Redirect unauthenticated user to signing in
    return <Navigate to="/signin" replace state={{ from: location }} />;
  }

  if (allowedRole && userRole !== allowedRole) {
    // Redirect if they have the wrong workspace active
    const defaultDashboard = userRole === "business" ? "/dashboard/business" : "/dashboard/hustler";
    return <Navigate to={defaultDashboard} replace />;
  }

  return <>{children}</>;
}
