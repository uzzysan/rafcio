import type { MetadataRoute } from 'next';
import { projects } from '@/data/projects';

const siteUrl = 'https://maculewicz.pro';

export default function sitemap(): MetadataRoute.Sitemap {
    const languages = {
        en: `${siteUrl}/en`,
        pl: `${siteUrl}/pl`,
        'x-default': `${siteUrl}/pl`,
    };

    const localePages = ['pl', 'en'].flatMap((locale) => {
        const alternates = {
            languages: {
                en: `${siteUrl}/en/projects`,
                pl: `${siteUrl}/pl/projects`,
                'x-default': `${siteUrl}/pl/projects`,
            },
        };

        return [
            {
                url: `${siteUrl}/${locale}`,
                changeFrequency: 'monthly' as const,
                priority: 1,
                alternates: { languages },
            },
            {
                url: `${siteUrl}/${locale}/projects`,
                changeFrequency: 'weekly' as const,
                priority: 0.9,
                alternates,
            },
            ...projects.map((project) => ({
                url: `${siteUrl}/${locale}/projects/${project.slug}`,
                changeFrequency: 'monthly' as const,
                priority: 0.7,
                alternates: {
                    languages: {
                        en: `${siteUrl}/en/projects/${project.slug}`,
                        pl: `${siteUrl}/pl/projects/${project.slug}`,
                        'x-default': `${siteUrl}/pl/projects/${project.slug}`,
                    },
                },
            })),
        ];
    });

    return localePages;
}
