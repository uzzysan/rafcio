import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { Link } from '@/i18n/routing';
import type { Project } from '@/data/projects';
import { Container } from '@/components/ui/Section';

type Highlight = { title: string; body: string };

const hostOf = (url: string) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const pad = (n: number) => String(n).padStart(2, '0');

const LABEL = 'text-[11px] font-semibold uppercase tracking-[.14em] text-[var(--muted-foreground)]';
const TEXT_LINK =
  'inline-flex min-h-11 items-center gap-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:text-[var(--accent)] focus-visible:text-[var(--accent)]';
const PRIMARY_PILL =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 font-semibold text-[var(--accent-foreground)] shadow-[0_10px_24px_color-mix(in_srgb,var(--accent)_28%,transparent)] motion-safe:transition-transform motion-safe:hover:-translate-y-0.5';
const DARK_PILL =
  'group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 font-semibold text-[var(--background)] transition-opacity hover:opacity-90';

export function ProjectDetail({ project }: { project: Project }) {
  const t = useTranslations('ProjectsPage');
  const th = useTranslations('HomePage');
  const tr = (key: string) => th(`projects.items.${project.id}.${key}`);
  const highlights = th.raw(`projects.items.${project.id}.highlights`) as Highlight[];

  const title = tr('title');
  const host = hostOf(project.link);
  const isLive = project.status === 'live';

  return (
    <article className="pb-20 pt-32 sm:pt-36">
      <Container size="xl">
        {/* Breadcrumb row — mirrors the index header row */}
        <nav
          aria-label={t('backToProjects')}
          className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1"
        >
          <div className="flex flex-wrap items-center gap-x-4">
            <Link href="/projects" className={TEXT_LINK}>
              <ArrowLeft size={16} aria-hidden="true" />
              {t('backToProjects')}
            </Link>
            <span className="text-[var(--border)]" aria-hidden="true">
              /
            </span>
            <Link href="/" className={TEXT_LINK}>
              {t('backHome')}
            </Link>
          </div>
          <p className={`${LABEL} py-3`}>{t('caseStudy')}</p>
        </nav>

        {/* Masthead + fact sheet */}
        <div className="mt-8 grid gap-12 lg:mt-12 lg:grid-cols-12 lg:gap-16">
          <header className="min-w-0 lg:col-span-7">
            <div className="flex items-center gap-5">
              <div className="app-mark size-16 shrink-0 sm:size-20">
                {project.logoUrl ? (
                  <Image
                    src={project.logoUrl}
                    alt=""
                    fill
                    sizes="80px"
                    className="object-cover"
                    priority
                  />
                ) : (
                  <span
                    className="flex size-full items-center justify-center font-display text-3xl font-semibold text-[var(--accent)] sm:text-4xl"
                    aria-hidden="true"
                  >
                    {title.charAt(0)}
                  </span>
                )}
              </div>
              <p className="eyebrow">{tr('eyebrow')}</p>
            </div>

            <h1 className="mt-7 text-balance font-display text-[clamp(2.75rem,9vw,5.5rem)] font-semibold leading-[.96] tracking-[-.045em] sm:mt-8">
              {title}
            </h1>

            <p className="mt-5 max-w-2xl text-pretty font-display text-[clamp(1.3rem,2.4vw,1.9rem)] italic leading-snug text-[var(--accent)] sm:mt-6">
              {tr('tagline')}
            </p>

            <p className="mt-6 max-w-2xl text-pretty text-lg leading-8 text-[var(--foreground)] sm:mt-8 sm:text-xl sm:leading-9">
              {tr('description')}
            </p>
          </header>

          <aside
            className="min-w-0 lg:col-span-4 lg:col-start-9"
            aria-labelledby="project-facts"
          >
            <div className="lg:sticky lg:top-28">
              <h2 id="project-facts" className="eyebrow">
                {t('facts')}
              </h2>

              <dl className="mt-4 border-t border-[var(--border)]">
                <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-[var(--border)] py-4">
                  <dt className={LABEL}>{t('statusLabel')}</dt>
                  <dd className="inline-flex items-center gap-2 text-sm font-semibold">
                    <span
                      className={`size-2 rounded-full ${
                        isLive ? 'bg-[var(--accent-secondary)]' : 'bg-[var(--muted-foreground)]'
                      }`}
                      aria-hidden="true"
                    />
                    {t(`status.${project.status}`)}
                  </dd>
                </div>

                <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-[var(--border)] py-4">
                  <dt className={LABEL}>{t('technologies')}</dt>
                  <dd className="min-w-0">
                    <ul className="stack-list text-sm font-medium">
                      {project.tags.map((tag) => (
                        <li key={tag}>{tag}</li>
                      ))}
                    </ul>
                  </dd>
                </div>

                <div className="grid grid-cols-[6.5rem_1fr] items-baseline gap-4 border-b border-[var(--border)] py-4">
                  <dt className={LABEL}>{t('website')}</dt>
                  <dd className="min-w-0">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center break-all text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline"
                    >
                      {host}
                    </a>
                  </dd>
                </div>
              </dl>

              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${PRIMARY_PILL} mt-6 w-full sm:w-auto`}
              >
                {t('openProject')}
                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                  className="motion-safe:transition-transform motion-safe:group-hover:-translate-y-0.5 motion-safe:group-hover:translate-x-0.5"
                />
              </a>
            </div>
          </aside>
        </div>

        {/* About */}
        <section
          className="mt-20 border-t border-[var(--border)] pt-12 sm:mt-24 sm:pt-14"
          aria-labelledby="project-about"
        >
          <div className="grid gap-8 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <p className="eyebrow">{t('about')}</p>
              <h2
                id="project-about"
                className="mt-4 max-w-xs text-balance font-display text-3xl font-semibold leading-tight tracking-[-.03em] sm:text-4xl"
              >
                {t('aboutHeading')}
              </h2>
            </div>
            <div className="space-y-6 text-lg leading-8 text-[var(--muted-foreground)] lg:col-span-8">
              <p className="text-pretty text-[var(--foreground)]">{tr('overview')}</p>
              <p className="text-pretty">{tr('context')}</p>
            </div>
          </div>
        </section>

        {/* Highlights — numbered editorial list */}
        <section className="mt-20 sm:mt-24" aria-labelledby="project-highlights">
          <div className="flex items-end justify-between gap-6 border-b border-[var(--border)] pb-4">
            <h2 id="project-highlights" className="eyebrow">
              {t('highlights')}
            </h2>
            <span className={`${LABEL} numeral`}>{pad(highlights.length)}</span>
          </div>

          <ol>
            {highlights.map((highlight, index) => (
              <li
                key={highlight.title}
                className="grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-2 border-b border-[var(--border)] py-7 md:grid-cols-12 md:gap-x-8 md:py-9"
              >
                <span
                  className="numeral font-display text-xl font-semibold leading-none text-[var(--accent)] md:col-span-1 md:text-2xl"
                  aria-hidden="true"
                >
                  {pad(index + 1)}
                </span>
                <h3 className="text-balance font-display text-2xl font-semibold leading-tight tracking-[-.02em] md:col-span-4 md:text-[1.75rem]">
                  {highlight.title}
                </h3>
                <p className="col-start-2 text-pretty leading-7 text-[var(--muted-foreground)] md:col-span-7 md:col-start-auto md:text-lg md:leading-8">
                  {highlight.body}
                </p>
              </li>
            ))}
          </ol>
        </section>

        {/* Colophon */}
        <footer className="mt-16 border-t border-[var(--border)] pt-8 sm:mt-20">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div className="min-w-0">
              <p className={LABEL}>{t('website')}</p>
              <a
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex min-h-11 items-center gap-2 break-all font-display text-2xl font-semibold tracking-[-.02em] text-[var(--accent)] underline-offset-4 hover:underline"
              >
                {host}
                <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/projects" className={DARK_PILL}>
                <ArrowLeft size={16} aria-hidden="true" />
                {t('backToProjects')}
              </Link>
              <Link href="/" className={TEXT_LINK}>
                {t('homeCta')}
                <ArrowRight size={16} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </footer>
      </Container>
    </article>
  );
}
