CREATE TABLE IF NOT EXISTS "featured_characters_in_banners" (
	"character_banner_id" integer NOT NULL,
	"character_id" integer NOT NULL,
	CONSTRAINT "featured_characters_in_banners_character_banner_id_character_id_pk" PRIMARY KEY("character_banner_id","character_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "featured_weapons_in_banners" (
	"weapon_banner_id" integer NOT NULL,
	"weapon_id" integer NOT NULL,
	CONSTRAINT "featured_weapons_in_banners_weapon_banner_id_weapon_id_pk" PRIMARY KEY("weapon_banner_id","weapon_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "standard_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"main_character_id" integer NOT NULL,
	"version" real NOT NULL,
	"preview_version" real NOT NULL,
	"banner_type" "banner_types" DEFAULT 'Standard Wish',
	"text_parameters" json
);
--> statement-breakpoint
ALTER TABLE "character_banners" DROP CONSTRAINT "character_banners_main_character_id_characters_id_fk";
--> statement-breakpoint
ALTER TABLE "weapon_banners" DROP CONSTRAINT "weapon_banners_first_main_weapon_id_weapons_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_banners" ADD CONSTRAINT "character_banners_main_character_id_characters_id_fk" FOREIGN KEY ("main_character_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapon_banners" ADD CONSTRAINT "weapon_banners_first_main_weapon_id_weapons_id_fk" FOREIGN KEY ("first_main_weapon_id") REFERENCES "weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_characters_in_banners" ADD CONSTRAINT "featured_characters_in_banners_character_banner_id_character_banners_id_fk" FOREIGN KEY ("character_banner_id") REFERENCES "character_banners"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_characters_in_banners" ADD CONSTRAINT "featured_characters_in_banners_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_weapons_in_banners" ADD CONSTRAINT "featured_weapons_in_banners_weapon_banner_id_weapon_banners_id_fk" FOREIGN KEY ("weapon_banner_id") REFERENCES "weapon_banners"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_weapons_in_banners" ADD CONSTRAINT "featured_weapons_in_banners_weapon_id_weapons_id_fk" FOREIGN KEY ("weapon_id") REFERENCES "weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "standard_banners" ADD CONSTRAINT "standard_banners_main_character_id_characters_id_fk" FOREIGN KEY ("main_character_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
