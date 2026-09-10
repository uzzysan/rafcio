"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/data/projects";
import { Button } from "@/components/ui/Button";
import { Container, Section, SectionHeader } from "@/components/ui/Section";

export function Projects() {
  const t = useTranslations("HomePage");

  return (
    <Section id="projects" className="bg-[var(--muted)]/35">
      <Container>
        <SectionHeader title={t("projects.label")} subtitle={t("projects.subtitle")} />

        <div className="divide-y divide-[var(--border)] border-y border-[var(--border)]">
          {projects.map((project, index) => (
            <article
              key={project.id}
              className="grid gap-8 py-10 md:grid-cols-[5rem_minmax(0,1fr)] lg:grid-cols-[5rem_minmax(0,1fr)_18rem] lg:gap-12 lg:py-14"
            >
              <p className="font-mono text-sm text-[var(--accent)]" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </p>

              <div>
                <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted-foreground)]">
                  {t(`projects.items.${project.translationKey}.eyebrow`)}
                </p>
                <h3 className="text-3xl font-semibold tracking-tight text-[var(--foreground)]">
                  {t(`projects.items.${project.translationKey}.title`)}
                </h3>
                <p className="mt-4 max-w-2xl text-lg leading-8 text-[var(--muted-foreground)]">
                  {t(`projects.items.${project.translationKey}.description`)}
                </p>
                <p className="mt-4 max-w-2xl leading-7 text-[var(--muted-foreground)]">
                  {t(`projects.items.${project.translationKey}.detail`)}
                </p>

                <ul className="mt-6 flex flex-wrap gap-x-4 gap-y-2" aria-label={t("projects.technologies")}>
                  {project.tags.map((tag) => (
                    <li key={tag} className="text-xs font-medium text-[var(--muted-foreground)] before:mr-2 before:text-[var(--accent-secondary)] before:content-['•']">
                      {tag}
                    </li>
                  ))}
                </ul>

                <div className="mt-7">
                  <Button href={project.link} external variant="outline" icon={<ArrowUpRight size={17} />}>
                    {t("projects.visit")}
                  </Button>
                </div>
              </div>

              {project.logoUrl && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative hidden min-h-52 overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--card)] lg:block"
                  aria-label={`${t("projects.visit")}: ${t(`projects.items.${project.translationKey}.title`)}`}
                >
                  <Image
                    src={project.logoUrl}
                    alt=""
                    fill
                    sizes="288px"
                    className="object-contain p-10 transition-transform duration-300 group-hover:scale-[1.03]"
                  />
                </a>
              )}
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
          <p className="max-w-xl text-[var(--muted-foreground)]">{t("projects.more")}</p>
          <Button href="https://github.com/uzzysan" external variant="outline" icon={<Github size={17} />}>
            {t("projects.github")}
          </Button>
        </div>
      </Container>
    </Section>
  );
}
