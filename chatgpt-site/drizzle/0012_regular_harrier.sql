CREATE TABLE `builder_publications` (
	`project_id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`payload` text NOT NULL,
	`project_revision` integer NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`is_published` integer DEFAULT 0 NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `idx_builder_publication_user` ON `builder_publications` (`user_id`);