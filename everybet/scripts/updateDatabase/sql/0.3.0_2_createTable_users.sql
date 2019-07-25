CREATE TABLE IF NOT EXISTS users (
id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
name varchar(255),
email varchar(255),
password varchar(255),
login varchar(255),
coins int(11) UNSIGNED NOT NULL DEFAULT 100
);