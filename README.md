github-profile-viewer
=====================

A simple command-line &amp; web app that displays preferred programming language for a given GitHub user

- - -

### Quick Start 

If you want to try out this on your own machine, simply clone this repo:

```sh
git clone git@github.com:nelsonic/github-profile-viewer.git
```

Create your GitHub authentication configuration file using the sample
and input your GitHub username & password:

```sh
cp config-SAMPLE.json config.json && vi config.json
```




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
    user: "mikedeboer"
}, function(err, res) {
    console.log(JSON.stringify(res));
});
```

At this point we don't know what to *expect* from the output, so lets just
explore what it looks like first. 

```json
[{
    "login": "fjakobs",
    "id": 40952,
    "avatar_url": "https://2.gravatar.com/avatar/05d0b094455964dc1d8e6c2ece4c27fe?d=https://identicons.github.com/5b0f48ce1d186742852c2ef897f8a0a0.png&r=x",
    "gravatar_id": "05d0b094455964dc1d8e6c2ece4c27fe",
    "url": "https://api.github.com/users/fjakobs",
    "html_url": "https://github.com/fjakobs",
    "followers_url": "https://api.github.com/users/fjakobs/followers",
    "following_url": "https://api.github.com/users/fjakobs/following{/other_user}",
    "gists_url": "https://api.github.com/users/fjakobs/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/fjakobs/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/fjakobs/subscriptions",
    "organizations_url": "https://api.github.com/users/fjakobs/orgs",
    "repos_url": "https://api.github.com/users/fjakobs/repos",
    "events_url": "https://api.github.com/users/fjakobs/events{/privacy}",
    "received_events_url": "https://api.github.com/users/fjakobs/received_events",
    "type": "User",
    "site_admin": false
}, {
    "login": "jasny",
    "id": 100821,
    "avatar_url": "https://2.gravatar.com/avatar/0bba82e8b2a9d2cf9645cb07ea54766f?d=https://identicons.github.com/217201cfee7bb52533480b816c0918b3.png&r=x",
    "gravatar_id": "0bba82e8b2a9d2cf9645cb07ea54766f",
    "url": "https://api.github.com/users/jasny",
    "html_url": "https://github.com/jasny",
    "followers_url": "https://api.github.com/users/jasny/followers",
    "following_url": "https://api.github.com/users/jasny/following{/other_user}",
    "gists_url": "https://api.github.com/users/jasny/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/jasny/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/jasny/subscriptions",
    "organizations_url": "https://api.github.com/users/jasny/orgs",
    "repos_url": "https://api.github.com/users/jasny/repos",
    "events_url": "https://api.github.com/users/jasny/events{/privacy}",
    "received_events_url": "https://api.github.com/users/jasny/received_events",
    "type": "User",
    "site_admin": false
}]
```

**Followers** is **not** what this project requires so went digging 
through the API and found **repos** method:

```javascript
var Client = require('github');

var github = new Client({
    debug: true,
    version: "3.0.0"
});

github.repos.getAll({user: "nelsonic"}, function(err, res) {
    console.log("GOT ERR?", err);
    console.log("GOT RES?", res);
});
```

Anoyingly, the repos method returns the following **error** 
(need to be authenticated to retrieve repo info):

```sh
REQUEST:  { host: 'api.github.com',
  port: 443,
  path: '/user/repos',
  method: 'get',
  headers: 
   { host: 'api.github.com',
     'content-length': '0',
     'user-agent': 'NodeJS HTTP Client' } }
STATUS: 401
HEADERS: {"server":"GitHub.com","date":"Wed, 06 Nov 2013 00:08:45 GMT","content-type":"application/json; charset=utf-8","status":"401 Unauthorized","x-ratelimit-limit":"60","x-ratelimit-remaining":"55","x-ratelimit-reset":"1383697500","x-github-media-type":"github.beta; format=json","x-content-type-options":"nosniff","content-length":"90","access-control-allow-credentials":"true","access-control-expose-headers":"ETag, Link, X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset, X-OAuth-Scopes, X-Accepted-OAuth-Scopes","access-control-allow-origin":"*","x-github-request-id":"56077E62:77B0:13EB9D5:5279888C"}
[error] { message: '{"message":"Requires authentication","documentation_url":"http://developer.github.com/v3"}',
[error]   code: 401 } null alibzafar
GOT ERR? { message: '{"message":"Requires authentication","documentation_url":"http://developer.github.com/v3"}',
  code: 401 }
GOT RES? undefined
```

So I tried it with basic authentication:

```javascript
var Client = require('github');

var github = new Client({
    debug: true,
    version: "3.0.0"
});

github.authenticate({
    type: "basic",
    username: "nelsonic",
    password: "******"
});

github.repos.getAll({user: "alibzafar"}, function(err, res) {
    console.log("GOT ERR?", err);
    console.log("GOT RES?", res);
});
```

But that only returned **my** (the user which authenticates) repos and **not**
the repos for the user I am requesting as parameter for repos.getALL method!
e.g:

```javascript
{ id: 13718252,
    name: 'learn-mocha',
    full_name: 'nelsonic/learn-mocha',
    owner: 
     { login: 'nelsonic',
       id: 194400,
       avatar_url: 'https://0.gravatar.com/avatar/e3838e553dba5b85a6d989dc72320b29?d=https%3A%2F%2Fidenticons.github.com%2F91f599166648db9d64ff927e2a28e4fe.png&r=x',
       gravatar_id: 'e3838e553dba5b85a6d989dc72320b29',
       url: 'https://api.github.com/users/nelsonic',
       html_url: 'https://github.com/nelsonic',
       followers_url: 'https://api.github.com/users/nelsonic/followers',
       following_url: 'https://api.github.com/users/nelsonic/following{/other_user}',
       gists_url: 'https://api.github.com/users/nelsonic/gists{/gist_id}',
       starred_url: 'https://api.github.com/users/nelsonic/starred{/owner}{/repo}',
       subscriptions_url: 'https://api.github.com/users/nelsonic/subscriptions',
       organizations_url: 'https://api.github.com/users/nelsonic/orgs',
       repos_url: 'https://api.github.com/users/nelsonic/repos',
       events_url: 'https://api.github.com/users/nelsonic/events{/privacy}',
       received_events_url: 'https://api.github.com/users/nelsonic/received_events',
       type: 'User',
       site_admin: false },
    private: false,
    html_url: 'https://github.com/nelsonic/learn-mocha',
    description: 'A Quick Guide to mocha.js Test Driven Development (TDD) in node.js',
    fork: false,
    url: 'https://api.github.com/repos/nelsonic/learn-mocha',
// etc
```

I filed an issue with the module creator/mantainer:
https://github.com/mikedeboer/node-github/issues/108

decided to try the oauth example:
https://github.com/mikedeboer/node-github/blob/master/test/oauth.js

Which gave the following output:

```javascript
{
    "login": "nelsonic",
    "id": 194400,
    "avatar_url": "https://0.gravatar.com/avatar/e3838e553dba5b85a6d989dc72320b29?d=https%3A%2F%2Fidenticons.github.com%2F91f599166648db9d64ff927e2a28e4fe.png&r=x",
    "gravatar_id": "e3838e553dba5b85a6d989dc72320b29",
    "url": "https://api.github.com/users/nelsonic",
    "html_url": "https://github.com/nelsonic",
    "followers_url": "https://api.github.com/users/nelsonic/followers",
    "following_url": "https://api.github.com/users/nelsonic/following{/other_user}",
    "gists_url": "https://api.github.com/users/nelsonic/gists{/gist_id}",
    "starred_url": "https://api.github.com/users/nelsonic/starred{/owner}{/repo}",
    "subscriptions_url": "https://api.github.com/users/nelsonic/subscriptions",
    "organizations_url": "https://api.github.com/users/nelsonic/orgs",
    "repos_url": "https://api.github.com/users/nelsonic/repos",
    "events_url": "https://api.github.com/users/nelsonic/events{/privacy}",
    "received_events_url": "https://api.github.com/users/nelsonic/received_events",
    "type": "User",
    "site_admin": false,
    "name": "Nelson",
    "company": "Good",
    "blog": "none",
    "location": "LDN",
    "email": "nodecoder@gmail.com",
    "hireable": false,
    "bio": "Working for a small startup based in London.\r\nNot seeking employment unless its with an awesome startup.\r\n:-)\r\n",
    "public_repos": 36,
    "followers": 9,
    "following": 22,
    "created_at": "2010-02-02T08:44:49Z",
    "updated_at": "2013-11-05T23:44:01Z",
    "public_gists": 12,
    "total_private_repos": 0,
    "owned_private_repos": 0,
    "disk_usage": 90006,
    "collaborators": 0,
    "plan": {
        "name": "free",
        "space": 307200,
        "collaborators": 0,
        "private_repos": 0
    },
    "private_gists": 0,
    "meta": {
        "x-ratelimit-limit": "5000",
        "x-ratelimit-remaining": "4999",
        "x-oauth-scopes": "gist, repo, user",
        "last-modified": "Tue, 05 Nov 2013 23:44:01 GMT",
        "etag": "\"0e8247fb44904b202ea1c88caf155f92\"",
        "status": "200 OK"
    }
}
```

Still not returning the repos for the user I am specifying 
in the `user: "alibzafar"` parameter!
Thinking I might have to take a different approach here...

The following test returns *exactly* the result I need 
(just not for an arbitrary user!):

```javascript
var Client = require('github');

var github = new Client({
    debug: true,
    version: "3.0.0"
});

github.authenticate({
    type: "basic",
    username: "nelsonic",
    password: "****"
});

github.repos.getAll({user: "alibzafar"}, function(err, res) {
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
null
null
PHP
PHP
null
null
C++
JavaScript
JavaScript
CoffeeScript
null
null
JavaScript
null
JavaScript
null
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

a bit more *digging* revealed the **getFromUser** method. #**bingo**!

Still requires (basic) authentication, so created a **config.json** file to 
avoid making my GitHub password public.

```javascript
{
    "github" : {
        "username" : "your-github-username",
        "password" : "*********"
    }
}
```

We use this config file in our script in the following way:

```javascript
var config = require('./config.json');
github.authenticate({
    type: "basic",
    username: config.github.username,
    password: config.github.password
});
```

To avoid exposing my GitHub password, add **config.json** to **.gitignore**
then:

```sh
git rm -r --cached .
git add .
git commit -m "fixed untracked files"
```


Now that we know how the GitHub api **getFromUser** method works, we can 
write a test (with a predictable outcome) and create the CLI mini-app.

A user we can *expect* to *consistently* use **JavaScript** as his 
**favorite language** is **Douglas Crockford** 
(see: https://github.com/douglascrockford?tab=repositories)

### Long Story Short

- Added Unit Tests to ./test/**test.js**
- Created **lib.js** to house module code and passed all tests

![5 Tests Passing](http://i.imgur.com/eWbLqRg.png "all tests pass")

- created **commandLineApp.js** to showcase the work.


### Getting Travis to Verify Unit Tests (Build)

Because Travid CI will only be able to test the code if it has the GitHub
username and password I had to create a dummy github user...


### Background & Research

- GitHub API (v3) Documentation: http://developer.github.com/v3/
- List of existing node.js GitHub-related modules: 
https://npmjs.org/search?q=github
- Out of the list I chose Ajax.org's **node-github** 
https://github.com/ajaxorg/node-github (which is a *mirror* of) 
https://github.com/mikedeboer/node-github


