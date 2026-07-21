CREATE TYPE "public"."attempt_status" AS ENUM('in_progress', 'completed', 'abandoned');--> statement-breakpoint
CREATE TYPE "public"."construct" AS ENUM('numerical', 'verbal', 'logical', 'diagrammatic');--> statement-breakpoint
CREATE TYPE "public"."delivery_mode" AS ENUM('linear');--> statement-breakpoint
CREATE TYPE "public"."event_type" AS ENUM('page_view', 'test_started', 'test_completed');--> statement-breakpoint
CREATE TYPE "public"."skin_tier" AS ENUM('publisher', 'employer');--> statement-breakpoint
CREATE TABLE "events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"test_profile_id" uuid,
	"event_type" "event_type" NOT NULL,
	"payload" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "items" (
	"id" text PRIMARY KEY NOT NULL,
	"construct" "construct" NOT NULL,
	"stem" text NOT NULL,
	"figure_svg" text,
	"options" jsonb NOT NULL,
	"correct_option_id" text NOT NULL,
	"explanation" text,
	"tags" jsonb DEFAULT '[]'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "sessions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_attempts" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"session_id" uuid NOT NULL,
	"test_profile_id" uuid NOT NULL,
	"status" "attempt_status" DEFAULT 'in_progress' NOT NULL,
	"answers" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"score" jsonb,
	"started_at" timestamp with time zone DEFAULT now() NOT NULL,
	"completed_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "test_profile_items" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"test_profile_id" uuid NOT NULL,
	"item_id" text NOT NULL,
	"section" "construct",
	"order_index" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "test_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"slug" text NOT NULL,
	"display_name" text NOT NULL,
	"tier" "skin_tier" NOT NULL,
	"company_or_publisher_name" text NOT NULL,
	"disclaimer" text NOT NULL,
	"delivery_mode" "delivery_mode" DEFAULT 'linear' NOT NULL,
	"time_limit_minutes" integer NOT NULL,
	"seo_description" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "test_profiles_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "events" ADD CONSTRAINT "events_test_profile_id_test_profiles_id_fk" FOREIGN KEY ("test_profile_id") REFERENCES "public"."test_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_session_id_sessions_id_fk" FOREIGN KEY ("session_id") REFERENCES "public"."sessions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_attempts" ADD CONSTRAINT "test_attempts_test_profile_id_test_profiles_id_fk" FOREIGN KEY ("test_profile_id") REFERENCES "public"."test_profiles"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_profile_items" ADD CONSTRAINT "test_profile_items_test_profile_id_test_profiles_id_fk" FOREIGN KEY ("test_profile_id") REFERENCES "public"."test_profiles"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "test_profile_items" ADD CONSTRAINT "test_profile_items_item_id_items_id_fk" FOREIGN KEY ("item_id") REFERENCES "public"."items"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "profile_order_idx" ON "test_profile_items" USING btree ("test_profile_id","order_index");