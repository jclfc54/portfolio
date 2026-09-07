# Design System Master File

> **LOGIC:** When building a specific page, first check `design-system/pages/[page-name].md`.
> If that file exists, its rules **override** this Master file.
> If not, strictly follow the rules below.

---

**Project:** Jason Cushen Portfolio
**Generated:** 2026-09-07 17:10:45
**Category:** Portfolio/Personal
**Design Dials:** Variance 3/10 (Centered / Minimal) | Motion 3/10 (Subtle) | Density 4/10 (Standard)

---

## Global Rules

### Color Palette

| Role | Hex | CSS Variable |
|------|-----|--------------|
| Primary | `#18181B` | `--color-primary` |
| On Primary | `#FFFFFF` | `--color-on-primary` |
| Secondary | `#3F3F46` | `--color-secondary` |
| On Secondary | `#FFFFFF` | `--color-on-secondary` |
| Accent/CTA | `#2563EB` | `--color-accent` |
| On Accent/CTA | `#FFFFFF` | `--color-on-accent` |
| Background | `#FAFAFA` | `--color-background` |
| Foreground | `#09090B` | `--color-foreground` |
| Card | `#FFFFFF` | `--color-card` |
| Card Foreground | `#09090B` | `--color-card-foreground` |
| Muted | `#E8ECF0` | `--color-muted` |
| Muted Foreground | `#475569` | `--color-muted-foreground` |
| Border | `#E4E4E7` | `--color-border` |
| Destructive | `#DC2626` | `--color-destructive` |
| On Destructive | `#FFFFFF` | `--color-on-destructive` |
| Ring | `#18181B` | `--color-ring` |

**Color Notes:** Monochrome + blue accent

### Typography

> **Overridden after review.** The aggregate `--design-system` run matched
> Caveat / Quicksand (handwritten, "personal blogs, lifestyle brands"), which
> is the wrong register for an engineer's portfolio aimed at recruiters. The
> focused `--domain typography` searches returned better-fitting pairings, and
> the implemented stack combines them:
>   - "Minimalist Portfolio" -> Space Grotesk for distinctive headings
>   - "Minimal Swiss" -> Inter for body legibility
>   - "Minimalist Monochrome Editorial" -> mono for labels/dates/figure numbers

- **Display Font:** Space Grotesk (500/600/700) — headings, name, project titles
- **Body Font:** Inter (400) — all prose and UI text
- **Mono Font:** JetBrains Mono (400/500) — the `.label` voice: uppercase,
  `letter-spacing: 0.12em`, `0.6875rem`, used for eyebrows, categories, years,
  statuses, figure numbers and table headers
- **Mood:** minimal, swiss, functional, neutral, professional, technical

**Loading:** via `next/font/google` in `src/app/layout.tsx`, which downloads and
self-hosts the faces at build time. Do **not** add a Google Fonts `@import` —
that reintroduces a third-party runtime request and undoes the CLS-safe
size-adjusted fallbacks Next generates.

### Spacing Variables

*Density: 4/10 — Standard*

| Token | Value | Usage |
|-------|-------|-------|
| `--space-xs` | `4px` / `0.25rem` | Tight gaps |
| `--space-sm` | `8px` / `0.5rem` | Icon gaps, inline spacing |
| `--space-md` | `16px` / `1rem` | Standard padding |
| `--space-lg` | `24px` / `1.5rem` | Section padding |
| `--space-xl` | `32px` / `2rem` | Large gaps |
| `--space-2xl` | `48px` / `3rem` | Section margins |
| `--space-3xl` | `64px` / `4rem` | Hero padding |

### Shadow Depths

| Level | Value | Usage |
|-------|-------|-------|
| `--shadow-sm` | `0 1px 2px rgba(0,0,0,0.05)` | Subtle lift |
| `--shadow-md` | `0 4px 6px rgba(0,0,0,0.1)` | Cards, buttons |
| `--shadow-lg` | `0 10px 15px rgba(0,0,0,0.1)` | Modals, dropdowns |
| `--shadow-xl` | `0 20px 25px rgba(0,0,0,0.15)` | Hero images, featured cards |

---

## Component Specs

### Buttons

```css
/* Primary Button */
.btn-primary {
  background: #2563EB;
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}

.btn-primary:hover {
  opacity: 0.9;
  transform: translateY(-1px);
}

/* Secondary Button */
.btn-secondary {
  background: transparent;
  color: #18181B;
  border: 2px solid #18181B;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  transition: all 200ms ease;
  cursor: pointer;
}
```

### Cards

```css
.card {
  background: #FAFAFA;
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--shadow-md);
  transition: all 200ms ease;
  cursor: pointer;
}

.card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}
```

### Inputs

```css
.input {
  padding: 12px 16px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  font-size: 16px;
  transition: border-color 200ms ease;
}

.input:focus {
  border-color: #18181B;
  outline: none;
  box-shadow: 0 0 0 3px #18181B20;
}
```

### Modals

```css
.modal-overlay {
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
}

.modal {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: var(--shadow-xl);
  max-width: 500px;
  width: 90%;
}
```

---

## Style Guidelines

**Style:** Minimalism & Swiss Style

**Keywords:** Clean, simple, spacious, functional, white space, high contrast, geometric, sans-serif, grid-based, essential

**Best For:** Enterprise apps, dashboards, documentation sites, SaaS platforms, professional tools

**Key Effects:** Subtle hover (200-250ms), smooth transitions, sharp shadows if any, clear type hierarchy, fast loading

### Page Pattern

**Pattern Name:** Scroll-Triggered Storytelling

- **Conversion Strategy:** Keep the narrative understandable without scroll-driven effects. Use progress indicator. Mobile: simplify animations. Keep DOM reading order complete; disable parallax and scroll-scrub under reduced motion. Pause scroll animation when offscreen or hidden and render each chapter in its final readable state under reduced motion.
- **CTA Placement:** End of each chapter (mini) + Final climax CTA
- **Section Order:** Intro hook > Chapter 1 (problem) > Chapter 2 (journey) > Chapter 3 (solution) > Climax CTA

---

## Motion

**Scroll Reveal** (Subtle) — Trigger: scroll (viewport enter) | Duration: 300-400ms | Easing: `power1.out`

```js
gsap.from(el, { opacity: 0, y: 12, duration: 0.35, ease: 'power1.out', scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' } });
```

**Framework notes:** Requires the ScrollTrigger plugin registered once via gsap.registerPlugin(ScrollTrigger); Use matchMedia('(prefers-reduced-motion: reduce)') to skip non-essential motion and render the final state immediately

- ✅ Keep the y offset small (8-16px) so it reads as a fade, not a slide
- ❌ Don't reveal below-the-fold content needed for SEO/crawlers as invisible-by-default without a no-JS fallback
- ⚡ toggleActions 'play none none reverse' avoids re-triggering on every scroll direction change

---

## Anti-Patterns (Do NOT Use)

- ❌ Corporate templates
- ❌ Generic layouts

### Additional Forbidden Patterns

- ❌ **Emojis as icons** — Use SVG icons (Heroicons, Lucide, Simple Icons)
- ❌ **Missing cursor:pointer** — All clickable elements must have cursor:pointer
- ❌ **Layout-shifting hovers** — Avoid scale transforms that shift layout
- ❌ **Low contrast text** — Maintain 4.5:1 minimum contrast ratio
- ❌ **Instant state changes** — Always use transitions (150-300ms)
- ❌ **Invisible focus states** — Focus states must be visible for a11y

---

## Pre-Delivery Checklist

Before delivering any UI code, verify:

- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] `cursor-pointer` on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard navigation
- [ ] `prefers-reduced-motion` respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
- [ ] No content hidden behind fixed navbars
- [ ] No horizontal scroll on mobile

---

## Implementation Notes (as built)

The site implements this system in `src/app/globals.css`. Token names there are
shorter than the generic roles above; the mapping is:

| MASTER role | Implemented token | Value |
|---|---|---|
| Background | `--bg` | `#fafafa` |
| Card | `--surface` | `#ffffff` |
| Muted | `--surface-2` | `#f4f5f7` |
| Foreground | `--ink` | `#09090b` |
| Secondary | `--ink-2` | `#3f3f46` |
| Muted Foreground | `--ink-3` | `#475569` |
| Accent | `--accent` | `#2563eb` |
| (accent pressed) | `--accent-2` | `#1d4ed8` |
| Border | `--line` | `#e4e4e7` |
| Ring | `--ring` | `#18181b` |

Two tokens were **added** beyond the generated palette:

- `--line-3` `#71717a` — borders on *interactive* elements (secondary buttons,
  the CV button). The generated `--color-border` `#e4e4e7` is only 1.22:1
  against the background, which fails WCAG 1.4.11 (3:1 for UI components).
  Decorative hairlines still use `--line`.
- `--wash` `#eff4fe` — faint blue fill, verified 4.69:1 for accent text on it.

**Rules that are load-bearing, not decoration:**

1. Blue appears only on interactive or live-status elements. It is never used
   to decorate a heading or a divider.
2. Structure comes from hairlines and whitespace. No drop shadows anywhere.
3. Radii stay at 3px. No pill shapes.
4. Every text/background pair in the palette is verified >= 4.5:1.
5. Motion is subtle only (fade + 12px rise, 380ms). The hidden state is gated
   behind `[data-js="on"]` so content is never invisible without JavaScript.

**Single colour scheme.** There is deliberately no dark mode — the user asked
for one scheme. If one is added later, redefine only the `:root` tokens under
`@media (prefers-color-scheme: dark)`; every component reads the tokens, so no
component markup should need to change.
