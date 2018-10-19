var express = require("express");
var path = require("path");
var fs = require("fs");
var booksManager = require("./booksManager.js");
var bodyParser = require('body-parser');
var cors = require('cors');

var db = JSON.parse(fs.readFileSync(path.join(__dirname + "/db")));

var app = express();

app.use(cors());

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, CORS");
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/books", (req, res) => {
    if (req.query.searchText === undefined) {
        booksManager.getAllBooks().then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.status(500).send(err);
        });
    } else {
        booksManager.searchBooks(req.query.searchText).then(function (data) {
            res.json(data);
        }).catch(function (err) {
            res.status(404).send(err);
        });
    }
});

app.delete("/books", (req, res) => {
    if (!req.body || !req.body.isbn || !req.body.quantity || !(typeof req.body.quantity == 'number') ||
        req.body.quantity <= 0) {
        res.status(400).send("Invalid / Missing parameters: {isbn, quantity}");
        return;
    }

    booksManager.buyBook(req.body.isbn, req.body.quantity).then(function (data) {
        console.log("Book bought!");
        res.status(204).end();
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

app.post("/books", (req, res) => {
    if (!req.body || !req.body.isbn || !req.body.quantity ||
        (!typeof req.body.quantity == 'number') || req.body.quantity <= 0) {
        res.status(400).send("Invalid request");
        return;
    }

    booksManager.addBook(req.body).then(function (data) {
        console.log("Added books!");
        res.status(201).end();
    }).catch(function (err) {
        res.status(500).send(err);
    });
});

app.listen(80);