# Geothermal Green --- Design & Implementation Brief

## 1. Mission

Build **Geothermal Green** as a premium, editorial-style geothermal
energy landing page.

Use the uploaded NORD website screenshot as the primary visual
reference. Recreate its **layout language, visual hierarchy, spacing,
typography scale, image composition, and section rhythm**, while
replacing all fashion/e-commerce content with geothermal-energy
storytelling.

This is an informational brand website, not an online store, dashboard,
or long scroll-animation experiment.

## 2. Existing project constraints

-   Inspect the existing repository before changing anything.
-   Preserve the current framework, package manager, build setup,
    deployment configuration, and working features wherever possible.
-   The expected stack is React 19, Vite, TypeScript, and Tailwind CSS.
    Verify the actual repository before assuming.
-   Use the existing project conventions and avoid unnecessary
    dependencies.
-   The site must be responsive, accessible, performant, and deployable
    on Vercel.
-   Do not overwrite or delete the user's existing work without
    understanding it first.

## 3. Reference design: elements to reproduce

The reference has these defining characteristics:

1.  A very thin announcement strip at the top.
2.  A clean navigation row with links on the left, a centered wordmark,
    and compact utility/action icons on the right.
3.  A large warm-ivory hero with enormous black serif typography behind
    a central product composition.
4.  Small editorial text blocks positioned on either side of the hero
    image.
5.  A full-width near-black category/feature strip with three compact
    image-and-text groups.
6.  A wide photographic editorial banner with text on the left and a
    strong image on the right.
7.  A light horizontal benefits strip with four concise items and simple
    line icons.
8.  A spacious multi-column content-card section.
9.  A restrained footer.

Preserve this overall sequence and balance. Adapt content rather than
copying NORD's branding, products, or exact text.

## 4. Brand direction

**Brand:** GEOTHERMAL GREEN

**Positioning:** A modern, premium educational platform explaining the
power beneath Earth's surface and its potential to support a more
sustainable energy future.

### Visual system

-   Main background: warm ivory, approximately `#F3F0E6`.
-   Main text: near-black, approximately `#11110F`.
-   Dark feature strip: near-black, approximately `#10110F`.
-   Accent: muted natural green, approximately `#748A70`.
-   Secondary neutral: warm stone, approximately `#D8D2C5`.
-   Use a high-contrast editorial serif for large display headlines and
    a clean sans-serif for navigation, body copy, labels, and data.
-   Keep typography large, deliberate, and uncluttered.
-   Use thin dividers, restrained borders, and generous whitespace.
-   Avoid generic SaaS styling, excessive rounded cards, glassmorphism,
    neon green, and decorative gradients.
-   Use natural, cinematic photography and scientifically credible
    geothermal imagery.

## 5. Page architecture and content

Build a single-page landing page with normal anchor navigation.
Navigation links should jump to sections; do not force users through
scroll-triggered storytelling.

### A. Announcement bar

A narrow top strip with a concise brand statement, for example:

`ENERGY FROM THE EARTH · POWER FOR THE FUTURE`

Keep it understated.

### B. Main navigation

-   Left: `DISCOVER`, `HOW IT WORKS`, `APPLICATIONS`, `IMPACT`
-   Center: `GEOTHERMAL GREEN` wordmark
-   Right: one compact `EXPLORE` action or menu icon
-   Keep the navigation clean and responsive.
-   On small screens, use an accessible compact menu.

### C. Hero

Use the same composition as the NORD hero:

-   Warm ivory background.
-   Extremely large editorial serif word behind the main image, such as
    `EARTH` or `GEOTHERMAL`.
-   A central, high-quality geothermal landscape / Earth cutaway /
    geothermal facility image.
-   Small supporting text on the left and right.
-   One restrained CTA: `EXPLORE THE ENERGY`.
-   Hero headline direction: **"The Earth's Energy. Our Future."**
-   Supporting copy: "Discover the natural heat beneath our feet --- and
    how it can help power a more sustainable world."

The central image must be the visual focus. Do not let text obscure
important image details.

### D. Dark feature strip

A full-width near-black band, analogous to the three product-category
groups in the reference.

Use three compact feature groups:

1.  **HOW IT WORKS** --- Heat from beneath the surface becomes useful
    energy.
2.  **WHERE IT WORKS** --- Geothermal energy supports electricity,
    heating, and industry.
3.  **WHY IT MATTERS** --- Reliable energy with the potential for lower
    lifecycle emissions.

Each group should have a small image or restrained visual, a short
description, and a text link to its page section.

### E. Editorial feature banner

A wide photographic section with text on the left and a strong
geothermal image on the right.

Suggested eyebrow: `POWER BENEATH THE SURFACE`

Headline: **"A Natural Source. A Different Kind of Energy."**

Explain the basic geothermal process in a few concise sentences. CTA:
`UNDERSTAND THE PROCESS`.

### F. Benefits / facts strip

A light neutral strip with four compact facts or principles:

-   `24/7` --- Can provide continuous energy where resources and systems
    are suitable.
-   `LOW-CARBON` --- Generally low lifecycle greenhouse-gas emissions
    compared with fossil generation.
-   `VERSATILE` --- Electricity, heating, cooling, and direct-use
    applications.
-   `LOCAL RESOURCE` --- Can reduce reliance on imported fuels in
    suitable regions.

Important: verify every numerical claim before displaying it. Do not
imply geothermal is impact-free or available everywhere. Use accurate
qualifiers.

### G. Explore geothermal section

A spacious section with a heading such as **"More Than Electricity."**

Use three or four editorial cards, not a dense dashboard:

-   **Electricity Generation** --- Geothermal steam or heat drives
    power-generation systems.
-   **Heating & Cooling** --- Ground-source heat pumps and district
    heating use shallow or deeper ground heat.
-   **Industry & Agriculture** --- Direct heat can support greenhouses,
    food processing, aquaculture, and selected industrial processes.
-   **The Built Environment** --- Geothermal systems can support
    efficient heating and cooling in buildings.

Each card should use strong imagery, a concise explanation, and a simple
text link or reveal.

### H. Environmental impact section

Headline direction: **"Energy for Today. Consideration for Tomorrow."**

Explain: - Potential to reduce greenhouse-gas emissions compared with
fossil-fuel alternatives. - Small surface footprint for some plant
designs, while acknowledging site-specific infrastructure. - Continuous
generation potential, unlike weather-dependent sources. - Water use,
induced seismicity, subsurface management, and local ecological impacts
must be acknowledged honestly.

Avoid unsupported claims such as "zero emissions," "no environmental
impact," or "unlimited energy."

### I. Future section

A wide editorial section about: - Enhanced Geothermal Systems (EGS). -
Improved drilling and well construction. - Advanced subsurface imaging
and reservoir management. - Closed-loop geothermal concepts. - Potential
expansion into regions that lack conventional high-quality hydrothermal
resources.

Use a forward-looking headline, but distinguish demonstrated
technologies from emerging concepts.

### J. Footer

Include: - Geothermal Green wordmark. - Short mission statement. -
Anchor links. - Research / references link. - Credits and copyright. -
Any required project/team information.

## 6. Interaction and motion

Keep interactions restrained and purposeful:

-   Smooth anchor navigation.
-   Subtle hover states on links and cards.
-   Small image transitions where appropriate.
-   Gentle entrance transitions only if they do not delay content.
-   Accessible focus states and reduced-motion support.

Do not build: - A full-screen scroll-jacking experience. - A complex
dashboard. - Unrequested simulations, maps, or data explorers. -
Excessive parallax or 3D effects. - Fake statistics or fake live data.

## 7. Responsive behavior

Desktop: - Preserve the reference's broad editorial composition. -
Center the wordmark in the navigation. - Use large hero typography and a
central visual.

Tablet: - Scale down display typography. - Reflow feature groups without
losing their hierarchy. - Keep images large enough to remain meaningful.

Mobile: - Compact navigation. - Stack hero content intentionally. -
Prevent oversized background typography from causing horizontal
overflow. - Stack feature groups and cards. - Keep text readable and
CTAs easy to tap. - Test at narrow widths, including approximately
360px.

## 8. Multi-agent execution plan

Use parallel agents only for independent workstreams. First, have a
lead/orchestrator inspect the repository and establish shared
interfaces, design tokens, file ownership, and integration rules.

### Agent 1 --- Repository audit and architecture

-   Inspect the project structure, dependencies, scripts, routes, and
    current implementation.
-   Report the existing architecture and identify reusable components.
-   Propose the smallest safe change set.
-   Do not modify files owned by other agents.

### Agent 2 --- Design system and navigation

-   Implement global design tokens, typography, page shell, announcement
    bar, responsive navigation, and footer.
-   Own shared styles and navigation components.
-   Match the NORD reference's minimal editorial language.

### Agent 3 --- Hero and feature strip

-   Implement the hero composition and dark three-feature strip.
-   Own the hero and feature-strip components and their scoped styles.
-   Use the supplied screenshot as visual guidance; do not reproduce
    NORD branding.

### Agent 4 --- Editorial content sections

-   Implement the editorial banner, benefits strip, applications cards,
    environmental impact, and future sections.
-   Own only the section components and scoped styles assigned by the
    orchestrator.
-   Keep copy concise, accurate, and consistent with the brand.

### Agent 5 --- Assets and content verification

-   Identify or prepare suitable geothermal imagery and icons.
-   Prefer optimized, appropriately licensed assets or existing project
    assets.
-   Verify scientific claims against reliable sources and provide source
    links in the site's references area.
-   Do not invent statistics or present emerging technologies as
    universally deployed.

### Agent 6 --- QA and responsive testing

-   Once components are integrated, test build, TypeScript,
    responsiveness, accessibility, navigation, image loading, and
    console errors.
-   Report issues with exact file paths and reproduction steps.
-   Do not independently rewrite components owned by other agents;
    coordinate fixes with their owners.

## 9. Orchestration and integration rules

1.  The lead agent inspects the repository before parallel
    implementation begins.
2.  The lead agent defines component contracts, filenames, design
    tokens, and ownership boundaries.
3.  Agents may work simultaneously only when their files and
    responsibilities do not conflict.
4.  Do not let multiple agents edit the same global stylesheet, app
    entry point, router, or shared component.
5.  If a shared change is required, the lead agent owns it and
    communicates the interface to other agents.
6.  Integrate completed work in a controlled sequence.
7.  Run the actual project build and type checks after integration.
8.  Fix integration conflicts rather than hiding them or deleting
    working code.
9.  Do not claim completion until the app runs successfully and the main
    layouts have been checked at desktop and mobile sizes.
10. If the environment does not support parallel agents, execute the
    same workstreams sequentially without pretending agents ran.

## 10. Definition of done

The implementation is complete only when:

-   The site clearly resembles the supplied reference in layout and
    visual hierarchy.
-   It reads as a premium environmental-energy brand, not an e-commerce
    template.
-   All navigation anchors work.
-   All sections are present and use coherent content.
-   Desktop, tablet, and mobile layouts work.
-   Typography, spacing, image crops, and section transitions are
    polished.
-   No broken images, dead links, placeholder text, or console errors
    remain.
-   Scientific claims are qualified and sources are provided.
-   The existing project builds successfully and remains deployable on
    Vercel.

## 11. Final instruction to the coding agent

Do not start by generating the entire site in one pass. Audit first,
establish ownership and interfaces, then delegate independent workflows
in parallel. Prioritize visual fidelity to the supplied reference,
coherent implementation, and verified functionality over adding
unnecessary features.

The result should feel like a premium global geothermal-energy brand:
editorial, natural, confident, minimal, and credible.
