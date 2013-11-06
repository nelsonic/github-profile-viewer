var Client = require('github') 
var github = new Client({ version: "3.0.0"});
 
var FL = {};  // Favorite Language (FL) Module

FL.getListOfLanguagesForUser = function(username, callback) {
    var languages = {}; // used to store the language tally

    github.repos.getFromUser({user: username}, function(err, res) {
        if(err) {
            console.log("ERR:", err);        
        }
        for (var i = 0, j = res.length; i < j; i += 1) {
            // keep a tally of the frequency of language
            if(languages[res[i].language] > 0){
                languages[res[i].language] += 1;
            } else {
                languages[res[i].language] = 1;
            }           
        }
        delete languages[null]; // disguard null values
        callback(languages);
    });
}

FL.getFavoriteLanguageForUser = function(username, callback) {
    FL.getListOfLanguagesForUser(username, function(languages){
        // sort the list of languages by frequency:
        var keysSorted = Object.keys(languages).sort(function(a,b) {
            return languages[b] - languages[a]
        })
        var favLang = keysSorted[0];
        callback(favLang);
    });
}

module.exports = FL;