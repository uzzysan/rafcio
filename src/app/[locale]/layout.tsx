import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import "../globals.css";

const inter = Inter({ 
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
});

export const metadata: Metadata = {
    title: 'Rafał Maculewicz | Data Analyst & Power BI Expert',
    description: 'Professional data analyst, Power BI expert, and full-stack developer helping organizations transform data into strategic decisions.',
    keywords: ['Data Analyst', 'Power BI', 'Business Intelligence', 'Azure', 'Data Engineering', 'Full-Stack Developer', 'Warsaw', 'Poland'],
    authors: [{ name: 'Rafał Maculewicz' }],
    openGraph: {
        title: 'Rafał Maculewicz | Data Analyst & Power BI Expert',
        description: 'Transforming complex data into strategic business decisions.',
        type: 'website',
        locale: 'en_US',
    },
};

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
