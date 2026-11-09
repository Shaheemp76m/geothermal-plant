import React from 'react';
import { ArrowDown, Flame } from 'lucide-react';
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
    <section id="discover" className="relative bg-earth-ivory overflow-hidden pt-8 md:pt-14 pb-16 md:pb-24 border-b border-earth-border">
      {/* Massive Editorial Serif Background Wordmark ("EARTH") */}
      <div 
        aria-hidden="true" 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center pointer-events-none select-none z-0 overflow-hidden leading-none"
      >
        <span className="font-editorial text-[18vw] font-bold tracking-[0.08em] text-[#E5E0D2] opacity-75 inline-block whitespace-nowrap transform scale-y-110">
          {HERO_CONTENT.bgWord}
        </span>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Top Eyebrow Tag */}
        <div className="flex items-center justify-between border-b border-earth-border/60 pb-4 mb-8 md:mb-12">
          <div className="flex items-center space-x-2 text-[11px] font-semibold tracking-[0.22em] text-earth-muted uppercase">
            <Flame className="w-3.5 h-3.5 text-earth-green" />
            <span>SUBTERRANEAN THERMODYNAMICS</span>
          </div>
          <span className="text-[11px] font-mono tracking-widest text-earth-muted/80">
            LOC. 64°08'N 21°24'W
          </span>
        </div>

        {/* Hero Headline & Subtitle */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-14">
          <h1 className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-earth-black leading-[1.08] mb-5">
            {HERO_CONTENT.headline}
          </h1>
          <p className="text-sm sm:text-base md:text-lg text-earth-black/75 max-w-2xl mx-auto font-sans font-normal leading-relaxed">
            {HERO_CONTENT.subtext}
          </p>
        </div>

        {/* Central Composition: Image flanked by editorial text blocks */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6 items-center my-6 md:my-10">
          {/* Left Editorial Text Block */}
          <div className="lg:col-span-3 order-2 lg:order-1 text-left space-y-4 lg:pr-4">
            <div className="inline-block border-l-2 border-earth-green pl-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-earth-muted uppercase block mb-1">
                {HERO_CONTENT.leftNote.label}
              </span>
              <p className="text-xs md:text-sm text-earth-black/85 leading-relaxed font-sans">
                {HERO_CONTENT.leftNote.detail}
              </p>
            </div>
            <div className="pt-2 text-[11px] text-earth-muted/90 font-mono">
              GRADIENT: ~30°C / km
            </div>
          </div>

          {/* Central Product/Visual Focal Image */}
          <div className="lg:col-span-6 order-1 lg:order-2 flex justify-center">
            <div className="relative group w-full max-w-[560px] aspect-[4/5] sm:aspect-[1/1] md:aspect-[4/5] overflow-hidden bg-earth-stone/30 shadow-[0_20px_50px_rgba(17,17,15,0.08)] border border-earth-border">
              <img
                src={HERO_CONTENT.heroImage}
                alt={HERO_CONTENT.heroImageAlt}
                loading="eager"
                className="w-full h-full object-cover object-center img-editorial-zoom filter saturate-[0.92] contrast-[1.02]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-earth-black/40 via-transparent to-transparent opacity-60" />
              
              {/* Photo Caption Badge */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] text-white/90 font-sans tracking-widest uppercase bg-earth-black/40 backdrop-blur-sm px-3.5 py-2 border border-white/10">
                <span>REYKJANES RIFT PENINSULA</span>
                <span>VOLCANIC STEAM VENT</span>
              </div>
            </div>
          </div>

          {/* Right Editorial Text Block */}
          <div className="lg:col-span-3 order-3 text-left lg:text-right space-y-4 lg:pl-4">
            <div className="inline-block lg:border-r-2 border-earth-green lg:border-l-0 border-l-2 pl-3 lg:pl-0 lg:pr-3">
              <span className="text-[10px] font-semibold tracking-[0.25em] text-earth-muted uppercase block mb-1">
                {HERO_CONTENT.rightNote.label}
              </span>
              <p className="text-xs md:text-sm text-earth-black/85 leading-relaxed font-sans">
                {HERO_CONTENT.rightNote.detail}
              </p>
            </div>
            <div className="pt-2 text-[11px] text-earth-muted/90 font-mono">
              AVAILABILITY: &gt;92%
            </div>
          </div>
        </div>

        {/* Central Restrained CTA Button & Down Anchor */}
        <div className="text-center mt-12 md:mt-16 flex flex-col items-center justify-center space-y-4">
          <a
            href={HERO_CONTENT.ctaTarget}
            onClick={(e) => handleScrollClick(e, HERO_CONTENT.ctaTarget)}
            className="inline-flex items-center space-x-3 px-8 py-3.5 bg-earth-black text-earth-ivory text-xs font-medium tracking-[0.22em] uppercase hover:bg-earth-green transition-all duration-300 shadow-sm"
          >
            <span>{HERO_CONTENT.ctaText}</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </a>
          <span className="text-[10px] tracking-[0.2em] text-earth-muted uppercase">
            SCROLL TO EXPLORE ARCHITECTURE
          </span>
        </div>
      </div>
    </section>
  );
};
