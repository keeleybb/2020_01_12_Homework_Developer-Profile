
//Make the HTML with profile from index.js
function generateHTML(profile) {

  // console.log("Other file: ", profile);
  return `<!DOCTYPE html>
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
      background-color:${profile.fav_color};
      margin:10px;
    }

    .header{
      background-color:${profile.fav_color};
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
            <img class="profile-img" src="${profile.imgUrl}" />
            <h1>Hi!</h1>
            <h1>My name is ${profile.name}</h1>
            <h3>Currently at ${profile.job}</h3>
            <p><i class="fas fa-map-marked-alt"></i><a href="https://www.google.com/maps/place/${profile.location}">${profile.location}</a>
             <i class="far fa-user-circle"></i><a href="${profile.blog}">Blog</a>
              <i class="fab fa-github"></i><a href="${profile.mainUrl}">GitHub</a></p>
          </div>
        </div>
        <div class="row">
          <div class="col">
            <p class="bio-class">${profile.bio}</p>
          </div>
        </div>
        <div class="row">
          <div class="col card">
            <p>Public Repositories</p>
            <p>${profile.pub_repos}</p>
          </div>
          <div class="col card">
            <p>Followers</p>
            <p>${profile.followers}</p>
          </div>
        </div>
        <div class="row">
            <div class="col card">
              <p>GitHub Stars</p>
              <p>${profile.starred}</p>
            </div>
            <div class="col card">
              <p>Following</p>
              <p>${profile.following}</p>
            </div>
          </div>
      </div>
    </body>
    <script src="https://kit.fontawesome.com/1a27f6d0f7.js" crossorigin="anonymous"></script>
  </html>`;
};

module.exports = generateHTML;