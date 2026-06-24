DROP DATABASE IF EXISTS Company;
CREATE DATABASE Company;
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
    price DECIMAL(6,2)
);

CREATE TABLE staff(
    staff_id INT PRIMARY KEY,
    full_name VARCHAR(40) NOT NULL,
    age INT,
    specialization VARCHAR(40) NOT NULL
);

CREATE TABLE awards(
    award_id INT PRIMARY KEY,
    award_name VARCHAR(100) NOT NULL,
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
(1, 'Care Instructions', 'If you bought a new plant but do not know how to take care of it, this service gives you clear care instructions.', 25.00),
(2, 'Plant Identification', 'If you got a plant but do not know its name, we will help identify it and explain how to care for it.', 20.00),
(3, 'Soil Diagnostics', 'Send a detailed photo to our doctors to get a review of your plant soil and possible problems.', 15.00),
(4, 'Parasite Eradication', 'If your plant has parasites, our doctors will help identify them and explain how to remove them.', 35.00),
(5, 'Moisture Stabilisation Protocols', 'If you overwatered or underwatered your plant, we will help create a recovery plan.', 30.00),
(6, 'General Diagnostics', 'If your plant is visibly sick or dying and you do not know why, this service helps diagnose the issue.', 40.00);

INSERT INTO staff
(staff_id, full_name, age, specialization)
VALUES
(101, 'Dr. Lily Green', 35, 'Plant Disease Specialist'),
(102, 'Oliver Root', 42, 'Soil Health Analysis'),
(103, 'Emma Bloom', 31, 'Indoor Plant Recovery'),
(104, 'Noah Fern', 29, 'Parasite Treatment'),
(105, 'Sophia Moss', 38, 'Plant Nutrition Expert');

INSERT INTO awards
(award_id, award_name, in_year, a_description)
VALUES
(201, 'Best Urban Gardening Service', 2024, 'Recognized for innovative plant care solutions.'),
(202, 'Green Innovation Award', 2025, 'Awarded for sustainable plant recovery practices.');

INSERT INTO testimonials
(testimonial_id, customer_name, testimonial, rating)
VALUES
(301, 'Sarah Ahmed', 'They saved my dying monstera!', 5.0),
(302, 'John Smith', 'Excellent advice and quick response.', 5.0),
(303, 'Aisha Khan', 'My orchid recovered completely.', 4.7);


USE Company;


USE Company;

ALTER TABLE comments
ADD COLUMN customer_query VARCHAR(255) AFTER customer_name;

select * from comments;
select * from consultations;


