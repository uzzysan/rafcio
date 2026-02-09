"use client"

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export function About() {
    const t = useTranslations('HomePage');

    return (
        <section id="about" className="py-20 bg-white dark:bg-[#1c1917]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-3xl mx-auto text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-8 text-gray-900 dark:text-white">
                        {t('aboutHeading')}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                        {t('aboutText1')}
                    </p>
                    <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                        {t('aboutText2')}
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
