import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import {
  fadeUpVariant,
  fadeInVariant,
  slideLeftVariant,
  slideRightVariant,
  scaleRevealVariant,
} from './motionVariants';
import { cn } from '../../lib/utils';

export type RevealVariant = 'fadeUp' | 'fadeIn' | 'slideLeft' | 'slideRight' | 'scaleReveal';

interface RevealProps extends HTMLMotionProps<'div'> {
  children: React.ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
  as?: 'div' | 'section' | 'article' | 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'header' | 'footer';
}

const variantMap = {
  fadeUp: fadeUpVariant,
  fadeIn: fadeInVariant,
  slideLeft: slideLeftVariant,
  slideRight: slideRightVariant,
  scaleReveal: scaleRevealVariant,
};

export const Reveal: React.FC<RevealProps> = ({
  children,
  variant = 'fadeUp',
  delay = 0,
  duration,
  threshold = 0.2,
  once = true,
  className,
  as = 'div',
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotionPreference();
  const selectedVariant = variantMap[variant];

  // When reduced motion is preferred, use a simple instant or subtle fade
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
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={selectedVariant}
      transition={{
        delay,
        ...(duration ? { duration } : {}),
      }}
      className={cn(className)}
      {...rest}
    >
      {children}
    </MotionComponent>
  );
};
