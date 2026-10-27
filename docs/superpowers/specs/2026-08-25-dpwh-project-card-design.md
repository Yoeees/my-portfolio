# Design: Add DPWH Caraga Flood Control Data Pipeline project card

Date: 2026-08-25
Status: Approved

## Goal

Feature the recently completed DPWH Caraga Region data engineering project as the first entry in the portfolio's Projects section, with links to both its GitHub repo and live Streamlit dashboard.

## Background

- Portfolio projects are defined in the `PROJECTS` array in `src/data.ts` (`Project` interface).
- Homepage section (`src/components/sections/Projects.tsx`) renders the first 4 cards; `/projects` page (`src/pages/ProjectsPage.tsx`) renders all.
- Existing bug: both card components hardcode the link label "View_Thesis", so any non-thesis URL displays incorrectly (e.g., JaFA's vercel link).
- Source material: local repo `DPWH-Caraga_Region_Project` README + GitHub `Yoeees/Data_Engineering_DPWH13_Project`. Built Aug 2026 (per git history).

## Changes

### 1. Data model — `src/data.ts`

Replace `url?: string` on the `Project` interface with:

```ts
links?: { label: string; href: string }[];
```

Migrate existing entries that used `url`:
- Thesis: `/Thesis.pdf` → `links: [{ label: "View_Thesis", href: "/Thesis.pdf" }]`
- JaFA: `https://jafa-pl.vercel.app/` → `links: [{ label: "View_Live", href: "https://jafa-pl.vercel.app/" }]`

### 2. Card rendering — `Projects.tsx` + `ProjectsPage.tsx`

Render each entry of `p.links` as its own anchor with its own label, replacing the single hardcoded "View_Thesis" anchor. Styling unchanged.

### 3. New project entry — index 0 of `PROJECTS`

```ts
{
  tag: "DATA ENGINEERING · PIPELINE",
  title: "DPWH Caraga Flood Control Data Pipeline",
  period: "Aug 2026",
  body: "End-to-end ELT pipeline ingesting Philippine flood-control project data from two independent government sources (DPWH portal + BetterGov), reconciling them into a unified fact table and flagging records matching publicly documented procurement anomaly patterns — orchestrated with Airflow, transformed with dbt, containerized with Docker, served via a live Streamlit dashboard.",
  tags: ["Python", "Apache Airflow", "PostgreSQL", "dbt", "Docker", "Streamlit"],
  links: [
    { label: "View_Repo", href: "https://github.com/Yoeees/Data_Engineering_DPWH13_Project" },
    { label: "Live_Dashboard", href: "https://dataengineeringdpwh13project.streamlit.app/" },
  ],
  fullDesc: [
    // Problem / Architecture / Entity Resolution / Anomaly Flags / Tech Stack,
    // drawn from the project README
  ],
}
```

Full `fullDesc` sections (final wording drafted during implementation, sourced from the README):
- **Problem** — real messy government data across two sources with conflicting IDs/naming; reconciliation as the core DE challenge.
- **Architecture** — extractors → Postgres raw schema → Airflow DAG (weekly) → dbt staging + marts → Streamlit dashboard; Docker Compose wraps the stack.
- **Entity Resolution** — unified `fct_unified_projects` fact at contract × source grain, contractor dimension + bridge table, fuzzy matching across sources.
- **Anomaly Flags** — chop-chop / doppelganger patterns from BetterGov's published methodology; outputs framed as "flagged for review".
- **Tech Stack** — Python · requests/BeautifulSoup · Airflow · PostgreSQL · dbt-core · Docker Compose · Streamlit + Folium.

### Out of scope

- Keeping the existing generic "Data Engineering Projects" entry unchanged (covers other practice pipelines).
- No changes to ordering logic, homepage slice count, or other sections.

## Verification

- `npm run build` passes (TypeScript + Vite).
- Homepage shows DPWH card first with two correctly labeled links.
- `/projects` archive shows all 7 entries; Thesis and JaFA links still render with correct labels.
