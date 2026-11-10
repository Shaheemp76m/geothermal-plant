export type ObservatoryMode = 'underground' | 'temperature' | 'myths' | 'comparison';

export interface GeologicalFeature {
  id: string;
  name: string;
  depth: string;
  temperature: string;
  category: 'SURFACE' | 'OVERBURDEN' | 'CONVEYANCE' | 'RESERVOIR' | 'BASEMENT' | 'HEAT SOURCE';
  headline: string;
  description: string;
  physicsDetail: string;
  specs: { label: string; value: string }[];
  highlightRegion: {
    yStart: number;
    yEnd: number;
    color: string;
  };
}

export const GEOLOGICAL_FEATURES: GeologicalFeature[] = [
  {
    id: 'surface-plant',
    name: 'Surface Power Plant & Shallow Aquifer',
    depth: '0 – 100 meters (Surface)',
    temperature: 'Ambient (10°C – 25°C)',
    category: 'SURFACE',
    headline: 'High-Efficiency Thermodynamic Conversion Hall',
    description:
      'Houses synchronous steam turbines or binary Organic Rankine Cycle heat exchangers. Vapor expansion drives generators producing clean baseload electricity for the regional transmission grid while strictly isolating the shallow potable water table.',
    physicsDetail:
      'Turbine exhaust steam is condensed via air-cooled condenser arrays or cooling towers. 100% of the cooled geothermal brine is directed immediately into the reinjection manifold in a closed, hermetically sealed hydraulic circuit.',
    specs: [
      { label: 'CONVERSION CYCLE', value: 'Closed-Loop Organic Rankine / Flash Steam' },
      { label: 'GRID INERTIA', value: 'Physical Rotating Synchronous Inertia' },
      { label: 'ATMOSPHERIC VENTING', value: '0.0% Operational Gas Release (Closed Loop)' },
      { label: 'CAPACITY FACTOR', value: '>92% Dispatchable Baseload' }
    ],
    highlightRegion: { yStart: 10, yEnd: 110, color: '#8BAF91' }
  },
  {
    id: 'sedimentary-overburden',
    name: 'Sedimentary Overburden Strata',
    depth: '100 – 1,200 meters',
    temperature: '25°C – 60°C',
    category: 'OVERBURDEN',
    headline: 'Porous Bedding Sequences & Groundwater Isolation',
    description:
      'Interbedded sandstone, siltstone, and mudstone formations deposited across geological epochs. Acts as a protective geological buffer between shallow surface hydrological systems and deeper geothermal regimes.',
    physicsDetail:
      'Multi-layer casing strings with pressurized cement sheaths physically decouple the circulating geothermal wellbore fluids from potable groundwater reservoirs in this interval.',
    specs: [
      { label: 'STRATA COMPOSITION', value: 'Sandstone, Siltstone, Alluvial Clays' },
      { label: 'AQUIFER ISOLATION', value: 'Dual-Barrier Cemented Steel Casing' },
      { label: 'THERMAL CONDUCTIVITY', value: '1.5 – 2.2 W/(m·K)' },
      { label: 'PRESSURE GRADIENT', value: 'Hydrostatic (~9.8 kPa/meter)' }
    ],
    highlightRegion: { yStart: 110, yEnd: 215, color: '#3A423B' }
  },
  {
    id: 'impermeable-caprock',
    name: 'Impermeable Caprock Shale Seal',
    depth: '1,200 – 2,000 meters',
    temperature: '60°C – 120°C',
    category: 'OVERBURDEN',
    headline: 'Natural Thermal Insulation & Hydrostatic Seal',
    description:
      'Dense, low-permeability sedimentary shale and clay formations that prevent deep hydrothermal fluids from escaping upward to the surface, creating natural high-pressure containment.',
    physicsDetail:
      'Acts as a geological thermal blanket with extremely low hydraulic conductivity (<10⁻¹² m/s), trapping thermal enthalpy beneath and isolating shallow freshwater aquifers.',
    specs: [
      { label: 'HYDRAULIC CONDUCTIVITY', value: '< 10⁻¹² m/s (Impermeable)' },
      { label: 'THERMAL CONDUCTIVITY', value: '1.2 – 1.8 W/(m·K)' },
      { label: 'AQUIFER PROTECTION', value: 'Multi-Barrier Cemented Steel Casing' },
      { label: 'FORMATION AGE', value: 'Cenozoic – Mesozoic Marine Strata' }
    ],
    highlightRegion: { yStart: 215, yEnd: 335, color: '#4A574E' }
  },
  {
    id: 'injection-well',
    name: 'Closed-Loop Injection Wellbore',
    depth: '0 – 3,200 meters',
    temperature: '65°C – 95°C (Cooled Brine)',
    category: 'CONVEYANCE',
    headline: 'Sustainable Subterranean Pressure Restoration',
    description:
      'High-grade carbon steel borehole lined with multiple cemented casings. Transports 100% of cooled brine back into the deep reservoir to maintain hydrostatic equilibrium.',
    physicsDetail:
      'Reinjection preserves reservoir pressure, prevents surface subsidence, and creates a continuous hydrodynamic circulation loop that re-heats fluid through contact with bedrock.',
    specs: [
      { label: 'REINJECTION RATIO', value: '100% Mass Conserved' },
      { label: 'WELL INTEGRITY', value: 'Triple-Casing API Class G Cement' },
      { label: 'DOWNHOLE PRESSURE', value: '12 – 22 Megapascals' },
      { label: 'FLUID MEDIUM', value: 'Degassed Mineralized Brine' }
    ],
    highlightRegion: { yStart: 110, yEnd: 520, color: '#5B8C7B' }
  },
  {
    id: 'production-well',
    name: 'Pressurized Production Wellbore',
    depth: '0 – 3,500 meters',
    temperature: '180°C – 320°C (Thermal Fluid)',
    category: 'CONVEYANCE',
    headline: 'High-Velocity Hydrodynamic Energy Extraction',
    description:
      'Borehole engineered with corrosion-resistant titanium or chrome alloys that channels superheated subterranean fluid and steam upwards to the surface turbine generators.',
    physicsDetail:
      'Subsurface pressure differential and two-phase flashing lift propel thermal fluid upwards at 15–40 m/s without mechanical downhole pumps in high-enthalpy fields, governed by natural buoyancy and depressurization kinetics.',
    specs: [
      { label: 'FLOW RATE', value: '80 – 250 kg/second' },
      { label: 'CASING ALLOY', value: 'L-80 / 13Cr Corrosion Resistant' },
      { label: 'WELLHEAD PRESSURE', value: '0.8 – 2.5 MPa (Flash Steam)' },
      { label: 'OPERATIONAL LIFE', value: '30 – 50 Years per Wellbore' }
    ],
    highlightRegion: { yStart: 110, yEnd: 520, color: '#C97A4A' }
  },
  {
    id: 'hydrothermal-reservoir',
    name: 'Permeable Hydrothermal Reservoir',
    depth: '2,000 – 3,500 meters',
    temperature: '200°C – 340°C',
    category: 'RESERVOIR',
    headline: 'Fractured High-Enthalpy Geothermal Aquifer',
    description:
      'Naturally fractured volcanic basalt, andesite, or granitic bedrock saturated with superheated mineralized brine circulating under massive tectonic confining pressures.',
    physicsDetail:
      'Thermal conduction from deeper magma bodies heats reservoir fluid through an extensive network of natural fissures, creating convective heat transfer cells.',
    specs: [
      { label: 'POROSITY / PERMEABILITY', value: '5 – 15% / 10 – 100 Millidarcies' },
      { label: 'ENTHALPY RATING', value: '1,200 – 2,400 kJ/kg' },
      { label: 'MINERAL CONTENT', value: 'Silica, Sodium, Potassium, Trace Lithium' },
      { label: 'RECHARGE RATE', value: 'Decades to Millennia Natural Balance' }
    ],
    highlightRegion: { yStart: 335, yEnd: 520, color: '#A04D2D' }
  },
  {
    id: 'crystalline-basement',
    name: 'Crystalline Basement Strata',
    depth: '3,500 – 5,000 meters',
    temperature: '320°C – 450°C',
    category: 'BASEMENT',
    headline: 'Deep Impermeable Crystalline Continental Crust',
    description:
      'Dense granitic and metamorphic basement rocks with minimal natural porosity. Target of next-generation Enhanced Geothermal Systems (EGS) utilizing controlled permeability enhancement.',
    physicsDetail:
      'Thermal conduction through crystalline rock transfers massive thermal energy from deep magmatic and mantle heat upward toward permeable hydrothermal reservoirs.',
    specs: [
      { label: 'ROCK MATRIX', value: 'Granite, Granodiorite, Gneiss' },
      { label: 'HEAT TRANSFER', value: 'Dominantly Conductive (~2.8 W/m·K)' },
      { label: 'EGS POTENTIAL', value: 'Closed-Loop Supercritical Harvesting' },
      { label: 'STRESS REGIME', value: 'Tectonic Strike-Slip / Extensional' }
    ],
    highlightRegion: { yStart: 520, yEnd: 630, color: '#7E361D' }
  },
  {
    id: 'deep-heat-source',
    name: 'Deep Mantle Heat & Magmatic Engine',
    depth: '5,000 – 6,000+ meters',
    temperature: '400°C – 600°C+',
    category: 'HEAT SOURCE',
    headline: 'Inexhaustible Primordial & Radiogenic Thermal Engine',
    description:
      'Deep continental root continuously energized by conductive heat transfer from Earth’s mantle and the radioactive decay of uranium, thorium, and potassium isotopes.',
    physicsDetail:
      'Represents Earth’s internal thermodynamic engine. Global crustal heat flux totals 47 Terawatts—conductive heat flow that has operated uninterrupted for 4.5 billion years.',
    specs: [
      { label: 'PLANETARY CORE HEAT', value: '4,000°C – 6,000°C Origin' },
      { label: 'GLOBAL HEAT FLUX', value: '47 Terawatts Continuous Outflow' },
      { label: 'HEAT MECHANISM', value: 'Primordial Accretion + Isotope Decay' },
      { label: 'DEPLETION RISK', value: 'Zero (Planetary Timescale Thermal Mass)' }
    ],
    highlightRegion: { yStart: 630, yEnd: 720, color: '#D95C32' }
  }
];

export interface TemperatureZone {
  temp: number;
  label: string;
  techName: string;
  category: string;
  depthEst: string;
  cycle: string;
  efficiency: string;
  applications: string;
  activeColor: string;
  glowIntensity: string;
}

export const TEMPERATURE_ZONES: TemperatureZone[] = [
  {
    temp: 20,
    label: '10°C – 25°C',
    techName: 'Ground-Source Heat Pumps',
    category: 'Shallow Crustal Geo-Exchange',
    depthEst: '50 – 200 meters',
    cycle: 'Closed-loop vapor-compression refrigeration',
    efficiency: 'COP 4.0 – 5.0 (400% – 500% Seasonal Efficiency)',
    applications: 'Direct residential HVAC, commercial district heating, greenhouse cooling',
    activeColor: '#688B77',
    glowIntensity: 'rgba(104, 139, 119, 0.4)'
  },
  {
    temp: 130,
    label: '100°C – 180°C',
    techName: 'Binary Cycle (ORC) Plants',
    category: 'Moderate-Enthalpy Hydrothermal',
    depthEst: '1,500 – 2,500 meters',
    cycle: 'Hermetic Organic Rankine Cycle (isopentane / butane working fluid)',
    efficiency: '10% – 14% Net Cycle Conversion · 100% Brine Reinjection',
    applications: 'Grid-connected baseload electricity, industrial process drying, district networks',
    activeColor: '#D4A359',
    glowIntensity: 'rgba(212, 163, 89, 0.5)'
  },
  {
    temp: 220,
    label: '180°C – 260°C',
    techName: 'Flash Steam Power Plants',
    category: 'High-Enthalpy Pressurized Liquid',
    depthEst: '2,000 – 3,500 meters',
    cycle: 'Cyclone depressurization flashing with multi-stage condensing turbines',
    efficiency: '15% – 20% Thermal Conversion · >92% Capacity Factor',
    applications: 'Large-scale regional grid power generation (50 MW – 300+ MW utility stations)',
    activeColor: '#E06D3B',
    glowIntensity: 'rgba(224, 109, 59, 0.65)'
  },
  {
    temp: 320,
    label: 'Above 260°C',
    techName: 'Dry Steam & Superheated Vapor',
    category: 'Rare Natural Vapor Vents',
    depthEst: '2,500 – 4,000 meters',
    cycle: 'Direct natural steam expansion through low-pressure turbines',
    efficiency: 'Highest energy density per wellbore · 95%+ Availability',
    applications: 'High-inertia transmission grid frequency support (The Geysers, Larderello)',
    activeColor: '#E84528',
    glowIntensity: 'rgba(232, 69, 40, 0.8)'
  },
  {
    temp: 400,
    label: 'Above 374°C',
    techName: 'Supercritical Next-Gen EGS',
    category: 'Supercritical Subterranean Fluid',
    depthEst: '4,500 – 6,000+ meters',
    cycle: 'Supercritical water extraction (>22.1 MPa pressure, phase-boundary-free)',
    efficiency: 'Up to 10× electrical energy density per single borehole',
    applications: 'Omnipresent continental deep baseload generation anywhere on Earth',
    activeColor: '#FF3B1D',
    glowIntensity: 'rgba(255, 59, 29, 0.95)'
  }
];

export interface MythQuestion {
  id: string;
  number: string;
  statement: string;
  isMyth: boolean; // true = Myth, false = Reality
  verdictTitle: string;
  scientificExplanation: string;
  source: string;
  keyMetric: { label: string; value: string };
}

export const MYTH_QUESTIONS: MythQuestion[] = [
  {
    id: 'depletion',
    number: '01',
    statement: 'Geothermal energy will eventually deplete Earth’s core heat and cool down the planet.',
    isMyth: true,
    verdictTitle: 'SCIENTIFIC MYTH',
    scientificExplanation:
      'Earth’s planetary heat outflow (~47 Terawatts) is driven by primordial heat from planetary accretion combined with continuous radiogenic decay of long-lived isotopes (Uranium, Thorium, Potassium-40) concentrated in the mantle and crust. Earth has cooled by less than 500°C over 4.5 billion years. Total annual human primary energy consumption is less than 0.4% of this planetary heat outflow, rendering regional geothermal extraction imperceptible to Earth’s thermal budget.',
    source: 'International Energy Agency (IEA) Geothermal Global Report',
    keyMetric: { label: 'PLANETARY HEAT OUTFLOW', value: '47 Terawatts Continuous' }
  },
  {
    id: 'emissions',
    number: '02',
    statement: 'Modern closed-loop binary geothermal power plants emit virtually zero toxic gases into the atmosphere.',
    isMyth: false,
    verdictTitle: 'PROVEN REALITY',
    scientificExplanation:
      'Binary cycle facilities operate in 100% hermetically sealed circuits. Hot geothermal brine transfers thermal energy to a secondary organic fluid through a closed heat exchanger. The brine is never exposed to the atmosphere and is 100% reinjected deep underground, producing median lifecycle emissions of only ~38 g CO₂-eq/kWh—comparable to wind and solar PV.',
    source: 'National Renewable Energy Laboratory (NREL) LCA Harmonization',
    keyMetric: { label: 'OPERATIONAL VENTING', value: '0.0 g / kWh (100% Reinjected)' }
  },
  {
    id: 'intermittent',
    number: '03',
    statement: 'Geothermal energy is intermittent like solar and wind, requiring chemical battery storage for cloudy days.',
    isMyth: true,
    verdictTitle: 'SCIENTIFIC MYTH',
    scientificExplanation:
      'Geothermal is continuous, weather-independent baseload power with an industry-leading capacity factor of 90%–95%. Because Earth’s mantle heat flows 24 hours a day, 365 days a year, geothermal power stations do not require battery storage, backup gas peakers, or favorable weather to deliver reliable electricity.',
    source: 'US Department of Energy (DOE) GeoVision Report',
    keyMetric: { label: 'ANNUAL CAPACITY FACTOR', value: '92% – 95% Baseload' }
  },
  {
    id: 'land-use',
    number: '04',
    statement: 'Geothermal power facilities require more surface land footprint than utility-scale solar farms.',
    isMyth: true,
    verdictTitle: 'SCIENTIFIC MYTH',
    scientificExplanation:
      'Geothermal power installations have among the smallest surface footprints of any power source (~400 m² per GWh over a 30-year lifecycle). Directional drilling allows dozens of subterranean wellbores to radiate outward miles underground from a compact multi-well surface pad, allowing surrounding land to coexist with forestry and agriculture.',
    source: 'DOE GeoVision Land-Use Environmental Impact Study',
    keyMetric: { label: '30-YEAR LAND FOOTPRINT', value: '400 m² / GWh' }
  }
];

export interface EnergyComparisonData {
  id: string;
  name: string;
  type: string;
  capacityFactor: number; // percentage (0-100)
  capacityFactorDisplay: string;
  lifecycleEmissions: number; // g CO2-eq/kWh
  emissionsDisplay: string;
  landFootprint: number; // m2 / GWh
  landDisplay: string;
  dispatchProfile: '24/7 Firm Baseload' | 'Weather Intermittent' | 'Fuel Dispatched';
  description: string;
  color: string;
}

export const ENERGY_COMPARISONS: EnergyComparisonData[] = [
  {
    id: 'geothermal',
    name: 'Geothermal',
    type: 'Subterranean Baseload Heat',
    capacityFactor: 92,
    capacityFactorDisplay: '92%',
    lifecycleEmissions: 38,
    emissionsDisplay: '38 g CO₂-eq/kWh',
    landFootprint: 400,
    landDisplay: '400 m² / GWh',
    dispatchProfile: '24/7 Firm Baseload',
    description: 'Continuous weather-independent baseload with rotational synchronous inertia and near-zero surface footprint.',
    color: '#8BAF91'
  },
  {
    id: 'solar-pv',
    name: 'Solar PV',
    type: 'Photovoltaic Irradiance',
    capacityFactor: 24,
    capacityFactorDisplay: '22% – 25%',
    lifecycleEmissions: 48,
    emissionsDisplay: '48 g CO₂-eq/kWh',
    landFootprint: 3200,
    landDisplay: '3,200 m² / GWh',
    dispatchProfile: 'Weather Intermittent',
    description: 'Clean energy generation constrained by diurnal solar cycles, clouds, and seasonal daylight variations.',
    color: '#D4A359'
  },
  {
    id: 'onshore-wind',
    name: 'Onshore Wind',
    type: 'Atmospheric Kinetic',
    capacityFactor: 35,
    capacityFactorDisplay: '32% – 38%',
    lifecycleEmissions: 12,
    emissionsDisplay: '12 g CO₂-eq/kWh',
    landFootprint: 1300,
    landDisplay: '1,300 m² / GWh',
    dispatchProfile: 'Weather Intermittent',
    description: 'High clean yield dependent on variable meteorological wind regimes and transmission spacing.',
    color: '#7097A8'
  },
  {
    id: 'nuclear',
    name: 'Nuclear Fission',
    type: 'Thermal Fission Baseload',
    capacityFactor: 93,
    capacityFactorDisplay: '93%',
    lifecycleEmissions: 12,
    emissionsDisplay: '12 g CO₂-eq/kWh',
    landFootprint: 360,
    landDisplay: '360 m² / GWh',
    dispatchProfile: '24/7 Firm Baseload',
    description: 'Continuous clean firm electricity with strict long-term fuel cycle management requirements.',
    color: '#A28CD4'
  },
  {
    id: 'natural-gas',
    name: 'Natural Gas (CCGT)',
    type: 'Fossil Hydrocarbon Combustion',
    capacityFactor: 58,
    capacityFactorDisplay: '55% – 60%',
    lifecycleEmissions: 490,
    emissionsDisplay: '490 g CO₂-eq/kWh',
    landFootprint: 600,
    landDisplay: '600 m² / GWh',
    dispatchProfile: 'Fuel Dispatched',
    description: 'Dispatchable peaking generation coupled with substantial greenhouse combustion and fugitive methane leakage.',
    color: '#C97A4A'
  }
];
