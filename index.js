var express = require("express");
var path = require("path");
var fs = require("fs");
var cors = require('cors')

var db = JSON.parse(fs.readFileSync(path.join(__dirname + "/payload/db")));

var app = express();
//app.use(cors);

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get("/books", (req, res) => {
    res.send(db)
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + "/payload/home.html"))
});

app.get("/jquery", (req, res) => {
    res.sendFile(path.join(__dirname + "/payload/jquery.js"))
});

app.get("/script", (req, res) => {
    res.sendFile(path.join(__dirname + "/payload/script.js"))
});

app.listen(80);