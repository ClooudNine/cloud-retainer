ALTER TABLE "verificationToken" RENAME TO "verification_token";--> statement-breakpoint
ALTER TABLE "verification_token" DROP CONSTRAINT "verificationToken_token_unique";--> statement-breakpoint
ALTER TABLE "verification_token" DROP CONSTRAINT "verificationToken_email_token_unique";--> statement-breakpoint
ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_token_unique" UNIQUE("token");--> statement-breakpoint
ALTER TABLE "verification_token" ADD CONSTRAINT "verification_token_email_token_unique" UNIQUE("email","token");