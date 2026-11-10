import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight, Compass } from 'lucide-react';
import { GeothermalExplorerPanel } from './GeothermalExplorerPanel';
import { BottomInformationComposition } from './BottomInformationComposition';
import { MagneticButton } from '../motion/MagneticButton';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_EASINGS } from '../../lib/motionTokens';

interface HeroSectionProps {
  onOpenObservatory?: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenObservatory }) => {
  const shouldReduceMotion = useReducedMotionPreference();

  const handleScrollClick = (e: React.MouseEvent<any>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Exact 3-line composition as specified in Section 04
  const headlineLines = [
    'GEOTHERMAL',
    'BEYOND THE',
    'SURFACE.',
  ];

  return (
    <section 
      id="top" 
      className="relative bg-earth-ivory pt-2 sm:pt-4 pb-8 sm:pb-12 md:pb-16 overflow-hidden scroll-mt-24"
    >
      {/* ======================================================== */}
      {/* 1. FRAMED LANDSCAPE HERO CANVAS (90–95% Viewport Width)   */}
      {/* ======================================================== */}
      <div className="w-[92vw] max-w-[1600px] mx-auto">
        <div className="relative rounded-[28px] sm:rounded-[36px] overflow-hidden border border-earth-border/80 shadow-[0_25px_70px_rgba(16,37,28,0.12)] bg-[#102018] min-h-[680px] lg:min-h-[780px] xl:h-[840px] flex flex-col justify-between">
          
          {/* ====================================================== */}
          {/* 6. MAIN BACKGROUND GEOTHERMAL FACILITY PHOTOGRAPH      */}
          {/* Fills inner frame, center-right subject, natural light */}
          {/* ====================================================== */}
          <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
            <motion.img
              initial={{ scale: shouldReduceMotion ? 1 : 1.08, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1.1, ease: MOTION_EASINGS.editorial }}
              src="/images/hero/geothermal-hero.webp"
              srcSet="/images/hero/geothermal-hero-480.webp 480w, /images/hero/geothermal-hero-768.webp 768w, /images/hero/geothermal-hero-1280.webp 1280w, /images/hero/geothermal-hero-1920.webp 1920w"
              sizes="(max-width: 640px) 480px, (max-width: 1024px) 768px, (max-width: 1536px) 1280px, 1920px"
              alt="Hellisheiði Geothermal Power Station nestled in the dramatic Hengill volcanic mountains with rising steam plumes"
              className="w-full h-full object-cover object-[center_right] filter saturate-[0.96] contrast-[1.04]"
              loading="eager"
              fetchPriority="high"
              decoding="async"
              width={1920}
              height={1281}
            />

            {/* Soft daylight mist wash on upper-left to give the deep forest headline maximum editorial contrast */}
            <div className="absolute inset-0 bg-gradient-to-r from-earth-ivory/95 via-earth-ivory/80 via-38% to-transparent z-10" />
            
            {/* Subtle bottom gradient to support the bottom information composition */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#09130F]/90 via-[#09130F]/30 via-25% to-transparent z-10" />
          </div>

          {/* ====================================================== */}
          {/* MAIN CANVAS BODY: HEADLINE (LEFT) & FLOATING PANEL (RT) */}
          {/* ====================================================== */}
          <div className="relative z-20 px-6 sm:px-10 lg:px-14 pt-8 sm:pt-12 lg:pt-16 pb-4 flex-1 flex flex-col justify-between">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              
              {/* ---------------------------------------------------- */}
              {/* 4. MAIN HEADLINE — LEFT                              */}
              {/* Occupies 35–45% of width, deep forest text           */}
              {/* ---------------------------------------------------- */}
              <div className="lg:col-span-7 xl:col-span-7 space-y-4 sm:space-y-6 max-w-2xl">
                
                {/* Large Editorial Serif 3-Line Heading */}
                <h1 
                  className="font-editorial font-bold tracking-tight text-earth-forest leading-[0.98] sm:leading-[0.92] text-left"
                  style={{ fontSize: 'clamp(2.35rem, 6.8vw, 7.5rem)' }}
                >
                  {headlineLines.map((line, idx) => (
                    <span key={idx} className="block overflow-hidden">
                      <motion.span
                        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 35 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ 
                          duration: 0.75, 
                          delay: 0.15 + idx * 0.12, 
                          ease: MOTION_EASINGS.editorial 
                        }}
                        className="block"
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h1>

                {/* Supporting Text */}
                <motion.p
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.7, delay: 0.5, ease: MOTION_EASINGS.editorial }}
                  className="text-xs sm:text-sm md:text-[15px] text-earth-black/85 font-sans font-normal leading-relaxed max-w-md pt-1"
                >
                  "Harnessing Earth's natural heat for a new energy future."
                </motion.p>

                {/* Action CTAs: EXPLORE & OBSERVATORY */}
                <motion.div
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6, ease: MOTION_EASINGS.editorial }}
                  className="pt-1 sm:pt-2 flex flex-wrap items-center gap-3"
                >
                  <MagneticButton
                    as="a"
                    href="#origins"
                    onClick={(e: React.MouseEvent<any>) => handleScrollClick(e, '#origins')}
                    className="inline-flex items-center space-x-2 px-6 sm:px-7 py-2.5 sm:py-3 bg-earth-forest text-earth-ivory text-xs font-semibold tracking-[0.2em] uppercase rounded-full hover:bg-earth-black transition-all duration-300 shadow-lg group"
                  >
                    <span>EXPLORE</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </MagneticButton>

                  {onOpenObservatory && (
                    <button
                      onClick={onOpenObservatory}
                      className="inline-flex items-center space-x-2 px-5 sm:px-6 py-2.5 sm:py-3 bg-white/80 border border-earth-forest/40 text-earth-forest text-xs font-semibold tracking-[0.18em] uppercase rounded-full hover:bg-earth-forest hover:text-white transition-all duration-300 shadow-md backdrop-blur-sm group"
                      title="Launch Single-Viewport Interactive Subsurface Observatory"
                    >
                      <Compass className="w-3.5 h-3.5 text-earth-forest group-hover:text-earth-sage transition-colors" />
                      <span>OBSERVATORY APP</span>
                    </button>
                  )}
                </motion.div>
              </div>

              {/* ---------------------------------------------------- */}
              {/* 5. FLOATING INFORMATION PANEL — UPPER RIGHT          */}
              {/* Large rounded white panel overlapping photo          */}
              {/* ---------------------------------------------------- */}
              <div className="lg:col-span-5 xl:col-span-5 flex justify-end">
                <GeothermalExplorerPanel />
              </div>

            </div>
          </div>

          {/* ====================================================== */}
          {/* 7, 8, 9. THREE-PART BOTTOM INFORMATION COMPOSITION     */}
          {/* Sits over the lower part of the hero image             */}
          {/* ====================================================== */}
          <BottomInformationComposition />

        </div>
      </div>
    </section>
  );
};
