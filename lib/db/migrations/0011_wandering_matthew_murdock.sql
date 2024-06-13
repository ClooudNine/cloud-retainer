CREATE TABLE IF NOT EXISTS "news" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"publish_date" date NOT NULL,
	"content" text NOT NULL
);
