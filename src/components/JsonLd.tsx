const siteUrl = 'https://maculewicz.pro';

const localized = {
  en: {
    description: 'Rafał Maculewicz connects people, business and technology through project delivery, team coordination, Business Intelligence consulting and practical training.',
    websiteName: 'Rafał Maculewicz — Team and project leadership',
  },
  pl: {
    description: 'Rafał Maculewicz łączy ludzi, biznes i technologię poprzez prowadzenie projektów, koordynację zespołów, konsulting Business Intelligence i praktyczne szkolenia.',
    websiteName: 'Rafał Maculewicz — zarządzanie zespołami i projektami',
  },
} as const;

export function JsonLd({ locale }: { locale: string }) {
  const language = locale === 'en' ? 'en' : 'pl';
  const copy = localized[language];
  const localizedUrl = `${siteUrl}/${language}`;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': `${siteUrl}/#person`,
        name: 'Rafał Maculewicz',
        url: localizedUrl,
        email: 'mailto:rafal.maculewicz@tuta.com',
        telephone: '+48 797 432 297',
        description: copy.description,
        knowsAbout: ['Project delivery', 'Team coordination', 'Business Intelligence', 'Supply Chain reporting', 'Power BI', 'Stakeholder management', 'Training and knowledge sharing'],
        sameAs: ['https://www.linkedin.com/in/rafalmaculewicz/', 'https://github.com/uzzysan'],
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: siteUrl,
        name: copy.websiteName,
        inLanguage: language,
        description: copy.description,
        publisher: { '@id': `${siteUrl}/#person` },
      },
      {
        '@type': 'ProfilePage',
        '@id': `${localizedUrl}/#profile`,
        url: localizedUrl,
        name: copy.websiteName,
        inLanguage: language,
        mainEntity: { '@id': `${siteUrl}/#person` },
        isPartOf: { '@id': `${siteUrl}/#website` },
      },
    ],
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, '\\u003c') }} />;
}
