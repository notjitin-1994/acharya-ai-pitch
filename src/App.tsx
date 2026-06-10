import { useEffect } from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import PitchDeck from './pages/PitchDeck';
import SmartslateTerms from './pages/TermsPage';
import PricingPage from './pages/PricingPage';
import TranscriptPage from './pages/TranscriptPage';
import { NarrationProvider } from './audio/NarrationContext';

const TITLES: Record<string, string> = {
  '/': 'Smartslate × AIT — The AI-Native Campus',
  '/pitch-deck': 'Pitch Deck — Smartslate × AIT',
  '/pricing': 'Investment — Smartslate × AIT',
  '/terms': 'Terms — Smartslate × AIT',
  '/transcript': 'Narration Transcript — Smartslate × AIT',
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = TITLES[pathname] ?? TITLES['/'];
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <NarrationProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/pitch-deck" element={<PitchDeck />} />
        <Route path="/terms" element={<SmartslateTerms />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/transcript" element={<TranscriptPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </NarrationProvider>
  );
}
