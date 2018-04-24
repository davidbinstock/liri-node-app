# liri-node-app
### This node program is sort of like SIRI (from the iPhone), except infinitely worse. It can except a handful of commands that perform a weird and limited array of functions. It makes use of severl APIs (Twitter, Spotify, OMDB), as well as various node packages (request, dotenv, twitter, and node-spotify-api).


### Instructions:
* use the program via the command line with node
* type "node liri.js \<*command*> \<*parameters*> "

### Commands Available:
* "my-tweets"
    * returns your last 20 tweets
    * does NOT take in any additional parameters
    * No... you can't change the number of tweets returned - we picked 20 after careful research with many focus groups...
    * No... you can't read anyone else's tweets. Go on twitter if you want to do that
* "tweet-this \<*message to tweet*>" 
    * tweets the message entered to your twitter account
    * message does not need to be encased in quotation marks, just type in the message as you want it to be tweeted
    * be carefull!! typing two exclamation points (!!) in the command line will concatenate your previous line command into your current command
* "spotify-this-song" \<*song name*>" 
    * returns information about the song entered
    * song name does not need to be encased in quotation marks (e.g. you can just type: *while my guitar gently weeps*)
    * try singing into the computer and see what happens!! Be patient, it may take a while!
* "movie-this" \<*movie title*>" 
    * returns information about the movie entered
    * movie title does not need to be encased in quotation marks (e.g. you can just type: *o brother where art thou*)
* "do-what-it-says"
    * does one of the following above, based on the contents of the "random.txt" file
    * does NOT take in any additional parameters



### Notes
* Still want to add additional formating and colorizing features
* am attempting to create a prompt mode, that allows the user to use the program through prompts (via the inquirer npm). I would like it to keep you in the program untill you opt to "escape"
* did not yet attempt to create a "log" file.
