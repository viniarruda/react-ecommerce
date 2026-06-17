# Refactoring Summary

## 1. Design System - Atomic Design Structure

### Changes

The Design System components have been reorganized following **Atomic Design** principles:

```
src/components/
├── Atoms/           # Basic building blocks
│   ├── Avatar/
│   ├── Badge/
│   ├── Box/
│   ├── Button/
│   ├── Card/
│   ├── Container/
│   ├── Divider/
│   ├── Flex/
│   ├── Grid/
│   ├── Heading/
│   ├── Icon/
│   ├── Input/
│   ├── Skeleton/
│   ├── Stack/
│   └── Text/
├── Molecules/       # Simple component combinations
│   ├── PriceDisplay/
│   ├── Rating/
│   ├── Select/
│   └── Toast/
└── Organisms/       # Complex UI components
    ├── Modal/
    └── ProductCard/
```

### Atomic Design Principles

- **Atoms**: Smallest building blocks (Button, Input, Icon, etc.)
- **Molecules**: Simple combinations of atoms (Select, PriceDisplay, etc.)
- **Organisms**: Complex components combining molecules/atoms (Modal, ProductCard)

### Token Extraction

Design tokens have been extracted into separate files for better maintainability:

```
src/theme/tokens/
├── colors.ts       # All color definitions
├── spacing.ts      # All spacing values
└── index.ts        # Token exports
```

**panda.config.ts** now imports these tokens:

```typescript
import { colors, spacing } from './src/theme/tokens';

export default defineConfig({
  theme: {
    extend: {
      tokens: {
        colors,
        spacing,
        // ... other tokens
      }
    }
  }
});
```

### Benefits

- ✅ Clear component hierarchy
- ✅ Better code organization
- ✅ Easier to find and maintain components
- ✅ Scalable structure for future components
- ✅ Centralized token management

---

## 2. SDK - Granular Hook Structure

### Changes

SDK hooks have been reorganized with a **granular structure** where each hook has its own folder with dedicated files:

```
services/
├── queries/
│   └── auth/
│       ├── useMe/
│       │   ├── index.ts      # Hook implementation
│       │   ├── key.ts        # React Query key
│       │   ├── request.ts    # API request logic
│       │   └── types.ts      # TypeScript types
│       └── index.ts
└── mutations/
    └── auth/
        ├── useLogin/
        │   ├── index.ts
        │   ├── key.ts
        │   ├── request.ts
        │   └── types.ts
        ├── useRegister/
        │   ├── index.ts
        │   ├── key.ts
        │   ├── request.ts
        │   └── types.ts
        ├── useLogout/
        │   ├── index.ts
        │   ├── key.ts
        │   ├── request.ts
        │   └── types.ts
        └── index.ts
```

### File Structure

Each hook folder contains:

1. **`index.ts`** - Hook implementation with React Query logic
2. **`key.ts`** - Query/mutation key definition
3. **`request.ts`** - Pure API request function (Axios)
4. **`types.ts`** - Input/output TypeScript types

### Example: useLogin

**types.ts**
```typescript
import type { AuthResponse, LoginInput } from '../../../../entities';

export type UseLoginInput = LoginInput;
export type UseLoginResponse = AuthResponse;
```

**key.ts**
```typescript
export const useLoginKey = () => ['auth', 'login'] as const;
```

**request.ts**
```typescript
export const loginRequest = async (
  client: AxiosInstance,
  input: UseLoginInput
): Promise<UseLoginResponse> => {
  const response = await client.post('/api/auth/login', input);
  return response.data;
};
```

**index.ts**
```typescript
export function useLogin() {
  const { client } = useApiClient();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: UseLoginInput) => loginRequest(client, input),
    onSuccess: (data) => {
      setToken(data.accessToken);
      queryClient.invalidateQueries({ queryKey: ['auth'] });
      queryClient.setQueryData(useMeKey(), data.user);
    },
  });
}
```

### Benefits

- ✅ **Separation of Concerns**: Logic, types, and keys are isolated
- ✅ **Easier Testing**: Can test request logic independently
- ✅ **Better Reusability**: Request functions can be used outside hooks
- ✅ **Clearer Dependencies**: Import only what you need
- ✅ **Type Safety**: Explicit types for inputs and outputs
- ✅ **Maintainability**: Changes are localized to specific files

---

## Migration Guide

### For Design System Users

**Before:**
```typescript
import { Button } from '@react-shop/design-system';
```

**After:**
```typescript
// No change needed! Exports are preserved
import { Button } from '@react-shop/design-system';
```

The public API remains the same. Only internal structure changed.

### For SDK Users

**Before:**
```typescript
import { useLogin } from '@react-shop/sdk';
```

**After:**
```typescript
// No change needed! Exports are preserved
import { useLogin } from '@react-shop/sdk';
```

The public API remains the same. Only internal structure changed.

---

## Next Steps

### Design System
- [ ] Apply Atomic Design structure to remaining components
- [ ] Extract more tokens (fonts, radii, shadows, etc.)
- [ ] Add component composition examples

### SDK
- [ ] Apply granular structure to remaining hooks:
  - Products (useProducts, useProduct)
  - Categories (useCategories, useCategory)
  - Cart (useCart, useAddToCart, etc.)
  - Orders (useOrders, useOrder, useCreateOrder, etc.)
  - Reviews (useProductReviews, useCreateReview, etc.)
- [ ] Add request retry logic
- [ ] Add request caching strategies

---

## Commits

1. **Design System Refactoring**
   - Commit: `c2444f0`
   - Message: `refactor: reorganize Design System with Atomic Design and extract tokens`

2. **SDK Auth Hooks Refactoring**
   - Commit: `a57c733`
   - Message: `refactor: reorganize SDK auth hooks with granular structure`

