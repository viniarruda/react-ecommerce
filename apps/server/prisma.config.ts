import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
  },
  datasource: {
    // Use DIRECT_URL (port 5432) for migrations — PgBouncer transaction pooler doesn't support DDL.
    // Falls back to DATABASE_URL for local dev where there's no pooler.
    url: process.env.DIRECT_URL || process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/react_ecommerce',
  },
});
