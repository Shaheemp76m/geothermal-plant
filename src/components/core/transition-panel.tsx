import React from 'react';
import { AnimatePresence, motion, type Transition, type Variants } from 'motion/react';
import { cn } from '../../lib/utils';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

export interface TransitionPanelProps {
  children: React.ReactNode[];
  activeIndex: number;
  variants?: Variants;
  transition?: Transition;
  className?: string;
  custom?: any;
}

const defaultVariants: Variants = {
  enter: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? 40 : -40,
    filter: 'blur(4px)',
  }),
  center: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
  },
  exit: (direction: number) => ({
    opacity: 0,
    y: direction > 0 ? -40 : 40,
    filter: 'blur(4px)',
  }),
};

export const TransitionPanel: React.FC<TransitionPanelProps> = ({
  children,
  activeIndex,
  variants = defaultVariants,
  transition = { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
  className,
  custom,
}) => {
  const shouldReduceMotion = useReducedMotionPreference();

  if (shouldReduceMotion) {
    return (
      <div className={cn('relative w-full', className)}>
        {children[activeIndex]}
      </div>
    );
  }

  return (
    <div className={cn('relative w-full overflow-hidden', className)}>
      <AnimatePresence initial={false} mode="wait" custom={custom}>
        <motion.div
          key={activeIndex}
          custom={custom}
          initial="enter"
          animate="center"
          exit="exit"
          variants={variants}
          transition={transition}
          className="w-full"
        >
          {children[activeIndex]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};
