github-profile-viewer [![Build Status](https://travis-ci.org/nelsonic/github-profile-viewer.png?branch=master)](https://travis-ci.org/nelsonic/github-profile-viewer) [![Dependencies](https://david-dm.org/nelsonic/github-profile-viewer.png)](https://david-dm.org/nelsonic/github-profile-viewer)
=====================

A simple command-line &amp; web app that displays preferred programming language for a given GitHub user

- - -

## Quick Start 

If you want to try out this on your own machine, simply clone this repo:

```sh
git clone git@github.com:nelsonic/github-profile-viewer.git
cd github-profile-viewer
npm install
```

### Confirm its Working by Running the Unit Tests

Test that everything is working by running:

```sh
npm test
```
You should expect to see something like:

![istanbul tests passing](http://i.imgur.com/bOZAlQb.png "tests passing")


### A. Simple Command Line App

Now you can run commands on the command line (username is an 
*arbitrary* GitHub username of your chosing:

```sh
node commandLineApp username
```

Here are a few examples of known users we can test with:

![a few examples](http://i.imgur.com/tpARRpB.png "sample output from command line app")





### Original Brief

> Build a simple **web** *or* **command line** **app**lication, which should 
> allow users to **enter** an *arbitrary* **GitHub username**, 
> and be presented with a **best guess** of the GitHub user's 
> **favourite** programming **language**.

> This can be computed by using the GitHub API to fetch all of the user's 
> public GitHub repos, each of which includes the name of the dominant 
> language for the repository.

> Documentation for the GitHub API can be found at http://developer.github.com

- - -

### Detailed Solution Steps / Documentation

#### Keeping it Simple

Let's start with something simple: a command-line app.
We can progress to a more interesting web-app once we prove the concept.

#### Testing (TDD)

I will be using **Mocah** TDD/BDD for this mini-project, 
if you are new to Mocha, check out my *Mocha Tutorial*: 
https://github.com/nelsonic/learn-mocha

First we need to create our `package.json` file and list Mocha as a 
**dev**elopment **dependency** (**devDependencies** mean that the modules are
only used during the development/testing of your app and not in production)

Create the ./**test** directory and ./test/**test.js** file to house our 
unit tests. (We will begin adding tests shortly. see below.)

```sh
mkdir test && touch ./test/test.js
```

#### Building on the Shoulders

Next we add the dependency to our chose node.js GitHub module (**node-github**)
and run `npm install` to download all the dependencies.
(**tip**: I have mocha installed globally `npm install -g mocha` for 
simplicity so I don't have to reference a local module)

A good way to learn how to use someone else's module is **review** the 
**unit tests** they wrote for the project. 

In our case the 3<sup>rd</sup> party module is **node-github**:
https://github.com/ajaxorg/node-github/tree/master/test

Using the **getFromUser** method, the following test 
script returns *exactly* the result we need:

```javascript
var Client = require('github');

var github = new Client({
    debug: true,
    version: "3.0.0"
});

github.repos.getFromUser({user: "nelsonic"}, function(err, res) {
    console.log("GOT ERR?", err);
    // console.log("GOT RES?", res);
    for (var i = 0, j = res.length; i < j; i += 1) {
        console.log(res[i].language)
    }
});
```

Outputs:

```javascript
JavaScript
Ruby
PHP
PHP
null
C++
JavaScript
JavaScript
CoffeeScript
JavaScript
null
JavaScript
null
JavaScript
JavaScript
null
JavaScript
Apex
JavaScript
JavaScript
JavaScript
CoffeeScript
```

**Note**: we would simply ignore the *null* values...
(where GitHub has not been able to determine the language from the repo!)

Now that we know how the GitHub api **getFromUser** method works, we can 
write a test (with a predictable outcome) and create the CLI mini-app.

A user we can *expect* to *consistently* use **JavaScript** as his 
**favorite language** is **Douglas Crockford** 
(see: https://github.com/douglascrockford?tab=repositories)

### Long Story Short

- Added Unit Tests to ./test/**test.js**
- Created **lib.js** to house module code and passed all tests

![5 Tests Passing](http://i.imgur.com/bOZAlQb.png "all tests pass")

- created **commandLineApp.js** to showcase the work (see quick start above)


### Getting Travis to Verify Unit Tests (Build)

Add **travis.yml** file:

```sh
vi .travis.yml
```

```yml
language: node_js
node_js:
  - 0.8
```


### Background & Research

- GitHub API (v3) Documentation: http://developer.github.com/v3/
- List of existing node.js GitHub-related modules: 
https://npmjs.org/search?q=github
- Out of the list I chose Ajax.org's **node-github** 
https://github.com/ajaxorg/node-github (which is a *mirror* of) 
https://github.com/mikedeboer/node-github


