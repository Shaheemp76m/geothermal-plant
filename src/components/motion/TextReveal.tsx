import React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_DURATIONS, MOTION_EASINGS, MOTION_STAGGERS } from '../../lib/motionTokens';
import { cn } from '../../lib/utils';

interface TextRevealProps extends HTMLMotionProps<'div'> {
  text?: string;
  lines?: string[];
  children?: React.ReactNode;
  mode?: 'line' | 'word';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  delay?: number;
  staggerDelay?: number;
  threshold?: number;
  once?: boolean;
  className?: string;
}

export const TextReveal: React.FC<TextRevealProps> = ({
  text,
  lines,
  children,
  mode = 'line',
  as = 'h2',
  delay = 0,
  staggerDelay = MOTION_STAGGERS.standard,
  threshold = 0.2,
  once = true,
  className,
  ...rest
}) => {
  const shouldReduceMotion = useReducedMotionPreference();
  const Tag = as as any;

  // Resolve lines or words to animate
  let segments: string[] = [];
  if (lines && lines.length > 0) {
    segments = lines;
  } else if (text) {
    if (mode === 'word') {
      segments = text.split(/\s+/).filter(Boolean);
    } else {
      segments = text.split('\n').filter(Boolean);
    }
  }

  if (shouldReduceMotion || (segments.length === 0 && children)) {
    return (
      <Tag className={cn(className)} {...(rest as any)}>
        {children || text}
      </Tag>
    );
  }

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      y: '105%',
      opacity: 0,
    },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: MOTION_DURATIONS.slow,
        ease: MOTION_EASINGS.editorial,
      },
    },
  };

  return (
    <Tag className={cn(className)} {...(rest as any)}>
      <motion.span
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold }}
        variants={containerVariants}
        className="inline-block w-full"
      >
        {segments.map((segment, index) => (
          <span
            key={index}
            className={cn(
              'overflow-hidden',
              mode === 'line' ? 'block' : 'inline-block mr-[0.25em]'
            )}
          >
            <motion.span
              variants={itemVariants}
              className={cn(
                'inline-block',
                mode === 'line' ? 'w-full' : ''
              )}
            >
              {segment}
            </motion.span>
          </span>
        ))}
      </motion.span>
    </Tag>
  );
};
