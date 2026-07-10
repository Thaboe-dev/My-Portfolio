# SidebarIntro Specification

## Overview
- Target file: `src/components/SidebarIntro.tsx`
- Screenshot: `docs/design-references/brittany-desktop-full.png`
- Interaction model: hover-driven nav/social links; sticky desktop layout.

## Computed Styles
- Container desktop: `position: sticky`, `top: 0px`, `width: 561px`, `height: 1000px`, `display: flex`, `flex-direction: column`, `justify-content: space-between`, `padding-top/bottom: 96px`.
- Name: large bold light slate heading; original desktop h1 approx `font-size: 48px`, `line-height: 48px`, `font-weight: 700`, color `rgb(226, 232, 240)`.
- Role: `font-size: 20px`, `line-height: 28px`, `font-weight: 500`, color `rgb(226, 232, 240)`, margin top 12px.
- Tagline: `font-size: 16px`, `line-height: 24px`, max width about 320px, color `rgb(148, 163, 184)`, margin top 16px.
- Nav: hidden below lg; uppercase text, `font-size: 12px`, `line-height: 16px`, `font-weight: 700`, tracking wide.

## States & Behaviors
- Nav hover: indicator line `width: 32px -> 64px`, background `rgb(71, 85, 105) -> rgb(226, 232, 240)`, label `rgb(100, 116, 139) -> rgb(226, 232, 240)`.
- Social hover: icon color `rgb(148, 163, 184) -> rgb(226, 232, 240)`.

## Responsive Behavior
- Desktop: sticky left column with nav and social links.
- Tablet/mobile: normal block at top; nav remains hidden; social links below intro.
