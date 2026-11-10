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
  };

  const handleModeChange = (mode: ObservatoryMode) => {
    setActiveMode(mode);
    setMobileSheetOpen(false);
  };

  return (
    <div className="fixed inset-0 w-full h-[100dvh] overflow-hidden bg-[#0B100E] text-[#F0EEE3] flex flex-col font-sans select-none z-50 overscroll-none">
      {/* ========================================================= */}
      {/* 1. TOP HEADER (SCIENTIFIC BRAND & ACTIONS)                */}
      {/* ========================================================= */}
      <header className="h-11 sm:h-12 border-b border-[#1F2722] bg-[#0E1310] px-3 sm:px-5 flex items-center justify-between shrink-0 z-30">
        {/* Left: Brand Identity */}
        <div className="flex items-center space-x-2.5 sm:space-x-3 min-w-0">
          <div className="flex items-center space-x-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
            <h1 className="font-editorial text-sm sm:text-base font-semibold tracking-tight text-[#F0EEE3] uppercase truncate">
              Geothermal Green
            </h1>
          </div>
          <span className="text-[#323E36] font-mono text-xs">/</span>
          <span className="font-mono text-[9px] sm:text-[10px] tracking-widest uppercase text-earth-sage font-semibold truncate hidden xs:inline">
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
              className="px-2.5 sm:px-3 py-1 rounded bg-[#15231B] border border-earth-sage/50 hover:bg-earth-forest text-[#F0EEE3] font-mono text-[9px] sm:text-[10px] tracking-wider transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
              title="Return to full scrolling website"
            >
              <ArrowLeft className="w-3 h-3 text-earth-sage" />
              <span className="font-semibold uppercase">FULL WEBSITE</span>
            </button>
          )}

          <button
            onClick={() => setReferencesOpen(true)}
            className="px-2.5 py-1 rounded bg-[#15231B] border border-earth-sage/40 hover:bg-earth-forest text-earth-sage hover:text-[#F0EEE3] font-mono text-[9px] sm:text-[10px] tracking-wider transition-all flex items-center space-x-1"
            title="Scientific peer-reviewed references"
          >
            <Info className="w-3 h-3" />
            <span className="hidden xs:inline">SOURCES</span>
          </button>
        </div>
      </header>

      {/* ========================================================= */}
      {/* 2. COMPACT INSTRUMENT STATUS & TELEMETRY STRIP            */}
      {/* ========================================================= */}
      <div className="h-7 sm:h-8 border-b border-[#1F2722] bg-[#0A0E0C] px-3 sm:px-5 flex items-center justify-between shrink-0 z-20 text-[9px] sm:text-[10px] font-mono tracking-wider overflow-hidden">
        <div className="flex items-center space-x-2 truncate min-w-0">
          <span className="px-1.5 py-0.5 bg-[#15231B] border border-earth-sage/40 rounded text-earth-sage font-bold uppercase shrink-0">
            {MODES.find((m) => m.id === activeMode)?.index} {MODES.find((m) => m.id === activeMode)?.name}
          </span>
          <span className="text-[#8C9E93] truncate hidden xs:inline">
            {activeMode === 'underground' && 'STRATA & CONVEYANCE PROFILES (0–6,000M)'}
            {activeMode === 'temperature' && `ENTHALPY SPECTRUM: ${temperature}°C · ${activeTempZone.techName}`}
            {activeMode === 'myths' && 'HYPOTHESIS ASSESSMENT & EMPIRICAL GEOLOGY'}
            {activeMode === 'comparison' && 'HEAD-TO-HEAD CLEAN ENERGY LCA'}
          </span>
        </div>

        <div className="flex items-center space-x-2.5 sm:space-x-4 text-[#75887C] shrink-0 font-mono text-[9px]">
          <span className="hidden sm:inline">CRUST: <span className="text-[#A2B5A8]">0 – 6,000M</span></span>
          <span className="text-[#2C3831] hidden sm:inline">|</span>
          <span>PRESSURE: <span className="text-[#A2B5A8]">10 – 35 MPa</span></span>
          <span className="text-[#2C3831] hidden xs:inline">|</span>
          <span className="hidden xs:inline">STATUS: <span className="text-earth-sage">HERMETIC CLOSED LOOP</span></span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. MAIN WORKSPACE (DESKTOP 3-COL / UNIFIED MOBILE VIEW)    */}
      {/* ========================================================= */}
      <main className="flex-1 min-h-0 w-full overflow-hidden flex flex-col md:flex-row relative bg-[#0B100E]">
        {/* ------------------------------------------------------- */}
        {/* DESKTOP LEFT COLUMN: NAVIGATION & TELEMETRY OVERVIEW    */}
        {/* ------------------------------------------------------- */}
        <aside className="hidden md:flex flex-col w-[270px] lg:w-[290px] xl:w-[310px] border-r border-[#1F2722] bg-[#0E1310] shrink-0 p-3 lg:p-3.5 space-y-3 min-h-0 overflow-y-auto scrollbar-none">
          {/* Mode Navigation */}
          <ObservatoryNavigation
            activeMode={activeMode}
            onSelectMode={handleModeChange}
            variant="desktop"
            shouldReduceMotion={shouldReduceMotion}
          />

          {/* Contextual Mode Left Column Content */}
          <div className="flex-1 min-h-0 flex flex-col justify-between space-y-3 pt-1">
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
                    <span>STRATA &amp; CONVEYANCE (8 COMPONENTS)</span>
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
                              ? 'bg-[#15231B] border-earth-sage/60 text-[#F0EEE3] font-medium shadow-sm'
                              : 'bg-[#111714] border-[#1F2722] text-[#7E8F84] hover:text-[#C5D4CB] hover:bg-[#16201A]'
                          }`}
                        >
                          <div className="flex items-center space-x-2 truncate">
                            <span className="font-mono text-[9px] text-earth-sage font-semibold">
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
                    Click any geological stratum or wellbore in the central cross-section to inspect measured thermodynamic parameters.
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

                  <div className="p-2.5 bg-[#111714] border border-[#1F2722] rounded space-y-1.5 text-xs">
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
                      <span className="text-[#F0EEE3]">10°C – 25°C</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1A221C] text-[#7F9185]">
                      <span>BINARY CYCLE (ORC)</span>
                      <span className="text-[#F0EEE3]">100°C – 180°C</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-[#1A221C] text-[#7F9185]">
                      <span>FLASH STEAM TURBINE</span>
                      <span className="text-[#F0EEE3]">180°C – 260°C</span>
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

                  <div className="p-2.5 bg-[#111714] border border-[#1F2722] rounded space-y-1 text-[11px]">
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

                  <div className="p-2 bg-[#111714] border border-[#1F2722] rounded space-y-1 text-[10px] font-mono text-[#829388]">
                    <div className="text-earth-sage font-semibold">ATTRIBUTES ASSESSED</div>
                    <div>1. Annual Capacity Factor (%)</div>
                    <div>2. Lifecycle Carbon Intensity (g CO₂-eq/kWh)</div>
                    <div>3. Surface Footprint (m²/GWh over 30y)</div>
                    <div>4. Rotational Synchronous Inertia</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Reservoir Thermodynamic Parameters */}
            <div className="p-2.5 bg-[#111714] border border-[#1F2722] rounded-lg text-[10px] font-mono text-[#76877D] space-y-1">
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
          className="flex-1 min-w-0 min-h-0 h-full relative flex flex-col items-center justify-between overflow-hidden bg-gradient-to-b from-[#0E1210] to-[#0A0D0B]"
        >
          {/* Central Geological SVG Cross Section (Enlarged Centerpiece) */}
          <div className="w-full flex-1 min-h-0 flex items-center justify-center relative p-1 sm:p-2">
            <GeologicalCrossSection
              activeMode={activeMode}
              selectedFeatureId={selectedFeatureId}
              onSelectFeature={handleSelectFeature}
              temperature={temperature}
              activeTempZone={activeTempZone}
              shouldReduceMotion={shouldReduceMotion}
            />
          </div>

          {/* ======================================================= */}
          {/* INTEGRATED ACTIVE COMPONENT INFORMATION BAR (MOBILE)    */}
          {/* ======================================================= */}
          <div className="w-full md:hidden shrink-0 border-t border-[#1F2722] bg-[#111714] px-3 py-2 z-20">
            <div className="flex items-center justify-between">
              <div className="min-w-0 pr-2">
                <div className="flex items-center space-x-1.5 text-[9px] font-mono text-[#8C9E93]">
                  <span className="w-1.5 h-1.5 rounded-full bg-earth-sage shrink-0" />
                  <span className="px-1.5 py-0.2 bg-[#15231B] border border-earth-sage/30 rounded text-earth-sage uppercase font-semibold shrink-0">
                    {activeMode === 'underground' && activeFeature.category}
                    {activeMode === 'temperature' && 'THERMAL SPECTRUM'}
                    {activeMode === 'myths' && 'HYPOTHESIS CHECK'}
                    {activeMode === 'comparison' && 'LCA BENCHMARK'}
                  </span>
                  <span className="text-[#6C7E74] truncate">
                    {activeMode === 'underground' && activeFeature.depth}
                    {activeMode === 'temperature' && `${temperature}°C`}
                    {activeMode === 'myths' && 'EMPIRICAL GEOLOGY'}
                    {activeMode === 'comparison' && 'g CO₂-eq/kWh'}
                  </span>
                </div>
                <div className="font-editorial text-sm font-medium text-[#F0EEE3] truncate mt-0.5">
                  {activeMode === 'underground' && activeFeature.name}
                  {activeMode === 'temperature' && activeTempZone.techName}
                  {activeMode === 'myths' && 'Scientific Hypotheses'}
                  {activeMode === 'comparison' && 'Clean Energy Lifecycle Benchmark'}
                </div>
              </div>

              <button
                onClick={() => setMobileSheetOpen(true)}
                className="px-2.5 py-1.5 rounded bg-[#15231B] border border-earth-sage/50 text-[#F0EEE3] font-mono text-[9px] tracking-wider uppercase font-semibold flex items-center space-x-1 shrink-0 active:scale-95 transition-all shadow-sm"
              >
                <span>INSPECT</span>
                <ChevronUp className="w-3.5 h-3.5 text-earth-sage" />
              </button>
            </div>
          </div>
        </section>

        {/* ------------------------------------------------------- */}
        {/* DESKTOP RIGHT COLUMN: CONTEXTUAL INTERACTIVE INSPECTOR   */}
        {/* ------------------------------------------------------- */}
        <aside className="hidden md:flex flex-col w-[320px] lg:w-[350px] xl:w-[370px] border-l border-[#1F2722] bg-[#0E1310] shrink-0 p-3 lg:p-3.5 min-h-0 overflow-y-auto scrollbar-none">
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
      {/* 4. MOBILE ANCHORED BOTTOM NAVIGATION BAR                   */}
      {/* ========================================================= */}
      <div className="md:hidden shrink-0 z-40 w-full bg-[#0E1310]">
        <ObservatoryNavigation
          activeMode={activeMode}
          onSelectMode={handleModeChange}
          variant="mobile"
          shouldReduceMotion={shouldReduceMotion}
        />
      </div>

      {/* ========================================================= */}
      {/* 5. MOBILE BOTTOM SHEET INSPECTOR                           */}
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
      {/* 6. SCIENTIFIC REFERENCES MODAL                             */}
      {/* ========================================================= */}
      <ReferencesModal
        isOpen={referencesOpen}
        onClose={() => setReferencesOpen(false)}
      />
    </div>
  );
};