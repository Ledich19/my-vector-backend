CREATE TYPE "public"."emotion_category_enum" AS ENUM('positive', 'negative', 'neutral');--> statement-breakpoint
ALTER TYPE "public"."emotion_enum" ADD VALUE 'love';--> statement-breakpoint
ALTER TYPE "public"."emotion_enum" ADD VALUE 'grateful';--> statement-breakpoint
ALTER TYPE "public"."emotion_enum" ADD VALUE 'frustrated';--> statement-breakpoint
ALTER TYPE "public"."emotion_enum" ADD VALUE 'shame';--> statement-breakpoint
ALTER TYPE "public"."emotion_enum" ADD VALUE 'guilt';--> statement-breakpoint
ALTER TYPE "public"."emotion_enum" ADD VALUE 'jealous';--> statement-breakpoint
ALTER TYPE "public"."emotion_enum" ADD VALUE 'embarrassed';--> statement-breakpoint
CREATE TABLE "protocols" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "emotions" ADD COLUMN "category" "emotion_category_enum";
--> statement-breakpoint

UPDATE "emotions" SET "category" = 'neutral' WHERE "category" IS NULL;
--> statement-breakpoint

ALTER TABLE "emotions" ALTER COLUMN "category" SET NOT NULL;
--> statement-breakpoint

ALTER TABLE "emotions" ADD COLUMN "color" text;
--> statement-breakpoint

UPDATE "emotions" SET "color" = '#000000' WHERE "color" IS NULL;
--> statement-breakpoint

ALTER TABLE "emotions" ALTER COLUMN "color" SET NOT NULL;