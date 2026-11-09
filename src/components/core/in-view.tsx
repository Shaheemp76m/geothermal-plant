import React, { useRef } from 'react';
import { motion, useInView, type Variants, type Transition, type UseInViewOptions } from 'motion/react';
import { cn } from '../../lib/utils';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';

export interface InViewProps {
  children: React.ReactNode;
  variants?: Variants;
  transition?: Transition;
  viewOptions?: UseInViewOptions;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'ul' | 'ol' | 'li' | 'header' | 'footer';
}

const defaultVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const InView: React.FC<InViewProps> = ({
  children,
  variants = defaultVariants,
  transition,
  viewOptions = { once: true, margin: '0px 0px -100px 0px' },
  className,
  as = 'div',
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, viewOptions);
  const shouldReduceMotion = useReducedMotionPreference();

  const MotionComponent = (motion as any)[as] || motion.div;

  if (shouldReduceMotion) {
    return (
      <div ref={containerRef} className={cn(className)}>
        {children}
      </div>
    );
  }

  return (
    <MotionComponent
      ref={containerRef}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={transition}
      className={cn(className)}
    >
      {children}
    </MotionComponent>
  );
};
