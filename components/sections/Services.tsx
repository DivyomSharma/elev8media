'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const services = [
    {
        id: '01',
        title: 'Brand Strategy & Market Positioning',
        description: 'Define your unique market position through comprehensive analysis and strategic planning.',
        details: [
            'Competitive landscape analysis',
            'Target audience profiling',
            'Value proposition development',
            'Brand architecture design',
        ],
    },
    {
        id: '02',
        title: 'Content Creation & Media Production',
        description: 'Premium content that captures attention and drives engagement across all channels.',
        details: [
            'Video production & editing',
            'Photography & visual assets',
            'Copywriting & storytelling',
            'Social media content',
        ],
    },
    {
        id: '03',
        title: 'Digital Advertising & Performance Marketing',
        description: 'Data-driven campaigns that maximize ROI and accelerate customer acquisition.',
        details: [
            'Paid social campaigns',
            'Search engine marketing',
            'Programmatic advertising',
            'Retargeting strategies',
        ],
    },
    {
        id: '04',
        title: 'Social Platform Architecture',
        description: 'Build and optimize your social presence for sustainable organic growth.',
        details: [
            'Platform strategy',
            'Community management',
            'Influencer partnerships',
            'Engagement optimization',
        ],
    },
    {
        id: '05',
        title: 'Growth Analytics & Optimization',
        description: 'Transform data into actionable insights that drive continuous improvement.',
        details: [
            'Performance tracking',
            'A/B testing frameworks',
            'Attribution modeling',
            'Custom dashboards',
        ],
    },
    {
        id: '06',
        title: 'Automation & Technology Integration',
        description: 'Streamline operations and scale efficiently through smart automation.',
        details: [
            'Marketing automation',
            'CRM integration',
            'Workflow optimization',
            'Tech stack consulting',
        ],
    },
];

export function Services() {
    const [expandedId, setExpandedId] = useState<string | null>(null);

    return (
        <section id="services" className="section relative bg-[var(--color-dark-space)]">
            {/* Grid background */}
            <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                    backgroundImage: `
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '60px 60px',
                }}
            />

            <div className="container relative">
                {/* Section header */}
                <ScrollReveal className="text-center mb-16">
                    <span className="text-label mb-4 block">Capabilities</span>
                    <h2
                        className="text-display mb-6"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                    >
                        SERVICES THAT
                        <br />
                        <span className="text-cyan">SCALE</span>
                    </h2>
                    <p className="text-body text-muted max-w-2xl mx-auto">
                        End-to-end growth solutions designed to accelerate your trajectory
                        from where you are to where you need to be.
                    </p>
                </ScrollReveal>

                {/* Services grid - asymmetric masonry style */}
                <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
                    {services.map((service, index) => (
                        <StaggerItem
                            key={service.id}
                            className={index === 0 || index === 3 ? 'lg:row-span-1' : ''}
                        >
                            <motion.div
                                className="h-full"
                                layout
                            >
                                <GlassCard
                                    variant="subtle"
                                    glow="cyan"
                                    padding="lg"
                                    hover
                                    className="h-full cursor-pointer group"
                                    onClick={() => setExpandedId(expandedId === service.id ? null : service.id)}
                                >
                                    {/* Service number */}
                                    <span className="text-mono text-cyan text-sm mb-4 block">
                                        {service.id}
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-lg font-display font-bold mb-3 group-hover:text-cyan transition-colors">
                                        {service.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-sm text-muted mb-4">
                                        {service.description}
                                    </p>

                                    {/* Expandable details */}
                                    <AnimatePresence>
                                        {expandedId === service.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                                className="overflow-hidden"
                                            >
                                                <ul className="space-y-2 pt-4 border-t border-[var(--glass-border)]">
                                                    {service.details.map((detail, i) => (
                                                        <motion.li
                                                            key={i}
                                                            initial={{ x: -10, opacity: 0 }}
                                                            animate={{ x: 0, opacity: 1 }}
                                                            transition={{ delay: i * 0.05 }}
                                                            className="flex items-center gap-2 text-sm text-muted"
                                                        >
                                                            <span className="w-1 h-1 rounded-full bg-cyan" />
                                                            {detail}
                                                        </motion.li>
                                                    ))}
                                                </ul>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>

                                    {/* Explore link */}
                                    <div className="flex items-center gap-2 mt-4 text-xs text-cyan uppercase tracking-wide">
                                        <span>{expandedId === service.id ? 'Close' : 'Explore'}</span>
                                        <motion.span
                                            animate={{ rotate: expandedId === service.id ? 180 : 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            ↓
                                        </motion.span>
                                    </div>

                                    {/* Left accent line on hover */}
                                    <motion.div
                                        className="absolute left-0 top-0 bottom-0 w-[2px] bg-cyan"
                                        initial={{ scaleY: 0 }}
                                        whileHover={{ scaleY: 1 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ originY: 0 }}
                                    />
                                </GlassCard>
                            </motion.div>
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}

export default Services;
