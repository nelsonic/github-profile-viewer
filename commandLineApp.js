var FL = require('./lib.js');                   // our module
var username = process.argv[2] || "torvalds";   // command-line argument
console.log("User: %s ",username);

FL.getListOfLanguagesForUser(username, function(languages){
    console.log('\nLanguages: ' +JSON.stringify(languages));
});

FL.getFavoriteLanguageForUser(username, function(favLang) {
    console.log("\n>> Favorite Language: ", favLang);    
});