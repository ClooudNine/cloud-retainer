ALTER TABLE "featured_characters_in_banners" RENAME COLUMN "character_banner_id" TO "banner_id";--> statement-breakpoint
ALTER TABLE "featured_weapons_in_banners" RENAME COLUMN "weapon_banner_id" TO "banner_id";--> statement-breakpoint
ALTER TABLE "featured_characters_in_banners" DROP CONSTRAINT "featured_characters_in_banners_character_banner_id_character_banners_id_fk";
--> statement-breakpoint
ALTER TABLE "featured_weapons_in_banners" DROP CONSTRAINT "featured_weapons_in_banners_weapon_banner_id_weapon_banners_id_fk";
--> statement-breakpoint
ALTER TABLE "featured_characters_in_banners" DROP CONSTRAINT "featured_characters_in_banners_character_banner_id_character_id_pk";--> statement-breakpoint
ALTER TABLE "featured_weapons_in_banners" DROP CONSTRAINT "featured_weapons_in_banners_weapon_banner_id_weapon_id_pk";--> statement-breakpoint
ALTER TABLE "character_banners" ALTER COLUMN "banner_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "character_banners" ALTER COLUMN "text_parameters" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "standard_banners" ALTER COLUMN "banner_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "standard_banners" ALTER COLUMN "text_parameters" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "weapon_banners" ALTER COLUMN "banner_type" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "weapon_banners" ALTER COLUMN "text_parameters" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "featured_characters_in_banners" ADD CONSTRAINT "featured_characters_in_banners_banner_id_character_id_pk" PRIMARY KEY("banner_id","character_id");--> statement-breakpoint
ALTER TABLE "featured_weapons_in_banners" ADD CONSTRAINT "featured_weapons_in_banners_banner_id_weapon_id_pk" PRIMARY KEY("banner_id","weapon_id");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_characters_in_banners" ADD CONSTRAINT "featured_characters_in_banners_banner_id_character_banners_id_fk" FOREIGN KEY ("banner_id") REFERENCES "character_banners"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "featured_weapons_in_banners" ADD CONSTRAINT "featured_weapons_in_banners_banner_id_weapon_banners_id_fk" FOREIGN KEY ("banner_id") REFERENCES "weapon_banners"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
