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

  // Entrance variants with explicit Typescript Variants typing
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.14,
        delayChildren: shouldReduceMotion ? 0 : 0.05,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 22 },
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
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-12% 0px -12% 0px' }}
      className={`relative py-16 sm:py-24 md:py-32 lg:py-36 ${
        !isLast ? 'border-b border-earth-border/60' : ''
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
        {/* Left Column: Monumental Number & Classification */}
        <div className="lg:col-span-4 flex flex-row lg:flex-col justify-between items-baseline lg:items-start">
          <motion.div variants={itemVariants} className="select-none">
            <span className="font-editorial text-7xl sm:text-8xl md:text-9xl font-light tracking-tighter text-earth-forest/25 block leading-none">
              {entry.number}
            </span>
          </motion.div>

          <motion.div variants={itemVariants} className="lg:mt-6">
            <span className="font-mono text-[10px] sm:text-[11px] tracking-[0.25em] text-earth-sage uppercase font-medium block">
              STAGE 0{index + 1} · {entry.classification}
            </span>
          </motion.div>
        </div>

        {/* Right Column: Editorial Title, Subtitle, Description & Status */}
        <div className="lg:col-span-8 space-y-6 md:space-y-8">
          {/* Status Badge */}
          <motion.div variants={itemVariants}>
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-earth-forest/5 border border-earth-forest/15 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
              <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.22em] text-earth-forest font-semibold uppercase">
                {entry.status}
              </span>
            </div>
          </motion.div>

          {/* Heading */}
          <motion.h3
            variants={itemVariants}
            className="font-editorial text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-earth-forest leading-[1.1]"
          >
            {entry.title}
          </motion.h3>

          {/* Subtitle with distinct editorial treatment */}
          <motion.p
            variants={itemVariants}
            className="font-editorial italic text-lg sm:text-xl md:text-2xl text-earth-forest/85 font-normal leading-relaxed"
          >
            "{entry.subtitle}"
          </motion.p>

          {/* Description */}
          <motion.p
            variants={itemVariants}
            className="font-sans text-sm sm:text-base md:text-[17px] text-earth-black/75 max-w-2xl leading-relaxed"
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

  // Scroll progress for the vertical indicator line
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
        staggerChildren: shouldReduceMotion ? 0 : 0.18,
      },
    },
  };

  const textItemVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.75,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      id="innovation"
      className="bg-earth-ivory py-20 sm:py-28 md:py-36 border-b border-earth-border relative overflow-hidden"
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Section Introduction */}
        <motion.div
          variants={introVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
          className="max-w-3xl mb-16 sm:mb-24 md:mb-32"
        >
          {/* Eyebrow */}
          <motion.div
            variants={textItemVariants}
            className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.28em] text-earth-forest uppercase mb-4"
          >
            <Sparkles className="w-3.5 h-3.5 text-earth-sage" />
            <span>{NEXT_GEN_SECTION.eyebrow}</span>
          </motion.div>

          {/* Main Heading */}
          <motion.h2
            variants={textItemVariants}
            className="font-editorial text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium tracking-tight text-earth-forest mb-6 leading-[1.08]"
          >
            {NEXT_GEN_SECTION.headline}
          </motion.h2>

          {/* Supporting Description */}
          <motion.p
            variants={textItemVariants}
            className="text-sm sm:text-base md:text-lg text-earth-black/80 font-sans leading-relaxed border-l-2 border-earth-forest/40 pl-5 sm:pl-6"
          >
            {NEXT_GEN_SECTION.description}
          </motion.p>
        </motion.div>

        {/* Sequential Vertical Storytelling Experience */}
        <div ref={containerRef} className="relative">
          {/* Subtle Vertical Progress Indicator (Desktop / Tablet) */}
          <div className="hidden lg:block absolute left-[-28px] xl:left-[-40px] top-4 bottom-4 w-[1px] bg-earth-border/40 select-none pointer-events-none">
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="mt-16 sm:mt-24 pt-12 border-t border-earth-border flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
        >
          <div className="max-w-2xl">
            <span className="font-mono text-[10px] tracking-widest text-earth-muted uppercase block mb-1">
              SCIENTIFIC INTEGRITY & READINESS
            </span>
            <p className="text-xs sm:text-sm text-earth-black/75 font-sans leading-relaxed">
              While conventional hydrothermal power is commercially operational globally, next-generation deep systems are advancing through field trials and regulated pilot facilities.
            </p>
          </div>

          <button
            onClick={onOpenReferences}
            className="inline-flex items-center space-x-3 text-xs font-semibold tracking-[0.2em] uppercase px-7 py-3.5 border border-earth-forest text-earth-forest hover:bg-earth-forest hover:text-earth-ivory transition-all duration-300 shadow-sm shrink-0"
          >
            <span>REVIEW DOE ROADMAP</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      </div>
    </section>
  );
};
