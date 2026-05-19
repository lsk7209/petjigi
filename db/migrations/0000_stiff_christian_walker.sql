CREATE TABLE `businesses` (
	`id` text PRIMARY KEY NOT NULL,
	`type` text NOT NULL,
	`category` integer NOT NULL,
	`name` text NOT NULL,
	`legal_name` text,
	`address` text NOT NULL,
	`address_sido` text,
	`address_sigungu` text,
	`address_dong` text,
	`lat` real,
	`lng` real,
	`phone` text,
	`license_date` text,
	`status` text DEFAULT 'active' NOT NULL,
	`scale` text,
	`source` text NOT NULL,
	`raw_data` text,
	`last_synced_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `shelters` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text NOT NULL,
	`sido` text,
	`sigungu` text,
	`address` text,
	`lat` real,
	`lng` real,
	`phone` text,
	`capacity` integer,
	`source` text NOT NULL,
	`last_synced_at` text NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `contents` (
	`id` text PRIMARY KEY NOT NULL,
	`slug` text NOT NULL,
	`type` text NOT NULL,
	`category` integer NOT NULL,
	`title` text NOT NULL,
	`meta_title` text,
	`meta_description` text,
	`body` text NOT NULL,
	`author_name` text,
	`author_credential` text,
	`reviewed_at` text,
	`reviewer_name` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`ymyl` integer DEFAULT false NOT NULL,
	`sources` text,
	`disclaimer` text,
	`published_at` text,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `contents_slug_unique` ON `contents` (`slug`);--> statement-breakpoint
CREATE TABLE `breeds` (
	`id` text PRIMARY KEY NOT NULL,
	`species` text NOT NULL,
	`slug` text NOT NULL,
	`name_ko` text NOT NULL,
	`name_en` text,
	`origin` text,
	`size_category` text,
	`lifespan_min` integer,
	`lifespan_max` integer,
	`common_conditions` text,
	`body` text,
	`status` text DEFAULT 'draft' NOT NULL,
	`created_at` text NOT NULL,
	`updated_at` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `breeds_slug_unique` ON `breeds` (`slug`);--> statement-breakpoint
CREATE TABLE `regions` (
	`code` text PRIMARY KEY NOT NULL,
	`sido` text NOT NULL,
	`sido_slug` text NOT NULL,
	`sigungu` text NOT NULL,
	`sigungu_slug` text NOT NULL,
	`full_name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `review_queue` (
	`id` text PRIMARY KEY NOT NULL,
	`content_id` text NOT NULL,
	`content_type` text NOT NULL,
	`priority` integer DEFAULT 3 NOT NULL,
	`reason` text,
	`assigned_to` text,
	`status` text DEFAULT 'pending' NOT NULL,
	`notes` text,
	`created_at` text NOT NULL,
	`resolved_at` text
);
--> statement-breakpoint
CREATE TABLE `ad_policies` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`category` integer NOT NULL,
	`ad_type` text NOT NULL,
	`policy` text NOT NULL,
	`notes` text
);
--> statement-breakpoint
CREATE TABLE `email_subscribers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`persona` text,
	`source` text,
	`consent_marketing` text,
	`subscribed_at` text NOT NULL,
	`unsubscribed_at` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `email_subscribers_email_unique` ON `email_subscribers` (`email`);