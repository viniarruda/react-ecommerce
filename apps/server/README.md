# Backend API Server

NestJS REST API for the React Ecommerce boilerplate.

## Overview

- **NestJS** — Progressive Node.js framework
- **Prisma 7** — ORM for database management
- **PostgreSQL** — Relational database
- **JWT** — Authentication with Passport.js
- **Docker** — Containerized database setup

## Architecture

```
src/
├── auth/           → Authentication (JWT, Passport)
├── user/           → User management
├── product/        → Product catalog
├── category/       → Product categories
├── attribute/      → Product attributes
├── cart/           → Shopping cart
├── order/          → Order management
├── review/         → Product reviews
├── store/          → Store management
├── prisma/         → Prisma service
└── shared/         → Shared utilities and pipes
```

## Getting Started

### 1. Environment Setup

Create a `.env` file in `apps/server/`:

```env
# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public"

# JWT
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_EXPIRES_IN=7d
JWT_REFRESH_SECRET=your-refresh-secret
JWT_REFRESH_EXPIRES_IN=30d

# Email (Optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password

# Application
PORT=5001
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

### 2. Start PostgreSQL

```bash
cd apps/server
docker-compose up -d
```

Starts PostgreSQL on port 5432 and pgAdmin at http://localhost:5050 (admin@admin.com / root).

### 3. Install Dependencies

```bash
pnpm install
```

### 4. Migrate and Seed Database

```bash
cd apps/server
pnpm prisma migrate dev
pnpm prisma db seed
```

Seed credentials:
- Admin: `admin@ecommerce.com` / `admin123`
- Customer: `customer@example.com` / `customer123`

### 5. Run the Application

```bash
# From repo root
pnpm dev

# Or from server directory
cd apps/server && pnpm dev
```

API available at http://localhost:5001

## REST API Endpoints

```
POST   /api/auth/login          → Login
POST   /api/auth/register       → Register
POST   /api/auth/refresh        → Refresh token
POST   /api/auth/logout         → Logout

GET    /api/products            → List products
GET    /api/products/:id        → Get product
POST   /api/products            → Create product (admin)
PUT    /api/products/:id        → Update product (admin)
DELETE /api/products/:id        → Delete product (admin)

GET    /api/categories          → List categories
GET    /api/cart                → Get cart
POST   /api/cart                → Add to cart
PUT    /api/cart/:id            → Update cart item
DELETE /api/cart/:id            → Remove cart item

GET    /api/orders              → List orders
POST   /api/orders              → Create order
GET    /api/orders/:id          → Get order

GET    /api/users/me            → Current user profile
```

## Authentication

Protected routes require a Bearer token:

```
Authorization: Bearer <your-jwt-token>
```

## Available Scripts

```bash
pnpm dev              # Start in watch mode
pnpm build            # Build for production
pnpm start:prod       # Start production build
pnpm lint             # Run ESLint

pnpm prisma:studio    # Open Prisma Studio
pnpm prisma:migrate   # Run migrations
pnpm prisma:generate  # Generate Prisma client
pnpm prisma:seed      # Seed database
pnpm prisma:reset     # Reset database (deletes all data)
```

## Database

Schema: `apps/server/prisma/schema.prisma`

```bash
# Open Prisma Studio (GUI) at http://localhost:5555
cd apps/server
npx prisma studio

# Reset and re-seed
pnpm prisma migrate reset
```

## Known Issues

See [KNOWN_ISSUES.md](./KNOWN_ISSUES.md) for active blockers (Jest/pnpm incompatibility).
