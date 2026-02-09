import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { ThemeProvider } from '@/components/theme-provider';
import { Navbar } from '@/components/Navbar';
import "../globals.css";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Rafał Maculewicz - Personal Website',
    description: 'Software Engineer, Developer, Creator.',
};

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;
    // Providing all messages to the client
    // side is the easiest way to get started
    const messages = await getMessages();

    return (
        <html lang={locale} suppressHydrationWarning>
            <body className={inter.className}>
                <NextIntlClientProvider messages={messages}>
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                        disableTransitionOnChange
                    >
                        <Navbar />
                        <main className="min-h-screen pt-16">
                            {children}
                        </main>
                    </ThemeProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
