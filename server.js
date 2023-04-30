// Include packages needed for this application
const express = require('express')
const inquirer = require("inquirer");
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

//Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user:'root',
    password: 'bootcamp123',
    database: 'employee_db'
  }
)

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

// TODO: Create a function to initialize app
// function init() {
  // TODO: Create an array of questions for user input
//   inquirer
//     .prompt([
//       {
//         type: "list",
//         name: "options",
//         message: "What would you like to do? (use arrow keys)",
//         choices: [
//           " View All Departments",
//           "View All Roles",
//           "View All Employees ",
//           "Add a Department",
//           "Add a Role",
//           "Add an Employee",
//           "Update an Employee",
//           "Update an Employee Role",
//         ],
//       },
//     ])
   
// }

app.listen(PORT, ()=> {
  console.log(`server running on port ${PORT}`)
})
