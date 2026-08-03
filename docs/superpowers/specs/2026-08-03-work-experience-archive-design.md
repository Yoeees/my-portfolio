# Work Experience Archive Page + Card Redesign — Design Spec

**Date:** 2026-08-03
**Status:** Approved

## Goal

Add a `/experience` archive page (mirroring `/projects`) and clean up the work
experience card to eliminate redundancy, show the role, and add a visible
View_Certificate link.

## Data (`data.ts`)

Add `role?: string` to the `WorkExperience` interface. Update the DOST entry:

```ts
export const WORK_EXPERIENCE: WorkExperience[] = [
  {
    tag: "DEFECT DETECTION",
    title: "Robusta Coffee Defect Detection + No-Code Training Platform",
    company: "DOST-Caraga",
    role: "Intern",
    period: "Jan 2025 – May 2025",
    body:
      "Built a YOLO-based mobile app that flags defects in Robusta coffee beans bean-by-bean, and contributed to a no-code platform that lets non-technical users train their own detection models.",
    tags: ["YOLO", "Computer Vision", "Mobile", "No-Code ML"],
  },
];
```

Remove `image: undefined` and `url: undefined` (optional fields, not needed).

## Card Layout

Card rendered as `<article>` (not `<button>`) — no nested interactive elements.

**Header row** — mono, 10px:
```
[01]  DEFECT DETECTION                    Jan 2025 – May 2025
```

**Title** — display font, semibold:
```
Robusta Coffee Defect Detection + No-Code Training Platform
```

**Company + Role** — muted text, role appended with ` · `:
```
DOST-Caraga · Intern
```
Only shown when `role` is present; when absent, company alone.

**Body** — muted, sm.

**Tags** — static `Tag` components, 10px.

**Footer** — View_Certificate link:
```
View_Certificate →
```
Styled as a real `<a>` anchor pointing at `#experience` (opens the cert modal
on the same page) or a `url` if provided. When `image` is set, clicking opens
the same `STATEMENT_VIEWER.exe` modal. When `url` is set, opens in a new tab.

## WorkExperience.tsx Changes

- `WorkExperienceCard`: switch from conditional `<button>`/`<article>` to
  always `<article>` with the same className.
- Remove the `isClickable` logic and `window.open` fallback.
- View_Certificate rendered as a real `<a>` anchor in the footer (not nested
  inside a button). Uses the existing modal when `image` is present.
- `WorkExperience` component stays the same otherwise (empty state, modal,
  section tag).

## Archive Page (`/experience`)

**New file:** `src/pages/ExperiencePage.tsx`
Mirrors `src/pages/ProjectsPage.tsx` exactly:

- Left sidebar (lg): BACK link → `/`, heading "ALL_EXPERIENCE",
  subtitle "Complete Work Experience", description paragraph,
  theme toggle, total count.
- Right side (lg): all `WORK_EXPERIENCE` cards rendered as articles,
  same card structure as the homepage section.
- ThemeProvider wrapper, same responsive layout.

## Routing (`App.tsx`)

Add `/experience` alongside `/projects`:

```ts
const isProjectsPage = window.location.pathname === "/projects";
const isExperiencePage = window.location.pathname === "/experience";
```

Render `<ExperiencePage />` when `isExperiencePage`.

## Homepage Section

Add `View_All_Experience →` link in `WorkExperience.tsx` section, matching
the `View_All_Systems →` link style in `Projects.tsx`, pointing to `/experience`.

## Verification

- `npm run lint` passes.
- `npm run build` passes.
- Visual: homepage card shows role, date, View_Certificate; `/experience`
  page renders all cards with archive layout.
