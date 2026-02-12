import { getTranslations } from 'next-intl/server';

export async function JsonLd({ locale }: { locale: string }) {
    const t = await getTranslations({ locale, namespace: 'HomePage' });

    const personData = {
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "Rafał Maculewicz",
        "jobTitle": "Data Analyst & Power BI Expert",
        "url": "https://maculewicz.pro",
        "sameAs": [
            "https://www.linkedin.com/in/rafalmaculewicz/",
            "https://github.com/uzzysan"
        ],
        "knowsAbout": [
            "Power BI",
            "Data Analytics",
            "Azure",
            "SQL",
            "Python",
            "Full-Stack Development"
        ],
        "description": t('seo.description')
    };

    const serviceData = {
        "@context": "https://schema.org",
        "@type": "ProfessionalService",
        "name": "Rafał Maculewicz - Data & BI Solutions",
        "image": "https://maculewicz.pro/bright_bg.jpg",
        "url": "https://maculewicz.pro",
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Śrem",
            "addressCountry": "PL"
        },
        "description": t('about.subtitle'),
        "offers": {
            "@type": "Offer",
            "itemOffered": {
                "@type": "Service",
                "name": "Power BI Development"
            }
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceData) }}
            />
        </>
    );
}
