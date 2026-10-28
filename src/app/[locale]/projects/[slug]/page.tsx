import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { CursorAtmosphere } from '@/components/CursorAtmosphere';
import { Footer } from '@/components/Footer';
import { ProjectDetail } from '@/components/ProjectDetail';
import { getProjectBySlug, projects } from '@/data/projects';

const siteUrl = 'https://maculewicz.pro';

export function generateStaticParams() {
    return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
    const { locale, slug } = await params;
    const language = locale === 'en' ? 'en' : 'pl';
    const project = getProjectBySlug(slug);

    if (!project) {
        return { title: '404', robots: { index: false, follow: false } };
    }

    const t = await getTranslations({ locale: language, namespace: 'HomePage' });
    const title = t(`projects.items.${project.id}.title`);
    const description = t(`projects.items.${project.id}.metaDescription`);
    const url = `${siteUrl}/${language}/projects/${project.slug}`;

    return {
        title: `${title} | Rafał Maculewicz`,
        description,
        alternates: {
            canonical: url,
            languages: {
                en: `${siteUrl}/en/projects/${project.slug}`,
                pl: `${siteUrl}/pl/projects/${project.slug}`,
                'x-default': `${siteUrl}/pl/projects/${project.slug}`,
            },
        },
        openGraph: {
            title: `${title} | Rafał Maculewicz`,
            description,
            type: 'article',
            locale: language === 'pl' ? 'pl_PL' : 'en_US',
            url,
            siteName: 'Rafał Maculewicz',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}

export default async function ProjectPage({ params }: { params: Promise<{ locale: string; slug: string }> }) {
    const { locale, slug } = await params;
    setRequestLocale(locale);
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div id="main-content" className="flex min-h-screen flex-col" tabIndex={-1}>
            <CursorAtmosphere />
            <ProjectDetail project={project} />
            <Footer />
        </div>
    );
}
