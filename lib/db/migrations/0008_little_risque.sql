CREATE TABLE IF NOT EXISTS "talent_materials" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text DEFAULT '' NOT NULL
);
--> statement-breakpoint
ALTER TABLE "bosses" ALTER COLUMN "name" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "bosses" ALTER COLUMN "name" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "bosses" ALTER COLUMN "drop" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "bosses" ALTER COLUMN "drop" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "characters" ADD COLUMN "talent_material_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "characters" ADD CONSTRAINT "characters_talent_material_id_talent_materials_id_fk" FOREIGN KEY ("talent_material_id") REFERENCES "talent_materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
