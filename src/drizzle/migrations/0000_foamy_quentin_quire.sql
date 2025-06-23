CREATE TYPE "public"."emotion_enum" AS ENUM('happy', 'sad', 'angry', 'tired', 'anxious', 'excited', 'neutral', 'confused', 'bored', 'surprised', 'proud', 'disgusted', 'fearful', 'lonely', 'hopeful', 'relaxed');--> statement-breakpoint
CREATE TABLE "emotion_entries" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"emotion_id" uuid NOT NULL,
	"situation" text NOT NULL,
	"thoughts" text NOT NULL,
	"sensations" text NOT NULL,
	"actions" text NOT NULL,
	"created_at" timestamp DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_role" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" text,
	"role_id" integer,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "emotions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"value" "emotion_enum" NOT NULL,
	"label" text NOT NULL,
	"icon" text DEFAULT ''
);
--> statement-breakpoint
ALTER TABLE "emotion_entries" ADD CONSTRAINT "emotion_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "emotion_entries" ADD CONSTRAINT "emotion_entries_emotion_id_emotions_id_fk" FOREIGN KEY ("emotion_id") REFERENCES "public"."emotions"("id") ON DELETE no action ON UPDATE no action;