"use client"

import { useTranslations } from 'next-intl';
import Image from 'next/image';

export function Hero() {
    const t = useTranslations('HomePage');

    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
            {/* Background with animated gradient */}
            <div className="absolute inset-0 bg-linear-to-br from-gray-100 to-gray-300 dark:from-[#0a0a0a] dark:to-[#171717] -z-20" />

            {/* Static blob/glow effect */}
            <div className="absolute top-1/4 -right-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-20 -left-20 w-120 h-120 bg-orange-600/10 rounded-full blur-3xl -z-10" />

            <div className="container mx-auto px-6 flex flex-col-reverse md:flex-row items-center gap-12">
                {/* Text Content */}
                <div className="flex-1 text-center md:text-left">
                    <h2 className="text-orange-500 font-medium text-lg mb-4 tracking-wide uppercase">{t('role')}</h2>
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
                        {t('title')}
                    </h1>
                    <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-8 max-w-lg mx-auto md:mx-0 leading-relaxed font-light">
                        {t('slogan')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <a
                            href="#contact"
                            className="px-8 py-4 bg-orange-500 hover:bg-orange-600 text-white rounded-full font-medium transition-transform hover:scale-105 shadow-lg shadow-orange-500/25"
                        >
                            {t('nav.contact')}
                        </a>
                        <a
                            href="#projects"
                            className="px-8 py-4 bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 rounded-full font-medium hover:bg-gray-50 dark:hover:bg-white/20 transition-all backdrop-blur-sm"
                        >
                            {t('nav.projects')}
                        </a>
                    </div>
                </div>

                {/* Image Placeholder */}
                <div className="flex-1 flex justify-center">
                    <div className="relative w-64 h-64 md:w-96 md:h-96">
                        <div className="absolute inset-0 bg-linear-to-tr from-orange-500 to-amber-300 rounded-image rotate-6 opacity-20 blur-lg"></div>
                        <div className="relative w-full h-full bg-gray-200 dark:bg-gray-800 rounded-image overflow-hidden border border-white/50 dark:border-white/10 shadow-2xl flex items-center justify-center">
                            <Image
                                src="/bright_bg.jpg"
                                alt={t('title')}
                                fill
                                className="object-cover dark:hidden"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                            <Image
                                src="/dark_bg.jpg"
                                alt={t('title')}
                                fill
                                className="object-cover hidden dark:block"
                                priority
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
