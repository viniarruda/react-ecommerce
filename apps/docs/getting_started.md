# Getting Started

This guide will help you set up and run the React Ecommerce Boilerplate on your local machine.

## Prerequisites

- **Node.js 18+** — [Download](https://nodejs.org/)
- **pnpm 8+** — `npm install -g pnpm`
- **PostgreSQL 14+** — [Download](https://www.postgresql.org/download/) or Docker
- **Git** — [Download](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository

```bash
git clone <repository-url>
cd react-ecommerce
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Set Up Environment Variables

```bash
cd apps/server
cp .env.example .env
```

Edit `.env`:

```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ecommerce?schema=public"
JWT_SECRET="your-super-secret-jwt-key"
JWT_REFRESH_SECRET="your-refresh-secret"
PORT=5001
NODE_ENV="development"
FRONTEND_URL="http://localhost:3000"
```

Create `apps/web/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### 4. Start the Database

```bash
cd apps/server
docker-compose up -d
```

Or start your local PostgreSQL instance manually.

### 5. Migrate and Seed Database

```bash
cd apps/server
pnpm prisma migrate dev
pnpm prisma db seed
```

### 6. Start Development

```bash
# From repo root
pnpm dev
```

This starts:
- **Web storefront**: http://localhost:3000
- **REST API**: http://localhost:5001

## Verify Installation

### Check the API

```bash
curl http://localhost:5001/api/products
```

### Check the Database

```bash
cd apps/server
npx prisma studio
```

Opens Prisma Studio at http://localhost:5555.

## Common Issues

### Port already in use

Change the server port in `apps/server/.env`:

```env
PORT=5002
```

Update `apps/web/.env.local` to match:

```env
NEXT_PUBLIC_API_URL=http://localhost:5002
```

### Database connection failed

Ensure PostgreSQL is running:

```bash
# Docker
docker ps
docker-compose up -d

# macOS (Homebrew)
brew services start postgresql

# Linux
sudo systemctl start postgresql
```

### Prisma generate fails

```bash
cd apps/server
rm -rf node_modules/.prisma
pnpm prisma generate
```

## Next Steps

- [Architecture Overview](../APPS_ARCHITECTURE.md)
- [Backend Overview](./backend.md)
- [Design System](./design_system.md)
- [SDK / Services](./services_package.md)
