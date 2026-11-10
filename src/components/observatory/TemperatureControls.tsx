import React from 'react';
import { motion } from 'motion/react';
import { Thermometer, Zap, Gauge, Flame } from 'lucide-react';
import { TemperatureZone } from '../../data/observatoryData';

interface TemperatureControlsProps {
  temperature: number;
  onTemperatureChange: (temp: number) => void;
  activeZone: TemperatureZone;
  shouldReduceMotion: boolean;
}

export const TemperatureControls: React.FC<TemperatureControlsProps> = ({
  temperature,
  onTemperatureChange,
  activeZone,
  shouldReduceMotion,
}) => {
  return (
    <div className="flex flex-col h-full overflow-hidden space-y-3">
      {/* Panel Sub-Header */}
      <div className="flex items-center justify-between pb-2 border-b border-[#202521] shrink-0">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-3.5 h-3.5 text-earth-sage" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-earth-sage font-semibold">
            THERMAL ENTHALPY CONTROL
          </span>
        </div>
        <span className="font-mono text-[10px] text-earth-sage font-bold">
          {temperature}°C
        </span>
      </div>

      {/* Main Temperature Slider & Gauge */}
      <div className="p-3 bg-[#151C18] border border-[#233027] rounded-lg shrink-0 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[9px] uppercase tracking-wider text-[#8A9C90]">
            SUBTERRANEAN FLUID TEMPERATURE
          </span>
          <span className="font-mono text-xs font-bold text-white px-2 py-0.5 rounded bg-black/40 border border-white/10">
            {temperature}°C
          </span>
        </div>

        {/* Range Slider */}
        <div className="relative py-1">
          <input
            type="range"
            min="10"
            max="420"
            step="5"
            value={temperature}
            onChange={(e) => onTemperatureChange(Number(e.target.value))}
            className="w-full h-2 bg-[#202923] rounded-lg appearance-none cursor-pointer accent-[#8BAF91]"
            aria-label="Subterranean Fluid Temperature in Celsius"
          />
        </div>

        {/* Preset Quick Buttons */}
        <div className="grid grid-cols-5 gap-1 pt-1">
          {[
            { label: '15°C', temp: 15 },
            { label: '120°C', temp: 120 },
            { label: '220°C', temp: 220 },
            { label: '320°C', temp: 320 },
            { label: '400°C', temp: 400 },
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => onTemperatureChange(preset.temp)}
              className={`py-1 text-[9px] font-mono rounded transition-colors text-center border ${
                Math.abs(temperature - preset.temp) < 40
                  ? 'bg-earth-forest text-white border-earth-sage font-bold'
                  : 'bg-[#19221C] text-[#86958B] border-[#29362D] hover:text-white'
              }`}
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Active Matched Technology Readout */}
      <motion.div
        key={activeZone.techName}
        initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex-1 min-h-0 overflow-y-auto scrollbar-none space-y-2.5 pr-1"
      >
        {/* Technology Header */}
        <div className="p-2.5 rounded border border-[#2D3B31] bg-[#121814]">
          <div className="flex items-center justify-between text-[9px] font-mono text-earth-sage mb-1">
            <span className="uppercase tracking-wider font-semibold">OPTIMAL TECHNOLOGY</span>
            <span>DEPTH: {activeZone.depthEst}</span>
          </div>
          <h4 className="font-editorial text-base sm:text-lg font-medium text-white leading-tight">
            {activeZone.techName}
          </h4>
          <span className="font-mono text-[10px] text-earth-sage/90 block mt-0.5">
            {activeZone.category}
          </span>
        </div>

        {/* Thermodynamic Conversion Cycle */}
        <div className="p-2.5 bg-[#121614] border border-[#1F2722] rounded space-y-1">
          <div className="flex items-center space-x-1.5 text-earth-sage font-mono text-[9px] uppercase tracking-wider font-semibold">
            <Zap className="w-3 h-3 text-earth-sage" />
            <span>MECHANICAL EXTRACTION CYCLE</span>
          </div>
          <p className="font-sans text-[11px] text-[#C2CDC5] leading-relaxed">
            {activeZone.cycle}
          </p>
        </div>

        {/* Efficiency & Applications */}
        <div className="p-2.5 bg-[#121614] border border-[#1F2722] rounded space-y-1">
          <div className="flex items-center space-x-1.5 text-earth-sage font-mono text-[9px] uppercase tracking-wider font-semibold">
            <Gauge className="w-3 h-3 text-earth-sage" />
            <span>THERMODYNAMIC PERFORMANCE</span>
          </div>
          <p className="font-sans text-[11px] text-[#C2CDC5] leading-relaxed">
            {activeZone.efficiency}
          </p>
        </div>

        {/* Applications */}
        <div className="p-2.5 bg-[#121614] border border-[#1F2722] rounded space-y-1">
          <div className="flex items-center space-x-1.5 text-earth-sage font-mono text-[9px] uppercase tracking-wider font-semibold">
            <Flame className="w-3 h-3 text-earth-sage" />
            <span>TARGET APPLICATIONS</span>
          </div>
          <p className="font-sans text-[11px] text-[#A6B5AC] leading-relaxed">
            {activeZone.applications}
          </p>
        </div>
      </motion.div>
    </div>
  );
};
