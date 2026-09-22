import React from 'react';
import { MotionConfig } from 'framer-motion';
import { MotionExperience } from './components/MotionExperience';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Portfolio from './pages/Portfolio';
import PrivacyPolicy from './pages/PrivacyPolicy';
import DosoPrivacy from './pages/DosoPrivacy';
import DosoSupport from './pages/DosoSupport';
import NotFound from './pages/NotFound';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { clearLanguageScroll, getLanguageScroll } from './utils/languageScroll';

// ScrollToTop component to handle scrolling on route change
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const languageScrollY = getLanguageScroll(pathname);

  useEffect(() => {
    if (typeof languageScrollY === 'number' && Number.isFinite(languageScrollY)) {
      let secondFrame = 0;
      const firstFrame = requestAnimationFrame(() => {
        window.scrollTo({ top: languageScrollY, behavior: 'instant' });
        secondFrame = requestAnimationFrame(() => {
          window.scrollTo({ top: languageScrollY, behavior: 'instant' });
          clearLanguageScroll(pathname);
        });
      });
      return () => {
        cancelAnimationFrame(firstFrame);
        cancelAnimationFrame(secondFrame);
      };
    }
    // Portfolio anchors use its own offset for the project navigation.
    if (hash && pathname.endsWith('/portfolio')) return;
    if (hash) {
      const frame = requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname, hash, languageScrollY]);

  return null;
}

export function AppRoutes() {
  return (
    <MotionConfig reducedMotion="user">
    <LanguageProvider>
      <Analytics />
      <ScrollToTop />
      <MotionExperience />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/doso/privacy" element={<DosoPrivacy />} />
        <Route path="/doso/support" element={<DosoSupport />} />
        <Route path="/pl" element={<Home />} />
        <Route path="/pl/portfolio" element={<Portfolio />} />
        <Route path="/pl/polityka-prywatnosci" element={<PrivacyPolicy />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </LanguageProvider>
    </MotionConfig>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
