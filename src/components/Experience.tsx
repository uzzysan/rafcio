"use client";

import { useTranslations } from "next-intl";
import { Award, BookOpen } from "lucide-react";
import { Container, Section, SectionHeader } from "@/components/ui/Section";

const experience = [
  { id: "haleon", organisation: "Haleon" },
  { id: "carlsberg", organisation: "Carlsberg Shared Services" },
  { id: "teb", organisation: "TEB Akademia" },
  { id: "bostik", organisation: "Bostik (Arkema)" }
] as const;

const learning = [
  { id: "fabric", organisation: "Microsoft", icon: Award },
  { id: "scrum", organisation: "Scrum Inc.", icon: BookOpen },
  { id: "coaching", organisation: "Haleon", icon: BookOpen },
  { id: "powerbi", organisation: "Udemy", icon: BookOpen },
  { id: "dax", organisation: "SQLBI", icon: BookOpen },
  { id: "ssas", organisation: "Udemy", icon: BookOpen },
  { id: "datawarehouse", organisation: "LinkedIn Learning", icon: BookOpen }
] as const;

export function Experience() {
  const t = useTranslations("HomePage");

  return (
    <Section id="experience">
      <Container>
        <SectionHeader title={t("experience.label")} subtitle={t("experience.subtitle")} />

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.45fr)_minmax(18rem,0.75fr)] lg:gap-16">
          <div>
            <ol className="divide-y divide-[var(--border)]">
              {experience.map((item) => (
                <li key={item.id} className="grid gap-4 py-7 sm:grid-cols-[8rem_minmax(0,1fr)] sm:gap-8">
                  <p className="text-sm font-medium text-[var(--muted-foreground)]">
                    {t(`experience.${item.id}.period`)}
                  </p>
                  <div>
                    <p className="mb-1 text-sm font-medium uppercase tracking-[0.14em] text-[var(--accent)]">
                      {item.organisation}
                    </p>
                    <h3 className="text-xl font-semibold text-[var(--foreground)]">
                      {t(`experience.${item.id}.role`)}
                    </h3>
                    <p className="mt-3 max-w-2xl leading-7 text-[var(--muted-foreground)]">
                      {t(`experience.${item.id}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <aside>
            <div className="mb-7 flex items-center gap-3 border-b border-[var(--border)] pb-4">
              <Award aria-hidden="true" className="text-[var(--accent-secondary)]" size={20} />
              <h3 className="text-xl font-semibold text-[var(--foreground)]">{t("experience.certsTitle")}</h3>
            </div>

            <ul className="space-y-3">
              {learning.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className="flex gap-4 rounded-xl border border-[var(--border)] bg-[var(--card)] p-4">
                    <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[var(--muted)] text-[var(--accent)]">
                      <Icon aria-hidden="true" size={17} />
                    </span>
                    <div>
                      <p className="font-medium leading-6 text-[var(--foreground)]">{t(`experience.${item.id}.title`)}</p>
                      <p className="mt-1 text-sm text-[var(--muted-foreground)]">{item.organisation}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          </aside>
        </div>
      </Container>
    </Section>
  );
}
