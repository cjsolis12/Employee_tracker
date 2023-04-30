// Include packages needed for this application
const inquirer = require("inquirer");
const fs = require("fs");

// TODO: Create a function to initialize app
function init() {
  // TODO: Create an array of questions for user input
  inquirer
    .prompt([
      {
        type: "list",
        name: "options",
        message: "What would you like to do? (use arrow keys)",
        choices: [
          " View All Departments",
          "View All Roles",
          "View All Employees ",
          "Add a Department",
          "Add a Role",
          "Add an Employee",
          "Update an Employee",
          "Update an Employee Role",
        ],
      },
    ])
   
}
