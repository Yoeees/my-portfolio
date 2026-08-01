---
name: frontend-conventions
description: Use whenever building, editing, or reviewing React/HTML frontend components, pages, or UI — dashboards, landing pages, forms, portfolio sites, settings screens, cards, modals, etc. Apply this any time code output includes JSX/TSX or HTML+CSS, even if the user doesn't explicitly ask for "conventions" or mention this skill by name. Covers stack defaults (React + Tailwind + lucide-react), file/component structure rules, and visual design defaults to avoid generic "AI slop" UI.
---

# Frontend Build Conventions

## Stack defaults
- React functional components + hooks (no class components)
- Tailwind for styling — no inline styles, no CSS modules unless asked
- lucide-react for icons
- If the target project uses TypeScript (`.tsx`/`tsconfig.json` present, or
  the user says so), write real files as `.tsx`/`.ts` with typed props
  (`interface`/`type` for props and data shapes) — don't hand back `.jsx`
  for a TS project and rely on loose typing.

## Tailwind setup (v4 — current as of this writing)
Tailwind v4 changed installation; don't give v3-era instructions
(`npx tailwindcss init -p`, `tailwind.config.js`, `@tailwind base/
components/utilities`) unless the user is intentionally on v3. Verify
against current docs if this may be stale by the time it's read. For a
Vite + React project, v4 setup is:
```
npm install tailwindcss @tailwindcss/vite
```
`vite.config.ts`:
```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```
CSS entry file (e.g. `index.css`), no config file needed:
```css
@import "tailwindcss";
```
No `postcss.config.js`, no `tailwind.config.js`, no `npx tailwindcss init`.

## Structure rules
- One component per file, default export
- Extract repeated JSX into subcomponents once it's used 2+ times
- Props destructured in the function signature, not accessed via `props.x`

## Visual defaults
- Avoid generic "AI slop" look: no purple gradients, no giant emoji icons,
  no centered-everything layouts by default
- Real spacing hierarchy (not everything the same 16px gap)
- Pick an actual visual point of view (minimal/editorial/brutalist/etc.)
  instead of defaulting to generic SaaS-template style
- **Page width**: a full page (not a widget/card embedded in something
  else) should read as a real webpage, not a narrow centered column with
  large dead margins on a normal desktop viewport. Default the outer
  container to `max-w-7xl` (or wider for dashboard/data-heavy layouts),
  not `max-w-5xl`/`max-w-xl`-class widths, and scale side padding up
  through breakpoints (`px-5 sm:px-8 lg:px-12 xl:px-16`) rather than a
  flat value. Within that wide container, it's still fine — often
  better — to cap individual **paragraphs** of body text to a readable
  measure (`max-w-2xl`/`max-w-3xl`, ~60-75 characters per line) so prose
  doesn't stretch edge-to-edge; the narrow-container mistake is capping
  the whole page this way, not capping a paragraph. Multi-column grids,
  card layouts, and hero headings should use the full container width.
  Sanity-check any width choice at a normal 1440px+ desktop viewport,
  not just at the editor's default preview size.

## Constraints
- Don't add localStorage/sessionStorage — not supported in this environment
- Don't over-engineer with global state libraries for a single page
- Always make it responsive by default, not just desktop

## Gotchas — things that silently break
Real bugs hit while building with a user this session. Check these before
shipping, not after the user reports something broken.

- **Icon libraries drop exports without warning.** lucide-react removed
  all brand/logo icons (`Github`, `Linkedin`, `Twitter`, `Facebook`, etc.)
  in its v1.0 for trademark reasons — importing them throws a build-time
  "does not provide an export named X" error, not a lint warning. Don't
  assume an icon name from memory still exists, especially brand logos.
  Either verify the export currently exists, or default to a small
  inline SVG for brand marks (a few lines, no dependency risk) instead
  of importing from an icon pack.
- **CSS `@import` order.** All `@import` statements (Tailwind's
  `@import "tailwindcss"`, Google Fonts, etc.) must be the very first
  lines in the file, before any other rule or `@layer` block — even a
  font import placed a few lines below a Tailwind import will hard-fail
  the build (`@import must precede all other statements`). Put every
  `@import` at the top, in one block, before writing anything else.
- **Vite's scaffolded `App.css` fights custom layout.** The default Vite
  React template ships `src/App.css` with a `#root { max-width: 1280px;
  margin: 0 auto; padding: 2rem; text-align: center; }` rule, still
  imported from `App.tsx`. If a user reports "my full-width layout still
  isn't full width" after you've already checked your own container
  classes, this is the first thing to suspect — tell them to delete the
  `App.css` import (or the file) rather than re-debugging your Tailwind
  classes.
- **`object-cover` is a guess; `object-contain` is a fact.** For any
  image whose real aspect ratio you don't actually know (user-uploaded
  certificates, documents, screenshots — anything that isn't a
  known-shape profile photo), don't pick `object-cover` inside a fixed
  box and guess the ratio — it silently crops content off the edges
  when the guess is wrong, and looks like a bug because it is one.
  Default to `object-contain` for unknown-shape content; reserve
  `object-cover` for cases where cropping is actually fine (avatars,
  photo thumbnails) and even then pair it with an `object-position`
  the user can tune.
- **`<img>` inside an inline element ignores sizing classes.** `w-full
  h-full` on an `<img>` does nothing useful if its parent is a plain
  `<span>` (inline by default) rather than a sized block/flex container
  — place images as a direct child of a `div`/flex container with
  explicit dimensions, not nested inside inline text wrappers left over
  from an earlier placeholder.
- **`<img>` can't render a PDF.** If a user's source asset is a PDF
  (certificates, resumes, scanned docs), either convert it to an image
  first (preferred — enables real thumbnails/previews) or treat it as a
  separate "view/download PDF" link (`?url` import in Vite), never pass
  the PDF path straight to `src` on an `<img>`.
- **`overflow-hidden` clips decorative overflow too.** A badge/tag
  meant to float half-outside a card's rounded corner (a common,
  intentional pattern) gets silently clipped if `overflow-hidden` sits
  on the same container it's positioned relative to. Scope
  `overflow-hidden` + `rounded-*` tightly to the one child that actually
  needs corner-clipping (e.g. an image), and keep the outer wrapper
  (which holds the floating badge) free of `overflow-hidden`.

## Architecture — think like a senior engineer, not a code generator
Before writing anything, decide the shape of the codebase, not just the
shape of the UI. Default posture: would a senior engineer reviewing this
PR ask "why is this all one file?" or "why did you split this into six
files for 40 lines?" — aim for neither.

- **Page vs section vs component.** A page (or route) is a composition
  root: it imports section components and arranges them, and contains
  little to no markup of its own. A section is one meaningful chunk of a
  page (Hero, Pricing, Footer, a dashboard's Sidebar) — each gets its own
  file once the page has more than ~3 distinct sections, even if nothing
  is reused yet. A component is a reusable piece (Button, Card, Badge)
  that earns a shared location once it's used in 2+ places.
- **Separate content from presentation.** Copy, config, nav links,
  pricing tiers, project lists — anything that's data, not markup —
  belongs in a `data.js`/`content.js` (or per-domain `*.data.js`), not
  hardcoded inline in JSX. This is what actually lets a non-engineer (or
  future editing pass) update content without touching layout code.
- **Default folder shape** for anything beyond a single page:
  ```
  src/
    App.jsx                 # routing / top-level composition only
    pages/                  # one file per route/page, composition root
    components/             # section-level components used by pages
      shared/                # small reusable primitives (Button, Badge, Frame)
    data.js                 # or data/ if content is large enough to split
    hooks/                  # only once a stateful pattern repeats
  ```
  Single-page sites still follow this shape at a smaller scale: a
  composing `Page.jsx` + `components/` + `data.js` is the floor for
  anything with more than ~2 sections, not just for "big" projects.
- **Split by what changes together, not by line count.** A 15-line
  component that owns a distinct concern (a stamp badge, a corner-frame
  wrapper) deserves its own file if it's reused or conceptually
  separable; a 150-line single-purpose form does not need to be split
  just to hit a line target. Ask "would I ever touch this without
  touching the rest of the file?" — if yes, split.
- **Name by role, not by shape.** `Hero.jsx`, `CertificateCard.jsx`,
  `PricingTable.jsx` — not `Section1.jsx`, `Box.jsx`, `Component2.jsx`.
  Naming should tell a reader what the piece is for before they open it.
- **When asked to split an existing single-file build into a real
  project** (e.g. "divide this into files/pages so I can copy it into my
  project"), apply this same structure: pull data out to `data.js`/
  `data.ts`, extract each section to `components/`, extract shared small
  pieces separately, and leave one composing file that just arranges
  them. Match the target project's language (`.tsx`/`.ts` with typed
  props if it's TypeScript, `.jsx`/`.js` if not — ask or check for
  `tsconfig.json` if unsure). Also give the install commands for any
  packages the code depends on (icon libraries, Tailwind, etc.), using
  the current Tailwind v4 setup above rather than assuming v3 — assume
  the user's project may not have any of it yet.
