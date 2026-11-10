import React from 'react';
import { Compass, Flame, HelpCircle, BarChart3, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

interface ObservatoryFeatureBannerProps {
  onOpenObservatory: () => void;
}

export const ObservatoryFeatureBanner: React.FC<ObservatoryFeatureBannerProps> = ({
  onOpenObservatory,
}) => {
  const shouldReduceMotion = useReducedMotionPreference();

  return (
    <section className="w-full bg-[#0E1310] text-[#F3F0E6] py-16 sm:py-20 px-4 sm:px-6 lg:px-12 border-y border-[#1E2621] relative select-none">
      <div className="max-w-[1400px] mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 lg:gap-12">
          {/* Left Editorial Copy */}
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center space-x-2 text-[10px] font-mono tracking-widest text-earth-sage uppercase font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
              <span>INTERACTIVE OBSERVATORY · 4 MODES</span>
            </div>

            <h2 className="font-editorial text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-white leading-tight">
              Subsurface Observatory
            </h2>

            <p className="font-sans text-sm sm:text-base text-[#B2C2B8] leading-relaxed">
              Explore Earth’s subterranean energy system in a dedicated single-screen simulator. Manipulate downhole fluid temperatures, examine closed-loop production wells, challenge public perceptions with peer-reviewed science, and benchmark lifecycle carbon intensity head-to-head.
            </p>

            {/* Feature Capability List */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
              {[
                { icon: Compass, label: '01 Strata & Wells' },
                { icon: Flame, label: '02 Temperature Enthalpy' },
                { icon: HelpCircle, label: '03 Myth vs. Reality' },
                { icon: BarChart3, label: '04 Clean Energy LCA' },
              ].map((badge) => {
                const Icon = badge.icon;
                return (
                  <div
                    key={badge.label}
                    className="flex items-center space-x-2 py-1 text-[11px] font-mono text-[#C8D6CD] border-b border-[#233027]"
                  >
                    <Icon className="w-3.5 h-3.5 text-earth-sage shrink-0" />
                    <span className="truncate">{badge.label}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Action Button & Teaser */}
          <div className="shrink-0 flex flex-col items-start lg:items-end space-y-3 w-full lg:w-auto">
            <motion.button
              whileHover={{ scale: shouldReduceMotion ? 1 : 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onOpenObservatory}
              className="w-full sm:w-auto px-7 sm:px-9 py-4 bg-earth-forest border border-earth-sage/60 hover:bg-earth-sage hover:text-earth-black text-earth-ivory text-xs sm:text-sm font-mono tracking-widest uppercase font-semibold rounded-full transition-all duration-300 shadow-xl flex items-center justify-center space-x-3 group"
            >
              <Compass className="w-4 h-4 text-earth-sage group-hover:text-earth-black transition-colors" />
              <span>LAUNCH OBSERVATORY</span>
              <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
            </motion.button>

            <span className="font-mono text-[10px] text-[#788A80] tracking-wider uppercase">
              Single-Viewport · 4 Interactive Modes · Touch Ready
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};
