ALTER TABLE `users` ADD COLUMN IF NOT EXISTS `admin` int DEFAULT 0 NULL;