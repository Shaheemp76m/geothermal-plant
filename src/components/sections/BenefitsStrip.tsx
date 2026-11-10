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
  align?: 'left' | 'right';
}

const EditorialCounter: React.FC<EditorialCounterProps> = ({
  value,
  suffix,
  subNumber,
  duration = 1600,
  isInView,
  shouldReduceMotion,
  align = 'left',
}) => {
  const [count, setCount] = useState(shouldReduceMotion ? value : 0);
  const [subCount, setSubCount] = useState(shouldReduceMotion && subNumber !== undefined ? subNumber : 0);
  const hasAnimated = useRef(false);

  const justifyClass = align === 'right' ? 'md:justify-end justify-start' : 'justify-start';

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
      <div className={`font-editorial text-[clamp(2.75rem,7.5vw,7.5rem)] font-bold text-earth-forest leading-[0.88] tracking-tight inline-flex items-baseline w-full ${justifyClass}`}>
        <span>{count}</span>
        <span className="text-earth-sage mx-1 sm:mx-1.5 font-normal text-[0.85em]">/</span>
        <span>{subCount}</span>
      </div>
    );
  }

  return (
    <div className={`font-editorial text-[clamp(2.75rem,7.5vw,7.5rem)] font-bold text-earth-forest leading-[0.88] tracking-tight inline-flex items-baseline w-full ${justifyClass}`}>
      <span>{count}</span>
      <span className="text-earth-sage font-editorial font-normal text-[0.55em] ml-1.5 sm:ml-2 align-baseline tracking-normal">
        {suffix.trim()}
      </span>
    </div>
  );
};

// ============================================================================
// INDIVIDUAL EDITORIAL METRIC CHAPTER
// Desktop/Laptop: Symmetrical alternating 2-column layout
// Mobile (<768px): Outer-edge aligned with clear inner margin for S-curve
// ============================================================================
interface MetricTimelineItemProps {
  stat: BenefitStat;
  index: number;
  shouldReduceMotion: boolean;
  itemRefCallback?: (el: HTMLDivElement | null) => void;
  labelRefCallback?: (el: HTMLSpanElement | null) => void;
  contentRefCallback?: (el: HTMLDivElement | null) => void;
  onInViewChange?: (inView: boolean) => void;
}

const MetricTimelineItem: React.FC<MetricTimelineItemProps> = ({
  stat,
  index,
  shouldReduceMotion,
  itemRefCallback,
  labelRefCallback,
  contentRefCallback,
  onInViewChange,
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, { once: true, margin: '-70px' });

  useEffect(() => {
    if (isInView && onInViewChange) {
      onInViewChange(true);
    }
  }, [isInView, onInViewChange]);

  // Combined ref callback
  const handleItemRef = useCallback((el: HTMLDivElement | null) => {
    localRef.current = el;
    if (itemRefCallback) {
      itemRefCallback(el);
    }
  }, [itemRefCallback]);

  // 01 (Left), 02 (Right), 03 (Left), 04 (Right)
  const isLeft = index % 2 === 0;

  // Directional entrance: 01 & 03 from Left, 02 & 04 from Right
  const initialX = shouldReduceMotion ? 0 : isLeft ? -28 : 28;

  // Content alignment:
  // Mobile (<768px): clean full-width left-aligned layout for optimal typography & readability
  // Desktop (>=768px): alternating columns flanking the central vertical line
  const desktopAlignClass = isLeft 
    ? 'md:items-end md:text-right md:mr-0 md:ml-auto md:pr-10 lg:pr-16' 
    : 'md:items-start md:text-left md:ml-0 md:mr-auto md:pl-10 lg:pl-16';

  return (
    <div 
      ref={handleItemRef} 
      className="relative scroll-mt-24"
    >
      {/* ------------------------------------------------------------------ */}
      {/* DESKTOP & TABLET: Central Marker on Straight Vertical Line (>=768px)*/}
      {/* Exactly centered between columns                                    */}
      {/* ------------------------------------------------------------------ */}
      <div 
        className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-2 z-20 items-center justify-center pointer-events-none"
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
      {/* Alternating Content Grid Row                                      */}
      {/* Desktop: 2-column alternating grid | Mobile: Single-column outer   */}
      {/* ------------------------------------------------------------------ */}
      <motion.div
        initial={{ opacity: 0, x: initialX, y: 16 }}
        animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: initialX, y: 16 }}
        transition={{
          duration: 0.75,
          ease: MOTION_EASINGS.editorial,
        }}
        className="grid grid-cols-1 md:grid-cols-2 md:gap-x-16 lg:gap-x-24 items-start pt-2 md:pt-0"
      >
        {isLeft ? (
          // Metric 01, 03: Placed in the LEFT column; Right column is open spacer on desktop
          <>
            <div className="w-full">
              <div 
                ref={contentRefCallback}
                className={`relative z-10 flex flex-col w-full max-w-xl items-start text-left ${desktopAlignClass}`}
              >
                {/* Category Eyebrow - Target for Marker Baseline Alignment */}
                <span 
                  ref={labelRefCallback}
                  className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-muted uppercase block mb-1.5 w-full"
                >
                  {stat.category || `0${index + 1} / METRIC`}
                </span>

                {/* Oversized Numerical Value */}
                <div className="my-1 sm:my-2 w-full">
                  <EditorialCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    subNumber={stat.subNumber}
                    isInView={isInView}
                    shouldReduceMotion={shouldReduceMotion}
                    align={isLeft ? 'left' : 'right'}
                  />
                </div>

                {/* Unit Classification Label */}
                {stat.unitLabel && (
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-earth-sage uppercase block mb-2 sm:mb-3 font-medium w-full">
                    {stat.unitLabel}
                  </span>
                )}

                {/* Metric Title in High-Contrast Serif */}
                <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl text-earth-forest font-medium tracking-tight uppercase mb-2.5 sm:mb-3 w-full">
                  {stat.title}
                </h3>

                {/* Core Explanatory Description */}
                <p className="font-sans text-xs sm:text-sm md:text-base text-earth-black/80 leading-relaxed max-w-md mb-3.5 sm:mb-4 w-full">
                  {stat.description}
                </p>

                {/* Fine Hairline Rule */}
                <div 
                  className={`w-14 sm:w-16 h-[1px] bg-earth-border/80 my-2.5 sm:my-3 ${
                    isLeft ? 'ml-0 md:ml-auto' : 'ml-0'
                  }`} 
                />

                {/* Methodological Context & Source Footnote */}
                <div className="space-y-1 sm:space-y-1.5 max-w-md w-full">
                  <p className="font-sans text-[11px] sm:text-xs text-earth-muted/90 leading-relaxed italic">
                    {stat.qualification}
                  </p>
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-earth-forest font-semibold uppercase pt-1">
                    SOURCE: {stat.source}
                  </div>
                </div>
              </div>
            </div>
            <div className="hidden md:block w-full" aria-hidden="true" />
          </>
        ) : (
          // Metric 02, 04: Placed in the RIGHT column; Left column is open spacer on desktop
          <>
            <div className="hidden md:block w-full" aria-hidden="true" />
            <div className="w-full">
              <div 
                ref={contentRefCallback}
                className={`relative z-10 flex flex-col w-full max-w-xl items-start text-left ${desktopAlignClass}`}
              >
                {/* Category Eyebrow - Target for Marker Baseline Alignment */}
                <span 
                  ref={labelRefCallback}
                  className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-muted uppercase block mb-1.5 w-full"
                >
                  {stat.category || `0${index + 1} / METRIC`}
                </span>

                {/* Oversized Numerical Value */}
                <div className="my-1 sm:my-2 w-full">
                  <EditorialCounter
                    value={stat.value}
                    suffix={stat.suffix}
                    subNumber={stat.subNumber}
                    isInView={isInView}
                    shouldReduceMotion={shouldReduceMotion}
                    align={isLeft ? 'left' : 'right'}
                  />
                </div>

                {/* Unit Classification Label */}
                {stat.unitLabel && (
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-earth-sage uppercase block mb-2 sm:mb-3 font-medium w-full">
                    {stat.unitLabel}
                  </span>
                )}

                {/* Metric Title in High-Contrast Serif */}
                <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl lg:text-4xl text-earth-forest font-medium tracking-tight uppercase mb-2.5 sm:mb-3 w-full">
                  {stat.title}
                </h3>

                {/* Core Explanatory Description */}
                <p className="font-sans text-xs sm:text-sm md:text-base text-earth-black/80 leading-relaxed max-w-md mb-3.5 sm:mb-4 w-full">
                  {stat.description}
                </p>

                {/* Fine Hairline Rule */}
                <div 
                  className={`w-14 sm:w-16 h-[1px] bg-earth-border/80 my-2.5 sm:my-3 ${
                    isLeft ? 'ml-0 md:ml-auto' : 'ml-0'
                  }`} 
                />

                {/* Methodological Context & Source Footnote */}
                <div className="space-y-1 sm:space-y-1.5 max-w-md w-full">
                  <p className="font-sans text-[11px] sm:text-xs text-earth-muted/90 leading-relaxed italic">
                    {stat.qualification}
                  </p>
                  <div className="font-mono text-[9px] sm:text-[10px] tracking-widest text-earth-forest font-semibold uppercase pt-1">
                    SOURCE: {stat.source}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </motion.div>
    </div>
  );
};

// ============================================================================
// MAIN PEER-REVIEWED OPERATIONAL METRICS SECTION
// Architecture:
// 1. One predefined responsive S-shaped SVG path (designed first).
// 2. Four marker positions derived from that path via getPointAtLength.
// 3. Four metric content containers positioned around the path.
// 4. Responsive content alignment independent of path geometry.
// 5. Separate straight-line desktop implementation (>=768px).
// ============================================================================
export const BenefitsStrip: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const metricsListRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const labelRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  const shouldReduceMotion = useReducedMotionPreference();

  const [pathD, setPathD] = useState<string>('');
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [mobileMarkers, setMobileMarkers] = useState<{ x: number; y: number }[]>([]);
  const [inViewStates, setInViewStates] = useState<boolean[]>([false, false, false, false]);

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

  const handleInViewChange = useCallback((idx: number, inView: boolean) => {
    setInViewStates((prev) => {
      if (prev[idx] === inView) return prev;
      const next = [...prev];
      next[idx] = inView;
      return next;
    });
  }, []);

  // ==========================================================================
  // DESIGN THE TIMELINE FIRST: Pure Continuous Cubic Bezier S-Curve
  // ==========================================================================
  // - Starts toward the right side.
  // - Sweeps gradually toward the left side.
  // - Sweeps back toward the right side.
  // - Sweeps toward the left side again.
  // - Fully C1 tangent continuous: zero kinks, zero angular joins, zero straight lines.
  // ==========================================================================
  const generateSPath = useCallback(() => {
    if (!metricsListRef.current) return;
    const container = metricsListRef.current;
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width === 0 || height === 0) return;

    // Desktop/Laptop (>=768px): Straight central line, handled by CSS
    if (width >= 768) {
      setPathD('');
      setMobileMarkers([]);
      return;
    }

    setDimensions({ width, height });

    // Determine vertical anchor levels for the 4 stations from the item layout
    const stationYs: number[] = [];
    const itemBottoms: number[] = [];

    for (let i = 0; i < BENEFIT_STATS.length; i++) {
      const labelEl = labelRefs.current[i];
      const itemEl = itemRefs.current[i];
      if (!labelEl || !itemEl) return;

      const lRect = labelEl.getBoundingClientRect();
      const iRect = itemEl.getBoundingClientRect();

      stationYs.push((lRect.top + lRect.bottom) / 2 - containerRect.top);
      itemBottoms.push(iRect.bottom - containerRect.top);
    }

    if (stationYs.length < 4) return;

    // Fixed lateral amplitude:
    // XR: Right-flank turning boundary (~74% of width, min 65px margin from right)
    // XL: Left-flank turning boundary (~26% of width, min 65px margin from left)
    const rightMargin = Math.max(65, Math.min(95, width * 0.24));
    const leftMargin = rightMargin;
    const xR = width - rightMargin;
    const xL = leftMargin;

    // Build the ONE continuous, pure cubic Bezier S-curve
    // Station 0 (Metric 01): xR, stationYs[0]
    // Station 1 (Metric 02): xL, stationYs[1]
    // Station 2 (Metric 03): xR, stationYs[2]
    // Station 3 (Metric 04): xL, stationYs[3]

    // 1. Lead-in: Enters Station 0 vertically
    const leadInY = Math.max(0, stationYs[0] - 28);
    let d = `M ${xR.toFixed(1)} ${leadInY.toFixed(1)}`;
    d += ` C ${xR.toFixed(1)} ${(leadInY + 10).toFixed(1)}, ${xR.toFixed(1)} ${(stationYs[0] - 8).toFixed(1)}, ${xR.toFixed(1)} ${stationYs[0].toFixed(1)}`;

    // 2. Flow through 4 stations using continuous cubic Bezier segments
    for (let i = 0; i < 4; i++) {
      const curX = i % 2 === 0 ? xR : xL;
      const curY = stationYs[i];
      const curBottom = itemBottoms[i];

      // Gentle continuous arc down the flank of the current metric
      const flankMidY = (curY + curBottom) / 2;
      const flankApexX = i % 2 === 0 
        ? Math.min(width - 16, curX + 10) 
        : Math.max(16, curX - 10);

      // Arc A: from station down around apex with vertical entry
      const h1 = (flankMidY - curY) * 0.50;
      d += ` C ${curX.toFixed(1)} ${(curY + h1).toFixed(1)}, ${flankApexX.toFixed(1)} ${(flankMidY - h1).toFixed(1)}, ${flankApexX.toFixed(1)} ${flankMidY.toFixed(1)}`;

      // Arc B: from apex down to metric bottom with vertical exit tangent
      const h2 = (curBottom - flankMidY) * 0.50;
      d += ` C ${flankApexX.toFixed(1)} ${(flankMidY + h2).toFixed(1)}, ${curX.toFixed(1)} ${(curBottom - h2).toFixed(1)}, ${curX.toFixed(1)} ${curBottom.toFixed(1)}`;

      // Grand S-Curve sweep across to the next station (for i < 3)
      if (i < 3) {
        const nextX = (i + 1) % 2 === 0 ? xR : xL;
        const nextY = stationYs[i + 1];
        const gap = nextY - curBottom;

        // Tangent continuity: outgoing tangent at curBottom is (0, 1), incoming at nextY is (0, 1)
        const cp1x = curX;
        const cp1y = curBottom + gap * 0.50;
        const cp2x = nextX;
        const cp2y = nextY - gap * 0.50;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${nextX.toFixed(1)} ${nextY.toFixed(1)}`;
      }
    }

    // 3. Lead-out: Exits gracefully below Metric 04 with vertical tangent
    const leadOutY = itemBottoms[3] + 24;
    d += ` C ${xL.toFixed(1)} ${(itemBottoms[3] + 8).toFixed(1)}, ${xL.toFixed(1)} ${(leadOutY - 8).toFixed(1)}, ${xL.toFixed(1)} ${leadOutY.toFixed(1)}`;

    setPathD(d);
  }, []);

  // Update marker positions using SVG getPointAtLength() on the rendered path
  const updateMarkersFromPath = useCallback(() => {
    if (!pathRef.current || !metricsListRef.current) return;
    const path = pathRef.current;
    const container = metricsListRef.current;
    const containerRect = container.getBoundingClientRect();

    const targetYs: number[] = [];
    for (let i = 0; i < BENEFIT_STATS.length; i++) {
      const labelEl = labelRefs.current[i];
      if (!labelEl) return;
      const lRect = labelEl.getBoundingClientRect();
      targetYs.push((lRect.top + lRect.bottom) / 2 - containerRect.top);
    }

    const totalLength = path.getTotalLength();
    if (totalLength === 0) return;

    // Binary search for exact point on curve at target Y coordinate
    const markers: { x: number; y: number }[] = targetYs.map((targetY) => {
      let low = 0;
      let high = totalLength;

      for (let iter = 0; iter < 24; iter++) {
        const mid = (low + high) / 2;
        const pt = path.getPointAtLength(mid);
        if (pt.y < targetY) {
          low = mid;
        } else {
          high = mid;
        }
      }

      const bestPt = path.getPointAtLength((low + high) / 2);
      return { x: bestPt.x, y: bestPt.y };
    });

    setMobileMarkers(markers);
  }, []);

  // Orchestrate layout and marker calculation
  useLayoutEffect(() => {
    let rafId: number;
    const runUpdate = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        generateSPath();
        requestAnimationFrame(updateMarkersFromPath);
      });
    };

    runUpdate();

    window.addEventListener('resize', runUpdate);
    window.addEventListener('orientationchange', runUpdate);

    const observer = new ResizeObserver(runUpdate);
    if (metricsListRef.current) observer.observe(metricsListRef.current);
    itemRefs.current.forEach((el) => { if (el) observer.observe(el); });
    labelRefs.current.forEach((el) => { if (el) observer.observe(el); });

    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(runUpdate);
    }

    const t1 = setTimeout(runUpdate, 120);
    const t2 = setTimeout(runUpdate, 350);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', runUpdate);
      window.removeEventListener('orientationchange', runUpdate);
      observer.disconnect();
    };
  }, [generateSPath, updateMarkersFromPath]);

  // When path changes, immediately update markers from the new SVG path
  useEffect(() => {
    if (pathD) {
      updateMarkersFromPath();
    }
  }, [pathD, updateMarkersFromPath]);

  return (
    <section 
      ref={containerRef}
      id="operational-metrics"
      className="relative bg-earth-ivory py-24 sm:py-32 md:py-40 border-t border-b border-earth-border/70 scroll-mt-24 overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        
        {/* ============================================================== */}
        {/* SECTION INTRODUCTION                                           */}
        {/* Centered, oversized editorial serif heading                    */}
        {/* ============================================================== */}
        <div className="text-center max-w-3xl mx-auto mb-20 sm:mb-28 md:mb-36 lg:mb-44">
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
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
              <span>INDEPENDENT LABORATORY AUDIT · PEER-REVIEWED DATA</span>
            </div>
          </Reveal>
        </div>

        {/* ============================================================== */}
        {/* DUAL-MODE TIMELINE CONTAINER                                   */}
        {/* Desktop: Straight Central Line | Mobile: Smooth S-Curve Path    */}
        {/* ============================================================== */}
        <div ref={metricsListRef} className="relative">
          
          {/* ============================================================ */}
          {/* 1. DESKTOP/LAPTOP TIMELINE (>= 768px): Straight Central Line */}
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
          {/* 2. MOBILE TIMELINE (< 768px): Pronounced S-Curve Bezier Path   */}
          {/* One predefined, continuous cubic Bezier path                  */}
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
                strokeDasharray="3 3"
                opacity="0.5"
              />

              {/* Progressively revealed smooth sage stroke */}
              <motion.path
                ref={pathRef}
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

          {/* ============================================================ */}
          {/* 3. MOBILE NUMBERED MARKERS (< 768px)                         */}
          {/* Positioned directly on the fixed SVG path via getPointAtLength*/}
          {/* Exact 1-to-1 mapping: 01, 02, 03, 04 beside category tag      */}
          {/* ============================================================ */}
          {mobileMarkers.map((marker, idx) => (
            <div 
              key={idx}
              className="md:hidden flex absolute z-20 items-center justify-center pointer-events-none transition-transform duration-700"
              style={{
                left: `${marker.x}px`,
                top: `${marker.y}px`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div 
                className={`w-7 h-7 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all duration-700 ${
                  inViewStates[idx]
                    ? 'bg-earth-forest text-earth-ivory border-2 border-earth-forest shadow-sm scale-110'
                    : 'bg-earth-ivory text-earth-muted border border-earth-border scale-100'
                }`}
              >
                0{idx + 1}
              </div>
            </div>
          ))}

          {/* ============================================================ */}
          {/* FOUR METRIC CHAPTERS POSITIONED AROUND THE TIMELINE          */}
          {/* ============================================================ */}
          <div className="space-y-24 sm:space-y-32 md:space-y-40 lg:space-y-48">
            {BENEFIT_STATS.map((stat, idx) => (
              <MetricTimelineItem
                key={stat.title}
                stat={stat}
                index={idx}
                shouldReduceMotion={shouldReduceMotion}
                itemRefCallback={(el) => {
                  itemRefs.current[idx] = el;
                }}
                labelRefCallback={(el) => {
                  labelRefs.current[idx] = el;
                }}
                contentRefCallback={(el) => {
                  contentRefs.current[idx] = el;
                }}
                onInViewChange={(inView) => handleInViewChange(idx, inView)}
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
