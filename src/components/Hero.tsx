"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react';
import { Container } from '@/components/ui/Section';

export function Hero() {
  const t = useTranslations('HomePage');
  return (
    <section id="top" className="min-h-[90svh] flex items-center pt-28 pb-16 md:pt-36 md:pb-24" aria-labelledby="hero-title">
      <Container size="xl">
        <div className="grid lg:grid-cols-[1.2fr_.8fr] gap-12 lg:gap-20 items-center">
          <div>
            <p className="eyebrow mb-6">{t('hero.eyebrow')}</p>
            <h1 id="hero-title" className="font-display text-[clamp(3rem,5.2vw,4.35rem)] font-semibold leading-[.98] tracking-[-.05em] text-balance">
              {t('hero.title')}
            </h1>
            <p className="mt-7 text-xl md:text-2xl text-[var(--accent)] font-medium max-w-2xl text-balance">{t('hero.subtitle')}</p>
            <div className="mt-9 flex flex-wrap items-center gap-4">
              <a href="#contact" className="inline-flex min-h-12 items-center gap-2 rounded-full bg-[var(--foreground)] px-6 py-3 font-semibold text-[var(--background)] transition-transform hover:-translate-y-0.5">
                {t('cta')} <ArrowUpRight size={18} aria-hidden="true" />
              </a>
              <a href="#experience" className="link-underline inline-flex min-h-12 items-center gap-2 px-1 py-3 font-semibold">
                {t('hero.experienceCta')} <ArrowDownRight size={18} aria-hidden="true" />
              </a>
            </div>
            <p className="mt-5 max-w-xl text-sm text-[var(--muted-foreground)]">{t('hero.availability')}</p>
          </div>
          <div className="relative mx-auto w-full max-w-[31rem]">
            <div className="absolute -left-5 top-8 h-[calc(100%-4rem)] w-px bg-[var(--accent-secondary)]" aria-hidden="true" />
            <div className="hero-portrait relative aspect-square overflow-hidden rounded-[var(--radius-image)] bg-[var(--muted)]">
              <Image src="/bright_bg.jpg" alt="Rafał Maculewicz" fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="hero-portrait-light object-cover" />
              <Image src="/dark_bg.jpg" alt="Rafał Maculewicz" fill priority sizes="(max-width: 1024px) 90vw, 40vw" className="hero-portrait-dark object-cover" />
            </div>
            <div className="absolute -bottom-5 right-4 bg-[var(--foreground)] px-5 py-3 text-sm font-semibold tracking-wide text-[var(--background)]">{t('hero.portraitLabel')}</div>
          </div>
        </div>
      </Container>
    </section>
  );
}
