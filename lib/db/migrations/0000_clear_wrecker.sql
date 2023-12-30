DO $$ BEGIN
 CREATE TYPE "banner_types" AS ENUM('Character Event Wish', 'Character Event Wish-2', 'Weapon Event Wish', 'Novice Wish', 'Standard Wish');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "elements" AS ENUM('Anemo', 'Cryo', 'Dendro', 'Electro', 'Geo', 'Hydro', 'Pyro');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "phases" AS ENUM('1', '2');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "rares" AS ENUM('1', '2', '3', '4', '5');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "weapon_types" AS ENUM('Bow', 'Catalyst', 'Claymore', 'Polearm', 'Sword');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"main_character_id" integer NOT NULL,
	"version" real NOT NULL,
	"phase" "phases" NOT NULL,
	"banner_type" "banner_types",
	"text_parameters" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"title" text NOT NULL,
	"rare" "rares" NOT NULL,
	"element" "elements" NOT NULL,
	"weapon_type" "weapon_types" NOT NULL,
	"appearance_version" real NOT NULL,
	"in_standard_wish" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weapon_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"first_main_weapon_id" integer NOT NULL,
	"second_main_weapon_id" integer NOT NULL,
	"version" real NOT NULL,
	"phase" "phases" NOT NULL,
	"banner_type" "banner_types" DEFAULT 'Weapon Event Wish',
	"text_parameters" json
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weapons" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"rare" "rares" NOT NULL,
	"weapon_type" "weapon_types" NOT NULL,
	"appearance_version" real NOT NULL,
	"in_standard_wish" boolean
);
