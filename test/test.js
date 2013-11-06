var Client = require('github');
var config = require('../config.json');
var github = new Client({
    // debug: true,
    version: "3.0.0"
});

github.authenticate({
    type: "basic",
    username: config.github.username,
    password: config.github.password
});

var user = process.argv[2];
console.log('User: %s',user);

var languages = {};

github.repos.getFromUser({user: user}, function(err, res) {
    if(err) {
        console.log("ERR:", err);        
    }
    for (var i = 0, j = res.length; i < j; i += 1) {
        // console.log(res[i].language)
        if(languages[res[i].language]>0){
            languages[res[i].language] += 1;
        } else {
            languages[res[i].language] = 1;
        }           
    }
    delete languages[null]; // null values are useless

    // sort the list of languages by frequency:
    var keysSorted = Object.keys(languages).sort(function(a,b) {
        return languages[b] - languages[a]
    })
    var favLang = keysSorted[0]
    console.log("Favorite Language: %s (%s repos)", favLang, languages[favLang] );
    console.log("\nIn Decending Order: ");
    for (var i = 0, j = keysSorted.length; i < j; i += 1) {
        console.log(keysSorted[i] +" : " +languages[keysSorted[i]]);          
    }
    // console.log(languages);
});
