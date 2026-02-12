import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import { JsonLd } from '@/components/JsonLd';
import "../globals.css";

const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
    const { locale } = await params;
    const t = await getTranslations({ locale, namespace: 'HomePage.seo' });

    const baseUrl = 'https://maculewicz.pro'; // Replace with actual production URL

    return {
        title: t('title'),
        description: t('description'),
        keywords: t('keywords').split(', '),
        authors: [{ name: 'Rafał Maculewicz' }],
        alternates: {
            canonical: `${baseUrl}/${locale}`,
            languages: {
                'en-US': `${baseUrl}/en`,
                'pl-PL': `${baseUrl}/pl`,
            },
        },
        openGraph: {
            title: t('title'),
            description: t('description'),
            type: 'website',
            locale: locale === 'pl' ? 'pl_PL' : 'en_US',
            url: `${baseUrl}/${locale}`,
            siteName: 'Rafał Maculewicz Portfolio',
        },
        twitter: {
            card: 'summary_large_image',
            title: t('title'),
            description: t('description'),
        },
        robots: {
            index: true,
            follow: true,
        },
        icons: {
            icon: '/favicon.ico',
            apple: '/apple-touch-icon.png', // Suggesting user to add this file
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
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning className={inter.variable}>
            <body className={`${inter.className} antialiased`}>
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
