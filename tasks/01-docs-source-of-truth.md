# Task 01: Documentation — single source of truth

## Description

~46 markdown files exist; ~13 are transient PR/status artifacts, several mutually
contradictory, and the durable docs describe a stack that no longer exists
(PandaCSS / GraphQL / `@react-shop/services`). Clean and reconcile so the docs match
the real stack (Tailwind / REST / `@react-shop/sdk`).

## Dependencies

- Task 00 (so the described commands actually work)

## Reference

> Source: doc audit of the current repo

- `.cursorrules` (most damaging — instructs AI tooling with the wrong stack)
- `README.md`, `apps/docs/*`, `apps/server/README.md`, `apps/web/README.md`

## Sub-tasks

### 01.1 — Delete transient PR/status artifacts
Remove (no durable value, actively misleading):
- Root: `PR_DESCRIPTION.md`, `PR_DESCRIPTION_SHORT.md`, `IMPLEMENTATION_STATUS.md`,
  `IMPLEMENTATION_SUMMARY.md`, `REFACTORING_SUMMARY.md`
- `apps/server/`: `AUTH_FIX.md`, `BACKEND_COMPLETION_STATUS.md`, `COMPILATION_ERRORS.md`,
  `NEXT_STEPS.md`, `REST_MIGRATION_SUCCESS.md`, `TYPEORM_TO_PRISMA_MIGRATION.md`
- `apps/server/postman/AUTO_GENERATION_GUIDE.md` (GraphQL-only, obsolete)
- Keep `apps/server/KNOWN_ISSUES.md` only if the Jest-under-pnpm issue is still live.

### 01.2 — Rewrite `.cursorrules` to the real stack
- Replace PandaCSS → Tailwind, GraphQL/Apollo/resolvers → REST controllers, `@react-shop/services` → `@react-shop/sdk`.
- Fix the yarn vs pnpm mix and the "50 char" commit subject claim (commitlint enforces 72).

### 01.3 — Rewrite the canonical docs
- `README.md` (root), `QUICK_START.md`, `CONTRIBUTING.md`: Tailwind + REST + sdk; correct structure.
- `apps/web/README.md`: PandaCSS → Tailwind; fix broken `FEATURES_WEB.md` link.
- `apps/server/README.md`: GraphQL → REST.
- `apps/docs/*`: GraphQL → REST, PandaCSS → Tailwind, `@react-shop/services` → `@react-shop/sdk`.
- Promote `apps/APPS_ARCHITECTURE.md` (already closest to correct) as the canonical architecture doc.

### 01.4 — Unify the backend port
- Docs reference 4 different ports (3000 / 3001 / 5000 / 5001). Pick one (match
  `apps/web` `NEXT_PUBLIC_API_URL` and `apps/server` actual port) and fix every reference.

### 01.5 — Reconcile schema docs
- Resolve the 13-vs-20 model conflict against the real `apps/server/prisma/schema.prisma`.

## Acceptance Criteria

- [x] No remaining references to PandaCSS, GraphQL/Apollo, or `@react-shop/services` in docs
- [x] `.cursorrules` reflects Tailwind v4 + REST + Prisma 7 + `@react-shop/sdk`
- [x] One backend port (5001) used consistently across all docs and `.env` examples
- [x] Transient PR/status `.md` files removed (15 files deleted)
- [x] README quick-start commands reflect real stack (pnpm, prisma migrate, no codegen)
