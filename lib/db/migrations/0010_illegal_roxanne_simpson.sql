DO $$ BEGIN
 CREATE TYPE "talent_types" AS ENUM('Normal Attack', 'Elemental Skill', 'Elemental Burst', '1st Ascension Passive', '4th Ascension Passive', 'Utility Passive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_talents" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" integer NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"type" "talent_types" NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "boss_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "talent_material_id" SET NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_talents" ADD CONSTRAINT "characters_talents_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
