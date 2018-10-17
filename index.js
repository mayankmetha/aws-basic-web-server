var express = require("express");
var path = require("path");
var fs = require("fs");
var booksManager = require("./booksManager.js");
var bodyParser = require('body-parser');

var db = JSON.parse(fs.readFileSync(path.join(__dirname + "/db")));

var app = express();

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/books", (req, res) => {
    //res.send(db)
    if (req.query.searchText === undefined) {
        res.json(booksManager.getAllBooks());
    } else {
        res.json(booksManager.searchBooks(req.query.searchText));
    }
});

app.delete("/books", (req, res) => {
    if (!req.body || !req.body.isbn || !req.body.quantity || !(typeof req.body.quantity == 'number')) {
        res.status(400).send("Expected parameters: {isbn, quantity}");
        return;
    }

    try {
        booksManager.buyBook(req.body.isbn, req.body.quantity);
        console.log("Book bought!");
        res.status(204).end();
    } catch (err) {
        res.send(err);
    }
});

app.post("/books", (req, res) => {
    if (!req.body || !req.body.isbn || !req.body.quantity || !req.body.price ||
        !(typeof req.body.price == 'number') || (!typeof req.body.quantity == 'number')) {
        res.status(400).send("Invalid request");
        return;
    }

    try {
        booksManager.addBook(req.body);
        res.status(201).end();
    } catch (err) {
        res.status(500).send(err);
    }
});

app.listen(80);