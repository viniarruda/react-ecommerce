# Web App — Customer Ecommerce

Customer-facing ecommerce application built with Next.js 15+, React 19, and Tailwind v4.

## Tech Stack

- **Next.js 15+** — App Router, Server Components, Streaming
- **React 19** — Latest React features
- **TypeScript 5+** — Type safety
- **Tailwind v4** — CSS-first styling (via Design System)
- **React Query** — Server state management (via SDK)
- **React Hook Form + Zod** — Form handling and validation

## Getting Started

### Prerequisites

- Node.js 18+
- pnpm 8+
- Backend server running on `http://localhost:5001`

### Setup

1. **Install dependencies** (from repo root)

```bash
pnpm install
```

2. **Create environment file**

Create `.env.local` in `apps/web/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

3. **Start development server**

```bash
pnpm dev
```

The app will be available at `http://localhost:3000`

## Project Structure

```
apps/web/
├── app/
│   ├── layout.tsx           # Root layout with providers
│   ├── page.tsx             # Home page
│   └── modules/
│       ├── auth/            # Login, register, forgot password
│       └── layout/          # Header, footer wrappers
├── next.config.js
├── tsconfig.json
└── package.json
```

## Using Design System

Import components from `@react-shop/design-system`:

```typescript
import { Button, Card, cn } from '@react-shop/design-system';

export default function MyComponent() {
  return (
    <Card className={cn('p-4')}>
      <Button>Click me</Button>
    </Card>
  );
}
```

## Using SDK

Import hooks from `@react-shop/sdk`:

```typescript
'use client';

import { useProducts } from '@react-shop/sdk';

export default function ProductList() {
  const { data: products, isLoading } = useProducts();
  // ...
}
```

## Available Scripts

```bash
pnpm dev        # Start development server
pnpm build      # Build for production
pnpm start      # Start production server
pnpm lint       # Run ESLint
pnpm typecheck  # Run TypeScript check
```

## Environment Variables

All environment variables exposed to the browser must be prefixed with `NEXT_PUBLIC_`.

See `ENV_SETUP.md` for the full list.
