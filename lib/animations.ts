import { Variants } from 'framer-motion';

// Common easing functions
export const easings = {
    easeOutExpo: [0.16, 1, 0.3, 1] as const,
    easeOutQuart: [0.25, 1, 0.5, 1] as const,
    easeInOutCubic: [0.65, 0, 0.35, 1] as const,
};

// Fade in from bottom
export const fadeInUp: Variants = {
    hidden: {
        opacity: 0,
        y: 40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: easings.easeOutExpo,
        },
    },
};

// Fade in from top
export const fadeInDown: Variants = {
    hidden: {
        opacity: 0,
        y: -40,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.6,
            ease: easings.easeOutExpo,
        },
    },
};

// Fade in from left
export const fadeInLeft: Variants = {
    hidden: {
        opacity: 0,
        x: -40,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: easings.easeOutExpo,
        },
    },
};

// Fade in from right
export const fadeInRight: Variants = {
    hidden: {
        opacity: 0,
        x: 40,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: easings.easeOutExpo,
        },
    },
};

// Scale in
export const scaleIn: Variants = {
    hidden: {
        opacity: 0,
        scale: 0.9,
    },
    visible: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: easings.easeOutExpo,
        },
    },
};

// Stagger container
export const staggerContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
};

// Stagger item
export const staggerItem: Variants = {
    hidden: {
        opacity: 0,
        y: 20,
    },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: easings.easeOutExpo,
        },
    },
};

// Line draw (for SVG paths)
export const lineDrawVariants: Variants = {
    hidden: {
        pathLength: 0,
        opacity: 0,
    },
    visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
            pathLength: {
                duration: 1.2,
                ease: easings.easeInOutCubic,
            },
            opacity: {
                duration: 0.3,
            },
        },
    },
};

// Page transition
export const pageTransition: Variants = {
    initial: {
        opacity: 0,
        scale: 0.95,
    },
    enter: {
        opacity: 1,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: easings.easeOutExpo,
        },
    },
    exit: {
        opacity: 0,
        scale: 0.95,
        transition: {
            duration: 0.4,
            ease: easings.easeInOutCubic,
        },
    },
};

// Hero text stagger
export const heroTextContainer: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.8, // Wait for 3D elements to load
        },
    },
};

export const heroTextItem: Variants = {
    hidden: {
        opacity: 0,
        y: 60,
        filter: 'blur(10px)',
    },
    visible: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
            duration: 0.8,
            ease: easings.easeOutExpo,
        },
    },
};

// Card hover
export const cardHover = {
    rest: {
        y: 0,
        boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)',
    },
    hover: {
        y: -8,
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.6), 0 0 20px rgba(0, 229, 255, 0.3)',
        transition: {
            duration: 0.3,
            ease: easings.easeOutExpo,
        },
    },
};

// Number count up helper
export const countUp = (from: number, to: number, duration: number = 2) => ({
    initial: { value: from },
    animate: {
        value: to,
        transition: {
            duration,
            ease: easings.easeOutQuart,
        },
    },
});

// Viewport configuration for scroll-triggered animations
export const viewportConfig = {
    once: true,
    amount: 0.2,
    margin: '-50px',
};

// Reduced motion variants (accessibility)
export const reducedMotionVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { duration: 0.01 },
    },
};
