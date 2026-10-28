import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import { JsonLd } from '@/components/JsonLd';
import { Analytics } from '@/components/Analytics';
import "../globals.css";

const siteUrl = 'https://maculewicz.pro';

const seo = {
    en: {
        title: 'Rafał Maculewicz | Team & Project Leadership',
        description: 'Rafał Maculewicz connects people, business and technology through project delivery, team coordination, Business Intelligence consulting and practical training.',
        keywords: ['team leadership', 'project delivery', 'Business Intelligence', 'Power BI', 'stakeholder management', 'team coordination'],
    },
    pl: {
        title: 'Rafał Maculewicz | Zespoły i projekty',
        description: 'Rafał Maculewicz łączy ludzi, biznes i technologię poprzez prowadzenie projektów, koordynację zespołów, konsulting Business Intelligence i praktyczne szkolenia.',
        keywords: ['zarządzanie zespołem', 'prowadzenie projektów', 'Business Intelligence', 'Power BI', 'współpraca z interesariuszami', 'koordynacja zespołów'],
    },
} as const;

export function generateStaticParams() {
    return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
    const { locale } = await params;
    const language = locale === 'en' ? 'en' : 'pl';
    const content = seo[language];
    const localizedUrl = `${siteUrl}/${language}`;

    return {
        metadataBase: new URL(siteUrl),
        title: content.title,
        description: content.description,
        keywords: [...content.keywords],
        applicationName: 'Rafał Maculewicz',
        authors: [{ name: 'Rafał Maculewicz' }],
        creator: 'Rafał Maculewicz',
        publisher: 'Rafał Maculewicz',
        category: 'Professional profile',
        alternates: {
            canonical: localizedUrl,
            languages: {
                en: `${siteUrl}/en`,
                pl: `${siteUrl}/pl`,
                'x-default': `${siteUrl}/pl`,
            },
        },
        openGraph: {
            title: content.title,
            description: content.description,
            type: 'website',
            locale: language === 'pl' ? 'pl_PL' : 'en_US',
            alternateLocale: language === 'pl' ? ['en_US'] : ['pl_PL'],
            url: localizedUrl,
            siteName: 'Rafał Maculewicz',
        },
        twitter: {
            card: 'summary_large_image',
            title: content.title,
            description: content.description,
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
                'max-snippet': -1,
                'max-video-preview': -1,
            },
        },
    };
}

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    setRequestLocale(locale);
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className="antialiased">
                <Analytics />
                <JsonLd locale={locale} />
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange={false}
                    >
                        <Navbar />
                        <main className="min-h-screen">
                            {children}
                        </main>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
