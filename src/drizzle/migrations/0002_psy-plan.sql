CREATE TABLE "psy_plan_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"repetitions" integer
);
--> statement-breakpoint
CREATE TABLE "psy_task_templates" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"day_number" integer NOT NULL,
	"order" integer NOT NULL,
	"plan_template_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_psy_plans" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" integer NOT NULL,
	"title" text NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user_psy_tasks" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_psy_plan_id" integer NOT NULL,
	"original_task_template_id" integer,
	"title_override" varchar(120),
	"description_override" varchar(1000),
	"day_number" integer NOT NULL,
	"task_date" date NOT NULL,
	"order" integer NOT NULL,
	"is_completed" boolean DEFAULT false,
	"notes" varchar(1000)
);
--> statement-breakpoint
ALTER TABLE "scheduled_day_templates" ADD COLUMN "repetitions" integer;--> statement-breakpoint
ALTER TABLE "psy_task_templates" ADD CONSTRAINT "psy_task_templates_plan_template_id_psy_plan_templates_id_fk" FOREIGN KEY ("plan_template_id") REFERENCES "public"."psy_plan_templates"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_psy_plans" ADD CONSTRAINT "user_psy_plans_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_psy_tasks" ADD CONSTRAINT "user_psy_tasks_user_psy_plan_id_user_psy_plans_id_fk" FOREIGN KEY ("user_psy_plan_id") REFERENCES "public"."user_psy_plans"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_psy_tasks" ADD CONSTRAINT "user_psy_tasks_original_task_template_id_psy_task_templates_id_fk" FOREIGN KEY ("original_task_template_id") REFERENCES "public"."psy_task_templates"("id") ON DELETE set null ON UPDATE no action;