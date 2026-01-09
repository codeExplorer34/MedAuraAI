import React, { useState, lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import DemoBanner from "./components/DemoBanner";
import ScrollToTop from "./components/ScrollToTop";
import ChatWidget from "./components/ChatWidget";
import LoadingScreen from "./components/LoadingScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import "./page-transitions.css";
import "./premium-effects.css";

// Lazy load heavy components for better performance
const LandingPage = lazy(() => import('./components/LandingPageEnhanced'));
const AboutPage = lazy(() => import('./components/AboutPage'));
const CaseDashboard = lazy(() => import('./components/CaseDashboard'));
const CaseIntakeWizard = lazy(() => import('./components/CaseIntakeWizard'));
const CaseDetail = lazy(() => import('./components/CaseDetail'));
const ERCopilotPage = lazy(() => import('./components/ERCopilotPage'));
const MDTReviewPage = lazy(() => import('./components/MDTReviewPage'));
const PatientHistory = lazy(() => import('./components/PatientHistory'));
const PatientDetail = lazy(() => import('./components/PatientDetail'));
const PricingPage = lazy(() => import('./components/PricingPage'));
const LoginPage = lazy(() => import('./components/LoginPage'));
const SignupPage = lazy(() => import('./components/SignupPage'));
const ClinicalDashboard = lazy(() => import('./components/ClinicalDashboard'));
const NotFoundPage = lazy(() => import('./components/ErrorPage').then(module => ({ default: module.NotFoundPage })));

// Layout wrapper to hide navbar/footer on certain pages
function AppLayout({ children }) {
  const location = useLocation();
  const hideLayout = ['/login', '/signup', '/dashboard'].includes(location.pathname);

  if (hideLayout) {
    return <>{children}</>;
  }

  return (
    <div className="app-root">
      <Navbar />
      <DemoBanner />
      <main className="page">
        {children}
      </main>
      <Footer />
      <ChatWidget />
    </div>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {/* Loading Screen */}
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}

      <BrowserRouter
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true
        }}
      >
        <ScrollToTop />
        <AppLayout>
          <Suspense fallback={<LoadingScreen message="Loading page..." />}>
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/er-copilot" element={<ERCopilotPage />} />
              <Route path="/mdt-review" element={<MDTReviewPage />} />
              <Route path="/pricing" element={<PricingPage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/patient-history" element={<ProtectedRoute><PatientHistory /></ProtectedRoute>} />
              <Route path="/patient/:id" element={<ProtectedRoute><PatientDetail /></ProtectedRoute>} />
              <Route path="/cases" element={<ProtectedRoute><CaseDashboard /></ProtectedRoute>} />
              <Route path="/cases/new" element={<ProtectedRoute><CaseIntakeWizard /></ProtectedRoute>} />
              <Route path="/cases/:id" element={<ProtectedRoute><CaseDetail /></ProtectedRoute>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/dashboard" element={<ProtectedRoute><ClinicalDashboard /></ProtectedRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </AppLayout>
      </BrowserRouter>
    </>
  );
}
