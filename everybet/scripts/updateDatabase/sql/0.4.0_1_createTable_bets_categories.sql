CREATE TABLE IF NOT EXISTS bets_categories (
betId int NOT NULL,
categoryId int NOT NULL,
FOREIGN KEY (betId) REFERENCES bets(id),
FOREIGN KEY (categoryId) REFERENCES categories(id)
);