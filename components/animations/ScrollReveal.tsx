'use client';

import { motion, useReducedMotion, Variants, Transition } from 'framer-motion';
import { ReactNode, ElementType } from 'react';
import {
    fadeInUp,
    fadeInDown,
    fadeInLeft,
    fadeInRight,
    scaleIn,
    staggerItem,
    reducedMotionVariants,
    viewportConfig,
} from '@/lib/animations';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'stagger';

interface ScrollRevealProps {
    children: ReactNode;
    animation?: AnimationType;
    delay?: number;
    duration?: number;
    className?: string;
    as?: 'div' | 'section' | 'article' | 'span' | 'header' | 'footer' | 'aside' | 'main' | 'nav';
    once?: boolean;
    amount?: number;
}

const animationVariants: Record<AnimationType, Variants> = {
    fadeUp: fadeInUp,
    fadeDown: fadeInDown,
    fadeLeft: fadeInLeft,
    fadeRight: fadeInRight,
    scale: scaleIn,
    stagger: staggerItem,
};

export function ScrollReveal({
    children,
    animation = 'fadeUp',
    delay = 0,
    duration,
    className = '',
    as = 'div',
    once = true,
    amount = 0.2,
}: ScrollRevealProps) {
    const prefersReducedMotion = useReducedMotion();

    const variants = prefersReducedMotion
        ? reducedMotionVariants
        : animationVariants[animation];

    const MotionComponent = motion[as as keyof typeof motion] as typeof motion.div;

    // Build custom transition if delay or duration provided
    const customTransition = (delay || duration) ? {
        delay,
        duration: duration || 0.6,
    } : undefined;

    return (
        <MotionComponent
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount, margin: '-50px' }}
            variants={variants}
            transition={customTransition}
        >
            {children}
        </MotionComponent>
    );
}

// Stagger container for multiple reveal items
interface StaggerContainerProps {
    children: ReactNode;
    className?: string;
    staggerDelay?: number;
    delayChildren?: number;
}

export function StaggerContainer({
    children,
    className = '',
    staggerDelay = 0.08,
    delayChildren = 0.1,
}: StaggerContainerProps) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={viewportConfig}
            variants={{
                hidden: { opacity: 0 },
                visible: {
                    opacity: 1,
                    transition: prefersReducedMotion
                        ? { duration: 0.01 }
                        : {
                            staggerChildren: staggerDelay,
                            delayChildren,
                        },
                },
            }}
        >
            {children}
        </motion.div>
    );
}

// Individual stagger item
export function StaggerItem({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    const prefersReducedMotion = useReducedMotion();

    return (
        <motion.div
            className={className}
            variants={prefersReducedMotion ? reducedMotionVariants : staggerItem}
        >
            {children}
        </motion.div>
    );
}

export default ScrollReveal;
