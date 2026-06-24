CREATE DATABASE IF NOT EXISTS Company;
USE Company;
CREATE TABLE company_details(
	company_id INT PRIMARY KEY,
	company_name VARCHAR(50) NOT NULL,
    slogan VARCHAR(100),
    history TEXT,
    founded_year INT
);
CREATE TABLE services(
	service_id INT PRIMARY KEY,
    service_name VARCHAR(50) NOT NULL,
    s_description VARCHAR(255),
    price DECIMAL(10,2)
);
CREATE TABLE staff(
	staff_id INT PRIMARY KEY,
    full_name VARCHAR(40) NOT NULL,
    age INT,
    specialization VARCHAR(40) NOT NULL
);
CREATE TABLE awards(
	award_id INT PRIMARY KEY,
	award_name VARCHAR(50) NOT NULL,
    in_year INT,
    a_description VARCHAR(255)
);
CREATE TABLE testimonials(
	testimonial_id INT PRIMARY KEY,
	customer_name VARCHAR(40),
    testimonial VARCHAR(255) NOT NULL,
    rating DECIMAL(3,2)
);
CREATE TABLE comments(
	comment_id INT PRIMARY KEY AUTO_INCREMENT,
	customer_name VARCHAR(40),
    email VARCHAR(50),
    message VARCHAR(255) NOT NULL,
    submitted_at DATE DEFAULT(CURRENT_DATE)
);

CREATE TABLE consultations (
    consultation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_name VARCHAR(100),
    contact VARCHAR(200),
    plant_problem TEXT,
    service_need TEXT,
    submission_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO company_details
(company_id, company_name, slogan, history, founded_year)
VALUES
(
1234,
'Leaf and Root',
'Reviving Plants One Leaf At A Time',
'Plant Hospital Centre was founded to help plant owners diagnose and treat unhealthy plants through expert guidance and online consultations.',
2026
);

INSERT INTO services
(service_id, service_name, s_description, price)
VALUES
('001', 'Plant Diagnosis', 'Expert analysis of plant diseases.', 25.00),
('002', 'Emergency Plant Care', 'Urgent help for severely damaged plants.', 40.00),
('003', 'Soil Analysis', 'Check nutrient and soil quality issues.', 15.00),
('004', 'Plant Recovery Plan', 'Customized recovery strategy.', 30.00);

INSERT INTO staff
(staff_id, full_name, age, specialization)
VALUES
(101, 'Dr. Lily Green', 35, 'Plant Disease Specialist'),
(102, 'Oliver Root', 42, 'Soil Health Analysis'),
(103, 'Emma Bloom', 31, 'Indoor Plant Recovery');

INSERT INTO awards
(award_id, award_name, in_year, a_description)
VALUES
(201, 'Best Urban Gardening Service', 2024, 'Recognized for innovative plant care solutions.'),
(202, 'Green Innovation Award', 2025, 'Awarded for sustainable plant recovery practices.');

INSERT INTO testimonials
(testimonial_id, customer_name, testimonial, rating)
VALUES
('301', 'Sarah Ahmed', 'They saved my dying monstera!', 5.0),
('302', 'John Smith', 'Excellent advice and quick response.', 5.0),
('303', 'Aisha Khan', 'My orchid recovered completely.', 4.7);

