export interface Project {
    id: string;
    translationKey: string;
    tags: string[];
    link: string;
    logoUrl?: string; // Path to logo image
    logoComponent?: string; // Name of Lucide icon if no image
}

export const projects: Project[] = [
    {
        id: 'ev_assist',
        translationKey: 'ev_assist',
        tags: ['React', 'TypeScript', 'Vite', 'PWA'],
        link: 'https://ev-assist.maculewicz.pro',
        logoUrl: '/ev_assist_logo.svg',
    },
    {
        id: 'fairpact',
        translationKey: 'fairpact',
        tags: ['Python', 'FastAPI', 'NLP', 'OCR', 'Next.js'],
        link: 'https://fairpact.pl',
        logoUrl: '/fairpact_logo.png',
    },
];
