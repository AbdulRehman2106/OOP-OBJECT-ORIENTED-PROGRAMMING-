#! /usr/bin/env node


import inquirer from "inquirer";

import chalk from "chalk";

class Member {

    name: string;

    constructor(name: string) {

        this.name = name;

    }
}

class Community {

    members: Member[] = [];

    adminLoggedIn: boolean = false;

    adminPassword: string;

    constructor(adminPassword: string) {

        this.adminPassword = adminPassword;
    }

    addMember(member: Member) {

        this.members.push(member);
    }

    findMember(name: string) {


        return this.members.find(member => member.name === name);
    }

    listMembers() {

        return this.members.map(member => member.name).join(", ");
    }

    isAdminPasswordCorrect(password: string) {

        return password === this.adminPassword;

    }
}

const community = new Community("1234"); // Set your admin password here

const ADMIN_PASSWORD = "1234";  // Set your admin password here

const startProgram = async (community: Community) => {

    console.log(chalk.rgb(255,255,0)(`\n\t\tWELCOME  TO  OBJECT  ORIENTED  PROGRAMMING\n`));
    
    while (!community.adminLoggedIn) {

        const passwordAnswer = await inquirer.prompt([
        
            {
        
                name: "password",
        
                type: "password",
        
                message: "\nENTER ADMIN PASSWORD",
        
                mask: '*',
        
        
                validate: (input) => input ? true : "\nPASSWORD CANNOT BE EMPTY\n"
            }
        ]);

        
        if (community.isAdminPasswordCorrect(passwordAnswer.password)) {
        
            console.log(chalk.rgb(44,249,222)("\nADMIN PASSWORD CORRECT. ACCESS GRANTED.\n"));
        
            community.adminLoggedIn = true;
        
        } else {
        
            console.log(chalk.red("\nINCORRECT PASSWORD. PLEASE TRY AGAIN.\n"));
        
        }
    }

    
    while (true) {
    
        console.log(chalk.rgb(0,255,127)("\n\t\tWELCOME TO THE COMMUNITY PORTAL\n"));

        const mainMenu = await inquirer.prompt([
    
            {
    
                name: "Select",
    
                type: "list",
    
                message: "\nPLEASE SELECT AN OPTION",
    
                choices: community.adminLoggedIn ? ["ADMIN", "USER", "EXIT"] : ["ADMIN", "USER", "EXIT"]
            }
        ]);

        switch (mainMenu.Select) {

            case "ADMIN":

            console.log(chalk.blue("\n\t\tYOU HAVE ENTERED THE ADMIN AREA.\n"));

                // Add admin functionality here

                break;


                case "USER":

                const userAction = await inquirer.prompt([

                    {

                        name: "action",

                        type: "list",

                        message: "\nPLEASE SELECT AN ACTION",

                        choices: ["ADD USER", "VIEW USER", "BACK"]

                    }
                ]);

                if (userAction.action === "ADD USER") {
                
                    const userAnswer = await inquirer.prompt([
                
                        {
                
                            name: "member",
                
                            type: "input",
                
                            message: "\nENTER USER NAME",
                
                            validate: (input) => input ? true : "USER NAME CANNOT BE EMPTY"
                
                        }
                
                    ]);


                    console.log(chalk.rgb(255,0,255)("\n\t\tYOU HAVE ENTERED THE USER AREA.\n\t\t"));
                    let member = community.findMember(userAnswer.member);

                    if (!member) {
                
                        let newMember = new Member(userAnswer.member);
                
                        community.addMember(newMember);


                
                        console.log(chalk.rgb(244,164,96)(`\nHELLO, I AM ${newMember.name}. NICE TO MEET YOU.`));

                        console.log(chalk.rgb(204,153,255)("\n\n\t\tNEW USER ADDED.\n"));

                        console.log(chalk.yellow("\nCURRENT USER LIST:"));

                        console.log(community.listMembers());

                    } else {

                        console.log(chalk.rgb(240,230,140)(`\nHELLO, I AM ${member.name}. NICE TO MEET YOU AGAIN.`));

                        console.log(chalk.yellow("\nEXISTING USER LIST:"));

                        console.log(community.listMembers());

                    }

               
                } else if (userAction.action === "VIEW USER") {
               
                    const viewAnswer = await inquirer.prompt([
               
                        {
               
                            name: "member",
               
                            type: "input",
               
                            message: "\nENTER USER NAME TO VIEW",
           
                            validate: (input) => input ? true : "USER NAME CANNOT BE EMPTY"
           
                        }
                    ]);

               
                    let member = community.findMember(viewAnswer.member);

                    if (member) {
               
                        console.log(chalk.green(`\nUSER  ${member.name}  IS FOUND. `));
               
                    } else {
                        console.log(chalk.red(`\nUSER NOT FOUND: ${viewAnswer.member}`));
                    }
               
                }
               
                break;

            case "EXIT":
               
            console.log(chalk.red("\nEXITING THE PROGRAM...."));
           
                
console.log(chalk.rgb(25,25,112)("\n PRESENTING  BY  ABDUL  REHMAN\n"));

                return; // Exit the function to stop the loop


                
            default:
                
            console.log(chalk.red("\nINVALID OPTION SELECTED."));

        }
    }
};

// Start the program

startProgram(community);
