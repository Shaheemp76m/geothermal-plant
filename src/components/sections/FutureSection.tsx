import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion, type Variants } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { NEXT_GEN_SECTION, NEXT_GEN_TECH } from '../../data/content';
import { NextGenTechEntry } from '../../types';

interface FutureSectionProps {
  onOpenReferences: () => void;
}

// Single Technology Story Entry Component
const TechStoryEntry: React.FC<{
  entry: NextGenTechEntry;
  index: number;
  isLast: boolean;
}> = ({ entry, index, isLast }) => {
  const shouldReduceMotion = useReducedMotion();

  // Entrance variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
        delayChildren: shouldReduceMotion ? 0 : 0.04,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.65,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
      className={`relative py-10 sm:py-14 md:py-20 lg:py-24 ${
        !isLast ? 'border-b border-earth-border/60' : ''
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 lg:gap-16 items-start">
        {/* Left Column: Stage Number & Classification Lockup */}
        <div className="lg:col-span-4">
          <div className="flex items-center sm:items-baseline gap-3 sm:gap-4 lg:flex-col lg:items-start lg:gap-2">
            {/* Monumental Number */}
            <motion.div variants={itemVariants} className="select-none shrink-0">
              <span className="font-editorial text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-light tracking-tighter text-earth-forest/25 block leading-none">
                {entry.number}
              </span>
            </motion.div>

            {/* Classification Label - Connected and aligned */}
            <motion.div variants={itemVariants} className="flex flex-col justify-center lg:mt-3 min-w-0">
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.24em] text-earth-muted uppercase block leading-tight">
                STAGE 0{index + 1}
              </span>
              <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.18em] sm:tracking-[0.2em] text-earth-sage uppercase font-semibold block mt-0.5 leading-snug">
                {entry.classification}
              </span>
            </motion.div>
          </div>
        </div>

        {/* Right Column: Status Badge, Title, Subtitle, Description */}
        <div className="lg:col-span-8 space-y-3.5 sm:space-y-4 md:space-y-5">
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 px-2.5 sm:px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse shrink-0" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.2em] text-earth-forest font-semibold uppercase">
                {entry.status}
              </span>
            </div>
          </motion.div>

          {/* Title */}
          <motion.h3
            variants={itemVariants}
            className="font-editorial text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-earth-forest leading-[1.14]"
          >
            {entry.title}
          </motion.h3>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="font-editorial italic text-base sm:text-lg md:text-xl lg:text-2xl text-earth-forest/85 font-normal leading-relaxed"
          >
            "{entry.subtitle}"
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-xs sm:text-sm md:text-base text-earth-black/75 max-w-2xl leading-relaxed"
          >
            {entry.description}
          </motion.p>
        </div>
      </div>
    </motion.div>
  );
};

export const FutureSection: React.FC<FutureSectionProps> = ({ onOpenReferences }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  // Scroll progress for vertical indicator line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center'],
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  // Intro reveal variants
  const introVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.7,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="innovation"
      className="bg-earth-ivory py-14 sm:py-20 md:py-28 border-b border-earth-border relative overflow-hidden scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Introduction */}
        <motion.div
          variants={introVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          className="max-w-3xl mb-12 sm:mb-16 md:mb-20"
        >
          {/* Eyebrow */}
          <motion.div
            variants={textItemVariants}
            className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-earth-forest uppercase mb-3"
          >
            <Sparkles className="w-3.5 h-3.5 text-earth-sage shrink-0" />
            <span className="truncate">{NEXT_GEN_SECTION.eyebrow}</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={textItemVariants}
            className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-earth-forest mb-4 sm:mb-5 leading-[1.1]"
          >
            {NEXT_GEN_SECTION.headline}
          </motion.h2>

          {/* Supporting Description */}
          <motion.p
            variants={textItemVariants}
            className="text-xs sm:text-sm md:text-base text-earth-black/80 font-sans leading-relaxed border-l-2 border-earth-forest/40 pl-4 sm:pl-6"
          >
            {NEXT_GEN_SECTION.description}
          </motion.p>
        </motion.div>

        {/* Sequential Vertical Storytelling Experience */}
        <div ref={containerRef} className="relative">
          {/* Subtle Vertical Progress Indicator (Desktop only) */}
          <div className="hidden lg:block absolute left-[-24px] xl:left-[-36px] top-4 bottom-4 w-[1px] bg-earth-border/40 select-none pointer-events-none">
            <motion.div
              style={{ height: lineHeight }}
              className="w-full bg-earth-sage origin-top"
            />
          </div>

          {/* The Four Technology Entries */}
          <div>
            {NEXT_GEN_TECH.map((tech, idx) => (
              <TechStoryEntry
                key={tech.number}
                entry={tech}
                index={idx}
                isLast={idx === NEXT_GEN_TECH.length - 1}
              />
            ))}
          </div>
        </div>

        {/* Section Footer / Research Roadmap Action */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.08 }}
          className="mt-12 sm:mt-16 pt-8 sm:pt-10 border-t border-earth-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-[9px] sm:text-[10px] tracking-widest text-earth-muted uppercase block mb-1">
              SCIENTIFIC INTEGRITY & READINESS
            </span>
            <p className="text-xs sm:text-sm text-earth-black/75 font-sans leading-relaxed">
              While conventional hydrothermal power is commercially operational globally, next-generation deep systems are advancing through field trials and regulated pilot facilities.
            </p>
          </div>

          <button
            onClick={onOpenReferences}
            className="inline-flex items-center space-x-2.5 text-xs font-semibold tracking-[0.18em] sm:tracking-[0.2em] uppercase px-5 sm:px-7 py-3 sm:py-3.5 border border-earth-forest text-earth-forest hover:bg-earth-forest hover:text-earth-ivory transition-all duration-300 shadow-sm shrink-0"
          >
            <span>REVIEW DOE ROADMAP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
