import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent, useSpring } from 'motion/react';
import { ArrowRight, Sparkles, ArrowDown } from 'lucide-react';
import { NEXT_GEN_SECTION, NEXT_GEN_TECH } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_SPRINGS } from '../../lib/motionTokens';

interface FutureSectionProps {
  onOpenReferences: () => void;
}

export const FutureSection: React.FC<FutureSectionProps> = ({ onOpenReferences }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotionPreference();
  const [currentStage, setCurrentStage] = useState(1);

  // Measure vertical scroll through the pinned container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll progress using spring physics for liquid indicator movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: MOTION_SPRINGS.smooth.stiffness,
    damping: MOTION_SPRINGS.smooth.damping,
    restDelta: 0.001,
  });

  // Transform vertical scroll progress into horizontal translateX across 4 panels (0% to -75%)
  const translateX = useTransform(smoothProgress, [0, 1], ['0%', '-75%']);
  const progressBarWidth = useTransform(smoothProgress, [0, 1], ['0%', '100%']);

  // Update active stage indicator smoothly as horizontal track advances
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    if (latest < 0.28) {
      setCurrentStage(1);
    } else if (latest < 0.58) {
      setCurrentStage(2);
    } else if (latest < 0.88) {
      setCurrentStage(3);
    } else {
      setCurrentStage(4);
    }
  });

  // Reduced motion accessible fallback (clean vertical layout)
  if (shouldReduceMotion) {
    return (
      <section id="innovation" className="bg-earth-ivory py-16 sm:py-24 border-b border-earth-border scroll-mt-24">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
          {/* Section Introduction */}
          <div className="max-w-4xl mb-16">
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-earth-forest uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-earth-sage shrink-0" />
              <span>{NEXT_GEN_SECTION.eyebrow}</span>
            </div>
            <h2 className="font-editorial text-4xl sm:text-5xl md:text-6xl font-medium tracking-tight text-earth-forest mb-6">
              {NEXT_GEN_SECTION.headline}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-earth-black/80 font-sans leading-relaxed border-l-2 border-earth-forest/40 pl-4 sm:pl-6">
              {NEXT_GEN_SECTION.description}
            </p>
          </div>

          {/* Vertical Stack for Reduced Motion */}
          <div className="space-y-16">
            {NEXT_GEN_TECH.map((tech) => (
              <div key={tech.number} className="border-t border-earth-border/60 pt-8 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="font-editorial text-5xl font-light text-earth-forest/30">
                    {tech.number}
                  </span>
                  <span className="font-mono text-xs uppercase px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full text-earth-forest">
                    {tech.status}
                  </span>
                </div>
                <span className="font-mono text-xs text-earth-sage uppercase tracking-widest block">
                  {tech.classification}
                </span>
                <h3 className="font-editorial text-3xl sm:text-4xl text-earth-forest font-medium">
                  {tech.title}
                </h3>
                <p className="font-editorial italic text-lg sm:text-xl text-earth-forest/85">
                  "{tech.subtitle}"
                </p>
                <p className="text-sm sm:text-base text-earth-black/75 max-w-2xl leading-relaxed">
                  {tech.description}
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[10px] tracking-widest text-earth-muted uppercase">
                    {tech.footerLabel}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-earth-border flex items-center justify-between">
            <span className="text-xs text-earth-muted font-sans">Next-generation subterranean technology roadmap.</span>
            <MagneticButton
              as="button"
              onClick={onOpenReferences}
              className="text-xs font-semibold tracking-widest uppercase px-6 py-3 border border-earth-forest text-earth-forest hover:bg-earth-forest hover:text-earth-ivory transition-colors"
            >
              REVIEW DOE ROADMAP
            </MagneticButton>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div id="innovation" className="relative bg-earth-ivory scroll-mt-24">
      {/* 1. SECTION INTRODUCTION (Displayed before the horizontal journey begins) */}
      <section className="pt-20 sm:pt-28 md:pt-36 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto border-b border-earth-border/60">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <Reveal variant="fadeUp" delay={0.05}>
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-earth-forest uppercase mb-4 sm:mb-6">
              <Sparkles className="w-3.5 h-3.5 text-earth-sage shrink-0" />
              <span className="truncate">{NEXT_GEN_SECTION.eyebrow}</span>
            </div>
          </Reveal>

          {/* Main Heading with TextReveal and responsive clamp */}
          <TextReveal
            text={NEXT_GEN_SECTION.headline}
            mode="line"
            as="h2"
            delay={0.1}
            className="font-editorial font-medium tracking-tight text-earth-forest leading-[1.05] mb-6 sm:mb-8 text-4xl sm:text-6xl md:text-7xl lg:text-8xl"
          />

          {/* Supporting Description */}
          <Reveal variant="fadeUp" delay={0.25}>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-end">
              <p 
                className="lg:col-span-8 text-earth-black/80 font-sans leading-relaxed border-l-2 border-earth-forest/40 pl-4 sm:pl-6 text-sm sm:text-base md:text-lg"
              >
                {NEXT_GEN_SECTION.description}
              </p>

              <div className="lg:col-span-4 flex items-center space-x-3 text-xs font-mono tracking-widest text-earth-sage uppercase">
                <span>CONTINUOUS HORIZONTAL JOURNEY</span>
                <ArrowDown className="w-3.5 h-3.5 text-earth-forest animate-bounce" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 2. PINNED HORIZONTAL JOURNEY CONTAINER */}
      {/* The outer container provides 420vh of normal vertical scrolling space */}
      <div ref={containerRef} className="relative h-[420vh]">
        {/* Sticky viewport pinned to screen while scrolling horizontally */}
        <div className="sticky top-0 h-screen h-[100svh] w-full overflow-hidden flex flex-col justify-between bg-earth-ivory border-b border-earth-border z-20">
          {/* Top Stage & Progress Header Bar (inside pinned viewport) */}
          <div className="pt-20 sm:pt-24 px-4 sm:px-8 md:px-14 lg:px-20 flex items-center justify-between border-b border-earth-border/40 pb-3 sm:pb-4 shrink-0 bg-earth-ivory/90 backdrop-blur-sm">
            {/* Left: Section Sub-eyebrow */}
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-earth-forest uppercase font-semibold">
                THE NEXT GENERATION FRONTIER
              </span>
            </div>

            {/* Right: Stage Counter & Horizontal Progress Bar */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Counter: 01 / 04 */}
              <div className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-earth-forest">
                0{currentStage} <span className="text-earth-muted font-normal">/ 04</span>
              </div>

              {/* Progress Line */}
              <div className="w-20 sm:w-32 md:w-40 h-[2px] bg-earth-border/70 rounded-full overflow-hidden relative">
                <motion.div
                  style={{ width: progressBarWidth }}
                  className="h-full bg-earth-forest rounded-full"
                />
              </div>

              {/* 4 Stage Markers */}
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                {[1, 2, 3, 4].map((stage) => (
                  <span
                    key={stage}
                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                      stage === currentStage
                        ? 'bg-earth-forest scale-125'
                        : stage < currentStage
                        ? 'bg-earth-sage'
                        : 'bg-earth-border'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Middle: Horizontal Scrolling Track containing all 4 Panels */}
          <div className="flex-1 relative overflow-hidden flex items-center">
            <motion.div
              style={{ x: translateX }}
              className="flex flex-row w-[400vw] h-full will-change-transform"
            >
              {/* ======================================================== */}
              {/* PANEL 01 — ENHANCED GEOTHERMAL SYSTEMS                   */}
              {/* ======================================================== */}
              <section className="w-[100vw] h-full shrink-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 relative overflow-hidden">
                {/* Large Subtle Background Number */}
                <div 
                  aria-hidden="true"
                  className="absolute left-6 sm:left-12 lg:left-20 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
                >
                  <span 
                    className="font-editorial font-light text-earth-forest/[0.07] block leading-none"
                    style={{ fontSize: 'clamp(9rem, 20vw, 22rem)' }}
                  >
                    01
                  </span>
                </div>

                <div className="relative z-10 max-w-4xl space-y-4 sm:space-y-6">
                  {/* Classification & Status Lockup */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-sage uppercase font-semibold">
                      {NEXT_GEN_TECH[0].classification}
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-forest font-semibold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
                      <span>{NEXT_GEN_TECH[0].status}</span>
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 
                    className="font-editorial font-medium tracking-tight text-earth-forest leading-[1.08]"
                    style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}
                  >
                    {NEXT_GEN_TECH[0].title}
                  </h3>

                  {/* Secondary Statement */}
                  <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-earth-forest/85 leading-snug">
                    "{NEXT_GEN_TECH[0].subtitle}"
                  </p>

                  {/* Description */}
                  <p 
                    className="font-sans text-earth-black/75 max-w-2xl leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.2rem)' }}
                  >
                    {NEXT_GEN_TECH[0].description}
                  </p>
                </div>
              </section>

              {/* ======================================================== */}
              {/* PANEL 02 — CLOSED-LOOP GEOTHERMAL                        */}
              {/* ======================================================== */}
              <section className="w-[100vw] h-full shrink-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 relative overflow-hidden">
                {/* Large Background Number 02 */}
                <div 
                  aria-hidden="true"
                  className="absolute right-8 sm:right-16 lg:right-28 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
                >
                  <span 
                    className="font-editorial font-light text-earth-forest/[0.07] block leading-none"
                    style={{ fontSize: 'clamp(9rem, 20vw, 22rem)' }}
                  >
                    02
                  </span>
                </div>

                <div className="relative z-10 max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left Column: Heading & Status */}
                  <div className="lg:col-span-7 space-y-4 sm:space-y-5">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-sage uppercase font-semibold">
                        {NEXT_GEN_TECH[1].classification}
                      </span>
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-forest font-semibold uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
                        <span>{NEXT_GEN_TECH[1].status}</span>
                      </span>
                    </div>

                    <h3 
                      className="font-editorial font-medium tracking-tight text-earth-forest leading-[1.08]"
                      style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}
                    >
                      {NEXT_GEN_TECH[1].title}
                    </h3>
                  </div>

                  {/* Right Column: Statement & Description */}
                  <div className="lg:col-span-5 space-y-4 border-l-2 border-earth-stone/70 pl-6 sm:pl-8">
                    <p className="font-editorial italic text-lg sm:text-xl md:text-2xl text-earth-forest/85 leading-snug">
                      "{NEXT_GEN_TECH[1].subtitle}"
                    </p>
                    <p 
                      className="font-sans text-earth-black/75 leading-relaxed"
                      style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)' }}
                    >
                      {NEXT_GEN_TECH[1].description}
                    </p>
                  </div>
                </div>
              </section>

              {/* ======================================================== */}
              {/* PANEL 03 — SUPERHOT GEOTHERMAL                           */}
              {/* ======================================================== */}
              <section className="w-[100vw] h-full shrink-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 relative overflow-hidden">
                {/* Large Background Number 03 */}
                <div 
                  aria-hidden="true"
                  className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
                >
                  <span 
                    className="font-editorial font-light text-earth-forest/[0.06] block leading-none"
                    style={{ fontSize: 'clamp(9rem, 20vw, 22rem)' }}
                  >
                    03
                  </span>
                </div>

                <div className="relative z-10 max-w-4xl space-y-4 sm:space-y-6">
                  {/* Temperature-related typographic detail */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-sage uppercase font-semibold">
                      {NEXT_GEN_TECH[2].classification}
                    </span>
                    <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-earth-forest bg-earth-forest/10 px-2.5 py-1 border border-earth-forest/20 uppercase font-semibold">
                      &gt;400°C CRITICAL ENTHALPY
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-forest font-semibold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
                      <span>{NEXT_GEN_TECH[2].status}</span>
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 
                    className="font-editorial font-medium tracking-tight text-earth-forest leading-[1.08]"
                    style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}
                  >
                    {NEXT_GEN_TECH[2].title}
                  </h3>

                  {/* Secondary Statement */}
                  <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-earth-forest/85 leading-snug">
                    "{NEXT_GEN_TECH[2].subtitle}"
                  </p>

                  {/* Description */}
                  <p 
                    className="font-sans text-earth-black/75 max-w-2xl leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.2rem)' }}
                  >
                    {NEXT_GEN_TECH[2].description}
                  </p>
                </div>
              </section>

              {/* ======================================================== */}
              {/* PANEL 04 — NEXT-GENERATION DRILLING                      */}
              {/* ======================================================== */}
              <section className="w-[100vw] h-full shrink-0 flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-28 relative overflow-hidden">
                {/* Large Background Number 04 */}
                <div 
                  aria-hidden="true"
                  className="absolute right-6 sm:right-12 lg:right-20 bottom-16 pointer-events-none select-none z-0"
                >
                  <span 
                    className="font-editorial font-light text-earth-forest/[0.07] block leading-none"
                    style={{ fontSize: 'clamp(9rem, 20vw, 22rem)' }}
                  >
                    04
                  </span>
                </div>

                <div className="relative z-10 max-w-5xl space-y-4 sm:space-y-6">
                  {/* Classification & Status */}
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-sage uppercase font-semibold">
                      {NEXT_GEN_TECH[3].classification}
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-forest font-semibold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
                      <span>{NEXT_GEN_TECH[3].status}</span>
                    </span>
                  </div>

                  {/* Heading */}
                  <h3 
                    className="font-editorial font-medium tracking-tight text-earth-forest leading-[1.08]"
                    style={{ fontSize: 'clamp(2.5rem, 5.5vw, 5.5rem)' }}
                  >
                    {NEXT_GEN_TECH[3].title}
                  </h3>

                  {/* Secondary Statement */}
                  <p className="font-editorial italic text-xl sm:text-2xl md:text-3xl text-earth-forest/85 leading-snug">
                    "{NEXT_GEN_TECH[3].subtitle}"
                  </p>

                  {/* Description */}
                  <p 
                    className="font-sans text-earth-black/75 max-w-2xl leading-relaxed"
                    style={{ fontSize: 'clamp(0.95rem, 1.2vw, 1.2rem)' }}
                  >
                    {NEXT_GEN_TECH[3].description}
                  </p>

                  {/* Action Link to Research / DOE Roadmap with MagneticButton */}
                  <div className="pt-2 sm:pt-4">
                    <MagneticButton
                      as="button"
                      onClick={onOpenReferences}
                      className="space-x-2.5 px-6 sm:px-8 py-3 sm:py-3.5 border border-earth-forest text-earth-forest hover:bg-earth-forest hover:text-earth-ivory text-xs font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-sm"
                    >
                      <span>REVIEW DOE ROADMAP & REFERENCES</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </MagneticButton>
                  </div>
                </div>
              </section>
            </motion.div>
          </div>

          {/* Bottom Stage Footer Bar (inside pinned viewport) */}
          <div className="pb-4 sm:pb-6 px-4 sm:px-8 md:px-14 lg:px-20 flex items-center justify-between border-t border-earth-border/40 pt-3 sm:pt-4 shrink-0 bg-earth-ivory/90 backdrop-blur-sm">
            {/* Left: Dynamic Footer Label based on Active Stage */}
            <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-earth-muted uppercase truncate mr-4">
              {NEXT_GEN_TECH[currentStage - 1]?.footerLabel || 'THE FUTURE OF SUBSURFACE ENERGY'}
            </span>

            {/* Right: Dynamic Directional Prompt */}
            <div className="flex items-center space-x-2 text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-muted shrink-0">
              <span>{currentStage < 4 ? 'SCROLL DOWN TO ADVANCE' : 'SCROLL DOWN TO CONTINUE'}</span>
              <ArrowDown className="w-3 h-3 text-earth-sage animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
