var FL = require('./lib.js');  // our module
console.log(FL);

var username = "douglascrockford";

var favoriteLanguage = FL.getFavoriteLanguageForUser(username);
console.log(favoriteLanguage);