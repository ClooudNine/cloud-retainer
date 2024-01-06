import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import dotenv from 'dotenv';

dotenv.config();

const migrationsClient = postgres({
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    database: process.env.DATABASE_DEFAULT,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
    max: 1,
});
migrate(drizzle(migrationsClient), { migrationsFolder: './lib/db/migrations' })
    .then(() => {
        console.log('Migrations complete!');
        migrationsClient.end();
    })
    .catch((err) => {
        console.error('Migrations failed!', err);
        migrationsClient.end();
    });
