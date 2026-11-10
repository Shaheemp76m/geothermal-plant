import React from 'react';
import { motion } from 'motion/react';
import { GEOLOGICAL_FEATURES, ObservatoryMode, TemperatureZone } from '../../data/observatoryData';

interface GeologicalCrossSectionProps {
  activeMode: ObservatoryMode;
  selectedFeatureId: string;
  onSelectFeature: (id: string) => void;
  temperature: number;
  activeTempZone: TemperatureZone;
  shouldReduceMotion: boolean;
}

export const GeologicalCrossSection: React.FC<GeologicalCrossSectionProps> = ({
  activeMode,
  selectedFeatureId,
  onSelectFeature,
  temperature,
  activeTempZone,
  shouldReduceMotion,
}) => {
  // Find active feature
  const activeFeature = GEOLOGICAL_FEATURES.find((f) => f.id === selectedFeatureId);

  // Depth marker calculation based on temperature in Mode 02
  const tempNormalized = Math.min(1, Math.max(0, (temperature - 10) / 390));
  const activeThermalY = 120 + tempNormalized * 530; // Between 120px (surface) and 650px (deep basement)

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-2 sm:p-3 overflow-hidden select-none">
      {/* Visual Top Bar / Telemetry Stamp */}
      <div className="absolute top-2 left-3 right-3 z-20 flex items-center justify-between text-[9px] sm:text-[10px] font-mono tracking-widest text-[#7C8B82] uppercase pointer-events-none">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-earth-sage animate-pulse" />
          <span className="text-earth-sage font-semibold">GEOLOGICAL STRATA 0 – 6,000M</span>
        </div>
        <div className="flex items-center space-x-3 text-[9px]">
          <span>PRESSURE: 10–35 MPa</span>
          <span className="hidden sm:inline">THERMAL GRADIENT: 30°C/km</span>
        </div>
      </div>

      {/* SVG Canvas */}
      <svg
        viewBox="0 0 900 720"
        className="w-full h-full max-h-[100%] max-w-[100%] object-contain"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Geological Cross-Section of Subterranean Geothermal Energy System"
      >
        <defs>
          {/* Thermal Chamber Glow Gradient */}
          <radialGradient id="magmaGlow" cx="50%" cy="100%" r="70%">
            <stop offset="0%" stopColor="#FF4A1C" stopOpacity="0.95" />
            <stop offset="40%" stopColor="#D94B18" stopOpacity="0.65" />
            <stop offset="75%" stopColor="#9E3210" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#1E1410" stopOpacity="0" />
          </radialGradient>

          {/* Reservoir Hydrothermal Heat */}
          <radialGradient id="reservoirHeat" cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#E06D3B" stopOpacity="0.6" />
            <stop offset="60%" stopColor="#C95928" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#141916" stopOpacity="0" />
          </radialGradient>

          {/* Impermeable Caprock Texture Pattern */}
          <pattern id="caprockPattern" width="40" height="20" patternUnits="userSpaceOnUse">
            <line x1="0" y1="5" x2="40" y2="5" stroke="#252A26" strokeWidth="1" strokeDasharray="3 3" />
            <line x1="0" y1="15" x2="40" y2="15" stroke="#252A26" strokeWidth="1" strokeDasharray="2 4" />
          </pattern>

          {/* Bedrock Fracture Pattern */}
          <pattern id="fracturePattern" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M5 10 L25 35 L45 20 L55 50" stroke="#3D2920" strokeWidth="1.2" fill="none" opacity="0.65" />
            <path d="M10 50 L30 40 L50 55" stroke="#4A3025" strokeWidth="0.8" fill="none" opacity="0.45" />
          </pattern>

          {/* Production Fluid Linear Gradient */}
          <linearGradient id="productionFluid" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF4A1C" />
            <stop offset="60%" stopColor="#E06D3B" />
            <stop offset="100%" stopColor="#FFB38A" />
          </linearGradient>

          {/* Injection Fluid Linear Gradient */}
          <linearGradient id="injectionFluid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6EE7B7" />
            <stop offset="60%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>

          {/* Active Highlight Glow Filter */}
          <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* ---------------------------------------------------------- */}
        {/* 1. SKY & SURFACE LEVEL (Y: 0 – 110)                        */}
        {/* ---------------------------------------------------------- */}
        <g id="sky-surface">
          {/* Atmospheric Sky Backdrop */}
          <rect x="0" y="0" width="900" height="110" fill="#0E1210" />

          {/* Distant Mountain Silhouettes */}
          <polygon points="0,110 80,75 160,95 250,60 380,100 480,70 620,95 740,65 850,90 900,80 900,110" fill="#141A17" />
          <polygon points="0,110 120,85 220,100 320,80 440,105 560,85 700,105 820,80 900,100 900,110" fill="#1B241F" />

          {/* Surface Ground Line */}
          <line x1="0" y1="110" x2="900" y2="110" stroke="#3D4A41" strokeWidth="2" />
          <rect x="0" y="106" width="900" height="4" fill="#25322A" />

          {/* Surface Plant Building & Turbine Complex */}
          <g 
            id="surface-plant-group" 
            className="cursor-pointer group"
            onClick={() => onSelectFeature('surface-plant')}
          >
            {/* Turbine Generation Hall */}
            <rect 
              x="420" 
              y="62" 
              width="130" 
              height="48" 
              rx="3" 
              fill={selectedFeatureId === 'surface-plant' ? '#1D3025' : '#17201B'} 
              stroke={selectedFeatureId === 'surface-plant' ? '#8BAF91' : '#2D3B31'} 
              strokeWidth={selectedFeatureId === 'surface-plant' ? '2' : '1.5'} 
            />
            {/* Industrial Slanted Roof */}
            <polygon points="415,62 485,42 555,62" fill="#202A24" stroke="#344339" strokeWidth="1.5" />

            {/* Generator Hall Windows / Status LEDs */}
            <rect x="435" y="72" width="18" height="22" rx="1" fill="#8BAF91" fillOpacity="0.8" />
            <rect x="465" y="72" width="18" height="22" rx="1" fill="#8BAF91" fillOpacity="0.8" />
            <rect x="495" y="72" width="18" height="22" rx="1" fill="#8BAF91" fillOpacity="0.8" />
            <rect x="525" y="72" width="12" height="38" rx="1" fill="#232C26" />

            {/* Cooling Towers / Air-Cooled Condensers */}
            <path d="M 570 110 L 580 65 L 615 65 L 625 110 Z" fill="#1B221E" stroke="#344339" strokeWidth="1.5" />
            <ellipse cx="597.5" cy="65" rx="17.5" ry="5" fill="#25302A" stroke="#3D4E43" strokeWidth="1" />

            {/* Rising Condensation Steam Plumes */}
            <motion.path
              d="M 590 62 Q 582 35 595 15 Q 608 0 618 10 Q 612 35 605 62"
              fill="white"
              fillOpacity={shouldReduceMotion ? 0.35 : 0.45}
              animate={
                shouldReduceMotion
                  ? {}
                  : {
                      d: [
                        'M 590 62 Q 582 35 595 15 Q 608 0 618 10 Q 612 35 605 62',
                        'M 592 62 Q 605 38 590 12 Q 580 0 598 8 Q 615 32 602 62',
                        'M 590 62 Q 582 35 595 15 Q 608 0 618 10 Q 612 35 605 62',
                      ],
                      opacity: [0.35, 0.55, 0.35],
                    }
              }
              transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* Electrical Transmission Pylon */}
            <path d="M 660 110 L 675 40 L 690 110 M 665 65 L 685 65 M 658 85 L 692 85" stroke="#3A483E" strokeWidth="1.5" fill="none" />
            <line x1="685" y1="45" x2="890" y2="40" stroke="#4A5C50" strokeWidth="1" strokeDasharray="4 4" />

            {/* Interactive Badge on Surface Plant */}
            <circle cx="485" cy="40" r="12" fill="#10251C" stroke="#8BAF91" strokeWidth="1.5" />
            <text x="485" y="44" textAnchor="middle" fill="#8BAF91" fontSize="9" fontWeight="bold" fontFamily="monospace">
              01
            </text>
            <text x="485" y="22" textAnchor="middle" fill="#E8E6DF" fontSize="11" fontWeight="600" fontFamily="sans-serif">
              POWER PLANT
            </text>
          </g>
        </g>

        {/* ---------------------------------------------------------- */}
        {/* 2. STRATIGRAPHIC LAYER 1: UPPER SEDIMENTARY (Y: 110 – 220) */}
        {/* ---------------------------------------------------------- */}
        <g 
          id="layer-sedimentary" 
          className="cursor-pointer"
          onClick={() => onSelectFeature('impermeable-caprock')}
        >
          <rect 
            x="0" 
            y="110" 
            width="900" 
            height="110" 
            fill={selectedFeatureId === 'impermeable-caprock' ? '#1F2420' : '#141815'} 
            stroke="#242B26" 
            strokeWidth="1" 
          />
          <rect x="0" y="110" width="900" height="110" fill="url(#caprockPattern)" opacity="0.4" />

          {/* Depth Callout Left */}
          <text x="14" y="130" fill="#6A776F" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
            0 M · SHALLOW WATER TABLE
          </text>
          <text x="14" y="215" fill="#6A776F" fontSize="9" fontFamily="monospace" letterSpacing="0.1em">
            -800 M · SEDIMENTARY OVERBURDEN
          </text>
        </g>

        {/* ---------------------------------------------------------- */}
        {/* 3. STRATIGRAPHIC LAYER 2: IMPERMEABLE CAPROCK (Y: 220 – 350)*/}
        {/* ---------------------------------------------------------- */}
        <g 
          id="layer-caprock" 
          className="cursor-pointer"
          onClick={() => onSelectFeature('impermeable-caprock')}
        >
          <rect 
            x="0" 
            y="220" 
            width="900" 
            height="130" 
            fill={selectedFeatureId === 'impermeable-caprock' ? '#252B26' : '#1A1F1B'} 
            stroke={selectedFeatureId === 'impermeable-caprock' ? '#8BAF91' : '#2D352E'} 
            strokeWidth={selectedFeatureId === 'impermeable-caprock' ? '1.5' : '1'} 
          />
          <rect x="0" y="220" width="900" height="130" fill="url(#caprockPattern)" opacity="0.8" />

          {/* Caprock Label */}
          <text x="50" y="275" fill="#9BA69F" fontSize="12" fontWeight="600" fontFamily="sans-serif">
            IMPERMEABLE CAPROCK SHALE FORMATION
          </text>
          <text x="50" y="295" fill="#6E7B73" fontSize="10" fontFamily="monospace">
            Thermal seal · Hydraulic conductivity &lt;10⁻¹² m/s · Isolates aquifers
          </text>

          {/* Interactive Badge */}
          <circle cx="28" cy="275" r="10" fill="#17221B" stroke="#8BAF91" strokeWidth="1.5" />
          <text x="28" y="278.5" textAnchor="middle" fill="#8BAF91" fontSize="8" fontWeight="bold" fontFamily="monospace">
            02
          </text>

          {/* Depth Callout */}
          <text x="14" y="340" fill="#6A776F" fontSize="9" fontFamily="monospace">
            -1,500 M · BASAL CAPROCK SEAL
          </text>
        </g>

        {/* ---------------------------------------------------------- */}
        {/* 4. STRATIGRAPHIC LAYER 3: HYDROTHERMAL RESERVOIR (350–540) */}
        {/* ---------------------------------------------------------- */}
        <g 
          id="layer-reservoir" 
          className="cursor-pointer"
          onClick={() => onSelectFeature('hydrothermal-reservoir')}
        >
          <rect 
            x="0" 
            y="350" 
            width="900" 
            height="190" 
            fill={selectedFeatureId === 'hydrothermal-reservoir' ? '#2D201A' : '#1A1715'} 
            stroke={selectedFeatureId === 'hydrothermal-reservoir' ? '#E06D3B' : '#33241D'} 
            strokeWidth={selectedFeatureId === 'hydrothermal-reservoir' ? '2' : '1'} 
          />
          
          {/* Reservoir Ambient Thermal Heat Glow */}
          <ellipse cx="480" cy="445" rx="360" ry="85" fill="url(#reservoirHeat)" />
          <rect x="0" y="350" width="900" height="190" fill="url(#fracturePattern)" opacity="0.6" />

          {/* Naturally Fractured Fissure Network */}
          <path 
            d="M 330 460 Q 380 430 440 455 Q 490 475 550 440 Q 600 425 640 450" 
            stroke="#E06D3B" 
            strokeWidth="2.5" 
            fill="none" 
            strokeDasharray="6 3" 
            opacity="0.85" 
          />
          <path 
            d="M 350 420 Q 400 440 460 415 Q 520 400 580 430 Q 620 460 670 435" 
            stroke="#FF7A3D" 
            strokeWidth="1.75" 
            fill="none" 
            strokeDasharray="4 4" 
            opacity="0.75" 
          />
          <path 
            d="M 360 490 Q 420 470 480 495 Q 540 510 610 480" 
            stroke="#C95928" 
            strokeWidth="2" 
            fill="none" 
            strokeDasharray="5 4" 
            opacity="0.7" 
          />

          {/* Subterranean Convective Circulation Loop (Between Wells) */}
          <motion.path
            d="M 360 450 C 410 510, 520 510, 580 460"
            stroke="#E06D3B"
            strokeWidth="2"
            fill="none"
            strokeDasharray="8 6"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    strokeDashoffset: [0, -28],
                  }
            }
            transition={{ duration: 1.8, repeat: Infinity, ease: 'linear' }}
          />

          {/* Reservoir Callout & Label */}
          <text x="50" y="385" fill="#E8B595" fontSize="12" fontWeight="600" fontFamily="sans-serif">
            PERMEABLE HYDROTHERMAL RESERVOIR (180°C – 320°C)
          </text>
          <text x="50" y="405" fill="#B38066" fontSize="10" fontFamily="monospace">
            Naturally fractured basalt &amp; granite · High-pressure mineralized brine
          </text>

          {/* Interactive Badge */}
          <circle cx="28" cy="385" r="10" fill="#2A1710" stroke="#E06D3B" strokeWidth="1.5" />
          <text x="28" y="388.5" textAnchor="middle" fill="#E06D3B" fontSize="8" fontWeight="bold" fontFamily="monospace">
            05
          </text>

          {/* Depth Callout */}
          <text x="14" y="530" fill="#8C6350" fontSize="9" fontFamily="monospace">
            -3,500 M · BASAL RESERVOIR BOUNDARY
          </text>
        </g>

        {/* ---------------------------------------------------------- */}
        {/* 5. STRATIGRAPHIC LAYER 4: CRYSTALLINE BASEMENT (540–720)   */}
        {/* ---------------------------------------------------------- */}
        <g 
          id="layer-basement" 
          className="cursor-pointer"
          onClick={() => onSelectFeature('crystalline-basement')}
        >
          <rect 
            x="0" 
            y="540" 
            width="900" 
            height="180" 
            fill={selectedFeatureId === 'crystalline-basement' ? '#3B180E' : '#1F0F09'} 
            stroke={selectedFeatureId === 'crystalline-basement' ? '#FF4A1C' : '#42170B'} 
            strokeWidth={selectedFeatureId === 'crystalline-basement' ? '2' : '1'} 
          />

          {/* Deep Thermal Magma Plume Conduction Glow */}
          <rect x="0" y="540" width="900" height="180" fill="url(#magmaGlow)" />

          {/* Radiating Heat Arrows (Upward Conduction) */}
          <g opacity="0.65" stroke="#FFA380" strokeWidth="1.5" fill="none">
            <path d="M 280 660 L 280 600 M 275 610 L 280 600 L 285 610" />
            <path d="M 470 650 L 470 580 M 465 590 L 470 580 L 475 590" />
            <path d="M 660 660 L 660 600 M 655 610 L 660 600 L 665 610" />
          </g>

          {/* Basement Label */}
          <text x="50" y="580" fill="#FFC2AD" fontSize="12" fontWeight="600" fontFamily="sans-serif">
            CRYSTALLINE BASEMENT &amp; MANTLE HEAT CONDUCTION (350°C – 500°C+)
          </text>
          <text x="50" y="600" fill="#D98A72" fontSize="10" fontFamily="monospace">
            Radiogenic isotopic decay (U, Th, K-40) · Primordial Earth Core heat flux: 47 TW
          </text>

          {/* Interactive Badge */}
          <circle cx="28" cy="580" r="10" fill="#42140A" stroke="#FF4A1C" strokeWidth="1.5" />
          <text x="28" y="583.5" textAnchor="middle" fill="#FF4A1C" fontSize="8" fontWeight="bold" fontFamily="monospace">
            06
          </text>

          {/* Depth Callout */}
          <text x="14" y="700" fill="#D96E52" fontSize="9" fontFamily="monospace">
            -5,000 M+ · DEEP SUPERCRITICAL CRUST
          </text>
        </g>

        {/* ---------------------------------------------------------- */}
        {/* 6. WELLBORES: INJECTION & PRODUCTION CASINGS               */}
        {/* ---------------------------------------------------------- */}
        
        {/* INJECTION WELL (Left Wellbore) */}
        <g 
          id="injection-well-group" 
          className="cursor-pointer"
          onClick={() => onSelectFeature('injection-well')}
        >
          {/* Wellhead Casing Outer Pipe */}
          <path 
            d="M 450 110 L 360 450" 
            stroke={selectedFeatureId === 'injection-well' ? '#6EE7B7' : '#2A4D6C'} 
            strokeWidth="11" 
            strokeLinecap="round" 
          />
          {/* Cement Barrier Casing */}
          <path d="M 450 110 L 360 450" stroke="#10253B" strokeWidth="7" />

          {/* Flowing Cooled Fluid Particles (Descending Blue/Cyan) */}
          <motion.path
            d="M 450 110 L 360 450"
            stroke="url(#injectionFluid)"
            strokeWidth="3.5"
            strokeDasharray="8 6"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    strokeDashoffset: [0, -28],
                  }
            }
            transition={{ duration: 1.4, repeat: Infinity, ease: 'linear' }}
          />

          {/* Wellhead Perforations at Depth */}
          <circle cx="360" cy="450" r="7" fill="#3B82F6" opacity="0.8" />
          <circle cx="360" cy="450" r="15" fill="none" stroke="#60A5FA" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Wellhead Label & Marker Top */}
          <circle cx="395" cy="190" r="10" fill="#0C251C" stroke="#6EE7B7" strokeWidth="1.5" />
          <text x="395" y="193.5" textAnchor="middle" fill="#6EE7B7" fontSize="8" fontWeight="bold" fontFamily="monospace">
            03
          </text>
          <text x="345" y="180" textAnchor="end" fill="#6EE7B7" fontSize="10" fontWeight="600" fontFamily="monospace">
            INJECTION WELL (100% MASS REINJECTED)
          </text>
        </g>

        {/* PRODUCTION WELL (Right Wellbore) */}
        <g 
          id="production-well-group" 
          className="cursor-pointer"
          onClick={() => onSelectFeature('production-well')}
        >
          {/* Wellhead Casing Outer Pipe */}
          <path 
            d="M 580 460 L 510 110" 
            stroke={selectedFeatureId === 'production-well' ? '#FFA380' : '#6E2D18'} 
            strokeWidth="11" 
            strokeLinecap="round" 
          />
          {/* Cement Barrier Casing */}
          <path d="M 580 460 L 510 110" stroke="#2B1008" strokeWidth="7" />

          {/* Flowing Superheated Fluid (Ascending Orange/Red) */}
          <motion.path
            d="M 580 460 L 510 110"
            stroke="url(#productionFluid)"
            strokeWidth="3.5"
            strokeDasharray="8 6"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    strokeDashoffset: [-28, 0],
                  }
            }
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Downhole Intake Screen */}
          <circle cx="580" cy="460" r="7" fill="#FF4A1C" opacity="0.8" />
          <circle cx="580" cy="460" r="15" fill="none" stroke="#FFA380" strokeWidth="1.5" strokeDasharray="3 3" />

          {/* Wellhead Label & Marker Top */}
          <circle cx="550" cy="240" r="10" fill="#2E0E05" stroke="#FF7A3D" strokeWidth="1.5" />
          <text x="550" y="243.5" textAnchor="middle" fill="#FF7A3D" fontSize="8" fontWeight="bold" fontFamily="monospace">
            04
          </text>
          <text x="570" y="235" textAnchor="start" fill="#FFA380" fontSize="10" fontWeight="600" fontFamily="monospace">
            PRODUCTION WELL (200°C–320°C+)
          </text>
        </g>

        {/* ---------------------------------------------------------- */}
        {/* 7. MODE 02 DYNAMIC THERMAL DEPTH HIGHLIGHT OVERLAY        */}
        {/* ---------------------------------------------------------- */}
        {activeMode === 'temperature' && (
          <g id="thermal-depth-marker" className="pointer-events-none transition-all duration-300">
            {/* Glowing Scan Line Across Diagram */}
            <line
              x1="0"
              y1={activeThermalY}
              x2="900"
              y2={activeThermalY}
              stroke={activeTempZone.activeColor}
              strokeWidth="2.5"
              strokeDasharray="6 4"
              opacity="0.9"
            />

            {/* Thermal Beam Band Highlight */}
            <rect
              x="0"
              y={Math.max(110, activeThermalY - 35)}
              width="900"
              height="70"
              fill={activeTempZone.activeColor}
              opacity="0.12"
            />

            {/* Depth Marker Bead on Left Margin */}
            <circle cx="20" cy={activeThermalY} r="7" fill={activeTempZone.activeColor} />
            <text x="35" y={activeThermalY + 4} fill={activeTempZone.activeColor} fontSize="11" fontWeight="bold" fontFamily="monospace">
              {temperature}°C · {activeTempZone.techName}
            </text>
          </g>
        )}
      </svg>

      {/* Floating Active Selection Indicator Tooltip at Diagram Bottom */}
      {activeFeature && (
        <div className="absolute bottom-3 left-4 right-4 z-20 bg-[#121714]/90 backdrop-blur-md border border-[#2D3B31] px-3.5 py-2 rounded-lg flex items-center justify-between text-xs shadow-lg">
          <div className="flex items-center space-x-2.5 truncate">
            <span className="w-2 h-2 rounded-full bg-earth-sage shrink-0" />
            <span className="font-mono text-[10px] text-earth-sage uppercase tracking-wider shrink-0">
              {activeFeature.category}:
            </span>
            <span className="font-sans font-medium text-white truncate">
              {activeFeature.name}
            </span>
          </div>
          <span className="font-mono text-[10px] text-earth-sage/90 font-semibold shrink-0 ml-2">
            {activeFeature.depth} · {activeFeature.temperature}
          </span>
        </div>
      )}
    </div>
  );
};
