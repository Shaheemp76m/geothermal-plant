import { useState, useEffect } from 'react';
import { MotionProvider } from './components/motion/MotionProvider';
import { ObservatoryShell } from './components/observatory/ObservatoryShell';
import { ScrollProgress } from './components/motion/ScrollProgress';
import { AnnouncementBar } from './components/navigation/AnnouncementBar';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { IntroductionSection } from './components/sections/IntroductionSection';
import { HowItWorksSection } from './components/sections/HowItWorksSection';
import { DarkFeatureStrip } from './components/hero/DarkFeatureStrip';
import { EditorialFeatureBanner } from './components/sections/EditorialFeatureBanner';
import { BenefitsStrip } from './components/sections/BenefitsStrip';
import { ExploreGeothermal } from './components/sections/ExploreGeothermal';
import { EnvironmentalImpact } from './components/sections/EnvironmentalImpact';
import { FutureSection } from './components/sections/FutureSection';
import { ClosingSection } from './components/sections/ClosingSection';
import { Footer } from './components/footer/Footer';
import { ReferencesModal } from './components/sections/ReferencesModal';
import { Compass } from 'lucide-react';

export function App() {
  const [viewMode, setViewMode] = useState<'observatory' | 'archive'>('observatory');
  const [referencesOpen, setReferencesOpen] = useState(false);

  useEffect(() => {
    // When opening without an anchor hash, guarantee the page initializes at the top
    if (!window.location.hash || window.location.hash === '#top') {
      window.scrollTo(0, 0);
    }
  }, [viewMode]);

  return (
    <MotionProvider>
      {viewMode === 'observatory' ? (
        /* SINGLE-SCREEN APPLICATION: SUBSURFACE OBSERVATORY */
        <ObservatoryShell onOpenArchive={() => setViewMode('archive')} />
      ) : (
        /* EDITORIAL ARCHIVE MODE (ACCESSIBLE VIA ARCHIVE BUTTON) */
        <div id="top" className="min-h-screen bg-earth-ivory text-earth-black flex flex-col selection:bg-earth-forest selection:text-white relative">
          {/* Sticky Return Bar to Observatory */}
          <div className="sticky top-0 z-50 bg-[#0E1310] text-earth-ivory border-b border-[#222B24] px-4 py-2 flex items-center justify-between text-xs font-mono shadow-md">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-earth-sage" />
              <span className="text-[#A2B3A8]">EDITORIAL ARCHIVE VIEW</span>
            </div>
            <button
              onClick={() => setViewMode('observatory')}
              className="px-3 py-1 rounded bg-earth-forest border border-earth-sage/50 text-white hover:bg-earth-forest/80 transition-all flex items-center space-x-1.5 uppercase tracking-wider font-semibold"
            >
              <Compass className="w-3.5 h-3.5 text-earth-sage" />
              <span>RETURN TO SUBSURFACE OBSERVATORY</span>
            </button>
          </div>

          {/* Cinematic Scroll Progress Bar */}
          <ScrollProgress colorClass="bg-earth-sage" />

          {/* 1. Thin Announcement Bar */}
          <AnnouncementBar />

          {/* 2. Minimal Navigation Bar with Centered Wordmark */}
          <Navbar />

          {/* Main Landing Page Stream */}
          <main className="flex-grow">
            <HeroSection />
            <IntroductionSection />
            <HowItWorksSection />
            <DarkFeatureStrip />
            <EditorialFeatureBanner />
            <BenefitsStrip />
            <ExploreGeothermal />
            <EnvironmentalImpact onOpenReferences={() => setReferencesOpen(true)} />
            <FutureSection onOpenReferences={() => setReferencesOpen(true)} />
            <ClosingSection />
          </main>

          {/* 13. Restrained Editorial Footer */}
          <Footer onOpenReferences={() => setReferencesOpen(true)} />

          {/* 14. Peer-Reviewed Scientific Archive Modal */}
          <ReferencesModal
            isOpen={referencesOpen}
            onClose={() => setReferencesOpen(false)}
          />
        </div>
      )}
    </MotionProvider>
  );
}

export default App;
