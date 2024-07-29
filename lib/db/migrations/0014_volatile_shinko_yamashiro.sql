ALTER TABLE "bosses" DROP CONSTRAINT "bosses_pkey" CASCADE;--> statement-breakpoint
ALTER TABLE "materials" DROP CONSTRAINT "materials_pkey" CASCADE;--> statement-breakpoint
ALTER TABLE "bosses" ADD COLUMN "language" text DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "materials" ADD COLUMN "language" text DEFAULT 'en' NOT NULL;--> statement-breakpoint
ALTER TABLE "bosses" ADD CONSTRAINT "bosses_id_language_pk" PRIMARY KEY("id","language");--> statement-breakpoint
ALTER TABLE "materials" ADD CONSTRAINT "materials_id_language_pk" PRIMARY KEY("id","language");