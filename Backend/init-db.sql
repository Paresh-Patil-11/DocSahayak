-- Database initialization script for DocSahayak
-- Run this script in your PostgreSQL database

-- Create database (run this as superuser)
-- CREATE DATABASE "DocumentSewa";

-- Connect to the database and run the following:

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    mobile VARCHAR(15) UNIQUE NOT NULL,
    gender VARCHAR(10) NOT NULL,
    birth_date DATE NOT NULL,
    email VARCHAR(255),
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create documents table
CREATE TABLE IF NOT EXISTS documents (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    status VARCHAR(20) DEFAULT 'pending',
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_edited TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    summary TEXT,
    document_type VARCHAR(100),
    file_path VARCHAR(500)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_mobile ON users(mobile);
CREATE INDEX IF NOT EXISTS idx_documents_user_id ON documents(user_id);
CREATE INDEX IF NOT EXISTS idx_documents_status ON documents(status);

-- Insert sample data (optional)
INSERT INTO users (name, mobile, gender, birth_date, email, password) VALUES
('John Doe', '9876543210', 'male', '1990-01-01', 'john@example.com', '$2a$10$hashedpassword'),
('Jane Smith', '9876543211', 'female', '1992-05-15', 'jane@example.com', '$2a$10$hashedpassword')
ON CONFLICT (mobile) DO NOTHING;

INSERT INTO documents (user_id, name, status, summary, document_type) VALUES
(1, 'Birth Certificate Application', 'approved', 'Initial application submitted', 'birth_certificate'),
(1, 'Passport Renewal', 'pending', 'Renewal application with updated photo', 'passport'),
(2, 'Aadhaar Card Update', 'pending', 'Address update application', 'aadhaar')
ON CONFLICT DO NOTHING; 