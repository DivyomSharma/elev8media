'use client';

import dynamic from 'next/dynamic';

// Layout components
import { Header } from '@/components/layout/Header';

// Sections - some with dynamic imports for 3D components
const Hero = dynamic(() => import('@/components/sections/Hero'), { ssr: false });
import { ValueProposition } from '@/components/sections/ValueProposition';
import { Services } from '@/components/sections/Services';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { Methodology } from '@/components/sections/Methodology';
import { ImpactMetrics } from '@/components/sections/ImpactMetrics';
import { Testimonials } from '@/components/sections/Testimonials';
import { Contact } from '@/components/sections/Contact';

// Custom cursor
const CustomCursor = dynamic(() => import('@/components/ui/CustomCursor'), { ssr: false });

export default function Home() {
  return (
    <>
      {/* Custom cursor */}
      <CustomCursor />

      {/* Header */}
      <Header />

      {/* Main content */}
      <main>
        {/* Hero Section - Full 3D experience */}
        <Hero />

        {/* Value Proposition - Three Pillars */}
        <ValueProposition />

        {/* Services - Capability Matrix */}
        <Services />

        {/* Featured Work - Project Gallery */}
        <FeaturedWork />

        {/* Methodology - The Growth Cycle */}
        <Methodology />

        {/* Impact Metrics - Results Dashboard */}
        {/* <ImpactMetrics /> */}

        {/* Testimonials - Social Proof */}
        {/* <Testimonials /> */}

        {/* Contact - Initiation Point */}
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-8 border-t border-[var(--glass-border)]">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="text-lg font-display font-bold">
              <span className="text-white">ELEV</span>
              <span className="text-cyan">8</span>
              <span className="text-muted text-sm font-normal ml-2">MEDIA</span>
            </div>

            {/* Copyright */}
            <p className="text-sm text-muted">
              © {new Date().getFullYear()} Elev8 Media. A{' '}
              <a
                href="https://plotarmourstudio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-cyan transition-colors"
              >
                PlotArmour Studio
              </a>{' '}
              division.
            </p>

            {/* Back to top */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="text-sm text-muted hover:text-cyan transition-colors flex items-center gap-2"
            >
              Back to top
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </footer>
    </>
  );
}
