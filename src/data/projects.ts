export interface Project {
    /** Stable identifier used by translations (`projects.items.<id>`). */
    id: string;
    /** URL segment for the project detail page: /projects/<slug>. */
    slug: string;
    tags: string[];
    link: string;
    logoUrl?: string;
    /** Cut-out logo marks sit better without a plate behind them. */
    logoTransparent?: boolean;
    status: 'live' | 'in-progress';
}

/**
 * Single source of truth for the project grid and detail pages.
 * To add a project:
 *   1. append an entry here,
 *   2. add copy under `projects.items.<id>` in src/messages/pl.json and en.json,
 *   3. drop the logo in /public.
 */
export const projects: Project[] = [
    {
        id: 'ev_assist',
        slug: 'ev-assist',
        tags: ['React', 'TypeScript', 'Vite', 'PWA'],
        link: 'https://ev-assist.maculewicz.pro',
        logoUrl: '/ev_assist_logo.svg',
        logoTransparent: true,
        status: 'live',
    },
    {
        id: 'fairpact',
        slug: 'fairpact',
        tags: ['Python', 'FastAPI', 'NLP', 'OCR', 'Next.js'],
        link: 'https://fairpact.pl',
        logoUrl: '/fairpact_logo.png',
        logoTransparent: true,
        status: 'live',
    },
];

export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}
