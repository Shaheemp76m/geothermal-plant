import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { useReducedMotionPreference } from '../../hooks/useReducedMotionPreference';
import { MOTION_SPRINGS } from '../../lib/motionTokens';
import { cn } from '../../lib/utils';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<any>) => void;
  href?: string;
  as?: 'button' | 'a';
  strength?: number; // Subtle magnetic displacement in px, default 5
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className,
  onClick,
  href,
  as = href ? 'a' : 'button',
  strength = 6,
}) => {
  const buttonRef = useRef<any>(null);
  const shouldReduceMotion = useReducedMotionPreference();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (shouldReduceMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Subtle damping
    setPosition({
      x: (middleX / (width / 2)) * strength,
      y: (middleY / (height / 2)) * strength,
    });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const Component = as === 'a' ? motion.a : motion.button;

  return (
    <Component
      ref={buttonRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={MOTION_SPRINGS.restrained}
      whileHover={shouldReduceMotion ? {} : { scale: 1.02 }}
      whileTap={shouldReduceMotion ? {} : { scale: 0.97 }}
      className={cn(
        'relative inline-flex items-center justify-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-earth-sage',
        className
      )}
    >
      {children}
    </Component>
  );
};
