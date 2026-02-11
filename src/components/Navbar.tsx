"use client"

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LangSwitcher } from './LangSwitcher';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Menu, X, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
    { href: '#about', label: 'nav.about' },
    { href: '#services', label: 'nav.services' },
    { href: '#projects', label: 'nav.projects' },
    { href: '#experience', label: 'nav.experience' },
    { href: '#contact', label: 'nav.contact' },
];

export function Navbar() {
    const t = useTranslations('HomePage');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('');

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        const handleSectionObserver = () => {
            const sections = navLinks.map(link => link.href.replace('#', ''));
            
            for (const section of sections.reverse()) {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    if (rect.top <= 100) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('scroll', handleSectionObserver);
        
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('scroll', handleSectionObserver);
        };
    }, []);

    const handleNavClick = (href: string) => {
        setIsMobileMenuOpen(false);
        const element = document.querySelector(href);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <motion.nav
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className={clsx(
                    "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                    isScrolled 
                        ? "py-3" 
                        : "py-5"
                )}
            >
                <div className={clsx(
                    "mx-auto px-4 sm:px-6 lg:px-8 transition-all duration-500",
                    isScrolled && "max-w-5xl"
                )}>
                    <div className={clsx(
                        "flex items-center justify-between transition-all duration-500",
                        isScrolled && "glass rounded-full px-6 py-3 shadow-lg"
                    )}>
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-xl gradient-bg flex items-center justify-center shadow-lg shadow-[var(--accent)]/20 group-hover:shadow-[var(--accent)]/40 transition-shadow">
                                <span className="text-white font-bold text-lg">RM</span>
                            </div>
                            <span className="hidden sm:block text-lg font-bold">
                                <span className="text-[var(--foreground)]">Rafał</span>
                                <span className="text-[var(--accent)]">Maculewicz</span>
                            </span>
                        </Link>

                        {/* Desktop Nav */}
                        <div className="hidden lg:flex items-center gap-1">
                            {navLinks.map((link) => {
                                const isActive = activeSection === link.href.replace('#', '');
                                return (
                                    <button
                                        key={link.href}
                                        onClick={() => handleNavClick(link.href)}
                                        className={clsx(
                                            "relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300",
                                            isActive 
                                                ? "text-[var(--accent)]" 
                                                : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                                        )}
                                    >
                                        {t(link.label)}
                                        {isActive && (
                                            <motion.div
                                                layoutId="activeNav"
                                                className="absolute inset-0 bg-[var(--accent)]/10 rounded-full -z-10"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right side */}
                        <div className="flex items-center gap-3">
                            <div className="hidden md:flex items-center gap-2">
                                <div className="h-6 w-px bg-[var(--border)] mx-1" />
                                <LangSwitcher />
                                <ThemeToggle />
                            </div>

                            {/* CTA Button - Desktop */}
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#contact');
                                }}
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 gradient-bg text-white text-sm font-medium rounded-full shadow-lg shadow-[var(--accent)]/25 hover:shadow-xl hover:shadow-[var(--accent)]/30 transition-all hover:scale-105"
                            >
                                    {t('nav.hire')}
                                <ArrowUpRight size={16} />
                            </a>

                            {/* Mobile Menu Toggle */}
                            <button
                                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                className="lg:hidden p-2 rounded-xl text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors"
                            >
                                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>
            </motion.nav>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-40 lg:hidden"
                    >
                        {/* Backdrop */}
                        <motion.div 
                            className="absolute inset-0 bg-[var(--background)]/80 backdrop-blur-sm"
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Menu content */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
                            className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-[var(--card)] border-l border-[var(--border)] shadow-2xl p-6 pt-24"
                        >
                            <div className="flex flex-col gap-2">
                                {navLinks.map((link, index) => (
                                    <motion.button
                                        key={link.href}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        onClick={() => handleNavClick(link.href)}
                                        className={clsx(
                                            "flex items-center justify-between px-4 py-3 rounded-xl text-left font-medium transition-all",
                                            activeSection === link.href.replace('#', '')
                                                ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                                : "text-[var(--foreground)] hover:bg-[var(--muted)]"
                                        )}
                                    >
                                        {t(link.label)}
                                        <ArrowUpRight size={18} className="opacity-50" />
                                    </motion.button>
                                ))}
                            </div>

                            {/* Mobile controls */}
                            <div className="mt-8 pt-8 border-t border-[var(--border)]">
                                <div className="flex items-center justify-between mb-4">
                                    <span className="text-sm text-[var(--muted-foreground)]">{t('nav.language')}</span>
                                    <LangSwitcher />
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-sm text-[var(--muted-foreground)]">{t('nav.theme')}</span>
                                    <ThemeToggle />
                                </div>
                            </div>

                            {/* Mobile CTA */}
                            <a
                                href="#contact"
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleNavClick('#contact');
                                }}
                                className="mt-8 flex items-center justify-center gap-2 w-full px-5 py-4 gradient-bg text-white font-medium rounded-xl shadow-lg"
                            >
                                {t('nav.hire')}
                                <ArrowUpRight size={18} />
                            </a>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
