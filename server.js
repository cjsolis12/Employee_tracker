require("dotenv").config();
const { questions } = require("./inquirerFile.js");
const mysql = require("mysql2");
const inquirer = require("inquirer");

//Connect to database
const dbConfig = {
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

async function sqlConnection() {
  const connection = await mysql.createConnection(dbConfig);
  //Prompt the user for input
  inquirer.prompt(questions).then((answers) => {
    // Handle the user's input
    switch (answers.options) {
      case "View All Departments":
        connection.query("SELECT * FROM department", function (err, results) {
          if (err) throw err;
          console.table(results);
        });
        break;
      case "View All Roles":
        connection.query("SELECT role.id, role.title, role.salary, department.table_name AS department FROM role JOIN department ON role.department_id = department.id", function (err, results) {
          if (err) throw err;
          console.table(results);
        });
        break;
      case "View All Employees":
        connection.query(
          "SELECT e.id, e.first_name, e.last_name, r.title AS role, d.table_name AS department, r.salary, m.first_name AS manager_first_name, m.last_name AS manager_last_name FROM employee e JOIN role r ON e.role_id = r.id JOIN department d ON r.department_id = d.id LEFT JOIN employee m ON e.manager_id = m.id",
          function (err, results) {
            if (err) {
              console.error(err);
            } else {
              const tableData = results.map((row) => {
                return {
                  id: row.id,
                  first_name: row.first_name,
                  last_name: row.last_name,
                  role: row.role,
                  department: row.department,
                  salary: row.salary,
                  managers: `${row.manager_first_name} ${row.manager_last_name}`,
                };
              });
              console.table(tableData);
            }
          }
        );
        break;
      case "Add a Department":
        connection.query(
          `INSERT INTO employee_db.department(id,table_name) VALUES (null, '${answers.departmentName}')`,
          function (err, results) {
            if (err) {
              console.err(err);
              return;
            }
            console.log("Department added successfully.");
            connection.query(
              "SELECT * FROM department",
              function (err, results) {
                if (err) {
                  console.err(err);
                  return;
                }
                console.table(results);
              }
            );
          }
        );
        break;
      case "Add a Role":
        const values = [
          answers.roleTitle,
          answers.roleSalary,
          answers.roleDepartment,
        ];
        connection.query(
          `INSERT INTO role (title, salary, department_id) VALUES ('${answers.roleTitle}', '${answers.roleSalary}', '${answers.roleDepartment}')`,
          function (err, results) {
            if (err) {
              console.err(err);
              return;
            }
            console.log("Role added successfully!");
          }
        );
        console.log("Role added successfully.");
        break;
      case "Add an Employee":
        connection.query(
          "INSERT INTO employee (first_name, last_name, job_title, department, salary, managers) VALUES (?, ?, ?, ?, ?, ?)",
          [
            answers.firstName,
            answers.lastName,
            answers.role,
            answers.department,
            answers.salary,
            answers.manager,
          ]
        );
        console.log("Employee  added successfully.");
        break;
      case "Update an Employee":
        // Perform the appropriate MySQL query to update the employee's information
        console.log("Update an Employee");
        break;
      case "Update an Employee Role":
        // Perform the appropriate MySQL query to update the employee's role
        console.log("Update an Employee Role");
        break;
      default:
        console.log("Invalid option selected.");
    }
    console.log(answers);
  });
}

sqlConnection();
