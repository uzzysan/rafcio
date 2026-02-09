"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';
import { clsx } from 'clsx';

export function LangSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const switchLocale = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    return (
        <div className="flex gap-2 text-sm font-medium">
            <button
                onClick={() => switchLocale('pl')}
                className={clsx(
                    "transition-colors",
                    locale === 'pl' ? "text-orange-500" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                )}
            >
                PL
            </button>
            <span className="text-gray-300 dark:text-gray-700">|</span>
            <button
                onClick={() => switchLocale('en')}
                className={clsx(
                    "transition-colors",
                    locale === 'en' ? "text-orange-500" : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-300"
                )}
            >
                EN
            </button>
        </div>
    );
}
