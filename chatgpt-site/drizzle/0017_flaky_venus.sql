CREATE TABLE IF NOT EXISTS `zuxuru_records` (
	`id` text PRIMARY KEY NOT NULL,
	`owner` text NOT NULL,
	`kind` text NOT NULL,
	`data` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS `idx_zuxuru_owner_kind_updated` ON `zuxuru_records` (`owner`,`kind`,`updated_at`);