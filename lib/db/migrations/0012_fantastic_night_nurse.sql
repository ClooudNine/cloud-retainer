ALTER TABLE "bosses" ADD COLUMN "dropId" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "bosses" ADD CONSTRAINT "bosses_dropId_materials_id_fk" FOREIGN KEY ("dropId") REFERENCES "materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "bosses" DROP COLUMN IF EXISTS "drop";