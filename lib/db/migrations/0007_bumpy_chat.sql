CREATE TABLE IF NOT EXISTS "promocodes" (
	"id" serial PRIMARY KEY NOT NULL,
	"value" text NOT NULL,
	"rewards" text NOT NULL,
	"start_date" date NOT NULL
);
