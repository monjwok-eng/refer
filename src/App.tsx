/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import OnboardingSelection from './components/OnboardingSelection';
import HustlerSignup from './components/HustlerSignup';
import BusinessSignup from './components/BusinessSignup';
import BusinessOnboarding from './components/BusinessOnboarding';
import CreateProfile from './components/CreateProfile';
import Dashboard from './components/Dashboard';
import Wallet from './components/Wallet';
import Profile from './components/Profile';
import Deals from './components/Deals';
import DealDetails from './components/DealDetails';

import WelcomeOnboarding from './components/WelcomeOnboarding';
import SignIn from './components/SignIn';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/onboarding" element={<OnboardingSelection />} />
        <Route path="/signup/hustler" element={<HustlerSignup />} />
        <Route path="/signup/business" element={<BusinessSignup />} />
        <Route path="/onboarding/business" element={<BusinessOnboarding />} />
        <Route path="/welcome" element={<WelcomeOnboarding />} />
        <Route path="/create-profile" element={<CreateProfile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/deals" element={<Deals />} />
        <Route path="/deal/:id" element={<DealDetails />} />
      </Routes>
    </BrowserRouter>
  );
}
