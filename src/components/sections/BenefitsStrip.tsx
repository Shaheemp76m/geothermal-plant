import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { BENEFIT_STATS } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { StaggerGroup, StaggerItem } from '../motion/StaggerGroup';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

// Count-up helper component
const Counter: React.FC<{ target: number; suffix: string; duration?: number }> = ({
  target,
  suffix,
  duration = 1800,
}) => {
  const shouldReduceMotion = useReducedMotionPreference();
  const [count, setCount] = useState(shouldReduceMotion ? target : 0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
    if (shouldReduceMotion) {
      setCount(target);
      return;
    }

    if (!isInView) return;

    let startTime: number | null = null;
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      
      const easeOut = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.floor(easeOut * target);
      
      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrameId);
  }, [isInView, target, duration, shouldReduceMotion]);

  return (
    <span ref={ref} className="font-editorial text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-earth-forest">
      {count}
      <span className="text-earth-sage ml-1 text-xl sm:text-2xl lg:text-3xl font-sans font-semibold">
        {suffix}
      </span>
    </span>
  );
};

export const BenefitsStrip: React.FC = () => {
  return (
    <section className="bg-earth-stone-light/60 py-14 sm:py-18 md:py-20 border-b border-earth-border">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-10 sm:mb-14 md:mb-16 max-w-2xl mx-auto">
          <Reveal variant="fadeUp" delay={0.05}>
            <span className="text-[10px] tracking-[0.24em] sm:tracking-[0.28em] font-semibold text-earth-forest uppercase block mb-2">
              PROVEN BENCHMARKS
            </span>
          </Reveal>

          <TextReveal
            text="Peer-Reviewed Operational Metrics"
            mode="line"
            as="h2"
            delay={0.1}
            className="font-editorial text-2xl sm:text-3xl md:text-4xl text-earth-forest font-medium tracking-tight mb-2.5 sm:mb-3"
          />

          <Reveal variant="fadeUp" delay={0.2}>
            <p className="text-xs sm:text-sm text-earth-black/70 font-sans">
              Quantifiable advantages verified by the International Energy Agency and US Department of Energy national laboratories.
            </p>
          </Reveal>
        </div>

        {/* 4 Statistical Benchmark Cards with StaggerGroup */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {BENEFIT_STATS.map((stat, idx) => (
            <StaggerItem
              key={idx}
              className="bg-earth-ivory p-6 sm:p-7 md:p-8 border border-earth-border flex flex-col justify-between hover:border-earth-forest/40 transition-all duration-300 shadow-sm group"
            >
              <div>
                <span className="text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-earth-sage block mb-2 sm:mb-3">
                  {stat.highlight}
                </span>

                <div className="mb-2 sm:mb-3 flex items-baseline">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </div>

                <h3 className="font-editorial text-base sm:text-lg text-earth-forest font-semibold mb-2 group-hover:text-earth-black transition-colors">
                  {stat.title}
                </h3>

                <p className="text-xs text-earth-black/75 font-sans leading-relaxed mb-4 sm:mb-5">
                  {stat.description}
                </p>
              </div>

              {/* Source Footnote */}
              <div className="pt-3 border-t border-earth-border text-[9px] sm:text-[10px] font-mono text-earth-muted">
                SOURCE: {stat.source}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
};
