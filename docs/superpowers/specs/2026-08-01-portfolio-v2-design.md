# my-portfolio-v2 — Design Spec

**Date:** 2026-08-01
**Status:** Approved

## Goal

Recreate the existing Schwarzel.dev single-page portfolio in a new folder
(`Desktop/my-portfolio-v2`) with an improved design, architecture, and
structure. Content and branding stay identical.

## Design Direction

Polish the current terminal/hacker aesthetic — scan frames, blinking cursor,
mono fonts, dotted paper background. Keep the personality, make it more
refined, cohesive, and modern. No new dependencies.

## Scope

Visual + architecture polish across all sections. Content (copy, projects,
certificates, contact info) unchanged.

---

## Architecture

New folder layout:

```
src/
  components/
    sections/      ← Hero, About, Stack, Projects, Certificates, Contact
    ui/            ← Section, SectionTag, Container, Button, Tag, ScanFrame,
                     StampBadge, CertificateModal, Reveal
  lib/
    useReveal.ts
    useReducedMotion.ts
    accents.ts
  data.ts          ← pure content + types (single source of truth)
  Portfolio.tsx    ← thin composition layer
```

Principles:

- `data.ts` holds only content and types. The `ACCENT` styling map moves to
  `lib/accents.ts` (presentation separated from content).
- `Container` owns max-width + responsive padding.
- `Section` owns `id`, `scroll-mt`, vertical spacing, and renders the section
  header via `SectionTag` — removes repeated boilerplate from 5 sections.
- `Portfolio.tsx` remains a thin single-page composition (no router needed).

## Design Tokens (index.css)

Tailwind v4 `@theme` block replaces ad-hoc classes and hardcoded colors:

- Colors:
  - `--color-paper` (stone-100 base background)
  - `--color-ink` (stone-900 primary text)
  - `--color-terminal` (green-700 family accents)
  - `--color-signal` (amber-800 family accents)
- Fonts:
  - `--font-display` (Space Grotesk)
  - `--font-body` (Source Serif 4)
  - `--font-mono` (IBM Plex Mono)
- Fonts become theme-aware Tailwind utilities (`font-display`, `font-body`,
  `font-mono`), same syntax as today but defined in one place.

## UI Primitives (components/ui)

Each typed with props, following existing component style:

- `Container` — max-width + responsive padding wrapper.
- `Section` — props `id`, `title`, optional `className`; renders header +
  children.
- `Button` — `variant: "primary" | "secondary" | "ghost"`; used by Hero and
  Contact.
- `Tag` — small chip used by Projects tags and About languages.
- `SectionTag` — kept, slightly refined.
- `ScanFrame`, `StampBadge`, `CertificateModal` — kept as-is (already clean).

## Motion & Interaction

- `Reveal` component — IntersectionObserver-based fade + 8px rise on scroll
  into view; staggered by index via optional `delay` prop.
- Applied to section headers and cards (Projects, Certificates).
- Hover states retained (translate + shadow) with smooth transition curves.
- All animation disabled under `prefers-reduced-motion` via
  `useReducedMotion` + CSS.

## Hero Polish

- `$ whoami` line becomes a proper terminal window: title bar with dots +
  "schwarzel.dev — shell", with the heading rendered as static terminal
  "output" beneath the prompt (no typewriter animation).
- Avatar keeps the scan-frame treatment and blinking cursor.
- Fix `float-left` edge cases on small screens so the avatar lays out
  cleanly at all widths.

## Responsiveness & Typography

- Consistent type scale via tokens.
- Tune Hero heading line-height and size across breakpoints.
- Refine mobile menu styling.
- Verify at 360px, 768px, and 1440px widths.

## Verification

- `npm run lint` passes.
- `npm run build` passes.
- Visual check via `npm run dev` at 360px / 768px / 1440px.
