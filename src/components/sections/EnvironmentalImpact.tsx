import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Activity, Droplets, ArrowDown, BookOpen } from 'lucide-react';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { ImageReveal } from '../motion/ImageReveal';
import { MagneticButton } from '../motion/MagneticButton';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../lib/motionTokens';

interface EnvironmentalImpactProps {
  onOpenReferences: () => void;
}

// Promise vs. Responsibility Pairings Data
const BALANCE_PAIRINGS = [
  {
    id: 'baseload',
    promise: 'Continuous 24/7 Electricity',
    promiseContext: 'Generates uninterrupted clean baseload power independent of solar radiance or wind velocity.',
    responsibility: 'Reservoir Pressure Stewardship',
    responsibilityContext: 'Reinjecting geothermal brine into the reservoir maintains hydrostatic pressure, mitigates ground subsidence, and prevents localized thermal exhaustion.',
    metrics: '>90% Capacity Factor ⇄ Hydrostatic Equilibrium'
  },
  {
    id: 'emissions',
    promise: 'Ultra-Low Lifecycle Carbon',
    promiseContext: 'Median lifecycle emissions (~38–45 g CO₂/kWh) comparable to offshore wind, far below fossil fuels.',
    responsibility: 'Closed-Loop Fluid & Gas Containment',
    responsibilityContext: 'Modern binary power plants circulate brine through hermetic heat exchangers. In flash facilities, non-condensable gases (CO₂, H₂S) require catalytic abatement or mineralization (e.g. Carbfix).',
    metrics: '95% Less Carbon Than Coal ⇄ Hermetic Circuits'
  },
  {
    id: 'footprint',
    promise: 'Compact Surface Footprint',
    promiseContext: 'Requires ~400 m² per GWh over 30 years—drastically lower land intensity than utility-scale solar or wind farms.',
    responsibility: 'Induced Micro-Seismicity Monitoring',
    responsibilityContext: 'High-pressure fluid injection into deep bedrock fractures can trigger micro-tremors. Dense passive seismic sensor arrays and dynamic "traffic-light" pumping controls keep events far below human perception thresholds.',
    metrics: 'Minimal Surface Acreage ⇄ Real-Time Seismic Arrays'
  }
];

export const EnvironmentalImpact: React.FC<EnvironmentalImpactProps> = ({ onOpenReferences }) => {
  const shouldReduceMotion = useReducedMotionPreference();
  const [activePairing, setActivePairing] = useState(0);

  return (
    <section 
      id="impact" 
      className="bg-[#0D110F] text-[#E8E6DF] py-20 sm:py-28 md:py-36 border-b border-[#1E2722] relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ======================================================== */}
        {/* 1. SECTION INTRODUCTION & CENTRAL PHILOSOPHICAL MANIFESTO */}
        {/* ======================================================== */}
        <div className="max-w-4xl mb-20 sm:mb-28 md:mb-36">
          <Reveal variant="fadeUp" delay={0.05}>
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-earth-sage uppercase mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
              <span>THE OTHER SIDE OF CLEAN ENERGY</span>
            </div>
          </Reveal>

          <TextReveal
            text={"Energy for Today.\nResponsibility for Tomorrow."}
            mode="line"
            as="h2"
            delay={0.1}
            className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white mb-6 leading-[1.08]"
          />

          <Reveal variant="fadeUp" delay={0.25}>
            <div className="border-l-2 border-earth-sage/40 pl-5 sm:pl-7 space-y-3">
              <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-white/90 leading-snug">
                "Clean energy isn't about having zero impact. It's about making better choices."
              </p>
              <p className="text-xs sm:text-sm md:text-base text-[#A3A199] font-sans leading-relaxed max-w-2xl pt-1">
                Geothermal energy offers extraordinary potential to stabilize zero-carbon grids worldwide. But harnessing the raw thermal power of the Earth requires scientific humility, responsible reservoir management, and rigorous environmental stewardship.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ======================================================== */}
        {/* CHAPTER 01 — THE ADVANTAGE                                */}
        {/* ======================================================== */}
        <div className="py-16 sm:py-24 border-t border-[#1E2722]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Chapter Narrative */}
            <div className="lg:col-span-6 space-y-5">
              <Reveal variant="fadeUp" delay={0.05}>
                <div className="flex items-center space-x-3 text-[10px] font-mono tracking-widest text-earth-sage uppercase">
                  <span>CHAPTER 01</span>
                  <span className="text-[#3A453F]">/</span>
                  <span>THE ADVANTAGE</span>
                </div>
              </Reveal>

              <TextReveal
                text="Energy Without Waiting for the Weather."
                mode="line"
                as="h3"
                delay={0.1}
                className="font-editorial text-2xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-[1.12]"
              />

              <Reveal variant="fadeUp" delay={0.2}>
                <div className="space-y-4 text-xs sm:text-sm md:text-base text-[#C2BFA8] font-sans leading-relaxed">
                  <p>
                    Modern power grids face a fundamental dilemma: solar and wind energy fluctuate with sunlight and weather patterns. When clouds roll in or the wind stills, electricity networks often resort to carbon-intensive natural gas peaking turbines to maintain frequency and avoid blackouts.
                  </p>
                  <p>
                    Geothermal operates completely decoupled from atmospheric weather. Drawing heat continuously from the planetary mantle, geothermal stations run 24 hours a day, 365 days a year, delivering reliable baseload electricity and essential synchronous grid inertia.
                  </p>
                </div>
              </Reveal>

              {/* Technical Insight Pill */}
              <Reveal variant="fadeUp" delay={0.3}>
                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2.5 px-4 py-2 bg-[#141A17] border border-[#26352E] rounded-full text-xs font-mono text-earth-sage">
                    <Activity className="w-3.5 h-3.5 text-earth-sage shrink-0" />
                    <span>GRID STABILITY · DISPATCHABLE CAPACITY FACTOR &gt;90%</span>
                  </div>
                </div>
              </Reveal>
            </div>

            {/* Right: Photographic Composition with ImageReveal */}
            <div className="lg:col-span-6">
              <div className="relative group overflow-hidden bg-[#141A17] border border-[#202E27] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <ImageReveal
                  src="/images/environment/closed-loop-binary.webp"
                  alt="Geothermal energy power facility delivering reliable baseload power"
                  aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                  duration={MOTION_DURATIONS.image}
                />
                <div className="p-3.5 sm:p-4 bg-[#111714] border-t border-[#202E27] flex items-center justify-between text-xs text-[#9E9D95]">
                  <span className="font-sans text-[11px] sm:text-xs truncate mr-2">Baseload Power Facility · Continuous Generation</span>
                  <span className="font-mono text-[10px] tracking-wider text-earth-sage shrink-0">SCENE · 01</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CHAPTER 02 — THE HIDDEN COMPLEXITY                        */}
        {/* ======================================================== */}
        <div className="py-16 sm:py-24 border-t border-[#1E2722]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            {/* Left: Geological Strata Image with ImageReveal */}
            <div className="lg:col-span-6 order-2 lg:order-1">
              <div className="relative group overflow-hidden bg-[#141A17] border border-[#202E27] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <ImageReveal
                  src="/images/environment/surface-footprint-coexistence.webp"
                  alt="Deep geothermal volcanic fissures and geological rock strata"
                  aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                  duration={MOTION_DURATIONS.image}
                />
                <div className="p-3.5 sm:p-4 bg-[#111714] border-t border-[#202E27] flex items-center justify-between text-xs text-[#9E9D95]">
                  <span className="font-sans text-[11px] sm:text-xs truncate mr-2">Subsurface Hydrodynamic Strata & Deep Fractures</span>
                  <span className="font-mono text-[10px] tracking-wider text-earth-sage shrink-0">SCENE · 02</span>
                </div>
              </div>
            </div>

            {/* Right: Chapter Narrative */}
            <div className="lg:col-span-6 order-1 lg:order-2 space-y-5">
              <Reveal variant="fadeUp" delay={0.05}>
                <div className="flex items-center space-x-3 text-[10px] font-mono tracking-widest text-earth-sage uppercase">
                  <span>CHAPTER 02</span>
                  <span className="text-[#3A453F]">/</span>
                  <span>THE HIDDEN COMPLEXITY</span>
                </div>
              </Reveal>

              <TextReveal
                text="What Happens Beneath the Surface?"
                mode="line"
                as="h3"
                delay={0.1}
                className="font-editorial text-2xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-[1.12]"
              />

              <Reveal variant="fadeUp" delay={0.2}>
                <div className="space-y-4 text-xs sm:text-sm md:text-base text-[#C2BFA8] font-sans leading-relaxed">
                  <p>
                    On the surface, a geothermal power station is remarkably quiet and unobtrusive—often just a compact turbine hall surrounded by native grasses. But deep underground lies an intricate, high-energy thermodynamic engine.
                  </p>
                  <p>
                    Pressurized hydrothermal fluids circulate through crystalline bedrock kilometers beneath our feet. Minerals dissolve, steam separates, and temperatures fluctuate. What happens miles underground matters just as much as what happens on the surface.
                  </p>
                </div>
              </Reveal>

              {/* Technical Insight Pill */}
              <Reveal variant="fadeUp" delay={0.3}>
                <div className="pt-2">
                  <div className="inline-flex items-center space-x-2.5 px-4 py-2 bg-[#141A17] border border-[#26352E] rounded-full text-xs font-mono text-earth-sage">
                    <Droplets className="w-3.5 h-3.5 text-earth-sage shrink-0" />
                    <span>SUBSURFACE THERMODYNAMICS · HYDROTHERMAL CIRCULATION</span>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* INTERACTION: PROMISE VS. RESPONSIBILITY                  */}
        {/* ======================================================== */}
        <div className="py-16 sm:py-24 border-t border-[#1E2722]">
          <div className="max-w-3xl mb-12">
            <span className="text-[10px] font-mono tracking-widest text-earth-sage uppercase block mb-2">
              THE BALANCE OF STEWARDSHIP
            </span>
            <TextReveal
              text="Every Clean Energy Promise Involves a Responsibility."
              mode="line"
              as="h3"
              delay={0.1}
              className="font-editorial text-2xl sm:text-4xl font-medium text-white tracking-tight"
            />
            <p className="text-xs sm:text-sm text-[#A3A199] font-sans mt-2 leading-relaxed">
              Explore how environmental benefits are paired with active subsurface management protocols to prevent harm.
            </p>
          </div>

          {/* Interactive Selector Tabs with layoutId indicator */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8">
            {BALANCE_PAIRINGS.map((pairing, idx) => (
              <button
                key={pairing.id}
                onClick={() => setActivePairing(idx)}
                className={`relative text-left p-4 sm:p-5 border transition-colors duration-200 ${
                  activePairing === idx
                    ? 'border-earth-sage text-white shadow-lg'
                    : 'bg-[#131715] border-[#222E27] text-[#9E9D95] hover:border-[#334239]'
                }`}
              >
                {activePairing === idx && (
                  <motion.div
                    layoutId="active-balance-tab-bg"
                    className="absolute inset-0 bg-[#18231E] z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <span className="font-mono text-[9px] tracking-widest uppercase text-earth-sage block mb-1">
                    DIMENSION 0{idx + 1}
                  </span>
                  <span className="font-editorial text-base sm:text-lg text-white font-medium block leading-snug">
                    {pairing.promise}
                  </span>
                  <span className="text-[11px] font-mono text-earth-sage/80 block mt-2 truncate">
                    → {pairing.responsibility}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Interactive Pairing Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activePairing}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{ duration: MOTION_DURATIONS.quick, ease: MOTION_EASINGS.editorial }}
              className="p-6 sm:p-8 md:p-10 bg-[#131916] border border-[#26352E] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              {/* The Promise (Energy Advantage) */}
              <div className="lg:col-span-5 space-y-3">
                <span className="font-mono text-[10px] tracking-widest text-earth-sage uppercase block">
                  THE ENERGY BENEFIT
                </span>
                <h4 className="font-editorial text-2xl sm:text-3xl text-white font-medium">
                  {BALANCE_PAIRINGS[activePairing].promise}
                </h4>
                <p className="text-xs sm:text-sm text-[#BCB9AF] font-sans leading-relaxed">
                  {BALANCE_PAIRINGS[activePairing].promiseContext}
                </p>
              </div>

              {/* Connecting Symbol */}
              <div className="lg:col-span-2 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full border border-earth-sage/40 flex items-center justify-center text-earth-sage font-mono text-xs">
                  ⇄
                </div>
              </div>

              {/* The Responsibility (Environmental Management) */}
              <div className="lg:col-span-5 space-y-3 border-l-2 border-earth-sage/40 pl-6">
                <span className="font-mono text-[10px] tracking-widest text-white/70 uppercase block">
                  THE STEWARDSHIP PROTOCOL
                </span>
                <h4 className="font-editorial text-2xl sm:text-3xl text-white font-medium">
                  {BALANCE_PAIRINGS[activePairing].responsibility}
                </h4>
                <p className="text-xs sm:text-sm text-[#BCB9AF] font-sans leading-relaxed">
                  {BALANCE_PAIRINGS[activePairing].responsibilityContext}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ======================================================== */}
        {/* CHAPTER 03 — THE RESPONSIBILITY                           */}
        {/* ======================================================== */}
        <div className="py-16 sm:py-24 border-t border-[#1E2722]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left: Chapter Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <Reveal variant="fadeUp" delay={0.05}>
                <div className="flex items-center space-x-3 text-[10px] font-mono tracking-widest text-earth-sage uppercase">
                  <span>CHAPTER 03</span>
                  <span className="text-[#3A453F]">/</span>
                  <span>THE RESPONSIBILITY</span>
                </div>
              </Reveal>

              <TextReveal
                text="Water, Pressure, and the Ground Beneath Us."
                mode="line"
                as="h3"
                delay={0.1}
                className="font-editorial text-2xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-[1.12]"
              />

              <Reveal variant="fadeUp" delay={0.2}>
                <p className="text-xs sm:text-sm md:text-base text-[#C2BFA8] font-sans leading-relaxed">
                  Honest environmental communication requires addressing three specific subterranean questions directly:
                </p>
              </Reveal>

              {/* Three Specific Considerations */}
              <div className="space-y-6 pt-2">
                <Reveal variant="fadeUp" delay={0.25}>
                  <div className="border-l-2 border-earth-sage/60 pl-5 space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-earth-sage font-bold">01</span>
                      <span className="text-sm font-semibold text-white font-sans uppercase tracking-wider block">
                        Water Management & Reservoir Reinjection
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A3A199] font-sans leading-relaxed">
                      Extracted brine contains dissolved minerals. In modern closed-loop binary plants, 100% of fluid is reinjected deep into the source formation to maintain pressure, shield shallow drinking aquifers, and eliminate surface disposal.
                    </p>
                  </div>
                </Reveal>

                <Reveal variant="fadeUp" delay={0.35}>
                  <div className="border-l-2 border-earth-sage/60 pl-5 space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-earth-sage font-bold">02</span>
                      <span className="text-sm font-semibold text-white font-sans uppercase tracking-wider block">
                        Induced Micro-Seismicity Management
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A3A199] font-sans leading-relaxed">
                      Pumping fluids into deep rock can relieve natural tectonic stresses as micro-tremors. Dense passive seismic monitoring arrays and real-time "traffic-light" pump protocols throttle injection immediately if seismic thresholds are approached.
                    </p>
                  </div>
                </Reveal>

                <Reveal variant="fadeUp" delay={0.45}>
                  <div className="border-l-2 border-earth-sage/60 pl-5 space-y-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-[10px] text-earth-sage font-bold">03</span>
                      <span className="text-sm font-semibold text-white font-sans uppercase tracking-wider block">
                        Subsurface Reservoir Longevity
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-[#A3A199] font-sans leading-relaxed">
                      Over-extraction can lead to localized thermal cooling. Sustainable operations model extraction rates against natural geological recharge rates to ensure production spans decades without exhaustion.
                    </p>
                  </div>
                </Reveal>
              </div>
            </div>

            {/* Right: Monitoring & Wellhead Image with ImageReveal */}
            <div className="lg:col-span-6">
              <div className="relative group overflow-hidden bg-[#141A17] border border-[#202E27] shadow-[0_20px_50px_rgba(0,0,0,0.4)]">
                <ImageReveal
                  src="/images/environment/advanced-drilling-rig.webp"
                  alt="Precision subsurface monitoring and geothermal wellhead engineering"
                  aspectRatio="aspect-[4/3] sm:aspect-[16/11]"
                  duration={MOTION_DURATIONS.image}
                />
                <div className="p-3.5 sm:p-4 bg-[#111714] border-t border-[#202E27] flex items-center justify-between text-xs text-[#9E9D95]">
                  <span className="font-sans text-[11px] sm:text-xs truncate mr-2">High-Precision Subsurface Monitoring & Pressure Controls</span>
                  <span className="font-mono text-[10px] tracking-wider text-earth-sage shrink-0">SCENE · 03</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* CHAPTER 04 — THE BIGGER PICTURE & FINAL TRANSITION        */}
        {/* ======================================================== */}
        <div className="py-16 sm:py-24 border-t border-[#1E2722]">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Reveal variant="fadeUp" delay={0.05}>
              <div className="flex items-center justify-center space-x-3 text-[10px] font-mono tracking-widest text-earth-sage uppercase">
                <span>CHAPTER 04</span>
                <span className="text-[#3A453F]">/</span>
                <span>THE BIGGER PICTURE</span>
              </div>
            </Reveal>

            <TextReveal
              text="Progress Requires Responsibility."
              mode="line"
              as="h3"
              delay={0.1}
              className="font-editorial text-3xl sm:text-5xl md:text-6xl font-medium text-white tracking-tight leading-[1.08]"
            />

            <Reveal variant="fadeUp" delay={0.25}>
              <p className="text-xs sm:text-sm md:text-lg text-[#C2BFA8] font-sans leading-relaxed max-w-2xl mx-auto">
                Geothermal energy's long-term contribution to a decarbonized global economy depends on responsible engineering, transparent environmental monitoring, continuous innovation, and rigorous site selection.
              </p>
            </Reveal>

            {/* Powerful Closing Statement */}
            <Reveal variant="fadeUp" delay={0.35}>
              <div className="pt-6 pb-8">
                <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-white max-w-3xl mx-auto leading-snug border-y border-[#26352E] py-8">
                  "The future of energy isn't just about unlocking more power. It's about knowing how to use it responsibly."
                </p>
              </div>
            </Reveal>

            {/* Peer-Reviewed Methodology & Sources Area */}
            <Reveal variant="fadeUp" delay={0.45}>
              <div className="p-5 sm:p-6 bg-[#131916] border border-[#222E27] flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div>
                  <span className="text-[10px] sm:text-[11px] font-mono tracking-wider uppercase text-white block">
                    SCIENTIFIC RIGOR & INDEPENDENT DATA
                  </span>
                  <p className="text-xs text-[#9E9D95] font-sans mt-0.5">
                    Peer-reviewed environmental benchmarks verified through IPCC SRREN, NREL LCA, and US DOE Geothermal Technologies Office studies.
                  </p>
                </div>
                <MagneticButton
                  as="button"
                  onClick={onOpenReferences}
                  className="space-x-2 text-xs font-semibold tracking-widest uppercase px-5 py-2.5 bg-earth-forest border border-[#26352E] text-white hover:bg-earth-sage hover:text-earth-forest transition-colors shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>INSPECT SOURCES</span>
                </MagneticButton>
              </div>
            </Reveal>

            {/* FINAL TRANSITION BANNER INTO THE NEXT SECTION */}
            <div className="pt-16 sm:pt-20 flex flex-col items-center space-y-4">
              <span className="font-mono text-[11px] sm:text-[12px] tracking-[0.3em] uppercase text-earth-sage font-semibold">
                THE FUTURE IS NOT JUST ABOUT ENERGY. IT'S ABOUT RESPONSIBILITY.
              </span>
              <a
                href="#innovation"
                className="inline-flex items-center space-x-2 text-xs font-mono tracking-widest text-[#9E9D95] hover:text-white transition-colors group pt-2"
              >
                <span>CONTINUE TO THE NEXT-GENERATION FRONTIER</span>
                <ArrowDown className="w-3.5 h-3.5 text-earth-sage group-hover:translate-y-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
