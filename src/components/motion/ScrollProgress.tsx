import React from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_SPRINGS } from '../../lib/motionTokens';
import { cn } from '../../lib/utils';

interface ScrollProgressProps {
  className?: string;
  colorClass?: string;
}

export const ScrollProgress: React.FC<ScrollProgressProps> = ({
  className,
  colorClass = 'bg-earth-sage',
}) => {
  const shouldReduceMotion = useReducedMotionPreference();
  const { scrollYProgress } = useScroll();

  const scaleX = useSpring(scrollYProgress, {
    stiffness: shouldReduceMotion ? 1000 : MOTION_SPRINGS.smooth.stiffness,
    damping: shouldReduceMotion ? 100 : MOTION_SPRINGS.smooth.damping,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: '0%' }}
      className={cn(
        'fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none shadow-[0_0_8px_rgba(139,175,145,0.4)]',
        colorClass,
        className
      )}
      aria-hidden="true"
    />
  );
};
