require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var request = require("request");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var command = process.argv[2];

if(command == "my-tweets"){
    console.log("Here are your last 20 Tweets")
    
    //create the query parameters to be used in the "GET" call below
    // screen_name is my twotter handle, count is the upper limit of tweets to return 
    // note: if you hae less tweets than "count" it will just return all your tweets
    var params = {
        screen_name: 'dbafcwts',
        count: 20
    };
    //submit "GET" request to twitter API, process data in callback function
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            //console.log(tweets);
            // for each tweet, return the text and the time at which it was created
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
    var enteredSong = process.argv.slice(3).reduce(function(final,val, ind, arr){
        return final += " "+val
    },"").trim();
    console.log(enteredSong)
    if(!enteredSong){
        console.log("No song was entered...")
        return;
    }
    spotify
        .search({ type: 'track', query: enteredSong })
        .then(function(response) {
            // response = JSON.stringify(response);
            console.log("Track Name:   ", response.tracks.items[0].name);
            console.log("Artist :      ",response.tracks.items[0].artists[0].name);
            console.log("Album :       ", response.tracks.items[0].album.name);
            console.log("Preview link: ",response.tracks.items[0].preview_url);
        })
        .catch(function(err) {
            console.log(err);
        });

}else if(command == "movie-this"){
    console.log("You have chosen: movie-this")
    var enteredMovie = process.argv.slice(3).reduce(function(final,val, ind, arr){
        return final += " "+val
    },"").trim();
    console.log(enteredMovie)
    if(!enteredMovie){
        console.log("No movie was entered...")
        return;
    }
    request("http://www.omdbapi.com/?t="+enteredMovie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

        // If the request is successful (i.e. if the response status code is 200)
        if (!error && response.statusCode === 200) {
            bodyObj = JSON.parse(body);
            // Parse the body of the site and recover just the data needed
            //console.log(bodyObj)
            console.log("Movie Title:      " + bodyObj.Title);
            console.log("Release Date :    " + bodyObj.Released);
            console.log("IMDB Rating:      " + bodyObj.imdbRating);
            console.log("Rotten Tomatoes:  " + bodyObj.Ratings[1].Value);
            console.log("Counry :          " + bodyObj.Country);
            console.log("Language :        " + bodyObj.Language);
            console.log("Plot :            " + bodyObj.Plot);
            console.log("Actors :          " + bodyObj.Actors);
        }
    });
}else if(command == "do-what-it-says"){
    console.log("You have chosen: do-what-it-says")
}else {
    console.log("Please enter a proper command")
}

