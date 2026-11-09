import type { Variants } from 'motion/react';
import { MOTION_DURATIONS, MOTION_EASINGS, MOTION_SPRINGS, MOTION_STAGGERS } from '../../lib/motionTokens';

/**
 * Standard Viewport & Entrance Variants
 */

export const fadeUpVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

export const fadeInVariant: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

export const slideLeftVariant: Variants = {
  hidden: {
    opacity: 0,
    x: -24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

export const slideRightVariant: Variants = {
  hidden: {
    opacity: 0,
    x: 24,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

export const scaleRevealVariant: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: MOTION_DURATIONS.slow,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

/**
 * Stagger Container & Child Variants
 */

export const staggerContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION_STAGGERS.standard,
      delayChildren: 0.05,
    },
  },
};

export const staggerFastContainerVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: MOTION_STAGGERS.fast,
      delayChildren: 0.02,
    },
  },
};

export const staggerChildVariant: Variants = {
  hidden: {
    opacity: 0,
    y: 16,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: MOTION_DURATIONS.standard,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

/**
 * Editorial Typography Reveal Variants
 * Used for line-by-line and word-by-word upward sliding reveals
 */

export const textLineContainerVariant: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: MOTION_STAGGERS.standard,
    },
  },
};

export const textLineChildVariant: Variants = {
  hidden: {
    y: '100%',
    opacity: 0,
  },
  visible: {
    y: '0%',
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.slow,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

/**
 * Cinematic Image Reveal Variants
 * Uses clip-path and gentle scale settling
 */

export const imageRevealVariant: Variants = {
  hidden: {
    clipPath: 'inset(10% 0% 10% 0%)',
    scale: 1.08,
    opacity: 0,
  },
  visible: {
    clipPath: 'inset(0% 0% 0% 0%)',
    scale: 1,
    opacity: 1,
    transition: {
      duration: MOTION_DURATIONS.image,
      ease: MOTION_EASINGS.editorial,
    },
  },
};

/**
 * Interactive Gesture Variants for Buttons and Links
 */

export const buttonGestureVariant: Variants = {
  initial: { scale: 1 },
  hover: {
    scale: 1.02,
    transition: MOTION_SPRINGS.restrained,
  },
  tap: {
    scale: 0.97,
    transition: { duration: 0.1 },
  },
};
