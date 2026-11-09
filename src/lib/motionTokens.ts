/**
 * Centralized Motion Tokens for Geothermal Green
 * Provides unified timing, easing curves, and spring configurations
 * adhering to the premium environmental editorial design system.
 */

export const MOTION_DURATIONS = {
  micro: 0.2, // 200ms for button taps, micro-indicators
  quick: 0.3, // 300ms for hover states, tooltip reveals
  standard: 0.55, // 550ms for card reveals, standard text elements
  slow: 0.75, // 750ms for major headings, section introductions
  image: 0.95, // 950ms for large cinematic photograph reveals
  cinematic: 1.1, // 1100ms for full-bleed hero visuals
} as const;

export const MOTION_EASINGS = {
  // Smooth custom ease-out curve for editorial entrance animations
  editorial: [0.16, 1, 0.3, 1] as const,
  // Snappier ease-out for interactive micro-animations
  easeOutExpo: [0.19, 1, 0.22, 1] as const,
  // Gentle ease-in-out for looping or breathing elements
  easeInOut: [0.65, 0, 0.35, 1] as const,
  // Linear curve for scroll-tied transformations
  linear: [0, 0, 1, 1] as const,
} as const;

export const MOTION_SPRINGS = {
  // Restrained, controlled physics for magnetic buttons & micro-interactions
  restrained: {
    type: 'spring' as const,
    stiffness: 260,
    damping: 26,
    mass: 0.8,
  },
  // Smooth, liquid damping for layout transitions and tab indicators
  smooth: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 20,
    mass: 1,
  },
  // Snappy layout spring for UI markers
  snappy: {
    type: 'spring' as const,
    stiffness: 380,
    damping: 32,
  },
} as const;

export const MOTION_STAGGERS = {
  fast: 0.04,
  standard: 0.08,
  slow: 0.14,
  section: 0.2,
} as const;
