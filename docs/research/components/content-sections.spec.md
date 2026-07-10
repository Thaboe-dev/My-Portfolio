# ContentSections Specification

## Overview
- Target file: `src/components/PortfolioSections.tsx`
- Screenshots: `docs/design-references/brittany-desktop-full.png`, `docs/design-references/brittany-mobile-full.png`
- Interaction model: static text with hover-driven links and cards.

## Shared Tokens
- Background: `rgb(15, 23, 42)`.
- Body text: `rgb(148, 163, 184)`; paragraph `font-size: 16px`, `line-height: 26px`.
- Headings/title text: `rgb(226, 232, 240)`.
- Muted text: `rgb(100, 116, 139)` and `rgb(71, 85, 105)`.
- Accent: `rgb(94, 234, 212)`.
- Tag background: `rgba(45, 212, 191, 0.1)`.
- Card hover background: `rgba(30, 41, 59, 0.5)` with ring `rgba(148, 163, 184, 0.1)`.

## DOM Structure
- Right column `<main id="content">` contains `AboutSection`, `ExperienceSection`, `ProjectsSection`, `WritingSection`, and footer.
- Each section uses `section` with `id`, `scroll-margin-top`, bottom margins `64px` mobile, `96px` tablet, `144px` desktop.
- Small screens include sticky section label header; desktop hides these labels.

## Card Styles
- Experience card: desktop grid `grid-template-columns: repeat(8, minmax(0, 1fr))`, gap 16px/32px; date spans 2 columns, content spans 6.
- Project/writing card: thumbnail spans 2 columns and content spans 6 on sm+; stacks on mobile.
- Desktop card hover: negative inset pseudo-panel, rounded 6px, background/ring/shadow.
- Tags: inline rounded-full pills, padding `4px 12px`, font `12px/20px`, weight 500, accent text.

## Assets
- Project images: `/images/projects/course-card.png`, `/images/projects/spotify-profile.png`, `/images/projects/halcyon.png`, `/images/projects/v4.png`.
- Writing images: `/images/writing/ai-parade.png`, `/images/writing/a11y.png`, `/images/writing/algolia-search.jpeg`, `/images/writing/headless.jpeg`.
- Tardis GIF: `/images/tardis/rotate.gif`.

## Text Content
- Use verbatim extracted copy from `GLOBAL_EXTRACTION.json` for about, experience, projects, writing, and footer.

## Responsive Behavior
- Desktop 1440px: content column width `607px` at x about `705px`.
- Mobile 390px: single column, sticky section labels, project thumbnails below/above text as compact rows.
