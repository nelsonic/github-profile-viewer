var chai = require('chai');
var assert = chai.assert; 
var FL = require('../lib.js');  // our module

describe('GitHub User Favorte Language', function(){
  describe('Module FL', function(){

    it('should have a getListOfLanguagesForUser Method', function(){
      assert.equal(typeof FL, 'object');
      assert.equal(typeof FL.getListOfLanguagesForUser, 'function');
    })

    it('FL.getListOfLanguagesForUser("torvalds") should contain "C"', function(){
        var username = "torvalds"; 
        FL.getListOfLanguagesForUser(username, function(languages){
            console.log('languages'+languages);
            assert.equal(languages.hasOwnProperty('C'), true);
        });
    })

    it('should have a getFavoriteLanguageForUser Method', function(){
      assert.equal(typeof FL.getFavoriteLanguageForUser, 'function');
    })

    it('FL.getFavoriteLanguageForUser("douglascrockford") should return "JavaScript"', function(){
        var username = "douglascrockford";
        FL.getFavoriteLanguageForUser(username, function(favLang){
            assert.equal(favLang, 'JavaScript');
        });
    })

    it('FL.getFavoriteLanguageForUser("fakeuser") should return "undefined"', function(){
        var username = "fakeuser";
        FL.getFavoriteLanguageForUser(username, function(favLang){
            assert.equal(favLang, 'undefined');
        });
    })

  })
}) 