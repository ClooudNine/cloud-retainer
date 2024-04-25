CREATE TABLE IF NOT EXISTS "bosses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text,
	"drop" text
);
--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "boss_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_boss_id_bosses_id_fk" FOREIGN KEY ("boss_id") REFERENCES "bosses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
