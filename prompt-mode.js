var inquirer = require("inquirer");
var liri = require("./liri.js")

usePromptMode();

function usePromptMode(){
    inquirer
        .prompt([
            {
                type: "list",
                message: "That command was not recognized. Would you like to use LIRI's prompt mode?",
                choices: [
                    {
                        name: "Yes",
                        value: true
                    },
                    {
                        name: "No",
                        value: false
                    }
                ],
                name: "usePrompt"
            }
        ])
        .then(function(response){
            if(response.usePrompt){
                mainMenu();
            }else{
                console.log("Ok! Try entering a different command and check your spelling\nThese are the availble commands:\nmy-tweets\ntweet-this <message to post>\nspotify-this-song <song name>\nmovie-this <movie title>\ndo-what-it-says")
            }
        })
}

function mainMenu(){
    console.log("Welcome to the main menu!")
    inquirer
        .prompt([
            {
                type: "list",
                message: "What would you like to do?",
                choices: [
                    {
                        name: "Read my tweets",
                        value: 1
                    },
                    {
                        name: "Post a tweet",
                        value: 2
                    },
                    {
                        name: "Look up a song",
                        value: 3
                    },
                    {
                        name: "Look up a movie",
                        value: 4
                    },
                    {
                        name: "Do what it says (random)",
                        value: 5
                    },
                    {
                        name: "Escape",
                        value: 6
                    }
                ],
                name: "action"
            }
        ])
        .then(function(response){
            if(response.action == 1){
                callLiri("my-tweets").then(function(){console.log("will this")})
            }else if(response.action == 2){
                liri.resolveCommand("my-tweets")
            
            }else if(response.action == 3){
                liri.resolveCommand("my-tweets")
            
            }else if(response.action == 4){
                liri.resolveCommand("my-tweets")
            
            }else if(response.action == 5){
                liri.resolveCommand("my-tweets")
            
            }else if(response.action == 6){
                console.log("Ok. Bye")
            }else{
                console.log("hmmmm")
            }
            
        })
}

function callLiri(command, text){
    var newPromise = new Promise(function(resolve, reject){
        resolve(liri.resolveCommand(command, text));
    })
    return newPromise;
}