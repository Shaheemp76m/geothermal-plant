import React, { useState, useEffect, useLayoutEffect, useRef, useCallback } from 'react';
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
      <div className="font-editorial text-[clamp(3.5rem,9vw,8.5rem)] font-bold text-earth-forest leading-[0.88] tracking-tight select-none inline-flex items-baseline">
        <span>{count}</span>
        <span className="text-earth-sage mx-1 sm:mx-1.5 font-normal text-[0.85em]">/</span>
        <span>{subCount}</span>
      </div>
    );
  }

  return (
    <div className="font-editorial text-[clamp(3.5rem,9vw,8.5rem)] font-bold text-earth-forest leading-[0.88] tracking-tight select-none inline-flex items-baseline">
      <span>{count}</span>
      <span className="text-earth-sage font-editorial font-normal text-[0.55em] ml-1.5 sm:ml-2 align-baseline tracking-normal">
        {suffix.trim()}
      </span>
    </div>
  );
};

// ============================================================================
// INDIVIDUAL EDITORIAL METRIC CHAPTER
// Strict Alternating Left-Right Composition Around Central Timeline
// ============================================================================
interface MetricTimelineItemProps {
  stat: BenefitStat;
  index: number;
  shouldReduceMotion: boolean;
  itemRefCallback?: (el: HTMLDivElement | null) => void;
}

const MetricTimelineItem: React.FC<MetricTimelineItemProps> = ({
  stat,
  index,
  shouldReduceMotion,
  itemRefCallback,
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, { once: true, margin: '-70px' });

  // 01 (Left), 02 (Right), 03 (Left), 04 (Right)
  const isLeft = index % 2 === 0;

  // Directional entrance: 01 & 03 from Left, 02 & 04 from Right
  const initialX = shouldReduceMotion ? 0 : isLeft ? -28 : 28;

  // Metric Composition Block
  const metricContent = (
    <div 
      className={`relative z-10 flex flex-col ${
        isLeft 
          ? 'items-start text-left md:items-end md:text-right mr-auto md:mr-0 md:ml-auto max-w-[80%] sm:max-w-[82%] md:max-w-xl md:pr-10 lg:pr-16' 
          : 'items-end text-right md:items-start md:text-left ml-auto md:ml-0 md:mr-auto max-w-[80%] sm:max-w-[82%] md:max-w-xl md:pl-10 lg:pl-16'
      }`}
    >
      {/* Category Eyebrow */}
      <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-muted uppercase block mb-1.5">
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
      <div 
        className={`w-16 h-[1px] bg-earth-border/80 my-3 ${
          isLeft ? 'ml-0 md:ml-auto' : 'ml-auto md:ml-0'
        }`} 
      />

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
  );

  return (
    <div 
      ref={(el) => {
        localRef.current = el;
        if (itemRefCallback) itemRefCallback(el);
      }} 
      className="relative scroll-mt-24"
    >
      {/* ------------------------------------------------------------------ */}
      {/* Numbered Progress Node Marker on the Central Timeline              */}
      {/* Fixed in their exact positions on desktop, tablet, and mobile      */}
      {/* ------------------------------------------------------------------ */}
      <div 
        className="absolute left-1/2 -translate-x-1/2 top-0 md:top-2 z-20 flex items-center justify-center pointer-events-none"
      >
        <div 
          className={`w-8 h-8 rounded-full font-mono text-[11px] font-bold flex items-center justify-center transition-all duration-700 ${
            isInView
              ? 'bg-earth-forest text-earth-ivory border-2 border-earth-forest shadow-sm scale-110'
              : 'bg-earth-ivory text-earth-muted border border-earth-border scale-100'
          }`}
        >
          0{index + 1}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Alternating Grid Row (Desktop & Tablet: 2-Col | Mobile: Single Col)*/}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, x: initialX, y: 16 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: 16 }}
        transition={{
          duration: 0.75,
          ease: MOTION_EASINGS.editorial,
        }}
        className="grid grid-cols-1 md:grid-cols-2 gap-y-6 md:gap-x-16 lg:gap-x-24 items-start pt-11 md:pt-0"
      >
        {isLeft ? (
          // Metric 01, 03: Placed in the LEFT column; Right column is empty spacer
          <>
            <div className="w-full">
              {metricContent}
            </div>
            <div className="hidden md:block w-full" aria-hidden="true" />
          </>
        ) : (
          // Metric 02, 04: Placed in the RIGHT column; Left column is empty spacer
          <>
            <div className="hidden md:block w-full" aria-hidden="true" />
            <div className="w-full">
              {metricContent}
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

// ============================================================================
// MAIN PEER-REVIEWED OPERATIONAL METRICS SECTION
// Desktop: Perfectly Straight Vertical Line | Mobile: Refined S-Shaped Curve
// ============================================================================
export const BenefitsStrip: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const metricsListRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotionPreference();

  const [pathD, setPathD] = useState<string>('');
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });

  // Scroll tracking for both straight desktop line and mobile S-curve path
  const { scrollYProgress } = useScroll({
    target: metricsListRef,
    offset: ['start 65%', 'end 80%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 22,
    restDelta: 0.001,
  });

  // Calculate the smooth, continuous cubic Bezier S-path for Mobile screens
  const calculateMobilePath = useCallback(() => {
    if (!metricsListRef.current) return;
    const container = metricsListRef.current;
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width === 0 || height === 0) return;

    // Only compute curved path if below tablet breakpoint (desktop uses straight line)
    if (width >= 768) {
      setPathD('');
      return;
    }

    setDimensions({ width, height });

    const centerX = width / 2;
    const markers: { x: number; y: number }[] = [];

    for (let i = 0; i < BENEFIT_STATS.length; i++) {
      const el = itemRefs.current[i];
      if (el) {
        const elRect = el.getBoundingClientRect();
        const relativeTop = elRect.top - containerRect.top;
        // On mobile (<768px), marker is at top-0 (height 32px, vertical center is +16px)
        const markerY = relativeTop + 16;
        markers.push({
          x: centerX,
          y: markerY,
        });
      }
    }

    if (markers.length < 4) return;

    // Outward apex lateral bounds:
    // Safe clearance: 20px from container edges (which already has px-4 = 36px viewport clearance)
    const rightApexX = Math.min(width - 20, width * 0.93);
    const leftApexX = Math.max(20, width * 0.07);

    // Initial lead-in entering Marker 01 vertically
    let d = `M ${centerX.toFixed(1)} ${Math.max(0, markers[0].y - 32).toFixed(1)} L ${centerX.toFixed(1)} ${markers[0].y.toFixed(1)}`;

    // Generate smooth, continuous C1-continuous cubic Bezier S-curves
    for (let i = 0; i < markers.length - 1; i++) {
      const start = markers[i];
      const end = markers[i + 1];
      const isLeft = i % 2 === 0; // i=0: Metric 01 (Left), i=1: Metric 02 (Right), i=2: Metric 03 (Left)
      const apexX = isLeft ? rightApexX : leftApexX;

      const deltaY = end.y - start.y;
      
      // Apex point placed naturally at 48% down between start and end markers
      const midY = start.y + deltaY * 0.48;

      // Generous, controlled Bezier handle lengths (no jagged bends, no straight segments)
      const h1 = (midY - start.y) * 0.52;
      const h2 = (midY - start.y) * 0.48;
      const h3 = (end.y - midY) * 0.48;
      const h4 = (end.y - midY) * 0.52;

      // Arc 1: From (centerX, start.y) to (apexX, midY)
      // Pure vertical tangents at both endpoints guarantee seamless C1 continuity
      const cp1x = centerX;
      const cp1y = start.y + h1;
      const cp2x = apexX;
      const cp2y = midY - h2;
      d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${apexX.toFixed(1)} ${midY.toFixed(1)}`;

      // Arc 2: From (apexX, midY) to (centerX, end.y)
      // Pure vertical tangents guarantee zero angular cusps at the marker
      const cp3x = apexX;
      const cp3y = midY + h3;
      const cp4x = centerX;
      const cp4y = end.y - h4;
      d += ` C ${cp3x.toFixed(1)} ${cp3y.toFixed(1)}, ${cp4x.toFixed(1)} ${cp4y.toFixed(1)}, ${centerX.toFixed(1)} ${end.y.toFixed(1)}`;
    }

    // Lead-out flourish after Marker 04 (leaves Marker 04 vertically, curves gently left)
    const m4 = markers[3];
    const outApexX = leftApexX;
    const outY = m4.y + 65;
    const outH = 65;
    const cpOut1x = centerX;
    const cpOut1y = m4.y + outH * 0.5;
    const cpOut2x = outApexX;
    const cpOut2y = outY - outH * 0.4;
    d += ` C ${cpOut1x.toFixed(1)} ${cpOut1y.toFixed(1)}, ${cpOut2x.toFixed(1)} ${cpOut2y.toFixed(1)}, ${outApexX.toFixed(1)} ${outY.toFixed(1)}`;

    setPathD(d);
  }, []);

  // Recalculate path responsively on resize and layout changes (never during scrolling)
  useLayoutEffect(() => {
    calculateMobilePath();

    const handleResize = () => {
      calculateMobilePath();
    };

    window.addEventListener('resize', handleResize);

    const observer = new ResizeObserver(() => {
      calculateMobilePath();
    });

    if (metricsListRef.current) {
      observer.observe(metricsListRef.current);
    }

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Account for potential late webfont shifts
    const timer = setTimeout(calculateMobilePath, 150);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
    };
  }, [calculateMobilePath]);

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
        <div className="text-center max-w-3xl mx-auto mb-24 sm:mb-32 md:mb-40 lg:mb-48">
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
        {/* 1, 2, 3. ALTERNATING METRICS TIMELINE                           */}
        {/* Desktop: Straight Line | Mobile: Refined S-Shaped Bezier Path   */}
        {/* 01 LEFT → 02 RIGHT → 03 LEFT → 04 RIGHT                         */}
        {/* ============================================================== */}
        <div ref={metricsListRef} className="relative">
          
          {/* ============================================================ */}
          {/* 1. DESKTOP & TABLET: Perfectly Straight Central Timeline     */}
          {/* Active on md: (768px+) screens; completely straight & clean  */}
          {/* ============================================================ */}
          <div 
            className="hidden md:block absolute top-2 bottom-8 pointer-events-none z-10 left-1/2 -translate-x-1/2 w-[1px] bg-earth-border/60"
            aria-hidden="true"
          >
            {/* Scroll-driven Progress Indicator Fill */}
            <motion.div
              style={{
                scaleY: shouldReduceMotion ? 1 : smoothProgress,
                transformOrigin: 'top',
              }}
              className="w-full h-full bg-gradient-to-b from-earth-forest via-earth-sage to-earth-forest/50"
            />
          </div>

          {/* ============================================================ */}
          {/* 2. MOBILE: Smooth, Flowing Cubic Bezier S-Curve (< 768px)    */}
          {/* Active on mobile; seamlessly travels around compositions     */}
          {/* ============================================================ */}
          {pathD && (
            <svg
              className="md:hidden block absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
              viewBox={`0 0 ${dimensions.width || 100} ${dimensions.height || 100}`}
              aria-hidden="true"
            >
              {/* Subtle background guide track */}
              <path
                d={pathD}
                fill="none"
                stroke="#DDD7C8"
                strokeWidth="1.25"
                strokeDasharray="4 4"
                opacity="0.5"
              />

              {/* Progressively animated smooth flowing muted-sage stroke */}
              <motion.path
                d={pathD}
                fill="none"
                stroke="#8BAF91"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  pathLength: shouldReduceMotion ? 1 : smoothProgress,
                }}
              />
            </svg>
          )}

          {/* Four Alternating Metric Compositions with Generous Vertical Separation */}
          <div className="space-y-28 sm:space-y-36 md:space-y-44 lg:space-y-52">
            {BENEFIT_STATS.map((stat, idx) => (
              <MetricTimelineItem
                key={stat.title}
                stat={stat}
                index={idx}
                shouldReduceMotion={shouldReduceMotion}
                itemRefCallback={(el) => {
                  itemRefs.current[idx] = el;
                }}
              />
            ))}
          </div>

        </div>

        {/* ============================================================== */}
        {/* Section Bottom Synthesis Note                                  */}
        {/* ============================================================== */}
        <div className="mt-24 sm:mt-32 md:mt-40 pt-8 border-t border-earth-border/60 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-widest text-earth-muted uppercase space-y-3 sm:space-y-0">
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
