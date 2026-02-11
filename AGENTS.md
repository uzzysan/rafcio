# AGENTS.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Professional portfolio website for Rafał Maculewicz - Data Analyst, Power BI Expert, and Full-Stack Developer. Built with Next.js 16, featuring internationalization (Polish/English), dark/light theme, and Framer Motion animations.

Target audience: Companies, governmental agencies, and higher management.

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
- Content text lives in translation files, not in data files

### Theming
- `next-themes` provider wraps app in layout
- CSS variables defined in `src/app/globals.css` with `:root` and `.dark`
- Uses sophisticated color palette:
  - Light mode: Sapphire blue (#0f4c81) primary, cyan secondary
  - Dark mode: Cyan (#22d3ee) primary, indigo secondary
- Custom CSS utilities: `.gradient-text`, `.gradient-bg`, `.glass`, `.glass-card`

### Tailwind CSS v4
Uses `@theme` directive in globals.css for custom tokens.

### UI Components (`src/components/ui/`)
Reusable UI primitives:
- `Section.tsx` - Page section wrapper with animations
- `Container.tsx` - Content width constraints
- `Card.tsx` - Card components with hover/glow effects
- `Button.tsx` - Button variants (primary, secondary, outline, ghost)
- `Badge.tsx` - Label/badge components
- `GradientText.tsx` - Text with gradient effect

### Page Sections (`src/components/`)
- `Hero.tsx` - Landing section with animated gradient background
- `About.tsx` - About section with skills progress bars
- `Services.tsx` - Three service cards (Power BI, Development, Training)
- `Projects.tsx` - Portfolio showcase with featured projects
- `Experience.tsx` - Timeline of work experience and certifications
- `Contact.tsx` - Contact form and info
- `Footer.tsx` - Site footer
- `Navbar.tsx` - Navigation with glassmorphism effect

## Key Files

- `next.config.ts` - Wraps config with `withNextIntl` plugin
- `src/app/[locale]/layout.tsx` - Root layout with providers
- `src/app/[locale]/page.tsx` - Home page composing section components
- `src/app/globals.css` - Global styles, CSS variables, animations

## Adding New Content

**New translation**: Add keys to both `src/messages/en.json` and `src/messages/pl.json`

**New section**: 
1. Create component in `src/components/`
2. Add translations to message files
3. Import and add to `src/app/[locale]/page.tsx`

## Design System

### Colors
- Primary accent: `--accent` (sapphire in light, cyan in dark)
- Secondary accent: `--accent-secondary` (cyan in light, indigo in dark)
- Background: `--background`
- Card surfaces: `--card`
- Muted text: `--muted-foreground`

### Animations
- Framer Motion for scroll-triggered animations
- Custom CSS animations in globals.css
- Gradient orbs with pulse-glow animation
- Floating elements with float animation

### Effects
- Glassmorphism: `.glass` and `.glass-card` classes
- Gradient borders: `.gradient-border` class
- Glow effects: `.glow` and `.glow-sm` classes
