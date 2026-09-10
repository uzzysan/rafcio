import type { MetadataRoute } from 'next';

const siteUrl = 'https://maculewicz.pro';

export default function sitemap(): MetadataRoute.Sitemap {
    const languages = {
        en: `${siteUrl}/en`,
        pl: `${siteUrl}/pl`,
        'x-default': `${siteUrl}/pl`,
    };

    return ['pl', 'en'].map((locale) => ({
        url: `${siteUrl}/${locale}`,
        changeFrequency: 'monthly' as const,
        priority: 1,
        alternates: { languages },
    }));
}
