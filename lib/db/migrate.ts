import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import dotenv from "dotenv";

dotenv.config();

const migrationsClient = postgres(process.env.DATABASE_URL!, { max: 1 });
migrate(drizzle(migrationsClient), { migrationsFolder: "./lib/db/migrations" })
  .then(() => {
    console.log("Migrations complete!");
    migrationsClient.end();
  })
  .catch((err) => {
    console.error("Migrations failed!", err);
    migrationsClient.end();
  });
