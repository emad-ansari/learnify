CREATE TABLE "categories" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "instructors" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"avatar" text,
	"bio" text
);
--> statement-breakpoint
ALTER TABLE "courses" ALTER COLUMN "price" DROP DEFAULT;--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "enrollments" ALTER COLUMN "course_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "user_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "ratings" ALTER COLUMN "course_id" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "instructor_id" uuid;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "duration" integer;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "total_lessons" integer;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "total_reviews" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "students_count" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "courses" ADD COLUMN "category" text;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "progress" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "completed_lessons" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "enrollments" ADD COLUMN "total_time_spent" integer DEFAULT 0;--> statement-breakpoint
ALTER TABLE "ratings" ADD COLUMN "review" text;--> statement-breakpoint
ALTER TABLE "courses" ADD CONSTRAINT "courses_instructor_id_instructors_id_fk" FOREIGN KEY ("instructor_id") REFERENCES "public"."instructors"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "courses" DROP COLUMN "instructor";