import 'dotenv/config';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';

const migrationClient = postgres(process.env.DATABASE_URL!, {
    max: 1,
});
migrate(drizzle(migrationClient), { migrationsFolder: './lib/db/migrations' })
    .then(() => {
        console.log('Migrations complete!');
    })
    .catch((err) => {
        console.error('Migrations failed!', err);
    });
