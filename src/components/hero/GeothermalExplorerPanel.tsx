import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_EASINGS } from '../../lib/motionTokens';

export const GeothermalExplorerPanel: React.FC = () => {
  const [activePill, setActivePill] = useState<'SUBSURFACE' | 'ENERGY' | 'SYSTEM'>('ENERGY');
  const shouldReduceMotion = useReducedMotionPreference();

  const pills: Array<'SUBSURFACE' | 'ENERGY' | 'SYSTEM'> = ['SUBSURFACE', 'ENERGY', 'SYSTEM'];

  return (
    <motion.aside
      initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 30, scale: shouldReduceMotion ? 1 : 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.75, delay: 0.35, ease: MOTION_EASINGS.editorial }}
      className="relative w-full max-w-[340px] sm:max-w-[370px] bg-[#FCFAF7]/95 backdrop-blur-md rounded-[26px] p-5 sm:p-6 shadow-[0_20px_50px_rgba(16,37,28,0.18)] border border-white/90 text-earth-black flex flex-col justify-between"
      aria-label="Floating Information Panel"
    >
      <div>
        {/* Top: Three Category Pills */}
        <div className="flex items-center space-x-1.5 mb-4 sm:mb-5">
          {pills.map((pill) => {
            const isActive = activePill === pill;
            return (
              <button
                key={pill}
                type="button"
                onClick={() => setActivePill(pill)}
                className={`px-3 py-1 text-[9px] font-mono tracking-widest uppercase rounded-full transition-all duration-200 ${
                  isActive
                    ? 'bg-earth-forest text-earth-ivory font-semibold shadow-sm'
                    : 'bg-earth-stone/25 text-earth-black/70 hover:text-earth-black hover:bg-earth-stone/40'
                }`}
              >
                {pill}
              </button>
            );
          })}
        </div>

        {/* Main Heading */}
        <h3 className="font-editorial text-xl sm:text-2xl font-medium tracking-tight text-earth-forest leading-snug mb-2">
          Earth's Heat. Intelligent Energy.
        </h3>

        {/* Supporting Description */}
        <p className="text-xs text-earth-black/75 font-sans leading-relaxed mb-4">
          Discover how geothermal systems transform underground thermal energy into useful power.
        </p>

        {/* Technical Preview Thumbnail & Circular Control */}
        <div className="relative rounded-2xl overflow-hidden bg-[#101915] border border-[#23352B] p-3 flex items-center justify-between group">
          {/* Miniature Geological & System Graphic */}
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-b from-[#182B21] via-[#2A4335] to-[#B33919] p-1 flex flex-col justify-between overflow-hidden shadow-inner border border-white/10 shrink-0">
              {/* Rock strata bands */}
              <div className="h-1.5 bg-[#466052] rounded-xs opacity-75" />
              <div className="h-2 bg-[#2D4638] rounded-xs opacity-80" />
              <div className="h-3 bg-[#E06A3B] rounded-xs flex items-center justify-center">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
              </div>
            </div>

            <div className="space-y-0.5 text-left">
              <span className="font-mono text-[9px] tracking-wider text-earth-sage uppercase block font-semibold">
                CROSS-SECTION // 01
              </span>
              <span className="text-xs font-editorial text-white font-medium block">
                Hydrothermal Reservoir
              </span>
              <span className="text-[10px] font-mono text-[#A3A199] block">
                250°C · 2.4 KM DEPTH
              </span>
            </div>
          </div>

          {/* Small Circular Visual Control */}
          <a
            href="#how-it-works"
            className="w-8 h-8 rounded-full bg-white text-earth-forest flex items-center justify-center hover:bg-earth-sage hover:text-white transition-all shadow-md group-hover:scale-105 shrink-0"
            aria-label="Explore geothermal systems"
          >
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Decorative Thin Subtle Line extending toward the main visual */}
      <div 
        aria-hidden="true" 
        className="hidden xl:block absolute -left-12 top-1/2 w-12 h-[1px] bg-gradient-to-l from-white/80 to-transparent pointer-events-none" 
      />
    </motion.aside>
  );
};
