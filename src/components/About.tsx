"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, SectionHeader, Container } from '@/components/ui/Section';
import { AnimatedCard, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
    BarChart3, 
    Code2, 
    Users, 
    Lightbulb,
    TrendingUp,
    Database,
    Cloud,
    Award
} from 'lucide-react';

const skills = [
    { icon: BarChart3, label: 'Power BI', level: 95 },
    { icon: Database, label: 'SQL / DAX', level: 90 },
    { icon: Cloud, label: 'Azure / Fabric', level: 85 },
    { icon: Code2, label: 'Python', level: 80 },
];

const features = [
    {
        icon: TrendingUp,
        titleKey: 'about.features.analytics.title',
        descriptionKey: 'about.features.analytics.description'
    },
    {
        icon: Code2,
        titleKey: 'about.features.development.title',
        descriptionKey: 'about.features.development.description'
    },
    {
        icon: Users,
        titleKey: 'about.features.training.title',
        descriptionKey: 'about.features.training.description'
    },
    {
        icon: Lightbulb,
        titleKey: 'about.features.consulting.title',
        descriptionKey: 'about.features.consulting.description'
    }
];

export function About() {
    const t = useTranslations('HomePage');

    return (
        <Section id="about" className="bg-[var(--muted)]/30">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-[var(--accent)]/5 to-transparent -z-10" />
            
            <Container>
                <SectionHeader 
                    title={t('about.label')}
                    subtitle={t('about.subtitle')}
                />

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
                    {/* Left column - Story */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                        <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-6">
                            {t('about.heading')}
                        </h3>
                        
                        <div className="space-y-4 text-[var(--muted-foreground)] leading-relaxed">
                            <p className="text-lg">{t('aboutText1')}</p>
                            <p>{t('aboutText2')}</p>
                        </div>

                        {/* Skills Progress */}
                        <div className="mt-8 space-y-4">
                            <h4 className="font-semibold text-[var(--foreground)] mb-4">{t('about.skills')}</h4>
                            {skills.map((skill, index) => (
                                <motion.div 
                                    key={skill.label}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                    className="group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-2">
                                            <skill.icon size={18} className="text-[var(--accent)]" />
                                            <span className="font-medium text-[var(--foreground)]">{skill.label}</span>
                                        </div>
                                        <span className="text-sm text-[var(--muted-foreground)]">{skill.level}%</span>
                                    </div>
                                    <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                                        <motion.div 
                                            className="h-full gradient-bg rounded-full"
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${skill.level}%` }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.3 + index * 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Certifications */}
                        <div className="mt-8 flex flex-wrap gap-2">
                            <Badge variant="soft" icon={<Award size={14} />}>Microsoft Certified</Badge>
                            <Badge variant="soft" icon={<Award size={14} />}>Scrum Master</Badge>
                            <Badge variant="soft" icon={<Award size={14} />}>Product Owner</Badge>
                        </div>
                    </motion.div>

                    {/* Right column - Feature cards */}
                    <div className="grid sm:grid-cols-2 gap-4">
                        {features.map((feature, index) => (
                            <AnimatedCard 
                                key={feature.titleKey}
                                delay={index * 0.1}
                                hover
                                glow
                                className="h-full"
                            >
                                <CardContent className="h-full flex flex-col">
                                    <div className="w-12 h-12 rounded-xl gradient-bg flex items-center justify-center mb-4">
                                        <feature.icon size={24} className="text-white" />
                                    </div>
                                    <h4 className="text-lg font-semibold text-[var(--foreground)] mb-2">
                                        {t(feature.titleKey)}
                                    </h4>
                                    <p className="text-sm text-[var(--muted-foreground)] leading-relaxed flex-grow">
                                        {t(feature.descriptionKey)}
                                    </p>
                                </CardContent>
                            </AnimatedCard>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
}
