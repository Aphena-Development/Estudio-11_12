# Estudio-11_12

Plataforma web oficial de **11.12 Estudio** (Atlixco, Puebla) para portafolio fotográfico e invitaciones digitales interactivas con **Arquitectura Multi-Invitación Unificada** sobre Next.js 15 App Router.

## Estructura del Repositorio

- `main/src/app/` — Sitio principal de **11.12 Estudio** (`/`, `/invitaciones`) y motor dinámico de invitaciones (`/i/[slug]`).
- `main/src/templates/` — Plantillas interactivas modulares (`xv-princesa`, `xv-elegante`, `boda-elegante`, `boda-religiosa`) con temas CSS encapsulados.
- `main/src/components/invitation-core/` — Hooks y componentes compartidos (`useCountdown`, `useAudioPlayer`, `calendarUtils`, `AccessControlSection`).
- `main/src/content/invitations/` — Configuraciones de datos por evento/cliente (`accessControl.mode: "none" | "whatsapp" | "external-ticket"` y privacidad `showInPortfolio`).
- `main/public/i/{slug}/assets/` — Fotografías y pistas musicales estáticas de cada invitación.
- `scripts/new-zone.mjs` — Generador rápido de nuevas invitaciones de clientes.

## Comandos Principales

```bash
# Levantar entorno de desarrollo unificado (Next.js)
npm run dev

# Crear los datos y carpeta de assets para una nueva invitación
npm run nueva-invitacion -- <plantilla> <slug-cliente> "Nombre(s)"

# Compilación estática/producción (Coolify / Nixpacks)
npm run build
npm run start
```
