CREATE TABLE IF NOT EXISTS "artifacts_set" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text,
	"two_artifacts_bonus" text,
	"four_artifacts_bonus" text
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "characters_artifacts_builds" (
	"character_id" integer NOT NULL,
	"first_artifact_set_id" integer NOT NULL,
	"second_artifact_set_id" integer,
	"rating" integer DEFAULT 1 NOT NULL,
	CONSTRAINT "characters_artifacts_builds_character_id_first_artifact_set_id_second_artifact_set_id_pk" PRIMARY KEY("character_id","first_artifact_set_id","second_artifact_set_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "game_updates" (
	"version" real PRIMARY KEY NOT NULL,
	"date" date
);
--> statement-breakpoint
ALTER TABLE "characters" RENAME COLUMN "constellation_name" TO "constellation";--> statement-breakpoint
ALTER TABLE "characters" ALTER COLUMN "appearance_version" DROP NOT NULL;--> statement-breakpoint
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
 ALTER TABLE "standard_banners" ADD CONSTRAINT "standard_banners_version_game_updates_version_fk" FOREIGN KEY ("version") REFERENCES "public"."game_updates"("version") ON DELETE cascade ON UPDATE no action;
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
