# Design System (`@react-shop/design-system`)

Tailwind v4 component library with CSS-variable theming.

## Overview

- **Styling**: Tailwind v4 CSS-first — no separate config file, tokens live in CSS
- **Variants**: `tailwind-variants` for component variant APIs
- **Utility**: `cn()` helper (clsx + tailwind-merge v3)
- **Components**: Atoms → Molecules → Organisms → Layout hierarchy

## Tokens

Design tokens are defined as CSS variables in `packages/design-system/src/styles/global.css`:

```css
@import 'tailwindcss';
@source '../';

@theme {
  --color-primary: #3b82f6;
  --color-primary-foreground: #ffffff;
  --font-sans: 'Poppins', sans-serif;
  /* … */
}
```

These variables are available in all consuming apps automatically via the `@source` directive.

## Using Components

```typescript
import { Button, Card, Badge, Input } from '@react-shop/design-system';
import { cn } from '@react-shop/design-system';

export default function Example() {
  return (
    <Card className={cn('p-6', 'shadow-lg')}>
      <Badge variant="success">In Stock</Badge>
      <Input placeholder="Search products…" />
      <Button variant="primary" size="lg">Add to Cart</Button>
    </Card>
  );
}
```

## Component Structure

```
packages/design-system/src/
├── components/
│   ├── Atoms/         → Button, Input, Badge, Avatar, …
│   ├── Molecules/     → Select, Toast, PriceDisplay, Rating, …
│   ├── Organisms/     → ProductCard, Modal, Header, Footer, …
│   └── Layout/        → Container, Flex, Grid, …
├── styles/
│   └── global.css     → @theme tokens + base styles
├── lib/
│   └── utils.ts       → cn() utility
└── index.tsx          → Public barrel export
```

## Adding a New Component

1. Create folder in the appropriate level (`Atoms/`, `Molecules/`, etc.):

```
packages/design-system/src/components/Atoms/Spinner/
├── Spinner.tsx
└── index.ts
```

2. Use Tailwind v4 classes and `tailwind-variants`:

```typescript
import { tv } from 'tailwind-variants';

const spinner = tv({
  base: 'animate-spin rounded-full border-2 border-current border-t-transparent',
  variants: {
    size: {
      sm: 'h-4 w-4',
      md: 'h-6 w-6',
      lg: 'h-8 w-8',
    },
  },
  defaultVariants: { size: 'md' },
});

export const Spinner = ({ size }: { size?: 'sm' | 'md' | 'lg' }) => (
  <div className={spinner({ size })} />
);
```

3. Export from `packages/design-system/src/index.tsx`.

## Storybook

Component development and visual testing run in `apps/storybook/`:

```bash
pnpm --filter storybook dev
# Opens at http://localhost:6006
```

Stories live in `apps/storybook/stories/` mirroring the component hierarchy.
