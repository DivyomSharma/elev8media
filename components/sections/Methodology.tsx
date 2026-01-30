'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const phases = [
    {
        id: '01',
        title: 'DISCOVER',
        description: 'Comprehensive market intelligence and competitive landscape analysis',
        color: 'var(--color-accent-cyan)',
    },
    {
        id: '02',
        title: 'ARCHITECT',
        description: 'Strategic framework development tailored to your growth objectives',
        color: 'var(--color-accent-cyan)',
    },
    {
        id: '03',
        title: 'CREATE',
        description: 'Content and creative production that captures attention and drives action',
        color: 'var(--color-accent-violet)',
    },
    {
        id: '04',
        title: 'LAUNCH',
        description: 'Precision campaign deployment across optimized channel mix',
        color: 'var(--color-accent-violet)',
    },
    {
        id: '05',
        title: 'AMPLIFY',
        description: 'Multi-channel distribution maximizing reach and engagement',
        color: 'var(--color-accent-amber)',
    },
    {
        id: '06',
        title: 'MEASURE',
        description: 'Performance tracking with real-time analytics and insights',
        color: 'var(--color-accent-amber)',
    },
    {
        id: '07',
        title: 'OPTIMIZE',
        description: 'Iterative refinement through continuous testing and learning',
        color: 'var(--color-accent-cyan)',
    },
    {
        id: '08',
        title: 'SCALE',
        description: 'Growth acceleration expanding what works across new opportunities',
        color: 'var(--color-accent-cyan)',
    },
];

export function Methodology() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start end', 'end start'],
    });

    // Animate the connecting line
    const lineProgress = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

    return (
        <section id="process" className="section relative" ref={containerRef}>
            <div className="container">
                {/* Section header */}
                <ScrollReveal className="text-center mb-20">
                    <span className="text-label mb-4 block">Methodology</span>
                    <h2
                        className="text-display mb-6"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                    >
                        THE GROWTH
                        <br />
                        <span className="text-cyan">CYCLE</span>
                    </h2>
                    <p className="text-body text-muted max-w-2xl mx-auto">
                        Eight interconnected phases forming a continuous loop of discovery,
                        execution, and optimization. Growth without ceiling.
                    </p>
                </ScrollReveal>

                {/* Infinity loop visualization */}
                <div className="relative max-w-7xl mx-auto">
                    {/* SVG infinity path */}
                    <svg
                        className="absolute inset-0 w-full h-full pointer-events-none"
                        viewBox="0 0 1000 500"
                        preserveAspectRatio="xMidYMid meet"
                    >
                        {/* Background path */}
                        <path
                            d="M 250 250 
                 C 250 100, 400 100, 500 250 
                 C 600 400, 750 400, 750 250 
                 C 750 100, 600 100, 500 250 
                 C 400 400, 250 400, 250 250"
                            fill="none"
                            stroke="rgba(255,255,255,0.05)"
                            strokeWidth="2"
                        />

                        {/* Animated progress path */}
                        <motion.path
                            d="M 250 250 
                 C 250 100, 400 100, 500 250 
                 C 600 400, 750 400, 750 250 
                 C 750 100, 600 100, 500 250 
                 C 400 400, 250 400, 250 250"
                            fill="none"
                            stroke="url(#infinityGradient)"
                            strokeWidth="2"
                            style={{
                                pathLength: lineProgress,
                            }}
                        />

                        <defs>
                            <linearGradient id="infinityGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="0%" stopColor="var(--color-accent-cyan)" />
                                <stop offset="50%" stopColor="var(--color-accent-violet)" />
                                <stop offset="100%" stopColor="var(--color-accent-cyan)" />
                            </linearGradient>
                        </defs>
                    </svg>

                    {/* Phase cards grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 relative z-10">
                        {phases.map((phase, index) => (
                            <ScrollReveal
                                key={phase.id}
                                animation="fadeUp"
                                delay={index * 0.1}
                            >
                                <motion.div
                                    className="glass-card text-center h-full min-h-[220px] md:min-h-[260px] p-4 md:p-6 flex flex-col justify-center"
                                    whileHover={{ scale: 1.02 }}
                                    style={{
                                        borderColor: `color-mix(in srgb, ${phase.color} 30%, transparent)`,
                                    }}
                                >
                                    {/* Phase number */}
                                    <span
                                        className="text-mono text-xs md:text-sm mb-2 md:mb-3 block"
                                        style={{ color: phase.color }}
                                    >
                                        {phase.id}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-display text-sm sm:text-base md:text-lg lg:text-xl mb-2 md:mb-3 break-words">
                                        {phase.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[10px] sm:text-xs md:text-sm text-muted leading-relaxed">
                                        {phase.description}
                                    </p>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </div>

                    {/* Center "8" symbol */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                        <motion.div
                            className="text-[120px] font-display font-black text-[var(--color-dark-surface)] opacity-20"
                            animate={{ rotate: [0, 360] }}
                            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
                        >
                            ∞
                        </motion.div>
                    </div>
                </div>

                {/* Cycle indicator */}
                <ScrollReveal className="text-center mt-16">
                    <div className="inline-flex items-center gap-3 text-sm text-muted">
                        <span className="w-8 h-[1px] bg-[var(--glass-border)]" />
                        <span>Continuous cycle • No end state • Perpetual growth</span>
                        <span className="w-8 h-[1px] bg-[var(--glass-border)]" />
                    </div>
                </ScrollReveal>
            </div>
        </section>
    );
}

export default Methodology;
