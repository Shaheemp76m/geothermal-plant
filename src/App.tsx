import { useState, useEffect, lazy, Suspense } from 'react';
import { MotionProvider } from './components/motion/MotionProvider';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { AnnouncementBar } from './components/navigation/AnnouncementBar';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { IntroductionSection } from './components/sections/IntroductionSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { ObservatoryFeatureBanner } from './components/sections/ObservatoryFeatureBanner';
import { DarkFeatureStrip } from './components/hero/DarkFeatureStrip';
import { EditorialFeatureBanner } from './components/sections/EditorialFeatureBanner';
import { BenefitsStrip } from './components/sections/BenefitsStrip';
import { ExploreGeothermal } from './components/sections/ExploreGeothermal';
import { EnvironmentalImpact } from './components/sections/EnvironmentalImpact';
import { FutureSection } from './components/sections/FutureSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { Footer } from './components/footer/Footer';

// Code-split heavy Subsurface Observatory and References Modal to keep initial load lightweight
const ObservatoryShell = lazy(() =>
  import('./components/observatory/ObservatoryShell').then(m => ({ default: m.ObservatoryShell }))
);
const ReferencesModal = lazy(() =>
  import('./components/sections/ReferencesModal').then(m => ({ default: m.ReferencesModal }))
);

export function App() {
  // Default to full website on standard loads
  const [viewMode, setViewMode] = useState<'website' | 'observatory'>('website');
  const [referencesOpen, setReferencesOpen] = useState(false);

  // Sync hash state with viewMode and ensure proper scroll behavior
  useEffect(() => {
    const handleHash = () => {
      if (window.location.hash === '#observatory') {
        setViewMode('observatory');
      } else {
        setViewMode('website');
        if (!window.location.hash || window.location.hash === '#top') {
          window.scrollTo(0, 0);
        }
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const handleOpenObservatory = () => {
    window.location.hash = '#observatory';
    setViewMode('observatory');
  };

  const handleReturnToWebsite = () => {
    window.location.hash = '#top';
    setViewMode('website');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MotionProvider>
      <Suspense
        fallback={
          <div className="min-h-screen bg-[#0C0D0B] flex flex-col items-center justify-center text-earth-sage font-mono text-xs tracking-widest">
            <div className="w-8 h-8 rounded-full border-2 border-earth-sage border-t-transparent animate-spin mb-4" />
            <span>INITIALIZING GEOTHERMAL GREEN...</span>
          </div>
        }
      >
        {viewMode === 'observatory' ? (
          /* SINGLE-SCREEN APPLICATION: SUBSURFACE OBSERVATORY */
          <ObservatoryShell onOpenArchive={handleReturnToWebsite} />
        ) : (
          /* FULL EDITORIAL WEBSITE (DEFAULT EXPERIENCE) */
          <div id="top" className="min-h-screen bg-earth-ivory text-earth-black flex flex-col selection:bg-earth-forest selection:text-white relative">
            {/* Cinematic Scroll Progress Bar */}
            <ScrollProgress colorClass="bg-earth-sage" />

            {/* 1. Thin Announcement Bar with Observatory Link */}
            <AnnouncementBar onOpenObservatory={handleOpenObservatory} />

            {/* 2. Navigation Bar with Centered Wordmark & Observatory CTA */}
            <Navbar onOpenObservatory={handleOpenObservatory} />

            {/* Main Landing Page Stream */}
            <main className="flex-grow">
              {/* 3. Hero Section with Oversized Serif Background Word & Central Visual */}
              <HeroSection onOpenObservatory={handleOpenObservatory} />

              {/* 4. Introduction: Origin of Earth's Subterranean Heat */}
              <IntroductionSection />

              {/* 5. How It Works: Interactive 4-Phase Thermodynamic Diagram & Technology Spectrum */}
              <HowItWorksSection />

              {/* 6. Subsurface Observatory Feature Showcase Banner */}
              <ObservatoryFeatureBanner onOpenObservatory={handleOpenObservatory} />

              {/* 7. Dark Feature Strip: 3 Category Groups with Hairline Dividers */}
              <DarkFeatureStrip />

              {/* 8. Editorial Feature Banner: Wide Photographic Split Section */}
              <EditorialFeatureBanner />

              {/* 9. Benefits Strip: Verified Stats with Viewport Count-up Animation */}
              <BenefitsStrip />

              {/* 10. Applications Section: More Than Electricity Editorial Cards */}
              <ExploreGeothermal />

              {/* 11. Environmental Impact: Scientifically Grounded Strengths & Qualifications */}
              <EnvironmentalImpact onOpenReferences={() => setReferencesOpen(true)} />

              {/* 12. The Future: Next-Gen EGS, Advanced Drilling & Closed Loops */}
              <FutureSection onOpenReferences={() => setReferencesOpen(true)} />

              {/* 13. Powerful Closing Manifesto Banner */}
              <ClosingSection />
            </main>

            {/* 14. Restrained Editorial Footer */}
            <Footer onOpenReferences={() => setReferencesOpen(true)} />

            {/* 15. Peer-Reviewed Scientific Archive Modal */}
            <ReferencesModal
              isOpen={referencesOpen}
              onClose={() => setReferencesOpen(false)}
            />
          </div>
        )}
      </Suspense>
    </MotionProvider>
  );
}

export default App;
