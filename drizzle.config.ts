import { defineConfig } from 'drizzle-kit';
export default defineConfig({
    schema: './lib/db/schema.ts',
    out: './lib/db/migrations',
    driver: 'pg',
    dbCredentials: {
        host: process.env.DATABASE_HOST!,
        port: Number(process.env.DATABASE_PORT),
        database: process.env.DATABASE_DEFAULT!,
        password: process.env.DATABASE_PASSWORD,
    },
    verbose: true,
    strict: true,
});
