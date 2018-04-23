require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

if(command == "my-tweets"){
    console.log("Here are your last 20 Tweets")
    
    var params = {
        screen_name: 'dbafcwts',
        count: 20
    };
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            tweets.forEach(function(val, ind, arr){
                console.log("\n           ", ind+1 )
                console.log("--------------------------")
                console.log("Tweet:   ", val.text);
                console.log("Created: ", val.created_at);
            })
        }
    });
}else if(command == "spotify-this-song"){
    console.log("You have chosen: spotify-this-song")
}else if(command == "movie-this"){
    console.log("You have chosen: movie-this")
}else if(command == "do-what-it-says"){
    console.log("You have chosen: do-what-it-says")
}else {
    console.log("Please enter a proper command")
}

