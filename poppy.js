
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
//Maybe put variables here to be rewritten
// let name;
// let imgUrl;
// let location;
// let pub_repos;
// let followers;
// let following;
// let starred;
// let blog;
// let mainUrl;
// let bio;
// let job;

inquirer
  .prompt(questions)
  .then(async function (prompt) {
    const queryUrl = `https://api.github.com/users/${prompt.username}`;
    let { data } = await axios.get(queryUrl)
    // console.log(res.data);
    // console.log("Img Url ", res.data.avatar_url);
    // console.log("Name: ", res.data.name);
    // console.log("Location: ", res.data.location);
    // console.log("Repositories: ", res.data.public_repos);
    // console.log("Followers: ", res.data.followers);
    // console.log("Following: ", res.data.following);
    // console.log(data);
    //Reset Variables
    let profile = {
      name: data.name,
      imgUrl: data.avatar_url,
      location: data.location,
      pub_repos: data.public_repos,
      followers: data.followers,
      following: data.following,
      // fav_color = prompt.favorite_color,
      blog: data.blog,
      mainUrl: data.html_url,
      bio: data.bio,
      job: data.company,
      fav_color: prompt.favorite_color,
      starred: 0
    }

    const queryUrl2 = `https://api.github.com/users/${prompt.username}/starred?per_page=600`;
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




// // //Make the HTML to get started 

// function generateHTML(data) {
//   return `
//             <!DOCTYPE html>
//             <html lang="en">
//               <head>
//                 <meta charset="UTF-8" />
//                 <meta http-equiv="X-UA-Compatible" content="ie=edge" />
//                 <link
//                   rel="stylesheet"
//                   href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
//                 />
//                 <title>Document</title>
//               </head>
//               <style>

//               *{
//                 text-align:center;
//                 border: 0;
//                 margin: 10px;
//                 padding: 0;
//                 color: #FFFFFF;
//               }
//               body {
//                 background-image: linear-gradient(180deg, #a390c2 13.79%, #d5d2d9 13.79%, #d5d2d9 36.21%, #a390c2 36.21%, #a390c2 50%, #a390c2 50%, #a390c2 63.79%, #d5d2d9 63.79%, #d5d2d9 86.21%, #a390c2 86.21%, #a390c2 100%);
//                 background-size: 2900.00px 2900.00px;
//                 height: 1002px;
//               }

//               .pdfwidth {
//                   width: 750px;
//                   margin-top: 100px;
//               }

//               .card {
//                 background-color:{fav_color};
//                 margin:10px;
//               }

//               .header{
//                 background-color:{fav_color};
//                 border-radius: 10px;
//               }

//               .profile-img {
//                 width: 200px;
//                 border-radius: 50%;
//                 border: 5px solid #daa520;
//                 margin-top: -70px; 
//               }

//               p {
//                 font-size: 24px;
//                 font-weight:bold;
//               }

//               a {
//                 color: #FFFFFF;
//                 font-size: 20px;
//                 font-weight:bold;
//               }
//               .bio-class {
//                 font-size: 18px;
//                 color: #080808;
//                 font-weight: normal;
//               }

//               </style>
//               <body>
//                 <div class="pdfwidth">
//                   <div class="row">
//                     <div class="col header">
//                       <img class="profile-img" src="{imgUrl}" />
//                       <h1>Hi!</h1>
//                       <h1>My name is ${data.name}</h1>
//                       <h3>Currently at {job}</h3>
//                       <p><i class="fas fa-map-marked-alt"></i><a href="https://www.google.com/maps/place/{location}">{location}</a>
//                        <i class="far fa-user-circle"></i><a href="{blog}">Blog</a>
//                         <i class="fab fa-github"></i><a href="{mainUrl}">GitHub</a></p>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col">
//                       <p class="bio-class">bio}</p>
//                     </div>
//                   </div>
//                   <div class="row">
//                     <div class="col card">
//                       <p>Public Repositories</p>
//                       <p>{pub_repos}</p>
//                     </div>
//                     <div class="col card">
//                       <p>Followers</p>
//                       <p>$followers}</p>
//                     </div>
//                   </div>
//                   <div class="row">
//                       <div class="col card">
//                         <p>GitHub Stars</p>
//                         <p>$starred}</p>
//                       </div>
//                       <div class="col card">
//                         <p>Following</p>
//                         <p>$following}</p>
//                       </div>
//                     </div>
//                 </div>
//               </body>
//               <script src="https://kit.fontawesome.com/1a27f6d0f7.js" crossorigin="anonymous"></script>
//             </html>
//             `;
// };


function makepdf() {
  var html = fs.readFileSync('./index.html', 'utf8');
  var options = { format: 'A4' };

  pdf.create(html, options).toFile('./profile.pdf', function (err, res) {
    if (err) return console.log(err);
    console.log(res); //return file name
  });
};


