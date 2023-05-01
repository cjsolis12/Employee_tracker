require('dotenv').config();
const { questions } = require("./inquirerFile.js")
const mysql = require('mysql2');
const inquirer = require('inquirer');


//Connect to database
const dbConfig =
  {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
  };

  async function main(){
  const connection = await mysql.createConnection(dbConfig);

  //Prompt the user for input
  const answers = await inquirer.prompt(questions);

  //Handle the user's input
  switch(answers.options){
    case 'View All Departments':
      const [departments] = await connection.query('SELECT * FROM departments');
      console.log(departments);
      break;
    case 'View All Roles':
      const [roles] = await connection.query('SELECT * FROM role');
      console.log(roles);
      break;
    case 'View ALL Employees':
      const [employees] = await connection.query('SELECT * FROM employee');
      console.log(employees);
      break;
    case 'Add a Department':
      await connection.query('INSERT INTO department (name) VALUES (?)', [answers.departmentName]);
      console.log('Department added successfully.');
      break;
    case 'Add a Role':
      await connection.query('INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)', [answers.roleTitle, answers.roleSalary, answers.roleDepartment]);
      console.log('Role added successfully.');
      break;
    case 'Add an Employee':
      await connection.query('INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)', [answers.firstName, answers.lastName, answers.role, answers.manager]);
      console.log("Employee  added successfully.");
      case 'Update an Employee':
        // Perform the appropriate MySQL query to update the employee's information
        console.log('Update an Employee');
        break;
      case 'Update an Employee Role':
        // Perform the appropriate MySQL query to update the employee's role
        console.log('Update an Employee Role');
        break;
      default:
        console.log('Invalid option selected.');
    }
  
    // Close the database connection
    await connection.end();

  }

main();
  

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to database');
// });

// inquirer.prompt(prompts.questions).then((answers)=>{
//   console.log(answers);
// });

// db.query('DESCRIBE department', function (err, results) {
//   console.log(err);
//   console.log(results);
// });

