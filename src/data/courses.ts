export interface Course {
    id: string;
    title: string;
    provider: string; // Role or details
    date: string; // Not strictly needed but kept for interface consistency
    type: 'experience' | 'certificate';
}

export const courses: Course[] = [
    {
        id: 'haleon',
        title: 'Haleon',
        provider: 'End to End System Engineer – Azure solutions & Power BI Trainer',
        date: 'Experience',
        type: 'experience',
    },
    {
        id: 'carlsberg',
        title: 'Carlsberg Shared Services',
        provider: 'Senior Reporting Expert – Process optimization',
        date: 'Experience',
        type: 'experience',
    },
    {
        id: 'microsoft',
        title: 'Microsoft Certified',
        provider: 'Fabric Analytics Engineer Associate',
        date: 'Certificate',
        type: 'certificate',
    },
    {
        id: 'scrum',
        title: 'Agile',
        provider: 'Certified Scrum Master & Product Owner (Scrum Inc.)',
        date: 'Certificate',
        type: 'certificate',
    },
];
