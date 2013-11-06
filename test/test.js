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
