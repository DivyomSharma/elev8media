'use client';

import { motion, HTMLMotionProps } from 'framer-motion';
import { forwardRef, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'glass';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
    children: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    icon?: ReactNode;
    iconPosition?: 'left' | 'right';
    fullWidth?: boolean;
    loading?: boolean;
    className?: string;
}

const variantStyles: Record<ButtonVariant, string> = {
    primary: `
    bg-transparent text-[var(--color-accent-cyan)] 
    border border-[var(--color-accent-cyan)]
    hover:bg-[rgba(0,229,255,0.1)]
    hover:shadow-[0_0_20px_rgba(0,229,255,0.3)]
  `,
    secondary: `
    bg-transparent text-[var(--color-accent-amber)]
    border border-[var(--color-accent-amber)]
    hover:bg-[rgba(255,149,0,0.1)]
    hover:shadow-[0_0_20px_rgba(255,149,0,0.3)]
  `,
    ghost: `
    bg-transparent text-white
    border border-[rgba(255,255,255,0.1)]
    hover:border-[rgba(255,255,255,0.3)]
    hover:bg-[rgba(255,255,255,0.05)]
  `,
    glass: `
    bg-[rgba(2,6,15,0.5)] backdrop-blur-[24px] saturate-[160%]
    text-white border border-[rgba(0,229,255,0.12)]
    hover:border-[rgba(0,229,255,0.3)]
    hover:shadow-[0_0_20px_rgba(0,229,255,0.2)]
  `,
};

const sizeStyles: Record<ButtonSize, string> = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            children,
            variant = 'primary',
            size = 'md',
            icon,
            iconPosition = 'right',
            fullWidth = false,
            loading = false,
            className = '',
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <motion.button
                ref={ref}
                className={`
          inline-flex items-center justify-center gap-2
          font-medium tracking-wide uppercase
          rounded-lg cursor-pointer
          transition-all duration-300
          disabled:opacity-50 disabled:cursor-not-allowed
          ${variantStyles[variant]}
          ${sizeStyles[size]}
          ${fullWidth ? 'w-full' : ''}
          ${className}
        `}
                whileHover={!disabled ? { scale: 1.02 } : undefined}
                whileTap={!disabled ? { scale: 0.98 } : undefined}
                disabled={disabled || loading}
                {...props}
            >
                {loading ? (
                    <motion.span
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    />
                ) : (
                    <>
                        {icon && iconPosition === 'left' && <span className="flex-shrink-0">{icon}</span>}
                        <span>{children}</span>
                        {icon && iconPosition === 'right' && <span className="flex-shrink-0">{icon}</span>}
                    </>
                )}
            </motion.button>
        );
    }
);

Button.displayName = 'Button';

export default Button;
