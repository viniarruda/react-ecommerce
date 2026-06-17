# Task 00: Stabilize the foundation (unblock the build)

## Description

The monorepo does not build cleanly from a fresh clone. Fix the blockers so
`pnpm install && pnpm build && pnpm lint` passes across all 6 workspaces. This is a
hard prerequisite for every other phase.

## Dependencies

- None

## Reference

> Source: investigation of the current repo

- `packages/design-system/src/index.tsx` (re-exports `cn` from `./lib/utils` — file missing)
- `apps/server/package.json` (Prisma version conflict)
- `.npmrc`, `turbo.json`, `pnpm-workspace.yaml`

## Sub-tasks

### 00.0 — Migrate Tailwind v3 → v4 (CSS-first)
- The code already uses Tailwind v3 (NOT PandaCSS — that was only ever in stale docs). Upgrade to v4.
- Bump `tailwindcss` → `^4`, add `@tailwindcss/postcss`, drop `autoprefixer` (web, design-system, storybook).
- Rewrite the 3 `postcss.config.js` to use `@tailwindcss/postcss`.
- Convert `packages/design-system/src/styles/global.css` to v4: `@import 'tailwindcss'`, `@source '../'`
  (so DS components are scanned from the consuming apps), and move all tokens into a `@theme` block as
  CSS variables. Delete the 3 `tailwind.config.ts` files.
- Bump `tailwind-merge` → `^3` and `tailwind-variants` → `^1` (v4-compatible).
- Why first: v4's `@theme` exposes tokens as CSS variables — exactly what Phase 03 white-label needs,
  and it removes the Storybook token duplication for free.

### 00.1 — Create the missing `cn` util (CRITICAL build blocker)
- `cn` is imported by 20+ components from `@lib/utils` and re-exported by `index.tsx`,
  but `packages/design-system/src/lib/utils.ts` **does not exist**.
- Create it: `export const cn = (...inputs) => twMerge(clsx(inputs))` using `clsx` + `tailwind-merge` (already deps).
- File: `packages/design-system/src/lib/utils.ts`

### 00.2 — Resolve the Prisma version conflict
- `apps/server/package.json` lists `prisma@^7.0.1` (deps) **and** `prisma@^5.7.0` (devDeps).
- Remove the `^5.7.0` devDep entry; keep Prisma 7 only. Re-run `prisma generate` to confirm.

### 00.3 — Align React versions across the workspace
- `apps/web` uses React 19; `packages/design-system`, `packages/sdk`, `apps/storybook` pin/peer React 18.
- Widen peerDeps to `^18.2 || ^19` in `design-system` and `sdk`; bump `storybook` + DS dev React to 19
  so Storybook renders what `apps/web` ships.

### 00.4 — Migrate ESLint to flat config (ESLint 9)
- ESLint 9 is declared but only legacy `.eslintrc.js` files exist (not loaded by default in v9).
- Add `eslint.config.js` (flat) at root and/or per workspace, porting `eslint-config-custom`.
- Also fix `eslint-config-next` skew (`^15` in custom config vs `^14.2` in web).
- Alternative if time-boxed: pin ESLint to `^8` everywhere. Pick one and be consistent.

### 00.5 — Commit fully to REST; remove dead GraphQL — DEFERRED
- GraphQL is never wired into `apps/server/src/app.module.ts`, so it is dead code — but NOT a build blocker
  (it compiles fine with the deps installed).
- Removing it is more invasive than first assumed: `@nestjs/graphql` decorators (`@ObjectType`, `@Field`,
  `@InputType`) are spread across ~20 files including `auth.guard.ts`, `user.decorator.ts`, and the DTOs/entities
  that the REST controllers actually depend on (e.g. `product.controller.ts` → `JwtAuthGuard`, `CreateProductDto`).
  Stripping it requires migrating those DTOs to plain `class-validator` and re-verifying every REST endpoint.
- **Deferred to a dedicated task** to avoid destabilizing the working REST build during the foundation pass.
  Keep the Apollo/GraphQL deps for now.

### 00.6 — Green the tree
- `pnpm install` from a clean state, then `pnpm build`, `pnpm lint`, and per-app typecheck.
- Fix any fallout from the above.

## Acceptance Criteria

- [x] `packages/design-system/src/lib/utils.ts` exists and exports `cn`; DS typechecks
- [x] No duplicate/conflicting Prisma version in `apps/server/package.json` (+ `prisma generate` wired)
- [x] React peer ranges accept `^18 || ^19` (web on 19, Storybook stays on 18 — both satisfied)
- [x] ESLint 9 flat config resolves; `pnpm lint` runs green (4/4, warnings only)
- [x] Tailwind v4 builds on Next + Vite: `@theme` CSS-variable tokens, DS scanned via `@source`, no `tailwind.config.ts`
- [ ] (Deferred) GraphQL removal tracked as its own task; deps remain for now
- [x] `pnpm build` green (3/3) and `pnpm lint` green (4/4)
