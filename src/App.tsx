import { useState } from 'react';
import { AnnouncementBar } from './components/navigation/AnnouncementBar';
import { Navbar } from './components/navigation/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { DarkFeatureStrip } from './components/hero/DarkFeatureStrip';
import { EditorialFeatureBanner } from './components/sections/EditorialFeatureBanner';
import { BenefitsStrip } from './components/sections/BenefitsStrip';
import { ExploreGeothermal } from './components/sections/ExploreGeothermal';
import { EnvironmentalImpact } from './components/sections/EnvironmentalImpact';
import { FutureSection } from './components/sections/FutureSection';
import { Footer } from './components/footer/Footer';
import { ReferencesModal } from './components/sections/ReferencesModal';

export function App() {
  const [referencesOpen, setReferencesOpen] = useState(false);

  return (
    <div id="top" className="min-h-screen bg-earth-ivory text-earth-black flex flex-col selection:bg-earth-green selection:text-white">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Bar */}
      <Navbar />

      {/* Main Landing Sections */}
      <main className="flex-grow">
        {/* 3. Hero Section with Large Background Typography & Central Product Visual */}
        <HeroSection />

        {/* 4. Full-Width Dark Category/Feature Strip */}
        <DarkFeatureStrip />

        {/* 5. Editorial Feature Banner */}
        <EditorialFeatureBanner />

        {/* 6. Benefits / Facts Strip */}
        <BenefitsStrip />

        {/* 7. Explore Geothermal Section (More Than Electricity) */}
        <ExploreGeothermal />

        {/* 8. Balanced Environmental Impact Section */}
        <EnvironmentalImpact />

        {/* 9. Next Generation / Future Section */}
        <FutureSection />
      </main>

      {/* 10. Restrained Footer */}
      <Footer onOpenReferences={() => setReferencesOpen(true)} />

      {/* 11. Scientific References Modal */}
      <ReferencesModal
        isOpen={referencesOpen}
        onClose={() => setReferencesOpen(false)}
      />
    </div>
  );
}

export default App;
