# PRODUCT.md — FRATE

## What is this product?

FRATE is a cultural, artistic, and musical industry management platform based in Huánuco, Peru. It serves as the institutional website for FRATE, showcasing projects, team, allies, and enabling donations and contact.

## Who is the visitor?

- **Primary:** Community members, educational institutions, cultural organizations in Huánuco
- **Secondary:** Potential donors, collaborators, and press
- **Context:** Visiting from desktop or mobile, seeking information about cultural projects

## Visitor mode

**Persuade** — The visitor decides whether to engage, collaborate, or donate. Design earns attention and action.

## Brand voice

- Serious but warm
- Culturally grounded (Huánuco, Perú)
- Faith-informed (Catholic influence, Benedictine spirituality)
- Professional, not corporate

## Key pages / surfaces

- Landing page (single-page app with all sections)
- Project subdomains: freestylecatolico.frate.lat, cajonperuano.frate.lat
- Admin dashboard: /admin/donaciones/:token

## Technical constraints

- Static site (React + Vite build) served via Nginx
- Backend API (Node/Express + SQLite) for donations and contact
- Must work on slow connections (Huánuco region)
- Spanish language only (es)
