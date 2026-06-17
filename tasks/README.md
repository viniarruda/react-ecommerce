# Implementation Plan — react-ecommerce boilerplate

Goal: turn this repo into a **clone-and-configure white-label ecommerce boilerplate**
(build-time branding: one `config/branding.ts` + Tailwind tokens per client, one deploy per client).

Approved scope: **Foundation + Storefront + White-label** (phases 0→3).
Deferred: full backend (payments/shipment/discount/OAuth/reset), admin app, CI/DevX.

> **Stack reality (docs are wrong, code is source of truth):** Tailwind (+ tailwind-variants),
> REST via `@react-shop/sdk` (axios + react-query), NestJS + Prisma 7. The `@apollo/*` /
> `@nestjs/graphql` deps and `*.resolver.ts` files are dead code. The repo docs claiming
> PandaCSS / GraphQL / `@react-shop/services` are stale.

## Tasks

| # | Phase | File | Depends on | Outcome |
|---|-------|------|------------|---------|
| 00 | Foundation | [00-foundation.md](./00-foundation.md) | — | Clean clone builds: `pnpm install && pnpm build && pnpm lint` green |
| 01 | Docs single source of truth | [01-docs-source-of-truth.md](./01-docs-source-of-truth.md) | 00 | No stale PandaCSS/GraphQL docs; one backend port |
| 02 | Web storefront | [02-storefront.md](./02-storefront.md) | 00 | browse → product → cart → checkout → order works end-to-end |
| 03 | White-label (build-time) | [03-white-label.md](./03-white-label.md) | 00, 02 | Editing `config/branding.ts` re-themes the whole store |

Run phases as separate PRs, in order. Phase 00 is a hard prerequisite (the design system does not compile today).
