CREATE DATABASE flashcards;
USE flashcards;

CREATE TABLE Users(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    age INTEGER NOT NULL
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE Category(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(60) NOT NULL UNIQUE
);

CREATE TABLE Flashcards(
    id INTEGER PRIMARY KEY AUTO_INCREMENT,
    question VARCHAR(100) NOT NULL,
    answer VARCHAR(3000) NOT NULL,
    difficulty VARCHAR(20) CHECK (difficulty in ('Easy', 'Medium', 'Hard')),
    category_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    FOREIGN KEY (category_id) REFERENCES Category(id),
    FOREIGN KEY (user_id) REFERENCES Users(id)
);