'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'children'> {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'subtle';
  hover?: boolean;
  glow?: 'none' | 'cyan' | 'amber' | 'violet';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const paddingMap = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-12',
};

const glowMap = {
  none: '',
  cyan: 'hover:shadow-[0_0_40px_rgba(0,229,255,0.3)]',
  amber: 'hover:shadow-[0_0_40px_rgba(255,149,0,0.3)]',
  violet: 'hover:shadow-[0_0_40px_rgba(139,92,246,0.3)]',
};

const variantStyles = {
  default: 'bg-[rgba(26,26,26,0.85)] backdrop-blur-[20px] backdrop-saturate-[180%]',
  elevated: 'bg-[rgba(36,36,36,0.80)] backdrop-blur-[24px] backdrop-saturate-[200%]',
  subtle: 'bg-[rgba(26,26,26,0.60)] backdrop-blur-[12px]',
};

export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  (
    {
      children,
      variant = 'default',
      hover = true,
      glow = 'cyan',
      padding = 'lg',
      className = '',
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={`
          ${variantStyles[variant]}
          border border-[var(--glass-border)]
          rounded-xl
          ${paddingMap[padding]}
          transition-all duration-300
          ${hover ? 'hover:border-[var(--glass-border-hover)]' : ''}
          ${glowMap[glow]}
          ${className}
        `}
        whileHover={hover ? { y: -8, transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export default GlassCard;
