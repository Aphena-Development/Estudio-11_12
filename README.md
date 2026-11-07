# Estudio-11_12

Plataforma web oficial e infraestructura multi-zonas de **11.12 Estudio** (Atlixco, Puebla) para portafolio fotográfico e invitaciones digitales independientes.

## Estructura del Repositorio

- `main/` — Sitio principal de **11.12 Estudio** (Next.js: `/` y `/invitaciones`).
- `zonas/` — Invitaciones digitales de clientes con diseño independiente (`/i/{slug}`).
- `plantillas/` — Plantillas base oficiales (`xv-princesa`, `xv-elegante`, `boda-elegante`, `boda-religiosa`).
- `scripts/` — Compilador incremental con caché (`build-zones.mjs`) y generador de nuevas invitaciones (`new-zone.mjs`).

## Comandos Principales

```bash
# Levantar entorno de desarrollo (compila zonas y levanta Next.js)
npm run dev

# Crear una nueva invitación a partir de una plantilla
npm run nueva-zona -- <slug> --plantilla=<nombre-plantilla>

# Compilación de producción (para Coolify / Nixpacks)
npm run build
npm run start
```
