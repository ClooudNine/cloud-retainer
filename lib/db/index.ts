import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_DEFAULT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
});
export const db = drizzle(queryClient);
