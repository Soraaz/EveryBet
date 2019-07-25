CREATE TABLE IF NOT EXISTS bets (
id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
description varchar(255),
validate tinyint DEFAULT false,
finished tinyint DEFAULT false,
deadline int NULL
);