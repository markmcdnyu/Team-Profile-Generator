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
        //use the same number validation in the ID object
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
        validate: function (value) {
            if (!/^[0-9]+$/.test(value)) {
                return "ID must be a numerical value greater than zero.";
            } else {
                return true;
            }
        },

    },
];




// engineer questions 
const engineerQuestions = [
    {
        // ask for engineer name
        type: "input",
        name: "name",
        message: "What is the engineer's full name?",
        validate: validateInput,
    },
    {
        // ask for engineer's id
        type: "input",
        name: "id",
        message: "What is this engineer's ID number?",
        validate: function (value) {
            if (!/^[0-9]+$/.test(value)) {
                return "ID must be a number value greater than zero.";
            } else {
                return true;
            }
        },
    },
    {
        // ask for engineer's email address
        type: "input",
        name: "email",
        message: "What is this engineer's email address?",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Not a valid email address. Please enter valid email address.";
            }
        },
    },
    {
        // ask for GitHub username
        type: "input",
        name: "github",
        message: "What is this engineer's GitHub username?",
        validate: validateInput,
    },

];

// intern questions
const internQuestions = [
    {
        // ask intern's name
        type: "input",
        name: "name",
        message: "What is the intern's full name?",
        validate: validateInput,
    },
    {
        // ask for intern's id
        type: "input",
        name: "id",
        message: "What is the intern's ID number?",
        validate: function (value) {
            if (!/^[0-9]+$/.test(value)) {
                return "ID must be a number value greater than zero.";
            } else {
                return true;
            }
        },
    },
    {
        // ask intern's email address
        type: "input",
        name: "email",
        message: "What is this intern's email address?",
        validate: function (value) {
            if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
                return true;
            } else {
                return "Not a valid email address. Please enter valid email address.";
            }
        },
    },
    {
        // ask intern's school
        type: "input",
        name: "school",
        message: "What is the name of the intern's school?",
    },
];


// Need to ask if the person inputting this info needs add another person
// question about the new team member's role.
const addMoreTeamMembers = [
    {
        type: "confirm",
        name: "newTeamMembers",
        message: "Do you want to add another team member?",
        default: false,
    },

];

// add in question for the role of the new team member
const teamMemberRole = [
    {
        type: "list",
        name: "role",
        message: "What is the role of the new team member you are adding?",
        choices: ["Engineer", "Intern"],
        validate: validateInput,
    }
];


//Need a place to store data
var employeeData = [];

//function to trigger adding more team members -- 

function addMember() {
    /*big if/else with inquirer prompts for adding new team members*/
    inquirer.prompt(addMoreTeamMembers).then((answer) => {
        if (answer.newTeamMembers) {
            //inquirer prompt for the role of the newest team member
            inquirer.prompt(teamMemberRole).then((roleSelection) => {
                //inquirer prompt for the engineering role
                if (roleSelection.role === "Engineer") {
                    inquirer.prompt(engineerQuestions).then((engineerAnswers) => {
                        //use the engineer constructor for a new instance of Engineer
                        let newEngineer = new Engineer(
                            engineerAnswers.name,
                            engineerAnswers.id,
                            engineerAnswers.email,
                            engineerAnswers.github,
                        );
                        //need to send the data to the employee data array
                        employeeData.push(newEngineer);
                        //call the addMember function
                        addMember();
                    });
                } else {
                    //do the same thing for the intern role
                    inquirer.prompt(internQuestions).then((internAnswers) => {
                        //use the engineer constructor for a new instance of Intern
                        let newIntern = new Intern(
                            internAnswers.name,
                            internAnswers.id,
                            internAnswers.email,
                            internAnswers.school,
                        );
                        //need to send the data to the employee data array
                        employeeData.push(newIntern);
                        //call the addMember function
                        addMember();
                    });
                }
            });
        } else {
            //use the render function and push the employee data
            let htmlOutput = render(employeeData);
            //us the fs.writeFile 
            fs.writeFile(outputPath, htmlOutput, function (err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
}


inquirer.prompt(managerQuestions).then((managerAnswers) => {
    let newManager = new Manager(
        managerAnswers.name,
        managerAnswers.id,
        managerAnswers.email,
        managerAnswers.officeNumber,
    );
    //push this to employeeData too
    employeeData.push(newManager);
    addMember();
});


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
