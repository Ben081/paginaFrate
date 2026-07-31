# DESIGN.md — FRATE

## Visual world

Dark, warm, sophisticated. The palette draws from aged paper, ink, and gold — evoking cultural depth and craftsmanship. Teal appears as a secondary accent for interactive elements.

## Mode

**Persuade** — Marketing/institutional site. Earn attention through hierarchy, typography, and restrained motion.

## Color tokens

| Token | Hex | Role |
|---|---|---|
| `ink` | #1c1a17 | Primary background |
| `ink-deep` | #131210 | Elevated surfaces, header, footer |
| `paper` | #f6f2ea | Primary text |
| `paper-dim` | #ece5d6 | Borders, subtle elements |
| `gold` | #d9a441 | Primary accent — use as BACKGROUND, not text on dark |
| `gold-bright` | #e9bd63 | Decorative accent — use sparingly, never as body text on dark |
| `teal` | #1f6f6b | Secondary accent (links, badges, interactive elements) |
| `teal-bright` | #2c8d88 | Secondary accent hover state |

### Contrast notes

- `gold-bright` on `ink` = 1.44:1 — FAILS WCAG. Do not use as text on dark backgrounds.
- `gold` on `ink` = 2.61:1 — FAILS WCAG. Use as button background with dark text only.
- `paper` on `ink` = 4.04:1 — Passes for large text only. For body text, keep at full opacity.
- `teal-bright` on `ink` = passes for large text. Use for interactive accents.

## Typography

| Role | Font | Weight | Usage |
|---|---|---|---|
| Display / Headings | Newsreader (serif) | 500-700 | h1, h2, h3 |
| Body | Inter (sans) | 400-600 | Paragraphs, UI text |
| Labels / Code | JetBrains Mono (mono) | 500-700 | Eyebrows, badges, nav |

### Type scale

- Display: 34-46px (hero), 28px (section headings)
- Body: 15-16.5px
- Labels: 11-13px, uppercase, tracking 0.08-0.12em

## Spacing

- Section padding: py-20 (80px vertical)
- Content max-width: 1160px (max-w-wrap)
- Grid gaps: 4-16px
- Card padding: 18-22px

## Motion principles

- **Enter:** ease-out, 200-500ms, from opacity:0 + translateY(8-24px)
- **Exit:** faster than enter
- **Hover:** subtle, 160ms ease-out
- **Press:** scale(0.97), 160ms ease-out
- **Scroll reveal:** opacity + translateY, once per element
- Custom easing: `cubic-bezier(0.22, 1, 0.36, 1)` (already in use)

## Anti-patterns (Impeccable craft-floor)

- No cards-nested-in-cards
- No gradient text
- No bounce/elastic easing
- No Inter as display font (use Newsreader)
- No gray text on colored surfaces
- No `transition: all`
- No `scale(0)` entry animations
- No `ease-in` on UI elements

## Component patterns

- **Cards:** border border-line rounded-xl, bg-ink-deep
- **Buttons:** bg-gold text-ink-deep rounded-lg, font-mono
- **Eyebrow labels:** font-mono text-[11.5px] uppercase tracking-[0.12em] text-gold-bright
- **Sections:** bg-ink with py-20, alternating with bg-ink-deep for rhythm
