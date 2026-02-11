"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Section, SectionHeader, Container } from '@/components/ui/Section';
import { AnimatedCard, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { 
    PieChart, 
    Cpu, 
    GraduationCap,
    ArrowUpRight,
    CheckCircle2
} from 'lucide-react';

const services = [
    {
        icon: PieChart,
        title: 'services.powerbi.title',
        description: 'services.powerbi.description',
        features: ['services.powerbi.f1', 'services.powerbi.f2', 'services.powerbi.f3', 'services.powerbi.f4'],
        badge: 'services.popular',
        gradient: 'from-blue-500 to-cyan-400'
    },
    {
        icon: Cpu,
        title: 'services.development.title',
        description: 'services.development.description',
        features: ['services.development.f1', 'services.development.f2', 'services.development.f3', 'services.development.f4'],
        badge: null,
        gradient: 'from-emerald-500 to-teal-400'
    },
    {
        icon: GraduationCap,
        title: 'services.training.title',
        description: 'services.training.description',
        features: ['services.training.f1', 'services.training.f2', 'services.training.f3', 'services.training.f4'],
        badge: null,
        gradient: 'from-violet-500 to-purple-400'
    }
];

export function Services() {
    const t = useTranslations('HomePage');

    return (
        <Section id="services">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-[var(--accent)]/5 rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-[var(--accent-secondary)]/5 rounded-full blur-[100px]" />
            </div>

            <Container>
                <SectionHeader 
                    title={t('services.label')}
                    subtitle={t('services.subtitle')}
                />

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {services.map((service, index) => (
                        <AnimatedCard 
                            key={service.title}
                            delay={index * 0.15}
                            hover
                            glow
                            gradient={service.badge !== null}
                            className="group relative"
                        >
                            <CardContent className="h-full flex flex-col">
                                {/* Badge */}
                                {service.badge && (
                                    <div className="absolute top-4 right-4">
                                        <Badge variant="gradient" size="sm">
                                            {t(service.badge)}
                                        </Badge>
                                    </div>
                                )}

                                {/* Icon */}
                                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 shadow-lg shadow-${service.gradient.split(' ')[1]}/20`}>
                                    <service.icon size={28} className="text-white" />
                                </div>

                                {/* Content */}
                                <h3 className="text-xl font-bold text-[var(--foreground)] mb-3 group-hover:text-[var(--accent)] transition-colors">
                                    {t(service.title)}
                                </h3>
                                <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 flex-grow">
                                    {t(service.description)}
                                </p>

                                {/* Features list */}
                                <ul className="space-y-3">
                                    {service.features.map((feature, i) => (
                                        <li key={i} className="flex items-start gap-3">
                                            <CheckCircle2 size={18} className="text-[var(--accent)] mt-0.5 flex-shrink-0" />
                                            <span className="text-sm text-[var(--muted-foreground)]">{t(feature)}</span>
                                        </li>
                                    ))}
                                </ul>

                                {/* CTA */}
                                <motion.a
                                    href="#contact"
                                    className="mt-6 flex items-center gap-2 text-[var(--accent)] font-medium text-sm group/link"
                                    whileHover={{ x: 4 }}
                                >
                                    {t('services.cta')}
                                    <ArrowUpRight size={16} className="transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1" />
                                </motion.a>
                            </CardContent>
                        </AnimatedCard>
                    ))}
                </div>


            </Container>
        </Section>
    );
}
