CREATE TABLE `backend_request_limits` (
	`user_id` text NOT NULL,
	`scope` text NOT NULL,
	`window_start` integer NOT NULL,
	`used` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `idx_backend_request_user_scope` ON `backend_request_limits` (`user_id`,`scope`);--> statement-breakpoint
CREATE TABLE `backend_workflow_locks` (
	`user_id` text PRIMARY KEY NOT NULL,
	`token` text NOT NULL,
	`expires_at` integer NOT NULL
);
