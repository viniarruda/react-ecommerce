# React Ecommerce Boilerplate

White-label ecommerce boilerplate built as a Turborepo monorepo. Clone, configure branding, and deploy per client.

**Stack:** Next.js 15 · React 19 · Tailwind v4 · NestJS · Prisma 7 · PostgreSQL · `@react-shop/sdk` (Axios + React Query)

## Quick Start

### Prerequisites

- Node.js 18+
- pnpm 8+
- PostgreSQL 14+

### Installation

```bash
git clone <repository-url>
cd react-ecommerce
pnpm install

# Server setup
cd apps/server
cp .env.example .env
# Edit .env — set DATABASE_URL, JWT_SECRET, PORT=5001

pnpm prisma migrate dev
pnpm prisma db seed

# Start everything
cd ../..
pnpm dev
```

- Web storefront: http://localhost:3000
- REST API: http://localhost:5001
- Storybook: http://localhost:6006

## Project Structure

```
apps/
  web/           → Customer-facing Next.js storefront
  admin/         → Admin dashboard (deferred)
  server/        → NestJS REST API
  storybook/     → Component development

packages/
  design-system/ → Tailwind v4 component library (@react-shop/design-system)
  sdk/           → API client + React Query hooks (@react-shop/sdk)
  eslint-config-custom/ → Shared ESLint flat config (v9)
  tsconfig/      → Shared TypeScript config
```

## Tech Stack

**Frontend:** Next.js 15 (App Router) · Tailwind v4 · React 19 · React Query · TypeScript

**Backend:** NestJS · Prisma 7 · PostgreSQL · JWT

## Available Scripts

```bash
pnpm dev              # Start all apps
pnpm build            # Build all apps
pnpm lint             # Lint all packages

# Database (run from apps/server)
pnpm prisma migrate dev
pnpm prisma studio
pnpm prisma db seed
```

## Documentation

- [Architecture](./apps/APPS_ARCHITECTURE.md)
- [Developer Guides](./apps/docs/README.md)
- [SDK](./packages/sdk/README.md)
- [Design System](./packages/design-system/README.md)

## License

MIT
