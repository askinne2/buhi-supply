# Figma implementation guide — Buhi Supply Co

## Reference (from your link)

| What | Value |
|------|--------|
| **File** | Buhi |
| **File key** | `ZrSrUUZPokVzpNWA9o3epN` |
| **Desktop homepage (full frame)** | Node `5:331` |
| **Figma URL** | `https://figma.com/design/ZrSrUUZPokVzpNWA9o3epN/Buhi?node-id=5-331` |

## Flow when implementing (with Figma MCP)

1. **Get design data** — `get_design_context(fileKey="ZrSrUUZPokVzpNWA9o3epN", nodeId="5:331")` → layout, typography, colors, structure (React + Tailwind–style output).
2. **Get visual reference** — `get_screenshot(fileKey="ZrSrUUZPokVzpNWA9o3epN", nodeId="5:331")` → reference for 1:1 fidelity.
3. **Assets** — Use image/SVG URLs from the design context (Figma MCP asset URLs). No new icon packages; use `next/image` with those URLs or download into `public/images/` as needed.
4. **Implement in this stack** — Translate into this project’s components, design tokens, and file structure (see below). Do **not** paste raw Figma output; convert to our conventions.

## Already in place (before implementation)

- **Stack:** Next.js 14 (App Router), TypeScript, Tailwind CSS.
- **Design tokens:** `tailwind.config.ts` + `src/styles/tokens.ts` (primary, accent, surface, font-heading, font-body, etc.). Use these; replace any raw hex from Figma with token classes.
- **Component locations:**
  - Layout: `src/components/layout/` (Header, Footer).
  - Sections: `src/components/sections/` (Hero, LifestyleCategories, Bestsellers, TrustBar, Testimonials, EmailCapture, UGCFeed).
  - UI: `src/components/ui/` (ProductCard, Button, StarRating, Badge, SectionHeader).
- **Rules:** `.cursorrules` at project root (no hardcoded hex, `next/image` only, `trackEvent()` for analytics, 8px spacing, etc.).

## Exact prompt to use when ready to implement

Copy-paste (and adjust scope if you want one section only):

```text
Implement the design from Figma.
- File key: ZrSrUUZPokVzpNWA9o3epN (Buhi)
- Node: 5:331 (full desktop homepage)

Use Next.js 14 App Router and Tailwind. Put components in src/components (sections in sections/, UI in ui/). Match the design 1:1. Use our design tokens from tailwind.config and .cursorrules — no hardcoded hex. Use next/image for all images and trackEvent() for key interactions.
```

For a **single section** (e.g. Hero only), you can say:

```text
Implement only the Hero section from Figma node 5:334 (file ZrSrUUZPokVzpNWA9o3epN). Use our stack and design tokens; put it in src/components/sections/Hero.tsx.
```

## Section → node ID quick reference (from .cursorrules)

| Section | Node ID |
|---------|---------|
| Full desktop homepage | `5:331` |
| Header (desktop) | `5:340` |
| Hero | `5:334` |
| Shop by Lifestyle | `5:335` |
| Bestsellers grid | `5:336` |
| Testimonials | `5:337` |
| Email capture | `5:1345` |
| #BuhiEverywhere | `5:339` |
| Footer | `5:1246` |
| Full mobile homepage | `7:396` |
| Mobile header | `7:406` |
| Mobile hero | `7:398` |
| Mobile bestsellers | `7:400` |

## What to clarify when you want to start

- **Scope:** Full page (5:331) vs one section at a time (e.g. Hero 5:334, then Lifestyle 5:335, etc.).
- **Assets:** Use Figma MCP asset URLs directly for now, or download hero/lifestyle/product images into `public/images/` and point components there (better for production).
- **Process:** Run “implement design” once for the full frame, or run it per section and assemble in `src/app/page.tsx` (Phases 3–10 in `1-project-scaffold.md`).

MCP access is working: design context and screenshot for `5:331` have been fetched successfully.
