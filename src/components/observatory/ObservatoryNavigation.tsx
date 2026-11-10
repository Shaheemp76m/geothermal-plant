import React from 'react';
import { motion } from 'motion/react';
import { Compass, Flame, HelpCircle, BarChart3 } from 'lucide-react';
import { ObservatoryMode } from '../../data/observatoryData';

interface ObservatoryNavigationProps {
  activeMode: ObservatoryMode;
  onSelectMode: (mode: ObservatoryMode) => void;
  variant?: 'desktop' | 'mobile';
  shouldReduceMotion?: boolean;
}

interface ModeItem {
  id: ObservatoryMode;
  index: string;
  name: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

export const MODES: ModeItem[] = [
  {
    id: 'underground',
    index: '01',
    name: 'Underground',
    subtitle: 'Strata & Wells',
    icon: Compass,
  },
  {
    id: 'temperature',
    index: '02',
    name: 'Temperature',
    subtitle: 'Enthalpy Spectrum',
    icon: Flame,
  },
  {
    id: 'myths',
    index: '03',
    name: 'Myth or Reality',
    subtitle: 'Scientific Hypotheses',
    icon: HelpCircle,
  },
  {
    id: 'comparison',
    index: '04',
    name: 'Comparison',
    subtitle: 'Clean Energy LCA',
    icon: BarChart3,
  },
];

export const ObservatoryNavigation: React.FC<ObservatoryNavigationProps> = ({
  activeMode,
  onSelectMode,
  variant = 'desktop',
  shouldReduceMotion = false,
}) => {
  if (variant === 'mobile') {
    return (
      <nav
        aria-label="Subsurface Observatory Mobile Navigation"
        className="w-full bg-[#0E1310]/95 backdrop-blur-md border-t border-[#1F2722] px-2 py-1.5 flex items-center justify-around z-40 select-none pb-[calc(0.375rem+env(safe-area-inset-bottom,0px))]"
      >
        {MODES.map((mode) => {
          const isActive = activeMode === mode.id;
          const Icon = mode.icon;
          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`flex-1 flex flex-col items-center justify-center py-1 px-1 rounded-md transition-all relative ${
                isActive ? 'text-white' : 'text-[#7B8B82] hover:text-[#B2C2B8]'
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId={shouldReduceMotion ? undefined : 'activeNavPillMobile'}
                  className="absolute inset-0 bg-[#16221B] border border-earth-sage/40 rounded-md -z-10"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <div className="flex items-center space-x-1">
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-earth-sage' : 'text-[#6C7C73]'}`} />
                <span className="font-mono text-[9px] tracking-wider font-semibold">
                  {mode.index}
                </span>
              </div>
              <span className="font-mono text-[9px] tracking-tight uppercase truncate max-w-[70px] mt-0.5">
                {mode.name.split(' ')[0]}
              </span>
            </button>
          );
        })}
      </nav>
    );
  }

  // Desktop Left Sidebar Navigation
  return (
    <nav
      aria-label="Subsurface Observatory Navigation"
      className="flex flex-col space-y-1.5 w-full select-none"
    >
      <div className="flex items-center justify-between pb-1 px-1">
        <span className="font-mono text-[9px] tracking-widest uppercase text-[#73847A]">
          INTERACTIVE MODES
        </span>
        <span className="font-mono text-[8px] text-earth-sage/80 bg-earth-forest/50 px-1.5 py-0.5 rounded border border-earth-sage/20">
          4 LIVE
        </span>
      </div>

      {MODES.map((mode) => {
        const isActive = activeMode === mode.id;
        const Icon = mode.icon;
        return (
          <button
            key={mode.id}
            onClick={() => onSelectMode(mode.id)}
            className={`group relative text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between ${
              isActive
                ? 'bg-[#15211A] border-earth-sage/60 text-white shadow-sm'
                : 'bg-[#121614] border-[#1F2722] text-[#86958C] hover:bg-[#161B18] hover:text-[#CBD8CE] hover:border-[#2C3830]'
            }`}
          >
            {isActive && (
              <motion.div
                layoutId={shouldReduceMotion ? undefined : 'activeNavBorderDesktop'}
                className="absolute left-0 top-0 bottom-0 w-1 bg-earth-sage rounded-l-lg"
                transition={{ type: 'spring', stiffness: 350, damping: 30 }}
              />
            )}

            <div className="flex items-center space-x-2.5 min-w-0">
              <div
                className={`p-1.5 rounded-md transition-colors ${
                  isActive ? 'bg-earth-forest text-earth-sage' : 'bg-[#19201C] text-[#697970] group-hover:text-white'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center space-x-1.5">
                  <span className="font-mono text-[9px] text-earth-sage/90 font-bold tracking-wider">
                    {mode.index}
                  </span>
                  <span className="font-editorial text-sm font-medium tracking-tight text-white truncate">
                    {mode.name}
                  </span>
                </div>
                <p className="font-mono text-[9px] text-[#718278] truncate">
                  {mode.subtitle}
                </p>
              </div>
            </div>

            <div className="shrink-0 pl-1">
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  isActive ? 'bg-earth-sage shadow-[0_0_8px_#8BAF91]' : 'bg-[#29342E]'
                }`}
              />
            </div>
          </button>
        );
      })}
    </nav>
  );
};
