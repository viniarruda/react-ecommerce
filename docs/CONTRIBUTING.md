# Contributing Guide

Thank you for considering contributing to React Ecommerce Boilerplate! This guide will help you get started.

## Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/react-ecommerce.git
   cd react-ecommerce
   ```
3. **Install dependencies**
   ```bash
   pnpm install
   ```
4. **Setup environment**
   ```bash
   cd apps/server
   cp .env.example .env
   # Edit .env with your configuration
   ```
5. **Start development**
   ```bash
   pnpm dev
   ```

## Project Structure

Please read the [Project Structure](./apps/docs/project_structure.md) documentation to understand the codebase organization.

## Development Workflow

### 1. Create a Branch

Always create a new branch for your work:

```bash
git checkout -b feat/your-feature-name
# or
git checkout -b fix/bug-description
```

Branch naming convention:
- `feat/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation changes
- `refactor/` - Code refactoring
- `chore/` - Maintenance tasks

### 2. Make Your Changes

Follow the project's coding standards:
- ✅ Use TypeScript
- ✅ Follow existing code patterns
- ✅ Add JSDoc comments for complex functions
- ✅ Use semantic naming
- ✅ Keep functions small and focused

### 3. Test Your Changes

```bash
# Run linter
pnpm lint

# Run tests (if available)
pnpm test

# Build to check for errors
pnpm build
```

### 4. Commit Your Changes

We use **Conventional Commits** for all commit messages.

#### Format

```
<type>: <simple description>

[optional body]

[optional footer]
```

#### Types

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation only
- `style` - Code style (formatting, missing semi-colons, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Adding tests
- `chore` - Maintenance (dependencies, config, etc.)

#### Rules

1. **Keep it simple** - Subject line should be concise
2. **Use imperative mood** - "add" not "added"
3. **No period at end** - Subject line should not end with period
4. **Max 72 characters** for subject line
5. **Minimum 10 characters** for subject line

#### Examples

✅ **Good commits:**
```bash
git commit -m "feat: add product search functionality"
git commit -m "fix: cart total calculation error"
git commit -m "docs: update SDK installation guide"
git commit -m "refactor: extract auth logic to service"
git commit -m "chore: update dependencies to latest"
```

❌ **Bad commits:**
```bash
git commit -m "update"
git commit -m "fix bug"
git commit -m "Added new feature with lots of changes."
git commit -m "WIP"
git commit -m "changes"
```

#### With Scope (Optional)

```bash
git commit -m "feat(products): add list endpoint"
git commit -m "fix(cart): resolve quantity update issue"
git commit -m "docs(sdk): add usage examples"
```

#### Breaking Changes

Add `!` after type or `BREAKING CHANGE:` in footer:

```bash
git commit -m "feat!: migrate to new SDK architecture"

# Or with body:
git commit -m "feat: change API response format

BREAKING CHANGE: Response structure changed from nested to flat"
```

### 5. Push Your Changes

```bash
git push origin feat/your-feature-name
```

### 6. Create a Pull Request

1. Go to the repository on GitHub
2. Click "New Pull Request"
3. Select your branch
4. Fill in the PR template
5. Submit for review

## Pull Request Guidelines

### PR Title

Follow the same convention as commits:

```
feat: add product filtering
fix: resolve checkout bug
docs: improve SDK documentation
```

### PR Description

Use the PR template and include:

- **What** - What changes were made
- **Why** - Why these changes were needed
- **How** - How the changes work
- **Testing** - How you tested the changes
- **Screenshots** - If applicable

### Checklist

Before submitting, ensure:

- [ ] Code follows project style guidelines
- [ ] All tests pass
- [ ] Linter passes with no errors
- [ ] Documentation is updated (if needed)
- [ ] Commit messages follow Conventional Commits
- [ ] PR title follows Conventional Commits
- [ ] Breaking changes are documented

## Code Style

### TypeScript

```typescript
// ✅ Good
interface User {
  id: string;
  email: string;
  firstName: string;
}

export const getUserById = async (id: string): Promise<User> => {
  const user = await prisma.user.findUnique({ where: { id } });
  if (!user) {
    throw new NotFoundException('User not found');
  }
  return user;
};

// ❌ Bad
export const get = async (x: any) => {
  return await prisma.user.findUnique({ where: { id: x } });
};
```

### React Components

```typescript
// ✅ Good
interface ButtonProps {
  variant?: 'solid' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'solid',
  size = 'md',
  children,
  onClick,
}) => {
  return (
    <button className={buttonStyles({ variant, size })} onClick={onClick}>
      {children}
    </button>
  );
};

// ❌ Bad
export const Button = (props: any) => {
  return <button {...props} />;
};
```

### Naming Conventions

- **Components**: PascalCase (`Button`, `ProductCard`)
- **Hooks**: camelCase with "use" prefix (`useAuth`, `useProducts`)
- **Functions**: camelCase (`getUserById`, `calculateTotal`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_ITEMS`, `API_URL`)
- **Types/Interfaces**: PascalCase (`User`, `ProductInput`)
- **Files**: kebab-case (`user-profile.tsx`, `auth-service.ts`)

## Adding New Features

### 1. Backend (NestJS + Prisma)

```bash
# 1. Update Prisma schema
cd apps/server
# Edit prisma/schema.prisma

# 2. Create migration
pnpm prisma migrate dev --name add_feature

# 3. Generate Prisma Client
pnpm prisma generate

# 4. Create module
mkdir src/feature
# Create service, resolver, DTOs

# 5. Update GraphQL schema
# Edit src/graphql/schemas/schema.gql

# 6. Register module in app.module.ts
```

### 2. SDK Service

```bash
# 1. Create service folder
mkdir packages/sdk/src/services/feature

# 2. Create queries and mutations
# Create queries.ts, mutations.ts, index.ts

# 3. Export from services/index.ts
```

### 3. Design System Component

```bash
# 1. Create component folder
mkdir packages/design-system/src/components/Feature

# 2. Create component files
# Create Feature.tsx, index.ts

# 3. Export from components/index.ts
```

### 4. Documentation

```bash
# Add documentation to apps/docs/
# Update README.md if needed
```

## Testing

### Unit Tests

```typescript
describe('ProductService', () => {
  it('should create a product', async () => {
    const product = await service.create({
      name: 'Test Product',
      price: 99.99,
    });
    expect(product.name).toBe('Test Product');
  });
});
```

### Component Tests

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

## Documentation

When adding new features, update:

1. **Code comments** - JSDoc for complex functions
2. **README files** - Package-specific documentation
3. **Apps/docs** - Developer documentation
4. **IMPLEMENTATION_STATUS.md** - Track feature completion
5. **Type definitions** - Keep TypeScript types updated

## Getting Help

- Read the [documentation](./apps/docs/)
- Check existing [issues](https://github.com/your-repo/issues)
- Ask in [discussions](https://github.com/your-repo/discussions)
- Review the [.cursorrules](./.cursorrules) file

## Code of Conduct

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Help others learn

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

## Questions?

If you have questions, please:
1. Check the documentation
2. Search existing issues
3. Open a new issue with the "question" label

Thank you for contributing! 🎉

