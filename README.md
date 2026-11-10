# Geothermal Green — The Earth Engine

[![Live Website](https://img.shields.io/badge/Live_Site-geothermal--plant.vercel.app-10251C?style=for-the-badge&logo=vercel&logoColor=F3F0E6)](https://geothermal-plant.vercel.app/)
[![React 19](https://img.shields.io/badge/React-19.0.0-10251C?style=for-the-badge&logo=react&logoColor=8BAF91)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-10251C?style=for-the-badge&logo=typescript&logoColor=8BAF91)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-10251C?style=for-the-badge&logo=vite&logoColor=8BAF91)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-10251C?style=for-the-badge&logo=tailwindcss&logoColor=8BAF91)](https://tailwindcss.com/)
[![Motion for React](https://img.shields.io/badge/Motion-14.11.0-10251C?style=for-the-badge&logo=framer&logoColor=8BAF91)](https://motion.dev/)

> **A publication-grade, architectural editorial web experience celebrating geothermal baseload power — Earth's subterranean, weather-independent energy.**

---

## 1. Executive Summary & Brand Vision

**Geothermal Green** transforms scientific geothermal energy communication from standard educational or SaaS dashboard layouts into an **immersive, luxury architectural publication**. 

Developed at the intersection of high-contrast editorial typography, architectural spatial balance, peer-reviewed scientific rigor, and hardware-accelerated motion choreography, the platform communicates how subterranean heat delivers **24/7 continuous baseload electricity, industrial heat, and zero-combustion energy systems**.

### Core Tenets
- **Editorial Architectural Layout**: Inspired by luxury European architectural monographs and modernist publications; uses framed canvas geometry, spacious margins, and disciplined whitespace rather than generic card grids.
- **Scientific Accuracy & Peer Review**: All claims, capacity factors, lifecycle carbon footprints, and land-use data are harmonized with benchmarks from the **US Department of Energy (DOE)**, **National Renewable Energy Laboratory (NREL)**, **International Energy Agency (IEA)**, and **Stanford Geothermal Program**.
- **Restrained Motion Design**: Kinetic interactions built using **Motion for React** (`motion/react`) governed by mathematical easing tokens, spring damping physics, and strict `prefers-reduced-motion` accessibility fallbacks.
- **Environmental Honesty**: Refuses to greenwash. Features a dedicated balanced assessment chapter confronting induced seismicity, subsurface mineral cooling, non-condensable gas management, and lifecycle resource limits.

---

## 2. Visual & Design System

The visual language balances natural geological materiality with modernist typography and clean technical instrumentation:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        COLOR ARCHITECTURE                              │
├──────────────────┬──────────────────┬─────────────────┬────────────────┤
│ #F3F0E6          │ #10251C          │ #8BAF91         │ #D8D2C5        │
│ Earth Ivory      │ Forest Green     │ Muted Sage      │ Warm Stone     │
│ Main Canvas      │ Primary Type     │ Accents & Stats │ Hairline Lines │
├──────────────────┴──────────────────┴─────────────────┴────────────────┤
│ #11110F          │ #09130F          │ #EAE5D9         │ #232521        │
│ Obsidian Black   │ Abyssal Dark     │ Stone Light     │ Dark Border    │
│ Deep Contrast    │ Feature Sections │ Hover States    │ Dark Hairlines │
└──────────────────┴──────────────────┴─────────────────┴────────────────┘
```

### Typography Hierarchy
- **Editorial Display Serif**: `Playfair Display`, `Cormorant Garamond`, `Didot`. Used for oversized display headlines, large monumental numerals, and chapter narratives.
- **Clean Technical Sans-Serif**: `Inter`. High-legibility grotesque sans utilized for running editorial prose, navigational architecture, and explanatory paragraphs.
- **Scientific Monospace**: `JetBrains Mono` / `ui-monospace`. Deployed for technical citations, metadata timestamps, operating temperatures, and thermodynamic process telemetry.

---

## 3. Section-by-Section Experience Architecture

### 1. Minimal Framed Navigation (`Navbar.tsx` & `AnnouncementBar.tsx`)
- **Announcement Strip**: Understated top banner communicating baseload continuity: `ENERGY FROM THE EARTH · POWER FOR THE FUTURE`.
- **Framed Navigation Bar**: Aligns with the 92vw hero frame (`max-w-[1600px] mx-auto`).
- **Brand Wordmark**: Left-aligned high-contrast wordmark **`GEOTHERMAL GREEN`** paired with **`EARTH'S BASELOAD POWER`**.
- **Editorial Navigation**: Centered links (`ENERGY`, `TECHNOLOGY`, `APPLICATIONS`, `ABOUT`) with interactive layoutId hover highlights.
- **Action Element**: Minimal pill CTA button **`EXPLORE ↗`**.

### 2. Framed Split-Canvas Hero (`HeroSection.tsx`)
- **Framed Canvas Geometry**: Inset 92vw landscape composition with generous margins (`rounded-[28px] sm:rounded-[36px]`, `border border-earth-border/80`, `shadow-[0_25px_70px_rgba(16,37,28,0.12)]`).
- **Oversized Multiline Headline**:
  ```text
  GEOTHERMAL
  BEYOND THE
  SURFACE.
  ```
- **Center-Right Photographic Subject**: High-resolution daylight photography of the **Hellisheiði Geothermal Power Station** set within Iceland’s Hengill volcanic mountain system with natural daylight mist gradients.
- **Floating Geothermal Explorer Panel**: Upper-right warm-white pill-tagged card (`[SUBSURFACE]`, `[ENERGY]`, `[SYSTEM]`, *"Earth's Heat. Intelligent Energy."*, volcanic strata preview, circular magnetic control).
- **Three-Part Bottom Composition**:
  - *Bottom-Left*: Earthy stone card (*"Energy begins beneath us."* + subterranean cross-section thumbnail).
  - *Bottom-Center*: Large `24/7` baseload metric (*"Continuous baseload power independent of weather"*).
  - *Bottom-Right*: Typographic manifesto statement (*"POWERING THE FUTURE FROM BENEATH THE SURFACE."* + `LEARN MORE →`).

### 3. Origins & Subterranean Thermodynamics (`IntroductionSection.tsx`)
- **Planetary Enthalpy Deep-Dive**: Explains the primordial accretion heat and ongoing radiogenic isotope decay ($^{238}\text{U}$, $^{232}\text{Th}$, $^{40}\text{K}$) sustaining a 5,000°C terrestrial thermal core.
- **Conductive Flux**: Highlights the continuous conductive outward geothermal flux independent of surface weather or daylight.

### 4. Interactive Thermodynamic Spectrum (`HowItWorksSection.tsx`)
- **4-Phase Process Engineering**:
  1. *Subterranean Heat*: Deep crystalline bedrock thermal transfer (150°C – 370°C+).
  2. *Fluid Extraction*: Hydrodynamic ascent of pressurized hydrothermal brine.
  3. *Rankine / Organic Rankine Cycle*: Mechanical turbine expansion through heat exchangers.
  4. *Reinjection & Circularity*: 100% cooled brine reinjected deep into subterranean formations.
- **Pinned Horizontal Scroll Experience**:
  - Vertically scrolls smoothly down to the section, pins temporarily to the viewport, and translates horizontally across 4 next-generation geothermal technologies:
    1. *Closed-Loop Advanced Geothermal Systems (AGS)*
    2. *Deep Millimeter-Wave Thermal Spallation Drilling*
    3. *Engineered / Enhanced Geothermal Reservoirs (EGS)*
    4. *Supercritical Fluid Harvesting (>374°C, 22.1 MPa)*

### 5. Dark Feature Strip (`DarkFeatureStrip.tsx`)
- **High-Contrast Deep Slate Canvas** (`bg-[#09130F]`):
  - Three technical categories separated by hairline vertical dividers:
    1. *Closed-Loop Circulation* (Zero direct atmospheric venting).
    2. *Deep Wellpad Directional Drilling* (Multi-lateral branching from compact pads).
    3. *District Thermal Networks* (Direct heat distribution for municipal resilience).

### 6. Editorial Feature Banner (`EditorialFeatureBanner.tsx`)
- **Widescreen Split Narrative**: Contrasts surface weather-dependent clean energies (solar arrays, wind turbines) with steady planetary conductive thermal flow.

### 7. Symmetrical Alternating Metrics Timeline (`BenefitsStrip.tsx`)
- **"The Power of Proof"**: Completely eliminates generic rectangular card containers in favor of an **asymmetrical, alternating Left–Right editorial timeline**:
  - **Metric 01 (Left)**: `92%` Capacity Factor — US Department of Energy (DOE).
  - **Metric 02 (Right)**: `38 g` Lifecycle Emissions (g CO₂-eq/kWh) — National Renewable Energy Laboratory (NREL).
  - **Metric 03 (Left)**: `24/7` Continuous Baseload — International Energy Agency (IEA).
  - **Metric 04 (Right)**: `400 m²` Land Footprint (per GWh over 30 yrs) — DOE GeoVision.
- **Dual-Mode Timeline Architecture**:
  - *Desktop & Tablet (`md:` 768px+)*: Perfectly straight, razor-sharp 1px vertical timeline running through the exact horizontal center with circular forest-green numbered nodes (`01`, `02`, `03`, `04`) and scroll-synchronized gradient progress fill.
  - *Mobile (< 768px)*: Adaptive timeline connecting the numbered markers and gracefully framing the alternating staggered metrics to maintain zero typographic collision on small screens.
- **Integer Counters**: Exponential ease-out count-up animation without fractional or decimal flickering, fully integrated with `useReducedMotionPreference`.

### 8. Applications & Thermal Cascading (`ExploreGeothermal.tsx`)
- **Direct & Indirect Thermal Utilization**:
  - *Utility-Scale Electricity*: Base power generation feeding high-voltage regional grids.
  - *Municipal District Heating*: Supplying direct heated water networks (e.g. Reykjavik, Paris Basin).
  - *Controlled-Environment Agriculture*: Year-round geothermal greenhouses and aquaculture.
  - *Critical Mineral Extraction*: Direct lithium extraction (DLE) from hypersaline geothermal brines.

### 9. Environmental Responsibility & Life Cycle Assessment (`EnvironmentalImpact.tsx`)
- **"The Other Side of Clean Energy"**: Four editorial chapters confronting practical environmental challenges:
  1. *Chapter 01 — The Advantage*: Uninterrupted dispatchability without fossil backup.
  2. *Chapter 02 — Fluid & Gas Chemistry*: Binary closed-loop systems vs. atmospheric venting.
  3. *Chapter 03 — Induced Seismicity*: Hydraulic shear stimulation, seismic monitoring protocols, and traffic light safety systems.
  4. *Chapter 04 — Reservoir Management*: Sustaining reservoir pressure through 100% reinjection and managed extraction rates.

### 10. The Deep Frontier (`FutureSection.tsx`)
- **Next-Gen Subsurface Innovations**: EGS hydraulic connectivity, supercritical reservoirs exceeding 400°C, and closed-loop radiator networks.

### 11. Peer-Reviewed Scientific Archive Modal (`ReferencesModal.tsx`)
- **Direct Scientific Citations**: Interactive modal archiving primary literature from the US DOE, NREL, IEA, Stanford, and USGS with DOI links and methodological qualifications.

---

## 4. Codebase Directory Structure

```text
geothermal-green/
├── dist/                              # Compiled production build output
├── public/                            # Static public assets
├── src/
│   ├── components/
│   │   ├── core/                      # Reusable micro-primitives
│   │   │   ├── in-view.tsx            # Viewport trigger container
│   │   │   ├── transition-panel.tsx   # Animated tab panel transitions
│   │   │   └── index.ts
│   │   ├── footer/                    # Editorial footer & citation trigger
│   │   │   └── Footer.tsx
│   │   ├── hero/                      # Hero section & dark feature band
│   │   │   ├── BottomInformationComposition.tsx # 3-part bottom stat layout
│   │   │   ├── DarkFeatureStrip.tsx   # 3-column dark slate technical strip
│   │   │   ├── GeothermalExplorerPanel.tsx      # Floating upper-right panel
│   │   │   └── HeroSection.tsx        # Framed landscape canvas hero
│   │   ├── motion/                    # Centralized motion library
│   │   │   ├── ImageReveal.tsx        # Photographic curtain reveal
│   │   │   ├── MagneticButton.tsx     # Physics-based spring magnetic CTA
│   │   │   ├── MotionProvider.tsx     # Context wrapper for motion state
│   │   │   ├── PageTransition.tsx     # Smooth route/section handoff
│   │   │   ├── ParallaxImage.tsx      # Scroll-tied parallax translation
│   │   │   ├── Reveal.tsx             # Fade-up and blur entrance primitives
│   │   │   ├── ScrollProgress.tsx     # Viewport scroll progress tracker
│   │   │   ├── StaggerGroup.tsx       # Cascading staggered item container
│   │   │   ├── TextReveal.tsx         # Editorial line-by-line text reveal
│   │   │   ├── motionVariants.ts      # Reusable framer-motion variants
│   │   │   └── index.ts
│   │   ├── navigation/
│   │   │   ├── AnnouncementBar.tsx    # Slim top brand announcement
│   │   │   └── Navbar.tsx             # Framed minimal navigation bar
│   │   └── sections/
│   │       ├── BenefitsStrip.tsx      # Symmetrical alternating timeline
│   │       ├── ClosingSection.tsx     # Final editorial manifesto banner
│   │       ├── EditorialFeatureBanner.tsx # Split photographic narrative
│   │       ├── EnvironmentalImpact.tsx# 4-chapter lifecycle analysis
│   │       ├── ExploreGeothermal.tsx  # Thermal applications & DLE
│   │       ├── FutureSection.tsx      # Advanced EGS & supercritical tech
│   │       ├── HowItWorksSection.tsx  # Pinned horizontal scroll & tabs
│   │       ├── IntroductionSection.tsx# Origins & radioactive core heat
│   │       └── ReferencesModal.tsx    # Peer-reviewed citation modal
│   ├── data/
│   │   └── content.ts                 # Centralized content, stats, & citations
│   ├── hooks/
│   │   ├── useReducedMotionPreference.ts # Accessible motion preference hook
│   │   └── useScrollProgress.ts       # Viewport scroll telemetry hook
│   ├── lib/
│   │   ├── motionTokens.ts            # Timing, easings, & spring configurations
│   │   └── utils.ts                   # Class name merger (clsx + tailwind-merge)
│   ├── types/
│   │   └── index.ts                   # Strict TypeScript interface definitions
│   ├── App.tsx                        # Main page assembly & state management
│   ├── index.css                      # Tailwind base, typography & keyframes
│   └── main.tsx                       # React 19 root bootstrap
├── index.html                         # HTML entrypoint & typography preloads
├── package.json                       # Dependencies & build scripts
├── postcss.config.js                  # PostCSS plugins
├── tailwind.config.js                 # Custom palette, typography, & clamp rules
├── tsconfig.json                      # Strict TypeScript compiler configuration
└── vite.config.ts                     # Vite build & bundler configuration
```

---

## 5. Technology Stack & Key Dependencies

| Technology | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `19.0.0` | Core UI library utilizing modern concurrent rendering |
| **TypeScript** | `5.7.3` | End-to-end static type safety across all props & content models |
| **Vite** | `6.1.0` | Ultra-fast development server, HMR, and Rollup production bundling |
| **Tailwind CSS** | `3.4.17` | Utility-first CSS framework customized with architectural palette tokens |
| **Motion for React** | `14.11.0` | Declarative, GPU-accelerated motion choreography & physics springs |
| **Lucide React** | `1.16.0` | Restrained technical iconography |
| **clsx & tailwind-merge**| `2.1.1` / `3.7.0` | Conflict-free conditional utility class resolution |

---

## 6. Motion Tokens & Physics System

All animations across the platform import unified tokens from [`src/lib/motionTokens.ts`](src/lib/motionTokens.ts):

```typescript
export const MOTION_DURATIONS = {
  micro: 0.2,       // 200ms: micro-indicators, button press states
  quick: 0.3,       // 300ms: hover states, tooltip reveals
  standard: 0.55,   // 550ms: card reveals, standard text elements
  slow: 0.75,       // 750ms: major display headings, timeline entries
  image: 0.95,      // 950ms: cinematic photographic curtain reveals
  cinematic: 1.1,   // 1100ms: hero visuals and full-canvas entrances
};

export const MOTION_EASINGS = {
  // Smooth custom cubic-bezier ease-out for editorial text & layout
  editorial: [0.16, 1, 0.3, 1],
  // Snappy exponential ease-out for counters & markers
  easeOutExpo: [0.19, 1, 0.22, 1],
  // Gentle curve for continuous background elements
  easeInOut: [0.65, 0, 0.35, 1],
};

export const MOTION_SPRINGS = {
  restrained: { type: 'spring', stiffness: 260, damping: 26, mass: 0.8 },
  smooth:     { type: 'spring', stiffness: 120, damping: 20, mass: 1 },
  snappy:     { type: 'spring', stiffness: 380, damping: 32 },
};
```

### Accessibility & Reduced Motion
The platform includes the [`useReducedMotionPreference`](src/hooks/useReducedMotionPreference.ts) hook that listens to operating system settings (`prefers-reduced-motion: reduce`). When active:
- Numbers render instantly with final values (no count-up spinning).
- Hero visual scales and opacity shifts default to instantaneous appearance.
- Pinned horizontal scroll switches to an accessible, direct vertical flow.
- All parallax and continuous transforms are deactivated.

---

## 7. Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (Node 20+ recommended)
- **Package Manager**: `npm` (included with Node.js) or `pnpm` / `yarn`

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Shaheemp76m/geothermal-plant.git
   cd geothermal-plant
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   The local development instance will be available at `http://localhost:5173/`.

---

## 8. Build & Deployment

### Production Compilation
To build the project for production, run:
```bash
npm run build
```
This script executes TypeScript verification (`tsc -b`) followed by Vite's production bundling (`vite build`). Output files are written to the `/dist` directory.

### Preview Local Build
To preview the compiled production distribution locally:
```bash
npm run preview
```

### Deployment (Vercel)
The repository is optimized for zero-configuration continuous deployment on [Vercel](https://vercel.com/):
- **Framework Preset**: Vite
- **Build Command**: `npm run build`
- **Output Directory**: `dist`
- **Install Command**: `npm install`

---

## 9. Primary Scientific References & Data Sources

The quantitative data presented across the platform is drawn directly from peer-reviewed energy literature:

1. **US Department of Energy (DOE)**:
   - *GeoVision: Harnessing the Heat Beneath Our Feet* (2019). Capacity factor, baseload comparisons, and multi-well directional drilling economics.
2. **National Renewable Energy Laboratory (NREL)**:
   - *Life Cycle Greenhouse Gas Emissions from Geothermal Electricity Generation* (LCA Harmonization Project, 2021). Median lifecycle emissions for binary vs. flash systems.
3. **International Energy Agency (IEA)**:
   - *World Energy Outlook & Technology Roadmap: Geothermal Heat and Power* (2020–2023). Rotational turbine inertia and synchronous grid reliability.
4. **United States Geological Survey (USGS)**:
   - *Assessment of Moderate- and High-Temperature Geothermal Resources of the United States* (USGS Circular 790 & Fact Sheet 2008-3082).
5. **Stanford Geothermal Program & Lawrence Berkeley National Laboratory (LBNL)**:
   - *Induced Seismicity in Geothermal Energy Development* (Majer et al., 2007) and *Protocol for Induced Seismicity Associated with Enhanced Geothermal Systems* (DOE, 2012).

---

## 10. License & Attribution

- **Codebase License**: MIT License — open for academic, personal, and commercial study.
- **Visual Assets**: Photography licensed via Unsplash with attribution to original photographers documenting Hellisheiði, Krafla, Reykjanes, and Larderello geothermal stations.
- **Crafted with**: Passion for sustainable baseload energy and high-craft editorial design.
