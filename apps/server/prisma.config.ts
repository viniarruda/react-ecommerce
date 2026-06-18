import 'dotenv/config';
import { defineConfig } from 'prisma/config';

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'tsx prisma/seed.ts',
    // Use direct connection for migrations — PgBouncer (transaction pooler) doesn't support them
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
  },
});
