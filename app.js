const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");
const render = require("./lib/htmlRenderer");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const team = [];

const addEmployee = [
    {
        type: "list",
        name: "addAnother",
        message: "Would you like to add another employee?",
        default: "no",
        choices: [
            "yes",
            "no"
        ]
    }
];

const employeeType = [
    {
      type: "list",
      name: "employeeType",
      message: "What type of employee do you want to add?",
      default: "manager",
      choices: [
        "manager",
        "engineer",
        "intern"
      ]
    }
];

const managerInfo = [
    {
        type: "input",
        name: "name",
        message: "What is the Manager's name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the Manager's email?"
    },
    {
        type: "number",
        name: "id",
        message: "What is the Manager's ID number?"
    },
    {
        type: "number",
        name: "officeNum",
        message: "What is the Manager's office phone number?"
    }
];

const engineerInfo = [
    {
        type: "input",
        name: "name",
        message: "What is the Engineer's name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the Engineer's email?"
    },
    {
        type: "number",
        name: "id",
        message: "What is the Engineer's ID number?"
    },
    {
        type: "input",
        name: "github",
        message: "What is the Engineer's Github username?"
    }
];

const internInfo = [
    {
        type: "input",
        name: "name",
        message: "What is the Intern's name?"
    },
    {
        type: "input",
        name: "email",
        message: "What is the Intern's email?"
    },
    {
        type: "number",
        name: "id",
        message: "What is the Intern's ID number?"
    },
    {
        type: "input",
        name: "school",
        message: "What is the Intern's school?"
    }
];

const continueAdding = () => {
    inquirer.prompt(addEmployee).then( (data) => {
        if (data.addAnother === "yes") {
            buildTeam();
        } else {
            writeToFile(team);
        }
    })
};

const buildTeam = () => {
    inquirer.prompt(employeeType).then( (data) => {
        if (data.employeeType === "manager") {
            inquirer.prompt(managerInfo).then( (data) => {
                let manager = new Manager(data.name, data.id, data.email, data.officeNum);
                team.push(manager);
                console.log(`Manager ${data.id} added to the team!`);
                continueAdding();
            })
        } else if (data.employeeType === "engineer") {
            inquirer.prompt(engineerInfo).then( (data) => {
                let engineer = new Engineer(data.name, data.id, data.email, data.github);
                team.push(engineer);
                console.log(`Engineer ${data.id} added to the team!`);
                continueAdding();
            })
        } else if (data.employeeType === "intern") {
            inquirer.prompt(internInfo).then( (data) => {
                let intern = new Intern(data.name, data.id, data.email, data.school);
                team.push(intern);
                console.log(`Intern ${data.id} added to the team!`);
                continueAdding();
            })
        }
    })
};

const writeToFile = (data) => {
    fs.writeFile(outputPath, render(data), (err) => {
        if (err) {
            return console.log(err);
        } else {
            return console.log("Team successfully built!");
        }
    })
};

buildTeam();

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
// for the provided `render` function to work!```

