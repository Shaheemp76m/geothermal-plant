import { useState } from 'react';
import { MotionProvider } from './components/motion/MotionProvider';
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

export function App() {
  const [referencesOpen, setReferencesOpen] = useState(false);

  return (
    <MotionProvider>
      <div id="top" className="min-h-screen bg-earth-ivory text-earth-black flex flex-col selection:bg-earth-forest selection:text-white relative">
        {/* Cinematic Scroll Progress Bar */}
        <ScrollProgress colorClass="bg-earth-sage" />

        {/* 1. Thin Announcement Bar */}
        <AnnouncementBar />

        {/* 2. Minimal Navigation Bar with Centered Wordmark */}
        <Navbar />

        {/* Main Landing Page Stream */}
        <main className="flex-grow">
          {/* 3. Hero Section with Oversized Serif Background Word & Central Visual */}
          <HeroSection />

          {/* 4. Introduction: Origin of Earth's Subterranean Heat */}
          <IntroductionSection />

          {/* 5. How It Works: Interactive 4-Phase Thermodynamic Diagram & Technology Spectrum */}
          <HowItWorksSection />

          {/* 6. Dark Feature Strip: 3 Category Groups with Hairline Dividers */}
          <DarkFeatureStrip />

          {/* 7. Editorial Feature Banner: Wide Photographic Split Section */}
          <EditorialFeatureBanner />

          {/* 8. Benefits Strip: Verified Stats with Viewport Count-up Animation */}
          <BenefitsStrip />

          {/* 9. Applications Section: More Than Electricity Editorial Cards */}
          <ExploreGeothermal />

          {/* 10. Environmental Impact: Scientifically Grounded Strengths & Qualifications */}
          <EnvironmentalImpact onOpenReferences={() => setReferencesOpen(true)} />

          {/* 11. The Future: Next-Gen EGS, Advanced Drilling & Closed Loops */}
          <FutureSection onOpenReferences={() => setReferencesOpen(true)} />

          {/* 12. Powerful Closing Manifesto Banner */}
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
    </MotionProvider>
  );
}

export default App;
