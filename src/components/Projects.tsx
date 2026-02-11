"use client";

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Section, SectionHeader, Container } from '@/components/ui/Section';

import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { 
    ExternalLink, 
    Github, 
    ArrowUpRight,
    Sparkles
} from 'lucide-react';

interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    tags: string[];
    link: string;
    github?: string;
    featured: boolean;
}

const projects: Project[] = [
    {
        id: 'ev_assist',
        title: 'EV Assist',
        description: 'Smart EV charging calculator with real-time route planning',
        longDescription: 'A Progressive Web Application designed to optimize electric vehicle travel. Features intelligent charging calculations, route optimization algorithms, and offline functionality for road trips.',
        image: '/ev_assist_logo.svg',
        tags: ['React', 'TypeScript', 'PWA', 'Vite'],
        link: 'https://ev-assist.maculewicz.pro',
        featured: true
    },
    {
        id: 'fairpact',
        title: 'FairPact',
        description: 'AI-powered contract analysis and compliance tool',
        longDescription: 'Enterprise-grade solution leveraging OCR and NLP to automatically detect unfair contract clauses. Helps legal teams and consumers identify potential risks in agreements.',
        image: '/fairpact_logo.png',
        tags: ['Python', 'FastAPI', 'NLP', 'Next.js'],
        link: 'https://fairpact.pl',
        featured: true
    }
];

function FeaturedProject({ project, index }: { project: Project; index: number }) {
    const t = useTranslations('HomePage');
    const isEven = index % 2 === 0;

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className={`grid lg:grid-cols-2 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'}`}
        >
            {/* Image */}
            <motion.div 
                className={`relative ${isEven ? 'lg:order-1' : 'lg:order-2'}`}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
            >
                <div className="relative group">
                    {/* Background glow */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent)]/20 to-[var(--accent-secondary)]/20 rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Image container */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden border border-[var(--border)] bg-[var(--card)] shadow-xl">
                        <div className="absolute inset-0 flex items-center justify-center p-8 bg-gradient-to-br from-[var(--muted)] to-[var(--background)]">
                            <Image
                                src={project.image}
                                alt={project.title}
                                fill
                                className="object-contain p-8"
                                sizes="(max-width: 1024px) 100vw, 50vw"
                            />
                        </div>
                        
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-[var(--foreground)]/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Button 
                                href={project.link}
                                external
                                icon={<ExternalLink size={18} />}
                            >
                                {t('projects.viewProject')}
                            </Button>
                        </div>
                    </div>


                </div>
            </motion.div>

            {/* Content */}
            <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                <div className="flex items-center gap-3 mb-4">
                    <Badge variant="soft" icon={<Sparkles size={12} />}>{t('projects.featured')}</Badge>
                    <span className="text-sm text-[var(--muted-foreground)]">{project.tags[0]}</span>
                </div>

                <h3 className="text-3xl md:text-4xl font-bold text-[var(--foreground)] mb-4">
                    {project.title}
                </h3>

                <p className="text-lg text-[var(--muted-foreground)] leading-relaxed mb-6">
                    {project.longDescription}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {project.tags.map((tag) => (
                        <Badge key={tag} variant="outline" size="sm">
                            {tag}
                        </Badge>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4">
                    <Button 
                        href={project.link}
                        external
                        icon={<ArrowUpRight size={18} />}
                    >
                        {t('projects.visit')}
                    </Button>
                    <Button 
                        href={project.link}
                        variant="outline"
                        external
                        icon={<ExternalLink size={18} />}
                    >
                        {t('projects.learnMore')}
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}

export function Projects() {
    const t = useTranslations('HomePage');

    return (
        <Section id="projects" className="bg-[var(--muted)]/30">
            {/* Background decoration */}
            <div className="absolute inset-0 -z-10 overflow-hidden">
                <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[var(--accent)]/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-[var(--accent-secondary)]/5 rounded-full blur-[100px]" />
            </div>

            <Container>
                <SectionHeader 
                    title={t('projects.label')}
                    subtitle={t('projects.subtitle')}
                />

                {/* Featured Projects */}
                <div className="space-y-24 md:space-y-32">
                    {projects.filter(p => p.featured).map((project, index) => (
                        <FeaturedProject key={project.id} project={project} index={index} />
                    ))}
                </div>

                {/* CTA */}
                <motion.div 
                    className="mt-20 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                >
                    <p className="text-[var(--muted-foreground)] mb-6">
                        {t('projects.more')}
                    </p>
                    <Button 
                        href="https://github.com/uzzysan"
                        external
                        variant="outline"
                        icon={<Github size={18} />}
                    >
                        {t('projects.github')}
                    </Button>
                </motion.div>
            </Container>
        </Section>
    );
}
