# Absolute Paths Configuration Guide

## Overview

The project is configured to use **absolute paths** instead of relative paths, making imports cleaner and easier to maintain.

## Benefits

```typescript
// ❌ Before (Relative Paths)
import { cn } from "../../../lib/utils";
import { useApiClient } from "../../../../providers/ApiProvider";

// ✅ After (Absolute Paths)
import { cn } from "@lib/utils";
import { useApiClient } from "@providers/ApiProvider";
```

---

## Configuration

### 1. Design System (`packages/design-system`)

**`tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@lib/*": ["./src/lib/*"],
      "@components/*": ["./src/components/*"],
      "@atoms/*": ["./src/components/Atoms/*"],
      "@molecules/*": ["./src/components/Molecules/*"],
      "@organisms/*": ["./src/components/Organisms/*"]
    }
  }
}
```

**Available Aliases:**

- `@lib/*` → `src/lib/*`
- `@components/*` → `src/components/*`
- `@atoms/*` → `src/components/Atoms/*`
- `@molecules/*` → `src/components/Molecules/*`
- `@organisms/*` → `src/components/Organisms/*`

### 2. SDK (`packages/sdk`)

**`tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@sdk/*": ["src/*"],
      "@entities/*": ["src/entities/*"],
      "@providers/*": ["src/providers/*"],
      "@services/*": ["src/services/*"]
    }
  }
}
```

**Available Aliases:**

- `@sdk/*` → `src/*` (for internal SDK files like `client.ts`)
- `@entities/*` → `src/entities/*`
- `@providers/*` → `src/providers/*`
- `@services/*` → `src/services/*`

### 3. Web App (`apps/web`)

**`tsconfig.json`:**

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@components/*": ["./components/*"],
      "@app/*": ["./app/*"],
      "@lib/*": ["./lib/*", "../../packages/design-system/src/lib/*"],
      "@entities/*": ["../../packages/sdk/src/entities/*"],
      "@providers/*": ["../../packages/sdk/src/providers/*"],
      "@services/*": ["../../packages/sdk/src/services/*"]
    }
  }
}
```

**`next.config.js` (Webpack Aliases):**

```javascript
const path = require("path");

module.exports = {
  webpack: (config) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      "@lib": path.resolve(__dirname, "../../packages/design-system/src/lib"),
      "@entities": path.resolve(__dirname, "../../packages/sdk/src/entities"),
      "@providers": path.resolve(__dirname, "../../packages/sdk/src/providers"),
      "@services": path.resolve(__dirname, "../../packages/sdk/src/services"),
    };
    return config;
  },
};
```

**Available Aliases:**

- `@components/*` → `./components/*` (web app)
- `@app/*` → `./app/*` (Next.js app directory)
- `@lib/*` → Design System's `lib` folder
- `@sdk/*` → SDK's `src` folder (for internal SDK imports)
- `@entities/*` → SDK's `entities` folder
- `@providers/*` → SDK's `providers` folder
- `@services/*` → SDK's `services` folder

---

## Usage Examples

### Design System Components

```typescript
// In: packages/design-system/src/components/Atoms/Button/Button.tsx
import { cn } from '@lib/utils';
import { tv } from 'tailwind-variants';

const button = tv({ /* ... */ });

export const Button = ({ className, ...props }) => (
  <button className={cn(button(), className)} {...props} />
);
```

### SDK Services

```typescript
// In: packages/sdk/src/services/mutations/auth/useLogin/index.ts
import { useMutation } from "@tanstack/react-query";
import { useApiClient } from "@providers/ApiProvider";
import { setToken } from "@sdk/client";
import { loginRequest } from "./request";
import { LoginInput, LoginResponse } from "@entities/Auth";

export const useLogin = () => {
  const { client } = useApiClient();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      const response = await loginRequest(client, data);
      setToken(response.accessToken);
      return response;
    },
  });
};
```

### Web App (Next.js)

```typescript
// In: apps/web/app/page.tsx
import { Button, Card, ProductCard } from '@react-shop/design-system';
import { useProductList } from '@react-shop/sdk';
import { ProductSection } from '@components/ProductSection';

export default function Home() {
  const { data: products } = useProductList();

  return (
    <div>
      <ProductSection products={products} />
    </div>
  );
}
```

---

## Why Webpack Configuration?

Next.js needs **both** TypeScript path mappings (`tsconfig.json`) **and** Webpack aliases (`next.config.js`) because:

1. **TypeScript (`tsconfig.json`)**: Provides IntelliSense and type checking
2. **Webpack (`next.config.js`)**: Resolves paths at build/runtime

Without the webpack configuration, you'd see:

```
Module not found: Can't resolve '@lib/utils'
```

---

## Troubleshooting

### Issue: Module not found error

**Solution:** Make sure both `tsconfig.json` and `next.config.js` are configured:

1. Check `tsconfig.json` has the path mapping
2. Check `next.config.js` has the webpack alias
3. Restart the dev server: `pnpm dev`

### Issue: IntelliSense not working

**Solution:** Reload VS Code's TypeScript server:

1. Press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Type: "TypeScript: Restart TS Server"
3. Press Enter

### Issue: Path works in IDE but fails at runtime

**Solution:** The webpack alias is missing. Add it to `next.config.js`.

---

## Best Practices

1. **Always use aliases** for cross-package imports
2. **Keep aliases consistent** across packages
3. **Document new aliases** when adding them
4. **Restart dev server** after changing `next.config.js`
5. **Use relative paths** only within the same folder

---

## Summary

| Alias           | Points To           | Used In                |
| --------------- | ------------------- | ---------------------- |
| `@lib/*`        | Design System lib   | All packages           |
| `@components/*` | Component folders   | Design System, Web App |
| `@atoms/*`      | Atom components     | Design System          |
| `@molecules/*`  | Molecule components | Design System          |
| `@organisms/*`  | Organism components | Design System          |
| `@sdk/*`        | SDK src folder      | SDK, Web App           |
| `@entities/*`   | SDK entities        | SDK, Web App           |
| `@providers/*`  | SDK providers       | SDK, Web App           |
| `@services/*`   | SDK services        | SDK, Web App           |

---

## Migration from Relative Paths

If you have existing code with relative paths, replace them:

```bash
# Example: Replace relative imports with absolute
find packages/design-system/src -name "*.tsx" -exec sed -i '' 's|from "../../../lib/utils"|from "@lib/utils"|g' {} +
```

---

This configuration makes the codebase cleaner, more maintainable, and easier to refactor! 🚀
