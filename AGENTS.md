# AGENTS.md — FRATE

## Project overview

FRATE is a cultural/artistic/musical industry management website for Huánuco, Peru.
Single-page React app (Vite + Tailwind + Framer Motion) with a Node/Express backend for donations.

## Stack

- **Frontend:** React 18, Vite 5, Tailwind CSS 3, Framer Motion 11
- **Backend:** Node.js, Express, better-sqlite3, nodemailer
- **Deploy:** Static build → Nginx on VPS

## Commands

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm run preview    # Preview production build
```

## File structure

```
src/
├── main.jsx              # Entry point
├── App.jsx               # Root component, assembles sections
├── index.css             # Global styles + Tailwind directives
├── data/content.js       # All editable content (proyectos, equipo, aliados)
└── components/           # React components (one per section)
```

## Conventions

- **Content lives in `src/data/content.js`** — edit text there, not in components
- **Tailwind config** has custom colors (ink, paper, gold, teal) and fonts (Newsreader, Inter, JetBrains Mono)
- **Framer Motion** for scroll-reveal and entrance animations — always use full `transform` strings (not shorthands like `x`, `y`, `scale`) for GPU acceleration
- **Custom easing:** `cubic-bezier(0.22, 1, 0.36, 1)` for all enter animations
- **Accessibility:** respect `prefers-reduced-motion` (Reveal.jsx uses `useReducedMotion()`)
- **Buttons:** always include `active:scale-[0.97]` for press feedback
- **Color contrast:** gold-bright (#F0D060) passes 4.5:1 on ink; gold (#d9a441) is for button backgrounds only

## Design system

See `DESIGN.md` for full color tokens, typography, spacing, and motion principles.
See `PRODUCT.md` for product context, visitor mode, and brand voice.

## Backend API

```bash
cd server && npm install && npm run dev  # Start API on port 3001
```

Endpoints: `/api/donaciones`, `/api/convocatoria`, `/api/health`, `/admin/donaciones/:token`
