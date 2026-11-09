import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { cn } from '../../lib/utils';

interface ParallaxImageProps {
  src: string;
  alt: string;
  aspectRatio?: string;
  depth?: number; // Distance in px or percentage to shift (e.g. 30)
  className?: string;
  imgClassName?: string;
  priority?: boolean;
}

export const ParallaxImage: React.FC<ParallaxImageProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-[16/10]',
  depth = 30,
  className,
  imgClassName,
  priority = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotionPreference();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    shouldReduceMotion ? ['0px', '0px'] : [`-${depth}px`, `${depth}px`]
  );

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden', aspectRatio, className)}
    >
      <motion.img
        style={{ y, scale: shouldReduceMotion ? 1 : 1.1 }}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={cn('w-full h-full object-cover will-change-transform', imgClassName)}
      />
    </div>
  );
};
