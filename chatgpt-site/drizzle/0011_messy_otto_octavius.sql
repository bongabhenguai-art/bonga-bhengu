CREATE TABLE `builder_projects` (
	`id` text NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`payload` text NOT NULL,
	`revision` integer DEFAULT 1 NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_builder_project_identity` ON `builder_projects` (`user_id`,`id`);--> statement-breakpoint
CREATE INDEX `idx_builder_project_user_updated` ON `builder_projects` (`user_id`,`updated_at`);