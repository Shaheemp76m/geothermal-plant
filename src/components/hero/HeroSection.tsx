import React from 'react';
import { ArrowDown, Flame } from 'lucide-react';
import { motion } from 'motion/react';
import { HERO_CONTENT } from '../../data/content';

export const HeroSection: React.FC = () => {
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
      className="relative bg-earth-ivory overflow-hidden pt-8 md:pt-14 pb-16 md:pb-24 border-b border-earth-border"
    >
      {/* Massive Editorial Serif Background Wordmark ("GEOTHERMAL") */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden leading-none"
      >
        <span className="font-editorial text-[14vw] font-bold tracking-[0.06em] text-[#E4DFD0] opacity-80 inline-block whitespace-nowrap transform scale-y-105">
          {HERO_CONTENT.bgWord}
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top Eyebrow Tag */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-between border-b border-earth-border/60 pb-4 mb-8 md:mb-12"
        >
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] text-earth-muted uppercase">
            <Flame className="w-3.5 h-3.5 text-earth-sage" />
            <span>SUBTERRANEAN THERMODYNAMICS</span>
          </div>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-earth-muted/80">
            LOC. 64°08'N 21°24'W
          </span>
        </motion.div>

        {/* Hero Headline & Subtitle */}
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-14">
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-earth-forest leading-[1.08] mb-5"
          >
            {HERO_CONTENT.headline}
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="text-xs sm:text-sm md:text-base lg:text-lg text-earth-black/80 max-w-2xl mx-auto font-sans font-normal leading-relaxed"
          >
            {HERO_CONTENT.subtext}
          </motion.p>
        </div>

        {/* Central Composition: Image flanked by editorial text blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center my-6 md:my-10">
          {/* Left Editorial Text Block */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-3 order-2 lg:order-1 text-left space-y-4 lg:pr-4"
          >
            <div className="inline-block border-l-2 border-earth-forest pl-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-earth-muted uppercase block mb-1">
                {HERO_CONTENT.leftNote.label}
              </span>
              <p className="text-xs md:text-sm text-earth-black/85 leading-relaxed font-sans">
                {HERO_CONTENT.leftNote.detail}
              </p>
            </div>
            <div className="pt-2 text-[11px] text-earth-muted/90 font-mono">
              CONTINENTAL GRADIENT: ~30°C / km
            </div>
          </motion.div>

          {/* Central Visual Focal Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.3 }}
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
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] text-[#EAE5D9] font-sans tracking-widest uppercase bg-earth-forest/70 backdrop-blur-md px-3.5 py-2 border border-white/10">
                <span>REYKJANES RIFT PENINSULA</span>
                <span>VOLCANIC STEAM VENT</span>
              </div>
            </div>
          </motion.div>

          {/* Right Editorial Text Block */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="lg:col-span-3 order-3 text-left lg:text-right space-y-4 lg:pl-4"
          >
            <div className="inline-block lg:border-r-2 border-earth-forest lg:border-l-0 border-l-2 pl-3 lg:pl-0 lg:pr-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-earth-muted uppercase block mb-1">
                {HERO_CONTENT.rightNote.label}
              </span>
              <p className="text-xs md:text-sm text-earth-black/85 leading-relaxed font-sans">
                {HERO_CONTENT.rightNote.detail}
              </p>
            </div>
            <div className="pt-2 text-[11px] text-earth-muted/90 font-mono">
              AVAILABILITY: &gt;92% BASELOAD
            </div>
          </motion.div>
        </div>

        {/* Central Restrained CTA Button & Down Anchor */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="text-center mt-12 md:mt-16 flex flex-col items-center justify-center space-y-4"
        >
          <a
            href={HERO_CONTENT.ctaTarget}
            onClick={(e) => handleScrollClick(e, HERO_CONTENT.ctaTarget)}
            className="inline-flex items-center space-x-3 px-8 py-3.5 bg-earth-forest text-earth-ivory text-xs font-semibold tracking-[0.22em] uppercase hover:bg-earth-black transition-all duration-300 shadow-sm"
          >
            <span>{HERO_CONTENT.ctaText}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
          <span className="text-[10px] tracking-[0.22em] text-earth-muted uppercase">
            SCROLL TO EXPLORE ARCHITECTURE
          </span>
        </motion.div>
      </div>
    </section>
  );
};
