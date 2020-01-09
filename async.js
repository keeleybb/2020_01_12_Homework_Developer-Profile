
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
let fav_color;
let blog;
let mainUrl;
let bio;

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
  .then(async function (prompt) {
    const queryUrl = `https://api.github.com/users/${prompt.username}`;
    await axios.get(queryUrl).then(function (res) {
      // console.log(res.data);
      // console.log("Img Url ", res.data.avatar_url);
      // console.log("Name: ", res.data.name);
      // console.log("Location: ", res.data.location);
      // console.log("Repositories: ", res.data.public_repos);
      // console.log("Followers: ", res.data.followers);
      // console.log("Following: ", res.data.following);

      //Reset Variables
      name = res.data.name;
      imgUrl = res.data.avatar_url;
      location = res.data.location;
      pub_repos = res.data.public_repos;
      followers = res.data.followers;
      following = res.data.following;
      fav_color = prompt.favorite_color;
      blog = res.data.blog;
      mainUrl = res.data.html_url;
      bio = res.data.bio;
      gitHubProfile = name + "\n" + location;


      const queryUrl2 = `https://api.github.com/users/${prompt.username}/starred`;
      await axios.get(queryUrl2).then(function (response) {

        // console.log(response.data);
        console.log("Starred: ", response.data.length);
        let numHolder = parseInt(response.data.length);
        console.log(numHolder);
        starred = numHolder;
      })
      await function () {
        fs.writeFile("index.html", generateHTML(), function (err) {
          if (err) {
            throw err;
          }

          console.log(`Saved ${gitHubProfile} repos`);
          // generateHTML();
          makepdf();
        })
      }
    }).catch(function (error) {
      console.log(error.response);
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
              <style>
            
              *{
                text-align:center;
                border: 0;
                margin: 10px;
                padding: 0;
                color: #FFFFFF;
              }
              body {
                background-image: linear-gradient(180deg, #a390c2 13.79%, #d5d2d9 13.79%, #d5d2d9 36.21%, #a390c2 36.21%, #a390c2 50%, #a390c2 50%, #a390c2 63.79%, #d5d2d9 63.79%, #d5d2d9 86.21%, #a390c2 86.21%, #a390c2 100%);
                background-size: 2900.00px 2900.00px;
                height: 1002px;
              }

              .pdfwidth {
                  width: 750px;
                  margin-top: 100px;
              }
                
              .card {
                background-color:${fav_color};
                margin:10px;
              }
              
              .header{
                background-color:${fav_color};
                border-radius: 10px;
              }

              .profile-img {
                width: 200px;
                border-radius: 50%;
                border: 5px solid #daa520;
                margin-top: -70px; 
              }

              p {
                font-size: 24px;
                font-weight:bold;
              }

              a {
                color: #FFFFFF;
                font-size: 20px;
                font-weight:bold;
              }
              .bio-class {
                font-size: 18px;
                color: #080808;
                font-weight: normal;
              }

              </style>
              <body>
                <div class="pdfwidth">
                  <div class="row">
                    <div class="col header">
                      <img class="profile-img" src="${imgUrl}" />
                      <h1>Hi!</h1>
                      <h1>My name is ${name}</h1>
                      <h3>Currently at </h3>
                      <p><a href="https://www.google.com/maps/place/${location}">${location}</a>
                      | <a href="${blog}">Blog</a>
                       | <a href="${mainUrl}">GitHub</a></p>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col">
                      <p class="bio-class">${bio}</p>
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
            `;
}


function makepdf() {
  var pdf = require('html-pdf');
  var html = fs.readFileSync('./index.html', 'utf8');
  var options = { format: 'A4' };

  pdf.create(html, options).toFile('./profile.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); // { filename: '/app/businesscard.pdf' }
  });
};
