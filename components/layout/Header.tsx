'use client';

import { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { MobileNav } from './MobileNav';

const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Process', href: '#process' },
    { label: 'Contact', href: '#contact' },
];

export function Header() {
    const [isVisible, setIsVisible] = useState(true);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { scrollY } = useScroll();

    // Handle scroll behavior
    useMotionValueEvent(scrollY, 'change', (latest) => {
        const previous = scrollY.getPrevious() ?? 0;

        // Show/hide based on scroll direction
        if (latest > 100) {
            setIsVisible(latest < previous);
        } else {
            setIsVisible(true);
        }

        // Add background when scrolled
        setIsScrolled(latest > 50);
    });

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    return (
        <>
            <motion.header
                className={`
          fixed top-0 left-0 right-0 z-[var(--z-fixed)]
          h-[var(--header-height)]
          transition-all duration-300
          ${isScrolled
                        ? 'bg-[rgba(15,15,15,0.8)] backdrop-blur-xl border-b border-[rgba(255,255,255,0.06)]'
                        : 'bg-transparent'
                    }
        `}
                initial={{ y: 0 }}
                animate={{ y: isVisible ? 0 : -100 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
                <div className="container h-full flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <motion.div
                            className="text-2xl font-display font-black tracking-tight"
                            whileHover={{ scale: 1.02 }}
                        >
                            <span className="text-white">ELEV</span>
                            <span className="text-[var(--color-accent-cyan)]">8</span>
                        </motion.div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center gap-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                className="link text-sm font-medium tracking-wide uppercase text-[var(--color-white-muted)] hover:text-white transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    {/* CTA Button */}
                    <div className="hidden lg:block">
                        <Button variant="primary" size="sm">
                            Start Project
                        </Button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative w-10 h-10 flex items-center justify-center"
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <div className="flex flex-col gap-1.5">
                            <motion.span
                                className="w-6 h-0.5 bg-white rounded-full"
                                layoutId="menu-line-1"
                            />
                            <motion.span
                                className="w-4 h-0.5 bg-white rounded-full ml-auto"
                                layoutId="menu-line-2"
                            />
                        </div>
                    </button>
                </div>
            </motion.header>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <MobileNav
                        items={navItems}
                        isOpen={isMobileMenuOpen}
                        onClose={() => setIsMobileMenuOpen(false)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}

export default Header;
