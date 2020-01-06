
const fs = require("fs");
const axios = require("axios");
const inquirer = require("inquirer");

//Maybe put variables here to be rewritten
let name;
let imgUrl;
let location;
let pub_repos;
let followers;
let following;
let starred;
let gitHubProfile;

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

            //Reset Variables
            name = res.data.name;
            imgUrl = res.data.avatar_url;
            location = res.data.location;
            pub_repos = res.data.public_repos;
            followers = res.data.followers;
            following = res.data.following;
            gitHubProfile = name + "\n" + location;

            const queryUrl2 = `https://api.github.com/users/${username}/starred`;
            axios.get(queryUrl2).then(function (response) {
                // console.log(response.data);
                console.log("Starred: ", response.data.length);
                let numHolder = parseInt(response.data.length);
                console.log(numHolder);
                starred = numHolder;

            }).then(function () {
                fs.writeFile("index.html", generateHTML(), function (err) {
                    if (err) {
                        throw err;
                    }

                    console.log(`Saved ${gitHubProfile} repos`);
                    // generateHTML();
                });
            });
        });
    });



//Make the HTML to get started 

function generateHTML() {
    return `
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="ie=edge" />
                <link
                  rel="stylesheet"
                  href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
                />
                <title>Document</title>
              </head>
              <body>
                <div class="container">
                  <div class="row">
                    <div class="col header">
                      <img src="${imgUrl}" />
                      <h1>Hi!</h1>
                      <h1>My name is ${name}</h1>
                      <h3>Currently at </h3>
                      <p>${location}</p>
                      <a href=#>Blog</a>
                      <a href=#>GitHub</a>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p></p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col card">
                      <p>Public Repositories</p>
                      <p>${pub_repos}</p>
                    </div>
                    <div class="col card">
                      <p>Followers</p>
                      <p>${followers}</p>
                    </div>
                  </div>
                  <div class="row">
                      <div class="col card">
                        <p>GitHub Stars</p>
                        <p>${starred}</p>
                      </div>
                      <div class="col card">
                        <p>Following</p>
                        <p>${following}</p>
                      </div>
                    </div>
                </div>
              </body>
            </html>
            <style>
            
            *{
              text-align:center;
             
            }
              
            .card {
              background-color:red;
              margin:10px;
              
            }
            
            .header{
              background-color:red;
            }
            
            </style>
            `;
}
