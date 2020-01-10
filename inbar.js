
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
    .then(function (prompt) {
        const queryUrl = `https://api.github.com/users/${prompt.username}`;
        axios.get(queryUrl).then(function (res) {
            // if (error) {
            //   console.log("Error ", error);
            // }
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
                    makepdf();
                });
            });
        }).catch(function (error) {
            console.log("Error: ", error);
        });
    });



//Make the HTML to get started 

function generateHTML() {
    return `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <link rel = "stylesheet" href = "assets/reset.css">  
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
      <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
      <link rel = "stylesheet" href = "node_modules/@fortawesome/fontawesome-free/css/all.css">
      <link href="https://fonts.googleapis.com/css?family=Darker+Grotesque&display=swap" rel="stylesheet">
      <link rel = "stylesheet" href = "assets/style.css">  
  <title>GitHub User Profile PDF</title>
  </head>
  <body style="background-color:#000;">
      <div class="container justify-content-center">
          <div class="avatar justify-content-center">
              <img src="${imgUrl}" id='avatarImg'/>
          </div>
          <div class="container textContainer row justify-content-center">
              <span>
                  <h2 style="color:#">Hi!</h2>
                  <h3>My name is #</h3>
                  <h5>Currently @ $#</h5>
                  <a href="https://www.google.com/maps/place/#"><i class="fas fa-location-arrow"></i><span class="location_link">#</span></a>
                  <a href="#"><span class="github_link"><i class="fab fa-github-alt"></i> Github</span></a>
                  <a href="#"><span class="linkedin_link"><i class="fas fa-rss"></i> Blog</span></a>
                  <h5>#</h5>
              </span>
          </div>
      </div>
      
      <div class="cardContainer">
          <div class="cards">
              <div class="row justify-content-center">
                  <div class="col card">
                      <h4 style="color:#000">Public Repos</h4>
                      <h5>#</h5>
                  </div>
                  <div class="col card">
                      <h4 style="color:#000">Followers</h4>
                      <h5>#</h5>
                  </div>
              </div>
              <div class="row justify-content-center">
                  <div class="col card">
                      <h4 style="color:#">Following</h4>
                      <h5>#</h5>
                  </div>
                  <div class="col card">
                      <h4 style="color:#000">Stars</h4>
                      <h5>0</h5>
                  </div>
              </div>
          </div>
      </div>
  </body>
  </html>`;
}


function makepdf() {
    var pdf = require('html-pdf');
    var html = fs.readFileSync('./index.html', 'utf8');
    var options = { format: 'A4' };

    pdf.create(html, options).toFile('./profile.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res); //return file name
    });
};
