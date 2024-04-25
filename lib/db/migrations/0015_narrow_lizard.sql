CREATE TABLE IF NOT EXISTS "characters_constellations" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" integer NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_constellations" ADD CONSTRAINT "characters_constellations_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
