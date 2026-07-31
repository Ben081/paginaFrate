# FRATE — Sitio principal (`frate.lat`)

Migración del mockup HTML al stack técnico definido en las especificaciones del proyecto:
**React (Vite) + Tailwind CSS + Framer Motion**, compilado como sitio estático para servir con Nginx.

## Estructura

```
frate-principal/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js       ← paleta y tipografía extraídas del mockup
├── postcss.config.js
└── src/
    ├── main.jsx
    ├── App.jsx               ← ensambla todas las secciones
    ├── index.css             ← estilos base + fuentes
    ├── data/
    │   └── content.js        ← todo el contenido editable (proyectos, aliados, equipo, stats)
    └── components/
        ├── Header.jsx
        ├── Hero.jsx
        ├── Mision.jsx
        ├── Proyectos.jsx
        ├── QuienesSomos.jsx
        ├── Aliados.jsx
        ├── Crowdfunding.jsx
        ├── Contacto.jsx
        ├── Footer.jsx
        ├── DonarModal.jsx     ← flujo de donación (monto, Culqi, anonimato, normalización de nombre)
        └── Reveal.jsx         ← wrapper de scroll-reveal con Framer Motion
```

## Cómo editar contenido

Casi todo el texto real (proyectos, aliados, instituciones, equipo, stats, contacto) vive en
`src/data/content.js`. No hace falta tocar los componentes para actualizar textos.

Los bloques marcados entre `[corchetes]` en el sitio son placeholders pendientes de contenido real
(historia de FRATE, capturas de crowdfunding, confirmación de instituciones con convenio, etc.),
tal como estaba en las especificaciones originales.

## Instalar y correr en desarrollo

```bash
npm install
npm run dev
```

## Compilar para producción

```bash
npm run build
```

Esto genera la carpeta `dist/` con el sitio estático listo para copiar al VPS y servir con Nginx
(un server block apuntando a `dist/` para el dominio `frate.lat`).

## Pendiente de integrar (backend)

El modal de **Donar** (`DonarModal.jsx`) ya tiene toda la interfaz y validaciones del flujo descrito
en las especificaciones (monto mínimo S/ 15, checkbox de anonimato, normalización de nombre,
consentimiento). Los dos puntos marcados con `// TODO` son donde se conecta con el backend
Node/Express + PM2 que habla con la API de Culqi (la clave secreta de Culqi nunca debe ir en este
frontend).

La sección **"Donadores"** (que se activa automáticamente cuando exista el primer donante) no está
incluida todavía porque depende de datos reales que vendrán del backend — se agrega como un nuevo
componente que haga `fetch` a un endpoint tipo `GET /api/donaciones/:proyecto`.
