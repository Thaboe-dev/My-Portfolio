# Page Topology

Target: https://brittanychiang.com/

## Overall Layout
- Desktop: centered `max-width: 1280px` shell with two columns. Left column is sticky, `width: 48%`, `top: 0`, `height: 100vh`, `padding-top/bottom: 96px`. Right column is flow content, `width: 52%`, `padding-top/bottom: 96px`.
- Tablet/mobile: single column with intro first, then sections. Horizontal padding is 24px mobile and 48px tablet.
- Background: `rgb(15, 23, 42)` with a subtle teal radial spotlight. Body text is `rgb(148, 163, 184)`, headings are `rgb(226, 232, 240)`, accent is `rgb(94, 234, 212)`.

## Sections
1. Fixed/sticky intro header: name, role, tagline, nav links, social links.
2. About: four paragraphs with inline accent/strong links and a Tardis/Korok hover image interaction.
3. Experience: six chronological role cards and resume link.
4. Projects: four project cards with thumbnails, links, stats, and tags.
5. Writing: four article rows with years, links, and thumbnails.
6. Footer: credits paragraph with inline links.

## Interaction Models
- Header/nav: hover-driven link color/indicator changes. Sticky on desktop only.
- Social links: hover-driven color change from slate to light slate.
- Cards: hover-driven raised focus treatment on desktop: translucent slate background, ring, shadow, title/accent color shift, image border shift, and dimming of sibling cards through group opacity behavior.
- Inline links: hover-driven accent color.
- Tardis/Korok link: hover-driven image reveal on the original; clone uses a compact local GIF preview beside the text on hover-capable layouts.
- Responsive section labels: visible sticky section headers on small screens, visually hidden on desktop.
