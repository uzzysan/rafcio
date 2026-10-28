# Rafał Maculewicz - Portfolio

Profesjonalna strona portfolio prezentująca doświadczenie w analityce danych, Business Intelligence i rozwoju oprogramowania.

## Technologie

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- next-intl (internacjonalizacja)
- Framer Motion (animacje)
- hCaptcha (zabezpieczenia)

## Funkcjonalności

- Responsywny design
- Wsparcie dla języków PL/EN
- Ciemny/jasny motyw
- Formularz kontaktowy z zabezpieczeniem hCaptcha
- Sekcje: O mnie, Usługi, Projekty, Doświadczenie, Kontakt
- Dedykowane podstrony projektów: `/projects` oraz `/projects/<slug>`

## Projekty

Karty i opisy projektów są generowane z jednego źródła: `src/data/projects.ts`.
Strona główna pokazuje skrót, a pełne studium przypadku jest dostępne pod
`/[locale]/projects/<slug>` (np. `/pl/projects/ev-assist`).

### Dodawanie nowego projektu

1. Dodaj wpis do tablicy `projects` w `src/data/projects.ts`:

   ```ts
   {
     id: 'moj_projekt',          // klucz tłumaczeń
     slug: 'moj-projekt',        // adres URL
     tags: ['Next.js', 'TypeScript'],
     link: 'https://example.com',
     logoUrl: '/moj_projekt_logo.svg',
     status: 'live',             // 'live' | 'in-progress'
   }
   ```

2. Dodaj logo do katalogu `public/`.
3. Uzupełnij treści w `src/messages/pl.json` i `src/messages/en.json`
   w sekcji `HomePage.projects.items.moj_projekt` — wymagane pola:
   `eyebrow`, `title`, `tagline`, `description`, `summary`,
   `metaDescription`, `overview`, `context` oraz tablica `highlights`.
4. Uruchom `npm run build`, aby sprawdzić typy i wygenerować strony.

Kolejność na liście odpowiada kolejności w tablicy `projects`.

## Wsparcie

Jeśli podobają Ci się moje projekty i chcesz wesprzeć ich rozwój:

[![Wesprzyj mnie](https://suppi.pl/api/widget/button.svg?fill=6457FF&textColor=ffffff)](https://suppi.pl/rafcio)

## Autor

Rafał Maculewicz - [rafal.maculewicz@tuta.com](mailto:rafal.maculewicz@tuta.com)

## Licencja

Wszelkie prawa zastrzeżone © 2026
