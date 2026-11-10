export interface TechnologyExplorerItem {
  id: string;
  number: string;
  typeId: string;
  name: string;
  shortName: string;
  temperature: string;
  tempLow: number;
  tempHigh?: number;
  tempDisplay: string;
  tempSubtext: string;
  enthalpyTier: string;
  badge: string;
  isDirectThermal: boolean;
  heading: string;
  explanation: string;
  howItWorks: {
    label: string;
    description: string;
  };
  applications: {
    label: string;
    description: string;
    sectors: string[];
  };
  performance: {
    label: string;
    description: string;
    parameters: { label: string; value: string }[];
  };
  image: string;
  imageAlt: string;
  imageCaption: string;
}

export const TECHNOLOGY_EXPLORER_DATA: TechnologyExplorerItem[] = [
  {
    id: 'ground-source',
    number: '01',
    typeId: 'TYPE 01 / GROUND-SOURCE HEAT PUMPS',
    name: 'Ground-Source Heat Pumps',
    shortName: 'Ground-Source',
    temperature: '10°C–25°C',
    tempLow: 10,
    tempHigh: 25,
    tempDisplay: '10°C–25°C',
    tempSubtext: 'Upper 100–200m Subsurface Thermal Layer',
    enthalpyTier: 'Low Enthalpy · Direct Geo-Exchange',
    badge: 'DIRECT THERMAL EXCHANGE · NOT ELECTRICITY',
    isDirectThermal: true,
    heading: 'Direct Subsurface Thermal Exchange for Buildings.',
    explanation:
      'Shallow subterranean ground temperatures remain remarkably constant year-round between 10°C and 25°C due to Earth’s enormous thermal inertia. Ground-source heat pumps (GSHP) circulate heat-transfer fluid through closed subterranean loops to absorb heat in winter and reject heat in summer. Unlike geothermal power plants, standard ground-source systems are designed for direct thermal conditioning of buildings rather than electricity generation, delivering exceptional seasonal efficiency with zero on-site combustion.',
    howItWorks: {
      label: 'Thermodynamic Mechanism',
      description:
        'Closed high-density polyethylene pipe loops installed vertically in boreholes (50–200m deep) or horizontally in trenches circulate water or glycol solution. In winter, fluid extracts crustal heat and transfers it to a vapor-compression refrigeration cycle that elevates temperature for hydronic or forced-air building distribution. In summer, the cycle reverses, dumping indoor heat back into the cooler subterranean earth.',
    },
    applications: {
      label: 'Target Applications',
      description:
        'Residential neighborhoods, commercial office complexes, institutional campus district thermal networks, and agricultural greenhouse heating.',
      sectors: ['Commercial HVAC', 'District Thermal', 'Residential', 'Agricultural Greenhouses'],
    },
    performance: {
      label: 'Thermodynamic Performance',
      description:
        'High coefficient of performance (COP 3.5–5.0). For every 1 kWh of electricity consumed by the compressor, delivers 3.5 to 5.0 kWh of thermal energy.',
      parameters: [
        { label: 'COEFFICIENT OF PERFORMANCE', value: 'COP 3.5 – 5.0 (350% – 500%)' },
        { label: 'ENERGY DELIVERED', value: 'Thermal (Direct Heating & Cooling)' },
        { label: 'ON-SITE EMISSIONS', value: '0.0 g CO₂ / kWh (Zero Combustion)' },
      ],
    },
    image: '/images/technology/ground-source-heat-pump.webp',
    imageAlt: 'Modern architectural district utilizing deep subsurface geo-exchange thermal heating and cooling',
    imageCaption: 'Subsurface Geo-Exchange Network · Direct Crustal Thermal Balancing',
  },
  {
    id: 'binary-cycle',
    number: '02',
    typeId: 'TYPE 02 / BINARY CYCLE',
    name: 'Binary Cycle Power Plants',
    shortName: 'Binary Cycle',
    temperature: '100°C–180°C',
    tempLow: 100,
    tempHigh: 180,
    tempDisplay: '100°C–180°C',
    tempSubtext: 'Moderate-Enthalpy Hydrothermal Reservoirs',
    enthalpyTier: 'Moderate Enthalpy · Organic Rankine Cycle',
    badge: 'CLOSED ORGANIC LOOP · ZERO OPERATIONAL VENTING',
    isDirectThermal: false,
    heading: 'Turning Moderate Heat Into Electricity.',
    explanation:
      'In binary cycle power plants, moderate-temperature geothermal brine transfers its thermal energy through a specialized heat exchanger to a secondary organic working fluid (such as isopentane or butane) with a substantially lower boiling point than water. The organic fluid rapidly vaporizes to drive a turbine generator in an entirely hermetically sealed closed loop. Because the reservoir brine never contacts the atmosphere or turbine blades, 100% of geothermal gases and fluids are reinjected into the subterranean reservoir.',
    howItWorks: {
      label: 'Thermodynamic Mechanism',
      description:
        'Geothermal brine pumped from production wells enters shell-and-tube or plate heat exchangers, warming a secondary hydrocarbon working fluid. The pressurized organic vapor expands through a synchronous Organic Rankine Cycle (ORC) turbine before passing to air-cooled condensers where it reverts to liquid and recirculates continuously. Cooled brine is reinjected deep underground at equal hydrostatic mass balance.',
    },
    applications: {
      label: 'Target Applications',
      description:
        'Grid-connected firm baseload electricity generation from abundant moderate-temperature reservoirs, co-generation with district heating, and low-temperature industrial power.',
      sectors: ['Utility Baseload Grid', 'Industrial Co-Generation', 'District Heating Cascades'],
    },
    performance: {
      label: 'Thermodynamic Performance',
      description:
        'Net thermal conversion efficiency 10–14%. Near-zero operational venting with median lifecycle intensity of ~38 g CO₂-eq/kWh and 100% reservoir fluid reinjection.',
      parameters: [
        { label: 'THERMAL CONVERSION', value: '10% – 14% Net Cycle Efficiency' },
        { label: 'LIFECYCLE EMISSIONS', value: '~38 g CO₂-eq / kWh (Closed Loop)' },
        { label: 'REINJECTION RATIO', value: '100% Mass Conserved Underground' },
      ],
    },
    image: '/images/technology/binary-cycle-system.webp',
    imageAlt: 'Modern binary cycle geothermal power station with air-cooled condenser arrays and closed-loop piping',
    imageCaption: 'Binary Cycle Power Station · Sealed Organic Rankine Closed Circuit',
  },
  {
    id: 'flash-steam',
    number: '03',
    typeId: 'TYPE 03 / FLASH STEAM',
    name: 'Flash Steam Power Plants',
    shortName: 'Flash Steam',
    temperature: 'Above 182°C',
    tempLow: 182,
    tempHigh: 300,
    tempDisplay: 'Above 182°C',
    tempSubtext: 'High-Enthalpy Liquid-Dominated Hydrothermal Reservoirs',
    enthalpyTier: 'High Enthalpy · Hydrodynamic Flash Separation',
    badge: 'SUPERHEATED HYDROTHERMAL BRINE · MULTI-STAGE FLASH',
    isDirectThermal: false,
    heading: 'Depressurizing Deep Hydrothermal Brine.',
    explanation:
      'High-temperature geothermal reservoirs contain deep water held under extreme hydrostatic pressures exceeding 10 to 30 megapascals, remaining liquid at temperatures far above 182°C. When this superheated fluid ascends production boreholes into surface flash tanks maintained at lower pressure, the abrupt depressurization causes a significant fraction of the water to instantaneously "flash" into high-velocity steam. This steam expands through multi-stage impulse-reaction turbines to generate substantial baseload power.',
    howItWorks: {
      label: 'Thermodynamic Mechanism',
      description:
        'High-pressure fluid from production wells discharges into cylindrical cyclone separators. Centrifugal mechanics isolate clean, dry steam from the mineral-heavy brine. In dual-flash plants, residual brine enters a secondary low-pressure separator to extract additional secondary steam. Exhaust steam is condensed in cooling towers, and all separated liquid brine is returned to the reservoir via reinjection wells.',
    },
    applications: {
      label: 'Target Applications',
      description:
        'High-capacity utility-scale grid power generation (typically 50 MW to 300+ MW regional generating complexes) and heavy industrial baseload power.',
      sectors: ['Regional Transmission Grid', 'Heavy Industrial Basements', 'High-Capacity Utility Stations'],
    },
    performance: {
      label: 'Thermodynamic Performance',
      description:
        'High energy density per borehole with 15–20% thermal-to-electric conversion efficiency and continuous 90–95% operational capacity factor.',
      parameters: [
        { label: 'CYCLE EFFICIENCY', value: '15% – 20% Rankine Thermal Conversion' },
        { label: 'CAPACITY FACTOR', value: '>92% Dispatchable Continuous Baseload' },
        { label: 'SEPARATION METHOD', value: 'High-Velocity Centrifugal Cyclone' },
      ],
    },
    image: '/images/technology/flash-steam-plant.webp',
    imageAlt: 'High-enthalpy geothermal flash steam facility with steam separators and volcanic hydrothermal plumes',
    imageCaption: 'Cyclone Flash Separator Array · High-Velocity Depressurized Steam',
  },
  {
    id: 'dry-steam',
    number: '04',
    typeId: 'TYPE 04 / DRY STEAM',
    name: 'Dry Steam Power Plants',
    shortName: 'Dry Steam',
    temperature: 'Above 235°C',
    tempLow: 235,
    tempHigh: 370,
    tempDisplay: 'Above 235°C',
    tempSubtext: 'Superheated Vapor-Dominated Subsurface Fractures',
    enthalpyTier: 'Extreme Enthalpy · Direct Vapor Expansion',
    badge: 'RAREST GEOTHERMAL GEOLOGY · DIRECT NATURAL STEAM',
    isDirectThermal: false,
    heading: 'Harnessing Rare High-Enthalpy Natural Steam.',
    explanation:
      'Dry steam systems represent the rarest and thermodynamically most straightforward geothermal technology. In rare geological formations—such as The Geysers in California or Larderello in Italy—subterranean fractures produce superheated dry steam with virtually no entrained liquid water. This natural steam is routed directly from production wellheads through cyclonic rock-catchers and piped straight into electrical turbines, eliminating the need for flash separators or secondary organic fluid loops.',
    howItWorks: {
      label: 'Thermodynamic Mechanism',
      description:
        'Subterranean steam vents under 7 to 10 atmospheres of natural pressure are captured by deep production wells. Centrifugal dust extractors remove trace particulate matter before the dry, superheated steam enters the turbine nozzles directly. The expanding steam spins the synchronous generator rotor at 3,000–3,600 RPM before exhausting into a direct-contact condenser for water recycling.',
    },
    applications: {
      label: 'Target Applications',
      description:
        'Direct multi-gigawatt grid baseload power generation, essential grid rotational frequency inertia, and industrial steam supply.',
      sectors: ['High-Inertia Grid Baseload', 'Industrial Direct Steam', 'Transmission Frequency Stabilization'],
    },
    performance: {
      label: 'Thermodynamic Performance',
      description:
        'Highest power density among all geothermal cycle designs with minimal parasitic pumping load and 95%+ annual availability factors.',
      parameters: [
        { label: 'ENERGY DENSITY', value: 'Highest Among Geothermal Designs' },
        { label: 'MECHANICAL ARCHITECTURE', value: 'Direct Wellhead-to-Turbine Expansion' },
        { label: 'HISTORICAL HERITAGE', value: 'First Harnessing in Larderello (1904)' },
      ],
    },
    image: '/images/technology/dry-steam-turbine.webp',
    imageAlt: 'Massive high-pressure dry steam turbine hall piping in a world-class geothermal complex',
    imageCaption: 'Direct Dry Steam Turbine Hall · High-Pressure Vapor Expansion',
  },
];
