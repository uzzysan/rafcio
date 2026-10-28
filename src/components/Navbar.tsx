"use client";
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { useLocale, useTranslations } from 'next-intl';
import { ArrowLeft, Menu, X } from 'lucide-react';
import { Link, usePathname } from '@/i18n/routing';
import { LangSwitcher } from './LangSwitcher';
import { ThemeToggle } from './ThemeToggle';

const sections = ['about', 'services', 'experience', 'testimonials', 'contact'] as const;

export function Navbar() {
  const t = useTranslations('HomePage');
  const locale = useLocale();
  const pathname = usePathname();
  const onHome = pathname === '/';
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const close = () => setOpen(false);
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener('hashchange', close);
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('hashchange', close);
      window.removeEventListener('keydown', onKey);
    };
  }, []);

  const sectionHref = (id: string) => (onHome ? `#${id}` : `/${locale}#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-[var(--border)] bg-[color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-xl">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-[var(--background)]">
        {t('nav.skipToContent')}
      </a>
      <div className="mx-auto flex h-20 max-w-7xl items-center px-5 sm:px-8 lg:px-10">
        <Link href="/" className="flex items-center gap-3" aria-label={t('nav.homeLabel')}>
          <Image src="/brand/rm-badge.svg" width={48} height={48} alt="" aria-hidden="true" priority />
          <span className="hidden sm:block font-display text-sm font-semibold leading-tight">
            Rafał<br />Maculewicz
          </span>
        </Link>
        <nav className="ml-auto hidden xl:flex items-center gap-6" aria-label={t('nav.primaryLabel')}>
          {sections.slice(0, 2).map((id) => (
            <a key={id} href={sectionHref(id)} className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              {t(`nav.${id}`)}
            </a>
          ))}
          <Link
            href="/projects"
            className="text-sm font-medium text-[var(--foreground)] underline decoration-[var(--accent-secondary)] decoration-1 underline-offset-[6px]"
            aria-current={pathname.startsWith('/projects') ? 'page' : undefined}
          >
            {t('nav.projects')}
          </Link>
          {sections.slice(2).map((id) => (
            <a key={id} href={sectionHref(id)} className="text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--foreground)]">
              {t(id === 'testimonials' ? 'testimonials.label' : `nav.${id}`)}
            </a>
          ))}
        </nav>
        <div className="ml-auto xl:ml-7 flex items-center gap-2">
          {!onHome && (
            <Link
              href="/"
              className="hidden md:inline-flex items-center gap-2 rounded-full border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted-foreground)] transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t('nav.backHome')}
            </Link>
          )}
          <LangSwitcher />
          <ThemeToggle />
          <button
            ref={toggleRef}
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="xl:hidden grid size-11 place-items-center rounded-full border border-[var(--border)]"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="mobile-menu" className="xl:hidden border-t border-[var(--border)] bg-[var(--background)] px-5 py-5" aria-label={t('nav.mobileLabel')}>
          {!onHome && (
            <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-2 py-3 text-lg font-semibold border-b border-[var(--border)]">
              <ArrowLeft size={18} aria-hidden="true" />
              {t('nav.backHome')}
            </Link>
          )}
          {sections.slice(0, 2).map((id) => (
            <a key={id} href={sectionHref(id)} onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold border-b border-[var(--border)]">
              {t(`nav.${id}`)}
            </a>
          ))}
          <Link href="/projects" onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold border-b border-[var(--border)] text-[var(--accent)]">
            {t('nav.projects')}
          </Link>
          {sections.slice(2).map((id) => (
            <a key={id} href={sectionHref(id)} onClick={() => setOpen(false)} className="block py-3 text-lg font-semibold border-b border-[var(--border)] last:border-0">
              {t(id === 'testimonials' ? 'testimonials.label' : `nav.${id}`)}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
