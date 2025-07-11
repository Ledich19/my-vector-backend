CREATE TYPE "public"."emotion_category_enum" AS ENUM('positive', 'negative', 'neutral');--> statement-breakpoint
CREATE TYPE "public"."emotion_enum" AS ENUM('happy', 'sad', 'angry', 'tired', 'anxious', 'excited', 'neutral', 'confused', 'bored', 'surprised', 'proud', 'disgusted', 'fearful', 'lonely', 'hopeful', 'relaxed', 'love', 'grateful', 'frustrated', 'shame', 'guilt', 'jealous', 'embarrassed');--> statement-breakpoint
CREATE TYPE "public"."exercise_enum" AS ENUM('strength', 'cardio', 'flexibility', 'memory', 'speech', 'reflection');--> statement-breakpoint
CREATE TYPE "public"."input_format_enum" AS ENUM('repetition', 'duration', 'text', 'boolean');--> statement-breakpoint
CREATE TYPE "public"."practice_type_enum" AS ENUM('physical', 'cognitive', 'verbal', 'reflective');--> statement-breakpoint
CREATE TYPE "public"."question_type_enum" AS ENUM('scale', 'single-choice', 'multiple-choice', 'text');--> statement-breakpoint
CREATE TABLE "emotion_entries" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"emotion_id" integer NOT NULL,
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
	"id" integer PRIMARY KEY NOT NULL,
	"email" text,
	"role_id" integer,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "emotions" (
	"id" integer PRIMARY KEY NOT NULL,
	"value" "emotion_enum" NOT NULL,
	"label" text NOT NULL,
	"icon" text DEFAULT '',
	"category" "emotion_category_enum" NOT NULL,
	"color" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "protocols" (
	"id" integer PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"content" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercises" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"exercise_type" "exercise_enum" NOT NULL,
	"practice_type" "practice_type_enum" NOT NULL,
	"input_format" "input_format_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercise_logs" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"user_plan_id" integer,
	"date" timestamp NOT NULL,
	"is_completed" boolean NOT NULL,
	"rating" integer,
	"notes" text,
	"emotion_id" integer
);
--> statement-breakpoint
CREATE TABLE "plan_templates" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"repetitions" integer
);
--> statement-breakpoint
CREATE TABLE "scheduled_day_templates" (
	"id" integer PRIMARY KEY NOT NULL,
	"plan_template_id" integer NOT NULL,
	"day_number" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "exercise_slot_templates" (
	"id" integer PRIMARY KEY NOT NULL,
	"scheduled_day_template_id" integer NOT NULL,
	"exercise_id" integer NOT NULL,
	"time" text,
	"repetitions" integer,
	"duration_seconds" integer
);
--> statement-breakpoint
CREATE TABLE "user_plans" (
	"id" integer PRIMARY KEY NOT NULL,
	"template_id" integer NOT NULL,
	"user_id" integer NOT NULL,
	"start_date" timestamp NOT NULL,
	"repetitions" integer
);
--> statement-breakpoint
CREATE TABLE "user_scheduled_days" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_plan_id" integer NOT NULL,
	"template_day_id" integer NOT NULL,
	"date" timestamp,
	"day_number" integer,
	"notes" text
);
--> statement-breakpoint
CREATE TABLE "user_exercise_slots" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_scheduled_day_id" integer NOT NULL,
	"template_slot_id" integer,
	"exercise_id" integer,
	"time" text,
	"repetitions" integer,
	"duration_seconds" integer,
	"is_deleted" boolean DEFAULT false
);
--> statement-breakpoint
CREATE TABLE "surveys" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"category" text,
	"scoring_method" text NOT NULL,
	"scoring_formula" text
);
--> statement-breakpoint
CREATE TABLE "survey_questions" (
	"id" integer PRIMARY KEY NOT NULL,
	"survey_id" integer NOT NULL,
	"text" text NOT NULL,
	"type" "question_type_enum" NOT NULL,
	"weight" integer DEFAULT 1
);
--> statement-breakpoint
CREATE TABLE "survey_answer_options" (
	"id" integer PRIMARY KEY NOT NULL,
	"question_id" integer NOT NULL,
	"text" text NOT NULL,
	"value" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "survey_user_answers" (
	"id" integer PRIMARY KEY NOT NULL,
	"result_id" integer NOT NULL,
	"question_id" integer NOT NULL,
	"selected_option_id" integer,
	"free_text_answer" text
);
--> statement-breakpoint
CREATE TABLE "survey_results" (
	"id" integer PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"survey_id" integer NOT NULL,
	"created_at" timestamp with time zone DEFAULT now(),
	"total_score" integer NOT NULL,
	"result_label" text
);
--> statement-breakpoint
CREATE TABLE "survey_scoring_thresholds" (
	"id" integer PRIMARY KEY NOT NULL,
	"survey_id" integer NOT NULL,
	"min" integer NOT NULL,
	"max" integer NOT NULL,
	"label" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "emotion_entries" ADD CONSTRAINT "emotion_entries_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "emotion_entries" ADD CONSTRAINT "emotion_entries_emotion_id_emotions_id_fk" FOREIGN KEY ("emotion_id") REFERENCES "public"."emotions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_logs" ADD CONSTRAINT "exercise_logs_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "scheduled_day_templates" ADD CONSTRAINT "scheduled_day_templates_plan_template_id_plan_templates_id_fk" FOREIGN KEY ("plan_template_id") REFERENCES "public"."plan_templates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_slot_templates" ADD CONSTRAINT "exercise_slot_templates_scheduled_day_template_id_scheduled_day_templates_id_fk" FOREIGN KEY ("scheduled_day_template_id") REFERENCES "public"."scheduled_day_templates"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "exercise_slot_templates" ADD CONSTRAINT "exercise_slot_templates_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_plans" ADD CONSTRAINT "user_plans_template_id_plan_templates_id_fk" FOREIGN KEY ("template_id") REFERENCES "public"."plan_templates"("id") ON DELETE restrict ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_scheduled_days" ADD CONSTRAINT "user_scheduled_days_user_plan_id_user_plans_id_fk" FOREIGN KEY ("user_plan_id") REFERENCES "public"."user_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_scheduled_days" ADD CONSTRAINT "user_scheduled_days_template_day_id_scheduled_day_templates_id_fk" FOREIGN KEY ("template_day_id") REFERENCES "public"."scheduled_day_templates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_exercise_slots" ADD CONSTRAINT "user_exercise_slots_user_scheduled_day_id_user_scheduled_days_id_fk" FOREIGN KEY ("user_scheduled_day_id") REFERENCES "public"."user_scheduled_days"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_exercise_slots" ADD CONSTRAINT "user_exercise_slots_exercise_id_exercises_id_fk" FOREIGN KEY ("exercise_id") REFERENCES "public"."exercises"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "survey_questions" ADD CONSTRAINT "survey_questions_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "public"."surveys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "survey_answer_options" ADD CONSTRAINT "survey_answer_options_question_id_survey_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."survey_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "survey_user_answers" ADD CONSTRAINT "survey_user_answers_result_id_survey_results_id_fk" FOREIGN KEY ("result_id") REFERENCES "public"."survey_results"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "survey_user_answers" ADD CONSTRAINT "survey_user_answers_question_id_survey_questions_id_fk" FOREIGN KEY ("question_id") REFERENCES "public"."survey_questions"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "survey_user_answers" ADD CONSTRAINT "survey_user_answers_selected_option_id_survey_answer_options_id_fk" FOREIGN KEY ("selected_option_id") REFERENCES "public"."survey_answer_options"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "survey_results" ADD CONSTRAINT "survey_results_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "public"."surveys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "survey_scoring_thresholds" ADD CONSTRAINT "survey_scoring_thresholds_survey_id_surveys_id_fk" FOREIGN KEY ("survey_id") REFERENCES "public"."surveys"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_plan_template_id_day_number" ON "scheduled_day_templates" USING btree ("plan_template_id");--> statement-breakpoint
CREATE INDEX "idx_template_id_user_id" ON "user_plans" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX "idx_user_plan_id_day_number" ON "user_scheduled_days" USING btree ("user_plan_id");--> statement-breakpoint
CREATE INDEX "idx_user_scheduled_day_id_exercise_id" ON "user_exercise_slots" USING btree ("user_scheduled_day_id");