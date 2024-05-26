DO $$ BEGIN
 CREATE TYPE "public"."additional_weapon_characteristics" AS ENUM('HP', 'Physical Damage', 'Energy recharge', 'Defence', 'Critical Damage', 'Elemental Mastery', 'Attack', 'Critical Rate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."banner_types" AS ENUM('Character Event Wish', 'Character Event Wish-2', 'Weapon Event Wish', 'Novice Wish', 'Standard Wish');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."elements" AS ENUM('Anemo', 'Cryo', 'Dendro', 'Electro', 'Geo', 'Hydro', 'Pyro');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."materials_types" AS ENUM('Enhancement Material', 'Local Specialty', 'Ascension Material', 'Talent Material', 'Boss Drop');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."phases" AS ENUM('1', '2');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."rares" AS ENUM('1', '2', '3', '4', '5');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."talent_types" AS ENUM('Normal Attack', 'Elemental Skill', 'Elemental Burst', '1st Ascension Passive', '4th Ascension Passive', 'Utility Passive');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."user_roles" AS ENUM('User', 'Admin');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."weapon_types" AS ENUM('Bow', 'Catalyst', 'Claymore', 'Polearm', 'Sword');
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
CREATE TABLE IF NOT EXISTS "achievements" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"chapter" integer NOT NULL,
	"description" text NOT NULL,
	"reward" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "achievements_chapters" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "artifacts_set" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"two_artifacts_bonus" text NOT NULL,
	"four_artifacts_bonus" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "bosses" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"dropId" integer DEFAULT 1 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "character_banners" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"main_character_id" integer NOT NULL,
	"version" real NOT NULL,
	"phase" "phases" NOT NULL,
	"rerun_number" integer NOT NULL,
	"banner_type" "banner_types" NOT NULL,
	"text_parameters" json NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"slug" text NOT NULL,
	"title" text NOT NULL,
	"rare" "rares" NOT NULL,
	"element" "elements" NOT NULL,
	"weapon_type" "weapon_types" NOT NULL,
	"appearance_version" real NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"constellation" text DEFAULT '' NOT NULL,
	"base_attack" integer DEFAULT 0 NOT NULL,
	"base_hp" integer DEFAULT 0 NOT NULL,
	"boss_id" integer DEFAULT 1 NOT NULL,
	"talent_material_id" integer DEFAULT 1 NOT NULL,
	"local_specialty_id" integer DEFAULT 1 NOT NULL,
	"enhancement_material_id" integer DEFAULT 1 NOT NULL,
	"in_standard_wish" boolean
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_artifacts_builds" (
	"character_id" integer NOT NULL,
	"first_artifact_set_id" integer NOT NULL,
	"second_artifact_set_id" integer NOT NULL,
	"rating" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "characters_artifacts_builds_character_id_first_artifact_set_id_second_artifact_set_id_pk" PRIMARY KEY("character_id","first_artifact_set_id","second_artifact_set_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_constellations" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" integer NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"description" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_talents" (
	"id" serial PRIMARY KEY NOT NULL,
	"character_id" integer NOT NULL,
	"title" text DEFAULT '' NOT NULL,
	"type" "talent_types" NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"priority" integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_weapon_builds" (
	"character_id" integer NOT NULL,
	"weapon_id" integer NOT NULL,
	"rating" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "characters_weapon_builds_character_id_weapon_id_pk" PRIMARY KEY("character_id","weapon_id")
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
CREATE TABLE IF NOT EXISTS "game_updates" (
	"version" real PRIMARY KEY NOT NULL,
	"date" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "materials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '' NOT NULL,
	"type" "materials_types"
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
	"email" text,
	"emailVerified" timestamp,
	"image" text,
	"password" text,
	"role" "user_roles" DEFAULT 'User' NOT NULL,
	CONSTRAINT "user_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "verification_token" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text NOT NULL,
	"token" text NOT NULL,
	"expires" timestamp NOT NULL,
	CONSTRAINT "verification_token_token_unique" UNIQUE("token"),
	CONSTRAINT "verification_token_email_token_unique" UNIQUE("email","token")
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
	"slug" text NOT NULL,
	"rare" "rares" NOT NULL,
	"weapon_type" "weapon_types" NOT NULL,
	"appearance_version" real NOT NULL,
	"base_attack" integer DEFAULT 0 NOT NULL,
	"additional_characteristic" "additional_weapon_characteristics",
	"additional_characteristic_stat" real,
	"ability" text DEFAULT '' NOT NULL,
	"ascension_material_id" integer DEFAULT 1 NOT NULL,
	"first_enhancement_material_id" integer DEFAULT 1 NOT NULL,
	"second_enhancement_material_id" integer DEFAULT 1 NOT NULL,
	"in_standard_wish" boolean
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "account" ADD CONSTRAINT "account_userId_user_id_fk" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "achievements" ADD CONSTRAINT "achievements_chapter_achievements_chapters_id_fk" FOREIGN KEY ("chapter") REFERENCES "public"."achievements_chapters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bosses" ADD CONSTRAINT "bosses_dropId_materials_id_fk" FOREIGN KEY ("dropId") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_banners" ADD CONSTRAINT "character_banners_main_character_id_characters_id_fk" FOREIGN KEY ("main_character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "character_banners" ADD CONSTRAINT "character_banners_version_game_updates_version_fk" FOREIGN KEY ("version") REFERENCES "public"."game_updates"("version") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_appearance_version_game_updates_version_fk" FOREIGN KEY ("appearance_version") REFERENCES "public"."game_updates"("version") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_boss_id_bosses_id_fk" FOREIGN KEY ("boss_id") REFERENCES "public"."bosses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_talent_material_id_materials_id_fk" FOREIGN KEY ("talent_material_id") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_local_specialty_id_materials_id_fk" FOREIGN KEY ("local_specialty_id") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_enhancement_material_id_materials_id_fk" FOREIGN KEY ("enhancement_material_id") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_artifacts_builds" ADD CONSTRAINT "characters_artifacts_builds_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_artifacts_builds" ADD CONSTRAINT "characters_artifacts_builds_first_artifact_set_id_artifacts_set_id_fk" FOREIGN KEY ("first_artifact_set_id") REFERENCES "public"."artifacts_set"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_artifacts_builds" ADD CONSTRAINT "characters_artifacts_builds_second_artifact_set_id_artifacts_set_id_fk" FOREIGN KEY ("second_artifact_set_id") REFERENCES "public"."artifacts_set"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_constellations" ADD CONSTRAINT "characters_constellations_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_talents" ADD CONSTRAINT "characters_talents_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_weapon_builds" ADD CONSTRAINT "characters_weapon_builds_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters_weapon_builds" ADD CONSTRAINT "characters_weapon_builds_weapon_id_weapons_id_fk" FOREIGN KEY ("weapon_id") REFERENCES "public"."weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_characters_in_banners" ADD CONSTRAINT "featured_characters_in_banners_banner_id_character_banners_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."character_banners"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_characters_in_banners" ADD CONSTRAINT "featured_characters_in_banners_character_id_characters_id_fk" FOREIGN KEY ("character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_weapons_in_banners" ADD CONSTRAINT "featured_weapons_in_banners_banner_id_weapon_banners_id_fk" FOREIGN KEY ("banner_id") REFERENCES "public"."weapon_banners"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_weapons_in_banners" ADD CONSTRAINT "featured_weapons_in_banners_weapon_id_weapons_id_fk" FOREIGN KEY ("weapon_id") REFERENCES "public"."weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "standard_banners" ADD CONSTRAINT "standard_banners_main_character_id_characters_id_fk" FOREIGN KEY ("main_character_id") REFERENCES "public"."characters"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "standard_banners" ADD CONSTRAINT "standard_banners_version_game_updates_version_fk" FOREIGN KEY ("version") REFERENCES "public"."game_updates"("version") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapon_banners" ADD CONSTRAINT "weapon_banners_first_main_weapon_id_weapons_id_fk" FOREIGN KEY ("first_main_weapon_id") REFERENCES "public"."weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapon_banners" ADD CONSTRAINT "weapon_banners_second_main_weapon_id_weapons_id_fk" FOREIGN KEY ("second_main_weapon_id") REFERENCES "public"."weapons"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapon_banners" ADD CONSTRAINT "weapon_banners_version_game_updates_version_fk" FOREIGN KEY ("version") REFERENCES "public"."game_updates"("version") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapons" ADD CONSTRAINT "weapons_appearance_version_game_updates_version_fk" FOREIGN KEY ("appearance_version") REFERENCES "public"."game_updates"("version") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapons" ADD CONSTRAINT "weapons_ascension_material_id_materials_id_fk" FOREIGN KEY ("ascension_material_id") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapons" ADD CONSTRAINT "weapons_first_enhancement_material_id_materials_id_fk" FOREIGN KEY ("first_enhancement_material_id") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapons" ADD CONSTRAINT "weapons_second_enhancement_material_id_materials_id_fk" FOREIGN KEY ("second_enhancement_material_id") REFERENCES "public"."materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
