import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Flame,
  HelpCircle,
  BarChart3,
  Info,
  Layers,
  ChevronUp,
  ArrowLeft,
} from 'lucide-react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import {
  ObservatoryMode,
  GEOLOGICAL_FEATURES,
  TEMPERATURE_ZONES,
  TemperatureZone,
} from '../../data/observatoryData';
import { GeologicalCrossSection } from './GeologicalCrossSection';
import { UndergroundExplorerPanel } from './UndergroundExplorerPanel';
import { TemperatureControls } from './TemperatureControls';
import { MythRealityPanel } from './MythRealityPanel';
import { EnergyComparisonPanel } from './EnergyComparisonPanel';
import { ObservatoryNavigation, MODES } from './ObservatoryNavigation';
import { SubsurfaceBottomSheet } from './SubsurfaceBottomSheet';
import { ReferencesModal } from '../sections/ReferencesModal';

interface ObservatoryShellProps {
  onOpenArchive?: () => void;
}

export const ObservatoryShell: React.FC<ObservatoryShellProps> = ({ onOpenArchive }) => {
  const shouldReduceMotion = useReducedMotionPreference();

  // Shared Observatory State
  const [activeMode, setActiveMode] = useState<ObservatoryMode>('underground');
  const [selectedFeatureId, setSelectedFeatureId] = useState<string>('hydrothermal-reservoir');
  const [temperature, setTemperature] = useState<number>(150);
  const [mobileSheetOpen, setMobileSheetOpen] = useState<boolean>(false);
  const [referencesOpen, setReferencesOpen] = useState<boolean>(false);

  // Derived Temperature Zone
  const getActiveZone = (temp: number): TemperatureZone => {
    if (temp < 60) return TEMPERATURE_ZONES[0];
    if (temp < 180) return TEMPERATURE_ZONES[1];
    if (temp < 260) return TEMPERATURE_ZONES[2];
    if (temp < 374) return TEMPERATURE_ZONES[3];
    return TEMPERATURE_ZONES[4];
  };

  const activeTempZone = getActiveZone(temperature);
  const activeFeature =
    GEOLOGICAL_FEATURES.find((f) => f.id === selectedFeatureId) || GEOLOGICAL_FEATURES[0];

  const handleSelectFeature = (id: string) => {
    setSelectedFeatureId(id);
    // On mobile, auto-open bottom sheet when a feature is selected
    if (window.innerWidth < 768) {
      setMobileSheetOpen(true);
    }
  };

  const handleModeChange = (mode: ObservatoryMode) => {
    setActiveMode(mode);
    setMobileSheetOpen(false);
  };

  return (
    <div className="relative w-full h-screen h-[100dvh] max-h-[100dvh] overflow-hidden bg-[#0C0D0B] text-[#F3F0E6] flex flex-col font-sans select-none">
      {/* ========================================================= */}
      {/* 1. TOP HEADER (COMPACT APPLICATION APPARATUS)             */}
      {/* ========================================================= */}
      <header className="h-11 sm:h-12 border-b border-[#1E2621] bg-[#0E1310]/95 backdrop-blur-md px-3 sm:px-5 flex items-center justify-between shrink-0 z-30">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-earth-sage shadow-[0_0_8px_#8BAF91]" />
            <h1 className="font-editorial text-sm sm:text-base font-semibold tracking-tight text-white uppercase truncate">
              Geothermal Green
            </h1>
          </div>
          <span className="text-[#323E36] font-mono text-xs">/</span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-earth-sage/90 font-semibold truncate hidden xs:inline">
            Subsurface Observatory
          </span>
        </div>

        {/* Center: Live Subterranean Telemetry (Desktop Only) */}
        <div className="hidden lg:flex items-center space-x-4 text-[10px] font-mono tracking-wider text-[#798A80]">
          <div className="flex items-center space-x-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span className="text-[#A2B5A8]">47 TW PLANETARY HEAT FLUX</span>
          </div>
          <span className="text-[#2C3831]">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-earth-sage font-medium">&gt;92% BASELOAD AVAILABILITY</span>
          </div>
          <span className="text-[#2C3831]">|</span>
          <div className="flex items-center space-x-1.5">
            <span className="text-[#A2B5A8]">0.0% VENTING (CLOSED-LOOP)</span>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center space-x-2 shrink-0">
          {onOpenArchive && (
            <button
              onClick={onOpenArchive}
              className="px-2.5 sm:px-3 py-1 rounded bg-[#16201A] border border-earth-sage/50 hover:bg-earth-forest text-earth-ivory font-mono text-[9px] sm:text-[10px] tracking-wider transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
              title="Return to full scrolling website"
            >
              <ArrowLeft className="w-3 h-3 text-earth-sage" />
              <span className="font-semibold uppercase">FULL WEBSITE</span>
            </button>
          )}

          <button
            onClick={() => setReferencesOpen(true)}
            className="px-2.5 py-1 rounded bg-[#18241D] border border-earth-sage/40 hover:bg-earth-forest text-earth-sage hover:text-white font-mono text-[9px] sm:text-[10px] tracking-wider transition-all flex items-center space-x-1"
            title="Scientific peer-reviewed references"
          >
            <Info className="w-3 h-3" />
            <span className="hidden xs:inline">SOURCES</span>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. MAIN SINGLE-VIEWPORT WORKSPACE (DESKTOP 3-COL / MOBILE) */}
      {/* ========================================================= */}
      <main className="flex-1 min-h-0 w-full overflow-hidden flex flex-col md:flex-row relative">
        {/* ------------------------------------------------------- */}
        {/* DESKTOP LEFT COLUMN: NAVIGATION & TELEMETRY OVERVIEW    */}
        {/* ------------------------------------------------------- */}
        <aside className="hidden md:flex flex-col w-[270px] lg:w-[290px] xl:w-[310px] border-r border-[#1B231D] bg-[#0E1310] shrink-0 p-3 lg:p-3.5 space-y-3.5 min-h-0 overflow-y-auto scrollbar-none">
          {/* Mode Navigation */}
          <ObservatoryNavigation
            activeMode={activeMode}
            onSelectMode={handleModeChange}
            variant="desktop"
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Contextual Mode Assistant Box */}
          <div className="flex-1 min-h-0 flex flex-col justify-between space-y-3 pt-1">
            {/* Mode-specific Left Panel Content */}
            <AnimatePresence mode="wait">
              {activeMode === 'underground' && (
                <motion.div
                  key="left-underground"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center space-x-1.5 text-earth-sage font-mono text-[9px] tracking-widest uppercase font-semibold">
                    <Layers className="w-3 h-3" />
                    <span>STRATA PROFILE (0–6,000M)</span>
                  </div>

                  <div className="space-y-1">
                    {GEOLOGICAL_FEATURES.map((feat, idx) => {
                      const isSel = feat.id === selectedFeatureId;
                      return (
                        <button
                          key={feat.id}
                          onClick={() => handleSelectFeature(feat.id)}
                          className={`w-full text-left px-2.5 py-1.5 rounded border transition-all text-xs flex items-center justify-between ${
                            isSel
                              ? 'bg-[#18251E] border-earth-sage/60 text-white font-medium'
                              : 'bg-[#121614] border-[#1D2520] text-[#7E8F84] hover:text-[#C5D4CB] hover:bg-[#161B18]'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span className="font-mono text-[9px] text-earth-sage/90">
                              0{idx + 1}
                            </span>
                            <span className="truncate">{feat.name}</span>
                          </div>
                          <span className="font-mono text-[8px] text-[#63746A] shrink-0 ml-1">
                            {feat.depth.split(' ')[0]}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <p className="font-sans text-[11px] text-[#8C9E92] leading-relaxed pt-1">
                    Click any geological layer or subterranean wellbore in the central cross-section to inspect measured thermodynamic parameters.
                  </p>
                </motion.div>
              )}

              {activeMode === 'temperature' && (
                <motion.div
                  key="left-temperature"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center space-x-1.5 text-earth-sage font-mono text-[9px] tracking-widest uppercase font-semibold">
                    <Flame className="w-3 h-3" />
                    <span>THERMODYNAMIC EQUILIBRIUM</span>
                  </div>

                  <div className="p-2.5 bg-[#141B16] border border-[#212C24] rounded space-y-1.5 text-xs">
                    <div className="font-mono text-[9px] text-earth-sage uppercase">
                      GEOTHERMAL GRADIENT
                    </div>
                    <p className="font-sans text-[11px] text-[#A6B7AC] leading-relaxed">
                      Crustal temperatures increase by ~25°C to 30°C per kilometer of depth in continental shields, and &gt;100°C/km in volcanic rift zones.
                    </p>
                  </div>

                  <div className="space-y-1 text-[11px] font-mono">
                    <div className="flex justify-between py-1 border-b border-[#1A221C] text-[#7F9185]">
                      <span>SHALLOW GEO-EXCHANGE</span>
                      <span className="text-white">10°C – 25°C</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1A221C] text-[#7F9185]">
                      <span>BINARY CYCLE (ORC)</span>
                      <span className="text-white">100°C – 180°C</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1A221C] text-[#7F9185]">
                      <span>FLASH STEAM TURBINE</span>
                      <span className="text-white">180°C – 260°C</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1A221C] text-[#7F9185]">
                      <span>SUPERCRITICAL FLUID</span>
                      <span className="text-[#FF4A1C]">&gt;374°C</span>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeMode === 'myths' && (
                <motion.div
                  key="left-myths"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center space-x-1.5 text-earth-sage font-mono text-[9px] tracking-widest uppercase font-semibold">
                    <HelpCircle className="w-3 h-3" />
                    <span>SCIENTIFIC VERIFICATION</span>
                  </div>

                  <p className="font-sans text-[11px] text-[#A2B4A8] leading-relaxed">
                    Evaluating public perceptions against empirical geology, peer-reviewed thermodynamics, and international energy benchmarks.
                  </p>

                  <div className="p-2.5 bg-[#141B16] border border-[#212C24] rounded space-y-1 text-[11px]">
                    <div className="font-mono text-[9px] text-earth-sage uppercase">
                      STANDARDS BENCHMARKED
                    </div>
                    <div className="text-[#7F9185] space-y-0.5 font-mono text-[9px]">
                      <div>· IEA Geothermal Clean Energy Series</div>
                      <div>· NREL LCA Harmonization Study</div>
                      <div>· US DOE GeoVision Technology Analysis</div>
                    </div>
                  </div>
                </motion.div>
              )}

              {activeMode === 'comparison' && (
                <motion.div
                  key="left-comparison"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-2.5"
                >
                  <div className="flex items-center space-x-1.5 text-earth-sage font-mono text-[9px] tracking-widest uppercase font-semibold">
                    <BarChart3 className="w-3 h-3" />
                    <span>LCA BENCHMARK METHODOLOGY</span>
                  </div>

                  <p className="font-sans text-[11px] text-[#A2B4A8] leading-relaxed">
                    Head-to-head metrics evaluate lifecycle cradle-to-grave emissions, physical land footprints, and real-world capacity factors across generation types.
                  </p>

                  <div className="p-2 bg-[#141B16] border border-[#212C24] rounded space-y-1 text-[10px] font-mono text-[#829388]">
                    <div className="text-earth-sage font-semibold">ATTRIBUTES ASSESSED</div>
                    <div>1. Annual Capacity Factor (%)</div>
                    <div>2. Lifecycle Carbon Intensity (g CO₂/kWh)</div>
                    <div>3. Surface Footprint (m²/GWh over 30y)</div>
                    <div>4. Rotational Synchronous Inertia</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reservoir Thermodynamic Parameters */}
            <div className="p-2.5 bg-[#121814] border border-[#1E2721] rounded-lg text-[10px] font-mono text-[#76877D] space-y-1">
              <div className="flex items-center justify-between text-earth-sage font-semibold">
                <span>RESERVOIR EQUILIBRIUM</span>
                <span className="text-[#A2B5A8]">MASS BALANCED</span>
              </div>
              <div className="flex justify-between">
                <span>HYDROSTATIC FLOW</span>
                <span className="text-[#A2B5A8]">100% REINJECTION</span>
              </div>
              <div className="flex justify-between">
                <span>SURFACE CONTAINMENT</span>
                <span className="text-[#A2B5A8]">HERMETIC</span>
              </div>
            </div>
          </div>
        </aside>

        {/* ------------------------------------------------------- */}
        {/* CENTER COLUMN: INTERACTIVE GEOLOGICAL CROSS-SECTION     */}
        {/* ------------------------------------------------------- */}
        <section
          aria-label="Interactive Subterranean Cross-Section"
          className="flex-1 min-w-0 min-h-0 h-full relative flex flex-col items-center justify-center p-1 sm:p-2 lg:p-3 overflow-hidden bg-gradient-to-b from-[#0E1210] to-[#0A0D0B]"
        >
          {/* Active Mode Mobile Indicator Bar (Mobile Only) */}
          <div className="w-full flex md:hidden items-center justify-between px-2 pt-1 pb-1 z-20 text-[9px] font-mono text-[#7C8B82]">
            <div className="flex items-center space-x-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-earth-sage" />
              <span className="text-white font-semibold uppercase">
                {MODES.find((m) => m.id === activeMode)?.name}
              </span>
            </div>
            <span className="text-earth-sage">TAP ANY COMPONENT TO INSPECT</span>
          </div>

          {/* Central Geological SVG Cross Section (Permanently Mounted) */}
          <div className="w-full h-full flex items-center justify-center min-h-0 relative">
            <GeologicalCrossSection
              activeMode={activeMode}
              selectedFeatureId={selectedFeatureId}
              onSelectFeature={handleSelectFeature}
              temperature={temperature}
              activeTempZone={activeTempZone}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>

          {/* Mobile Bottom Quick Action Pill Floating Over Center */}
          <div className="w-full md:hidden px-3 pb-2 z-20">
            <div className="bg-[#121915]/90 backdrop-blur-md border border-[#243329] rounded-xl p-2.5 flex items-center justify-between shadow-xl">
              <div className="min-w-0 pr-2">
                <div className="text-[9px] font-mono text-earth-sage uppercase">
                  {activeMode === 'underground' && 'Active Component'}
                  {activeMode === 'temperature' && `${temperature}°C Subsurface`}
                  {activeMode === 'myths' && 'Hypothesis Challenge'}
                  {activeMode === 'comparison' && 'Head-to-Head LCA'}
                </div>
                <div className="font-editorial text-sm font-medium text-white truncate">
                  {activeMode === 'underground' && activeFeature.name}
                  {activeMode === 'temperature' && activeTempZone.techName}
                  {activeMode === 'myths' && '4 Scientific Hypotheses'}
                  {activeMode === 'comparison' && 'Clean Energy LCA Benchmark'}
                </div>
              </div>

              <button
                onClick={() => setMobileSheetOpen(true)}
                className="px-3 py-1.5 rounded-lg bg-earth-forest border border-earth-sage/50 text-earth-ivory font-mono text-[10px] tracking-wider uppercase font-semibold flex items-center space-x-1 shrink-0 active:scale-95 transition-all shadow-md"
              >
                <span>DETAILS</span>
                <ChevronUp className="w-3.5 h-3.5 text-earth-sage" />
              </button>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- */}
        {/* DESKTOP RIGHT COLUMN: CONTEXTUAL INTERACTIVE INSPECTOR   */}
        {/* ------------------------------------------------------- */}
        <aside className="hidden md:flex flex-col w-[320px] lg:w-[350px] xl:w-[370px] border-l border-[#1B231D] bg-[#0F1411] shrink-0 p-3 lg:p-3.5 min-h-0 overflow-y-auto scrollbar-none">
          <AnimatePresence mode="wait">
            {activeMode === 'underground' && (
              <motion.div
                key="right-underground"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col min-h-0"
              >
                <UndergroundExplorerPanel
                  selectedFeatureId={selectedFeatureId}
                  onSelectFeature={setSelectedFeatureId}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.div>
            )}

            {activeMode === 'temperature' && (
              <motion.div
                key="right-temperature"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col min-h-0"
              >
                <TemperatureControls
                  temperature={temperature}
                  onTemperatureChange={setTemperature}
                  activeZone={activeTempZone}
                  shouldReduceMotion={shouldReduceMotion}
                />
              </motion.div>
            )}

            {activeMode === 'myths' && (
              <motion.div
                key="right-myths"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col min-h-0"
              >
                <MythRealityPanel shouldReduceMotion={shouldReduceMotion} />
              </motion.div>
            )}

            {activeMode === 'comparison' && (
              <motion.div
                key="right-comparison"
                initial={{ opacity: 0, x: shouldReduceMotion ? 0 : 8 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: shouldReduceMotion ? 0 : -8 }}
                transition={{ duration: 0.25 }}
                className="h-full flex flex-col min-h-0"
              >
                <EnergyComparisonPanel shouldReduceMotion={shouldReduceMotion} />
              </motion.div>
            )}
          </AnimatePresence>
        </aside>
      </main>

      {/* ========================================================= */}
      {/* 3. MOBILE FIXED BOTTOM NAVIGATION BAR                      */}
      {/* ========================================================= */}
      <div className="md:hidden shrink-0 z-40">
        <ObservatoryNavigation
          activeMode={activeMode}
          onSelectMode={handleModeChange}
          variant="mobile"
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>

      {/* ========================================================= */}
      {/* 4. MOBILE BOTTOM SHEET INSPECTOR                           */}
      {/* ========================================================= */}
      <SubsurfaceBottomSheet
        isOpen={mobileSheetOpen}
        onClose={() => setMobileSheetOpen(false)}
        title={
          activeMode === 'underground'
            ? activeFeature.name
            : activeMode === 'temperature'
            ? `${temperature}°C — ${activeTempZone.techName}`
            : activeMode === 'myths'
            ? 'Hypothesis Challenge'
            : 'Energy Comparison'
        }
        category={
          activeMode === 'underground'
            ? activeFeature.category
            : activeMode === 'temperature'
            ? activeTempZone.category
            : undefined
        }
        depthOrTag={
          activeMode === 'underground'
            ? activeFeature.depth
            : activeMode === 'temperature'
            ? activeTempZone.depthEst
            : undefined
        }
        shouldReduceMotion={shouldReduceMotion}
      >
        {activeMode === 'underground' && (
          <UndergroundExplorerPanel
            selectedFeatureId={selectedFeatureId}
            onSelectFeature={setSelectedFeatureId}
            shouldReduceMotion={shouldReduceMotion}
          />
        )}
        {activeMode === 'temperature' && (
          <TemperatureControls
            temperature={temperature}
            onTemperatureChange={setTemperature}
            activeZone={activeTempZone}
            shouldReduceMotion={shouldReduceMotion}
          />
        )}
        {activeMode === 'myths' && (
          <MythRealityPanel shouldReduceMotion={shouldReduceMotion} />
        )}
        {activeMode === 'comparison' && (
          <EnergyComparisonPanel shouldReduceMotion={shouldReduceMotion} />
        )}
      </SubsurfaceBottomSheet>

      {/* ========================================================= */}
      {/* 5. SCIENTIFIC REFERENCES MODAL                             */}
      {/* ========================================================= */}
      <ReferencesModal
        isOpen={referencesOpen}
        onClose={() => setReferencesOpen(false)}
      />
    </div>
  );
};
