# Quick Start Guide

## 🏗️ Project Structure

```
react-ecommerce/
├── apps/
│   ├── web/          → Customer store (localhost:3000)
│   ├── admin/        → Admin dashboard (localhost:3002)
│   └── server/       → Backend API (localhost:5001)
├── packages/
│   ├── sdk/          → API client + React Query hooks
│   └── design-system/→ TailwindCSS components
```

## 🚀 Quick Start

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Setup Database
```bash
cd apps/server
cp .env.example .env
# Edit .env with your database credentials

# Start PostgreSQL (via Docker)
docker-compose up -d

# Run migrations
pnpm prisma migrate dev

# Seed database
pnpm prisma:seed
```

### 3. Start Development
```bash
# From root - starts all apps
pnpm dev

# Or start individually:
cd apps/web && pnpm dev      # Customer store
cd apps/admin && pnpm dev    # Admin dashboard
cd apps/server && pnpm dev   # Backend API
```

## 📱 Access URLs

- **Customer Store**: http://localhost:3000
- **Admin Dashboard**: http://localhost:3002
- **Backend API**: http://localhost:5001
- **Prisma Studio**: `cd apps/server && pnpm prisma studio`
- **API Docs**: http://localhost:5001/api

## 🧪 Test Credentials

### Customer Account
```
Email: customer@example.com
Password: customer123
```

### Admin Account
```
Email: admin@example.com
Password: admin123
```

## 📚 Documentation

- **Web Features**: `apps/web/FEATURES.md`
- **Admin Features**: `apps/admin/FEATURES.md`
- **Architecture**: `apps/APPS_ARCHITECTURE.md`
- **Auth Flow**: `packages/sdk/AUTH_FLOW.md`
- **Absolute Paths**: `ABSOLUTE_PATHS_GUIDE.md`
- **Backend Setup**: `apps/server/README.md`
- **SDK Usage**: `packages/sdk/README.md`
- **Design System**: `packages/design-system/README.md`

## 🛠️ Common Commands

### Development
```bash
pnpm dev              # Start all apps
pnpm build            # Build all apps
pnpm lint             # Lint all apps
pnpm clean            # Clean all build artifacts
```

### Database
```bash
cd apps/server
pnpm prisma migrate dev        # Create & apply migration
pnpm prisma:seed               # Seed database
pnpm prisma studio             # Open Prisma Studio
pnpm prisma generate           # Regenerate Prisma Client
```

### Git
```bash
git commit -m "feat: add new feature"     # Conventional commit
git commit -m "fix: fix bug"              # Bug fix
git commit -m "docs: update docs"         # Documentation
```

## 🎨 Design System Usage

```tsx
import { 
  Button, 
  Input, 
  ProductCard,
  Container 
} from '@react-shop/design-system';

function MyComponent() {
  return (
    <Container>
      <Button variant="primary">Click me</Button>
      <Input placeholder="Search..." />
    </Container>
  );
}
```

## 🔌 SDK Usage

```tsx
'use client';

import { 
  useProductList, 
  useAddToCart,
  useLogin 
} from '@react-shop/sdk';

function ProductList() {
  const { data: products, isLoading } = useProductList();
  const addToCart = useAddToCart();
  const login = useLogin();

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {products?.map(product => (
        <div key={product.id}>
          <h3>{product.title}</h3>
          <button onClick={() => addToCart.mutate({ 
            productId: product.id, 
            quantity: 1 
          })}>
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
```

## 🔐 Environment Variables

### apps/web/.env.local
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### apps/admin/.env.local
```bash
NEXT_PUBLIC_API_URL=http://localhost:5001
```

### apps/server/.env
```bash
DATABASE_URL=postgresql://user:password@localhost:5432/ecommerce
SECRET=your-jwt-secret-key
PORT=5001
```

## 📦 Adding Dependencies

```bash
# Add to specific app
pnpm add <package> --filter web
pnpm add <package> --filter admin
pnpm add <package> --filter server

# Add to specific package
pnpm add <package> --filter @react-shop/sdk
pnpm add <package> --filter @react-shop/design-system
```

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
kill -9 $(lsof -t -i:3000)

# Kill process on port 5001
kill -9 $(lsof -t -i:5001)
```

### Database Connection Error
```bash
# Check if PostgreSQL is running
docker ps

# Restart PostgreSQL
docker-compose restart
```

### Module Not Found Error
```bash
# Reinstall dependencies
rm -rf node_modules
pnpm install

# Clear Next.js cache
cd apps/web && rm -rf .next
```

### Prisma Client Out of Sync
```bash
cd apps/server
pnpm prisma generate
```

## 🎯 Next Steps

1. ✅ Read `apps/APPS_ARCHITECTURE.md` to understand the project structure
2. ✅ Review `apps/web/FEATURES.md` for customer store features
3. ✅ Review `apps/admin/FEATURES.md` for admin dashboard features
4. [ ] Start building features following the priority order
5. [ ] Create components in Design System as needed
6. [ ] Add API endpoints in server as needed
7. [ ] Test everything thoroughly

## 💡 Tips

- **Use absolute imports**: `@components/Button` instead of `../../../components/Button`
- **Follow Atomic Design**: Atoms → Molecules → Organisms
- **Write semantic commits**: Use conventional commits format
- **Test auth flow**: Login, token refresh, logout
- **Mobile-first**: Start with mobile design, then desktop
- **Accessibility**: Use semantic HTML and ARIA labels
- **Type safety**: Always use TypeScript, avoid `any`

## 🤝 Contributing

1. Create a feature branch: `git checkout -b feat/my-feature`
2. Make changes and commit: `git commit -m "feat: add my feature"`
3. Push to branch: `git push origin feat/my-feature`
4. Create Pull Request
5. Wait for review and merge

## 📞 Support

- **Documentation**: Check `/docs` folder and README files
- **Issues**: Create GitHub issue
- **Questions**: Ask in team chat

---

**Happy coding! 🚀**
