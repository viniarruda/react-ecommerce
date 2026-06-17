# Ecommerce Boilerplate - Features & Implementation Guide

## Overview

This is a comprehensive, production-ready ecommerce boilerplate built with modern technologies. It's designed as a monorepo using Turborepo, making it easy to share code between web, mobile (React Native), and admin applications.

## Architecture

### Monorepo Structure

```
/apps
  /web                    → Customer-facing ecommerce (Next.js 14+ App Router)
  /admin                  → Admin dashboard (Next.js 14+ App Router)  
  /server                 → Backend API (NestJS + Prisma + GraphQL)

/packages
  /design-system          → Shared UI components (PandaCSS + Themes)
  /services               → React Query hooks (queries, mutations, types)
  /eslint-config-custom   → Shared ESLint config
  /tsconfig               → Shared TypeScript config
```

### Technology Stack

**Frontend:**
- Next.js 14+ (App Router with RSC)
- PandaCSS (Zero-runtime CSS-in-JS)
- React Query (Data fetching & caching)
- GraphQL (with graphql-request)
- React Hook Form + Zod (Forms & validation)
- TypeScript

**Backend:**
- NestJS (Node.js framework)
- Prisma ORM (Database toolkit)
- PostgreSQL (Database)
- GraphQL (Apollo Server)
- Passport.js (OAuth authentication)
- JWT (Authentication tokens)
- Nodemailer (Email service)
- TypeScript

**DevOps:**
- Turborepo (Monorepo management)
- Docker (Containerization)
- GitHub Actions (CI/CD)
- ESLint + Prettier (Code quality)

## Core Features

### 1. Design System (`packages/design-system`)

A comprehensive, themeable design system built with PandaCSS.

**Features:**
- Token-based design (colors, typography, spacing, shadows, borders)
- Multi-theme support (light/dark mode)
- Semantic tokens for context-specific styling
- Responsive design utilities
- Zero-runtime CSS generation

**Components:**
- **Layout:** Container, Grid, Stack, Flex, Box
- **Typography:** Heading, Text
- **Display:** Button, Badge, Card
- **Forms:** Input (more components can be added)
- **Ecommerce:** ProductCard, PriceDisplay, Rating

**Usage:**
```typescript
import { Button, ProductCard, PriceDisplay } from '@react-shop/design-system';

<Button variant="solid" size="md">Add to Cart</Button>
<PriceDisplay price={99.99} originalPrice={129.99} />
```

### 2. Services Package (`packages/services`)

Type-safe GraphQL client with React Query hooks.

**Features:**
- Automatic TypeScript type generation from GraphQL schema
- React Query integration for caching & optimistic updates
- Centralized API client configuration
- Error handling utilities

**Available Hooks:**
- `useAuth`: login, register, logout, resetPassword
- `useProducts`: getProducts, getProduct, searchProducts
- `useCategories`: getCategories, getCategoryTree
- `useCart`: getCart, addToCart, updateCartItem, removeFromCart
- `useOrders`: getOrders, getOrder, createOrder, cancelOrder
- `useReviews`: getReviews, createReview, updateReview
- `useWishlist`: getWishlist, addToWishlist, removeFromWishlist
- `useUser`: getProfile, updateProfile, getAddresses

**Usage:**
```typescript
import { useProducts, useAddToCart } from '@react-shop/services';

const { data: products, isLoading } = useProducts({ take: 10 });
const { mutate: addToCart } = useAddToCart();
```

### 3. Backend Server (`apps/server`)

NestJS GraphQL API with Prisma ORM.

**Database Models:**
- User (with OAuth support)
- Address
- Product
- ProductVariant
- Category (hierarchical)
- Attribute
- Cart & CartItem
- Order & OrderItem
- Review
- Wishlist
- StoreSetting

**GraphQL API Features:**
- Full CRUD operations for all models
- Authentication & authorization (JWT + OAuth)
- Role-based access control (Customer, Admin, Super Admin)
- Product search & filtering
- Cart management with database persistence
- Order management & tracking
- Review system with moderation
- Wishlist functionality

**Authentication:**
- Email/password registration & login
- OAuth (Google, GitHub)
- Password reset via email
- JWT access & refresh tokens
- Role-based guards

### 4. Web App (`apps/web`)

Customer-facing ecommerce application (to be implemented).

**Planned Pages:**
- Homepage with featured products
- Product listing with filters
- Product detail with variants & reviews
- Shopping cart
- Multi-step checkout
- User dashboard (orders, addresses, wishlist, reviews)
- Authentication pages

**Features:**
- Server-side rendering for SEO
- Optimistic UI updates
- Real-time cart synchronization
- Product image galleries
- Variant selection (size, color, etc.)
- Product reviews & ratings
- Wishlist functionality
- Mobile-responsive design

### 5. Admin App (`apps/admin`)

Admin dashboard for managing the store (to be implemented).

**Planned Features:**
- Dashboard with analytics
- Product management (CRUD, variants, inventory)
- Category management (tree structure)
- Order management (status updates, tracking)
- User management (roles, activity)
- Review moderation
- Store settings
- Bulk operations
- CSV import/export

## Getting Started

### Prerequisites

- Node.js 18+ and pnpm 8+
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd react-ecommerce
```

2. Install dependencies:
```bash
pnpm install
```

3. Set up environment variables:
```bash
cd apps/server
cp .env.example .env
# Edit .env with your configuration
```

4. Set up the database:
```bash
# Create PostgreSQL database
createdb ecommerce

# Run Prisma migrations
cd apps/server
pnpm prisma migrate dev
```

5. Generate Prisma Client:
```bash
cd apps/server
pnpm prisma generate
```

6. Generate GraphQL types:
```bash
cd packages/services
pnpm codegen
```

7. Generate PandaCSS:
```bash
cd packages/design-system
pnpm prepare
```

### Development

Start all apps in development mode:
```bash
pnpm dev
```

This will start:
- Backend API: http://localhost:3001
- Web app: http://localhost:3000 (when implemented)
- Admin app: http://localhost:3002 (when implemented)

### Building for Production

Build all apps:
```bash
pnpm build
```

## Database Schema

### Key Relationships

- **User** → has many Orders, Reviews, Addresses, one Cart, one Wishlist
- **Product** → belongs to Category, has many Variants, Reviews, CartItems, OrderItems
- **Cart** → belongs to User, has many CartItems
- **Order** → belongs to User, has many OrderItems, references Addresses
- **Review** → belongs to User and Product

### Enums

- **UserRole:** CUSTOMER, ADMIN, SUPER_ADMIN
- **ProductStatus:** DRAFT, ACTIVE, ARCHIVED
- **OrderStatus:** PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED, REFUNDED
- **ReviewStatus:** PENDING, APPROVED, REJECTED
- **AttributeType:** COLOR, SIZE, MATERIAL, CUSTOM

## API Documentation

### GraphQL Playground

When the server is running, access the GraphQL Playground at:
```
http://localhost:3001/graphql
```

### Example Queries

**Get Products:**
```graphql
query {
  products(take: 10, where: { status: ACTIVE }) {
    id
    name
    slug
    price
    images
    averageRating
    reviewCount
  }
}
```

**Get Cart:**
```graphql
query {
  cart {
    id
    items {
      id
      product {
        name
        price
      }
      quantity
    }
    total
  }
}
```

**Create Order:**
```graphql
mutation {
  createOrder(input: {
    shippingAddressId: "address-id"
    billingAddressId: "address-id"
    paymentMethod: "credit_card"
  }) {
    id
    status
    total
  }
}
```

## Customization Guide

### Adding a New Component to Design System

1. Create component file:
```typescript
// packages/design-system/src/components/NewComponent/NewComponent.tsx
import * as React from 'react';
import { styled } from '../../../styled-system/jsx';

export const NewComponent = styled('div', {
  base: {
    // Your styles
  },
});
```

2. Export from index:
```typescript
// packages/design-system/src/components/index.ts
export * from './NewComponent';
```

### Adding a New GraphQL Query

1. Add query to services package:
```graphql
# packages/services/src/graphql/custom.graphql
query GetCustomData {
  customData {
    id
    name
  }
}
```

2. Run codegen:
```bash
cd packages/services
pnpm codegen
```

3. Use the generated hook:
```typescript
import { useGetCustomDataQuery } from '@react-shop/services';

const { data } = useGetCustomDataQuery();
```

### Extending the Database Schema

1. Update Prisma schema:
```prisma
// apps/server/prisma/schema.prisma
model NewModel {
  id   String @id @default(uuid())
  name String
  // ... fields
}
```

2. Create and run migration:
```bash
cd apps/server
pnpm prisma migrate dev --name add_new_model
```

3. Update GraphQL schema and resolvers accordingly.

## Testing

### Running Tests

```bash
# Run all tests
pnpm test

# Run tests in watch mode
pnpm test:watch

# Run tests with coverage
pnpm test:cov
```

## Deployment

### Docker Deployment

1. Build Docker images:
```bash
docker-compose build
```

2. Start services:
```bash
docker-compose up -d
```

### Environment Variables

Required environment variables for production:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret for JWT tokens
- `JWT_REFRESH_SECRET`: Secret for refresh tokens
- `GOOGLE_CLIENT_ID` & `GOOGLE_CLIENT_SECRET`: OAuth credentials
- `GITHUB_CLIENT_ID` & `GITHUB_CLIENT_SECRET`: OAuth credentials
- `SMTP_*`: Email service configuration

## React Native Support

The architecture is designed for easy React Native integration:

1. Create a new app:
```bash
mkdir apps/mobile
cd apps/mobile
npx react-native init Mobile
```

2. Install shared packages:
```bash
pnpm add @react-shop/services
```

3. Use the same GraphQL hooks:
```typescript
import { useProducts, useAddToCart } from '@react-shop/services';
// Works the same as in web!
```

4. Adapt design system components to React Native equivalents.

## Contributing

1. Create a feature branch
2. Make your changes
3. Run linting and tests
4. Submit a pull request

## License

MIT

## Support

For issues and questions, please open an issue on GitHub.

