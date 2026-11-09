import { useReducedMotion } from 'motion/react';
import { useState, useEffect } from 'react';

/**
 * Hook to determine if user prefers reduced motion.
 * Combines Motion's hook with direct window.matchMedia check for maximum reliability.
 */
export function useReducedMotionPreference(): boolean {
  const motionReduced = useReducedMotion();
  const [mediaQueryReduced, setMediaQueryReduced] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handler = (event: MediaQueryListEvent) => {
      setMediaQueryReduced(event.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    } else {
      // Compatibility for legacy browsers
      mediaQuery.addListener(handler);
      return () => mediaQuery.removeListener(handler);
    }
  }, []);

  return Boolean(motionReduced || mediaQueryReduced);
}
