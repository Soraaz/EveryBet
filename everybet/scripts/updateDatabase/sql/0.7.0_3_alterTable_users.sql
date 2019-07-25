ALTER TABLE `users`
ADD COLUMN IF NOT EXISTS `phone` varchar(20) NOT NULL,
ADD COLUMN IF NOT EXISTS `zipCode` varchar(5) NOT NULL,
ADD COLUMN IF NOT EXISTS `address` varchar(255) NOT NULL,
ADD COLUMN IF NOT EXISTS `additionalInformation` varchar(255) NOT NULL,
ADD COLUMN IF NOT EXISTS `country` varchar(255) NOT NULL,
ADD COLUMN IF NOT EXISTS `avatar` varchar(255) NOT NULL;