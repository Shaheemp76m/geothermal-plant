import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Scale } from 'lucide-react';
import { ENERGY_COMPARISONS } from '../../data/observatoryData';

interface EnergyComparisonPanelProps {
  shouldReduceMotion: boolean;
}

export const EnergyComparisonPanel: React.FC<EnergyComparisonPanelProps> = ({
  shouldReduceMotion,
}) => {
  const [selectedTargetId, setSelectedTargetId] = useState<string>('solar-pv');

  const geothermal = ENERGY_COMPARISONS.find((e) => e.id === 'geothermal')!;
  const target =
    ENERGY_COMPARISONS.find((e) => e.id === selectedTargetId) || ENERGY_COMPARISONS[1];

  const candidateSources = ENERGY_COMPARISONS.filter((e) => e.id !== 'geothermal');

  return (
    <div className="flex flex-col h-full overflow-hidden space-y-3">
      {/* Panel Sub-Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#202521] shrink-0">
        <div className="flex items-center space-x-2">
          <Scale className="w-3.5 h-3.5 text-earth-sage" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-earth-sage font-semibold">
            HEAD-TO-HEAD ENERGY COMPARISON
          </span>
        </div>
        <span className="font-mono text-[9px] text-[#7A8C81]">
          PEER-REVIEWED LCA
        </span>
      </div>

      {/* Target Source Selector Pills */}
      <div className="shrink-0 flex items-center space-x-1.5 overflow-x-auto scrollbar-none pb-1">
        <span className="text-[9px] font-mono text-[#6E8075] uppercase tracking-wider shrink-0 mr-1">
          COMPARE WITH:
        </span>
        {candidateSources.map((source) => {
          const isSelected = source.id === selectedTargetId;
          return (
            <button
              key={source.id}
              onClick={() => setSelectedTargetId(source.id)}
              className={`px-2.5 py-1 rounded text-[10px] font-mono tracking-wider transition-all whitespace-nowrap shrink-0 border ${
                isSelected
                  ? 'bg-earth-forest text-white border-earth-sage font-bold'
                  : 'bg-[#161B18] text-[#86958C] border-[#252E28] hover:text-white hover:border-[#38463D]'
              }`}
            >
              {source.name}
            </button>
          );
        })}
      </div>

      {/* Main Comparison Metrics Stream */}
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-none space-y-3 pr-1">
        {/* Metric 1: Capacity Factor (Higher is Better) */}
        <div className="p-2.5 bg-[#151C18] border border-[#233027] rounded-lg space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white font-semibold uppercase tracking-wider">
              CAPACITY FACTOR (AVAILABILITY)
            </span>
            <span className="text-earth-sage text-[9px]">HIGHER IS BETTER</span>
          </div>

          <div className="space-y-1.5">
            {/* Geothermal Bar */}
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-0.5">
                <span className="text-earth-sage font-bold">GEOTHERMAL</span>
                <span className="text-white font-bold">{geothermal.capacityFactorDisplay}</span>
              </div>
              <div className="h-2 bg-[#1E2620] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-earth-sage rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${geothermal.capacityFactor}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                />
              </div>
            </div>

            {/* Target Source Bar */}
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-0.5">
                <span className="text-[#A2B3A8]">{target.name.toUpperCase()}</span>
                <span className="text-[#C8D3CB]">{target.capacityFactorDisplay}</span>
              </div>
              <div className="h-2 bg-[#1E2620] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#526359] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${target.capacityFactor}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metric 2: Lifecycle Emissions (Lower is Better) */}
        <div className="p-2.5 bg-[#151C18] border border-[#233027] rounded-lg space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white font-semibold uppercase tracking-wider">
              LIFECYCLE EMISSIONS (g CO₂/kWh)
            </span>
            <span className="text-earth-sage text-[9px]">LOWER IS BETTER</span>
          </div>

          <div className="space-y-1.5">
            {/* Geothermal Bar */}
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-0.5">
                <span className="text-earth-sage font-bold">GEOTHERMAL</span>
                <span className="text-white font-bold">{geothermal.emissionsDisplay}</span>
              </div>
              <div className="h-2 bg-[#1E2620] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-emerald-500 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (geothermal.lifecycleEmissions / 500) * 100)}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                />
              </div>
            </div>

            {/* Target Source Bar */}
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-0.5">
                <span className="text-[#A2B3A8]">{target.name.toUpperCase()}</span>
                <span className="text-[#C8D3CB]">{target.emissionsDisplay}</span>
              </div>
              <div className="h-2 bg-[#1E2620] rounded-full overflow-hidden">
                <motion.div
                  className={`h-full rounded-full ${
                    target.lifecycleEmissions > 100 ? 'bg-amber-500' : 'bg-[#526359]'
                  }`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(100, (target.lifecycleEmissions / 500) * 100)}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Metric 3: Land Footprint (Lower is Better) */}
        <div className="p-2.5 bg-[#151C18] border border-[#233027] rounded-lg space-y-2">
          <div className="flex items-center justify-between text-[10px] font-mono">
            <span className="text-white font-semibold uppercase tracking-wider">
              SURFACE LAND FOOTPRINT (m²/GWh)
            </span>
            <span className="text-earth-sage text-[9px]">LOWER IS BETTER</span>
          </div>

          <div className="space-y-1.5">
            <div>
              <div className="flex justify-between text-[10px] font-mono mb-0.5">
                <span className="text-earth-sage font-bold">GEOTHERMAL</span>
                <span className="text-white font-bold">{geothermal.landDisplay}</span>
              </div>
              <div className="h-2 bg-[#1E2620] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-earth-sage rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(geothermal.landFootprint / 3200) * 100}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-[10px] font-mono mb-0.5">
                <span className="text-[#A2B3A8]">{target.name.toUpperCase()}</span>
                <span className="text-[#C8D3CB]">{target.landDisplay}</span>
              </div>
              <div className="h-2 bg-[#1E2620] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-[#526359] rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(target.landFootprint / 3200) * 100}%` }}
                  transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Dispatch Profile Comparison Callout */}
        <div className="p-2.5 bg-[#121614] border border-[#1F2722] rounded text-xs space-y-1">
          <span className="font-mono text-[9px] uppercase tracking-wider text-earth-sage font-semibold block">
            GRID INTEGRATION PROFILE
          </span>
          <div className="grid grid-cols-2 gap-2 pt-0.5">
            <div className="p-1.5 bg-[#17201B] border border-[#26352B] rounded">
              <span className="text-[9px] font-mono text-earth-sage block">GEOTHERMAL:</span>
              <span className="font-sans text-[11px] font-medium text-white block">
                {geothermal.dispatchProfile}
              </span>
            </div>
            <div className="p-1.5 bg-[#171917] border border-[#272B28] rounded">
              <span className="text-[9px] font-mono text-[#829288] block">{target.name.toUpperCase()}:</span>
              <span className="font-sans text-[11px] font-medium text-[#C8D3CB] block">
                {target.dispatchProfile}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Sourced Reference Footer */}
      <div className="pt-2 border-t border-[#202521] flex items-center justify-between text-[9px] font-mono text-[#6E8075] shrink-0">
        <span>NREL LCA HARMONIZATION</span>
        <span>DOE GEOVISION (2019–2024)</span>
      </div>
    </div>
  );
};
