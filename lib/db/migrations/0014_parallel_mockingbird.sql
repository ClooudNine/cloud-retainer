ALTER TABLE "characters" ADD COLUMN "enhancement_material_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_enhancement_material_id_materials_id_fk" FOREIGN KEY ("enhancement_material_id") REFERENCES "materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
