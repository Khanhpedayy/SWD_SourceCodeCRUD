CREATE DATABASE IF NOT EXISTS quiz_system;
USE quiz_system;

CREATE TABLE IF NOT EXISTS questions (
    id INT AUTO_INCREMENT PRIMARY KEY,
    content VARCHAR(500) NOT NULL,
    difficulty ENUM('Easy', 'Medium', 'Hard') NOT NULL DEFAULT 'Easy',
    question_type ENUM('Single Choice', 'Multiple Choice', 'True/False') NOT NULL DEFAULT 'Single Choice',
    topic VARCHAR(100) NOT NULL DEFAULT 'General',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

INSERT INTO questions (content, difficulty, question_type, topic)
SELECT 'What does HTML stand for?', 'Easy', 'Single Choice', 'Web Development'
WHERE NOT EXISTS (SELECT 1 FROM questions);

INSERT INTO questions (content, difficulty, question_type, topic)
SELECT 'What is React used for?', 'Medium', 'Single Choice', 'ReactJS'
WHERE (SELECT COUNT(*) FROM questions) = 1;
