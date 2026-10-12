# Ht-code portfolio

Personal portfolio for Damilola Olawoore, a fullstack engineer.

Built with Next.js (App Router), React 19, Tailwind CSS v4 and next-themes.

## Develop

```bash
npm install
npm run dev
```

Set `NEXT_PUBLIC_SITE_URL` in production so Open Graph URLs resolve correctly.

## Structure

- `src/app/page.js`: home page (hero, work, capabilities, about, contact)
- `src/app/case-study/[slug]/page.js`: case studies, generated from `src/data/work-projects.json`
- `src/lib/site.js`: site constants and project helpers
- `src/app/globals.css`: design tokens (light and dark) and shared utilities

## Adding a project

Add an entry to `src/data/work-projects.json`. Its `id` becomes the URL slug, and a `caseStudy` object adds a case-study page.
