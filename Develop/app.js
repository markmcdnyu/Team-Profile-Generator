const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");


//validation used from my last project below

function validateInput(value) {
    if (value != "") {
        return true;
    } else {
        return "Please answer the question with some kind on input.";
    }
}

//manager questions below

const managerQuestions = [
    {
        // ask manager name
        type: "input",
        name: "name",
        message: "What is the full name of the manager of this team?",
        validate: validateInput,
    },
    {
        // ask for manager id
        type: "input",
        name: "id",
        message: "What is the manager ID number?",
        validate: function (value) {
            if (!/^[0-9]+$/.test(value)) {
                return "ID must be a number value greater than zero.";
            } else {
                return true;
            }
        },

    },
    {
        //ask manager email address
        // using the email validation from last project should work 
        type: "input",
        name: "email",
        message: "What is the manager's work email address?",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Not a valid email address. Please enter valid email address.";
            }
        },
    },
    {
        // ask manager office number 
    },
];




// engineer questions 
    // ask for engineer name

    // ask for engineer's id

    // ask for engineer's email address

    // ask for GitHub username

// intern questions
    // ask intern's name

    // ask for intern's id

    // ask intern's email address

    // ask intern's school


// Need to ask if the person inputting this info needs add another person
    // question about the new team member's role.









// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
