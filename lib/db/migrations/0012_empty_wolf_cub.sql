ALTER TABLE "user_events" DROP CONSTRAINT "user_events_event_id_achievements_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_events" ADD CONSTRAINT "user_events_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
