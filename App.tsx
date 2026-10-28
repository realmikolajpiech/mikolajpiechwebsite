import React, { lazy, Suspense } from 'react';
import { MotionExperience } from './components/MotionExperience';
import { Analytics } from '@vercel/analytics/react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { clearLanguageScroll, getLanguageScroll } from './utils/languageScroll';

// Secondary pages (including the animation/gallery runtime) load on navigation.
// Prerendering supplies eager components so every static document stays complete.
const clientPages = {
  Portfolio: lazy(() => import('./pages/Portfolio')),
  PrivacyPolicy: lazy(() => import('./pages/PrivacyPolicy')),
  DosoPrivacy: lazy(() => import('./pages/DosoPrivacy')),
  DosoSupport: lazy(() => import('./pages/DosoSupport')),
  NotFound: lazy(() => import('./pages/NotFound')),
};
type Pages = Record<keyof typeof clientPages, React.ComponentType>;

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
        document.getElementById(hash.slice(1))?.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
          block: 'start',
        });
      });
      return () => cancelAnimationFrame(frame);
    }
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  }, [pathname, hash, languageScrollY]);

  return null;
}

export function AppRoutes({ pages = clientPages }: { pages?: Pages } = {}) {
  const { Portfolio, PrivacyPolicy, DosoPrivacy, DosoSupport, NotFound } = pages;
  return (
    <LanguageProvider>
      <Analytics />
      <Suspense fallback={null}>
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
      </Suspense>
    </LanguageProvider>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
