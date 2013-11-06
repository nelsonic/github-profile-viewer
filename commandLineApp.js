var FL = require('./lib.js');                   // our module
var username = process.argv[2] || "torvalds";   // command-line argument
console.log("User: %s ",username);

FL.getListOfLanguagesForUser(username, function(languages){
    console.log('Languages: %s \n', JSON.stringify(languages));
});
setTimeout(function(){
FL.getFavoriteLanguageForUser(username, function(favLang) {
    console.log(">> Favorite Language: %s \n", favLang);    
});
},500);
