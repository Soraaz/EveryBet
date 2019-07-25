CREATE TABLE IF NOT EXISTS users_answers (
userId int NOT NULL,
answerId int NOT NULL,
betId int NOT NULL,
coins int DEFAULT 100,
FOREIGN KEY (userId) REFERENCES users(id),
FOREIGN KEY (answerId) REFERENCES answers(id),
FOREIGN KEY (betId) REFERENCES bets(id)
);
