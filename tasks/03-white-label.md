# Task 03: White-label (build-time branding)

## Description

Make the boilerplate truly clone-and-configure: a single central config drives brand
name, logo, colors, and feature flags, and changing it re-themes the whole store without
editing components. Build-time approach (one deploy per client), not runtime multi-tenant.

## Dependencies

- Task 00 (build green)
- Task 02 (storefront exists to be themed)

## Reference

> Source: design-system + theming audit of the current repo

- `packages/design-system/tailwind.config.ts` (tokens: `primary`, `brand`, `success`, `error`, `warning`)
- `packages/design-system/src/components/Layout/Logo/Logo.tsx` (hardcoded "React Shop")
- `packages/design-system/src/styles/global.css`
- `apps/web/tailwind.config.ts` (correctly uses DS preset), `apps/storybook/tailwind.config.ts` (duplicates tokens)

## Sub-tasks

### 03.1 — Central branding config
- `apps/web/config/branding.ts`: store name, logo (url/text), colors, contact, social, feature flags.
- Typed object consumed by layout, metadata, and components.

### 03.2 — Configurable Logo + metadata
- Logo reads name/logo/color from config via props (remove hardcoded "React Shop").
- `apps/web/app/layout.tsx` metadata (title, favicon, description) sourced from config.

### 03.3 — Theme via CSS variables
- **Largely delivered by the Tailwind v4 migration (task 00.0):** the `@theme` block in
  `packages/design-system/src/styles/global.css` already defines tokens as CSS variables
  (`--color-primary-600`, etc.). Utilities like `bg-primary-600` resolve through them.
- Remaining work: expose a per-client override layer (e.g. a `:root` block or imported client CSS
  that re-assigns `--color-*`) so swapping a client's palette is a single edit, no component changes.

### 03.4 — Real dark mode
- Enable `darkMode: 'class'`; provide dark values for the CSS variables; add a theme toggle.
- Add `dark:` coverage where components hardcode light colors.

### 03.5 — Consolidate env + de-duplicate Storybook tokens
- `apps/web/.env.example` with all branding/runtime vars (one place).
- Storybook consumes the DS Tailwind preset (stop duplicating tokens) so it reflects client branding.

### 03.6 — `pnpm setup:client` CLI
- `scripts/setup-client.ts`: interactive prompt (name, colors, logo) that writes `config/branding.ts`
  and `.env`. Wire as a root `setup:client` script.

## Acceptance Criteria

- [x] Editing `config/branding.ts` (name + colors + logo) re-themes the storefront with no component edits
- [x] Logo and page metadata are config-driven; no "React Shop" hardcoded in components
- [x] Color tokens resolve through CSS variables in `app/brand.css`; one place to change a client's palette
- [x] Dark mode toggles via ThemeToggle button in header; ThemeProvider persists to localStorage with no flash
- [x] Storybook already uses DS global.css (no duplicated token config); `.env.example` complete
- [x] `pnpm setup:client` (via `scripts/setup-client.ts` + tsx) scaffolds branding.ts, brand.css, .env.local
