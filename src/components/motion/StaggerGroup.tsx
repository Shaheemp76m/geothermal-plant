import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { staggerChildVariant } from './motionVariants';
import { cn } from '../../lib/utils';
import { MOTION_STAGGERS } from '../../lib/motionTokens';

type MotionContainerElement = 'div' | 'section' | 'article' | 'span' | 'ul' | 'ol' | 'li' | 'header' | 'footer';

interface StaggerGroupProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  staggerDelay?: number;
  delayChildren?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: MotionContainerElement;
}

export const StaggerGroup: React.FC<StaggerGroupProps> = ({
  children,
  staggerDelay = MOTION_STAGGERS.standard,
  delayChildren = 0.05,
  threshold = 0.15,
  once = true,
  className,
  as = 'div',
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotionPreference();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...(rest as any)}>
        {children}
      </div>
    );
  }

  const MotionComponent = (motion as any)[as || 'div'] || motion.div;

  const dynamicContainerVariant = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren,
      },
    },
  };

  return (
    <MotionComponent
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={dynamicContainerVariant}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};

interface StaggerItemProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  className?: string;
  as?: MotionContainerElement;
}

export const StaggerItem: React.FC<StaggerItemProps> = ({
  children,
  className,
  as = 'div',
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotionPreference();

  if (shouldReduceMotion) {
    return (
      <div className={className} {...(rest as any)}>
        {children}
      </div>
    );
  }

  const MotionComponent = (motion as any)[as || 'div'] || motion.div;

  return (
    <MotionComponent
      variants={staggerChildVariant}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};
