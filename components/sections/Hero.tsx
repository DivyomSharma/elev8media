'use client';

import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { Button } from '@/components/ui/Button';
import { heroTextContainer, heroTextItem, easings } from '@/lib/animations';

// Dynamic import for 3D components (client-side only)
const Scene = dynamic(() => import('@/components/3d/Scene'), { ssr: false });
const Elev8Logo = dynamic(() => import('@/components/3d/Elev8Logo'), { ssr: false });
const ParticleField = dynamic(() => import('@/components/3d/ParticleField'), { ssr: false });
const InteractiveParticles = dynamic(
    () => import('@/components/3d/ParticleField').then((mod) => mod.InteractiveParticles),
    { ssr: false }
);
const GeometricAccents = dynamic(
    () => import('@/components/3d/Elev8Logo').then((mod) => mod.GeometricAccents),
    { ssr: false }
);

export function Hero() {
    return (
        <section
            id="hero"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <Scene>
                    {/* Ambient particle field */}
                    <ParticleField count={400} size={0.012} speed={0.0004} spread={18} />

                    {/* Interactive particles around the center */}
                    <InteractiveParticles count={80} color="#00e5ff" />

                    {/* Floating geometric accents */}
                    <GeometricAccents />

                    {/* Main Elev8 Logo */}
                    <Elev8Logo scale={1.8} wireframe interactive rotationSpeed={0.001} />
                </Scene>
            </div>

            {/* Gradient overlay for text legibility */}
            <div
                className="absolute inset-0 z-[1] pointer-events-none"
                style={{
                    background: `
            radial-gradient(ellipse at center, transparent 0%, rgba(15, 15, 15, 0.4) 50%, rgba(15, 15, 15, 0.9) 100%),
            linear-gradient(to bottom, transparent 70%, var(--color-dark-primary) 100%)
          `,
                }}
            />

            {/* Content */}
            <div className="container relative z-10 text-center">
                <motion.div
                    className="max-w-4xl mx-auto"
                    variants={heroTextContainer}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main headline */}
                    <motion.h1
                        variants={heroTextItem}
                        className="text-display mb-6"
                        style={{
                            fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
                            lineHeight: 0.9,
                        }}
                    >
                        PRECISION GROWTH
                        <br />
                        <span className="gradient-text">ENGINEERED</span>
                    </motion.h1>

                    {/* Description */}
                    <motion.p
                        variants={heroTextItem}
                        className="text-body text-[var(--color-white-muted)] max-w-[600px] mx-auto mb-12"
                        style={{ fontSize: 'clamp(1rem, 2vw, 1.125rem)' }}
                    >
                        Strategic media development and marketing acceleration
                        for brands ready to transcend current limitations
                    </motion.p>

                    {/* CTA */}
                    <motion.div variants={heroTextItem} className="mt-16 mb-28">
                        <Button
                            variant="glass"
                            size="lg"
                            icon={
                                <svg
                                    className="w-4 h-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M19 14l-7 7m0 0l-7-7m7 7V3"
                                    />
                                </svg>
                            }
                            onClick={() => {
                                document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Explore Capabilities
                        </Button>
                    </motion.div>
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-4 left-1/2 -translate-x-1/2"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 2, duration: 0.6 }}
                >
                    <motion.div
                        className="w-6 h-10 rounded-full border border-[var(--glass-border)] flex items-start justify-center p-2"
                        animate={{
                            borderColor: ['rgba(255,255,255,0.06)', 'rgba(0,229,255,0.3)', 'rgba(255,255,255,0.06)']
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                    >
                        <motion.div
                            className="w-1 h-2 rounded-full bg-[var(--color-accent-cyan)]"
                            animate={{ y: [0, 12, 0] }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: easings.easeInOutCubic,
                            }}
                        />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}

export default Hero;
