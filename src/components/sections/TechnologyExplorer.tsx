import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Thermometer } from 'lucide-react';
import { TECHNOLOGY_EXPLORER_DATA, TechnologyExplorerItem } from '../../data/technologyExplorer';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_EASINGS } from '../../lib/motionTokens';

export const TechnologyExplorer: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(1); // Default to Binary Cycle (02) as spotlighted in design prompt
  const shouldReduceMotion = useReducedMotionPreference();
  const activeTech: TechnologyExplorerItem = TECHNOLOGY_EXPLORER_DATA[activeIdx];
  const tabsContainerRef = useRef<HTMLDivElement>(null);

  // Smoothly center active tab horizontally within its local container ONLY on user click.
  // Never uses scrollIntoView (which scrolls window/ancestors) and never runs on initial mount.
  const handleTabClick = (idx: number) => {
    setActiveIdx(idx);
    if (tabsContainerRef.current) {
      const container = tabsContainerRef.current;
      const btn = container.querySelector<HTMLButtonElement>(`[data-tech-idx="${idx}"]`);
      if (btn) {
        const scrollLeft = btn.offsetLeft - container.clientWidth / 2 + btn.clientWidth / 2;
        container.scrollTo({
          left: scrollLeft,
          behavior: shouldReduceMotion ? 'auto' : 'smooth',
        });
      }
    }
  };

  // Motion variants for active content transition with restrained blur and vertical glide
  const contentVariants = {
    initial: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : 12,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)',
    },
    animate: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.42,
        ease: MOTION_EASINGS.editorial,
      },
    },
    exit: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : -10,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(3px)',
      transition: {
        duration: 0.28,
        ease: MOTION_EASINGS.editorial,
      },
    },
  };

  const imageVariants = {
    initial: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 1.025,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(4px)',
    },
    animate: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.5,
        ease: MOTION_EASINGS.editorial,
      },
    },
    exit: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.99,
      transition: {
        duration: 0.25,
        ease: MOTION_EASINGS.editorial,
      },
    },
  };

  return (
    <div className="border-t border-[#232521] pt-16 sm:pt-20 md:pt-24">
      {/* ============================================================ */}
      {/* 1. SECTION INTRODUCTION                                      */}
      {/* ============================================================ */}
      <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20">
        <Reveal variant="fadeUp" delay={0.05}>
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-earth-sage uppercase mb-3 sm:mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
            <span>GEOTHERMAL CLASSIFICATION · SYSTEMS 01–04</span>
          </div>
        </Reveal>

        <TextReveal
          text="One Heat Source. Four Ways to Harness It."
          mode="line"
          as="h3"
          delay={0.1}
          className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-medium tracking-tight leading-[1.08] mb-4 sm:mb-6"
        />

        <Reveal variant="fadeUp" delay={0.2}>
          <p className="font-sans text-xs sm:text-sm md:text-base text-[#A3A199] leading-relaxed max-w-3xl border-l-2 border-earth-sage/40 pl-4 sm:pl-6">
            From shallow ground temperatures to extreme subterranean heat, different geothermal technologies transform Earth&apos;s thermal energy into electricity and useful heating.
          </p>
        </Reveal>
      </div>

      {/* ============================================================ */}
      {/* 2. TEMPERATURE SPECTRUM NAVIGATION                           */}
      {/* Elegant horizontal scale with 4 selectable technology points */}
      {/* ============================================================ */}
      <div className="mb-12 sm:mb-16 md:mb-20">
        <div className="flex items-center justify-between pb-3 mb-6 sm:mb-8 border-b border-[#232521]">
          <span className="text-[10px] font-mono tracking-widest uppercase text-earth-sage flex items-center space-x-2">
            <Thermometer className="w-3.5 h-3.5 text-earth-sage" />
            <span>THERMAL ENTHALPY SPECTRUM</span>
          </span>
          <span className="text-[10px] font-mono text-[#74726B] hidden sm:inline">
            SELECT A TECHNOLOGY TO EXPLORE MECHANICAL CYCLES
          </span>
        </div>

        {/* Spectrum Track and Selectable Nodes */}
        <div className="relative">
          {/* Continuous Desktop Baseline Spectrum Track */}
          <div className="hidden md:block absolute top-[28px] left-[6%] right-[6%] h-[1px] bg-[#262824] z-0" aria-hidden="true">
            {/* Active Highlight Segment across spectrum */}
            <motion.div
              className="h-[2px] bg-gradient-to-r from-earth-forest via-earth-sage to-earth-sage/80"
              initial={false}
              animate={{
                left: `${(activeIdx / 3) * 85}%`,
                width: '15%',
              }}
              transition={{
                type: 'spring',
                stiffness: shouldReduceMotion ? 999 : 350,
                damping: 32,
              }}
            />
          </div>

          {/* Interactive Spectrum Node Buttons */}
          <div 
            ref={tabsContainerRef}
            role="tablist"
            aria-label="Geothermal Technology Spectrum"
            className="flex md:grid md:grid-cols-4 gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0 snap-x"
          >
            {TECHNOLOGY_EXPLORER_DATA.map((tech, idx) => {
              const isActive = activeIdx === idx;

              return (
                <button
                  key={tech.id}
                  data-tech-idx={idx}
                  role="tab"
                  id={`tech-tab-${tech.id}`}
                  aria-selected={isActive}
                  aria-controls={`tech-panel-${tech.id}`}
                  onClick={() => handleTabClick(idx)}
                  className={`group relative text-left p-4 sm:p-5 border transition-all duration-300 min-w-[230px] sm:min-w-[260px] md:min-w-0 shrink-0 md:shrink snap-start flex flex-col justify-between ${
                    isActive
                      ? 'bg-[#151B17] border-earth-sage text-white shadow-lg'
                      : 'bg-[#141513] border-[#262824] text-[#A3A199] hover:border-[#383B35] hover:text-[#D5D2C7]'
                  }`}
                >
                  {/* Active Indicator Top Edge Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="active-tech-spectrum-bar"
                      className="absolute -top-[1px] left-0 right-0 h-[2px] bg-earth-sage"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}

                  <div>
                    {/* Node Identifier & Temperature Pill */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        {/* Circular Numbered Marker on Spectrum */}
                        <div 
                          className={`w-6 h-6 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all duration-300 ${
                            isActive
                              ? 'bg-earth-forest text-earth-ivory border border-earth-sage scale-110 shadow-sm'
                              : 'bg-[#1E201B] text-[#78766F] border border-[#2E3129] group-hover:text-white'
                          }`}
                        >
                          {tech.number}
                        </div>
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-earth-sage font-semibold">
                          TYPE {tech.number}
                        </span>
                      </div>

                      {/* Temperature Range Badge */}
                      <span 
                        className={`font-mono text-[10px] sm:text-[11px] px-2 py-0.5 border rounded-full transition-colors ${
                          isActive 
                            ? 'bg-[#1A251E] border-earth-sage/60 text-earth-sage font-semibold' 
                            : 'bg-[#181917] border-[#2A2C27] text-[#8C8A82]'
                        }`}
                      >
                        {tech.temperature}
                      </span>
                    </div>

                    {/* Technology Name */}
                    <h4 className="font-editorial text-base sm:text-lg font-medium text-white mb-1.5 leading-snug">
                      {tech.name}
                    </h4>

                    {/* Enthalpy Classification Tag */}
                    <p className="font-mono text-[10px] text-[#807E77] leading-relaxed truncate">
                      {tech.enthalpyTier}
                    </p>
                  </div>

                  {/* Node Bottom Status / Tap Indicator */}
                  <div className="pt-3 mt-3 border-t border-[#232521] flex items-center justify-between text-[9px] font-mono text-earth-sage/80">
                    <span>{isActive ? 'CURRENTLY INSPECTING' : 'SELECT ARCHITECTURE'}</span>
                    <ChevronRight 
                      className={`w-3 h-3 transform transition-transform duration-300 ${
                        isActive ? 'translate-x-1 text-earth-sage' : 'text-[#585752] group-hover:text-white'
                      }`} 
                    />
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 3. ACTIVE TECHNOLOGY DISPLAY                                 */}
      {/* Premium Editorial Composition (2-Column Desktop / Mobile)    */}
      {/* ============================================================ */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTech.id}
          id={`tech-panel-${activeTech.id}`}
          role="tabpanel"
          aria-labelledby={`tech-tab-${activeTech.id}`}
          variants={contentVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-start pb-8"
        >
          {/* ======================================================== */}
          {/* LEFT COLUMN: Technical Narrative & Scientific Details    */}
          {/* ======================================================== */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8">
            {/* Header Badge Strip */}
            <div className="flex flex-wrap items-center gap-2.5">
              {/* Technical Identifier */}
              <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-earth-sage uppercase font-semibold">
                {activeTech.typeId}
              </span>

              <span className="text-[#3A3C36] font-mono">/</span>

              {/* Temperature Badge */}
              <span className="inline-flex items-center space-x-1.5 px-3 py-0.5 bg-[#17221A] border border-earth-sage/40 rounded-full font-mono text-[10px] sm:text-[11px] text-earth-sage font-medium">
                <Thermometer className="w-3 h-3 text-earth-sage" />
                <span>{activeTech.temperature}</span>
              </span>

              {/* Special Note Badge: Direct Thermal vs Power Generation */}
              {activeTech.isDirectThermal && (
                <span className="px-2.5 py-0.5 bg-[#25231C] border border-amber-600/30 rounded-full font-mono text-[9px] sm:text-[10px] text-amber-300 tracking-wider">
                  DIRECT THERMAL USE · NON-POWER GENERATION
                </span>
              )}
            </div>

            {/* Large Technology Heading */}
            <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-[2.65rem] text-white font-medium tracking-tight leading-[1.12]">
              {activeTech.heading}
            </h3>

            {/* Core Explanatory Narrative */}
            <p className="font-sans text-sm sm:text-base text-[#D5D2C7] leading-relaxed max-w-2xl border-l-2 border-earth-sage/60 pl-4 sm:pl-5">
              {activeTech.explanation}
            </p>

            {/* Supporting Technical Tiers with Clean Hairline Separators */}
            <div className="space-y-5 pt-2">
              {/* Tier 1: Thermodynamic Mechanism (How It Works) */}
              <div className="pt-4 border-t border-[#232521]">
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-earth-sage uppercase font-semibold">
                    {activeTech.howItWorks.label}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#BCB9AF] leading-relaxed">
                  {activeTech.howItWorks.description}
                </p>
              </div>

              {/* Tier 2: Target Applications & Sectors */}
              <div className="pt-4 border-t border-[#232521]">
                <div className="flex items-center space-x-2 mb-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-earth-sage uppercase font-semibold">
                    {activeTech.applications.label}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#BCB9AF] leading-relaxed mb-2.5">
                  {activeTech.applications.description}
                </p>
                {/* Sector Badges */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {activeTech.applications.sectors.map((sector) => (
                    <span 
                      key={sector}
                      className="px-2.5 py-1 bg-[#161815] border border-[#2B2D29] rounded text-[10px] font-mono text-[#A8A69E] tracking-wider"
                    >
                      {sector}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tier 3: Thermodynamic Performance Metrics */}
              <div className="pt-4 border-t border-[#232521]">
                <div className="flex items-center space-x-2 mb-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
                  <span className="font-mono text-[10px] sm:text-[11px] tracking-widest text-earth-sage uppercase font-semibold">
                    {activeTech.performance.label}
                  </span>
                </div>
                <p className="font-sans text-xs sm:text-sm text-[#BCB9AF] leading-relaxed mb-3.5">
                  {activeTech.performance.description}
                </p>

                {/* Parameters Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3">
                  {activeTech.performance.parameters.map((param, pIdx) => (
                    <div 
                      key={pIdx} 
                      className="p-3 bg-[#151714] border border-[#262823] rounded-sm transition-colors hover:border-[#383C34]"
                    >
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
            </div>
          </div>

          {/* ======================================================== */}
          {/* RIGHT COLUMN: Large Integrated Technology Photograph     */}
          {/* ======================================================== */}
          <div className="lg:col-span-5 w-full">
            <motion.div 
              variants={imageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="relative overflow-hidden bg-[#181917] border border-[#2B2D29] shadow-2xl group"
            >
              {/* Aspect Ratio Photographic Container */}
              <div className="aspect-[4/3] sm:aspect-[16/11] lg:aspect-[4/3] overflow-hidden relative">
                <img
                  src={activeTech.image}
                  alt={activeTech.imageAlt}
                  loading="lazy"
                  decoding="async"
                  width={1400}
                  height={1050}
                  className="w-full h-full object-cover filter saturate-[0.92] contrast-[1.05] transition-transform duration-700 group-hover:scale-105"
                />

                {/* Top Overlay Badge: Temperature Threshold */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10">
                  <div className="inline-flex items-center space-x-1.5 px-3 py-1 bg-black/75 backdrop-blur-md border border-white/10 rounded-full font-mono text-[10px] text-earth-sage tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
                    <span>{activeTech.tempDisplay} · {activeTech.tempSubtext}</span>
                  </div>
                </div>

                {/* Subtle vignette gradient for editorial polish */}
                <div 
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" 
                  aria-hidden="true" 
                />
              </div>

              {/* Bottom Integrated Metadata & Caption Bar */}
              <div className="p-3.5 sm:p-4 bg-[#111210] border-t border-[#262824] flex items-center justify-between text-xs text-[#9E9D95]">
                <span className="font-sans text-[11px] sm:text-xs truncate mr-2 text-[#C5C2B8]">
                  {activeTech.imageCaption}
                </span>
                <span className="font-mono text-[10px] tracking-wider text-earth-sage shrink-0 font-medium">
                  SYSTEM {activeTech.number} OF 04
                </span>
              </div>
            </motion.div>

            {/* Section Footnote / Reference Note */}
            <div className="mt-4 flex items-center justify-between text-[10px] font-mono tracking-wider text-[#6B6A64]">
              <span>THERMODYNAMIC CLASSIFICATION</span>
              <span>US DOE & IEA GEOTHERMAL METRICS</span>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
