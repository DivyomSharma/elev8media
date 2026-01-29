'use client';

import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

const projects = [
    {
        id: 1,
        client: 'TechVenture Studios',
        title: 'BRAND TRANSFORMATION',
        image: '/projects/project-1.png',
        category: 'Brand Strategy',
        metrics: {
            revenue: '+340%',
            roas: '8.2x',
            impressions: '4.2M',
        },
        description: 'Complete brand overhaul and digital strategy implementation driving exponential growth.',
    },
    {
        id: 2,
        client: 'Horizon Health',
        title: 'MARKET EXPANSION',
        image: '/projects/project-2.png',
        category: 'Digital Marketing',
        metrics: {
            revenue: '+280%',
            roas: '6.5x',
            impressions: '8.1M',
        },
        description: 'Multi-channel campaign strategy that opened three new market segments.',
    },
    {
        id: 3,
        client: 'Atlas Finance',
        title: 'PERFORMANCE SURGE',
        image: '/projects/project-3.png',
        category: 'Performance Marketing',
        metrics: {
            revenue: '+420%',
            roas: '11.3x',
            impressions: '12.7M',
        },
        description: 'Data-driven optimization that transformed customer acquisition efficiency.',
    },
    {
        id: 4,
        client: 'Nova Lifestyle',
        title: 'SOCIAL DOMINANCE',
        image: '/projects/project-4.png',
        category: 'Social Strategy',
        metrics: {
            revenue: '+195%',
            roas: '5.8x',
            impressions: '22.4M',
        },
        description: 'Building a community-first brand presence across all major platforms.',
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
            <div className="container mb-12">
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

            {/* Horizontal scroll carousel */}
            <div
                ref={containerRef}
                onScroll={handleScroll}
                className="flex gap-6 overflow-x-auto scrollbar-hide px-[15%] pb-8 snap-x snap-mandatory"
                style={{
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                {projects.map((project, index) => (
                    <motion.div
                        key={project.id}
                        className="flex-shrink-0 w-[70vw] max-w-[800px] snap-center"
                        initial={{ opacity: 0.6, scale: 0.9 }}
                        animate={{
                            opacity: activeIndex === index ? 1 : 0.6,
                            scale: activeIndex === index ? 1 : 0.9,
                        }}
                        transition={{ duration: 0.4 }}
                    >
                        <div className="glass-card p-0 overflow-hidden group cursor-pointer">
                            {/* Project image */}
                            <div
                                className="relative aspect-[4/3] overflow-hidden"
                            >
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                {/* Overlay gradient */}
                                <div
                                    className="absolute inset-0 bg-gradient-to-t from-[var(--color-dark-primary)] via-transparent to-transparent opacity-60"
                                />

                                {/* Category badge */}
                                <div className="absolute top-4 left-4">
                                    <span className="text-label bg-[rgba(0,0,0,0.6)] backdrop-blur-sm px-3 py-1 rounded-full">
                                        {project.category}
                                    </span>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-8">
                                {/* Client */}
                                <span className="text-xs text-muted uppercase tracking-wider">
                                    {project.client}
                                </span>

                                {/* Title */}
                                <h3 className="text-display text-2xl mt-2 mb-4 group-hover:text-cyan transition-colors">
                                    {project.title}
                                </h3>

                                {/* Description */}
                                <p className="text-sm text-muted mb-6">
                                    {project.description}
                                </p>

                                {/* Metrics */}
                                <div className="flex gap-8 pt-6 border-t border-[var(--glass-border)]">
                                    <div>
                                        <span className="text-mono text-2xl text-cyan font-bold">
                                            {project.metrics.revenue}
                                        </span>
                                        <span className="block text-xs text-muted mt-1">Revenue</span>
                                    </div>
                                    <div>
                                        <span className="text-mono text-2xl text-cyan font-bold">
                                            {project.metrics.roas}
                                        </span>
                                        <span className="block text-xs text-muted mt-1">ROAS</span>
                                    </div>
                                    <div>
                                        <span className="text-mono text-2xl text-cyan font-bold">
                                            {project.metrics.impressions}
                                        </span>
                                        <span className="block text-xs text-muted mt-1">Impressions</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Navigation dots */}
            <div className="flex justify-center gap-2 mt-8">
                {projects.map((_, index) => (
                    <button
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === index
                            ? 'w-8 bg-cyan'
                            : 'bg-[var(--color-dark-border)] hover:bg-[var(--color-dark-border-light)]'
                            }`}
                        onClick={() => {
                            containerRef.current?.scrollTo({
                                left: index * containerRef.current.clientWidth * 0.7,
                                behavior: 'smooth',
                            });
                        }}
                        aria-label={`Go to project ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}

export default FeaturedWork;
