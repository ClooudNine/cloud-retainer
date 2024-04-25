CREATE TABLE IF NOT EXISTS "characters_weapon_builds" (
	"character_id" integer NOT NULL,
	"weapon_id" integer NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "characters_weapon_builds_character_id_weapon_id_pk" PRIMARY KEY("character_id","weapon_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_weapon_builds" ADD CONSTRAINT "characters_weapon_builds_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_weapon_builds" ADD CONSTRAINT "characters_weapon_builds_weapon_id_weapons_id_fk" FOREIGN KEY ("weapon_id") REFERENCES "weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
