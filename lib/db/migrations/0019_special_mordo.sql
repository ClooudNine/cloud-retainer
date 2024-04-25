DO $$ BEGIN
 CREATE TYPE "additional_weapon_characteristics" AS ENUM('HP', 'Physical Damage', 'Energy recharge', 'Defence', 'Critical Damage', 'Elemental Mastery', 'Attack', 'Critical Rate');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER TABLE "weapons" ADD COLUMN "base_attack" integer DEFAULT 0 NOT NULL;--> statement-breakpoint
ALTER TABLE "weapons" ADD COLUMN "additional_characteristic" "additional_weapon_characteristics";--> statement-breakpoint
ALTER TABLE "weapons" ADD COLUMN "additional_characteristic_stat" real;--> statement-breakpoint
ALTER TABLE "weapons" ADD COLUMN "ability" text DEFAULT '' NOT NULL;--> statement-breakpoint
ALTER TABLE "weapons" ADD COLUMN "ascension_material_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "weapons" ADD COLUMN "first_enhancement_material_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
ALTER TABLE "weapons" ADD COLUMN "second_enhancement_material_id" integer DEFAULT 1 NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapons" ADD CONSTRAINT "weapons_ascension_material_id_materials_id_fk" FOREIGN KEY ("ascension_material_id") REFERENCES "materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapons" ADD CONSTRAINT "weapons_first_enhancement_material_id_materials_id_fk" FOREIGN KEY ("first_enhancement_material_id") REFERENCES "materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapons" ADD CONSTRAINT "weapons_second_enhancement_material_id_materials_id_fk" FOREIGN KEY ("second_enhancement_material_id") REFERENCES "materials"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
