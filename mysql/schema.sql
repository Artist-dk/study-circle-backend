
DROP DATABASE studyCircle;

CREATE DATABASE studyCircle;
USE studyCircle;

CREATE TABLE test_table (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS contactUs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    phoneNo VARCHAR(20) NOT NULL,
    email VARCHAR(150) NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    userName VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    userType ENUM('Admin', 'Student', 'Teacher', 'University', 'User') DEFAULT 'User',
    phoneNo VARCHAR(15) NULL,
    profilePictureURL VARCHAR(255) DEFAULT 'https://i.pinimg.com/originals/5d/ad/83/5dad83eac77969d6583e067e3a82f0b3.jpg',
    description TEXT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE messages (
    id INT PRIMARY KEY AUTO_INCREMENT,
    senderId INT NOT NULL,
    recipientId INT NOT NULL,
    messageType ENUM('text', 'image', 'document', 'video', 'audio', 'other') DEFAULT 'text',
    messageContent TEXT,
    mediaSource TEXT,
    sentAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (senderId) REFERENCES users(id),
    FOREIGN KEY (recipientId) REFERENCES users(id)
);

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    pages INT NOT NULL,
    language VARCHAR(50) NOT NULL,
    bookType VARCHAR(50) NOT NULL,
    publicationDate DATE,
    publisher VARCHAR(255),
    genre VARCHAR(100),
    edition VARCHAR(50),
    price DECIMAL(10, 2),
    description TEXT,
    coverImageURL VARCHAR(255),
    fileURL VARCHAR(255)
);

CREATE TABLE settings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    theme VARCHAR(20),
    notification BOOLEAN,
    FOREIGN KEY (userId) REFERENCES users(id)
);


CREATE TABLE tutorials (
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_id VARCHAR(255) NOT NULL,
    file_link VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE courses (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    github_repo VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);


CREATE TABLE course_sections (
    id INT AUTO_INCREMENT PRIMARY KEY,
    course_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    markdown_file_path VARCHAR(500) NOT NULL, 
    position INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);

CREATE TABLE lessons (
    id INT AUTO_INCREMENT PRIMARY KEY,
    section_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    markdown_file_path VARCHAR(500) NOT NULL, -- Markdown file per lesson
    position INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (section_id) REFERENCES course_sections(id) ON DELETE CASCADE
);


CREATE TABLE user_progress (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    lesson_id INT NOT NULL,
    completed BOOLEAN DEFAULT FALSE,
    completed_at TIMESTAMP NULL DEFAULT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (lesson_id) REFERENCES lessons(id) ON DELETE CASCADE
);


CREATE TABLE enrollments (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    course_id INT NOT NULL,
    enrolled_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE
);


-- #24

ALTER TABLE course_sections 
ADD CONSTRAINT fk_course_sections_course 
FOREIGN KEY (course_id) REFERENCES courses(id) ON DELETE CASCADE;

ALTER TABLE lessons 
ADD CONSTRAINT fk_lessons_section 
FOREIGN KEY (section_id) REFERENCES course_sections(id) ON DELETE CASCADE;
