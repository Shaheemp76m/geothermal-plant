import React, { useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { CLOSING_CONTENT } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { MagneticButton } from '../motion/MagneticButton';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

export const ClosingSection: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotionPreference();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const bgY = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0%', '0%'] : ['-8%', '8%']
  );

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section 
      ref={containerRef}
      className="relative bg-earth-forest text-[#EAE5D9] overflow-hidden py-16 sm:py-24 md:py-32 border-b border-[#203D32]"
    >
      {/* Background Image with atmospheric overlay and subtle parallax */}
      <div className="absolute inset-0 z-0 pointer-events-none select-none overflow-hidden">
        <motion.img
          style={{ y: bgY, scale: shouldReduceMotion ? 1 : 1.1 }}
          src={CLOSING_CONTENT.image}
          alt={CLOSING_CONTENT.imageAlt}
          loading="lazy"
          className="w-full h-full object-cover filter brightness-[0.38] contrast-[1.1] will-change-transform"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-earth-forest via-earth-forest/70 to-earth-forest/40" />
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 text-center flex flex-col items-center">
        <Reveal variant="fadeUp" delay={0.05}>
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.24em] sm:tracking-[0.3em] uppercase text-earth-sage mb-3 sm:mb-4 block">
            {CLOSING_CONTENT.eyebrow}
          </span>
        </Reveal>

        <TextReveal
          text={CLOSING_CONTENT.headline}
          mode="line"
          as="h2"
          delay={0.1}
          className="font-editorial text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-white max-w-4xl leading-[1.14] sm:leading-[1.12] mb-4 sm:mb-6"
        />

        <Reveal variant="fadeUp" delay={0.25}>
          <p className="text-xs sm:text-sm md:text-base text-[#D5D2C7] font-sans max-w-2xl leading-relaxed mb-8 sm:mb-10">
            {CLOSING_CONTENT.body}
          </p>
        </Reveal>

        <Reveal variant="fadeUp" delay={0.35}>
          <MagneticButton
            as="button"
            onClick={scrollToTop}
            className="space-x-2.5 sm:space-x-3 px-6 sm:px-8 py-3 sm:py-3.5 bg-earth-ivory text-earth-forest text-xs font-semibold tracking-[0.2em] sm:tracking-[0.22em] uppercase hover:bg-earth-sage hover:text-white transition-all duration-300 shadow-lg"
          >
            <span>{CLOSING_CONTENT.ctaText}</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
};
