"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, SectionHeader, Container } from '@/components/ui/Section';
import { Badge } from '@/components/ui/Badge';
import { 
    Award, 
    Briefcase,
    Calendar
} from 'lucide-react';

interface ExperienceItem {
    id: string;
    type: 'work' | 'certificate';
    organization: string;
    role: string;
    period: string;
    description?: string;
    skills?: string[];
}

const experiences: ExperienceItem[] = [
    {
        id: 'haleon',
        type: 'work',
        organization: 'Haleon',
        role: 'experience.haleon.role',
        period: 'experience.haleon.period',
        description: 'experience.haleon.description',
        skills: ['Azure', 'Power BI', 'Data Engineering', 'Training']
    },
    {
        id: 'carlsberg',
        type: 'work',
        organization: 'Carlsberg Shared Services',
        role: 'experience.carlsberg.role',
        period: 'experience.carlsberg.period',
        description: 'experience.carlsberg.description',
        skills: ['Reporting', 'Process Optimization', 'Data Analytics']
    },
    {
        id: 'bostik',
        type: 'work',
        organization: 'Bostik (Arkema)',
        role: 'experience.bostik.role',
        period: 'experience.bostik.period',
        description: 'experience.bostik.description',
        skills: ['Marketing', 'Project Management', 'International Business']
    }
];

const certifications: ExperienceItem[] = [
    {
        id: 'fabric',
        type: 'certificate',
        organization: 'Microsoft',
        role: 'experience.fabric.title',
        period: '2024',
        skills: ['Microsoft Fabric', 'Power BI', 'Data Engineering']
    },
    {
        id: 'scrum',
        type: 'certificate',
        organization: 'Scrum Inc.',
        role: 'experience.scrum.title',
        period: '2023',
        skills: ['Agile', 'Scrum', 'Project Management']
    }
];

function TimelineItem({ item, index }: { item: ExperienceItem; index: number }) {
    const t = useTranslations('HomePage');
    const isWork = item.type === 'work';

    return (
        <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative pl-8 md:pl-0"
        >
            {/* Timeline line */}
            <div className="absolute left-0 top-0 bottom-0 w-px bg-[var(--border)] md:left-1/2 md:-translate-x-1/2" />
            
            {/* Timeline dot */}
            <div className={`absolute left-0 top-2 w-4 h-4 rounded-full border-4 border-[var(--background)] md:left-1/2 md:-translate-x-1/2 ${isWork ? 'bg-[var(--accent)]' : 'bg-[var(--accent-secondary)]'}`} />

            {/* Content */}
            <div className={`md:grid md:grid-cols-2 md:gap-8 ${index % 2 === 0 ? '' : 'md:text-right'}`}>
                {/* Date - shown on opposite side on desktop */}
                <div className={`hidden md:block ${index % 2 === 0 ? 'md:text-right md:pr-8' : 'md:col-start-2 md:pl-8'}`}>
                    <span className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)]">
                        <Calendar size={14} />
                        {t(item.period)}
                    </span>
                </div>

                {/* Card */}
                <div className={`pb-8 md:pb-12 ${index % 2 === 0 ? 'md:col-start-2 md:pl-8' : 'md:col-start-1 md:pr-8 md:text-right'}`}>
                    <div className="group relative p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)]/30 transition-all duration-300 hover:shadow-lg">
                        {/* Mobile date */}
                        <span className="inline-flex items-center gap-2 text-sm text-[var(--muted-foreground)] mb-2 md:hidden">
                            <Calendar size={14} />
                            {t(item.period)}
                        </span>

                        {/* Type badge */}
                        <div className={`flex items-center gap-2 mb-3 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                            <Badge variant="soft" size="sm" icon={isWork ? <Briefcase size={12} /> : <Award size={12} />}>
                                {isWork ? t('experience.work') : t('experience.certificate')}
                            </Badge>
                        </div>

                        {/* Organization */}
                        <h4 className="text-lg font-bold text-[var(--foreground)] mb-1">
                            {item.organization}
                        </h4>

                        {/* Role */}
                        <p className="text-[var(--accent)] font-medium mb-3">
                            {t(item.role)}
                        </p>

                        {/* Description */}
                        {item.description && (
                            <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-4">
                                {t(item.description)}
                            </p>
                        )}

                        {/* Skills */}
                        {item.skills && (
                            <div className={`flex flex-wrap gap-2 ${index % 2 === 0 ? '' : 'md:justify-end'}`}>
                                {item.skills.map((skill) => (
                                    <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </motion.div>
    );
}

export function Experience() {
    const t = useTranslations('HomePage');

    return (
        <Section id="experience">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[120px]" />
            </div>

            <Container>
                <SectionHeader 
                    title={t('experience.label')}
                    subtitle={t('experience.subtitle')}
                />

                {/* Work Experience */}
                <div className="mb-16">
                    <motion.h3 
                        className="text-xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent)]/10 flex items-center justify-center">
                            <Briefcase size={20} className="text-[var(--accent)]" />
                        </div>
                        {t('experience.workTitle')}
                    </motion.h3>

                    <div className="relative">
                        {experiences.map((exp, index) => (
                            <TimelineItem key={exp.id} item={exp} index={index} />
                        ))}
                    </div>
                </div>

                {/* Certifications */}
                <div>
                    <motion.h3 
                        className="text-xl font-semibold text-[var(--foreground)] mb-8 flex items-center gap-3"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-secondary)]/10 flex items-center justify-center">
                            <Award size={20} className="text-[var(--accent-secondary)]" />
                        </div>
                        {t('experience.certsTitle')}
                    </motion.h3>

                    <div className="grid sm:grid-cols-2 gap-4">
                        {certifications.map((cert, index) => (
                            <motion.div
                                key={cert.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="p-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent-secondary)]/30 transition-all duration-300 group"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent)] to-[var(--accent-secondary)] flex items-center justify-center">
                                        <Award size={24} className="text-white" />
                                    </div>
                                    <Badge variant="soft" size="sm">{cert.period}</Badge>
                                </div>

                                <h4 className="text-lg font-bold text-[var(--foreground)] mb-1">
                                    {cert.organization}
                                </h4>
                                <p className="text-[var(--accent-secondary)] font-medium mb-3">
                                    {t(cert.role)}
                                </p>

                                <div className="flex flex-wrap gap-2">
                                    {cert.skills?.map((skill) => (
                                        <span key={skill} className="text-xs px-2.5 py-1 rounded-full bg-[var(--muted)] text-[var(--muted-foreground)]">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
