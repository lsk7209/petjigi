CREATE INDEX `businesses_sigungu_type_status_idx` ON `businesses` (`address_sigungu`,`type`,`status`);--> statement-breakpoint
CREATE INDEX `businesses_type_name_status_idx` ON `businesses` (`type`,`name`,`status`);--> statement-breakpoint
CREATE INDEX `shelters_sigungu_idx` ON `shelters` (`sigungu`);--> statement-breakpoint
CREATE INDEX `contents_status_type_published_idx` ON `contents` (`status`,`type`,`published_at`);--> statement-breakpoint
CREATE UNIQUE INDEX `regions_sigungu_slug_idx` ON `regions` (`sigungu_slug`);--> statement-breakpoint
CREATE INDEX `regions_sido_slug_idx` ON `regions` (`sido_slug`);--> statement-breakpoint
CREATE INDEX `rescued_animals_notice_sdt_idx` ON `rescued_animals` (`notice_sdt`);