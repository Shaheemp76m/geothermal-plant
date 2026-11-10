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

  const justifyClass = align === 'right' ? 'justify-end' : 'justify-start';

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
      <div className={`font-editorial text-[clamp(2.75rem,7.5vw,7.5rem)] font-bold text-earth-forest leading-[0.88] tracking-tight select-none inline-flex items-baseline w-full ${justifyClass}`}>
        <span>{count}</span>
        <span className="text-earth-sage mx-1 sm:mx-1.5 font-normal text-[0.85em]">/</span>
        <span>{subCount}</span>
      </div>
    );
  }

  return (
    <div className={`font-editorial text-[clamp(2.75rem,7.5vw,7.5rem)] font-bold text-earth-forest leading-[0.88] tracking-tight select-none inline-flex items-baseline w-full ${justifyClass}`}>
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
  contentRefCallback?: (el: HTMLDivElement | null) => void;
  mobileMarkerPos?: { x: number; y: number } | null;
}

const MetricTimelineItem: React.FC<MetricTimelineItemProps> = ({
  stat,
  index,
  shouldReduceMotion,
  contentRefCallback,
  mobileMarkerPos,
}) => {
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, { once: true, margin: '-70px' });

  // 01 (Left), 02 (Right), 03 (Left), 04 (Right)
  const isLeft = index % 2 === 0;

  // Directional entrance: 01 & 03 from Left, 02 & 04 from Right
  const initialX = shouldReduceMotion ? 0 : isLeft ? -28 : 28;

  // Content alignment:
  // Left metrics (01, 03): text-left items-start on mobile, text-right items-end on desktop
  // Right metrics (02, 04): text-right items-end on mobile, text-left items-start on desktop
  const mobileAlignClass = isLeft 
    ? 'items-start text-left mr-auto' 
    : 'items-end text-right ml-auto';

  const desktopAlignClass = isLeft 
    ? 'md:items-end md:text-right md:mr-0 md:ml-auto md:pr-10 lg:pr-16' 
    : 'md:items-start md:text-left md:ml-0 md:mr-auto md:pl-10 lg:pl-16';

  return (
    <div 
      ref={localRef} 
      className="relative scroll-mt-24"
    >
      {/* ------------------------------------------------------------------ */}
      {/* 1. DESKTOP & TABLET: Central Marker on Straight Vertical Line      */}
      {/* Active on md: (768px+); exactly centered between columns           */}
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
      {/* 2. MOBILE: Marker Placed Exactly on the S-Curve Timeline (<768px)  */}
      {/* ------------------------------------------------------------------ */}
      {mobileMarkerPos && (
        <div 
          className="md:hidden flex absolute z-20 items-center justify-center pointer-events-none transition-transform duration-700"
          style={{
            left: `${mobileMarkerPos.x}px`,
            top: `${mobileMarkerPos.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div 
            className={`w-7 h-7 rounded-full font-mono text-[10px] font-bold flex items-center justify-center transition-all duration-700 ${
              isInView
                ? 'bg-earth-forest text-earth-ivory border-2 border-earth-forest shadow-sm scale-110'
                : 'bg-earth-ivory text-earth-muted border border-earth-border scale-100'
            }`}
          >
            0{index + 1}
          </div>
        </div>
      )}

      {/* ------------------------------------------------------------------ */}
      {/* Alternating Content Grid Row                                      */}
      {/* Desktop: 2-column alternating grid | Mobile: Outer-edge single col*/}
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
                className={`relative z-10 flex flex-col w-[72%] sm:w-[68%] md:w-full max-w-[270px] sm:max-w-[290px] md:max-w-xl ${mobileAlignClass} ${desktopAlignClass}`}
              >
                {/* Category Eyebrow */}
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-muted uppercase block mb-1.5 w-full">
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
                    isLeft ? 'ml-0 md:ml-auto' : 'ml-auto md:ml-0'
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
                className={`relative z-10 flex flex-col w-[72%] sm:w-[68%] md:w-full max-w-[270px] sm:max-w-[290px] md:max-w-xl ${mobileAlignClass} ${desktopAlignClass}`}
              >
                {/* Category Eyebrow */}
                <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-muted uppercase block mb-1.5 w-full">
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
                    isLeft ? 'ml-0 md:ml-auto' : 'ml-auto md:ml-0'
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
// Desktop: Perfectly Straight Central Timeline | Mobile: Smooth S-Curve Timeline
// ============================================================================
export const BenefitsStrip: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const metricsListRef = useRef<HTMLDivElement>(null);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const shouldReduceMotion = useReducedMotionPreference();

  const [pathD, setPathD] = useState<string>('');
  const [dimensions, setDimensions] = useState<{ width: number; height: number }>({ width: 0, height: 0 });
  const [mobileMarkers, setMobileMarkers] = useState<{ x: number; y: number }[]>([]);

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

  // Calculate the smooth S-curve timeline on mobile screens (<768px)
  // Ensures the curve hugs the inner boundary of the text with ~2mm (12-14px) clearance
  const calculateMobilePath = useCallback(() => {
    if (!metricsListRef.current) return;
    const container = metricsListRef.current;
    const containerRect = container.getBoundingClientRect();
    const width = containerRect.width;
    const height = containerRect.height;
    if (width === 0 || height === 0) return;

    // Desktop/Laptop: straight central line is handled via CSS, no SVG path required
    if (width >= 768) {
      setPathD('');
      setMobileMarkers([]);
      return;
    }

    setDimensions({ width, height });

    // Measure actual rendered content boundaries for all 4 metrics
    const contentBounds: { left: number; right: number; top: number; bottom: number }[] = [];
    for (let i = 0; i < BENEFIT_STATS.length; i++) {
      const el = contentRefs.current[i];
      if (el) {
        const elRect = el.getBoundingClientRect();
        contentBounds.push({
          left: elRect.left - containerRect.left,
          right: elRect.right - containerRect.left,
          top: elRect.top - containerRect.top,
          bottom: elRect.bottom - containerRect.top,
        });
      }
    }

    if (contentBounds.length < 4) return;

    // Visual clearance: 14px (~3.7mm, guaranteeing >= 2mm visual breathing room at all mobile densities)
    const clearance = 14;

    // Calculate marker and boundary points for each metric
    const markers: { x: number; y: number }[] = [];
    const apexes: { x: number; yTop: number; yMid: number; yBot: number }[] = [];

    for (let i = 0; i < contentBounds.length; i++) {
      const b = contentBounds[i];
      const isLeft = i % 2 === 0;

      let apexX: number;
      if (isLeft) {
        // Left-side metric: curve runs to the RIGHT of the text
        apexX = Math.min(width - 16, b.right + clearance);
      } else {
        // Right-side metric: curve runs to the LEFT of the text
        apexX = Math.max(16, b.left - clearance);
      }

      const markerY = b.top + 14;
      markers.push({ x: apexX, y: markerY });

      apexes.push({
        x: apexX,
        yTop: b.top,
        yMid: (b.top + b.bottom) / 2,
        yBot: b.bottom,
      });
    }

    setMobileMarkers(markers);

    // Build the continuous, smooth cubic Bezier S-curve
    // 1. Lead-in into Marker 01 vertically
    let d = `M ${markers[0].x.toFixed(1)} ${Math.max(0, markers[0].y - 24).toFixed(1)} L ${markers[0].x.toFixed(1)} ${markers[0].y.toFixed(1)}`;

    // 2. Continuous S-curve flowing around each metric composition
    for (let i = 0; i < 4; i++) {
      const ap = apexes[i];

      // Segment along current metric's inner boundary (from marker down to metric bottom)
      d += ` L ${ap.x.toFixed(1)} ${ap.yBot.toFixed(1)}`;

      // Transition S-curve across to the next metric (for i < 3)
      if (i < 3) {
        const nextMarker = markers[i + 1];
        const deltaY = nextMarker.y - ap.yBot;
        
        // Two control points with vertical tangents at both endpoints guarantee C1 smooth curvature
        const cp1x = ap.x;
        const cp1y = ap.yBot + deltaY * 0.52;
        const cp2x = nextMarker.x;
        const cp2y = nextMarker.y - deltaY * 0.48;

        d += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(1)} ${cp2y.toFixed(1)}, ${nextMarker.x.toFixed(1)} ${nextMarker.y.toFixed(1)}`;
      }
    }

    // 3. Gentle lead-out below Metric 04
    const lastApex = apexes[3];
    const outY = lastApex.yBot + 36;
    d += ` L ${lastApex.x.toFixed(1)} ${outY.toFixed(1)}`;

    setPathD(d);
  }, []);

  // Recalculate path responsively on resize, orientation, DOM updates, and font loading
  useLayoutEffect(() => {
    calculateMobilePath();

    const handleResize = () => {
      calculateMobilePath();
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    const observer = new ResizeObserver(() => {
      calculateMobilePath();
    });

    if (metricsListRef.current) {
      observer.observe(metricsListRef.current);
    }

    contentRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    // Recalculate once webfonts have settled to ensure typography metrics are final
    if (typeof document !== 'undefined' && 'fonts' in document) {
      document.fonts.ready.then(() => {
        calculateMobilePath();
      });
    }

    const timer = setTimeout(calculateMobilePath, 150);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
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
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
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
          {/* 2. MOBILE TIMELINE (< 768px): Continuous S-Shaped Bezier Path */}
          {/* Hugs outer text boundaries with ~2mm clearance               */}
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
                opacity="0.55"
              />

              {/* Progressively revealed smooth sage stroke */}
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

          {/* ============================================================ */}
          {/* FOUR METRIC CHAPTERS WITH GENEROUS VERTICAL SEPARATION       */}
          {/* ============================================================ */}
          <div className="space-y-24 sm:space-y-32 md:space-y-40 lg:space-y-48">
            {BENEFIT_STATS.map((stat, idx) => (
              <MetricTimelineItem
                key={stat.title}
                stat={stat}
                index={idx}
                shouldReduceMotion={shouldReduceMotion}
                contentRefCallback={(el) => {
                  contentRefs.current[idx] = el;
                }}
                mobileMarkerPos={mobileMarkers[idx] || null}
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
