import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import { projects } from '@/data/projects';
import { Container } from '@/components/ui/Section';

const pad = (n: number) => String(n).padStart(2, '0');

function StatusMark({ status, className = '' }: { status: (typeof projects)[number]['status']; className?: string }) {
  const t = useTranslations('ProjectsPage');
  return (
    <span className={`inline-flex items-center gap-2 text-[.7rem] font-semibold uppercase tracking-[.14em] text-[var(--muted-foreground)] ${className}`}>
      <span
        className={`size-1.5 rounded-full ${status === 'live' ? 'bg-[var(--accent-secondary)]' : 'bg-[var(--muted-foreground)]'}`}
        aria-hidden="true"
      />
      {t(`status.${status}`)}
    </span>
  );
}

function ProjectRow({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const t = useTranslations('ProjectsPage');
  const th = useTranslations('HomePage');
  const tr = (key: string) => th(`projects.items.${project.id}.${key}`);

  return (
    <li>
      <Link
        href={`/projects/${project.slug}`}
        className="project-row grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-5 gap-y-7 py-8 sm:py-10 lg:grid-cols-[3.25rem_5rem_minmax(0,1fr)_minmax(0,14rem)_3rem] lg:items-start lg:gap-x-9 lg:py-12"
      >
        <span className="numeral font-display text-lg font-semibold leading-none text-[var(--accent)] lg:pt-2 lg:text-xl" aria-hidden="true">
          {pad(index + 1)}
        </span>

        <span className="row-mark app-mark block size-16 shrink-0 lg:size-20">
          {project.logoUrl ? (
            <Image src={project.logoUrl} alt="" fill sizes="80px" className="object-cover" />
          ) : (
            <span className="grid h-full place-items-center font-display text-2xl font-semibold">{tr('title').charAt(0)}</span>
          )}
        </span>

        <StatusMark status={project.status} className="justify-self-end lg:hidden" />

        <div className="col-span-3 min-w-0 lg:col-span-1 lg:col-start-3">
          <p className="eyebrow">{tr('eyebrow')}</p>
          <h2 className="row-title mt-3 font-display text-[clamp(2rem,4.2vw,3rem)] font-semibold leading-[1.04] tracking-[-.035em] text-balance">
            {tr('title')}
          </h2>
          <p className="mt-4 max-w-[38rem] text-base leading-7 text-[var(--muted-foreground)] sm:text-lg sm:leading-8 text-pretty">
            {tr('summary')}
          </p>
        </div>

        <div className="col-span-3 min-w-0 lg:col-span-1 lg:pt-1.5">
          <StatusMark status={project.status} className="max-lg:hidden" />
          <p className="text-[.7rem] font-semibold uppercase tracking-[.14em] text-[var(--muted-foreground)] lg:mt-6">{t('technologies')}</p>
          <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1 text-sm font-medium text-[var(--foreground)]" aria-label={t('technologies')}>
            {project.tags.map((tag, i) => (
              <li key={tag} className="inline-flex items-center gap-2">
                {tag}
                {i < project.tags.length - 1 && <span className="text-[var(--accent-secondary)]" aria-hidden="true">·</span>}
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-3 flex items-center justify-between gap-4 lg:col-span-1 lg:block lg:justify-self-end lg:pt-1">
          <span className="text-sm font-semibold text-[var(--accent)] lg:sr-only">{t('viewDetails')}</span>
          <span className="row-arrow grid size-11 place-items-center rounded-full border border-[var(--border)] text-[var(--foreground)] lg:size-12">
            <ArrowRight size={18} aria-hidden="true" />
          </span>
        </div>
      </Link>
    </li>
  );
}

export function ProjectsShowcase() {
  const t = useTranslations('ProjectsPage');
  const home = useTranslations('HomePage');

  return (
    <div className="pb-20 pt-32 sm:pt-36">
      <Container size="xl">
        <Link
          href="/"
          className="inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)]"
        >
          <ArrowUpRight size={16} className="-rotate-45" aria-hidden="true" />
          {t('backHome')}
        </Link>

        <header className="mt-8 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="lg:col-span-8">
            <p className="eyebrow flex items-center gap-3">
              {t('eyebrow')}
              <span className="h-px w-8 bg-[var(--accent-secondary)]" aria-hidden="true" />
              <span className="numeral font-display text-sm font-semibold tracking-[.1em]" aria-hidden="true">
                {pad(projects.length)}
              </span>
            </p>
            <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,5.75rem)] font-semibold leading-[.98] tracking-[-.045em] text-balance">
              {t('title')}
            </h1>
          </div>
          <p className="max-w-xl border-l border-[var(--accent-secondary)] pl-5 text-lg leading-8 text-[var(--muted-foreground)] text-pretty sm:pl-6 lg:col-span-4 lg:mb-3 lg:text-xl lg:leading-9">
            {t('intro')}
          </p>
        </header>

        <div className="mt-16 flex flex-wrap items-baseline justify-between gap-x-6 gap-y-2 pb-4 sm:mt-20">
          <p className="text-[.7rem] font-semibold uppercase tracking-[.16em] text-[var(--muted-foreground)]">
            {t('allProjects')}
          </p>
          <p className="text-sm text-[var(--muted-foreground)]">{t('cardHint')}</p>
        </div>

        <ol className="border-b border-[var(--border)]">
          {projects.map((project, index) => (
            <ProjectRow key={project.id} project={project} index={index} />
          ))}
        </ol>

        <div className="mt-16 flex flex-col items-start justify-between gap-6 sm:mt-20 sm:flex-row sm:items-center">
          <p className="max-w-lg font-display text-xl leading-snug tracking-[-.01em] text-[var(--foreground)] sm:text-2xl">
            {home('projects.more')}
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--border)] px-6 py-3 font-semibold transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t('homeCta')}
            </Link>
            <a
              href="https://github.com/uzzysan"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 font-semibold text-[var(--background)] transition-transform hover:-translate-y-0.5"
            >
              {home('projects.github')}
              <ArrowUpRight size={17} aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
}
