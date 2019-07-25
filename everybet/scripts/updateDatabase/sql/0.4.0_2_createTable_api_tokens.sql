CREATE TABLE IF NOT EXISTS api_tokens (
id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
token varchar(255) NOT NULL,
description varchar(255)
);