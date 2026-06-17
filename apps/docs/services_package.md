# SDK Package (`@react-shop/sdk`)

React Query hooks and Axios client for interacting with the REST API.

## Overview

The SDK package lives in `packages/sdk/` and provides:
- `SdkProvider` — wraps `QueryClientProvider` + `ApiProvider`
- Domain-scoped hooks — organized by feature (auth, products, cart, orders, etc.)
- Automatic token management — access token injected into every request; refresh handled transparently

## Setup

Wrap your app in `SdkProvider`:

```typescript
// apps/web/app/layout.tsx
import { SdkProvider } from '@react-shop/sdk';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <SdkProvider apiUrl={process.env.NEXT_PUBLIC_API_URL}>
          {children}
        </SdkProvider>
      </body>
    </html>
  );
}
```

## Using Hooks

### Query hooks (read data)

```typescript
'use client';
import { useProducts, useProduct, useCategories } from '@react-shop/sdk';

// List products
const { data, isLoading, error } = useProducts({ page: 1, limit: 20 });

// Single product
const { data: product } = useProduct(slug);

// Categories
const { data: categories } = useCategories();
```

### Mutation hooks (write data)

```typescript
'use client';
import { useLogin, useAddToCart, useCreateOrder } from '@react-shop/sdk';

const login = useLogin();
await login.mutateAsync({ email, password });

const addToCart = useAddToCart();
await addToCart.mutateAsync({ productId, quantity });
```

### Auth hooks

```typescript
import { useMe, useLogin, useRegister, useLogout } from '@react-shop/sdk';

const { data: user } = useMe();   // current user (null if unauthenticated)
const login = useLogin();
const register = useRegister();
const logout = useLogout();
```

## File Structure

```
packages/sdk/src/
├── providers/
│   ├── ApiProvider.tsx      → Axios instance + token management
│   ├── QueryProvider.tsx    → React Query client
│   └── SdkProvider.tsx      → Composes both providers
├── services/
│   ├── auth/
│   │   ├── mutations/       → useLogin, useRegister, useLogout
│   │   └── queries/         → useMe
│   ├── products/
│   │   └── queries/         → useProducts, useProduct
│   ├── categories/
│   ├── cart/
│   ├── orders/
│   └── reviews/
├── entities/                → TypeScript types (User, Product, Order, …)
└── index.ts                 → Public barrel export
```

## Adding a New Service

1. Create `packages/sdk/src/services/<domain>/`
2. Add `queries/index.ts` with `useQuery` hooks
3. Add `mutations/index.ts` with `useMutation` hooks
4. Export from `packages/sdk/src/services/index.ts`

```typescript
// packages/sdk/src/services/wishlist/queries/index.ts
import { useQuery } from '@tanstack/react-query';
import { useApiClient } from '@providers/ApiProvider';

export const useWishlist = () => {
  const api = useApiClient();
  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => api.get('/wishlist').then(r => r.data),
  });
};
```
