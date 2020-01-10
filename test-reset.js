
const axios = require("axios");
const inquirer = require("inquirer");

inquirer
    .prompt([
        {
            type: "input",
            message: "Enter your GitHub username",
            name: "username"
        },
        {
            type: "list",
            message: "What is your favorite color?",
            choices: ["red", "orange", "yellow", "green", "blue", "purple", "pink"],
            name: "favorite_color"
        }
    ])
    .then(function (prompt) {
        const queryUrl = `https://api.github.com/users/${prompt.username}?per_page=100`;
        axios.get(queryUrl).then(function (res) {
            //Reset Variables
            const name = res.data.name;
            const imgUrl = res.data.avatar_url;
            console.log("done");
        });
        console.log("done");

    });


