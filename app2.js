const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output")
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employees = []

inquirer.prompt([
    {
        type: "input",
        name: "managerfullName",
        message: "What is the manager's name?"
    },
    {
        type: "input",
        name: "managerId",
        message: "What is the manager's ID?",
    },
    {
        type: "input",
        name: "managerEmail",
        message: "What is the manager's email?"
    },
    {
        type: "input",
        name: "managerNumber",
        message: "What is the office number?"
    },

]).then(function (managerAnswers) {
    const addManager = new Manager(managerAnswers.managerfullName, managerAnswers.managerId, managerAnswers.managerEmail, managerAnswers.managerNumber);
    employees.push(addManager)
    let newEmployee = false

    function Questions() {
        if (newEmployee === false) {
            inquirer.prompt([
                {
                    type: "list",
                    name: "employeeChoice",
                    message: "Which employee would you like to choose?",
                    choices: ["Engineer", "Intern", "No More Employees"]
                }
            ]).then(function (employeeOptions) {
                if (employeeOptions.employeeChoice === "Engineer") {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "engineerName",
                            message: "What is the engineer's name?"
                        },
                        {
                            type: "input",
                            name: "engineerId",
                            message: "What is the engineer's ID?",
                        },
                        {
                            type: "input",
                            name: "engineerEmail",
                            message: "What is the engineer's email?"
                        },
                        {
                            type: "input",
                            name: "github",
                            message: "What is the engineer's GitHub?"
                        },
                    ])
                        .then(function (engineerAnswers) {
                            const addEngineer = new Engineer(engineerAnswers.engineerName, engineerAnswers.engineerId, engineerAnswers.engineerEmail, engineerAnswers.github);
                            employees.push(addEngineer)
                            Questions()
                        })
                } else if (employeeOptions.employeeChoice === "Intern") {
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "internName",
                            message: "What is the intern's name?"
                        },
                        {
                            type: "input",
                            name: "internId",
                            message: "What is the intern's ID?",
                        },
                        {
                            type: "input",
                            name: "internEmail",
                            message: "What is the intern's email?"
                        },
                        {
                            type: "input",
                            name: "school",
                            message: "What school does the intern attend?"
                        },
                    ])
                        .then(function (internAnswers) {
                            const addIntern = new Intern(internAnswers.internName, internAnswers.internId, internAnswers.internEmail, internAnswers.github);
                            employees.push(addIntern)
                            Questions()
                        })

                } else {
                    fs.writeFile(outputPath, render(employees), function (err) {

                        if (err) {
                            return console.log(err);
                        }

                        console.log("Success!");

                    });

                }
            })
        }
    }; Questions()
});

//should i break down the questions by employee type? such as const engineerQuestions & use a switch???


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
// for the provided `render` function to work!``
