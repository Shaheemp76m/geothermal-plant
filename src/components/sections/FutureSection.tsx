import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { ArrowRight, Sparkles, ArrowDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { NEXT_GEN_SECTION, NEXT_GEN_TECH } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_EASINGS } from '../../lib/motionTokens';

interface FutureSectionProps {
  onOpenReferences: () => void;
}

type CheckpointStage = 0 | 1 | 2 | 3;

const CHECKPOINT_NAMES = [
  'STAGE A // HEADING',
  'STAGE B // SUBHEADING',
  'STAGE C // DESCRIPTION',
  'STAGE D // SPECIFICATIONS',
] as const;

export const FutureSection: React.FC<FutureSectionProps> = ({ onOpenReferences }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotionPreference();

  // Storytelling State Machine
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [activeCheckpoint, setActiveCheckpoint] = useState<CheckpointStage>(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const lastStepRef = useRef<number>(0);

  // Measure vertical scroll through the pinned container
  // The outer container provides 480vh of vertical scroll space, which cleanly maps to 16 checkpoints (30vh per checkpoint)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Map continuous vertical scroll progress to discrete checkpoints (16 steps: 4 cards x 4 checkpoints)
  useMotionValueEvent(scrollYProgress, 'change', (progress) => {
    // Clamp progress between 0 and 1
    const clamped = Math.max(0, Math.min(0.9999, progress));
    
    // Map to step 0 through 15
    const step = Math.min(15, Math.floor(clamped * 16));

    if (step !== lastStepRef.current) {
      const direction = step > lastStepRef.current ? 'down' : 'up';
      setScrollDirection(direction);
      lastStepRef.current = step;

      const cardIdx = Math.floor(step / 4);
      const checkpoint = (step % 4) as CheckpointStage;

      setActiveCardIndex(cardIdx);
      setActiveCheckpoint(checkpoint);
    }
  });

  // Synchronized Navigation Callbacks (Shared by Arrow Buttons & Clickable Step Tabs)
  const navigateToStep = (targetStep: number) => {
    if (!containerRef.current) return;
    const clampedStep = Math.max(0, Math.min(15, targetStep));
    const container = containerRef.current;
    
    // Calculate exact scroll target corresponding to this step
    const containerTop = container.offsetTop;
    const scrollDistance = container.offsetHeight - window.innerHeight;
    const targetScrollY = containerTop + (clampedStep / 15.5) * scrollDistance;

    window.scrollTo({
      top: targetScrollY,
      behavior: 'smooth',
    });
  };

  const advanceCheckpoint = () => {
    const currentStep = activeCardIndex * 4 + activeCheckpoint;
    if (currentStep < 15) {
      navigateToStep(currentStep + 1);
    }
  };

  const previousCheckpoint = () => {
    const currentStep = activeCardIndex * 4 + activeCheckpoint;
    if (currentStep > 0) {
      navigateToStep(currentStep - 1);
    }
  };

  const jumpToCard = (cardIdx: number) => {
    navigateToStep(cardIdx * 4);
  };

  // Keyboard navigation when section is in viewport
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const inView = rect.top <= 100 && rect.bottom >= window.innerHeight - 100;
      if (!inView) return;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        const currentStep = activeCardIndex * 4 + activeCheckpoint;
        if (currentStep < 15) {
          e.preventDefault();
          advanceCheckpoint();
        }
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        const currentStep = activeCardIndex * 4 + activeCheckpoint;
        if (currentStep > 0) {
          e.preventDefault();
          previousCheckpoint();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeCardIndex, activeCheckpoint]);

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
                  &ldquo;{tech.subtitle}&rdquo;
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
        </div>
      </section>
    );
  }

  // Active Technology Data
  const currentTech = NEXT_GEN_TECH[activeCardIndex];

  // Motion variants for horizontal transitions between cards
  const horizontalCardVariants = {
    enter: (dir: 'down' | 'up') => ({
      x: dir === 'down' ? 60 : -60,
      opacity: 0,
      filter: 'blur(3px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.45,
        ease: MOTION_EASINGS.editorial,
      },
    },
    exit: (dir: 'down' | 'up') => ({
      x: dir === 'down' ? -60 : 60,
      opacity: 0,
      filter: 'blur(3px)',
      transition: {
        duration: 0.35,
        ease: MOTION_EASINGS.editorial,
      },
    }),
  };

  // Calculate 16-step progress
  const currentStepNumber = activeCardIndex * 4 + activeCheckpoint + 1;
  const progressPercentage = (currentStepNumber / 16) * 100;

  return (
    <div className="bg-earth-ivory text-earth-black selection:bg-earth-forest selection:text-white">
      {/* ============================================================ */}
      {/* 1. SECTION INTRODUCTION (Displayed before entering pinned)  */}
      {/* ============================================================ */}
      <section
        id="innovation"
        className="bg-earth-ivory pt-24 sm:pt-32 pb-16 sm:pb-24 border-b border-earth-border scroll-mt-24"
      >
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-14 lg:px-20">
          <Reveal variant="fadeUp" delay={0.05}>
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-earth-forest uppercase mb-3 sm:mb-4">
              <Sparkles className="w-3.5 h-3.5 text-earth-sage shrink-0" />
              <span>{NEXT_GEN_SECTION.eyebrow}</span>
            </div>
          </Reveal>

          <TextReveal
            text={NEXT_GEN_SECTION.headline}
            mode="line"
            as="h2"
            delay={0.1}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-earth-forest max-w-4xl mb-6 sm:mb-8 leading-[1.05]"
          />

          <Reveal variant="fadeUp" delay={0.25}>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 max-w-5xl">
              <p className="text-sm sm:text-base md:text-lg text-earth-black/80 font-sans leading-relaxed max-w-3xl border-l-2 border-earth-forest/40 pl-4 sm:pl-6">
                {NEXT_GEN_SECTION.description}
              </p>

              <div className="flex items-center space-x-2 text-xs font-mono tracking-widest text-earth-muted uppercase shrink-0 pb-1">
                <span>CINEMATIC PRESENTATION</span>
                <ArrowDown className="w-3.5 h-3.5 text-earth-forest animate-bounce" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. PINNED CINEMATIC HORIZONTAL STORYTELLING CONTAINER        */}
      {/* The 480vh container allows native vertical scrolling to drive*/}
      {/* the 16 checkpoint states without any input locking or freezes*/}
      {/* ============================================================ */}
      <div
        ref={containerRef}
        className="relative h-[480vh] bg-earth-ivory"
      >
        {/* Sticky Viewport Pinned to Screen */}
        <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between bg-earth-ivory border-b border-earth-border select-none z-20">
          {/* -------------------------------------------------------- */}
          {/* TOP STAGE & CHECKPOINT PROGRESS BAR                      */}
          {/* -------------------------------------------------------- */}
          <header className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-8 md:px-14 lg:px-20 flex items-center justify-between border-b border-earth-border/40 pb-3 sm:pb-4 shrink-0 bg-earth-ivory/95 backdrop-blur-md z-30">
            {/* Left: Section Sub-eyebrow & Active Checkpoint Badge */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-earth-sage animate-pulse" />
                <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-earth-forest uppercase font-semibold">
                  THE NEXT GENERATION FRONTIER
                </span>
              </div>

              <span className="text-earth-border hidden sm:inline">|</span>

              {/* Checkpoint Name Tag */}
              <span className="hidden sm:inline-block font-mono text-[9px] tracking-widest text-earth-sage bg-earth-forest/5 px-2.5 py-0.5 rounded border border-earth-forest/15 uppercase font-medium">
                {CHECKPOINT_NAMES[activeCheckpoint]}
              </span>
            </div>

            {/* Right: Stage Counter & Granular Checkpoint Indicators */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Card Counter: 01 / 04 */}
              <div className="font-mono text-xs sm:text-sm font-semibold tracking-widest text-earth-forest">
                0{activeCardIndex + 1} <span className="text-earth-muted font-normal">/ 04</span>
              </div>

              {/* Micro Checkpoint Dots (A, B, C, D) */}
              <div className="flex items-center space-x-1 sm:space-x-1.5" title={`Current Stage: Checkpoint ${activeCheckpoint + 1} of 4`}>
                {[0, 1, 2, 3].map((cp) => (
                  <span
                    key={cp}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      cp === activeCheckpoint
                        ? 'w-4 sm:w-5 bg-earth-forest'
                        : cp < activeCheckpoint
                        ? 'w-2 sm:w-2.5 bg-earth-sage'
                        : 'w-1.5 sm:w-2 bg-earth-border'
                    }`}
                  />
                ))}
              </div>

              {/* Overall Horizontal Progress Line */}
              <div className="w-16 sm:w-28 md:w-36 h-[2px] bg-earth-border/70 rounded-full overflow-hidden relative hidden xs:block">
                <motion.div
                  className="h-full bg-earth-forest rounded-full"
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.25, ease: MOTION_EASINGS.editorial }}
                />
              </div>

              {/* Interactive Card Selection Tabs (01-04) */}
              <div className="flex items-center space-x-1 sm:space-x-1.5">
                {NEXT_GEN_TECH.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => jumpToCard(idx)}
                    aria-label={`Jump to technology 0${idx + 1}`}
                    className={`w-5 h-5 rounded text-[9px] font-mono font-semibold flex items-center justify-center transition-all ${
                      idx === activeCardIndex
                        ? 'bg-earth-forest text-earth-ivory shadow-sm'
                        : 'bg-earth-forest/5 text-earth-muted hover:text-earth-forest hover:bg-earth-forest/15'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}
              </div>
            </div>
          </header>

          {/* -------------------------------------------------------- */}
          {/* CENTER VIEWPORT: ACTIVE CARD DISPLAY (CHECKPOINT-SEQUENCED)*/}
          {/* -------------------------------------------------------- */}
          <main className="flex-1 min-h-0 relative overflow-hidden flex items-center justify-center px-4 sm:px-8 md:px-14 lg:px-20 py-2 sm:py-4">
            <AnimatePresence mode="wait" custom={scrollDirection}>
              <motion.div
                key={currentTech.number}
                custom={scrollDirection}
                variants={horizontalCardVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="w-full max-w-5xl h-full flex flex-col justify-center relative z-10"
              >
                {/* Large Subtle Background Watermark Number */}
                <div
                  aria-hidden="true"
                  className="absolute right-4 sm:right-12 lg:right-24 top-1/2 -translate-y-1/2 pointer-events-none select-none z-0"
                >
                  <span
                    className="font-editorial font-light text-earth-forest/[0.05] block leading-none"
                    style={{ fontSize: 'clamp(7rem, 22vw, 20rem)' }}
                  >
                    {currentTech.number}
                  </span>
                </div>

                {/* CARD CONTENT COMPOSITION */}
                <div className="relative z-10 space-y-3.5 sm:space-y-5 md:space-y-6 max-w-4xl">
                  {/* ================================================== */}
                  {/* CHECKPOINT A: ARRIVAL — CLASSIFICATION & HEADING   */}
                  {/* ================================================== */}
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.45, ease: MOTION_EASINGS.editorial }}
                    className="space-y-2 sm:space-y-3"
                  >
                    {/* Classification Tag & Field Status Lockup */}
                    <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                      <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-sage uppercase font-semibold">
                        {currentTech.classification}
                      </span>
                      <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-forest font-semibold uppercase">
                        <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
                        <span>{currentTech.status}</span>
                      </span>
                      {activeCardIndex === 2 && (
                        <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-earth-forest bg-earth-forest/10 px-2.5 py-1 border border-earth-forest/20 uppercase font-semibold rounded-full">
                          &gt;400°C CRITICAL ENTHALPY
                        </span>
                      )}
                    </div>

                    {/* Main Editorial Heading */}
                    <h3
                      className="font-editorial font-medium tracking-tight text-earth-forest leading-[1.06]"
                      style={{ fontSize: 'clamp(2.2rem, 5.2vw, 4.8rem)' }}
                    >
                      {currentTech.title}
                    </h3>
                  </motion.div>

                  {/* ================================================== */}
                  {/* CHECKPOINT B: SUBHEADING — ITALIC STATEMENT       */}
                  {/* ================================================== */}
                  <div className="min-h-[2.5rem] sm:min-h-[3.5rem] flex items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: activeCheckpoint >= 1 ? 1 : 0,
                        y: activeCheckpoint >= 1 ? 0 : 18,
                        filter: activeCheckpoint >= 1 ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{ duration: 0.4, ease: MOTION_EASINGS.editorial }}
                      className={activeCheckpoint >= 1 ? 'pointer-events-auto' : 'pointer-events-none select-none invisible'}
                    >
                      <p className="font-editorial italic text-lg sm:text-2xl md:text-3xl text-earth-forest/85 leading-snug">
                        &ldquo;{currentTech.subtitle}&rdquo;
                      </p>
                    </motion.div>
                  </div>

                  {/* ================================================== */}
                  {/* CHECKPOINT C: DESCRIPTION — MAIN EXPLANATORY BODY  */}
                  {/* ================================================== */}
                  <div className="min-h-[4rem] sm:min-h-[5.5rem] flex items-center">
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: activeCheckpoint >= 2 ? 1 : 0,
                        y: activeCheckpoint >= 2 ? 0 : 18,
                        filter: activeCheckpoint >= 2 ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{ duration: 0.4, ease: MOTION_EASINGS.editorial }}
                      className={activeCheckpoint >= 2 ? 'pointer-events-auto' : 'pointer-events-none select-none invisible'}
                    >
                      <p
                        className="font-sans text-earth-black/80 max-w-3xl leading-relaxed border-l-2 border-earth-forest/30 pl-4 sm:pl-6"
                        style={{ fontSize: 'clamp(0.95rem, 1.25vw, 1.2rem)' }}
                      >
                        {currentTech.description}
                      </p>
                    </motion.div>
                  </div>

                  {/* ================================================== */}
                  {/* CHECKPOINT D: SUPPORTING INFORMATION & TECHNICAL   */}
                  {/* ================================================== */}
                  <div className="min-h-[3rem] sm:min-h-[4rem] flex items-center pt-1">
                    <motion.div
                      initial={false}
                      animate={{
                        opacity: activeCheckpoint >= 3 ? 1 : 0,
                        y: activeCheckpoint >= 3 ? 0 : 18,
                        filter: activeCheckpoint >= 3 ? 'blur(0px)' : 'blur(4px)',
                      }}
                      transition={{ duration: 0.4, ease: MOTION_EASINGS.editorial }}
                      className={`w-full ${
                        activeCheckpoint >= 3 ? 'pointer-events-auto' : 'pointer-events-none select-none invisible'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-earth-border/40">
                        {/* Technical Specs Callout */}
                        <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-mono text-earth-muted uppercase tracking-wider">
                          <span className="font-semibold text-earth-forest">FIELD METRICS:</span>
                          <span>
                            {activeCardIndex === 0 && 'DOE FORGE UTAH TEST SITE · 2,700M GRANITE BEDROCK'}
                            {activeCardIndex === 1 && 'HERMETIC SUBSURFACE RADIATOR · 100% RECIRCULATING CO₂'}
                            {activeCardIndex === 2 && 'SUPERCRITICAL WATER PHASE · 10× ENERGY DENSITY'}
                            {activeCardIndex === 3 && 'GYROTRON MILLIMETER-WAVE BEAM · 10–20 KM BASAL DRILLING'}
                          </span>
                        </div>

                        {/* Card 04 Dedicated References CTA */}
                        {activeCardIndex === 3 && (
                          <div className="shrink-0">
                            <MagneticButton
                              as="button"
                              onClick={onOpenReferences}
                              className="space-x-2 px-5 py-2 sm:px-6 sm:py-2.5 border border-earth-forest bg-earth-forest text-earth-ivory hover:bg-earth-black text-[11px] font-semibold tracking-[0.2em] uppercase transition-all duration-300 shadow-sm"
                            >
                              <span>DOE ROADMAP & CITATIONS</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </MagneticButton>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </main>

          {/* -------------------------------------------------------- */}
          {/* BOTTOM STAGE FOOTER & STEP CONTROLS                      */}
          {/* -------------------------------------------------------- */}
          <footer className="pb-3 sm:pb-5 px-4 sm:px-8 md:px-14 lg:px-20 flex items-center justify-between border-t border-earth-border/40 pt-2.5 sm:pt-3.5 shrink-0 bg-earth-ivory/95 backdrop-blur-md z-30">
            {/* Left: Dynamic Footer Classification Label */}
            <div className="flex items-center space-x-3 truncate mr-4">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-earth-muted uppercase truncate">
                {currentTech.footerLabel}
              </span>
            </div>

            {/* Right: Directional Guidance & Step Advancement Affordance */}
            <div className="flex items-center space-x-3 sm:space-x-5 shrink-0">
              {/* Step Backward / Forward Manual Buttons */}
              <div className="flex items-center space-x-1">
                <button
                  onClick={previousCheckpoint}
                  disabled={activeCardIndex === 0 && activeCheckpoint === 0}
                  className="p-1.5 rounded-full border border-earth-border text-earth-forest hover:bg-earth-forest/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Previous Checkpoint"
                  aria-label="Previous Checkpoint"
                >
                  <ChevronLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={advanceCheckpoint}
                  disabled={activeCardIndex === NEXT_GEN_TECH.length - 1 && activeCheckpoint === 3}
                  className="p-1.5 rounded-full border border-earth-border text-earth-forest hover:bg-earth-forest/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                  title="Next Checkpoint"
                  aria-label="Next Checkpoint"
                >
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Directional Prompt Text */}
              <div className="flex items-center space-x-2 text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-forest font-medium">
                <span>
                  {activeCardIndex === NEXT_GEN_TECH.length - 1 && activeCheckpoint === 3
                    ? 'FINAL CHECKPOINT REACHED · SCROLL DOWN TO CONTINUE'
                    : `SCROLL DOWN TO ADVANCE // ${CHECKPOINT_NAMES[activeCheckpoint]}`}
                </span>
                <ArrowDown
                  className={`w-3 h-3 text-earth-sage ${
                    activeCardIndex === NEXT_GEN_TECH.length - 1 && activeCheckpoint === 3
                      ? 'animate-bounce'
                      : ''
                  }`}
                />
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};
