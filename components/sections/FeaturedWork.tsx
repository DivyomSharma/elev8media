'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const projects = [
    {
        id: 1,
        client: 'PlotArmour',
        title: 'PLOTARMOUR STORE',
        category: 'E-Commerce',
        description: 'High-end streetwear brand scaling with dark aesthetic and exclusive drops.',
    },
    {
        id: 2,
        client: 'PlotArmour',
        title: 'PLOTARMOUR STUDIO',
        category: 'Creative Hub',
        description: 'Multi-disciplinary creative agency pushing the boundaries of digital and physical experiences.',
    },
    {
        id: 3,
        client: 'Battalion',
        title: 'BATTALION',
        category: 'Game Dev',
        description: 'Tactical FPS game with high-fidelity graphics and competitive gameplay mechanics.',
    },
    {
        id: 4,
        client: 'Suruchi',
        title: 'SURUCHI',
        category: 'Manufacturing',
        description: 'State-of-the-art manufacturing unit of PlotArmour, delivering unparalleled physical product quality.',
    },
];

export function FeaturedWork() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    const { scrollXProgress } = useScroll({
        container: containerRef,
    });

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollLeft, clientWidth } = containerRef.current;
        const cardWidth = clientWidth * 0.7;
        const index = Math.round(scrollLeft / cardWidth);
        setActiveIndex(Math.min(index, projects.length - 1));
    };

    return (
        <section id="work" className="section relative overflow-hidden">
            <div className="container mb-16">
                <ScrollReveal className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                    <div>
                        <span className="text-label mb-4 block">Portfolio</span>
                        <h2
                            className="text-display"
                            style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                        >
                            FEATURED
                            <br />
                            <span className="text-cyan">WORK</span>
                        </h2>
                    </div>
                    <p className="text-body text-muted max-w-md">
                        Results that speak for themselves. Each project represents a unique challenge
                        transformed into measurable success.
                    </p>
                </ScrollReveal>
            </div>

            {/* Cascading Grid */}
            <div className="container">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {projects.map((project, index) => (
                        <ScrollReveal
                            key={project.id}
                            animation="fadeUp"
                            delay={index * 0.15}
                            className={`flex ${index % 2 !== 0 ? 'md:mt-16' : ''}`}
                        >
                            <motion.div
                                className="glass-card p-6 md:p-8 w-full group cursor-pointer relative overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Overlay gradient on hover */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-br from-[var(--color-dark-surface)] to-[var(--color-dark-primary)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
                                />

                                {/* Meta details */}
                                <div className="flex justify-between items-start mb-8">
                                    <span className="text-label bg-[var(--glass-border)] px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                    <span className="text-xs text-muted uppercase tracking-wider font-mono">
                                        0{project.id}
                                    </span>
                                </div>

                                {/* Content */}
                                <div>
                                    <span className="text-xs text-cyan uppercase tracking-wider mb-2 block font-medium">
                                        {project.client}
                                    </span>
                                    <h3 className="text-display text-xl md:text-2xl mt-1 mb-4 group-hover:text-amber transition-colors line-clamp-2">
                                        {project.title}
                                    </h3>
                                    <p className="text-sm text-muted leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </motion.div>
                        </ScrollReveal>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default FeaturedWork;
