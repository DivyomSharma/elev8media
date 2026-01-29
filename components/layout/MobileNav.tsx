'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

interface NavItem {
    label: string;
    href: string;
}

interface MobileNavProps {
    items: NavItem[];
    isOpen: boolean;
    onClose: () => void;
}

export function MobileNav({ items, isOpen, onClose }: MobileNavProps) {
    return (
        <motion.div
            className="fixed inset-0 z-[var(--z-modal)] lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Backdrop */}
            <motion.div
                className="absolute inset-0 bg-[rgba(0,0,0,0.8)] backdrop-blur-sm"
                onClick={onClose}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
            />

            {/* Drawer */}
            <motion.nav
                className="absolute right-0 top-0 bottom-0 w-full max-w-[400px] 
                   bg-[var(--color-dark-space)] border-l border-[rgba(255,255,255,0.06)]
                   flex flex-col"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-[rgba(255,255,255,0.06)]">
                    <span className="text-xl font-display font-bold">
                        <span className="text-white">ELEV</span>
                        <span className="text-[var(--color-accent-cyan)]">8</span>
                    </span>

                    <button
                        onClick={onClose}
                        className="w-10 h-10 flex items-center justify-center rounded-lg 
                       border border-[rgba(255,255,255,0.1)] hover:border-[rgba(255,255,255,0.2)]
                       transition-colors"
                        aria-label="Close menu"
                    >
                        <svg
                            className="w-5 h-5 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Nav Items */}
                <div className="flex-1 flex flex-col justify-center px-6">
                    <ul className="space-y-2">
                        {items.map((item, index) => (
                            <motion.li
                                key={item.href}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 + index * 0.05 }}
                            >
                                <Link
                                    href={item.href}
                                    onClick={onClose}
                                    className="block py-4 text-2xl font-display font-bold uppercase 
                             text-[var(--color-white-muted)] hover:text-white
                             hover:translate-x-2 transition-all duration-300"
                                >
                                    <span className="text-[var(--color-accent-cyan)] text-sm font-mono mr-4">
                                        0{index + 1}
                                    </span>
                                    {item.label}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-[rgba(255,255,255,0.06)]">
                    <Button variant="primary" fullWidth onClick={onClose}>
                        Start Project
                    </Button>

                    <div className="mt-6 flex items-center justify-center gap-4">
                        <a
                            href="#"
                            className="text-[var(--color-white-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
                            aria-label="LinkedIn"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-[var(--color-white-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
                            aria-label="Twitter"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        <a
                            href="#"
                            className="text-[var(--color-white-muted)] hover:text-[var(--color-accent-cyan)] transition-colors"
                            aria-label="Instagram"
                        >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </motion.nav>
        </motion.div>
    );
}

export default MobileNav;
