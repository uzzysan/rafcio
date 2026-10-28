"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, ChevronUp, Github } from "lucide-react";
import { Link } from "@/i18n/routing";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeader } from "@/components/ui/Section";

export function Projects() {
  const t = useTranslations("HomePage");
  const [showAll, setShowAll] = useState(false);
  const visibleProjects = showAll ? projects : projects.slice(0, 4);
  const hasMoreProjects = projects.length > 4;

  return (
    <Section id="projects" className="bg-[var(--muted)]/35">
      <Container>
        <SectionHeader title={t("projects.label")} subtitle={t("projects.subtitle")} />

        <div id="project-grid" className="grid gap-5 md:grid-cols-2">
          {visibleProjects.map((project) => (
            <article
              key={project.id}
              className="paper group flex min-h-full flex-col rounded-[var(--radius-card)] p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[var(--accent-secondary)] sm:p-8"
            >
              <div className="mb-7 flex min-h-14 items-center justify-between gap-5">
                <p className="eyebrow">
                  {t(`projects.items.${project.id}.eyebrow`)}
                </p>
                {project.logoUrl && (
                  <div className="relative h-12 w-24 shrink-0" aria-hidden="true">
                    <Image
                      src={project.logoUrl}
                      alt=""
                      fill
                      sizes="96px"
                      className="object-contain object-right"
                    />
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col">
                <h3 className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-semibold leading-tight tracking-[-.035em] text-[var(--foreground)]">
                  <Link href={`/projects/${project.slug}`} className="transition-colors hover:text-[var(--accent)]">
                    {t(`projects.items.${project.id}.title`)}
                  </Link>
                </h3>
                <p className="mt-4 text-lg leading-8 text-[var(--foreground)]">
                  {t(`projects.items.${project.id}.description`)}
                </p>
                <p className="mt-3 leading-7 text-[var(--muted-foreground)]">
                  {t(`projects.items.${project.id}.detail`)}
                </p>

                <ul className="mt-6 flex flex-wrap gap-2" aria-label={t("projects.technologies")}>
                  {project.tags.map((tag) => (
                    <li key={tag} className="rounded-full border border-[var(--border)] bg-[var(--background)]/55 px-3 py-1 text-xs font-medium text-[var(--muted-foreground)]">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-wrap items-center gap-4 pt-8">
                  <Button href={project.link} external variant="outline" icon={<ArrowUpRight size={17} aria-hidden="true" />}>
                    {t("projects.visit")}
                  </Button>
                  <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
                    {t("projects.learnMore")}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {hasMoreProjects && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--foreground)] px-6 py-3 font-semibold text-[var(--foreground)] transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
              aria-expanded={showAll}
              aria-controls="project-grid"
              onClick={() => setShowAll((current) => !current)}
            >
              {showAll ? t("projects.showFewer") : t("projects.showMore")}
              {showAll ? <ChevronUp size={17} aria-hidden="true" /> : <ChevronDown size={17} aria-hidden="true" />}
            </button>
          </div>
        )}

        <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[var(--muted-foreground)]">{t("projects.more")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/projects"
              className="inline-flex min-h-12 items-center gap-2 rounded-full border border-[var(--foreground)] px-6 py-3 font-semibold text-[var(--foreground)] transition-[color,border-color,transform] hover:-translate-y-0.5 hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              {t("projects.allProjects")}
              <ArrowRight size={17} aria-hidden="true" />
            </Link>
            <Button href="https://github.com/uzzysan" external variant="ghost" icon={<Github size={17} />}>
              {t("projects.github")}
            </Button>
          </div>
        </div>
      </Container>
    </Section>
  );
}
