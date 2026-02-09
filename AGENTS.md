# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Personal portfolio website for Rafał Maculewicz built with Next.js 16, featuring internationalization (Polish/English), dark/light theme, and Framer Motion animations.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Production build
npm run lint     # Run ESLint
npm run start    # Start production server
node scripts/process-images.js  # Optimize hero images with sharp
```

## Architecture

### Internationalization (next-intl)
- **Routing**: `src/i18n/routing.ts` - defines locales (`pl`, `en`) with `pl` as default
- **Request config**: `src/i18n/request.ts` - loads messages dynamically
- **Translations**: `src/messages/{locale}.json` - all UI text organized by component
- **Middleware**: `src/middleware.ts` - handles locale routing
- **Navigation**: Import `Link`, `useRouter`, `usePathname` from `@/i18n/routing` (not `next/link`)

All routes use `[locale]` dynamic segment: `src/app/[locale]/page.tsx`

### Component Pattern
Components use `useTranslations` hook:
```typescript
"use client"
import { useTranslations } from 'next-intl';
const t = useTranslations('HomePage');
// Access: t('key'), t('nested.key')
```

### Data Files (`src/data/`)
- `projects.ts` - Project definitions with `translationKey` linking to `messages/*.json`
- `courses.ts` - Experience/certificate entries

Content text lives in translation files, not in data files.

### Theming
- `next-themes` provider wraps app in layout
- CSS variables defined in `src/app/globals.css` with `:root` and `@media (prefers-color-scheme: dark)`
- Use `dark:` Tailwind prefix for dark mode variants

### Tailwind CSS v4
Uses `@theme` directive in globals.css for custom tokens (e.g., `--radius-image`).

## Key Files

- `next.config.ts` - Wraps config with `withNextIntl` plugin
- `src/app/[locale]/layout.tsx` - Root layout with providers (NextIntlClientProvider, ThemeProvider)
- `src/app/[locale]/page.tsx` - Home page composing section components

## Adding New Content

**New translation**: Add keys to both `src/messages/en.json` and `src/messages/pl.json`

**New project**: Add entry to `src/data/projects.ts` with `translationKey`, then add corresponding translations under `HomePage.projectsList.{key}`

**New section**: Create component in `src/components/`, use `"use client"` if using hooks, import in page.tsx
