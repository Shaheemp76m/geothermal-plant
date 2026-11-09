import React from 'react';
import { Compass, Flame, ShieldCheck } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { INTRODUCTION_CONTENT } from '../../data/content';

export const IntroductionSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="origins" className="bg-earth-ivory py-14 sm:py-20 md:py-24 border-b border-earth-border scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Eyebrow and Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 md:mb-16">
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-earth-forest uppercase mb-2.5 sm:mb-3">
            <Compass className="w-3.5 h-3.5 text-earth-sage shrink-0" />
            <span>{INTRODUCTION_CONTENT.eyebrow}</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-earth-forest leading-[1.14] mb-4 sm:mb-6">
            {INTRODUCTION_CONTENT.headline}
          </h2>
          <div className="space-y-3 sm:space-y-4 text-xs sm:text-sm md:text-base text-earth-black/80 font-sans leading-relaxed border-l-2 border-earth-forest/40 pl-4 sm:pl-6">
            {INTRODUCTION_CONTENT.body.map((p, idx) => (
              <p key={idx}>{p}</p>
            ))}
          </div>
        </div>

        {/* 2-Column Presentation: Image + Metrics */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left: Atmospheric Image with Technical Framing */}
          <div className="lg:col-span-7">
            <div className="relative group overflow-hidden bg-earth-stone/30 border border-earth-border shadow-[0_12px_36px_rgba(16,37,28,0.06)]">
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={INTRODUCTION_CONTENT.image}
                  alt={INTRODUCTION_CONTENT.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover img-editorial-zoom filter saturate-[0.92] contrast-[1.02]"
                />
              </div>
              <div className="p-3 sm:p-4 bg-earth-stone/20 border-t border-earth-border flex items-center justify-between text-xs text-earth-muted">
                <span className="font-sans text-[11px] sm:text-xs truncate mr-2">Active Volcanic Rift & Thermal Vent Crust</span>
                <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-earth-forest shrink-0">GEOLOGICAL REF · 01</span>
              </div>
            </div>
          </div>

          {/* Right: Key Planetary Heat Metrics */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 sm:gap-4">
            {INTRODUCTION_CONTENT.stats.map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="p-4 sm:p-6 bg-earth-stone-light/50 border border-earth-border hover:border-earth-forest/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5 sm:mb-2">
                  <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-muted uppercase">
                    {stat.label}
                  </span>
                  <Flame className="w-3.5 h-3.5 text-earth-sage shrink-0" />
                </div>
                <div className="font-editorial text-xl sm:text-2xl md:text-3xl font-bold text-earth-forest tracking-tight">
                  {stat.value}
                </div>
              </motion.div>
            ))}

            <div className="p-3.5 sm:p-4 bg-earth-ivory border border-earth-border text-xs text-earth-black/75 flex items-start space-x-2.5">
              <ShieldCheck className="w-4 h-4 text-earth-sage shrink-0 mt-0.5" />
              <p className="leading-relaxed text-[11px] sm:text-xs">
                Earth continuously radiates ~47 Terawatts of heat into space. Tapping a minute fraction of 1% meets total global primary energy consumption indefinitely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
