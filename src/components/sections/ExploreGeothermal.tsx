import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { APPLICATION_CARDS } from '../../data/content';
import { TextReveal } from '../motion/TextReveal';
import { Reveal } from '../motion/Reveal';
import { ImageReveal } from '../motion/ImageReveal';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../lib/motionTokens';

export const ExploreGeothermal: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const shouldReduceMotion = useReducedMotionPreference();

  const toggleDetail = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const electricityApp = APPLICATION_CARDS.find((c) => c.id === 'electricity') || APPLICATION_CARDS[0];
  const districtApp = APPLICATION_CARDS.find((c) => c.id === 'district-heating') || APPLICATION_CARDS[2];
  const agricultureApp = APPLICATION_CARDS.find((c) => c.id === 'industrial-agri') || APPLICATION_CARDS[3];
  const residentialApp = APPLICATION_CARDS.find((c) => c.id === 'residential') || APPLICATION_CARDS[1];

  return (
    <section 
      id="applications" 
      className="bg-earth-ivory py-16 sm:py-24 md:py-32 border-b border-earth-border scroll-mt-24"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* ======================================================== */}
        {/* 1. EDITORIAL SECTION HEADER                              */}
        {/* ======================================================== */}
        <div className="max-w-4xl mb-14 sm:mb-20 md:mb-24">
          <Reveal variant="fadeUp" delay={0.05}>
            <div className="flex items-center space-x-2 text-[10px] sm:text-[11px] font-semibold tracking-[0.24em] sm:tracking-[0.28em] text-earth-forest uppercase mb-3 sm:mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
              <span>DIVERSE THERMAL APPLICATIONS · FULL ENTHALPY SPECTRUM</span>
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
              From multi-megawatt high-temperature electrical generation to municipal district warmth, agricultural greenhouses, and residential geo-exchange, geothermal energy serves society across every tier of the thermal enthalpy spectrum.
            </p>
          </Reveal>
        </div>

        {/* ======================================================== */}
        {/* 2. PRIMARY APPLICATION: ELECTRICITY GENERATION           */}
        {/* Dominant asymmetric hero split layout                    */}
        {/* ======================================================== */}
        <div className="border-t border-earth-border pt-10 sm:pt-14 pb-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">
            {/* Left: Large Editorial Image */}
            <div className="lg:col-span-7">
              <div className="relative group overflow-hidden bg-earth-stone/30 border border-earth-border">
                <ImageReveal
                  src={electricityApp.image}
                  alt={electricityApp.imageAlt}
                  aspectRatio="aspect-[16/10]"
                  duration={MOTION_DURATIONS.image}
                />
                <div className="p-3 sm:p-4 bg-earth-ivory border-t border-earth-border flex items-center justify-between text-xs text-earth-muted">
                  <span className="font-sans text-[11px] sm:text-xs truncate mr-2">
                    High-Pressure Steam Turbine Hall · Multi-Stage Expansion
                  </span>
                  <span className="font-mono text-[9px] sm:text-[10px] tracking-wider text-earth-forest shrink-0 font-medium">
                    ENTHALPY: {electricityApp.operatingTemp}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Narrative */}
            <div className="lg:col-span-5 space-y-4 sm:space-y-5">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-earth-sage uppercase font-semibold">
                <span>01</span>
                <span className="text-earth-border">·</span>
                <span>{electricityApp.tag}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl md:text-4xl font-medium text-earth-forest leading-tight">
                {electricityApp.title}
              </h3>

              <p className="text-xs sm:text-sm text-earth-black/80 font-sans leading-relaxed">
                {electricityApp.description}
              </p>

              <div className="border-t border-b border-earth-border/80 py-3 space-y-2 text-xs font-mono text-earth-black/75">
                <div className="flex justify-between items-center">
                  <span className="text-earth-muted uppercase text-[10px]">Operating Range</span>
                  <span className="font-semibold text-earth-forest">{electricityApp.operatingTemp}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-earth-muted uppercase text-[10px]">Thermodynamic Cycle</span>
                  <span className="font-semibold text-earth-forest">Flash & Organic Rankine</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toggleDetail(electricityApp.id)}
                  aria-expanded={expandedId === electricityApp.id}
                  aria-controls={`app-spec-${electricityApp.id}`}
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-earth-forest hover:text-earth-black transition-colors font-semibold"
                >
                  <span>{expandedId === electricityApp.id ? 'Hide Specifications' : 'View Specifications'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${expandedId === electricityApp.id ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedId === electricityApp.id && (
                    <motion.div
                      id={`app-spec-${electricityApp.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.05 : 0.3, ease: MOTION_EASINGS.editorial }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-earth-border/60">
                        <ul className="space-y-2 text-xs text-earth-black/75 font-sans">
                          {electricityApp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start space-x-2">
                              <span className="text-earth-sage font-bold">·</span>
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
          </div>
        </div>

        {/* ======================================================== */}
        {/* 3. ASYMMETRIC PAIR: DISTRICT HEATING & AGRICULTURE       */}
        {/* Varied editorial split layout without repetitive cards    */}
        {/* ======================================================== */}
        <div className="border-t border-earth-border pt-12 sm:pt-16 pb-14 sm:pb-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            
            {/* Left: District Heating (7 cols) */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-earth-sage uppercase font-semibold">
                <span>02</span>
                <span className="text-earth-border">·</span>
                <span>{districtApp.tag}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-earth-forest leading-tight">
                {districtApp.title}
              </h3>

              <p className="text-xs sm:text-sm text-earth-black/80 font-sans leading-relaxed">
                {districtApp.description}
              </p>

              <div className="relative group overflow-hidden bg-earth-stone/30 border border-earth-border my-4">
                <ImageReveal
                  src={districtApp.image}
                  alt={districtApp.imageAlt}
                  aspectRatio="aspect-[16/9]"
                  duration={MOTION_DURATIONS.image}
                />
                <div className="p-3 bg-earth-ivory border-t border-earth-border flex items-center justify-between text-xs text-earth-muted">
                  <span className="font-sans text-[11px] truncate mr-2">Municipal Subsurface Pipeline Network</span>
                  <span className="font-mono text-[9px] tracking-wider text-earth-forest shrink-0 font-medium">{districtApp.operatingTemp}</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toggleDetail(districtApp.id)}
                  aria-expanded={expandedId === districtApp.id}
                  aria-controls={`app-spec-${districtApp.id}`}
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-earth-forest hover:text-earth-black transition-colors font-semibold"
                >
                  <span>{expandedId === districtApp.id ? 'Hide Case Studies' : 'View Case Studies'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${expandedId === districtApp.id ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedId === districtApp.id && (
                    <motion.div
                      id={`app-spec-${districtApp.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.05 : 0.3, ease: MOTION_EASINGS.editorial }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-earth-border/60">
                        <ul className="space-y-2 text-xs text-earth-black/75 font-sans">
                          {districtApp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start space-x-2">
                              <span className="text-earth-sage font-bold">·</span>
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

            {/* Right: Industry & Agriculture (5 cols) */}
            <div className="lg:col-span-5 space-y-5 lg:border-l lg:border-earth-border lg:pl-10">
              <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-earth-sage uppercase font-semibold">
                <span>03</span>
                <span className="text-earth-border">·</span>
                <span>{agricultureApp.tag}</span>
              </div>

              <h3 className="font-editorial text-2xl sm:text-3xl font-medium text-earth-forest leading-tight">
                {agricultureApp.title}
              </h3>

              <p className="text-xs sm:text-sm text-earth-black/80 font-sans leading-relaxed">
                {agricultureApp.description}
              </p>

              <div className="relative group overflow-hidden bg-earth-stone/30 border border-earth-border my-4">
                <ImageReveal
                  src={agricultureApp.image}
                  alt={agricultureApp.imageAlt}
                  aspectRatio="aspect-[4/3]"
                  duration={MOTION_DURATIONS.image}
                />
                <div className="p-3 bg-earth-ivory border-t border-earth-border flex items-center justify-between text-xs text-earth-muted">
                  <span className="font-sans text-[11px] truncate mr-2">Geothermal Agronomic Greenhouse</span>
                  <span className="font-mono text-[9px] tracking-wider text-earth-forest shrink-0 font-medium">{agricultureApp.operatingTemp}</span>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  onClick={() => toggleDetail(agricultureApp.id)}
                  aria-expanded={expandedId === agricultureApp.id}
                  aria-controls={`app-spec-${agricultureApp.id}`}
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-earth-forest hover:text-earth-black transition-colors font-semibold"
                >
                  <span>{expandedId === agricultureApp.id ? 'Hide Applications' : 'View Mineral & Food Data'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${expandedId === agricultureApp.id ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedId === agricultureApp.id && (
                    <motion.div
                      id={`app-spec-${agricultureApp.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.05 : 0.3, ease: MOTION_EASINGS.editorial }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-earth-border/60">
                        <ul className="space-y-2 text-xs text-earth-black/75 font-sans">
                          {agricultureApp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start space-x-2">
                              <span className="text-earth-sage font-bold">·</span>
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

          </div>
        </div>

        {/* ======================================================== */}
        {/* 4. SHALLOW ENTHALPY HORIZONTAL BAND: GEO-EXCHANGE        */}
        {/* Open horizontal editorial timeline band                  */}
        {/* ======================================================== */}
        <div className="border-t border-earth-border pt-12 sm:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-earth-stone/15 border border-earth-border p-6 sm:p-10 lg:p-12">
            
            {/* Left Stat Callout */}
            <div className="lg:col-span-3 space-y-2">
              <span className="font-mono text-[10px] tracking-widest uppercase text-earth-muted block">
                04 · {residentialApp.tag}
              </span>
              <div className="font-editorial text-4xl sm:text-5xl text-earth-forest font-normal leading-none">
                300–500%
              </div>
              <span className="font-mono text-[10px] tracking-wider text-earth-sage uppercase font-semibold block">
                COEFFICIENT OF PERFORMANCE (COP)
              </span>
            </div>

            {/* Middle Narrative */}
            <div className="lg:col-span-5 space-y-3">
              <h3 className="font-editorial text-xl sm:text-2xl font-medium text-earth-forest">
                {residentialApp.title}
              </h3>
              <p className="text-xs sm:text-sm text-earth-black/80 font-sans leading-relaxed">
                {residentialApp.description}
              </p>
              <div className="pt-1">
                <button
                  type="button"
                  onClick={() => toggleDetail(residentialApp.id)}
                  aria-expanded={expandedId === residentialApp.id}
                  aria-controls={`app-spec-${residentialApp.id}`}
                  className="inline-flex items-center space-x-2 text-xs font-mono tracking-wider uppercase text-earth-forest hover:text-earth-black transition-colors font-semibold"
                >
                  <span>{expandedId === residentialApp.id ? 'Hide Details' : 'Read COP & Seasonal Mechanism'}</span>
                  <ChevronDown className={`w-3.5 h-3.5 transform transition-transform ${expandedId === residentialApp.id ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {expandedId === residentialApp.id && (
                    <motion.div
                      id={`app-spec-${residentialApp.id}`}
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: shouldReduceMotion ? 0.05 : 0.3, ease: MOTION_EASINGS.editorial }}
                      className="overflow-hidden"
                    >
                      <div className="mt-3 pt-3 border-t border-earth-border/60">
                        <ul className="space-y-1.5 text-xs text-earth-black/75 font-sans">
                          {residentialApp.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start space-x-2">
                              <span className="text-earth-sage font-bold">·</span>
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

            {/* Right Compact Architectural Image */}
            <div className="lg:col-span-4">
              <div className="relative group overflow-hidden bg-earth-stone/30 border border-earth-border">
                <ImageReveal
                  src={residentialApp.image}
                  alt={residentialApp.imageAlt}
                  aspectRatio="aspect-[16/10]"
                  duration={MOTION_DURATIONS.image}
                />
                <div className="p-2.5 bg-earth-ivory border-t border-earth-border flex items-center justify-between text-[11px] text-earth-muted">
                  <span className="truncate mr-2">Geo-Exchange Architectural Cooling</span>
                  <span className="font-mono text-[9px] text-earth-forest shrink-0 font-medium">{residentialApp.operatingTemp}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};