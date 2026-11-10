import React, { useRef, useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Sparkles, ArrowDown, ChevronRight, ChevronLeft } from 'lucide-react';
import { NEXT_GEN_SECTION, NEXT_GEN_TECH } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface FutureSectionProps {
  onOpenReferences: () => void;
}

type CheckpointStage = 0 | 1 | 2 | 3;

const CHECKPOINT_NAMES = [
  'STAGE A · HEADING',
  'STAGE B · SUBHEADING',
  'STAGE C · DESCRIPTION',
  'STAGE D · SPECIFICATIONS',
] as const;

// Precision Timing Tokens
const TIMINGS = {
  down: {
    // Slower, cinematic & deliberate forward progression
    textDuration: 0.85, // 850ms text entrance
    staggerDelay: 0.12, // 120ms gentle stagger
    supportingDuration: 0.80, // 800ms
    cardDuration: 1.05, // 1050ms horizontal card transition
    easing: [0.22, 1, 0.36, 1] as const, // smooth editorial easeOutCubic
    textLockMs: 900, // 900ms input lock
    cardLockMs: 1100, // 1100ms card transition lock
  },
  up: {
    // Fast, responsive, snappy backward review
    textDuration: 0.32, // 320ms quick reverse
    staggerDelay: 0,
    supportingDuration: 0.30, // 300ms
    cardDuration: 0.38, // 380ms horizontal card transition
    easing: [0.16, 1, 0.3, 1] as const,
    textLockMs: 360, // 360ms fast reverse lock
    cardLockMs: 440, // 440ms card reverse lock
  },
};

export const FutureSection: React.FC<FutureSectionProps> = ({ onOpenReferences }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotionPreference();

  // Storytelling State Machine
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [activeCheckpoint, setActiveCheckpoint] = useState<CheckpointStage>(0);
  const [scrollDirection, setScrollDirection] = useState<'down' | 'up'>('down');
  const [isLocked, setIsLocked] = useState<boolean>(false);

  // Synchronous ref to prevent stale closure reads during rapid events
  const stateRef = useRef({
    cardIndex: 0,
    checkpoint: 0 as CheckpointStage,
    scrollDirection: 'down' as 'down' | 'up',
  });

  const isLockedRef = useRef<boolean>(false);
  const lockTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Safe Lock mechanism: Always releases automatically via timeout, never deadlocks
  const applyLock = useCallback((durationMs: number) => {
    isLockedRef.current = true;
    setIsLocked(true);
    if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    lockTimerRef.current = setTimeout(() => {
      isLockedRef.current = false;
      setIsLocked(false);
    }, durationMs);
  }, []);

  // Check if section is visibly active in the viewport
  const isSectionActive = useCallback(() => {
    if (!containerRef.current) return false;
    const rect = containerRef.current.getBoundingClientRect();
    const vh = window.innerHeight;
    // Section is active when its top has reached the viewport top (<= 50px)
    // and its bottom hasn't scrolled completely off the screen (>= half viewport)
    return rect.top <= 50 && rect.bottom >= vh * 0.4;
  }, []);

  // =========================================================================
  // UNIFIED NAVIGATION LOGIC (Single Source of Truth)
  // Used identically by Mouse Wheel, Trackpad, Touch, Keyboard, & Arrow Buttons
  // =========================================================================

  const advanceCheckpoint = useCallback(() => {
    if (isLockedRef.current) return;

    const { cardIndex, checkpoint } = stateRef.current;

    // Checkpoint A -> B -> C -> D within the same card
    if (checkpoint < 3) {
      const nextCp = (checkpoint + 1) as CheckpointStage;
      stateRef.current.checkpoint = nextCp;
      stateRef.current.scrollDirection = 'down';
      setScrollDirection('down');
      setActiveCheckpoint(nextCp);
      applyLock(TIMINGS.down.textLockMs);
      return;
    }

    // Checkpoint D -> Next Card Checkpoint A (Horizontal Slide)
    if (cardIndex < NEXT_GEN_TECH.length - 1) {
      const nextCard = cardIndex + 1;
      stateRef.current.cardIndex = nextCard;
      stateRef.current.checkpoint = 0;
      stateRef.current.scrollDirection = 'down';
      setScrollDirection('down');
      setActiveCardIndex(nextCard);
      setActiveCheckpoint(0);
      applyLock(TIMINGS.down.cardLockMs);
    }
  }, [applyLock]);

  const previousCheckpoint = useCallback(() => {
    if (isLockedRef.current) return;

    const { cardIndex, checkpoint } = stateRef.current;

    // Checkpoint D -> C -> B -> A within the same card
    if (checkpoint > 0) {
      const prevCp = (checkpoint - 1) as CheckpointStage;
      stateRef.current.checkpoint = prevCp;
      stateRef.current.scrollDirection = 'up';
      setScrollDirection('up');
      setActiveCheckpoint(prevCp);
      applyLock(TIMINGS.up.textLockMs);
      return;
    }

    // Checkpoint A -> Previous Card Checkpoint D (Horizontal Slide)
    if (cardIndex > 0) {
      const prevCard = cardIndex - 1;
      stateRef.current.cardIndex = prevCard;
      stateRef.current.checkpoint = 3;
      stateRef.current.scrollDirection = 'up';
      setScrollDirection('up');
      setActiveCardIndex(prevCard);
      setActiveCheckpoint(3);
      applyLock(TIMINGS.up.cardLockMs);
    }
  }, [applyLock]);

  const jumpToCard = useCallback((targetCardIdx: number) => {
    if (isLockedRef.current || targetCardIdx === stateRef.current.cardIndex) return;
    const dir = targetCardIdx > stateRef.current.cardIndex ? 'down' : 'up';
    stateRef.current.cardIndex = targetCardIdx;
    stateRef.current.checkpoint = 0;
    stateRef.current.scrollDirection = dir;
    setScrollDirection(dir);
    setActiveCardIndex(targetCardIdx);
    setActiveCheckpoint(0);
    applyLock(dir === 'down' ? TIMINGS.down.cardLockMs : TIMINGS.up.cardLockMs);
  }, [applyLock]);

  // =========================================================================
  // SCROLL & TOUCH INPUT HANDLERS
  // =========================================================================
  const touchStartY = useRef<number>(0);
  const touchStartX = useRef<number>(0);
  const touchHandled = useRef<boolean>(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || shouldReduceMotion) return;

    // 1. Mouse Wheel & Trackpad
    const handleWheel = (e: WheelEvent) => {
      if (!isSectionActive()) return;

      const { cardIndex, checkpoint } = stateRef.current;
      const isAtEnd = cardIndex === NEXT_GEN_TECH.length - 1 && checkpoint === 3;
      const isAtStart = cardIndex === 0 && checkpoint === 0;

      // Natural release boundaries:
      if (e.deltaY > 0 && isAtEnd) {
        // At the very end, allow normal downward scroll to the next section
        return;
      }
      if (e.deltaY < 0 && isAtStart) {
        // At the very start, allow normal upward scroll back to intro
        return;
      }

      // Intercept scroll within the section
      e.preventDefault();

      // If locked during animation, ignore subsequent wheel events
      if (isLockedRef.current) return;

      // Filter micro-trackpad noise
      if (Math.abs(e.deltaY) < 15) return;

      // Snap alignment to top if slightly offset
      const rect = container.getBoundingClientRect();
      if (Math.abs(rect.top) > 4) {
        window.scrollTo({
          top: container.offsetTop,
          behavior: 'instant' as ScrollBehavior,
        });
      }

      if (e.deltaY > 0) {
        advanceCheckpoint();
      } else {
        previousCheckpoint();
      }
    };

    // 2. Mobile Touch (One Swipe = Exactly One Checkpoint)
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
      touchStartX.current = e.touches[0].clientX;
      touchHandled.current = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isSectionActive()) return;

      const currentY = e.touches[0].clientY;
      const currentX = e.touches[0].clientX;
      const deltaY = touchStartY.current - currentY; // positive = swipe up = scroll down
      const deltaX = touchStartX.current - currentX;

      const { cardIndex, checkpoint } = stateRef.current;
      const isAtEnd = cardIndex === NEXT_GEN_TECH.length - 1 && checkpoint === 3;
      const isAtStart = cardIndex === 0 && checkpoint === 0;

      // Release boundaries
      if (deltaY > 0 && isAtEnd) return;
      if (deltaY < 0 && isAtStart) return;

      // Prevent native page scroll while actively interacting
      e.preventDefault();

      if (isLockedRef.current || touchHandled.current) return;

      // Vertical swipe threshold (28px)
      if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 28) {
        touchHandled.current = true; // Consume this swipe gesture
        if (deltaY > 0) {
          advanceCheckpoint();
        } else {
          previousCheckpoint();
        }
      }
    };

    const handleTouchEnd = () => {
      touchHandled.current = false;
    };

    // 3. Keyboard Arrow Keys
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isSectionActive()) return;

      const { cardIndex, checkpoint } = stateRef.current;
      const isAtEnd = cardIndex === NEXT_GEN_TECH.length - 1 && checkpoint === 3;
      const isAtStart = cardIndex === 0 && checkpoint === 0;

      if (e.key === 'ArrowDown' || e.key === 'PageDown' || e.key === ' ') {
        if (isAtEnd) return;
        e.preventDefault();
        advanceCheckpoint();
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        if (isAtStart) return;
        e.preventDefault();
        previousCheckpoint();
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      if (lockTimerRef.current) clearTimeout(lockTimerRef.current);
    };
  }, [advanceCheckpoint, previousCheckpoint, isSectionActive, shouldReduceMotion]);

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
  const activeTimings = scrollDirection === 'down' ? TIMINGS.down : TIMINGS.up;

  // Horizontal Card Transitions
  const horizontalCardVariants = {
    enter: (dir: 'down' | 'up') => ({
      x: dir === 'down' ? 70 : -70,
      opacity: 0,
      filter: 'blur(3px)',
    }),
    center: {
      x: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        duration: activeTimings.cardDuration,
        ease: activeTimings.easing,
      },
    },
    exit: (dir: 'down' | 'up') => ({
      x: dir === 'down' ? -70 : 70,
      opacity: 0,
      filter: 'blur(3px)',
      transition: {
        duration: scrollDirection === 'down' ? 0.42 : 0.28,
        ease: activeTimings.easing,
      },
    }),
  };

  // Progress Calculations (16 discrete checkpoints)
  const currentStepNumber = activeCardIndex * 4 + activeCheckpoint + 1;
  const progressPercentage = (currentStepNumber / 16) * 100;

  return (
    <div className="bg-earth-ivory text-earth-black selection:bg-earth-forest selection:text-white">
      {/* ============================================================ */}
      {/* 1. SECTION INTRODUCTION (Displayed before entering canvas)   */}
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
      {/* 2. PINNED HORIZONTAL STORYTELLING CANVAS                     */}
      {/* 1 Gesture = 1 Checkpoint; Slower Forward, Snappy Backward    */}
      {/* ============================================================ */}
      <div
        ref={containerRef}
        className="relative h-screen h-[100dvh] w-full overflow-hidden flex flex-col justify-between bg-earth-ivory border-b border-earth-border select-none z-20"
      >
        {/* -------------------------------------------------------- */}
        {/* TOP STAGE & CHECKPOINT PROGRESS BAR                      */}
        {/* -------------------------------------------------------- */}
        <header className="pt-4 sm:pt-6 lg:pt-8 px-4 sm:px-8 md:px-14 lg:px-20 flex items-center justify-between border-b border-earth-border/40 pb-3 sm:pb-4 shrink-0 bg-earth-ivory/95 backdrop-blur-md z-30">
          {/* Left: Section Sub-eyebrow & Active Checkpoint Badge */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="flex items-center space-x-2">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
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
                transition={{ duration: 0.35, ease: activeTimings.easing }}
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
        {/* CENTER VIEWPORT: ACTIVE CARD DISPLAY                     */}
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
                  transition={{
                    duration: activeTimings.textDuration,
                    ease: activeTimings.easing,
                  }}
                  className="space-y-2 sm:space-y-3"
                >
                  {/* Classification Tag & Field Status Lockup */}
                  <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                    <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-sage uppercase font-semibold">
                      {currentTech.classification}
                    </span>
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-forest font-semibold uppercase">
                      <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
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
                    transition={{
                      duration: activeTimings.textDuration,
                      ease: activeTimings.easing,
                    }}
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
                    transition={{
                      duration: activeTimings.textDuration,
                      delay: scrollDirection === 'down' ? activeTimings.staggerDelay : 0,
                      ease: activeTimings.easing,
                    }}
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
                    transition={{
                      duration: activeTimings.supportingDuration,
                      ease: activeTimings.easing,
                    }}
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
                disabled={(activeCardIndex === 0 && activeCheckpoint === 0) || isLocked}
                className="p-1.5 rounded-full border border-earth-border text-earth-forest hover:bg-earth-forest/10 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                title="Previous Checkpoint"
                aria-label="Previous Checkpoint"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={advanceCheckpoint}
                disabled={(activeCardIndex === NEXT_GEN_TECH.length - 1 && activeCheckpoint === 3) || isLocked}
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
                  : `SCROLL DOWN TO ADVANCE · ${CHECKPOINT_NAMES[activeCheckpoint]}`}
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
  );
};
