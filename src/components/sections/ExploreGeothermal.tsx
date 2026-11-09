import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APPLICATION_CARDS } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { ImageReveal } from '../motion/ImageReveal';
import { StaggerGroup, StaggerItem } from '../motion/StaggerGroup';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../lib/motionTokens';

export const ExploreGeothermal: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotionPreference();

  const toggleCard = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="applications" className="bg-earth-ivory py-14 sm:py-20 md:py-24 border-b border-earth-border scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14 md:mb-16">
          <Reveal variant="fadeUp" delay={0.05}>
            <span className="text-[10px] tracking-[0.24em] sm:tracking-[0.28em] font-semibold text-earth-forest uppercase block mb-2 sm:mb-3">
              DIVERSE THERMAL APPLICATIONS
            </span>
          </Reveal>

          <TextReveal
            text="More Than Electricity."
            mode="line"
            as="h2"
            delay={0.1}
            className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-earth-forest mb-3 sm:mb-4"
          />

          <Reveal variant="fadeUp" delay={0.2}>
            <p className="text-xs sm:text-sm md:text-base text-earth-black/75 font-sans leading-relaxed">
              From multi-megawatt high-temperature electrical generation to municipal district warmth and agricultural food production, geothermal energy serves diverse human needs across the entire thermal enthalpy spectrum.
            </p>
          </Reveal>
        </div>

        {/* 4 Editorial Cards with StaggerGroup */}
        <StaggerGroup className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {APPLICATION_CARDS.map((card, idx) => {
            const isExpanded = expandedId === card.id;
            return (
              <StaggerItem
                key={card.id}
                className="bg-earth-ivory border border-earth-border flex flex-col justify-between group hover:border-earth-forest transition-all duration-300"
              >
                <div>
                  {/* Image with ImageReveal */}
                  <div className="relative border-b border-earth-border overflow-hidden bg-earth-stone/30">
                    <ImageReveal
                      src={card.image}
                      alt={card.imageAlt}
                      aspectRatio="aspect-[4/3]"
                      duration={MOTION_DURATIONS.standard}
                    />
                    <div className="absolute top-2.5 sm:top-3 left-2.5 sm:left-3 bg-earth-ivory/95 px-2 sm:px-2.5 py-0.5 sm:py-1 text-[8px] sm:text-[9px] font-mono tracking-widest text-earth-forest border border-earth-border z-10">
                      {card.operatingTemp}
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-4 sm:p-6 md:p-7">
                    <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-earth-sage uppercase block mb-1.5 sm:mb-2">
                      0{idx + 1} / {card.tag}
                    </span>
                    <h3 className="font-editorial text-lg sm:text-xl font-medium text-earth-forest mb-2 sm:mb-3">
                      {card.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-earth-black/75 font-sans leading-relaxed mb-3 sm:mb-4">
                      {card.description}
                    </p>

                    {/* Expandable Technical Detail */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: shouldReduceMotion ? 0.05 : MOTION_DURATIONS.quick,
                            ease: MOTION_EASINGS.editorial,
                          }}
                          className="overflow-hidden"
                        >
                          <div className="p-3 bg-earth-stone-light/70 border border-earth-border mb-3 text-xs text-earth-black/85 space-y-2">
                            <span className="font-semibold block text-[10px] uppercase font-mono tracking-wider text-earth-forest">
                              Operational Context:
                            </span>
                            <ul className="space-y-1.5 list-disc list-inside">
                              {card.details.map((detail, dIdx) => (
                                <li key={dIdx} className="leading-relaxed">{detail}</li>
                              ))}
                            </ul>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Card Toggle Footer */}
                <div className="px-4 sm:px-6 md:px-7 pb-4 sm:pb-6 md:pb-7">
                  <button
                    onClick={() => toggleCard(card.id)}
                    className="w-full flex items-center justify-between py-2 text-xs font-semibold tracking-wider text-earth-forest hover:text-earth-black border-t border-earth-border/80 transition-colors"
                  >
                    <span className="uppercase text-[10px] font-mono">
                      {isExpanded ? 'LESS DETAIL' : 'TECHNICAL SPECS'}
                    </span>
                    {isExpanded ? (
                      <Minus className="w-3.5 h-3.5" />
                    ) : (
                      <Plus className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
};
