import React from 'react';
import { ArrowDown, Flame } from 'lucide-react';
import { motion, useReducedMotion } from 'motion/react';
import { HERO_CONTENT } from '../../data/content';

export const HeroSection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="top" 
      className="relative bg-earth-ivory overflow-hidden pt-6 sm:pt-10 md:pt-14 pb-14 sm:pb-20 md:pb-24 border-b border-earth-border scroll-mt-24"
    >
      {/* Massive Editorial Serif Background Wordmark ("GEOTHERMAL") */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden leading-none max-w-full"
      >
        <span className="font-editorial text-[13vw] font-bold tracking-[0.06em] text-[#E4DFD0] opacity-80 inline-block whitespace-nowrap transform scale-y-105">
          {HERO_CONTENT.bgWord}
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Top Eyebrow Tag */}
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-earth-border/60 pb-3 sm:pb-4 mb-6 sm:mb-10 md:mb-12"
        >
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.2em] sm:tracking-[0.24em] text-earth-muted uppercase">
            <Flame className="w-3.5 h-3.5 text-earth-sage shrink-0" />
            <span className="truncate">SUBTERRANEAN THERMODYNAMICS</span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-earth-muted/80">
            LOC. 64°08'N 21°24'W
          </span>
        </motion.div>

        {/* Hero Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-8 sm:mb-12 md:mb-14">
          <motion.h1 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-editorial text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-earth-forest leading-[1.12] sm:leading-[1.08] mb-4 sm:mb-5"
          >
            {HERO_CONTENT.headline}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-earth-black/80 max-w-2xl mx-auto font-sans font-normal leading-relaxed"
          >
            {HERO_CONTENT.subtext}
          </motion.p>
        </div>

        {/* Central Composition: Image flanked by editorial text blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-6 items-center my-4 sm:my-8 md:my-10">
          {/* Left Editorial Text Block */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-3 order-2 lg:order-1 text-left space-y-3 sm:space-y-4 lg:pr-4"
          >
            <div className="inline-block border-l-2 border-earth-forest pl-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-earth-muted uppercase block mb-1">
                {HERO_CONTENT.leftNote.label}
              </span>
              <p className="text-xs sm:text-sm text-earth-black/85 leading-relaxed font-sans">
                {HERO_CONTENT.leftNote.detail}
              </p>
            </div>
            <div className="pt-1 text-[10px] sm:text-[11px] text-earth-muted/90 font-mono">
              CONTINENTAL GRADIENT: ~30°C / km
            </div>
          </motion.div>

          {/* Central Visual Focal Image */}
          <motion.div 
            initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.85, delay: 0.25 }}
            className="lg:col-span-6 order-1 lg:order-2 flex justify-center"
          >
            <div className="relative group w-full max-w-[560px] aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/5] overflow-hidden bg-earth-stone/30 shadow-[0_20px_50px_rgba(16,37,28,0.08)] border border-earth-border">
              <img
                src={HERO_CONTENT.heroImage}
                alt={HERO_CONTENT.heroImageAlt}
                loading="eager"
                className="w-full h-full object-cover object-center img-editorial-zoom filter saturate-[0.92] contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-forest/50 via-transparent to-transparent opacity-60" />
              
              {/* Photo Caption Badge */}
              <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 flex items-center justify-between text-[9px] sm:text-[10px] text-[#EAE5D9] font-sans tracking-widest uppercase bg-earth-forest/75 backdrop-blur-md px-3 py-1.5 sm:px-3.5 sm:py-2 border border-white/10">
                <span className="truncate">REYKJANES RIFT PENINSULA</span>
                <span className="shrink-0 ml-2">STEAM VENT</span>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Text Block */}
          <motion.div 
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-3 order-3 text-left lg:text-right space-y-3 sm:space-y-4 lg:pl-4"
          >
            <div className="inline-block border-l-2 lg:border-l-0 lg:border-r-2 border-earth-forest pl-3 lg:pl-0 lg:pr-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-earth-muted uppercase block mb-1">
                {HERO_CONTENT.rightNote.label}
              </span>
              <p className="text-xs sm:text-sm text-earth-black/85 leading-relaxed font-sans">
                {HERO_CONTENT.rightNote.detail}
              </p>
            </div>
            <div className="pt-1 text-[10px] sm:text-[11px] text-earth-muted/90 font-mono">
              AVAILABILITY: &gt;92% BASELOAD
            </div>
          </motion.div>
        </div>

        {/* Central Restrained CTA Button & Down Anchor */}
        <motion.div 
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-center mt-8 sm:mt-12 md:mt-16 flex flex-col items-center justify-center space-y-3 sm:space-y-4"
        >
          <a
            href={HERO_CONTENT.ctaTarget}
            onClick={(e) => handleScrollClick(e, HERO_CONTENT.ctaTarget)}
            className="inline-flex items-center space-x-2.5 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-earth-forest text-earth-ivory text-xs font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase hover:bg-earth-black transition-all duration-300 shadow-sm"
          >
            <span>{HERO_CONTENT.ctaText}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
          <span className="text-[9px] sm:text-[10px] tracking-[0.2em] text-earth-muted uppercase">
            SCROLL TO EXPLORE ARCHITECTURE
          </span>
        </motion.div>
      </div>
    </section>
  );
};
