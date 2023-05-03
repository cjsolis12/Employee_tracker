DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department(
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  table_name VARCHAR(30)
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    department_id INT,
    salary INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT,
  department_id INT,
  salary INT,
  managers_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id),
  FOREIGN KEY (role_id) REFERENCES role(id)
);