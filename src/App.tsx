/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getCurrentSession } from "./services/authService";
import LandingPage from "./components/LandingPage";
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

import WelcomeOnboarding from "./components/WelcomeOnboarding";
import SignIn from "./components/SignIn";
import CookieConsent from "./components/CookieConsent";

import CreateSitePage from "./components/CreateSitePage";
import AriaDesignPage from "./components/AriaDesignPage";
import PostDealPage from "./components/PostDealPage";
import PostBlogPage from "./components/PostBlogPage";
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

import HireProfessionalPage from "./components/HireProfessionalPage";

import BusinessPayouts from "./components/BusinessPayouts";

import CookiesStatement from "./components/CookiesStatement";

export default function App() {
  useEffect(() => {
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
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/hustler" element={<HustlerDashboard />} />
          <Route path="/dashboard/business" element={<BusinessDashboard />} />
          <Route
            path="/hustler/wallet"
            element={<Wallet userType="hustler" />}
          />
          <Route
            path="/business/wallet"
            element={<Wallet userType="business" />}
          />
          <Route path="/business/payouts" element={<BusinessPayouts />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/deals" element={<Deals />} />
          <Route path="/deal/:id" element={<DealDetails />} />
          <Route path="/post-deal" element={<PostDealPage />} />
          <Route path="/dashboard/deals" element={<PostDealPage />} />
          <Route path="/dashboard/blog" element={<PostBlogPage />} />
          <Route
            path="/hustler/analytics"
            element={<AnalyticsPage userType="hustler" />}
          />
          <Route
            path="/business/analytics"
            element={<AnalyticsPage userType="business" />}
          />
          <Route path="/business/referrers" element={<ReferrersPage />} />
          <Route path="/business/favorites" element={<FavoritesPage />} />
          <Route path="/site-app" element={<SiteMobileApp />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/help" element={<HelpPage />} />
        </Route>

        {/* Standalone Pages */}
        <Route path="/docs" element={<ReferrDocs />} />
        <Route path="/cookies-statement" element={<CookiesStatement />} />

        {/* Full-screen Builders (No Sidebar) */}
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/create-site" element={<CreateSitePage />} />
        <Route path="/design-aria" element={<AriaDesignPage />} />
        <Route path="/editor" element={<SiteEditorPage />} />
        <Route path="/s/:businessSlug" element={<LiveSiteView />} />
        <Route path="/site/:businessSlug" element={<LiveSiteView />} />
      </Routes>
    </BrowserRouter>
  );
}
