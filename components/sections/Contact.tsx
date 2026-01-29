'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ScrollReveal } from '@/components/animations/ScrollReveal';

interface FormData {
    name: string;
    email: string;
    company: string;
    message: string;
}

// Social links configuration
const socialLinks = [
    {
        name: 'Discord',
        href: 'https://discord.gg/mNXK4ejYpf',
        icon: 'M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z',
    },
    {
        name: 'Instagram',
        href: 'https://www.instagram.com/plotarmourstudio/',
        icon: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z',
    },
    {
        name: 'LinkedIn',
        href: 'https://www.linkedin.com/company/plotarmour/',
        icon: 'M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z',
    },
    {
        name: 'WhatsApp',
        href: 'https://wa.me/918744069597',
        icon: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
    },
];

export function Contact() {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        email: '',
        company: '',
        message: '',
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulate form submission
        await new Promise((resolve) => setTimeout(resolve, 1500));

        setIsSubmitting(false);
        setIsSubmitted(true);
        setFormData({ name: '', email: '', company: '', message: '' });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    return (
        <section id="contact" className="section relative">
            {/* Background "8" watermark */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                <motion.div
                    className="text-[40vw] font-display font-black text-[var(--color-dark-surface)] opacity-5"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 120, repeat: Infinity, ease: 'linear' }}
                >
                    8
                </motion.div>
            </div>

            <div className="container relative">
                <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">
                    {/* Form side */}
                    <ScrollReveal animation="fadeLeft">
                        <div className="glass-card">
                            <h2
                                className="text-display mb-8"
                                style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
                            >
                                BEGIN YOUR
                                <br />
                                <span className="text-cyan">ASCENT</span>
                            </h2>

                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-center py-12"
                                >
                                    <div className="w-16 h-16 rounded-full bg-cyan/20 flex items-center justify-center mx-auto mb-6">
                                        <svg className="w-8 h-8 text-cyan" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-bold mb-2">Message Received</h3>
                                    <p className="text-muted">We'll be in touch within 24 hours.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    {/* Name */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-[var(--glass-border)] 
                               py-4 px-0 text-white placeholder-transparent
                               focus:outline-none focus:border-cyan
                               transition-colors peer"
                                            placeholder="Name"
                                        />
                                        <label
                                            className="absolute left-0 top-4 text-muted text-sm
                               transition-all duration-200
                               peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                               peer-focus:text-sm peer-focus:-top-2 peer-focus:text-cyan
                               peer-valid:text-sm peer-valid:-top-2"
                                        >
                                            Name
                                        </label>
                                    </div>

                                    {/* Email */}
                                    <div className="relative">
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            required
                                            className="w-full bg-transparent border-b border-[var(--glass-border)] 
                               py-4 px-0 text-white placeholder-transparent
                               focus:outline-none focus:border-cyan
                               transition-colors peer"
                                            placeholder="Email"
                                        />
                                        <label
                                            className="absolute left-0 top-4 text-muted text-sm
                               transition-all duration-200
                               peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                               peer-focus:text-sm peer-focus:-top-2 peer-focus:text-cyan
                               peer-valid:text-sm peer-valid:-top-2"
                                        >
                                            Email
                                        </label>
                                    </div>

                                    {/* Company */}
                                    <div className="relative">
                                        <input
                                            type="text"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleChange}
                                            className="w-full bg-transparent border-b border-[var(--glass-border)] 
                               py-4 px-0 text-white placeholder-transparent
                               focus:outline-none focus:border-cyan
                               transition-colors peer"
                                            placeholder="Company"
                                        />
                                        <label
                                            className="absolute left-0 top-4 text-muted text-sm
                               transition-all duration-200
                               peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                               peer-focus:text-sm peer-focus:-top-2 peer-focus:text-cyan
                               peer-valid:text-sm peer-valid:-top-2"
                                        >
                                            Company
                                        </label>
                                    </div>

                                    {/* Message */}
                                    <div className="relative">
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            required
                                            rows={4}
                                            className="w-full bg-transparent border-b border-[var(--glass-border)] 
                               py-4 px-0 text-white placeholder-transparent
                               focus:outline-none focus:border-cyan
                               transition-colors peer resize-none"
                                            placeholder="Project Details"
                                        />
                                        <label
                                            className="absolute left-0 top-4 text-muted text-sm
                               transition-all duration-200
                               peer-placeholder-shown:text-base peer-placeholder-shown:top-4
                               peer-focus:text-sm peer-focus:-top-2 peer-focus:text-cyan
                               peer-valid:text-sm peer-valid:-top-2"
                                        >
                                            Project Details
                                        </label>
                                    </div>

                                    {/* Submit */}
                                    <Button
                                        type="submit"
                                        variant="primary"
                                        size="lg"
                                        fullWidth
                                        loading={isSubmitting}
                                    >
                                        Send Inquiry
                                    </Button>
                                </form>
                            )}
                        </div>
                    </ScrollReveal>

                    {/* Info side */}
                    <ScrollReveal animation="fadeRight" className="lg:sticky lg:top-32">
                        <div className="space-y-10">
                            {/* Get in Touch */}
                            <div>
                                <h3 className="text-label mb-4">Get in Touch</h3>
                                <a
                                    href="mailto:theplotarmour@gmail.com"
                                    className="text-xl lg:text-2xl font-display font-bold text-cyan hover:opacity-80 transition-opacity block mb-3"
                                >
                                    theplotarmour@gmail.com
                                </a>
                                <p className="text-sm text-muted">General inquiries and partnerships</p>
                            </div>

                            {/* Careers */}
                            <div>
                                <h3 className="text-label mb-4">Careers</h3>
                                <a
                                    href="mailto:career.theplotarmour@gmail.com"
                                    className="text-lg font-medium text-white hover:text-cyan transition-colors"
                                >
                                    career.theplotarmour@gmail.com
                                </a>
                                <p className="text-sm text-muted mt-2">Join our team</p>
                            </div>

                            {/* WhatsApp */}
                            <div>
                                <h3 className="text-label mb-4">Quick Chat</h3>
                                <a
                                    href="https://wa.me/918744069597"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 text-lg text-white hover:text-cyan transition-colors"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d={socialLinks.find(s => s.name === 'WhatsApp')?.icon} />
                                    </svg>
                                    WhatsApp Us
                                </a>
                            </div>

                            {/* Connect - Social Links */}
                            <div>
                                <h3 className="text-label mb-4">Connect</h3>
                                <div className="flex gap-4">
                                    {socialLinks.map((social) => (
                                        <a
                                            key={social.name}
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="w-12 h-12 rounded-lg border border-[var(--glass-border)] 
                               flex items-center justify-center
                               text-muted hover:text-cyan hover:border-cyan
                               transition-colors"
                                            aria-label={social.name}
                                            title={social.name}
                                        >
                                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                <path d={social.icon} />
                                            </svg>
                                        </a>
                                    ))}
                                </div>
                            </div>

                            {/* PlotArmour Studio link */}
                            <div className="pt-8 border-t border-[var(--glass-border)]">
                                <p className="text-sm text-muted mb-2">
                                    A division of
                                </p>
                                <a
                                    href="https://plotarmourstudio.vercel.app/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-lg font-display font-bold text-white hover:text-cyan transition-colors"
                                >
                                    PlotArmour Studio
                                </a>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </div>
        </section>
    );
}

export default Contact;
