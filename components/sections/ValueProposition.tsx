'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const pillars = [
    {
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                <path d="M24 4L4 14v20l20 10 20-10V14L24 4z" strokeWidth="2" strokeLinejoin="round" />
                <path d="M4 14l20 10m0 0v20m0-20l20-10" strokeWidth="2" />
                <circle cx="24" cy="24" r="4" strokeWidth="2" />
            </svg>
        ),
        title: 'Strategic Elevation',
        description: 'Comprehensive growth architecture engineered from market analysis to execution mastery. We build foundations that scale.',
    },
    {
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                <path d="M8 24h8m16 0h8" strokeWidth="2" strokeLinecap="round" />
                <path d="M24 8v8m0 16v8" strokeWidth="2" strokeLinecap="round" />
                <circle cx="24" cy="24" r="12" strokeWidth="2" />
                <circle cx="24" cy="24" r="6" strokeWidth="2" />
                <path d="M24 4l4 8-4 4-4-4 4-8z" fill="currentColor" opacity="0.3" />
            </svg>
        ),
        title: 'Creative Amplification',
        description: 'Content and brand expression that resonates. Premium production meeting strategic intent for maximum market impact.',
    },
    {
        icon: (
            <svg className="w-12 h-12" viewBox="0 0 48 48" fill="none" stroke="currentColor">
                <rect x="8" y="8" width="32" height="32" rx="4" strokeWidth="2" />
                <path d="M8 16h32M16 16v24" strokeWidth="2" />
                <path d="M24 28l4-6 4 4 4-8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" stroke="var(--color-accent-cyan)" />
                <circle cx="24" cy="28" r="2" fill="var(--color-accent-cyan)" />
                <circle cx="28" cy="22" r="2" fill="var(--color-accent-cyan)" />
                <circle cx="32" cy="26" r="2" fill="var(--color-accent-cyan)" />
                <circle cx="36" cy="18" r="2" fill="var(--color-accent-cyan)" />
            </svg>
        ),
        title: 'Performance Optimization',
        description: 'Analytics-driven iteration that compounds gains. Continuous refinement through data intelligence and precision testing.',
    },
];

export function ValueProposition() {
    return (
        <section id="about" className="section relative">
            <div className="container">
                {/* Section header */}
                <ScrollReveal className="text-center mb-16">
                    <span className="text-label mb-4 block">What We Do</span>
                    <h2
                        className="text-display mb-6"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                    >
                        THREE PILLARS OF
                        <br />
                        <span className="text-cyan">GROWTH</span>
                    </h2>
                    <p className="text-body text-muted max-w-2xl mx-auto">
                        Our methodology combines strategic thinking, creative excellence, and data-driven optimization
                        to create unstoppable momentum for your brand.
                    </p>
                </ScrollReveal>

                {/* Pillars grid */}
                <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8">
                    {pillars.map((pillar, index) => (
                        <StaggerItem key={index}>
                            <GlassCard
                                variant="default"
                                glow="cyan"
                                padding="xl"
                                className="h-full text-center"
                            >
                                {/* Icon */}
                                <div className="inline-flex items-center justify-center w-20 h-20 rounded-xl bg-[rgba(0,229,255,0.1)] text-[var(--color-accent-cyan)] mb-6">
                                    {pillar.icon}
                                </div>

                                {/* Title */}
                                <h3 className="text-display text-xl mb-4">
                                    {pillar.title}
                                </h3>

                                {/* Description */}
                                <p className="text-body text-muted text-sm leading-relaxed">
                                    {pillar.description}
                                </p>
                            </GlassCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>

            {/* Background decoration */}
            <div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] pointer-events-none opacity-30"
                style={{
                    background: 'radial-gradient(circle, rgba(0,229,255,0.05) 0%, transparent 70%)',
                }}
            />
        </section>
    );
}

export default ValueProposition;
