import React, { useState, useEffect, useRef } from 'react';
import { useInView } from 'motion/react';
import { BENEFIT_STATS } from '../../data/content';

// Count-up helper component
const Counter: React.FC<{ target: number; suffix: string; duration?: number }> = ({
  target,
  suffix,
  duration = 1800,
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  useEffect(() => {
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
  }, [isInView, target, duration]);

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
          <span className="text-[10px] tracking-[0.24em] sm:tracking-[0.28em] font-semibold text-earth-forest uppercase block mb-2">
            PROVEN BENCHMARKS
          </span>
          <h2 className="font-editorial text-2xl sm:text-3xl md:text-4xl text-earth-forest font-medium tracking-tight mb-2.5 sm:mb-3">
            Peer-Reviewed Operational Metrics
          </h2>
          <p className="text-xs sm:text-sm text-earth-black/70 font-sans">
            Quantifiable advantages verified by the International Energy Agency and US Department of Energy national laboratories.
          </p>
        </div>

        {/* 4 Statistical Benchmark Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
          {BENEFIT_STATS.map((stat, idx) => (
            <div
              key={idx}
              className="bg-earth-ivory p-4 sm:p-6 md:p-8 border border-earth-border flex flex-col justify-between hover:border-earth-forest/60 transition-all duration-300 shadow-[0_4px_20px_rgba(16,37,28,0.03)] group"
            >
              <div>
                {/* Metric Counter & Title */}
                <div className="mb-3 sm:mb-4">
                  <div className="flex items-baseline justify-between mb-1.5 sm:mb-2">
                    <Counter target={stat.value} suffix={stat.suffix} />
                    <span className="text-[10px] font-mono text-earth-muted">
                      0{idx + 1}
                    </span>
                  </div>
                  <h3 className="text-xs font-semibold tracking-[0.18em] sm:tracking-[0.2em] text-earth-forest uppercase font-sans">
                    {stat.title}
                  </h3>
                  <span className="text-[10px] sm:text-[11px] font-mono text-earth-sage block mt-0.5 sm:mt-1">
                    {stat.highlight}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-earth-black/75 font-sans leading-relaxed mb-3 sm:mb-4">
                  {stat.description}
                </p>

                {/* Qualification */}
                <div className="text-[10px] sm:text-[11px] text-earth-muted font-sans border-t border-earth-border/60 pt-2.5 sm:pt-3 italic">
                  {stat.qualification}
                </div>
              </div>

              {/* Source attribution */}
              <div className="mt-4 sm:mt-5 pt-2.5 sm:pt-3 border-t border-earth-border/60 flex items-center justify-between text-[9px] sm:text-[10px] font-mono text-earth-muted">
                <span>VERIFIED SOURCE</span>
                <span className="truncate max-w-[130px] text-right font-medium text-earth-forest">
                  {stat.source}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
