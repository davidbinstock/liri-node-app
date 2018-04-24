require("dotenv").config();
var Twitter = require("twitter");
var Spotify = require("node-spotify-api")
var request = require("request");
var fs = require("fs");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var commandEntered = process.argv[2];
var textEntered = process.argv.slice(3).reduce(function(final,val, ind, arr){
    return final += " "+val
},"").trim();
//console.log("Title Entered:", titleEntered)
resolveCommand(commandEntered, textEntered);

function resolveCommand(command, text){
    if(command == "my-tweets"){
        console.log("You have chosen: my-tweets")
        getTweets();
    }else if(command == "tweet-this"){
        postTweet(text);
    }else if(command == "spotify-this-song"){
        console.log("You have chosen: spotify-this-song")
        searchSong(text);
    }else if(command == "movie-this"){
        console.log("You have chosen: movie-this")
        searchMovie(text);
    }else if(command == "do-what-it-says"){
        console.log("You have chosen: do-what-it-says\n")
        var data = fs.readFileSync("./random.txt", "utf8") 
        //console.log(data);
        newArgs = data.split(",");
        newCommand = newArgs[0];
        newTitle = newArgs[1];
        resolveCommand(newCommand, newTitle);
    }else {
        console.log("Please enter a proper command")
    }
}

function getTweets(){
    console.log("Here are your last 20 Tweets")
        
    //create the query parameters to be used in the "GET" call below
    // screen_name is my twitter handle, count is the upper limit of tweets to return 
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
}
function postTweet(message){
    if(!message){
        console.log("No message to tweet was entered")
        return;
    }    
    //create the query parameters to be used in the "GET" call below
    // screen_name is my twitter handle, count is the upper limit of tweets to return 
    // note: if you hae less tweets than "count" it will just return all your tweets
    var params = {
        status: message
    };
    //submit "GET" request to twitter API, process data in callback function
    client.post('statuses/update', params, function(error, tweet) {
        if (!error) {
            console.log("Tweet posted!!")
        }
    });
}

function searchSong(song){
    if(!song){
        console.log("No song was entered...")
        return;
    }
    spotify
    .search({ type: 'track', query: song })
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
}

function searchMovie(movie){
    if(!movie){
        console.log("No movie was entered...")
        return;
    }
    request("http://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy", function(error, response, body) {

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
}

module.exports = {
    resolveCommand: resolveCommand
}

// move functions to seperate file and export?
// log data to .txt file
// if no arguments are given, or arguments are written incorrectly, use inquirer to navigate
// create loop that allows you to enter new command? - prompt?
// parse twitter created time to get rid of +0000
// parse OMDB movie year
// add colors (animations?) and make pretty

// command was not recognized, would you like to use liri prompt mode? 
//   Y - takes you into inquirere prompt mode
//   N - takes you back to command line
// can also add command "liri-prompt-mode" which takes you to inquirer prompt mode