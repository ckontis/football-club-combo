-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create players table with more detailed information
CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    clubs TEXT[] NOT NULL,
    nationality VARCHAR(100),
    position VARCHAR(50),
    birth_year INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create club_pairs table for managing quiz questions
CREATE TABLE IF NOT EXISTS club_pairs (
    id SERIAL PRIMARY KEY,
    club1 VARCHAR(255) NOT NULL,
    club2 VARCHAR(255) NOT NULL,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create quiz_sessions table for tracking user sessions
CREATE TABLE IF NOT EXISTS quiz_sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    correct_answers INTEGER DEFAULT 0,
    total_attempts INTEGER DEFAULT 0,
    is_active BOOLEAN DEFAULT true,
    started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ended_at TIMESTAMP
);

-- Create quiz_attempts table for individual question attempts
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id SERIAL PRIMARY KEY,
    session_id INTEGER REFERENCES quiz_sessions(id),
    club1 VARCHAR(255) NOT NULL,
    club2 VARCHAR(255) NOT NULL,
    user_answer VARCHAR(255),
    is_correct BOOLEAN NOT NULL,
    correct_players TEXT[],
    attempted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_players_clubs ON players USING GIN(clubs);
CREATE INDEX IF NOT EXISTS idx_players_name ON players(name);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user ON quiz_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_score ON quiz_sessions(correct_answers DESC, total_attempts ASC);
CREATE INDEX IF NOT EXISTS idx_club_pairs_active ON club_pairs(is_active);
