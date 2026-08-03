# Work Experience Section — Design Spec

**Date:** 2026-08-03
**Status:** Approved

## Goal

Add a new Work Experience section to the homepage, styled like the existing
terminal/mono sections. The internship card (DOST-Caraga OJT) moves into it and
becomes clickable so its certificate of completion can be shown in an image
modal — same pattern as the course cards. The thesis card stays in Projects.

## Design Direction

Matches existing conventions: `data.ts` as single source of content, section
components under `src/components/sections/`, card layout identical to the
current system-deploy cards, modal behavior copied from `Courses.tsx`.

## Scope

- Split the current two `PROJECTS` entries: thesis stays in Projects, OJT moves
  to a new Work Experience section.
- Work Experience cards are clickable (when a certificate image is attached)
  and open the certificate in a modal.

---

## Data (`data.ts`)

New `WorkExperience` interface:

```ts
export interface WorkExperience {
  tag: string;
  title: string;
  company: string;
  period: string;
  body: string;
  tags: string[];
  image?: string;
  url?: string;
}
```

- `image` → certificate image file; when present the card opens it in the modal.
- `url` → optional external link shown as `Open_Link`.

New `WORK_EXPERIENCE: WorkExperience[]` containing the OJT entry:

- title "Robusta Coffee Defect Detection + No-Code Training Platform"
- company "DOST-Caraga"
- period "On-the-Job Training, DOST-Caraga"
- same `tag`, `body`, `tags` as today
- `image`/`url` left blank (certificate added later)

`PROJECTS` is reduced to the thesis entry only (unchanged fields).

`NAV_LINKS` gains `{ href: "#experience", label: "Work Experience" }` after
Stack, before Projects.

## New Section Component (`src/components/sections/WorkExperience.tsx`)

- `Section id="experience" title="WORK_EXPERIENCE"`.
- Card layout mirrors the current Projects cards: mono header row
  (`0X`, tag, period), title, body, tags.
- Card rendered as a `<button>` (like `CourseCard`); click opens the certificate
  image in the modal only when `image` is present.
- Footer hints copied from `CourseCard`: `Open_Link` when `url` exists,
  `View_File` when `image` exists.
- Modal copied from `Courses.tsx`: fixed overlay, backdrop click and `[ESC]`
  close, "STATEMENT_VIEWER.exe" header.
- Empty-state dashed block when `WORK_EXPERIENCE` is empty (consistent with
  Certificates/Courses).

## Composition (`Portfolio.tsx`)

Render `WorkExperience` between `Stack` and `Projects`.

## Projects Section

Unchanged in behavior. Renders the single thesis card and keeps the
`View_All_Systems →` link. The `/projects` archive page and routing stay as-is
(now showing 1 system). No empty-state added (section is non-empty).

## No Changes

- Hero "View Projects" button (points at `#projects`).
- `/projects` archive page, routing, nav link.
- Certificates, Courses, and all other sections.

## Verification

- `npm run lint` passes.
- `npm run build` passes.
- Visual check via `npm run dev`: card order, hover/click on Work Experience
  card, modal open/close via backdrop and `[ESC]`, nav highlight for
  `#experience`.
