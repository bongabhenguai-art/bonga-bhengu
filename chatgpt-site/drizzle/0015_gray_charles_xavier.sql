CREATE TABLE `community_comments` (
	`id` text PRIMARY KEY NOT NULL,
	`post_id` text NOT NULL,
	`author` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `community_comment_post` ON `community_comments` (`post_id`,`created_at`);--> statement-breakpoint
CREATE TABLE `community_likes` (
	`post_id` text NOT NULL,
	`profile_id` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_like_identity` ON `community_likes` (`post_id`,`profile_id`);--> statement-breakpoint
CREATE TABLE `community_messages` (
	`id` text PRIMARY KEY NOT NULL,
	`sender` text NOT NULL,
	`recipient` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `community_message_sender` ON `community_messages` (`sender`,`created_at`);--> statement-breakpoint
CREATE INDEX `community_message_recipient` ON `community_messages` (`recipient`,`created_at`);--> statement-breakpoint
CREATE TABLE `community_posts` (
	`id` text PRIMARY KEY NOT NULL,
	`author` text NOT NULL,
	`body` text NOT NULL,
	`created_at` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `community_post_date` ON `community_posts` (`created_at`);--> statement-breakpoint
CREATE TABLE `community_profiles` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`name` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `community_profiles_user_id_unique` ON `community_profiles` (`user_id`);--> statement-breakpoint
