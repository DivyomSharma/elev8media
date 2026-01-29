'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView, useSpring, useTransform } from 'framer-motion';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const metrics = [
    {
        value: 340,
        suffix: '+%',
        label: 'Average Revenue Growth',
        description: 'Mean revenue increase across active client partnerships',
    },
    {
        value: 47,
        prefix: '$',
        suffix: 'M+',
        label: 'Cumulative Investment',
        description: 'Total media spend managed and optimized',
    },
    {
        value: 8.2,
        suffix: 'x',
        label: 'Average ROAS',
        description: 'Return on ad spend across all campaigns',
        decimals: 1,
    },
    {
        value: 32,
        label: 'Active Partnerships',
        description: 'Brands currently scaling with Elev8',
    },
];

function AnimatedNumber({
    value,
    prefix = '',
    suffix = '',
    decimals = 0,
}: {
    value: number;
    prefix?: string;
    suffix?: string;
    decimals?: number;
}) {
    const ref = useRef<HTMLSpanElement>(null);
    const isInView = useInView(ref, { once: true, margin: '-100px' });
    const [displayValue, setDisplayValue] = useState(0);

    const spring = useSpring(0, {
        damping: 30,
        stiffness: 100,
    });

    useEffect(() => {
        if (isInView) {
            spring.set(value);
        }
    }, [isInView, spring, value]);

    useEffect(() => {
        const unsubscribe = spring.on('change', (latest) => {
            setDisplayValue(Number(latest.toFixed(decimals)));
        });
        return unsubscribe;
    }, [spring, decimals]);

    return (
        <span ref={ref} className="text-mono">
            {prefix}
            {displayValue.toLocaleString(undefined, {
                minimumFractionDigits: decimals,
                maximumFractionDigits: decimals,
            })}
            {suffix}
        </span>
    );
}

export function ImpactMetrics() {
    return (
        <section className="section relative bg-[var(--color-dark-primary)]">
            {/* Background gradient */}
            <div
                className="absolute inset-0 pointer-events-none"
                style={{
                    background: 'radial-gradient(ellipse at center, rgba(0,229,255,0.03) 0%, transparent 70%)',
                }}
            />

            <div className="container relative">
                {/* Section header */}
                <ScrollReveal className="text-center mb-16">
                    <span className="text-label mb-4 block">Results</span>
                    <h2
                        className="text-display mb-6"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                    >
                        IMPACT
                        <br />
                        <span className="text-cyan">METRICS</span>
                    </h2>
                    <p className="text-body text-muted max-w-2xl mx-auto">
                        Numbers that tell the story. These aren't projections—they're
                        verified results from our client partnerships.
                    </p>
                </ScrollReveal>

                {/* Metrics grid */}
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-px bg-[var(--glass-border)] rounded-xl overflow-hidden">
                    {metrics.map((metric, index) => (
                        <StaggerItem key={index}>
                            <div className="bg-[var(--color-dark-space)] p-8 lg:p-10 text-center h-full">
                                {/* Value */}
                                <div
                                    className="text-4xl lg:text-5xl font-bold mb-3"
                                    style={{ color: 'var(--color-accent-cyan)' }}
                                >
                                    <AnimatedNumber
                                        value={metric.value}
                                        prefix={metric.prefix}
                                        suffix={metric.suffix}
                                        decimals={metric.decimals}
                                    />
                                </div>

                                {/* Label */}
                                <h3 className="text-sm font-medium mb-2">
                                    {metric.label}
                                </h3>

                                {/* Description */}
                                <p className="text-xs text-muted">
                                    {metric.description}
                                </p>
                            </div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Subtle floating shapes in background */}
                <div className="absolute top-20 right-20 w-32 h-32 opacity-5 pointer-events-none">
                    <motion.div
                        className="w-full h-full border border-white rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
                <div className="absolute bottom-20 left-20 w-24 h-24 opacity-5 pointer-events-none">
                    <motion.div
                        className="w-full h-full border border-white"
                        style={{ clipPath: 'polygon(50% 0%, 100% 100%, 0% 100%)' }}
                        animate={{ rotate: -360 }}
                        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                    />
                </div>
            </div>
        </section>
    );
}

export default ImpactMetrics;
