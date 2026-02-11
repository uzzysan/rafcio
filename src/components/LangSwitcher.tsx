"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { clsx } from 'clsx';
import { motion } from 'framer-motion';

export function LangSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex items-center gap-1 p-1 rounded-full bg-[var(--muted)]">
            <button
                onClick={() => switchLocale('pl')}
                className={clsx(
                    "relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
                    locale === 'pl' 
                        ? "text-white" 
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                )}
            >
                {locale === 'pl' && (
                    <motion.div
                        layoutId="langIndicator"
                        className="absolute inset-0 bg-[var(--accent)] rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10">PL</span>
            </button>
            <button
                onClick={() => switchLocale('en')}
                className={clsx(
                    "relative px-3 py-1.5 text-sm font-medium rounded-full transition-all duration-300",
                    locale === 'en' 
                        ? "text-white" 
                        : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
                )}
            >
                {locale === 'en' && (
                    <motion.div
                        layoutId="langIndicator"
                        className="absolute inset-0 bg-[var(--accent)] rounded-full"
                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                )}
                <span className="relative z-10">EN</span>
            </button>
        </div>
    );
}
