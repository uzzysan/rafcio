"use client";

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
    const t = useTranslations('HomePage');

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
            {/* Animated Background Grid */}
            <div className="absolute inset-0 -z-20">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--background)]/50 to-[var(--background)]" />
            </div>

            {/* Gradient Orbs */}
            <div className="absolute top-1/4 -left-32 w-[500px] h-[500px] bg-[var(--accent)]/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" />
            <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-[var(--accent-secondary)]/20 rounded-full blur-[120px] -z-10 animate-pulse-glow" style={{ animationDelay: '2s' }} />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--gradient-accent)]/10 rounded-full blur-[150px] -z-10" />

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex flex-col-reverse lg:flex-row items-center gap-12 lg:gap-20">
                    {/* Text Content */}
                    <motion.div 
                        className="flex-1 text-center lg:text-left"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="mb-6"
                        >
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 text-sm font-medium">
                                <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                                {t('role')}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1 
                            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-[var(--foreground)] mb-6"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                        >
                            {t('hero.greeting')}{' '}
                            <span className="gradient-text">
                                Rafał
                            </span>
                        </motion.h1>

                        {/* Slogan */}
                        <motion.p 
                            className="text-lg sm:text-xl md:text-2xl text-[var(--muted-foreground)] mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                        >
                            {t('slogan')}
                        </motion.p>

                        {/* Description */}
                        <motion.p 
                            className="text-base text-[var(--muted-foreground)]/80 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            {t('hero.description')}
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div 
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <Button 
                                href="#contact" 
                                size="lg"
                                icon={<ArrowRight size={20} />}
                            >
                                {t('hero.ctaPrimary')}
                            </Button>
                            <Button 
                                href="#projects" 
                                variant="outline" 
                                size="lg"
                                icon={<ChevronDown size={20} />}
                                iconPosition="right"
                            >
                                {t('hero.ctaSecondary')}
                            </Button>
                        </motion.div>

                        {/* Stats */}
                        <motion.div 
                            className="mt-12 pt-8 border-t border-[var(--border)] grid grid-cols-2 gap-8 max-w-md"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                        >
                            {[
                                { value: '8+', label: t('hero.stats.years') },
                                { value: '100%', label: t('hero.stats.satisfaction') },
                            ].map((stat, index) => (
                                <div key={index} className="text-center lg:text-left">
                                    <div className="text-2xl sm:text-3xl font-bold gradient-text">{stat.value}</div>
                                    <div className="text-sm text-[var(--muted-foreground)] mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Profile Image */}
                    <motion.div 
                        className="flex-1 flex justify-center lg:justify-end"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <div className="relative">
                            {/* Background glow */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-[var(--accent)] to-[var(--accent-secondary)] rounded-[2rem] blur-2xl opacity-30 scale-110" />
                            
                            {/* Main image container */}
                            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
                                {/* Decorative ring */}
                                <div className="absolute -inset-4 border-2 border-dashed border-[var(--accent)]/30 rounded-[2rem] animate-spin" style={{ animationDuration: '30s' }} />
                                
                                {/* Image */}
                                <div className="relative w-full h-full rounded-[var(--radius-image)] overflow-hidden border border-[var(--border)] shadow-2xl">
                                    <Image
                                        src="/bright_bg.jpg"
                                        alt={t('title')}
                                        fill
                                        className="object-cover dark:hidden"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 400px"
                                    />
                                    <Image
                                        src="/dark_bg.jpg"
                                        alt={t('title')}
                                        fill
                                        className="object-cover hidden dark:block"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 400px"
                                    />
                                    
                                    {/* Overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)]/20 to-transparent" />
                                </div>

                                {/* Floating badges */}
                                <motion.div 
                                    className="absolute -bottom-4 -left-4 glass-card px-4 py-2 rounded-xl shadow-lg"
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white text-xs font-bold">
                                            PBI
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-[var(--foreground)]">Power BI</div>
                                            <div className="text-[10px] text-[var(--muted-foreground)]">{t('hero.powerbiBadge')}</div>
                                        </div>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="absolute -top-4 -right-4 glass-card px-4 py-2 rounded-xl shadow-lg"
                                    animate={{ y: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                                >
                                    <div className="flex items-center gap-2">
                                        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500 to-teal-400 flex items-center justify-center text-white text-xs font-bold">
                                            AZ
                                        </div>
                                        <div>
                                            <div className="text-xs font-semibold text-[var(--foreground)]">Azure</div>
                                            <div className="text-[10px] text-[var(--muted-foreground)]">{t('hero.azureBadge')}</div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div 
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1, duration: 0.6 }}
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="flex flex-col items-center gap-2 text-[var(--muted-foreground)]"
                >
                    <span className="text-xs tracking-widest uppercase">{t('hero.scroll')}</span>
                    <div className="w-6 h-10 rounded-full border-2 border-[var(--border)] flex justify-center pt-2">
                        <motion.div 
                            className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]"
                            animate={{ y: [0, 16, 0], opacity: [1, 0.3, 1] }}
                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                    </div>
                </motion.div>
            </motion.div>
        </section>
    );
}
