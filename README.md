# React Ecommerce Boilerplate

> A production-ready, white-label e-commerce boilerplate built on a **Turborepo monorepo**. Clone it, configure your brand in one file, and deploy. Ships with a full storefront, admin panel, REST API, design system, and Storybook.

<!--
  SCREENSHOTS
  Run `pnpm dev:app`, then replace placeholders with real captures.
  Recommended: `npx playwright screenshot http://localhost:3500 .github/screenshots/home.png`
-->

![](.github/screenshots/home.png)

<p align="center">
  <img src=".github/screenshots/products.png" width="32%" alt="Products" />
  <img src=".github/screenshots/pdp.png" width="32%" alt="Product Detail" />
  <img src=".github/screenshots/admin.png" width="32%" alt="Admin Dashboard" />
</p>

---

## ✦ What's included

| Area | Details |
|---|---|
| **Storefront** | Home page, product listing with search/filter/sort, product detail with image gallery + variants + reviews, guest cart + authenticated cart, 3-step checkout, account area |
| **Admin panel** | Dashboard with live stats, products CRUD + multi-image management, categories, orders with status updates, review moderation queue, user list |
| **REST API** | NestJS — auth (login/register/JWT refresh), products, categories, cart, orders, reviews, users + addresses |
| **Design System** | 30+ Tailwind v4 components in `@react-shop/design-system`, white-label CSS variables, dark mode |
| **SDK** | `@react-shop/sdk` — fully typed Axios client + React Query hooks for every endpoint |
| **White-label** | Edit `config/branding.ts` + `app/brand.css` → entire store re-themes with zero component changes |
| **Dark mode** | Class-based, persisted to `localStorage`, no FOUC |
| **Guest cart** | Add to cart without signing in; sign-in only required at checkout |
| **Storybook** | All DS components documented with live controls |

---

## Tech Stack

**Frontend**
- [Next.js 14](https://nextjs.org/) — App Router, TypeScript, server components
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) — CSS-first config, `@theme` design tokens, CSS variables
- [Syne](https://fonts.google.com/specimen/Syne) · [DM Sans](https://fonts.google.com/specimen/DM+Sans) · [Space Mono](https://fonts.google.com/specimen/Space+Mono)
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/)
- [TanStack Query v5](https://tanstack.com/query)

**Backend**
- [NestJS](https://nestjs.com/) — modular REST API
- [Prisma 7](https://www.prisma.io/) — ORM with full relation support
- [PostgreSQL](https://www.postgresql.org/)
- JWT auth — access token + refresh token flow

**Tooling**
- [Turborepo](https://turbo.build/) — monorepo task orchestration
- [pnpm](https://pnpm.io/) — fast, disk-efficient package manager
- [ESLint 9](https://eslint.org/) — flat config
- [Storybook 8](https://storybook.js.org/)
- [Docker Compose](https://docs.docker.com/compose/) — one-command PostgreSQL

---

## Project Structure

```
react-ecommerce/
├── apps/
│   ├── web/                    # Next.js storefront + admin panel  (port 3500)
│   │   ├── app/
│   │   │   ├── (main)/         # Public routes — /, /products, /cart, /checkout …
│   │   │   ├── (admin)/        # Admin routes — /admin, /admin/products …
│   │   │   ├── (auth)/         # Auth routes — /login, /register
│   │   │   ├── modules/        # Feature modules
│   │   │   │   ├── products/   # Product list, detail, filters, image gallery
│   │   │   │   ├── cart/       # Cart (guest + server)
│   │   │   │   ├── checkout/   # Multi-step checkout flow
│   │   │   │   ├── account/    # Profile + order history
│   │   │   │   ├── admin/      # Admin screens + components
│   │   │   │   ├── layout/     # Header, footer, theme toggle
│   │   │   │   └── static/     # Policy pages
│   │   │   └── providers/      # ThemeProvider, GuestCartProvider
│   │   └── config/
│   │       └── branding.ts     # ← single source of truth for branding
│   ├── server/                 # NestJS REST API  (port 5001)
│   │   └── prisma/
│   │       ├── schema.prisma
│   │       └── seed.ts
│   └── storybook/              # Component docs  (port 6006)
├── packages/
│   ├── design-system/          # @react-shop/design-system
│   ├── sdk/                    # @react-shop/sdk
│   ├── eslint-config-custom/
│   └── tsconfig/
├── scripts/
│   └── setup-client.ts         # Interactive white-label wizard
└── docker-compose.yml
```

---

## Quick Start

### Prerequisites

- **Node.js 18+**
- **pnpm 8+** — `npm i -g pnpm`
- **Docker** — for the PostgreSQL container

### 1 · Install dependencies

```bash
git clone https://github.com/your-username/react-ecommerce.git
cd react-ecommerce
pnpm install
```

### 2 · Start the database

```bash
docker compose up -d
```

### 3 · Configure environment

The defaults work out of the box with Docker Compose:

```bash
cp apps/server/.env.example apps/server/.env
```

```env
# apps/server/.env
PORT=5001
NODE_ENV=development
SECRET=dev-secret-change-in-production
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/react_ecommerce
```

### 4 · Run migrations + seed

```bash
pnpm --filter @react-shop/api prisma:migrate   # apply schema
pnpm --filter @react-shop/api prisma:seed      # create admin + sample data
```

### 5 · Start the app

```bash
pnpm dev:app
```

| Service | URL |
|---|---|
| 🛍 Storefront | http://localhost:3500 |
| ⚙️ Admin panel | http://localhost:3500/admin |
| 🔌 REST API | http://localhost:5001/api |
| 📖 Storybook | http://localhost:6006 |

---

## Default Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@ecommerce.com` | `admin123` |
| **Customer** | `customer@example.com` | `customer123` |

---

## Storefront Pages

| Route | Description |
|---|---|
| `/` | Home — editorial hero, featured products, categories, newsletter |
| `/products` | Listing — search, category pills, sort dropdown |
| `/products/[id]` | Detail — image gallery, variant selector, reviews, add-to-cart |
| `/categories` | Category grid |
| `/new-arrivals` | 12 newest products |
| `/deals` | Products with a compare/sale price |
| `/cart` | Cart — guest (localStorage) or server (authenticated) |
| `/checkout` | Address → review → confirmation |
| `/account` | Profile (requires login) |
| `/account/orders` | Order history (requires login) |
| `/contact` | Contact form |
| `/faq` | Accordion FAQ |
| `/shipping` | Shipping info |
| `/returns` | Returns & refunds policy |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |

## Admin Panel Pages

| Route | Description |
|---|---|
| `/admin` | Dashboard — revenue, orders, products, pending reviews |
| `/admin/products` | Product CRUD — create/edit modal with multi-image management |
| `/admin/categories` | Category CRUD |
| `/admin/orders` | All orders — inline status update |
| `/admin/orders/[id]` | Order detail + cancel |
| `/admin/reviews` | Moderation queue — approve / reject |
| `/admin/users` | User list with role badges |

---

## REST API Reference

Base URL: `http://localhost:5001/api`

<details>
<summary>Auth</summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/auth/login` | — | Login → `{ user, accessToken, refreshToken }` |
| `POST` | `/auth/register` | — | Register → `{ user, accessToken, refreshToken }` |
| `GET` | `/users/me` | ✓ | Current user profile |

</details>

<details>
<summary>Products</summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/products` | — | List all products |
| `GET` | `/products/:id` | — | Product detail |
| `POST` | `/products` | ✓ | Create product (with images) |
| `PUT` | `/products/:id` | ✓ | Update product |
| `DELETE` | `/products/:id` | ✓ | Delete product |

</details>

<details>
<summary>Cart</summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/cart` | ✓ | Get cart |
| `POST` | `/cart/items` | ✓ | Add item |
| `PUT` | `/cart/items/:id` | ✓ | Update quantity |
| `DELETE` | `/cart/items/:id` | ✓ | Remove item |
| `DELETE` | `/cart` | ✓ | Clear cart |

</details>

<details>
<summary>Orders</summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/orders` | ✓ | User's orders |
| `POST` | `/orders` | ✓ | Create order |
| `GET` | `/orders/:id` | ✓ | Order detail |
| `PUT` | `/orders/:id/status` | ✓ | Update status |
| `PUT` | `/orders/:id/cancel` | ✓ | Cancel order |
| `GET` | `/orders/admin/all` | ✓ Admin | All orders |

</details>

<details>
<summary>Reviews</summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/reviews/product/:id` | — | Product reviews |
| `POST` | `/reviews` | ✓ | Submit review |
| `GET` | `/reviews` | ✓ Admin | All reviews |
| `PUT` | `/reviews/:id/moderate` | ✓ Admin | Approve / reject |

</details>

<details>
<summary>Addresses</summary>

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `GET` | `/users/me/addresses` | ✓ | List addresses |
| `POST` | `/users/me/addresses` | ✓ | Add address |

</details>

---

## White-Labelling

### Option A — Interactive wizard

```bash
pnpm setup:client
```

Prompts for store name, primary color, logo, and support email. Writes `config/branding.ts`, `app/brand.css`, and `.env.local`.

### Option B — Manual

**`apps/web/config/branding.ts`**

```ts
export const branding: BrandingConfig = {
  store: {
    name: "Acme Store",
    tagline: "Quality goods, fair prices.",
    logoText: "Acme Store",
    logoAbbrev: "AC",
  },
  contact: { email: "hello@acme.com" },
  social: { instagram: "https://instagram.com/acme" },
  features: { darkMode: true, newsletter: true, reviews: true },
  theme: { primaryColor: "#7c3aed", primaryColorDark: "#a78bfa" },
};
```

**`apps/web/app/brand.css`**

```css
:root {
  --color-primary-600: #7c3aed; /* your brand color */
  /* full primary-50 → primary-900 scale */
}
.dark {
  --color-primary-600: #a78bfa;
}
```

Every `bg-primary-*`, `text-primary-*`, and `border-primary-*` utility resolves through these variables — no component edits needed.

---

## SDK Usage

```tsx
import { SdkProvider, useProducts, useAddToCart } from "@react-shop/sdk";

// Wrap once at the root
<SdkProvider apiConfig={{ baseURL: "http://localhost:5001" }}>
  <App />
</SdkProvider>

// Use anywhere
function ProductCard({ id }: { id: string }) {
  const { data: product } = useProduct(id);
  const { mutate: addToCart } = useAddToCart();

  return (
    <button onClick={() => addToCart({ productId: id, quantity: 1 })}>
      Add to cart — {product?.title}
    </button>
  );
}
```

Available hooks: `useProducts`, `useProduct`, `useCategories`, `useCart`, `useAddToCart`, `useUpdateCartItem`, `useRemoveFromCart`, `useClearCart`, `useOrders`, `useOrder`, `useCreateOrder`, `useCancelOrder`, `useProductReviews`, `useAllReviews`, `useCreateReview`, `useModerateReview`, `useMe`, `useLogin`, `useRegister`, `useLogout`, `useAddresses`, `useCreateAddress`, `useAllUsers`.

---

## Available Scripts

```bash
# Development
pnpm dev:app          # API (5001) + storefront/admin (3500)
pnpm dev              # Everything including Storybook

# Build & lint
pnpm build            # Build all packages
pnpm lint             # Lint all packages

# Database (run from repo root)
pnpm --filter @react-shop/api prisma:migrate   # Apply migrations
pnpm --filter @react-shop/api prisma:seed      # Seed database
pnpm --filter @react-shop/api prisma:studio    # Prisma Studio GUI
pnpm --filter @react-shop/api prisma:reset     # Reset and re-seed

# Docker
docker compose up -d   # Start PostgreSQL
docker compose down    # Stop PostgreSQL

# White-label
pnpm setup:client      # Interactive brand setup wizard
```

---

## Dark Mode

Dark mode is class-based (`.dark` on `<html>`). The header includes a sun/moon toggle that persists to `localStorage`. A blocking inline script applies the class before first paint — no flash of light theme on dark-preference browsers.

To change the default, edit `apps/web/app/providers/ThemeProvider.tsx`.

---

## Environment Variables

### `apps/server/.env`

| Variable | Default | Required |
|---|---|---|
| `PORT` | `5001` | — |
| `NODE_ENV` | `development` | — |
| `SECRET` | — | **Yes** — JWT signing secret |
| `DATABASE_URL` | — | **Yes** — PostgreSQL connection string |

### `apps/web/.env.local` (optional)

| Variable | Default | Description |
|---|---|---|
| `NEXT_PUBLIC_API_URL` | `http://localhost:5001` | API base URL |

---

## Contributing

1. Fork the repo and create a feature branch
2. `pnpm install` + `docker compose up -d`
3. Run `pnpm dev:app` and make your changes
4. `pnpm lint` must pass before submitting a PR
5. Follow conventional commits: `feat:`, `fix:`, `docs:`, `chore:`

---

## License

MIT — free to use, modify, and distribute for personal and commercial projects.

---

<p align="center">
  Built as a white-label e-commerce boilerplate · MIT License
</p>
