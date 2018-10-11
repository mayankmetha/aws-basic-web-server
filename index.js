var express = require("express");
var path = require("path");
var fs = require("fs");

var db = JSON.parse(fs.readFileSync(path.join(__dirname+"/payload/db")));

var app = express();

app.get("/books", (req, res) => {
    res.send(db)
});

app.get("/", (req,res) => {
    res.sendFile(path.join(__dirname+"/payload/home.html"))
});

app.get("/jquery", (req,res) => {
    res.sendFile(path.join(__dirname+"/payload/jquery.js"))
});

app.get("/script", (req,res) => {
    res.sendFile(path.join(__dirname+"/payload/script.js"))
});

app.listen(80);