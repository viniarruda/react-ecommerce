# Backend Overview

The backend is a NestJS REST API backed by Prisma 7 and PostgreSQL.

## Architecture

```
apps/server/
├── prisma/
│   └── schema.prisma          → Database schema
├── src/
│   ├── auth/                  → Authentication module
│   ├── user/                  → User management
│   ├── product/               → Product catalog
│   ├── category/              → Categories
│   ├── attribute/             → Product attributes
│   ├── cart/                  → Shopping cart
│   ├── order/                 → Order processing
│   ├── review/                → Product reviews
│   ├── store/                 → Store management
│   ├── prisma/                → Prisma service
│   ├── shared/                → Shared utilities and pipes
│   ├── app.module.ts          → Root module
│   └── main.ts                → Entry point (port 5001)
├── docker-compose.yml
└── package.json
```

## Technology Stack

- **NestJS** — Progressive Node.js framework
- **Prisma 7** — Next-generation ORM
- **PostgreSQL** — Relational database
- **Passport.js** — Authentication middleware
- **JWT** — Token-based authentication
- **bcrypt** — Password hashing
- **class-validator** — DTO validation

## Module Structure

Each feature module follows this pattern:

```typescript
// product/product.module.ts
@Module({
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductModule {}

// product/product.controller.ts
@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Get()
  findAll(@Query() query: ProductQueryDto) {
    return this.productService.findAll(query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(id);
  }
}

// product/product.service.ts
@Injectable()
export class ProductService {
  constructor(private prisma: PrismaService) {}

  async findAll(query: ProductQueryDto) {
    return this.prisma.product.findMany({ /* ... */ });
  }
}
```

## REST API

Base URL (development): `http://localhost:5001`

All endpoints are prefixed with `/api`. See [apps/server/README.md](../server/README.md) for the full endpoint list.

## Authentication Flow

1. Client calls `POST /api/auth/login` with credentials
2. Server returns `{ accessToken, refreshToken }`
3. Client includes `Authorization: Bearer <accessToken>` on subsequent requests
4. When access token expires, client calls `POST /api/auth/refresh` with the refresh token

## Database

Schema is the single source of truth: `apps/server/prisma/schema.prisma`

```bash
# View and edit data
npx prisma studio

# Apply schema changes
pnpm prisma migrate dev --name describe_change

# Reset and re-seed
pnpm prisma migrate reset
```
