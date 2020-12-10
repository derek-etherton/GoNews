CREATE TABLE articles (
    ID SERIAL PRIMARY KEY,
    url VARCHAR(255) UNIQUE NOT NULL,
    title VARCHAR(80) NOT NULL,
    source VARCHAR(20) NOT NULL,
    date DATE,
    author VARCHAR(100),
    nation VARCHAR(100)
);