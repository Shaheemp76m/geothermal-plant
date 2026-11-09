import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_DURATIONS, MOTION_EASINGS } from '../../lib/motionTokens';
import { cn } from '../../lib/utils';

interface ImageRevealProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  src: string;
  alt: string;
  aspectRatio?: string;
  priority?: boolean;
  className?: string;
  imgClassName?: string;
  threshold?: number;
  once?: boolean;
  delay?: number;
  duration?: number;
  enableHoverZoom?: boolean;
  children?: React.ReactNode;
}

export const ImageReveal: React.FC<ImageRevealProps> = ({
  src,
  alt,
  aspectRatio = 'aspect-[16/10]',
  priority = false,
  className,
  imgClassName,
  threshold = 0.15,
  once = true,
  delay = 0.1,
  duration = MOTION_DURATIONS.image,
  enableHoverZoom = true,
  children,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotionPreference();

  if (shouldReduceMotion) {
    return (
      <div className={cn('relative overflow-hidden', aspectRatio, className)} {...(rest as any)}>
        <img
          src={src}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          className={cn('w-full h-full object-cover', imgClassName)}
        />
        {children}
      </div>
    );
  }

  // Wrapper clip reveal
  const containerVariants = {
    hidden: {
      clipPath: 'inset(12% 0% 12% 0%)',
      opacity: 0,
    },
    visible: {
      clipPath: 'inset(0% 0% 0% 0%)',
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: MOTION_EASINGS.editorial,
      },
    },
  };

  // Internal image settling transition
  const imageVariants = {
    hidden: {
      scale: 1.12,
    },
    visible: {
      scale: 1,
      transition: {
        duration: duration + 0.25,
        delay,
        ease: MOTION_EASINGS.editorial,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold }}
      variants={containerVariants}
      className={cn('relative overflow-hidden group', aspectRatio, className)}
      {...rest}
    >
      <motion.img
        variants={imageVariants}
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        className={cn(
          'w-full h-full object-cover',
          enableHoverZoom ? 'group-hover:scale-105 transition-transform duration-700 ease-out' : '',
          imgClassName
        )}
      />
      {children}
    </motion.div>
  );
};
