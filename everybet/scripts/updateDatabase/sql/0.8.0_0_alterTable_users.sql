ALTER TABLE `users`
CHANGE `phone` `phone` VARCHAR(20) DEFAULT NULL,
CHANGE `address` `address` VARCHAR(255) DEFAULT NULL,
CHANGE `additionalInformation` `additionalInformation` VARCHAR(255) DEFAULT NULL,
CHANGE `country` `country` VARCHAR(255) DEFAULT NULL,
CHANGE `avatar` `avatar` VARCHAR(255) DEFAULT NULL,
CHANGE `zipCode` `zipCode` VARCHAR(5) DEFAULT NULL;