import { useRef } from 'react';
import { useScroll, useSpring, type MotionValue } from 'motion/react';
import { MOTION_SPRINGS } from '../lib/motionTokens';
import { useReducedMotionPreference } from './useReducedMotionPreference';

interface UseScrollProgressOptions {
  smooth?: boolean;
  springConfig?: {
    stiffness?: number;
    damping?: number;
    mass?: number;
  };
  offset?: any;
}

interface UseScrollProgressReturn {
  containerRef: React.RefObject<HTMLDivElement | null>;
  scrollYProgress: MotionValue<number>;
  smoothProgress: MotionValue<number>;
}

export function useScrollProgress(options: UseScrollProgressOptions = {}): UseScrollProgressReturn {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotionPreference();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: options.offset || ['start end', 'end start'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: options.springConfig?.stiffness ?? (shouldReduce ? 1000 : MOTION_SPRINGS.smooth.stiffness),
    damping: options.springConfig?.damping ?? (shouldReduce ? 100 : MOTION_SPRINGS.smooth.damping),
    mass: options.springConfig?.mass ?? MOTION_SPRINGS.smooth.mass,
  });

  return {
    containerRef,
    scrollYProgress,
    smoothProgress,
  };
}
