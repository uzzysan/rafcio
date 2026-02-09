"use client"

import { useTranslations, useLocale } from 'next-intl';
import { projects } from '@/data/projects';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

export function Projects() {
    const t = useTranslations('HomePage');
    const locale = useLocale();

    return (
        <section id="projects" className="py-20 bg-gray-50 dark:bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                        {t('projectsHeading')}
                    </h2>
                    <div className="h-1 w-20 bg-orange-500 mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {projects.map((project, index) => (
                        <div
                            key={project.id}
                            className="group relative bg-white dark:bg-[#171717] rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all hover:-translate-y-1 p-8 border border-gray-100 dark:border-white/5 flex flex-col items-center text-center"
                        >
                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full">
                                <div className="mb-6 relative w-24 h-24 mx-auto transition-transform duration-300 group-hover:scale-110">
                                    {project.logoUrl && (
                                        <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/50 backdrop-blur-sm p-2 flex items-center justify-center">
                                            <Image
                                                src={project.logoUrl}
                                                alt={t(`projectsList.${project.translationKey}.title`)}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                    )}
                                </div>

                                <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white group-hover:text-orange-500 transition-colors flex items-center justify-center gap-2">
                                    {t(`projectsList.${project.translationKey}.title`)}
                                    <ExternalLink size={16} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                                </h3>
                            </a>

                            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                {t(`projectsList.${project.translationKey}.description`)}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center">
                                {project.tags.map(tag => (
                                    <span
                                        key={tag}
                                        className="text-xs font-medium px-2.5 py-1 rounded-full bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
