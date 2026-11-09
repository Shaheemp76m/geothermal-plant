import React, { useState } from 'react';
import { Plus, Minus, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { InView } from '@/components/core/in-view';
import { APPLICATION_CARDS } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_EASINGS } from '../../lib/motionTokens';

export const ExploreGeothermal: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotionPreference();

  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  // Staggered InView parent and child animation variants as specified in reference design
  const parentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.09,
      },
    },
  };

  const childVariants = {
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.8,
      filter: shouldReduceMotion ? 'blur(0px)' : 'blur(10px)',
    },
    visible: {
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        duration: 0.55,
        ease: MOTION_EASINGS.editorial,
      },
    },
  };

  return (
    <section 
      id="applications" 
      className="bg-earth-ivory py-16 sm:py-24 md:py-32 border-b border-earth-border scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ======================================================== */}
        {/* SECTION HEADER                                           */}
        {/* ======================================================== */}
        <div className="max-w-4xl mb-12 sm:mb-16 md:mb-20">
          <Reveal variant="fadeUp" delay={0.05}>
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-earth-forest uppercase mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
              <span>DIVERSE THERMAL APPLICATIONS // THE FULL ENTHALPY SPECTRUM</span>
            </div>
          </Reveal>

          <TextReveal
            text="More Than Electricity."
            mode="line"
            as="h2"
            delay={0.1}
            className="font-editorial text-3xl sm:text-5xl md:text-6xl font-medium tracking-tight text-earth-forest mb-4 sm:mb-6"
          />

          <Reveal variant="fadeUp" delay={0.2}>
            <p className="text-xs sm:text-sm md:text-base text-earth-black/80 font-sans leading-relaxed max-w-3xl border-l-2 border-earth-forest/40 pl-4 sm:pl-6">
              From multi-megawatt high-temperature electrical generation to municipal district warmth and agricultural food production, geothermal energy serves diverse human needs across the entire thermal enthalpy spectrum.
            </p>
          </Reveal>
        </div>

        {/* ======================================================== */}
        {/* TWO-COLUMN IN-VIEW PHOTOGRAPHIC GRID                     */}
        {/* Staggered children with blur and scale reveal            */}
        {/* ======================================================== */}
        <InView
          variants={parentVariants}
          viewOptions={{
            once: true,
            margin: '0px 0px -120px 0px',
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
        >
          {APPLICATION_CARDS.map((card, idx) => {
            const isExpanded = expandedId === card.id;

            return (
              <motion.article
                key={card.id}
                variants={childVariants}
                className="bg-earth-ivory border border-earth-border flex flex-col justify-between group hover:border-earth-forest transition-colors duration-300 shadow-[0_10px_30px_rgba(16,37,28,0.04)]"
              >
                <div>
                  {/* Large Photographic Area with Operating Temp Badge */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-earth-stone/30 border-b border-earth-border">
                    <img
                      src={card.image}
                      alt={card.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover img-editorial-zoom filter saturate-[0.92] contrast-[1.03]"
                    />
                    
                    {/* Operating Temperature Pill */}
                    <div className="absolute top-3 left-3 bg-earth-forest/90 text-earth-ivory backdrop-blur-sm px-3 py-1 text-[9px] sm:text-[10px] font-mono tracking-widest border border-white/10 shadow-md">
                      <span>OPERATING ENTHALPY: {card.operatingTemp}</span>
                    </div>

                    {/* Category Label Overlay */}
                    <div className="absolute bottom-3 right-3 bg-earth-ivory/95 px-2.5 py-1 text-[9px] font-mono tracking-wider text-earth-forest border border-earth-border shadow-sm">
                      0{idx + 1} // APPLICATION
                    </div>
                  </div>

                  {/* Card Editorial Content */}
                  <div className="p-6 sm:p-8">
                    <span className="text-[10px] sm:text-[11px] font-mono tracking-widest text-earth-sage uppercase font-semibold block mb-2">
                      0{idx + 1} — {card.tag}
                    </span>

                    <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-earth-forest mb-3 leading-snug">
                      {card.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-earth-black/75 font-sans leading-relaxed mb-4">
                      {card.description}
                    </p>

                    {/* Expandable Technical Specification Panel */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0.05 : 0.35,
                            ease: MOTION_EASINGS.editorial,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="p-4 bg-earth-stone-light/80 border border-earth-border mb-4 text-xs text-earth-black/90 space-y-2.5 shadow-inner">
                            <span className="font-semibold block text-[10px] uppercase font-mono tracking-wider text-earth-forest">
                              TECHNICAL SPECIFICATIONS & CASE STUDIES:
                            </span>
                            <ul className="space-y-2 list-none">
                              {card.details.map((detail, dIdx) => (
                                <li key={dIdx} className="flex items-start space-x-2 text-[11px] sm:text-xs leading-relaxed text-earth-black/85">
                                  <ArrowUpRight className="w-3.5 h-3.5 text-earth-sage shrink-0 mt-0.5" />
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Card Expand/Collapse Footer Control */}
                <div className="px-6 sm:px-8 pb-6 sm:pb-8">
                  <button
                    onClick={() => toggleCard(card.id)}
                    aria-expanded={isExpanded}
                    className="w-full flex items-center justify-between py-2.5 text-xs font-semibold tracking-wider text-earth-forest hover:text-earth-black border-t border-earth-border/80 transition-colors focus:outline-none focus:ring-1 focus:ring-earth-sage"
                  >
                    <span className="uppercase text-[10px] font-mono tracking-widest">
                      {isExpanded ? 'COLLAPSE SPECIFICATIONS' : 'EXPAND TECHNICAL SPECIFICATIONS'}
                    </span>
                    <span className="p-1 rounded-full bg-earth-stone/30 group-hover:bg-earth-stone/60 transition-colors">
                      {isExpanded ? (
                        <Minus className="w-3.5 h-3.5 text-earth-forest" />
                      ) : (
                        <Plus className="w-3.5 h-3.5 text-earth-forest" />
                      )}
                    </span>
                  </button>
                </div>
              </motion.article>
            );
          })}
        </InView>
      </div>
    </section>
  );
};
