"use client"

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { courses } from '@/data/courses';
import { FileText } from 'lucide-react';

export function Courses() {
    const t = useTranslations('HomePage');

    return (
        <section id="courses" className="py-20 bg-white dark:bg-[#1c1917]">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        {t('coursesHeading')}
                    </h2>
                    <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full"></div>
                </motion.div>

                <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="flex items-center p-6 bg-gray-50 dark:bg-[#292524] rounded-xl hover:shadow-md transition-shadow border border-gray-100 dark:border-white/5"
                        >
                            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 rounded-lg mr-4">
                                <FileText size={24} />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-900 dark:text-white">{course.title}</h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400">{course.provider}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
