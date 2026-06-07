/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCurrentSession } from "./services/authService";
import LandingPage from "./components/LandingPage";
import BrandLandingPage from "./components/BrandLandingPage";
import OnboardingSelection from "./components/OnboardingSelection";
import HustlerSignup from "./components/HustlerSignup";
import BusinessSignup from "./components/BusinessSignup";
import BusinessOnboarding from "./components/BusinessOnboarding";
import BusinessPaywall from "./components/BusinessPaywall";
import BusinessDashboard from "./components/BusinessDashboard";
import HustlerDashboard from "./components/HustlerDashboard";
import CreateProfile from "./components/CreateProfile";
import Dashboard from "./components/Dashboard";
import Wallet from "./components/Wallet";
import Profile from "./components/Profile";
import Deals from "./components/Deals";
import DealDetails from "./components/DealDetails";
import SidebarLayout from "./components/SidebarLayout";
import ProtectedRoute from "./components/ProtectedRoute";

import WelcomeOnboarding from "./components/WelcomeOnboarding";
import SignIn from "./components/SignIn";
import CookieConsent from "./components/CookieConsent";

import CreateSitePage from "./components/CreateSitePage";
import ArialDesignPage from "./components/ArialDesignPage";
import PostDealPage from "./components/PostDealPage";
import PostBlogPage from "./components/PostBlogPage";
import AdNetworksPage from "./components/AdNetworksPage";
import AnalyticsPage from "./components/AnalyticsPage";
import FavoritesPage from "./components/FavoritesPage";
import ReferrersPage from "./components/ReferrersPage";
import HelpPage from "./components/HelpPage";
import ReferrDocs from "./components/ReferrDocs";
import SettingsPage from "./components/SettingsPage";
import SiteEditorPage from "./components/SiteEditorPage";
import SiteMobileApp from "./components/SiteMobileApp";
import LiveSiteView from "./components/LiveSiteView";
import { getSubdomain } from "./utils/subdomain";

// Completely purge any old simulation tags immediately before anything renders to prevent browser hijacking 
if (typeof window !== "undefined") {
  localStorage.removeItem("simulated_subdomain");
  localStorage.removeItem("user_published_slug");
}

import HireProfessionalPage from "./components/HireProfessionalPage";

import BusinessPayouts from "./components/BusinessPayouts";

import CookiesStatement from "./components/CookiesStatement";

export default function App() {
  useEffect(() => {
    // Initialize the accent theme from localStorage
    const savedTheme = localStorage.getItem("referr_theme") || "black";
    document.documentElement.setAttribute("data-theme", savedTheme);

    // Clear any previous trapped simulated subdomain/slug to completely prevent hijacking
    localStorage.removeItem("simulated_subdomain");
    localStorage.removeItem("user_published_slug");

    getCurrentSession().then((session) => {
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
      }
    });
  }, []);

  const subdomain = getSubdomain();

  if (subdomain) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/*" element={<LiveSiteView forcedSlug={subdomain} isSubdomainDirect={true} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <CookieConsent />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/brand" element={<BrandLandingPage />} />
        <Route path="/join" element={<OnboardingSelection />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/onboarding" element={<OnboardingSelection />} />
        <Route path="/signup/hustler" element={<HustlerSignup />} />
        <Route path="/signup/business" element={<BusinessSignup />} />
        <Route path="/onboarding/business" element={<BusinessOnboarding />} />
        <Route path="/business-paywall" element={<BusinessPaywall />} />
        <Route path="/welcome" element={<WelcomeOnboarding />} />
        <Route path="/hire-professional" element={<HireProfessionalPage />} />

        {/* Persistent Sidebar Layout Group */}
        <Route element={<SidebarLayout />}>
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/dashboard/hustler" element={<ProtectedRoute allowedRole="hustler"><HustlerDashboard /></ProtectedRoute>} />
          <Route path="/dashboard/business" element={<ProtectedRoute allowedRole="business"><BusinessDashboard /></ProtectedRoute>} />
          <Route
            path="/hustler/wallet"
            element={<ProtectedRoute allowedRole="hustler"><Wallet userType="hustler" /></ProtectedRoute>}
          />
          <Route
            path="/business/wallet"
            element={<ProtectedRoute allowedRole="business"><Wallet userType="business" /></ProtectedRoute>}
          />
          <Route path="/business/payouts" element={<ProtectedRoute allowedRole="business"><BusinessPayouts /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/deals" element={<ProtectedRoute><Deals /></ProtectedRoute>} />
          <Route path="/deal/:id" element={<ProtectedRoute><DealDetails /></ProtectedRoute>} />
          <Route path="/post-deal" element={<ProtectedRoute allowedRole="business"><PostDealPage /></ProtectedRoute>} />
          <Route path="/dashboard/deals" element={<ProtectedRoute allowedRole="business"><PostDealPage /></ProtectedRoute>} />
          <Route path="/dashboard/blog" element={<ProtectedRoute allowedRole="business"><PostBlogPage /></ProtectedRoute>} />
          <Route path="/business/ad-networks" element={<ProtectedRoute allowedRole="business"><AdNetworksPage /></ProtectedRoute>} />
          <Route
            path="/hustler/analytics"
            element={<ProtectedRoute allowedRole="hustler"><AnalyticsPage userType="hustler" /></ProtectedRoute>}
          />
          <Route
            path="/business/analytics"
            element={<ProtectedRoute allowedRole="business"><AnalyticsPage userType="business" /></ProtectedRoute>}
          />
          <Route path="/business/referrers" element={<ProtectedRoute allowedRole="business"><ReferrersPage /></ProtectedRoute>} />
          <Route path="/business/favorites" element={<ProtectedRoute allowedRole="business"><FavoritesPage /></ProtectedRoute>} />
          <Route path="/site-app" element={<ProtectedRoute allowedRole="business"><SiteMobileApp /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />
          <Route path="/help" element={<ProtectedRoute><HelpPage /></ProtectedRoute>} />
        </Route>

        {/* Standalone Pages */}
        <Route path="/docs" element={<ReferrDocs />} />
        <Route path="/cookies-statement" element={<CookiesStatement />} />

        {/* Full-screen Builders (No Sidebar) */}
        <Route path="/create-profile" element={<ProtectedRoute><CreateProfile /></ProtectedRoute>} />
        <Route path="/create-site" element={<ProtectedRoute allowedRole="business"><CreateSitePage /></ProtectedRoute>} />
        <Route path="/design-aria" element={<ProtectedRoute allowedRole="business"><ArialDesignPage /></ProtectedRoute>} />
        <Route path="/design-arial" element={<ProtectedRoute allowedRole="business"><ArialDesignPage /></ProtectedRoute>} />
        <Route path="/editor" element={<ProtectedRoute allowedRole="business"><SiteEditorPage /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}
