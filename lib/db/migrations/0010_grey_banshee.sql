CREATE TABLE IF NOT EXISTS "user_events" (
	"user_id" uuid NOT NULL,
	"event_id" integer NOT NULL,
	CONSTRAINT "user_events_user_id_event_id_pk" PRIMARY KEY("user_id","event_id")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_events" ADD CONSTRAINT "user_events_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_events" ADD CONSTRAINT "user_events_event_id_achievements_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."achievements"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
