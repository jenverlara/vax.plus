CREATE TABLE IF NOT EXISTS "vaccinationSchedules" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"user_id" text NOT NULL,
	"date" timestamp NOT NULL
);
