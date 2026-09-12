CREATE TABLE `etl_sync_state` (
	`job_name` text PRIMARY KEY NOT NULL,
	`last_attempt_at` text NOT NULL,
	`last_successful_at` text,
	`updated_at` text NOT NULL
);
