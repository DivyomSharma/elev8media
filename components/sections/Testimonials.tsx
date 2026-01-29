'use client';

import { motion } from 'framer-motion';
import { GlassCard } from '@/components/ui/GlassCard';
import { ScrollReveal, StaggerContainer, StaggerItem } from '@/components/animations/ScrollReveal';

const testimonials = [
    {
        quote: "Elev8 transformed our approach to growth. What we thought would take years happened in months. Their strategic precision is unmatched.",
        author: 'Sarah Chen',
        title: 'CEO',
        company: 'TechVenture Studios',
    },
    {
        quote: "The team doesn't just execute—they think three steps ahead. Our ROAS improved by 340% in the first quarter alone.",
        author: 'Marcus Williams',
        title: 'CMO',
        company: 'Horizon Health',
    },
    {
        quote: "Working with Elev8 feels like having an extension of our team that's always pushing boundaries. Results exceeded every projection.",
        author: 'Elena Rodriguez',
        title: 'Founder',
        company: 'Nova Lifestyle',
    },
];

const clientLogos = [
    'TechVenture',
    'Horizon',
    'Atlas',
    'Nova',
    'Meridian',
    'Apex',
];

export function Testimonials() {
    return (
        <section className="section relative bg-[var(--color-dark-space)]">
            <div className="container">
                {/* Section header */}
                <ScrollReveal className="text-center mb-16">
                    <span className="text-label mb-4 block">Testimonials</span>
                    <h2
                        className="text-display mb-6"
                        style={{ fontSize: 'clamp(2rem, 5vw, 3rem)' }}
                    >
                        CLIENT
                        <br />
                        <span className="text-cyan">TESTAMENT</span>
                    </h2>
                </ScrollReveal>

                {/* Testimonials */}
                <StaggerContainer className="grid lg:grid-cols-3 gap-6 mb-20">
                    {testimonials.map((testimonial, index) => (
                        <StaggerItem key={index}>
                            <GlassCard
                                variant="elevated"
                                glow="cyan"
                                padding="xl"
                                className="h-full flex flex-col"
                            >
                                {/* Quote icon */}
                                <div className="text-4xl text-cyan opacity-30 mb-4 font-serif">
                                    "
                                </div>

                                {/* Quote */}
                                <blockquote className="text-lg font-medium leading-relaxed mb-8 flex-grow">
                                    {testimonial.quote}
                                </blockquote>

                                {/* Author */}
                                <div className="flex items-center gap-4 pt-6 border-t border-[var(--glass-border)]">
                                    {/* Avatar placeholder */}
                                    <div className="w-12 h-12 rounded-full bg-[var(--color-dark-surface)] flex items-center justify-center text-cyan font-bold">
                                        {testimonial.author.charAt(0)}
                                    </div>

                                    <div>
                                        <div className="font-medium">{testimonial.author}</div>
                                        <div className="text-sm text-muted">
                                            {testimonial.title}, {testimonial.company}
                                        </div>
                                    </div>
                                </div>
                            </GlassCard>
                        </StaggerItem>
                    ))}
                </StaggerContainer>

                {/* Client logos */}
                <ScrollReveal>
                    <div className="text-center mb-8">
                        <span className="text-label">Trusted By</span>
                    </div>

                    <div className="flex flex-wrap justify-center items-center gap-8 lg:gap-16">
                        {clientLogos.map((logo, index) => (
                            <motion.div
                                key={index}
                                className="text-xl font-display font-bold text-[var(--color-dark-border-light)] 
                           hover:text-white transition-colors duration-300 cursor-default"
                                whileHover={{ scale: 1.05 }}
                            >
                                {logo}
                            </motion.div>
                        ))}
                    </div>
                </ScrollReveal>
            </div>

            {/* Decorative elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[var(--glass-border)] to-transparent" />
        </section>
    );
}

export default Testimonials;
