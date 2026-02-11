"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Link } from '@/i18n/routing';
import { Github, Linkedin, Mail, Heart, ArrowUp } from 'lucide-react';

const socialLinks = [
    { icon: Github, href: 'https://github.com/uzzysan', label: 'GitHub' },
    { icon: Linkedin, href: 'https://linkedin.com/in/uzzysan', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:rafal.maculewicz@tuta.com', label: 'Email' },
];

const navLinks = [
    { href: '#about', label: 'nav.about' },
    { href: '#services', label: 'nav.services' },
    { href: '#projects', label: 'nav.projects' },
    { href: '#experience', label: 'nav.experience' },
    { href: '#contact', label: 'nav.contact' },
];

export function Footer() {
    const t = useTranslations('HomePage');
    const currentYear = new Date().getFullYear();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative bg-[var(--card)] border-t border-[var(--border)]">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                {/* Main footer content */}
                <div className="py-16 grid md:grid-cols-2 lg:grid-cols-4 gap-12">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link href="/" className="inline-flex items-center gap-2 mb-4">
                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center">
                                <span className="text-white font-bold text-lg">RM</span>
                            </div>
                            <span className="text-xl font-bold">
                                <span className="text-[var(--foreground)]">Rafał</span>
                                <span className="text-[var(--accent)]">Maculewicz</span>
                            </span>
                        </Link>
                        <p className="text-[var(--muted-foreground)] max-w-md mb-6 leading-relaxed">
                            {t('footer.description')}
                        </p>
                        
                        {/* Social links */}
                        <div className="flex gap-3">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.label}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                                    aria-label={social.label}
                                >
                                    <social.icon size={20} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick links */}
                    <div>
                        <h4 className="font-semibold text-[var(--foreground)] mb-4">{t('footer.links')}</h4>
                        <ul className="space-y-3">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="text-[var(--muted-foreground)] hover:text-[var(--accent)] transition-colors"
                                    >
                                        {t(link.label)}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact info */}
                    <div>
                        <h4 className="font-semibold text-[var(--foreground)] mb-4">{t('footer.contact')}</h4>
                        <ul className="space-y-3 text-[var(--muted-foreground)]">
                            <li>{t('footer.location')}</li>
                            <li>
                                <a href="mailto:rafal.maculewicz@tuta.com" className="hover:text-[var(--accent)] transition-colors">
                                    rafal.maculewicz@tuta.com
                                </a>
                            </li>
                            <li>
                                <a href="https://linkedin.com/in/uzzysan" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--accent)] transition-colors">
                                    linkedin.com/in/uzzysan
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="py-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-[var(--muted-foreground)] flex items-center gap-1">
                        © {currentYear} Rafał Maculewicz. {t('footer.rights')}
                    </p>
                    
                    <p className="text-sm text-[var(--muted-foreground)] flex items-center gap-1">
                        {t('footer.madeWith')} <Heart size={14} className="text-red-500 fill-red-500" />
                    </p>

                    {/* Back to top */}
                    <motion.button
                        onClick={scrollToTop}
                        className="w-10 h-10 rounded-xl bg-[var(--muted)] flex items-center justify-center text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-white transition-all duration-300"
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        aria-label="Back to top"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                </div>
            </div>
        </footer>
    );
}
