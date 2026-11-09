import React, { useState } from 'react';
import { Flame, Droplets, Cpu, Zap, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TransitionPanel } from '@/components/core/transition-panel';
import { TECH_TYPES } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../lib/motionTokens';

interface PhaseDetail {
  number: string;
  tag: string;
  title: string;
  subtitle: string;
  summary: string;
  extended: string;
  thermodynamics: string;
  parameters: { label: string; value: string }[];
  image: string;
  imageAlt: string;
  caption: string;
  icon: typeof Flame;
}

const PHASES: PhaseDetail[] = [
  {
    number: '01',
    tag: 'PHASE 01 — SUBTERRANEAN HEAT',
    title: 'Underground Heat',
    subtitle: 'Mantle Heat & Radioactive Decay',
    summary: 'Deep underground rock contains thermal energy originating from Earth\'s internal heat and radioactive decay.',
    extended: 'Deep crystalline bedrock is continuously heated by conductive flow from the Earth\'s core and the natural decay of radioactive isotopes (uranium, thorium, potassium) within continental granites. Thermal gradients typically rise 25°C–30°C per kilometer, reaching temperatures between 150°C and 370°C+ in exploitable geothermal reservoirs.',
    thermodynamics: 'Subterranean enthalpy conductive & convective transfer',
    parameters: [
      { label: 'RESERVOIR TEMP', value: '150°C – 370°C+' },
      { label: 'FORMATION DEPTH', value: '1.5 – 5.0 Kilometers' },
      { label: 'ENERGY SOURCE', value: 'Primordial & Radiogenic Heat' },
    ],
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Geothermal volcanic fissure and subterranean thermal formation',
    caption: 'Deep Crustal Strata · High-Enthalpy Hydrothermal Bedrock',
    icon: Flame,
  },
  {
    number: '02',
    tag: 'PHASE 02 — EXTRACTION',
    title: 'Heated Fluid Extraction',
    subtitle: 'Pressurized Hydrodynamic Ascent',
    summary: 'Fluid circulating through suitable geothermal formations absorbs heat and carries it toward the surface through production wells.',
    extended: 'Water percolating through deep fractured permeable rock reaches extreme hydrostatic pressures (10–35 MPa) and absorbs high-enthalpy thermal energy. Deep production boreholes—lined with high-integrity steel casing to isolate freshwater aquifers—channel this pressurized hydrothermal fluid upward without requiring combustion.',
    thermodynamics: 'Pressurized hydrodynamic ascent without combustion',
    parameters: [
      { label: 'HYDROSTATIC PRESSURE', value: '10 – 35 Megapascals' },
      { label: 'BOREHOLE CASING', value: 'Multi-Barrier Steel Isolated' },
      { label: 'FLUID MEDIUM', value: 'Mineralized Hydrothermal Brine' },
    ],
    image: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Geothermal production wellhead and mineral extraction infrastructure',
    caption: 'Production Wellhead · High-Pressure Hydrodynamic Transport',
    icon: Droplets,
  },
  {
    number: '03',
    tag: 'PHASE 03 — ENERGY CONVERSION',
    title: 'Turbine or Heat Exchanger',
    subtitle: 'Rankine & Binary Thermodynamic Conversion',
    summary: 'Depending on the plant design, steam may drive a turbine directly, or geothermal fluid may transfer heat to a secondary working fluid through a heat exchanger.',
    extended: 'In high-temperature flash plants, pressurized brine is depressurized, instantaneously flashing into steam that spins high-capacity multi-stage electrical turbines. In moderate-temperature binary plants, the brine circulates through a closed heat exchanger, transferring its thermal energy to a secondary organic fluid (e.g., isopentane) that boils at a lower temperature, vaporizing to drive an Organic Rankine Cycle generator in a hermetically sealed circuit.',
    thermodynamics: 'Thermal-to-mechanical Rankine / Organic Rankine cycle',
    parameters: [
      { label: 'CYCLE EFFICIENCY', value: 'Rankine Expansion Conversion' },
      { label: 'BINARY FLUID', value: 'Hermetic Closed Organic Loop' },
      { label: 'TURBINE OUTPUT', value: 'Synchronous Alternating Current' },
    ],
    image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Geothermal power generation steam turbine and electrical generators',
    caption: 'Turbine Hall · High-Pressure Thermodynamic Expansion',
    icon: Cpu,
  },
  {
    number: '04',
    tag: 'PHASE 04 — MASS BALANCE & INJECTION',
    title: 'Useful Energy & Reinjection',
    subtitle: '100% Mass Balance & Closed-Loop Sustainability',
    summary: 'The system generates electricity or supplies useful heat. In many geothermal systems, cooled fluid is reinjected to support reservoir management and circulation.',
    extended: 'Clean electricity is synchronized and dispatched to the high-voltage grid with a >90% capacity factor, or thermal enthalpy is routed to municipal district networks. Critically, 100% of the cooled geothermal brine is directed into deep injection boreholes and returned to the subterranean formation, replenishing reservoir pressure, maintaining hydrostatic equilibrium, and ensuring long-term circular heat harvest.',
    thermodynamics: 'Closed-loop circular conservation of reservoir mass',
    parameters: [
      { label: 'REINJECTION RATIO', value: '100% Closed Reservoir Loop' },
      { label: 'CAPACITY FACTOR', value: '>90% Dispatchable Baseload' },
      { label: 'ENVIRONMENTAL IMPACT', value: 'Aquifer Protected & Zero Combustion' },
    ],
    image: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&w=1200&q=80',
    imageAlt: 'Modern clean geothermal energy generation facility with reinjection loop',
    caption: 'Reinjection Array · Full Closed-Loop Mass Balance',
    icon: Zap,
  },
];

export const HowItWorksSection: React.FC = () => {
  const [activePhase, setActivePhase] = useState(0);
  const [activeTechIdx, setActiveTechIdx] = useState(0);
  const shouldReduceMotion = useReducedMotionPreference();

  // Custom TransitionPanel variants with vertical translation and blur as specified
  const panelVariants = {
    enter: {
      opacity: 0,
      y: -50,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)',
    },
    center: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
    },
    exit: {
      opacity: 0,
      y: 50,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)',
    },
  };

  return (
    <section 
      id="how-it-works" 
      className="bg-[#11110F] text-[#E8E6DF] py-16 sm:py-24 md:py-32 border-b border-[#232521] scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ======================================================== */}
        {/* 1. SECTION HEADER                                        */}
        {/* ======================================================== */}
        <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <Reveal variant="fadeUp" delay={0.05}>
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-earth-sage uppercase mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
              <span>THERMODYNAMIC ENERGY CONVERSION // SUBSURFACE DYNAMICS</span>
            </div>
          </Reveal>

          <TextReveal
            text="How It Works: From Crust to Grid."
            mode="line"
            as="h2"
            delay={0.1}
            className="font-editorial text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-white leading-[1.08] mb-4 sm:mb-6"
          />

          <Reveal variant="fadeUp" delay={0.2}>
            <p className="text-xs sm:text-sm md:text-base text-[#A3A199] font-sans leading-relaxed max-w-3xl border-l-2 border-earth-sage/40 pl-4 sm:pl-6">
              Geothermal energy harnesses the natural heat of subterranean rock. While specific plants vary based on geological temperature and pressure, all systems follow a four-phase thermodynamic sequence.
            </p>
          </Reveal>
        </div>

        {/* ======================================================== */}
        {/* 2. PERSISTENT COMPLETE OVERVIEW SEQUENCE STRIP           */}
        {/* Ensures all 4 phases remain clear at a glance            */}
        {/* ======================================================== */}
        <div className="mb-10 sm:mb-14">
          <div className="flex items-center justify-between border-b border-[#232521] pb-3 mb-4 sm:mb-6">
            <span className="text-[10px] font-mono tracking-widest uppercase text-earth-sage">
              UNIVERSAL 4-PHASE SEQUENCE AT A GLANCE
            </span>
            <span className="text-[10px] font-mono text-[#74726B] hidden sm:inline">
              SELECT ANY PHASE TO EXPLORE THERMODYNAMICS
            </span>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {PHASES.map((p, idx) => {
              const IconComp = p.icon;
              const isActive = activePhase === idx;

              return (
                <button
                  key={p.number}
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`phase-panel-${idx}`}
                  onClick={() => setActivePhase(idx)}
                  className={`text-left p-3.5 sm:p-5 border transition-all duration-300 relative group flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#181F1A] border-earth-sage text-white shadow-lg'
                      : 'bg-[#141513] border-[#262824] text-[#A3A199] hover:border-[#383B35]'
                  }`}
                >
                  {/* Active Indicator Top Line */}
                  {isActive && (
                    <motion.div
                      layoutId="active-phase-top-bar"
                      className="absolute -top-[1px] left-0 right-0 h-[2px] bg-earth-sage"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-2 sm:mb-3">
                      <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-earth-sage font-semibold">
                        PHASE {p.number}
                      </span>
                      <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-earth-sage' : 'text-[#686762]'}`} />
                    </div>

                    <h4 className="font-editorial text-sm sm:text-base font-medium text-white mb-1.5 leading-snug">
                      {p.title}
                    </h4>

                    <p className="text-[11px] text-[#A3A199] font-sans line-clamp-2 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>

                  <div className="pt-3 mt-3 border-t border-[#232521] flex items-center justify-between text-[9px] font-mono text-earth-sage/80">
                    <span>{isActive ? 'ACTIVE VIEW' : 'INSPECT'}</span>
                    <ChevronRight className={`w-3 h-3 transform transition-transform ${isActive ? 'translate-x-1 text-white' : ''}`} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. CENTRAL TRANSITION PANEL INTERACTIVE FEATURE          */}
        {/* ======================================================== */}
        <div className="bg-[#141513] border border-[#262824] p-6 sm:p-8 md:p-12 mb-16 sm:mb-24 shadow-[0_25px_60px_rgba(0,0,0,0.5)]">
          <div className="border-b border-[#232521] pb-4 mb-6 sm:mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-earth-sage animate-pulse" />
              <span className="font-mono text-[10px] tracking-widest uppercase text-white font-semibold">
                ACTIVE PHASE DEEP DIVE: {PHASES[activePhase].tag}
              </span>
            </div>
            <span className="text-[10px] font-mono text-earth-sage">
              THERMODYNAMICS // RANKINE CYCLE
            </span>
          </div>

          {/* TransitionPanel Component */}
          <TransitionPanel
            activeIndex={activePhase}
            variants={panelVariants}
            transition={{ duration: 0.45, ease: MOTION_EASINGS.editorial }}
            className="w-full"
          >
            {PHASES.map((phase, idx) => {
              const IconComp = phase.icon;

              return (
                <div 
                  key={phase.number} 
                  id={`phase-panel-${idx}`}
                  role="tabpanel"
                  className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"
                >
                  {/* Left Column: Comprehensive Technical Narrative */}
                  <div className="lg:col-span-7 space-y-5">
                    <div className="inline-flex items-center space-x-2 px-3 py-1 bg-[#1A221D] border border-earth-sage/30 rounded-full text-xs font-mono text-earth-sage">
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{phase.subtitle}</span>
                    </div>

                    <h3 className="font-editorial text-2xl sm:text-4xl md:text-5xl font-medium text-white tracking-tight leading-[1.12]">
                      {phase.title}
                    </h3>

                    <p className="text-sm sm:text-base text-white/90 font-sans leading-relaxed border-l-2 border-earth-sage pl-4">
                      {phase.summary}
                    </p>

                    <p className="text-xs sm:text-sm text-[#BCB9AF] font-sans leading-relaxed">
                      {phase.extended}
                    </p>

                    {/* Thermodynamic Parameters Grid */}
                    <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-[#232521]">
                      {phase.parameters.map((param, pIdx) => (
                        <div key={pIdx} className="p-3 bg-[#181917] border border-[#2B2D29]">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-earth-sage block mb-1">
                            {param.label}
                          </span>
                          <span className="font-sans text-xs text-white font-medium block leading-snug">
                            {param.value}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: High-Resolution Photographic Framing */}
                  <div className="lg:col-span-5">
                    <div className="relative group overflow-hidden bg-[#181917] border border-[#2B2D29] shadow-2xl">
                      <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden">
                        <img
                          src={phase.image}
                          alt={phase.imageAlt}
                          loading="lazy"
                          className="w-full h-full object-cover img-editorial-zoom filter saturate-[0.9] contrast-[1.05]"
                        />
                      </div>
                      <div className="p-3.5 sm:p-4 bg-[#111210] border-t border-[#2B2D29] flex items-center justify-between text-xs text-[#9E9D95]">
                        <span className="font-sans text-[11px] sm:text-xs truncate mr-2">
                          {phase.caption}
                        </span>
                        <span className="font-mono text-[10px] tracking-wider text-earth-sage shrink-0">
                          {phase.number} // 04
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </TransitionPanel>
        </div>

        {/* ======================================================== */}
        {/* 4. SUPPORTING TECHNOLOGY SPECTRUM (Enthalpy Spectrum)    */}
        {/* ======================================================== */}
        <div className="border-t border-[#232521] pt-12 sm:pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-earth-sage block mb-1.5 sm:mb-2">
                TECHNOLOGY SPECTRUM
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl font-medium text-white">
                Different Enthalpy, Different Systems
              </h3>
            </div>
            <p className="text-xs text-[#A3A199] font-sans max-w-md mt-2 md:mt-0 leading-relaxed">
              Geothermal resources span a broad temperature spectrum, dictating distinct mechanical cycles for optimal energy extraction.
            </p>
          </div>

          {/* Technology Selector Tabs with layoutId indicator */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
            {TECH_TYPES.map((tech, idx) => (
              <button
                key={tech.name}
                onClick={() => setActiveTechIdx(idx)}
                className={`relative text-left p-3 sm:p-4 border transition-colors duration-200 min-w-0 ${
                  activeTechIdx === idx
                    ? 'border-earth-sage text-white'
                    : 'bg-[#181917] border-[#2B2D29] text-[#A3A199] hover:border-[#40433C]'
                }`}
              >
                {activeTechIdx === idx && (
                  <motion.div
                    layoutId="tech-tab-active-bg"
                    className="absolute inset-0 bg-earth-forest z-0"
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                <div className="relative z-10">
                  <span className="block text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-earth-sage mb-0.5 sm:mb-1">
                    TYPE 0{idx + 1}
                  </span>
                  <span className="font-editorial text-sm sm:text-base md:text-lg block font-medium truncate">
                    {tech.name}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-mono text-[#D5D2C7] mt-0.5 sm:mt-1 block truncate">
                    {tech.temperature}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Active Technology Deep Dive Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTechIdx}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{ duration: MOTION_DURATIONS.quick, ease: MOTION_EASINGS.editorial }}
              className="p-5 sm:p-7 md:p-8 bg-[#181917] border border-[#2B2D29] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
            >
              <div className="md:col-span-7 space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-earth-sage">
                  <span className="px-2.5 py-0.5 bg-[#20221E] border border-earth-sage/30 uppercase tracking-widest text-[10px]">
                    ACTIVE ARCHITECTURE
                  </span>
                  <span className="text-xs">{TECH_TYPES[activeTechIdx].temperature}</span>
                </div>
                <h4 className="font-editorial text-xl sm:text-2xl md:text-3xl text-white font-medium">
                  {TECH_TYPES[activeTechIdx].name} Systems
                </h4>
                <p className="text-xs sm:text-sm text-[#CCCCCC] font-sans leading-relaxed">
                  {TECH_TYPES[activeTechIdx].process}
                </p>
              </div>

              <div className="md:col-span-5 bg-[#1F211D] p-4 sm:p-6 border border-[#30332C] space-y-3">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-earth-sage shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#9E9D95] block">
                      Target Sector:
                    </span>
                    <span className="text-xs text-white font-sans font-medium">
                      {TECH_TYPES[activeTechIdx].application}
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5 pt-2.5 sm:pt-3 border-t border-[#30332C]">
                  <CheckCircle2 className="w-4 h-4 text-earth-sage shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#9E9D95] block">
                      Thermodynamic Performance:
                    </span>
                    <span className="text-xs text-white font-sans font-medium">
                      {TECH_TYPES[activeTechIdx].efficiency}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
