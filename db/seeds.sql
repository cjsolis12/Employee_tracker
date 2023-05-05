INSERT INTO department(id, table_name)
VALUES(1, "Sales"),
      (2, "Engineering"),
      (3, "Legal"),
      (4, "Finance");

INSERT INTO role(id, title, department_id, salary)
VALUES(1, "Sales Lead", 1, 100000),
      (2, "Salesperson", 1, 80000),
      (3, "Lead Engineer", 2, 150000),
      (4, "Software Engineer", 2, 120000),
      (5, "Accountant Manager", 4, 160000),
      (6, "Accountant", 4, 125000),
      (7, "Legal Team Lead", 3, 250000);

INSERT INTO employee(id, first_name, last_name, role_id, manager_id)
VALUES(1, "John", "Doe", "1", "1"),
      (2, "Mike", "Chan", "2", "1"),
      (3, "Ashley", "Rodriguez", "2", "2"),
      (4, "Kevin", "Tupik", "4", "4"),
      (5, "Kunal", "Singh", "5", "4"),
      (6, "Malia", "Brown", "6", "4");