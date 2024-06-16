#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
class Member {
    constructor(name) {
        this.name = name;
    }
}
class Community {
    constructor(adminPassword) {
        this.members = [];
        this.adminLoggedIn = false;
        this.adminPassword = adminPassword;
    }
    addMember(member) {
        this.members.push(member);
    }
    findMember(name) {
        return this.members.find(member => member.name === name);
    }
    listMembers() {
        return this.members.map(member => member.name).join(", ");
    }
    isAdminPasswordCorrect(password) {
        return password === this.adminPassword;
    }
}
const community = new Community("1234"); // Set your admin password here
const ADMIN_PASSWORD = "1234"; // Set your admin password here
const startProgram = (community) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(chalk_1.default.rgb(255, 255, 0)(`\n\t\tWELCOME  TO  OBJECT  ORIENTED  PROGRAMMING\n`));
    while (!community.adminLoggedIn) {
        const passwordAnswer = yield inquirer_1.default.prompt([
            {
                name: "password",
                type: "password",
                message: "\nENTER ADMIN PASSWORD",
                mask: '*',
                validate: (input) => input ? true : "\nPASSWORD CANNOT BE EMPTY\n"
            }
        ]);
        if (community.isAdminPasswordCorrect(passwordAnswer.password)) {
            console.log(chalk_1.default.rgb(44, 249, 222)("\nADMIN PASSWORD CORRECT. ACCESS GRANTED.\n"));
            community.adminLoggedIn = true;
        }
        else {
            console.log(chalk_1.default.red("\nINCORRECT PASSWORD. PLEASE TRY AGAIN.\n"));
        }
    }
    while (true) {
        console.log(chalk_1.default.rgb(0, 255, 127)("\n\t\tWELCOME TO THE COMMUNITY PORTAL\n"));
        const mainMenu = yield inquirer_1.default.prompt([
            {
                name: "Select",
                type: "list",
                message: "\nPLEASE SELECT AN OPTION",
                choices: community.adminLoggedIn ? ["ADMIN", "USER", "EXIT"] : ["ADMIN", "USER", "EXIT"]
            }
        ]);
        switch (mainMenu.Select) {
            case "ADMIN":
                console.log(chalk_1.default.blue("\n\t\tYOU HAVE ENTERED THE ADMIN AREA.\n"));
                // Add admin functionality here
                break;
            case "USER":
                const userAction = yield inquirer_1.default.prompt([
                    {
                        name: "action",
                        type: "list",
                        message: "\nPLEASE SELECT AN ACTION",
                        choices: ["ADD USER", "VIEW USER", "BACK"]
                    }
                ]);
                if (userAction.action === "ADD USER") {
                    const userAnswer = yield inquirer_1.default.prompt([
                        {
                            name: "member",
                            type: "input",
                            message: "\nENTER USER NAME",
                            validate: (input) => input ? true : "USER NAME CANNOT BE EMPTY"
                        }
                    ]);
                    console.log(chalk_1.default.rgb(255, 0, 255)("\n\t\tYOU HAVE ENTERED THE USER AREA.\n\t\t"));
                    let member = community.findMember(userAnswer.member);
                    if (!member) {
                        let newMember = new Member(userAnswer.member);
                        community.addMember(newMember);
                        console.log(chalk_1.default.rgb(244, 164, 96)(`\nHELLO, I AM ${newMember.name}. NICE TO MEET YOU.`));
                        console.log(chalk_1.default.rgb(204, 153, 255)("\n\n\t\tNEW USER ADDED.\n"));
                        console.log(chalk_1.default.yellow("\nCURRENT USER LIST:"));
                        console.log(community.listMembers());
                    }
                    else {
                        console.log(chalk_1.default.rgb(240, 230, 140)(`\nHELLO, I AM ${member.name}. NICE TO MEET YOU AGAIN.`));
                        console.log(chalk_1.default.yellow("\nEXISTING USER LIST:"));
                        console.log(community.listMembers());
                    }
                }
                else if (userAction.action === "VIEW USER") {
                    const viewAnswer = yield inquirer_1.default.prompt([
                        {
                            name: "member",
                            type: "input",
                            message: "\nENTER USER NAME TO VIEW",
                            validate: (input) => input ? true : "USER NAME CANNOT BE EMPTY"
                        }
                    ]);
                    let member = community.findMember(viewAnswer.member);
                    if (member) {
                        console.log(chalk_1.default.green(`\nUSER  ${member.name}  IS FOUND. `));
                    }
                    else {
                        console.log(chalk_1.default.red(`\nUSER NOT FOUND: ${viewAnswer.member}`));
                    }
                }
                break;
            case "EXIT":
                console.log(chalk_1.default.red("\nEXITING THE PROGRAM...."));
                console.log(chalk_1.default.rgb(25, 25, 112)("\n PRESENTING  BY  ABDUL  REHMAN\n"));
                return; // Exit the function to stop the loop
            default:
                console.log(chalk_1.default.red("\nINVALID OPTION SELECTED."));
        }
    }
});
// Start the program
startProgram(community);
