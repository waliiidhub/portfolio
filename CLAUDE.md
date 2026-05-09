# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Start dev server on localhost:8080
npm run build      # Production build
npm run build:dev  # Development build
npm run lint       # ESLint check
npm run preview    # Preview production build
```

No test suite is configured.

## Architecture

**Single-page portfolio app**: React 18 + TypeScript + Vite. One real route (`/` → `Index`) renders `PortfolioLayout`, which is a vertical stack of section components. The `*` route shows `NotFound`.

**Data flow**: No backend. EmailJS handles contact form submissions (requires `VITE_EMAILJS_*` env vars). React Query is installed but not actively used for data fetching — it's present for potential future use.

**Section render order** in `PortfolioLayout.tsx`:
1. `Navigation` — sticky navbar with active-section tracking
2. `HeroSection` — Three.js `ParticleBackground` + intro text
3. `ProjectsSection`
4. `InternshipsSection`
5. `EducationSection`
6. `LanguagesSection`
7. `MotivationSection`

Auto-scrolls to projects after 10 seconds of inactivity.

**Styling system**: Tailwind CSS with a violet/indigo dark theme. Custom design tokens live in `tailwind.config.ts` (colors, fonts, keyframe animations). CSS variables defined in `src/index.css` control the shadcn/ui theming layer. Custom fonts: Space Grotesk (display), Inter (body), JetBrains Mono (code) — loaded via Google Fonts in `index.html`.

**Animations**: Framer Motion for component-level transitions. Custom Tailwind keyframes (`fade-up`, `slide-in-right`, `pulse-glow`, `float`, etc.) for CSS-only effects. Three.js powers the particle background in the hero.

**Component library**: shadcn/ui (Radix UI primitives + Tailwind). Component source lives in `src/components/ui/`. Portfolio-specific sections are in `src/components/portfolio/`.

**Path alias**: `@/` maps to `src/` (configured in both `vite.config.ts` and `tsconfig.json`).
