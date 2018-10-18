var dbconn = require("./dbconn.js");
var fs = require("fs");
var path = require("path");

var books = JSON.parse(fs.readFileSync(path.join(__dirname + "/db")));
for ( var i in books.books) {
    dbconn.createObj(books.books[i]);
    console.log("Create book ", books.books[i].isbn);
}