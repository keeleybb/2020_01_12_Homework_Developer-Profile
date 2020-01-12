
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");
const pdf = require('html-pdf');
const generateHTML = require('./generateHTML')


const questions = [
    {
        type: "input",
        message: "Enter your GitHub username",
        name: "username"
    },
    {
        type: "list",
        message: "What is your favorite color?",
        choices: ["red", "orange", "yellow", "green", "blue", "purple", "pink", "hotpink", "teal"],
        name: "favorite_color"
    }
];

inquirer
    .prompt(questions)
    .then(async function (prompt) {
        const queryUrl = `https://api.github.com/users/${prompt.username}`;
        let { data } = await axios.get(queryUrl)
        // console.log(res.data);

        //Create Object with all variables
        let profile = {
            name: data.name,
            imgUrl: data.avatar_url,
            location: data.location,
            pub_repos: data.public_repos,
            followers: data.followers,
            following: data.following,
            blog: data.blog,
            mainUrl: data.html_url,
            bio: data.bio,
            job: data.company,
            fav_color: prompt.favorite_color,
            starred: 0
        }
        //Second API call for starred items
        const queryUrl2 = `https://api.github.com/users/${prompt.username}/starred?per_page=100`;
        axios.get(queryUrl2).then(function (response) {

            // console.log(response.data);
            let numHolder = parseInt(response.data.length);
            console.log(numHolder);
            profile.starred = numHolder;

        }).then(function () {
            // console.log(profile);
            module.export = profile;

            fs.writeFile("index.html", generateHTML(profile), function (err) {
                if (err) {
                    throw err;
                }

                makepdf();
            });
        });
    }).catch(function (error) {
        console.log("Error: ", error);
    });


function makepdf() {
    var html = fs.readFileSync('./index.html', 'utf8');
    var options = { format: 'A4' };

    pdf.create(html, options).toFile('./profile.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); //return file name
    });
};


