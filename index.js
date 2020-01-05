const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

//Maybe put variables here to be rewritten

inquirer
    .prompt({
        message: "Enter your GitHub username",
        name: "username"
    })
    .then(function ({ username }) {
        const queryUrl = `https://api.github.com/users/${username}`;
        axios.get(queryUrl).then(function (res) {
            console.log(res.data);
            console.log("Img Url ", res.data.avatar_url);
            console.log("Name: ", res.data.name);
            console.log("Location: ", res.data.location);
            console.log("Repositories: ", res.data.public_repos);
            console.log("Followers: ", res.data.followers);
            console.log("Following: ", res.data.following);

            const queryUrl2 = `https://api.github.com/users/${username}/starred`;
            axios.get(queryUrl2).then(function (response) {
                // console.log(response.data);
                console.log("Starred: ", response.data.length);
            });
        });
    });