import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { CursorAtmosphere } from '@/components/CursorAtmosphere';
import { Footer } from '@/components/Footer';
import { ProjectsShowcase } from '@/components/ProjectsShowcase';

const siteUrl = 'https://maculewicz.pro';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const language = locale === 'en' ? 'en' : 'pl';
    const t = await getTranslations({ locale: language, namespace: 'ProjectsPage' });
    const url = `${siteUrl}/${language}/projects`;

    return {
        title: t('meta.title'),
        description: t('meta.description'),
        alternates: {
            canonical: url,
            languages: {
                en: `${siteUrl}/en/projects`,
                pl: `${siteUrl}/pl/projects`,
                'x-default': `${siteUrl}/pl/projects`,
            },
        },
        openGraph: {
            title: t('meta.title'),
            description: t('meta.description'),
            type: 'website',
            locale: language === 'pl' ? 'pl_PL' : 'en_US',
            url,
            siteName: 'Rafał Maculewicz',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('meta.title'),
            description: t('meta.description'),
        },
    };
}

export default function ProjectsPage() {
    return (
        <div id="main-content" className="flex min-h-screen flex-col" tabIndex={-1}>
            <CursorAtmosphere />
            <ProjectsShowcase />
            <Footer />
        </div>
    );
}
