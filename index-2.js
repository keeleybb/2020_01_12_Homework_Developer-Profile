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
    .prompt(questions).then(function (prompt) {
        const queryUrl = `https://api.github.com/users/${prompt.username}`;
        axios.get(queryUrl).then(function (res) {
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
            job = res.data.company;
            gitHubProfile = name + "\n" + location;

            const queryUrl2 = `https://api.github.com/users/${prompt.username}/starred?per_page=100`;
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
                    makepdf();
                });
            });
        }).catch(function (error) {
            console.log("Error: ", error);
        });
    });




function writeToFile(fileName, data) {

}

function init() {
}

init();
