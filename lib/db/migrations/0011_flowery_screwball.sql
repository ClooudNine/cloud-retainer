DO $$ BEGIN
 CREATE TYPE "materials_types" AS ENUM('Enhancement Material', 'Local Specialty', 'Ascension Material', 'Boss Drop');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "talent_materials" RENAME TO "materials";--> statement-breakpoint
ALTER TABLE "characters" DROP CONSTRAINT "characters_talent_material_id_talent_materials_id_fk";
--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "local_specialty_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "type" "materials_types";--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_talent_material_id_materials_id_fk" FOREIGN KEY ("talent_material_id") REFERENCES "materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_local_specialty_id_materials_id_fk" FOREIGN KEY ("local_specialty_id") REFERENCES "materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
