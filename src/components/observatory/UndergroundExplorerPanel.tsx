import React from 'react';
import { motion } from 'motion/react';
import { Layers, Activity } from 'lucide-react';
import { GEOLOGICAL_FEATURES } from '../../data/observatoryData';

interface UndergroundExplorerPanelProps {
  selectedFeatureId: string;
  onSelectFeature: (id: string) => void;
  shouldReduceMotion: boolean;
}

export const UndergroundExplorerPanel: React.FC<UndergroundExplorerPanelProps> = ({
  selectedFeatureId,
  onSelectFeature,
  shouldReduceMotion,
}) => {
  const activeFeature =
    GEOLOGICAL_FEATURES.find((f) => f.id === selectedFeatureId) || GEOLOGICAL_FEATURES[0];

  return (
    <div className="flex flex-col h-full overflow-hidden space-y-3.5">
      {/* Panel Sub-Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#202521] shrink-0">
        <div className="flex items-center space-x-2">
          <Layers className="w-3.5 h-3.5 text-earth-sage" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-earth-sage font-semibold">
            TECHNICAL SPECIFICATIONS
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#707E75]">
          STRATIGRAPHIC PROFILE
        </span>
      </div>

      {/* Quick Component Selector Strip */}
      <div className="shrink-0 flex space-x-1.5 overflow-x-auto scrollbar-none pb-1">
        {GEOLOGICAL_FEATURES.map((feat, idx) => {
          const isSelected = feat.id === selectedFeatureId;
          const shortName =
            feat.id === 'surface-plant'
              ? 'Plant'
              : feat.id === 'sedimentary-overburden'
              ? 'Overburden'
              : feat.id === 'impermeable-caprock'
              ? 'Caprock'
              : feat.id === 'injection-well'
              ? 'Injection'
              : feat.id === 'production-well'
              ? 'Production'
              : feat.id === 'hydrothermal-reservoir'
              ? 'Reservoir'
              : feat.id === 'crystalline-basement'
              ? 'Basement'
              : 'Heat Source';

          return (
            <button
              key={feat.id}
              onClick={() => onSelectFeature(feat.id)}
              className={`px-2 py-1 rounded text-[10px] font-mono tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-[#15231B] text-[#F0EEE3] border-earth-sage font-bold'
                  : 'bg-[#111714] text-[#86958C] border-[#1F2722] hover:text-[#F0EEE3] hover:border-[#2F3D34]'
              }`}
            >
              0{idx + 1} · {shortName}
            </button>
          );
        })}
      </div>

      {/* Active Component Deep Dive Card */}
      <motion.div
        key={activeFeature.id}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-none space-y-3 pr-1"
      >
        {/* Category & Depth Header */}
        <div>
          <div className="flex items-center justify-between text-[9px] font-mono text-earth-sage mb-1">
            <span className="px-2 py-0.5 bg-[#17241C] border border-earth-sage/30 rounded uppercase font-semibold">
              {activeFeature.category}
            </span>
            <span className="text-[#A2B3A8]">{activeFeature.depth}</span>
          </div>
          <h4 className="font-editorial text-lg sm:text-xl font-medium text-white leading-tight">
            {activeFeature.name}
          </h4>
          <p className="font-mono text-[10px] text-earth-sage mt-0.5">
            TEMPERATURE: {activeFeature.temperature}
          </p>
        </div>

        {/* Narrative Description */}
        <p className="font-sans text-xs text-[#C8D1CA] leading-relaxed border-l-2 border-earth-sage/50 pl-2.5">
          {activeFeature.description}
        </p>

        {/* Physics Detail */}
        <div className="p-2.5 bg-[#151C18] border border-[#233027] rounded text-[11px] text-[#A6B5AC] font-sans leading-relaxed">
          <div className="flex items-center space-x-1.5 text-earth-sage font-mono text-[9px] uppercase tracking-wider mb-1 font-semibold">
            <Activity className="w-3 h-3 text-earth-sage" />
            <span>THERMODYNAMIC EQUILIBRIUM</span>
          </div>
          {activeFeature.physicsDetail}
        </div>

        {/* Technical Specs Grid */}
        <div className="space-y-1.5 pt-1">
          <span className="font-mono text-[9px] text-[#6E8075] uppercase tracking-widest block">
            MEASURED PARAMETERS
          </span>
          <div className="grid grid-cols-1 gap-1.5">
            {activeFeature.specs.map((spec, sIdx) => (
              <div
                key={sIdx}
                className="p-2 bg-[#121614] border border-[#1F2722] rounded flex items-center justify-between text-xs"
              >
                <span className="font-mono text-[9px] text-[#7A8C81] uppercase tracking-wider">
                  {spec.label}
                </span>
                <span className="font-sans text-[11px] text-white font-medium text-right pl-2 truncate">
                  {spec.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};
