import React from 'react';
import { motion } from 'motion/react';
import { ObservatoryMode, TemperatureZone } from '../../data/observatoryData';

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
  // Depth marker calculation based on temperature in Mode 02
  const tempNormalized = Math.min(1, Math.max(0, (temperature - 10) / 390));
  const activeThermalY = 110 + tempNormalized * 570; // Maps 10°C–400°C across depth (110px surface to 680px deep)

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-1 sm:p-2 overflow-hidden select-none">
      {/* SVG Canvas */}
      <svg
        viewBox="0 0 960 720"
        className="w-full h-full max-h-full max-w-full object-contain"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        aria-label="Geological Cross-Section of Subterranean Geothermal Energy System"
      >
        <defs>
          {/* Deep Magmatic Heat Plume Radial Gradient */}
          <radialGradient id="magmaGlow" cx="50%" cy="100%" r="75%">
            <stop offset="0%" stopColor="#FF4A1C" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#D94B18" stopOpacity="0.75" />
            <stop offset="70%" stopColor="#8C2C0E" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1E100B" stopOpacity="0" />
          </radialGradient>

          {/* Concentrated Reservoir Hydrothermal Heat */}
          <radialGradient id="reservoirHeat" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#E06D3B" stopOpacity="0.7" />
            <stop offset="45%" stopColor="#C95928" stopOpacity="0.45" />
            <stop offset="80%" stopColor="#7A3418" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#181512" stopOpacity="0" />
          </radialGradient>

          {/* Sedimentary Bedding Pattern */}
          <pattern id="sedimentaryPattern" width="60" height="24" patternUnits="userSpaceOnUse">
            <line x1="0" y1="6" x2="60" y2="6" stroke="#2B362F" strokeWidth="1" strokeDasharray="6 4" />
            <line x1="0" y1="18" x2="60" y2="18" stroke="#243028" strokeWidth="0.8" strokeDasharray="3 5" />
          </pattern>

          {/* Impermeable Caprock Shale Dense Laminations */}
          <pattern id="caprockPattern" width="40" height="18" patternUnits="userSpaceOnUse">
            <line x1="0" y1="4" x2="40" y2="4" stroke="#2A352E" strokeWidth="1.2" strokeDasharray="4 2" />
            <line x1="0" y1="9" x2="40" y2="9" stroke="#1D2721" strokeWidth="1" strokeDasharray="2 4" />
            <line x1="0" y1="14" x2="40" y2="14" stroke="#2A352E" strokeWidth="1.2" strokeDasharray="4 2" />
          </pattern>

          {/* Reservoir Fractured Joint Network Pattern */}
          <pattern id="fracturePattern" width="80" height="80" patternUnits="userSpaceOnUse">
            <path d="M10 15 L35 45 L65 25 L75 65" stroke="#E06D3B" strokeWidth="1.4" fill="none" opacity="0.4" />
            <path d="M15 65 L40 50 L65 70" stroke="#FF7A3D" strokeWidth="1" fill="none" opacity="0.3" />
            <path d="M5 40 L30 20 L55 35" stroke="#C95928" strokeWidth="0.8" fill="none" opacity="0.35" />
          </pattern>

          {/* Crystalline Basement Joint Pattern */}
          <pattern id="basementPattern" width="70" height="70" patternUnits="userSpaceOnUse">
            <path d="M10 20 L30 10 L50 35 L65 15" stroke="#5E2310" strokeWidth="1.2" fill="none" opacity="0.5" />
            <path d="M15 55 L35 40 L55 60" stroke="#7A2D16" strokeWidth="1" fill="none" opacity="0.4" />
          </pattern>

          {/* Production Fluid Linear Gradient (Ascending Steam/Brine) */}
          <linearGradient id="productionFluid" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0%" stopColor="#FF4A1C" />
            <stop offset="40%" stopColor="#E06D3B" />
            <stop offset="85%" stopColor="#FFA67A" />
            <stop offset="100%" stopColor="#FFF2EB" />
          </linearGradient>

          {/* Injection Fluid Linear Gradient (Descending Cooled Brine) */}
          <linearGradient id="injectionFluid" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
        </defs>

        {/* ========================================================== */}
        {/* STRATA 1: SURFACE POWER PLANT & SHALLOW AQUIFER (Y: 0–105) */}
        {/* ========================================================== */}
        <g
          id="surface-plant-group"
          className="cursor-pointer group"
          onClick={() => onSelectFeature('surface-plant')}
        >
          {/* Atmospheric Sky Backdrop */}
          <rect x="0" y="0" width="960" height="105" fill="#0A0E0C" />

          {/* Distant Mountain Silhouettes */}
          <polygon
            points="0,105 70,72 150,90 240,58 370,95 470,68 610,92 730,62 840,88 920,75 960,82 960,105"
            fill="#121815"
          />
          <polygon
            points="0,105 110,82 210,96 310,76 430,100 550,82 690,100 810,78 900,96 960,90 960,105"
            fill="#18221D"
          />

          {/* Surface Ground Line */}
          <line x1="0" y1="105" x2="960" y2="105" stroke="#3D4E43" strokeWidth="2" />
          <rect x="0" y="101" width="960" height="4" fill="#25352B" />

          {/* Turbine Generation Hall */}
          <rect
            x="450"
            y="56"
            width="135"
            height="49"
            rx="3"
            fill={selectedFeatureId === 'surface-plant' ? '#1D3025' : '#141E18'}
            stroke={selectedFeatureId === 'surface-plant' ? '#8BAF91' : '#2F4034'}
            strokeWidth={selectedFeatureId === 'surface-plant' ? '2.5' : '1.5'}
          />
          {/* Industrial Pitched Roof */}
          <polygon
            points="445,56 517,36 590,56"
            fill="#1C2720"
            stroke={selectedFeatureId === 'surface-plant' ? '#8BAF91' : '#344539'}
            strokeWidth="1.5"
          />

          {/* Turbine Hall Generator Status Windows */}
          <rect x="465" y="66" width="18" height="22" rx="1" fill="#8BAF91" fillOpacity="0.85" />
          <rect x="495" y="66" width="18" height="22" rx="1" fill="#8BAF91" fillOpacity="0.85" />
          <rect x="525" y="66" width="18" height="22" rx="1" fill="#8BAF91" fillOpacity="0.85" />
          <rect x="555" y="66" width="14" height="39" rx="1" fill="#233128" />

          {/* Cooling Tower / Air-Cooled Condensers */}
          <path
            d="M 605 105 L 616 60 L 650 60 L 661 105 Z"
            fill="#1A241E"
            stroke="#344539"
            strokeWidth="1.5"
          />
          <ellipse cx="633" cy="60" rx="17" ry="5" fill="#24332A" stroke="#3D5043" strokeWidth="1" />

          {/* Condensation Steam Plume */}
          <motion.path
            d="M 625 57 Q 617 32 630 12 Q 643 -2 653 8 Q 647 32 640 57"
            fill="white"
            fillOpacity={shouldReduceMotion ? 0.35 : 0.45}
            animate={
              shouldReduceMotion
                ? {}
                : {
                    d: [
                      'M 625 57 Q 617 32 630 12 Q 643 -2 653 8 Q 647 32 640 57',
                      'M 627 57 Q 640 35 625 10 Q 615 -2 633 6 Q 650 30 637 57',
                      'M 625 57 Q 617 32 630 12 Q 643 -2 653 8 Q 647 32 640 57',
                    ],
                    opacity: [0.35, 0.55, 0.35],
                  }
            }
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* High-Voltage Grid Substation & Pylon */}
          <path
            d="M 700 105 L 715 35 L 730 105 M 705 60 L 725 60 M 698 80 L 732 80"
            stroke="#3B4B40"
            strokeWidth="1.5"
            fill="none"
          />
          <line
            x1="725"
            y1="40"
            x2="950"
            y2="35"
            stroke="#4A5C50"
            strokeWidth="1.2"
            strokeDasharray="4 4"
          />

          {/* Interactive Badge 01 */}
          <circle
            cx="517"
            cy="36"
            r="12"
            fill="#0F241A"
            stroke={selectedFeatureId === 'surface-plant' ? '#A3C7A9' : '#8BAF91'}
            strokeWidth="2"
          />
          <text
            x="517"
            y="40"
            textAnchor="middle"
            fill="#8BAF91"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            01
          </text>
          <text
            x="517"
            y="20"
            textAnchor="middle"
            fill="#F0EEE3"
            fontSize="11"
            fontWeight="600"
            fontFamily="sans-serif"
          >
            01 · SURFACE CONVERSION PLANT
          </text>
        </g>

        {/* ========================================================== */}
        {/* STRATA 2: SEDIMENTARY OVERBURDEN (Y: 105–215, 100–1,200M)  */}
        {/* ========================================================== */}
        <g
          id="layer-sedimentary"
          className="cursor-pointer"
          onClick={() => onSelectFeature('sedimentary-overburden')}
        >
          <rect
            x="0"
            y="105"
            width="960"
            height="110"
            fill={selectedFeatureId === 'sedimentary-overburden' ? '#1C251F' : '#121714'}
            stroke={selectedFeatureId === 'sedimentary-overburden' ? '#8BAF91' : '#222B25'}
            strokeWidth={selectedFeatureId === 'sedimentary-overburden' ? '2' : '1'}
          />
          <rect x="0" y="105" width="960" height="110" fill="url(#sedimentaryPattern)" opacity="0.6" />

          {/* Shallow Potable Water Table Horizon Indicator */}
          <rect x="0" y="105" width="960" height="24" fill="#2E4A62" fillOpacity="0.15" />
          <line x1="0" y1="129" x2="960" y2="129" stroke="#3B658A" strokeWidth="1" strokeDasharray="4 4" opacity="0.6" />

          {/* Interactive Badge 02 */}
          <circle
            cx="32"
            cy="158"
            r="11"
            fill="#14211A"
            stroke={selectedFeatureId === 'sedimentary-overburden' ? '#A3C7A9' : '#8BAF91'}
            strokeWidth="1.75"
          />
          <text
            x="32"
            y="162"
            textAnchor="middle"
            fill="#8BAF91"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            02
          </text>

          {/* Strata Title & Subtitle */}
          <text x="54" y="154" fill="#BAC8BE" fontSize="11" fontWeight="600" fontFamily="sans-serif">
            02 · SEDIMENTARY OVERBURDEN &amp; SHALLOW AQUIFERS (0 – 1,200M)
          </text>
          <text x="54" y="170" fill="#75887C" fontSize="9.5" fontFamily="monospace">
            Potable groundwater table · Cement-cased well isolation · Sandstone &amp; mudstone
          </text>

          {/* Depth Callout */}
          <text x="940" y="205" textAnchor="end" fill="#5F7366" fontSize="9" fontFamily="monospace">
            -1,200 M · BASAL OVERBURDEN
          </text>
        </g>

        {/* ========================================================== */}
        {/* STRATA 3: IMPERMEABLE CAPROCK SEAL (Y: 215–335, 1,200–2,000M)*/}
        {/* ========================================================== */}
        <g
          id="layer-caprock"
          className="cursor-pointer"
          onClick={() => onSelectFeature('impermeable-caprock')}
        >
          <rect
            x="0"
            y="215"
            width="960"
            height="120"
            fill={selectedFeatureId === 'impermeable-caprock' ? '#222C25' : '#161C18'}
            stroke={selectedFeatureId === 'impermeable-caprock' ? '#8BAF91' : '#2A362D'}
            strokeWidth={selectedFeatureId === 'impermeable-caprock' ? '2' : '1'}
          />
          <rect x="0" y="215" width="960" height="120" fill="url(#caprockPattern)" opacity="0.85" />

          {/* Interactive Badge 03 */}
          <circle
            cx="32"
            cy="270"
            r="11"
            fill="#17261D"
            stroke={selectedFeatureId === 'impermeable-caprock' ? '#A3C7A9' : '#8BAF91'}
            strokeWidth="1.75"
          />
          <text
            x="32"
            y="274"
            textAnchor="middle"
            fill="#8BAF91"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            03
          </text>

          {/* Caprock Label */}
          <text x="54" y="266" fill="#D2DCD4" fontSize="11" fontWeight="600" fontFamily="sans-serif">
            03 · IMPERMEABLE CAPROCK SHALE SEAL (1,200 – 2,000M)
          </text>
          <text x="54" y="282" fill="#84998C" fontSize="9.5" fontFamily="monospace">
            Thermal seal · Hydraulic conductivity &lt;10⁻¹² m/s · Hydrothermal pressure containment
          </text>

          {/* Depth Callout */}
          <text x="940" y="325" textAnchor="end" fill="#697D71" fontSize="9" fontFamily="monospace">
            -2,000 M · BASAL CAPROCK SEAL
          </text>
        </g>

        {/* ========================================================== */}
        {/* STRATA 4: HYDROTHERMAL RESERVOIR (Y: 335–520, 2,000–3,500M)*/}
        {/* ========================================================== */}
        <g
          id="layer-reservoir"
          className="cursor-pointer"
          onClick={() => onSelectFeature('hydrothermal-reservoir')}
        >
          <rect
            x="0"
            y="335"
            width="960"
            height="185"
            fill={selectedFeatureId === 'hydrothermal-reservoir' ? '#2F1E16' : '#1A1411'}
            stroke={selectedFeatureId === 'hydrothermal-reservoir' ? '#E06D3B' : '#382218'}
            strokeWidth={selectedFeatureId === 'hydrothermal-reservoir' ? '2.5' : '1'}
          />

          {/* Concentrated Reservoir Ambient Thermal Glow */}
          <ellipse cx="490" cy="425" rx="420" ry="85" fill="url(#reservoirHeat)" />
          <rect x="0" y="335" width="960" height="185" fill="url(#fracturePattern)" opacity="0.6" />

          {/* Permeable Fractured Fissure Network */}
          <path
            d="M 340 440 Q 400 410 470 435 Q 530 455 600 420 Q 660 405 700 430"
            stroke="#E06D3B"
            strokeWidth="2.5"
            fill="none"
            strokeDasharray="6 4"
            opacity="0.85"
          />
          <path
            d="M 370 400 Q 430 420 500 395 Q 570 380 630 410 Q 680 440 730 415"
            stroke="#FF7A3D"
            strokeWidth="1.75"
            fill="none"
            strokeDasharray="4 4"
            opacity="0.75"
          />
          <path
            d="M 380 470 Q 450 450 520 475 Q 590 490 660 460"
            stroke="#C95928"
            strokeWidth="2"
            fill="none"
            strokeDasharray="5 4"
            opacity="0.7"
          />

          {/* Convective Hydrodynamic Flow Loop (Reinjection -> Production) */}
          <motion.path
            d="M 380 430 C 440 490, 550 490, 610 440"
            stroke="#FFA67A"
            strokeWidth="2.5"
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

          {/* Directional Flow Chevrons along Convective Loop */}
          <g fill="#FFA67A" opacity="0.8">
            <polygon points="460,470 472,467 465,477" />
            <polygon points="530,477 542,470 535,463" />
          </g>

          {/* Interactive Badge 06 */}
          <circle
            cx="32"
            cy="365"
            r="11"
            fill="#32160C"
            stroke={selectedFeatureId === 'hydrothermal-reservoir' ? '#FF905A' : '#E06D3B'}
            strokeWidth="1.75"
          />
          <text
            x="32"
            y="369"
            textAnchor="middle"
            fill="#E06D3B"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            06
          </text>

          {/* Reservoir Label */}
          <text x="54" y="361" fill="#FFCDB5" fontSize="11" fontWeight="600" fontFamily="sans-serif">
            06 · PERMEABLE HYDROTHERMAL RESERVOIR (2,000 – 3,500M)
          </text>
          <text x="54" y="377" fill="#C98970" fontSize="9.5" fontFamily="monospace">
            180°C – 320°C+ · Naturally fractured basalt &amp; granite · Pressurized mineralized brine
          </text>

          {/* Depth Callout */}
          <text x="940" y="508" textAnchor="end" fill="#9C5A40" fontSize="9" fontFamily="monospace">
            -3,500 M · BASAL RESERVOIR BOUNDARY
          </text>
        </g>

        {/* ========================================================== */}
        {/* STRATA 5: CRYSTALLINE BASEMENT STRATA (Y: 520–630, 3,500–5,000M)*/}
        {/* ========================================================== */}
        <g
          id="layer-basement"
          className="cursor-pointer"
          onClick={() => onSelectFeature('crystalline-basement')}
        >
          <rect
            x="0"
            y="520"
            width="960"
            height="110"
            fill={selectedFeatureId === 'crystalline-basement' ? '#35160E' : '#1C0D08'}
            stroke={selectedFeatureId === 'crystalline-basement' ? '#FF7A3D' : '#3E180E'}
            strokeWidth={selectedFeatureId === 'crystalline-basement' ? '2' : '1'}
          />
          <rect x="0" y="520" width="960" height="110" fill="url(#basementPattern)" opacity="0.6" />

          {/* Upward Conductive Thermal Arrows */}
          <g opacity="0.6" stroke="#FF8C5A" strokeWidth="1.4" fill="none">
            <path d="M 260 610 L 260 550 M 255 560 L 260 550 L 265 560" />
            <path d="M 500 605 L 500 545 M 495 555 L 500 545 L 505 555" />
            <path d="M 740 610 L 740 550 M 735 560 L 740 550 L 745 560" />
          </g>

          {/* Interactive Badge 07 */}
          <circle
            cx="32"
            cy="550"
            r="11"
            fill="#3B140A"
            stroke={selectedFeatureId === 'crystalline-basement' ? '#FFA67A' : '#FF7A3D'}
            strokeWidth="1.75"
          />
          <text
            x="32"
            y="554"
            textAnchor="middle"
            fill="#FF7A3D"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            07
          </text>

          {/* Basement Label */}
          <text x="54" y="546" fill="#FFD1C2" fontSize="11" fontWeight="600" fontFamily="sans-serif">
            07 · CRYSTALLINE BASEMENT STRATA (3,500 – 5,000M)
          </text>
          <text x="54" y="562" fill="#D4866F" fontSize="9.5" fontFamily="monospace">
            320°C – 450°C · Continental granitic basement · Next-gen Enhanced Geothermal (EGS)
          </text>

          {/* Depth Callout */}
          <text x="940" y="618" textAnchor="end" fill="#B05C42" fontSize="9" fontFamily="monospace">
            -5,000 M · DEEP CONTINENTAL CRUST
          </text>
        </g>

        {/* ========================================================== */}
        {/* STRATA 6: DEEP MANTLE HEAT & MAGMATIC ENGINE (Y: 630–720)   */}
        {/* ========================================================== */}
        <g
          id="layer-deep-heat"
          className="cursor-pointer"
          onClick={() => onSelectFeature('deep-heat-source')}
        >
          <rect
            x="0"
            y="630"
            width="960"
            height="90"
            fill={selectedFeatureId === 'deep-heat-source' ? '#4A1509' : '#220804'}
            stroke={selectedFeatureId === 'deep-heat-source' ? '#FF4A1C' : '#561405'}
            strokeWidth={selectedFeatureId === 'deep-heat-source' ? '2.5' : '1'}
          />

          {/* Radiant Mantle Plume Glow */}
          <rect x="0" y="630" width="960" height="90" fill="url(#magmaGlow)" />

          {/* Conduction Heat Wave vectors */}
          <g opacity="0.75" stroke="#FFB08C" strokeWidth="1.5" fill="none">
            <path d="M 380 710 L 380 655 M 374 667 L 380 655 L 386 667" />
            <path d="M 580 710 L 580 655 M 574 667 L 580 655 L 586 667" />
          </g>

          {/* Interactive Badge 08 */}
          <circle
            cx="32"
            cy="660"
            r="11"
            fill="#521307"
            stroke={selectedFeatureId === 'deep-heat-source' ? '#FFD4C2' : '#FF4A1C'}
            strokeWidth="1.75"
          />
          <text
            x="32"
            y="664"
            textAnchor="middle"
            fill="#FF4A1C"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            08
          </text>

          {/* Deep Heat Label */}
          <text x="54" y="656" fill="#FFE2D6" fontSize="11" fontWeight="600" fontFamily="sans-serif">
            08 · DEEP MANTLE HEAT &amp; MAGMATIC ENGINE (&gt;5,000M)
          </text>
          <text x="54" y="672" fill="#E8967D" fontSize="9.5" fontFamily="monospace">
            &gt;400°C – 600°C+ · Inexhaustible 47 TW planetary heat flux · Primordial &amp; radiogenic decay
          </text>

          {/* Depth Callout */}
          <text x="940" y="705" textAnchor="end" fill="#FF8460" fontSize="9" fontFamily="monospace">
            -6,000 M+ · PLANETARY ENGINE (47 TW)
          </text>
        </g>

        {/* ========================================================== */}
        {/* WELLBORE CONVEYANCE: INJECTION & PRODUCTION WELLS          */}
        {/* ========================================================== */}

        {/* INJECTION WELL (04, Left Borehole - Controlled Blue) */}
        <g
          id="injection-well-group"
          className="cursor-pointer"
          onClick={() => onSelectFeature('injection-well')}
        >
          {/* Wellhead Casing Outer Steel */}
          <path
            d="M 470 105 L 380 430"
            stroke={selectedFeatureId === 'injection-well' ? '#93C5FD' : '#1E3A5F'}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Inner Protective Cement Barrier */}
          <path d="M 470 105 L 380 430" stroke="#0D1B2A" strokeWidth="8" />

          {/* Cooled Brine Fluid Column (Blue/Cyan Gradient) */}
          <path d="M 470 105 L 380 430" stroke="url(#injectionFluid)" strokeWidth="4.5" />

          {/* Downward Fluid Flow Dash Animation */}
          <motion.path
            d="M 470 105 L 380 430"
            stroke="#93C5FD"
            strokeWidth="3"
            strokeDasharray="6 8"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    strokeDashoffset: [0, -28],
                  }
            }
            transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
          />

          {/* Downward Fluid Direction Arrows */}
          <g fill="#93C5FD" opacity="0.9">
            <polygon points="440,210 448,220 434,220" />
            <polygon points="410,320 418,330 404,330" />
          </g>

          {/* Downhole Injection Diffuser Screen */}
          <circle cx="380" cy="430" r="7" fill="#3B82F6" />
          <circle
            cx="380"
            cy="430"
            r="16"
            fill="none"
            stroke="#60A5FA"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Interactive Badge 04 & Label */}
          <circle
            cx="418"
            cy="175"
            r="11"
            fill="#0B2035"
            stroke={selectedFeatureId === 'injection-well' ? '#93C5FD' : '#3B82F6'}
            strokeWidth="1.75"
          />
          <text
            x="418"
            y="179"
            textAnchor="middle"
            fill="#60A5FA"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            04
          </text>
          <text
            x="370"
            y="170"
            textAnchor="end"
            fill="#93C5FD"
            fontSize="10"
            fontWeight="600"
            fontFamily="monospace"
          >
            04 · INJECTION WELL (100% REINJECTED)
          </text>
        </g>

        {/* PRODUCTION WELL (05, Right Borehole - Controlled Orange/Red) */}
        <g
          id="production-well-group"
          className="cursor-pointer"
          onClick={() => onSelectFeature('production-well')}
        >
          {/* Wellhead Casing Outer High-Alloy Steel */}
          <path
            d="M 610 440 L 530 105"
            stroke={selectedFeatureId === 'production-well' ? '#FFB08C' : '#6A2A14'}
            strokeWidth="12"
            strokeLinecap="round"
          />
          {/* Inner Protective Cement Barrier */}
          <path d="M 610 440 L 530 105" stroke="#260C05" strokeWidth="8" />

          {/* Superheated Steam/Fluid Column (Vibrant Orange/Red) */}
          <path d="M 610 440 L 530 105" stroke="url(#productionFluid)" strokeWidth="4.5" />

          {/* Upward Fluid Flashing Dash Animation */}
          <motion.path
            d="M 610 440 L 530 105"
            stroke="#FFF2EB"
            strokeWidth="3"
            strokeDasharray="6 8"
            animate={
              shouldReduceMotion
                ? {}
                : {
                    strokeDashoffset: [-28, 0],
                  }
            }
            transition={{ duration: 1.1, repeat: Infinity, ease: 'linear' }}
          />

          {/* Upward Fluid Direction Arrows */}
          <g fill="#FFA67A" opacity="0.9">
            <polygon points="585,340 577,330 591,330" />
            <polygon points="555,230 547,220 561,220" />
          </g>

          {/* Downhole Intake Screen */}
          <circle cx="610" cy="440" r="7" fill="#FF4A1C" />
          <circle
            cx="610"
            cy="440"
            r="16"
            fill="none"
            stroke="#FFA67A"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Interactive Badge 05 & Label */}
          <circle
            cx="578"
            cy="235"
            r="11"
            fill="#361006"
            stroke={selectedFeatureId === 'production-well' ? '#FFD4C2' : '#FF7A3D'}
            strokeWidth="1.75"
          />
          <text
            x="578"
            y="239"
            textAnchor="middle"
            fill="#FF7A3D"
            fontSize="9"
            fontWeight="bold"
            fontFamily="monospace"
          >
            05
          </text>
          <text
            x="600"
            y="230"
            textAnchor="start"
            fill="#FFB08C"
            fontSize="10"
            fontWeight="600"
            fontFamily="monospace"
          >
            05 · PRODUCTION WELL (200°C–320°C+)
          </text>
        </g>

        {/* ========================================================== */}
        {/* MODE 02 DYNAMIC THERMAL DEPTH HIGHLIGHT OVERLAY            */}
        {/* ========================================================== */}
        {activeMode === 'temperature' && (
          <g id="thermal-depth-marker" className="pointer-events-none transition-all duration-300">
            {/* Horizontal Dynamic Scan Line */}
            <line
              x1="0"
              y1={activeThermalY}
              x2="960"
              y2={activeThermalY}
              stroke={activeTempZone.activeColor}
              strokeWidth="2.5"
              strokeDasharray="6 4"
              opacity="0.95"
            />

            {/* Thermal Beam Band Highlight */}
            <rect
              x="0"
              y={Math.max(105, activeThermalY - 35)}
              width="960"
              height="70"
              fill={activeTempZone.activeColor}
              opacity="0.12"
            />

            {/* Depth Marker Bead on Left Margin */}
            <circle cx="25" cy={activeThermalY} r="7" fill={activeTempZone.activeColor} />
            <text
              x="42"
              y={activeThermalY + 4}
              fill={activeTempZone.activeColor}
              fontSize="11"
              fontWeight="bold"
              fontFamily="monospace"
            >
              {temperature}°C · {activeTempZone.techName}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};