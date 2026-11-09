import React, { useState } from 'react';
import { Flame, Droplets, Cpu, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { PROCESS_STEPS, TECH_TYPES } from '../../data/content';

const iconMap = {
  Flame: Flame,
  Droplets: Droplets,
  Cpu: Cpu,
  Zap: Zap,
};

export const HowItWorksSection: React.FC = () => {
  const [activeTechIdx, setActiveTechIdx] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="how-it-works" className="bg-[#11110F] text-[#E8E6DF] py-14 sm:py-20 md:py-24 border-b border-[#232521] scroll-mt-24">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="max-w-3xl mb-12 sm:mb-14 md:mb-16">
          <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-earth-sage uppercase mb-2.5 sm:mb-3">
            <span>THERMODYNAMIC ENERGY CONVERSION</span>
          </div>
          <h2 className="font-editorial text-2xl sm:text-4xl lg:text-5xl font-medium tracking-tight text-white leading-[1.12] mb-4 sm:mb-5">
            How It Works: From Crust to Grid.
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#A3A199] font-sans leading-relaxed">
            Geothermal energy harnesses the natural heat of subterranean rock. While specific plants vary based on geological temperature and pressure, all systems follow a four-phase thermodynamic sequence.
          </p>
        </div>

        {/* 1. Visual Diagram Flow */}
        <div className="mb-14 sm:mb-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#232521] pb-3 mb-6 sm:mb-8 gap-2">
            <span className="text-[10px] font-mono tracking-widest uppercase text-[#8BAF91]">
              UNIVERSAL SYSTEM FLOW // DIAGRAM
            </span>
            <span className="text-[10px] font-mono text-[#74726B]">
              CLOSED-LOOP ARCHITECTURE
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {PROCESS_STEPS.map((step, idx) => {
              const IconComp = iconMap[step.icon];
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className="relative p-5 sm:p-6 lg:p-7 bg-[#171816] border border-[#2B2D29] flex flex-col justify-between hover:border-earth-sage transition-all duration-300 group"
                >
                  <div>
                    {/* Header: Step & Icon */}
                    <div className="flex items-center justify-between mb-4 sm:mb-5">
                      <span className="text-[10px] font-mono tracking-widest text-earth-sage uppercase">
                        {step.step}
                      </span>
                      <div className="p-2 sm:p-2.5 rounded-full bg-[#20221E] text-earth-sage group-hover:bg-earth-sage/15 transition-colors shrink-0">
                        <IconComp className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="font-editorial text-lg sm:text-xl font-medium text-white mb-2.5 sm:mb-3">
                      {step.title}
                    </h3>

                    <p className="text-xs text-[#BCB9AF] font-sans leading-relaxed mb-5 sm:mb-6">
                      {step.mechanism}
                    </p>
                  </div>

                  {/* Thermodynamic sub-label */}
                  <div className="pt-3 sm:pt-4 border-t border-[#2B2D29] text-[10px] font-mono text-[#8E8C83] leading-snug">
                    {step.thermodynamics}
                  </div>

                  {/* Flow arrow indicator for desktop between cards */}
                  {idx < PROCESS_STEPS.length - 1 && (
                    <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-[#40433C]">
                      <ArrowRight className="w-5 h-5 bg-[#11110F] p-0.5 rounded-full" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 2. Different Geothermal Technologies */}
        <div className="border-t border-[#232521] pt-12 sm:pt-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-10">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-earth-sage block mb-1.5 sm:mb-2">
                TECHNOLOGY SPECTRUM
              </span>
              <h3 className="font-editorial text-xl sm:text-2xl md:text-3xl font-medium text-white">
                Different Enthalpy, Different Systems
              </h3>
            </div>
            <p className="text-xs text-[#A3A199] font-sans max-w-md mt-2 md:mt-0 leading-relaxed">
              Geothermal resources span a broad temperature spectrum, dictating distinct mechanical cycles for optimal energy extraction.
            </p>
          </div>

          {/* Technology Selector Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 mb-6 sm:mb-8">
            {TECH_TYPES.map((tech, idx) => (
              <button
                key={tech.name}
                onClick={() => setActiveTechIdx(idx)}
                className={`text-left p-3 sm:p-4 border transition-all duration-300 min-w-0 ${
                  activeTechIdx === idx
                    ? 'bg-earth-forest border-earth-sage text-white'
                    : 'bg-[#181917] border-[#2B2D29] text-[#A3A199] hover:border-[#40433C]'
                }`}
              >
                <span className="block text-[9px] sm:text-[10px] font-mono tracking-widest uppercase text-earth-sage mb-0.5 sm:mb-1">
                  TYPE 0{idx + 1}
                </span>
                <span className="font-editorial text-sm sm:text-base md:text-lg block font-medium truncate">
                  {tech.name}
                </span>
                <span className="text-[10px] sm:text-[11px] font-mono text-[#D5D2C7] mt-0.5 sm:mt-1 block truncate">
                  {tech.temperature}
                </span>
              </button>
            ))}
          </div>

          {/* Active Technology Deep Dive Display */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTechIdx}
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: shouldReduceMotion ? 0 : -8 }}
              transition={{ duration: 0.25 }}
              className="p-5 sm:p-7 md:p-8 bg-[#181917] border border-[#2B2D29] grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 items-center"
            >
              <div className="md:col-span-7 space-y-3 sm:space-y-4">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-earth-sage">
                  <span className="px-2.5 py-0.5 bg-[#20221E] border border-earth-sage/30 uppercase tracking-widest text-[10px]">
                    ACTIVE ARCHITECTURE
                  </span>
                  <span className="text-xs">{TECH_TYPES[activeTechIdx].temperature}</span>
                </div>
                <h4 className="font-editorial text-xl sm:text-2xl md:text-3xl text-white font-medium">
                  {TECH_TYPES[activeTechIdx].name} Systems
                </h4>
                <p className="text-xs sm:text-sm text-[#CCCCCC] font-sans leading-relaxed">
                  {TECH_TYPES[activeTechIdx].process}
                </p>
              </div>

              <div className="md:col-span-5 bg-[#1F211D] p-4 sm:p-6 border border-[#30332C] space-y-3">
                <div className="flex items-start space-x-2.5">
                  <CheckCircle2 className="w-4 h-4 text-earth-sage shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#9E9D95] block">
                      Target Sector:
                    </span>
                    <span className="text-xs text-white font-sans font-medium">
                      {TECH_TYPES[activeTechIdx].application}
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-2.5 pt-2.5 sm:pt-3 border-t border-[#30332C]">
                  <CheckCircle2 className="w-4 h-4 text-earth-sage shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-[#9E9D95] block">
                      Thermodynamic Performance:
                    </span>
                    <span className="text-xs text-white font-sans font-medium">
                      {TECH_TYPES[activeTechIdx].efficiency}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
