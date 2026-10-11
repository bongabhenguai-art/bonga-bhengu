CREATE TABLE `community_invites` (
	`profile_id` text PRIMARY KEY NOT NULL,
	`visits` integer DEFAULT 0 NOT NULL,
	`created_at` text NOT NULL
);
