import React from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_EASINGS } from '../../lib/motionTokens';

export const BottomInformationComposition: React.FC = () => {
  const shouldReduceMotion = useReducedMotionPreference();

  const handleScrollClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full relative z-20 px-5 sm:px-8 lg:px-12 pb-6 sm:pb-8 pt-4">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-end">
        
        {/* ======================================================== */}
        {/* 7. BOTTOM LEFT INFORMATION PANEL (Earthy Brown / Stone)   */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.45, ease: MOTION_EASINGS.editorial }}
          className="lg:col-span-5 bg-[#3B3028]/95 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white border border-white/15 shadow-[0_15px_40px_rgba(0,0,0,0.25)] flex items-start space-x-4 max-w-lg"
        >
          {/* Small Realistic Geological Cross-Section Visual (Material-sample style) */}
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-white/20 shrink-0 shadow-inner flex flex-col justify-between bg-gradient-to-b from-[#6B5A4D] via-[#4A3D33] to-[#A84A28] p-1">
            <div className="h-2 bg-[#8C7A6B] rounded-xs opacity-90" />
            <div className="h-2.5 bg-[#54463A] rounded-xs opacity-85" />
            <div className="h-3.5 bg-[#C85A32] rounded-xs flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-pulse" />
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-editorial text-lg sm:text-xl font-medium tracking-tight text-white leading-snug">
              Energy begins beneath us.
            </h4>
            <p className="text-xs text-[#D8D2C5] font-sans leading-relaxed">
              Heat stored deep within Earth's geological formations offers another path to reliable energy.
            </p>
          </div>
        </motion.div>

        {/* ======================================================== */}
        {/* 8. BOTTOM CENTER INDICATOR ("24/7" / "ENERGY POTENTIAL")  */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.55, ease: MOTION_EASINGS.editorial }}
          className="lg:col-span-3 flex flex-col justify-end pb-1"
        >
          <div className="font-editorial text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight text-white leading-none mb-1">
            24/7
          </div>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-[0.25em] uppercase text-earth-sage font-semibold">
            ENERGY POTENTIAL
          </span>
        </motion.div>

        {/* ======================================================== */}
        {/* 9. BOTTOM RIGHT STATEMENT (Large White Sans-Serif Block)  */}
        {/* ======================================================== */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.65, ease: MOTION_EASINGS.editorial }}
          className="lg:col-span-4 flex flex-col justify-end space-y-2 text-left lg:text-right pb-1"
        >
          <h4 className="font-sans font-bold tracking-tight text-white text-lg sm:text-xl lg:text-2xl leading-snug uppercase">
            POWERING THE FUTURE<br />
            FROM BENEATH<br />
            THE SURFACE.
          </h4>

          <div>
            <a
              href="#origins"
              onClick={(e) => handleScrollClick(e, '#origins')}
              className="inline-flex items-center space-x-1.5 text-xs font-mono tracking-widest uppercase text-earth-sage hover:text-white transition-colors group"
            >
              <span>LEARN MORE</span>
              <ArrowUpRight className="w-3.5 h-3.5 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};
