DO $$ BEGIN
 ALTER TABLE "character_banners" ADD CONSTRAINT "character_banners_main_character_id_characters_id_fk" FOREIGN KEY ("main_character_id") REFERENCES "characters"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapon_banners" ADD CONSTRAINT "weapon_banners_first_main_weapon_id_weapons_id_fk" FOREIGN KEY ("first_main_weapon_id") REFERENCES "weapons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "weapon_banners" ADD CONSTRAINT "weapon_banners_second_main_weapon_id_weapons_id_fk" FOREIGN KEY ("second_main_weapon_id") REFERENCES "weapons"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
