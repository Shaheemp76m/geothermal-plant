import React from 'react';
import { motion } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../lib/motionTokens';
import { cn } from '../../lib/utils';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export const PageTransition: React.FC<PageTransitionProps> = ({ children, className }) => {
  const shouldReduceMotion = useReducedMotionPreference();

  if (shouldReduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{
        duration: MOTION_DURATIONS.standard,
        ease: MOTION_EASINGS.editorial,
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
};
