import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useInView } from 'motion/react';
import { BENEFIT_STATS } from '../../data/content';
import { BenefitStat } from '../../types';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_EASINGS } from '../../lib/motionTokens';

// ============================================================================
// INTEGER-PRESERVING EDITORIAL NUMBER COUNTER
// Counts cleanly in integers with ease-out curve, zero decimal artifacts.
// ============================================================================
interface EditorialCounterProps {
  value: number;
  suffix: string;
  subNumber?: number;
  duration?: number;
  isInView: boolean;
  shouldReduceMotion: boolean;
}

const EditorialCounter: React.FC<EditorialCounterProps> = ({
  value,
  suffix,
  subNumber,
  duration = 1600,
  isInView,
  shouldReduceMotion,
}) => {
  const [count, setCount] = useState(shouldReduceMotion ? value : 0);
  const [subCount, setSubCount] = useState(shouldReduceMotion && subNumber !== undefined ? subNumber : 0);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(value);
      if (subNumber !== undefined) setSubCount(subNumber);
      return;
    }

    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      // Smooth custom ease-out curve
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(easeOut * value);
      setCount(current);

      if (subNumber !== undefined) {
        const currentSub = Math.round(easeOut * subNumber);
        setSubCount(currentSub);
      }

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(value);
        if (subNumber !== undefined) setSubCount(subNumber);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, value, subNumber, duration, shouldReduceMotion]);

  // Special layout for 24/7 continuous baseload
  if (subNumber !== undefined) {
    return (
      <div className="font-editorial text-[clamp(4.25rem,11.5vw,9.5rem)] font-bold text-earth-forest leading-[0.88] tracking-tight select-none inline-flex items-baseline">
        <span>{count}</span>
        <span className="text-earth-sage mx-1 sm:mx-1.5 font-normal text-[0.85em]">/</span>
        <span>{subCount}</span>
      </div>
    );
  }

  return (
    <div className="font-editorial text-[clamp(4.25rem,11.5vw,9.5rem)] font-bold text-earth-forest leading-[0.88] tracking-tight select-none inline-flex items-baseline">
      <span>{count}</span>
      <span className="text-earth-sage font-editorial font-normal text-[0.55em] ml-1.5 sm:ml-2 align-baseline tracking-normal">
        {suffix.trim()}
      </span>
    </div>
  );
};

// ============================================================================
// INDIVIDUAL EDITORIAL METRIC CHAPTER
// Asymmetrical layout, generous whitespace, no boxes, fine separators.
// ============================================================================
interface MetricChapterProps {
  stat: BenefitStat;
  index: number;
  isEven: boolean;
  shouldReduceMotion: boolean;
}

const MetricChapter: React.FC<MetricChapterProps> = ({
  stat,
  index,
  isEven,
  shouldReduceMotion,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, margin: '-70px' });

  // Directional entrance: Metric 01 & 03 from Left, Metric 02 & 04 from Right
  const initialX = shouldReduceMotion ? 0 : isEven ? 28 : -28;
  const initialY = shouldReduceMotion ? 0 : 25;

  return (
    <div 
      ref={itemRef} 
      className="relative scroll-mt-24 group"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Numbered Progress Node Marker on Central/Left Line                 */}
      {/* ------------------------------------------------------------------ */}
      <div 
        className={`absolute top-0 z-20 flex items-center justify-center transition-all duration-700
          left-4 -translate-x-1/2 sm:left-6
          lg:left-1/2 lg:-translate-x-1/2
        `}
      >
        <div 
          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full font-mono text-[10px] sm:text-[11px] font-bold flex items-center justify-center transition-all duration-700 ${
            isInView
              ? 'bg-earth-forest text-earth-ivory border-2 border-earth-forest shadow-sm scale-110'
              : 'bg-earth-ivory text-earth-muted border border-earth-border scale-100'
          }`}
        >
          0{index + 1}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Editorial Content Grid (Alternating Left/Right on Desktop)        */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, x: initialX, y: initialY }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: initialY }}
        transition={{
          duration: 0.8,
          ease: MOTION_EASINGS.editorial,
        }}
        className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start pl-11 sm:pl-16 lg:pl-0"
      >
        {/* ============================================================== */}
        {/* DESKTOP LEFT COLUMN (Col 1-5)                                   */}
        {/* ============================================================== */}
        {isEven ? (
          // EVEN (Metrics 02, 04): Editorial Contextual Counterpart on the Left
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center lg:text-right pr-6 pt-4">
            {stat.editorialNote && (
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-[0.24em] text-earth-sage uppercase block">
                  [{stat.editorialNote.tag}]
                </span>
                <h4 className="font-editorial text-xl text-earth-forest font-medium tracking-tight">
                  {stat.editorialNote.headline}
                </h4>
                <p className="font-sans text-xs text-earth-black/70 leading-relaxed max-w-sm ml-auto">
                  {stat.editorialNote.detail}
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[9px] tracking-widest text-earth-muted uppercase block">
                    BENCHMARK AUDIT · {stat.highlight}
                  </span>
                </div>
              </div>
            )}
          </div>
        ) : (
          // ODD (Metrics 01, 03): Primary Hero Metric on the Left
          <div className="lg:col-span-5 flex flex-col items-start text-left lg:items-end lg:text-right pr-0 lg:pr-8">
            {/* Category Eyebrow */}
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-muted uppercase block mb-1">
              {stat.category || `0${index + 1} / METRIC`}
            </span>

            {/* Oversized Numerical Value */}
            <div className="my-1 sm:my-2">
              <EditorialCounter
                value={stat.value}
                suffix={stat.suffix}
                subNumber={stat.subNumber}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* Unit Classification Label if present */}
            {stat.unitLabel && (
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-earth-sage uppercase block mb-3 font-medium">
                {stat.unitLabel}
              </span>
            )}

            {/* Metric Title in High-Contrast Serif */}
            <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-earth-forest font-medium tracking-tight uppercase mb-3">
              {stat.title}
            </h3>

            {/* Core Explanatory Description */}
            <p className="font-sans text-sm sm:text-base text-earth-black/80 leading-relaxed max-w-md mb-4">
              {stat.description}
            </p>

            {/* Fine Hairline Rule */}
            <div className="w-16 h-[1px] bg-earth-border/80 my-3 lg:ml-auto" />

            {/* Methodological Context & Source Footnote */}
            <div className="space-y-1.5 max-w-md">
              <p className="font-sans text-xs text-earth-muted/90 leading-relaxed italic">
                {stat.qualification}
              </p>
              <div className="font-mono text-[10px] tracking-widest text-earth-forest font-semibold uppercase pt-1">
                SOURCE: {stat.source}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* DESKTOP CENTER DIVIDER COLUMN (Col 6-7, Spacer)                */}
        {/* ============================================================== */}
        <div className="hidden lg:block lg:col-span-2" aria-hidden="true" />

        {/* ============================================================== */}
        {/* DESKTOP RIGHT COLUMN (Col 8-12)                                 */}
        {/* ============================================================== */}
        {isEven ? (
          // EVEN (Metrics 02, 04): Primary Hero Metric on the Right
          <div className="lg:col-span-5 flex flex-col items-start text-left pl-0 lg:pl-8">
            {/* Category Eyebrow */}
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-muted uppercase block mb-1">
              {stat.category || `0${index + 1} / METRIC`}
            </span>

            {/* Oversized Numerical Value */}
            <div className="my-1 sm:my-2">
              <EditorialCounter
                value={stat.value}
                suffix={stat.suffix}
                subNumber={stat.subNumber}
                isInView={isInView}
                shouldReduceMotion={shouldReduceMotion}
              />
            </div>

            {/* Unit Classification Label if present */}
            {stat.unitLabel && (
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-earth-sage uppercase block mb-3 font-medium">
                {stat.unitLabel}
              </span>
            )}

            {/* Metric Title in High-Contrast Serif */}
            <h3 className="font-editorial text-2xl sm:text-3xl lg:text-4xl text-earth-forest font-medium tracking-tight uppercase mb-3">
              {stat.title}
            </h3>

            {/* Core Explanatory Description */}
            <p className="font-sans text-sm sm:text-base text-earth-black/80 leading-relaxed max-w-md mb-4">
              {stat.description}
            </p>

            {/* Fine Hairline Rule */}
            <div className="w-16 h-[1px] bg-earth-border/80 my-3" />

            {/* Methodological Context & Source Footnote */}
            <div className="space-y-1.5 max-w-md">
              <p className="font-sans text-xs text-earth-muted/90 leading-relaxed italic">
                {stat.qualification}
              </p>
              <div className="font-mono text-[10px] tracking-widest text-earth-forest font-semibold uppercase pt-1">
                SOURCE: {stat.source}
              </div>
            </div>
          </div>
        ) : (
          // ODD (Metrics 01, 03): Editorial Contextual Counterpart on the Right
          <div className="hidden lg:flex lg:col-span-5 flex-col justify-center text-left pl-6 pt-4">
            {stat.editorialNote && (
              <div className="space-y-3">
                <span className="font-mono text-[10px] tracking-[0.24em] text-earth-sage uppercase block">
                  [{stat.editorialNote.tag}]
                </span>
                <h4 className="font-editorial text-xl text-earth-forest font-medium tracking-tight">
                  {stat.editorialNote.headline}
                </h4>
                <p className="font-sans text-xs text-earth-black/70 leading-relaxed max-w-sm">
                  {stat.editorialNote.detail}
                </p>
                <div className="pt-2">
                  <span className="font-mono text-[9px] tracking-widest text-earth-muted uppercase block">
                    BENCHMARK AUDIT · {stat.highlight}
                  </span>
                </div>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
};

// ============================================================================
// MAIN BENEFITS STRIP SECTION
// Redesigned as "THE POWER OF PROOF" Editorial Data Experience
// ============================================================================
export const BenefitsStrip: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const metricsListRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotionPreference();

  // Scroll tracking for the continuous central/left connecting line
  const { scrollYProgress } = useScroll({
    target: metricsListRef,
    offset: ['start 70%', 'end 70%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <section 
      ref={containerRef}
      id="operational-metrics"
      className="relative bg-earth-ivory py-24 sm:py-32 md:py-40 border-t border-b border-earth-border/70 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* ============================================================== */}
        {/* 2. SECTION INTRODUCTION                                        */}
        {/* Centered, oversized editorial serif heading, prominent hierarchy*/}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28 lg:mb-36">
          <Reveal variant="fadeUp" delay={0.05}>
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.28em] sm:tracking-[0.32em] font-semibold text-earth-sage uppercase block mb-3 sm:mb-4">
              PROVEN BENCHMARKS
            </span>
          </Reveal>

          <TextReveal
            text="Numbers That Speak for Themselves."
            mode="line"
            as="h2"
            delay={0.1}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-earth-forest font-normal tracking-tight leading-[1.08] mb-4 sm:mb-6"
          />

          <Reveal variant="fadeUp" delay={0.2}>
            <p className="font-sans text-sm sm:text-base md:text-lg text-earth-black/75 max-w-2xl mx-auto leading-relaxed">
              Explore the operational advantages of geothermal energy through measurable benchmarks and independently sourced research.
            </p>
          </Reveal>

          {/* Editorial Methodology Tag */}
          <Reveal variant="fadeUp" delay={0.25}>
            <div className="inline-flex items-center space-x-2 mt-5 px-3.5 py-1.5 border border-earth-border/80 rounded-full text-[9px] font-mono tracking-widest text-earth-muted uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
              <span>INDEPENDENT LABORATORY AUDIT · PEER-REVIEWED DATA</span>
            </div>
          </Reveal>
        </div>

        {/* ============================================================== */}
        {/* 3 & 8. FOUR-METRIC ASYMMETRICAL EDITORIAL COMPOSITION          */}
        {/* Continuous scroll-tied line + Alternating chapters              */}
        {/* ============================================================== */}
        <div ref={metricsListRef} className="relative">
          
          {/* Central Vertical Connecting Track (Desktop: Center | Mobile: Left) */}
          <div 
            className="absolute top-4 bottom-8 pointer-events-none z-10
              left-4 sm:left-6
              lg:left-1/2 lg:-translate-x-1/2
              w-[1px] bg-earth-border/60
            "
            aria-hidden="true"
          >
            {/* Scroll-driven Progress Indicator Fill */}
            <motion.div
              style={{
                scaleY: shouldReduceMotion ? 1 : smoothProgress,
                transformOrigin: 'top',
              }}
              className="w-full h-full bg-gradient-to-b from-earth-forest via-earth-sage to-earth-forest/40"
            />
          </div>

          {/* Sequential Metric Chapters with Generous Separation */}
          <div className="space-y-24 sm:space-y-32 lg:space-y-40">
            {BENEFIT_STATS.map((stat, idx) => (
              <MetricChapter
                key={stat.title}
                stat={stat}
                index={idx}
                isEven={idx % 2 === 1}
                shouldReduceMotion={shouldReduceMotion}
              />
            ))}
          </div>

        </div>

        {/* ============================================================== */}
        {/* Section Bottom Synthesis Note                                  */}
        {/* ============================================================== */}
        <div className="mt-20 sm:mt-28 lg:mt-36 pt-8 border-t border-earth-border/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-widest text-earth-muted uppercase space-y-3 sm:space-y-0">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 rounded-full bg-earth-forest" />
            <span>STANDARDIZED MEASUREMENT BOUNDARIES</span>
          </div>
          <div>
            NREL LCA HARMONIZATION · DOE GEOVISION (2019–2024)
          </div>
        </div>

      </div>
    </section>
  );
};
