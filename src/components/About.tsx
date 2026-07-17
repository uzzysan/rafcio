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

                {/* Bento Grid Top Layer */}
                <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
                    {/* Story Card - Spans 2 columns */}
                    <AnimatedCard 
                        className="md:col-span-2 h-full noise-bg relative overflow-hidden group"
                        hover={true}
                        glow={true}
                    >
                        <div className="absolute -top-24 -right-24 w-80 h-80 bg-[var(--accent)]/5 rounded-full blur-3xl -z-10 group-hover:bg-[var(--accent)]/10 transition-colors duration-500" />
                        <CardContent className="h-full flex flex-col justify-between p-8">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-extrabold text-[var(--foreground)] font-display text-balance mb-6">
                                    {t('about.heading')}
                                </h3>
                                <div className="space-y-6 text-[var(--muted-foreground)] text-pretty leading-relaxed">
                                    <p className="text-lg font-medium text-[var(--foreground)]/90 leading-normal">
                                        {t('aboutText1')}
                                    </p>
                                    <p className="text-base">
                                        {t('aboutText2')}
                                    </p>
                                </div>
                            </div>
                            
                            {/* Certifications Badges */}
                            <div className="mt-8 pt-6 border-t border-[var(--border)] flex flex-wrap gap-2">
                                <Badge variant="soft" icon={<Award size={14} />}>Microsoft Certified</Badge>
                                <Badge variant="soft" icon={<Award size={14} />}>Scrum Master</Badge>
                                <Badge variant="soft" icon={<Award size={14} />}>Product Owner</Badge>
                            </div>
                        </CardContent>
                    </AnimatedCard>

                    {/* Skills Progress Card - Spans 1 column */}
                    <AnimatedCard 
                        className="md:col-span-1 h-full noise-bg"
                        delay={0.15}
                        hover={true}
                        glow={true}
                    >
                        <CardContent className="p-8">
                            <h4 className="text-xl font-bold text-[var(--foreground)] font-display mb-6">
                                {t('about.skills')}
                            </h4>
                            <div className="space-y-6">
                                {skills.map((skill, index) => (
                                    <motion.div 
                                        key={skill.label}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.05, duration: 0.4 }}
                                        className="group"
                                    >
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-2">
                                                <skill.icon size={18} className="text-[var(--accent)]" />
                                                <span className="font-semibold text-[var(--foreground)] text-sm">{skill.label}</span>
                                            </div>
                                            <span className="text-xs font-bold text-[var(--muted-foreground)]">{skill.level}%</span>
                                        </div>
                                        <div className="h-2 bg-[var(--border)] rounded-full overflow-hidden">
                                            <motion.div 
                                                className="h-full gradient-bg rounded-full"
                                                initial={{ width: 0 }}
                                                whileInView={{ width: `${skill.level}%` }}
                                                viewport={{ once: true }}
                                                transition={{ delay: 0.2 + index * 0.05, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                                            />
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </CardContent>
                    </AnimatedCard>
                </div>

                {/* Bento Grid Bottom Layer - Features Showcase */}
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mt-6 lg:mt-8">
                    {features.map((feature, index) => (
                        <AnimatedCard 
                            key={feature.titleKey}
                            delay={index * 0.1}
                            hover={true}
                            glow={true}
                            className="h-full noise-bg"
                        >
                            <CardContent className="h-full flex flex-col p-6">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[var(--accent)]/15 to-[var(--accent-secondary)]/15 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                    <feature.icon size={22} className="text-[var(--accent)]" />
                                </div>
                                <h4 className="text-lg font-bold text-[var(--foreground)] font-display mb-3">
                                    {t(feature.titleKey)}
                                </h4>
                                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed text-pretty flex-grow">
                                    {t(feature.descriptionKey)}
                                </p>
                            </CardContent>
                        </AnimatedCard>
                    ))}
                </div>
            </Container>
        </Section>
    );
}
