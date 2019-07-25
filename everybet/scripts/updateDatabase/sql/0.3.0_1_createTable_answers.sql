CREATE TABLE IF NOT EXISTS answers (
id int PRIMARY KEY NOT NULL AUTO_INCREMENT,
answer varchar(255),
betId int,
FOREIGN KEY (betId) REFERENCES bets(id)
);