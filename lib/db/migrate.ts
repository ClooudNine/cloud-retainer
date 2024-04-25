import '../../envConfig';
import postgres from 'postgres';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';

const sql = postgres(process.env.DATABASE_URL!, {
    max: 1,
});
const db = drizzle(sql);

migrate(db, { migrationsFolder: './lib/db/migrations' })
    .then(() => {
        console.log('Migrations complete!');
        sql.end();
    })
    .catch((err) => {
        console.error('Migrations failed!', err);
        sql.end();
    });
