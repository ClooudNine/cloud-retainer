ALTER TABLE "achievements" DROP CONSTRAINT "achievements_parent_id_achievements_id_fk";
--> statement-breakpoint
ALTER TABLE "achievements" DROP COLUMN IF EXISTS "parent_id";