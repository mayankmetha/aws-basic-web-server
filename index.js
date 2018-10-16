var express = require("express");
var path = require("path");
var fs = require("fs");

var db = JSON.parse(fs.readFileSync(path.join(__dirname + "/db")));

var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/books", (req, res) => {
    res.send(db)
});

app.listen(80);