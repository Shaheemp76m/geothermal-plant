# Geothermal Green — Editorial Environmental Technology Platform

[![React 19](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.1.0-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-14.11.0-FF0055?logo=framer&logoColor=white)](https://motion.dev/)

> **A cinematic, publication-grade web platform communicating the physics, engineering, and peer-reviewed operational benchmarks of subterranean geothermal baseload energy.**

* **Live Platform**: [https://geothermal-plant.vercel.app/](https://geothermal-plant.vercel.app/)
* **Repository**: [https://github.com/Shaheemp76m/geothermal-plant](https://github.com/Shaheemp76m/geothermal-plant)

---

## ✦ Overview & Philosophy

**Geothermal Green** departs from conventional SaaS dashboards, student educational portals, and generic renewable energy templates. Instead, it treats clean energy storytelling through the lens of **high-contrast editorial publication design**, **architectural spatial balance**, and **scientifically verified data journalism**.

Rather than relying on vague environmental slogans or presenting clean energy as zero-impact fantasy, the platform presents geothermal power as a rigorous thermodynamic discipline: continuous baseload heat flux, closed-loop mass conservation, low lifecycle carbon footprint, and responsible geological stewardship.

---

## ✦ Key Architectural Sections

### 1. The Framed Split-Canvas Hero
* **Landscape Canvas**: Inset framed geometry (`92vw`, max 1600px) with generous borders and subtle elevation, reproducing high-end architectural print aesthetics.
* **Navigation Bar**: Clean editorial header aligning with the canvas boundary, featuring the `GEOTHERMAL GREEN` wordmark, `EARTH'S BASELOAD POWER` sub-label, monospace links (`ENERGY`, `TECHNOLOGY`, `APPLICATIONS`, `ABOUT`), and interactive pill CTA.
* **Editorial Headline Block**: Oversized 3-line serif typography:
  ```text
  GEOTHERMAL
  BEYOND THE
  SURFACE.
  ```
  Paired with daylight mist gradient backdrop and magnetic action button (`EXPLORE ↗`).
* **Visual Centerpiece**: Photographic subject featuring Iceland’s Hellisheiði Geothermal Station nestled in the Hengill volcanic mountain system with rising steam plumes.
* **Floating Subterranean Explorer Panel**: Rounded ivory module (`rounded-[26px]`) with category pills (`SUBSURFACE`, `ENERGY`, `SYSTEM`), baseload generation narrative, geological strata preview, and interactive circular control.
* **Three-Part Bottom Composition**:
  - *Bottom-Left*: Deep warm stone card (*"Energy begins beneath us."* + subterranean reservoir strata).
  - *Bottom-Center*: Baseload stat lockup (**`24/7`** + **`ENERGY POTENTIAL`**).
  - *Bottom-Right*: White typographic manifesto statement (**`POWERING THE FUTURE FROM BENEATH THE SURFACE.`** + **`LEARN MORE →`**).

---

### 2. Origin & Thermodynamic Foundations
* **Deep Planetary Heat**: Explains subterranean heat generation through primordial planetary accretion and the natural radioactive decay of long-lived isotopes ($^{238}\text{U}$, $^{232}\text{Th}$, $^{40}\text{K}$).
* **Thermodynamic Cycle**: Interactive 4-phase mechanism illustrating deep conduction, pressurized hydrodynamic extraction, Rankine heat exchange, and closed-loop reinjection.
* **Next-Gen Subterranean Tech**: Horizontal tabbed explorer covering **Binary Cycle**, **Flash Steam**, **Dry Steam**, and **Ground-Source Geo-Exchange** with real-time temperature ranges and efficiency metrics.

---

### 3. The Power of Proof — Symmetrical Alternating Metrics Timeline
* **No Boxes, No Card Grids**: Eliminates generic rectangular containers in favor of monumental numerical typography where the data itself becomes the graphic design.
* **Central Vertical Timeline**: Continuous hairline axis running down the exact horizontal center (`left-1/2`), with scroll-synchronized progress gradient fill.
* **Numbered Circular Markers (`01`–`04`)**: Symmetrical circular nodes that illuminate dynamically from muted stone to deep forest green as the visitor scrolls through each benchmark.
* **Symmetrical Left-Right Alternation**:
  - **`01` / ENERGY AVAILABILITY (LEFT)**: **`92%`** Capacity Factor — Continuous baseload power independent of meteorological conditions (US Department of Energy).
  - **`02` / ENVIRONMENTAL IMPACT (RIGHT)**: **`38 g`** CO₂-eq/kWh — Median lifecycle greenhouse gas footprint across closed-loop binary facilities (National Renewable Energy Laboratory).
  - **`03` / ENERGY RELIABILITY (LEFT)**: **`24/7`** Baseload — 8,760 hours of annual dispatchable rotational inertia and thermal output (International Energy Agency).
  - **`04` / LAND EFFICIENCY (RIGHT)**: **`400 m²`** Surface Footprint — Compact wellpad clustering per GWh over a 30-year lifecycle (US DOE GeoVision).
* **Integer Counter Animation**: Viewport-triggered count-up using exponential ease-out curves, completely free of floating-point decimal artifacts.

---

### 4. Direct Applications Beyond Power
* Explores multi-thermal cascading utilization beyond electricity generation:
  - **District Thermal Heating**: Municipal heating networks across Reykjavik, Paris, and Munich.
  - **Agricultural Greenhouses**: Year-round controlled horticulture without combustion.
  - **Subterranean Mineral Recovery**: Direct extraction of battery-grade lithium from hydrothermal brines.
  - **Industrial Process Heat**: Low-carbon thermal energy for paper, food processing, and drying.

---

### 5. Environmental Responsibility & Nuance
* **The Other Side of Clean Energy**: A candid, scientifically grounded assessment of geothermal engineering challenges:
  - Induced micro-seismicity monitoring and hydraulic pressure boundaries.
  - 100% closed-loop fluid reinjection to prevent thermal drawdown and groundwater migration.
  - Comparison of surface wellpad footprint against massive utility solar and wind acreage.
  - Comprehensive peer-reviewed scientific citations modal (`ReferencesModal.tsx`).

---

### 6. The Frontier — Advanced Geothermal Systems (AGS) & EGS
* Next-generation technology breakdown:
  - **Enhanced Geothermal Systems (EGS)**: Hydraulic shearing in hot dry crystalline basement rock.
  - **Supercritical Hydrothermal Drilling**: Tapping 400°C+ supercritical fluids for 10× energy density.
  - **Closed-Loop Radiator Architecture**: Deep borehole loops circulating non-water working fluids.

---

## ✦ Visual & Editorial Design System

### Color Palette

| Token | Hex | Role |
| :--- | :--- | :--- |
| `earth-ivory` | `#F3F0E6` | Primary background canvas, warm editorial paper tone |
| `earth-forest` | `#10251C` | Primary typography, high-contrast headings, active markers |
| `earth-black` | `#11110F` | Deep contrast text, borders, dark accents |
| `earth-sage` | `#8BAF91` | Technical accents, progress line highlights, metric units |
| `earth-stone` | `#D8D2C5` | Subtle dividers, muted neutral framing, secondary panels |
| `earth-border` | `#DDD7C8` | Hairline dividers, subtle structural strokes |
| `earth-muted` | `#686762` | Monospace tags, metadata notes, scientific qualifications |

### Typography Hierarchy

* **Editorial Serif**: `Playfair Display`, Didot, Georgia (`font-editorial`)
  - Used for oversized headlines, monumental numbers, section titles, and pull quotes.
* **Clean Modern Sans**: `Inter`, system-ui (`font-sans`)
  - Used for explanatory body narrative, scientific descriptions, and editorial paragraphs.
* **Technical Monospace**: `JetBrains Mono`, `ui-monospace`, monospace (`font-mono`)
  - Used for category tags (`01 / ENERGY AVAILABILITY`), timeline nodes, data units, and source citations.

---

## ✦ Motion Design System (`motion/react`)

All interactive elements and scroll-driven transitions adhere to a centralized physics and easing framework defined in `src/lib/motionTokens.ts`:

* **Editorial Easing Curve**: `[0.16, 1, 0.3, 1]` — Custom cubic bezier providing smooth, liquid deceleration without artificial bounce.
* **Viewport Triggers**: Elements reveal on entry using `useInView` with directional horizontal offsets (`x: -32` / `x: 32`) and gentle vertical translations.
* **Scroll-Linked Animations**: Central timeline tracks scroll position via `useScroll` and `useSpring`, smoothly illuminating nodes and progressive line fills.
* **Reduced Motion Guarantee**: Every component checks `useReducedMotionPreference()`. If `prefers-reduced-motion: reduce` is enabled at the OS or browser level, all animations, transforms, and number counters default immediately to their static final states.

---

## ✦ Tech Stack & Dependencies

| Tool | Version | Purpose |
| :--- | :--- | :--- |
| **React** | `19.0.0` | Modern React UI architecture with fine-grained reactivity |
| **TypeScript** | `5.7.3` | Strict type safety across components, props, and scientific datasets |
| **Vite** | `6.1.0` | Ultra-fast build engine and HMR development server |
| **Tailwind CSS** | `3.4.17` | Utility-first responsive design system and custom earth palette |
| **Motion** | `14.11.0` | Modern scroll-driven animations, timeline transitions, and layout springs |
| **Lucide React** | `1.16.0` | Restrained technical and architectural iconography |
| **clsx** / **tailwind-merge** | Latest | Safe class concatenation and conditional Tailwind overrides |

---

## ✦ Project Directory Structure

```text
geothermal-green/
├── index.html                           # Single-page HTML entry point & web fonts
├── package.json                         # Dependencies, scripts, and package metadata
├── postcss.config.js                    # PostCSS configuration with Autoprefixer
├── tailwind.config.js                   # Custom design tokens, colors, fonts & spacing
├── tsconfig.json                        # TypeScript root project configuration
├── tsconfig.app.json                    # Application-specific compiler options
├── tsconfig.node.json                   # Vite Node environment TypeScript configuration
├── vite.config.ts                       # Vite build configuration with React plugin
└── src/
    ├── main.tsx                         # React 19 application mount
    ├── App.tsx                          # Primary page stream orchestrator & state
    ├── index.css                        # Tailwind base directives, typography utilities & layers
    ├── types/
    │   └── index.ts                     # TypeScript domain models (BenefitStat, ProcessStep, etc.)
    ├── data/
    │   └── content.ts                   # Audited editorial copy, metrics & scientific citations
    ├── hooks/
    │   ├── useReducedMotionPreference.ts# Combined Motion + matchMedia reduced-motion hook
    │   └── useScrollProgress.ts         # Viewport scroll position tracker
    ├── lib/
    │   ├── motionTokens.ts              # Centralized durations, easings & spring presets
    │   └── utils.ts                     # cn() class merging utility (clsx + tailwind-merge)
    └── components/
        ├── core/
        │   ├── in-view.tsx              # Generic viewport observation wrapper
        │   ├── transition-panel.tsx     # Animated state transition container
        │   └── index.ts
        ├── footer/
        │   └── Footer.tsx               # Publication footer & scientific reference links
        ├── hero/
        │   ├── HeroSection.tsx          # Framed landscape split-canvas hero
        │   ├── GeothermalExplorerPanel.tsx # Floating upper-right explorer panel
        │   ├── BottomInformationComposition.tsx # Three-part lower information bar
        │   └── DarkFeatureStrip.tsx     # 3-column thermodynamic highlight strip
        ├── motion/
        │   ├── ImageReveal.tsx          # Clip-path photograph entrance effect
        │   ├── MagneticButton.tsx       # Physics-based interactive cursor follower
        │   ├── MotionProvider.tsx       # Global motion context & reduced-motion state
        │   ├── PageTransition.tsx       # Route & view transition wrapper
        │   ├── ParallaxImage.tsx        # Scroll-driven parallax image component
        │   ├── Reveal.tsx               # Fade, fade-up, and scale reveal triggers
        │   ├── ScrollProgress.tsx       # Viewport progress bar at top of window
        │   ├── StaggerGroup.tsx         # Orchestrated stagger list reveal
        │   ├── TextReveal.tsx           # Line-by-line editorial typography reveal
        │   └── motionVariants.ts        # Reusable Framer Motion variant objects
        ├── navigation/
        │   ├── AnnouncementBar.tsx      # Top ticker / subtle brand message
        │   └── Navbar.tsx               # Minimal framed navigation bar with indicators
        └── sections/
            ├── IntroductionSection.tsx  # Geological heat origin narrative
            ├── HowItWorksSection.tsx    # 4-stage thermodynamic process & tech tabs
            ├── EditorialFeatureBanner.tsx # Full-width photographic editorial split
            ├── BenefitsStrip.tsx        # Symmetrical alternating metrics timeline
            ├── ExploreGeothermal.tsx    # Direct multi-thermal applications
            ├── EnvironmentalImpact.tsx  # Balanced lifecycle & environmental assessment
            ├── FutureSection.tsx        # Next-gen EGS, AGS & deep drilling tech
            ├── ClosingSection.tsx       # Closing manifesto banner
            └── ReferencesModal.tsx      # Peer-reviewed scientific sources archive modal
```

---

## ✦ Getting Started

### Prerequisites

Ensure you have **Node.js 18.0.0 or higher** installed:

```bash
node -v   # Should output v18.x, v20.x, or v22.x
npm -v    # Recommended npm 9.x+
```

### Installation

1. **Clone the repository**:
   ```bash
   git clone git@github.com:Shaheemp76m/geothermal-plant.git
   cd geothermal-plant
   ```

2. **Install project dependencies**:
   ```bash
   npm install
   ```

### Development

Start the local Vite development server with Hot Module Replacement (HMR):

```bash
npm run dev
```

The application will run locally at:
```text
➜  Local:   http://localhost:5173/
➜  Network: http://<your-lan-ip>:5173/
```

### Building for Production

Compile TypeScript and build the optimized production bundle with Vite:

```bash
npm run build
```

Production artifacts will be generated in the `dist/` directory:
- `dist/index.html`
- `dist/assets/index-[hash].css`
- `dist/assets/index-[hash].js`

### Local Production Preview

To test the production build locally:

```bash
npm run preview
```

---

## ✦ Scientific Sources & References

All operational data and thermodynamic statistics presented on Geothermal Green are cross-referenced with peer-reviewed publications and national energy laboratories:

1. **Capacity Factor Benchmarks**:
   * *US Department of Energy (DOE)* — *GeoVision: Harnessing the Heat Beneath Our Feet* (2019, updated 2024).
2. **Lifecycle Emissions Harmonization**:
   * *National Renewable Energy Laboratory (NREL)* — *Life Cycle Greenhouse Gas Emissions from Electricity Generation* (LCA Harmonization Project).
3. **Continuous Baseload & Grid Reliability**:
   * *International Energy Agency (IEA)* — *World Energy Outlook & Geothermal Power Generation Reports*.
4. **Surface Land-Use Efficiency**:
   * *US DOE Office of Energy Efficiency & Renewable Energy (EERE)* — *Geothermal Technologies Office Land-Use Studies*.
5. **Enhanced Geothermal Systems (EGS)**:
   * *Massachusetts Institute of Technology (MIT)* — *The Future of Geothermal Energy: Impact of EGS on the United States in the 21st Century*.

---

## ✦ License

This project is licensed under the **MIT License**. Feel free to use, modify, and distribute with attribution.
