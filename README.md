github-profile-viewer
=====================

A simple command-line &amp; web app that displays preferred programming language for a given GitHub user

- - -

### Quick Start 

If you want to try out this on your own machine, simply clone this repo:

```sh
git clone git@github.com:nelsonic/github-profile-viewer.git
```
>> finish this at the end.


### Original Brief

> Build a simple **web** *or* **command line** **app**lication, which should 
> allow users to **enter** an *arbitrary* **GitHub username**, 
> and be presented with a **best guess** of the GitHub user's 
> **favourite** programming **language**.

> This can be computed by using the GitHub API to fetch all of the user's 
> public GitHub repos, each of which includes the name of the dominant 
> language for the repository.

> Documentation for the GitHub API can be found at http://developer.github.com


### Discussion

#### Keep it Simple

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

Lets try a simple example. In the ./test/**test.js** file we created above,
lets add the sample code from https://github.com/ajaxorg/node-github README:

```javascript
var GitHubApi = require("github");

var github = new GitHubApi({
    // required
    version: "3.0.0",
    // optional
    timeout: 5000
});
github.user.getFollowingFromUser({
    user: "nelsonic"
}, function(err, res) {
    console.log(JSON.stringify(res));
});
```

At this point we don't know what to *expect* from the output, so lets just
explore what it looks like first.

```json
[{"login":"fjakobs","id":40952,"avatar_url":"https://2.gravatar.com/avatar/05d0b094455964dc1d8e6c2ece4c27fe?d=https%3A%2F%2Fidenticons.github.com%2F5b0f48ce1d186742852c2ef897f8a0a0.png&r=x","gravatar_id":"05d0b094455964dc1d8e6c2ece4c27fe","url":"https://api.github.com/users/fjakobs","html_url":"https://github.com/fjakobs","followers_url":"https://api.github.com/users/fjakobs/followers","following_url":"https://api.github.com/users/fjakobs/following{/other_user}","gists_url":"https://api.github.com/users/fjakobs/gists{/gist_id}","starred_url":"https://api.github.com/users/fjakobs/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/fjakobs/subscriptions","organizations_url":"https://api.github.com/users/fjakobs/orgs","repos_url":"https://api.github.com/users/fjakobs/repos","events_url":"https://api.github.com/users/fjakobs/events{/privacy}","received_events_url":"https://api.github.com/users/fjakobs/received_events","type":"User","site_admin":false},{"login":"jasny","id":100821,"avatar_url":"https://2.gravatar.com/avatar/0bba82e8b2a9d2cf9645cb07ea54766f?d=https%3A%2F%2Fidenticons.github.com%2F217201cfee7bb52533480b816c0918b3.png&r=x","gravatar_id":"0bba82e8b2a9d2cf9645cb07ea54766f","url":"https://api.github.com/users/jasny","html_url":"https://github.com/jasny","followers_url":"https://api.github.com/users/jasny/followers","following_url":"https://api.github.com/users/jasny/following{/other_user}","gists_url":"https://api.github.com/users/jasny/gists{/gist_id}","starred_url":"https://api.github.com/users/jasny/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/jasny/subscriptions","organizations_url":"https://api.github.com/users/jasny/orgs","repos_url":"https://api.github.com/users/jasny/repos","events_url":"https://api.github.com/users/jasny/events{/privacy}","received_events_url":"https://api.github.com/users/jasny/received_events","type":"User","site_admin":false},{"login":"hij1nx","id":136109,"avatar_url":"https://2.gravatar.com/avatar/2c03b6faf7b9816f159af69e240221fd?d=https%3A%2F%2Fidenticons.github.com%2Fba4b7ee018c64f0139f37618abfaf498.png&r=x","gravatar_id":"2c03b6faf7b9816f159af69e240221fd","url":"https://api.github.com/users/hij1nx","html_url":"https://github.com/hij1nx","followers_url":"https://api.github.com/users/hij1nx/followers","following_url":"https://api.github.com/users/hij1nx/following{/other_user}","gists_url":"https://api.github.com/users/hij1nx/gists{/gist_id}","starred_url":"https://api.github.com/users/hij1nx/starred{/owner}{/repo}","subscriptions_url":"https://api.github.com/users/hij1nx/subscriptions","organizations_url":"https://api.github.com/users/hij1nx/orgs","repos_url":"https://api.github.com/users/hij1nx/repos","events_url":"https://api.github.com/users/hij1nx/events{/privacy}","received_events_url":"https://api.github.com/users/hij1nx/received_events","type":"User","site_admin":false}]
```






### Background & Research

- GitHub API (v3) Documentation: http://developer.github.com/v3/
- List of existing node.js GitHub-related modules: 
https://npmjs.org/search?q=github
- Out of the list I chose Ajax.org's **node-github** 
https://github.com/ajaxorg/node-github (which is a *mirror* of) 
https://github.com/mikedeboer/node-github


