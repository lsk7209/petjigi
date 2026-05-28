DROP INDEX `regions_sigungu_slug_idx`;--> statement-breakpoint
CREATE INDEX `regions_sigungu_slug_idx` ON `regions` (`sigungu_slug`);