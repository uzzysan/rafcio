"use client"

import { Link } from '@/i18n/routing';
import { useTranslations } from 'next-intl';
import { ThemeToggle } from './ThemeToggle';
import { LangSwitcher } from './LangSwitcher';
import { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { Menu, X } from 'lucide-react';

export function Navbar() {
    const t = useTranslations('HomePage');
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { href: '#about', label: t('nav.about') },
        { href: '#projects', label: t('nav.projects') },
        { href: '#contact', label: t('nav.contact') },
    ];

    return (
        <nav
            className={clsx(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                isScrolled ? "bg-white/80 dark:bg-[#0a0a0a]/80 backdrop-blur-md shadow-sm border-b border-gray-200/50 dark:border-white/5" : "bg-transparent"
            )}
        >
            <div className="container mx-auto px-6 h-16 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-xl font-bold tracking-tight">
                    <span className="text-gray-900 dark:text-white">Rafał</span>
                    <span className="text-orange-500">Maculewicz</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    <div className="flex gap-6">
                        {navLinks.map((link) => (
                            <a
                                key={link.href}
                                href={link.href}
                                className="text-sm font-medium text-gray-600 hover:text-orange-500 dark:text-gray-300 dark:hover:text-orange-400 transition-colors"
                                onClick={(e) => {
                                    // Smooth scroll handler could go here
                                }}
                            >
                                {link.label}
                            </a>
                        ))}
                    </div>

                    <div className="h-4 w-px bg-gray-300 dark:bg-gray-700 mx-2"></div>

                    <div className="flex items-center gap-4">
                        <LangSwitcher />
                        <ThemeToggle />
                    </div>
                </div>

                {/* Mobile Toggle */}
                <div className="flex items-center gap-4 md:hidden">
                    <ThemeToggle />
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="p-2 text-gray-600 dark:text-gray-300"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden bg-white dark:bg-[#0a0a0a] border-b border-gray-200 dark:border-white/5 py-4 px-6 flex flex-col gap-4">
                    {navLinks.map((link) => (
                        <a
                            key={link.href}
                            href={link.href}
                            className="text-base font-medium text-gray-600 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            {link.label}
                        </a>
                    ))}
                    <div className="border-t border-gray-200 dark:border-gray-800 pt-4 flex justify-between items-center">
                        <span className="text-sm text-gray-500">Language</span>
                        <LangSwitcher />
                    </div>
                </div>
            )}
        </nav>
    );
}
