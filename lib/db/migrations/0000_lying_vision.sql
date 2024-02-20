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
CREATE TABLE IF NOT EXISTS "account" (
	"userId" uuid NOT NULL,
	"type" text NOT NULL,
	"provider" text NOT NULL,
	"providerAccountId" text NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" text,
	"scope" text,
	"id_token" text,
	"session_state" text,
	CONSTRAINT "account_provider_providerAccountId_pk" PRIMARY KEY("provider","providerAccountId")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"main_character_id" integer NOT NULL,
	"version" real NOT NULL,
	"phase" "phases" NOT NULL,
	"rerun_number" integer,
	"banner_type" "banner_types" NOT NULL,
	"text_parameters" json NOT NULL
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
CREATE TABLE IF NOT EXISTS "featured_characters_in_banners" (
	"banner_id" integer NOT NULL,
	"character_id" integer NOT NULL,
	CONSTRAINT "featured_characters_in_banners_banner_id_character_id_pk" PRIMARY KEY("banner_id","character_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "featured_weapons_in_banners" (
	"banner_id" integer NOT NULL,
	"weapon_id" integer NOT NULL,
	CONSTRAINT "featured_weapons_in_banners_banner_id_weapon_id_pk" PRIMARY KEY("banner_id","weapon_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "standard_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"main_character_id" integer NOT NULL,
	"version" real NOT NULL,
	"preview_version" real NOT NULL,
	"banner_type" "banner_types" DEFAULT 'Standard Wish' NOT NULL,
	"text_parameters" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text,
	"email" text NOT NULL,
	"emailVerified" timestamp,
	"image" text,
	"password" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "weapon_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"first_main_weapon_id" integer NOT NULL,
	"second_main_weapon_id" integer NOT NULL,
	"version" real NOT NULL,
	"phase" "phases" NOT NULL,
	"banner_type" "banner_types" DEFAULT 'Weapon Event Wish' NOT NULL,
	"text_parameters" json NOT NULL
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_banners" ADD CONSTRAINT "character_banners_main_character_id_characters_id_fk" FOREIGN KEY ("main_character_id") REFERENCES "characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_characters_in_banners" ADD CONSTRAINT "featured_characters_in_banners_banner_id_character_banners_id_fk" FOREIGN KEY ("banner_id") REFERENCES "character_banners"("id") ON DELETE cascade ON UPDATE no action;
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
 ALTER TABLE "featured_weapons_in_banners" ADD CONSTRAINT "featured_weapons_in_banners_banner_id_weapon_banners_id_fk" FOREIGN KEY ("banner_id") REFERENCES "weapon_banners"("id") ON DELETE cascade ON UPDATE no action;
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
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapon_banners" ADD CONSTRAINT "weapon_banners_first_main_weapon_id_weapons_id_fk" FOREIGN KEY ("first_main_weapon_id") REFERENCES "weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapon_banners" ADD CONSTRAINT "weapon_banners_second_main_weapon_id_weapons_id_fk" FOREIGN KEY ("second_main_weapon_id") REFERENCES "weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
