# Behaviors

## Scroll Sweep
- Desktop left intro column is sticky at `top: 0`; right content scrolls independently in normal document flow.
- No scroll snapping or Lenis/Locomotive classes were observed in the extracted DOM.
- Mobile/tablet section labels are sticky bars with translucent `rgb(15 23 42 / 0.75)` and backdrop blur.

## Click Sweep
- Nav links anchor-scroll to `#about`, `#experience`, and `#projects`.
- All role, project, writing, social, and footer links navigate externally or to local resume/archive pages.
- No tabs, accordions, dialogs, dropdowns, or click-to-switch content were observed.

## Hover Sweep
- Nav links: text changes to `rgb(226, 232, 240)` and the indicator line expands from 32px to 64px with `transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1)`.
- Cards: on desktop, the active card becomes fully opaque and gains a subtle `rgba(30, 41, 59, 0.5)` background, `rgba(148, 163, 184, 0.1)` ring, and shadow; sibling cards dim to 50% opacity.
- Card titles and selected links change to accent `rgb(94, 234, 212)` on hover.
- Tags use `rgba(45, 212, 191, 0.1)` background and `rgb(94, 234, 212)` text.
- Project/writing thumbnails have slate borders and become more prominent on hover.

## Responsive Sweep
- 1440px: two columns, left sticky, nav/socials visible, content starts near x=705px.
- 768px: one column, intro and content stack; section headers become sticky mobile bars.
- 390px: one column with 24px side padding; cards stack image/content in a compact single-column flow.
