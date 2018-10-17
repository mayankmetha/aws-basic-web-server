(function () {
    var fs = require("fs");
    var path = require("path");

    openDbConnection = function () {
        console.log("Opened a DB connection");
        return 1;
    };

    exports.query = function (key) {
        console.log("Querying DB", key);
        var books = JSON.parse(fs.readFileSync(path.join(__dirname + "/db")));
        if (!key) {
            return books;
        }

        for (var i in books.books) {
            var book = books.books[i];
            if (book.isbn === key) {
                return book;
            }
        }

        return undefined;
    }

    exports.update = function (isbn, newBook) {
        console.log("Updating book ", isbn, " to new value: ", newBook);
        return 0;
    }

    exports.createObj = function (book) {
        console.log("Creating and adding new book ", book.title, " with quantity ", book.quantity, ", price ", book.price);
        return 0;
    }

    exports.openDbConnection = openDbConnection;

    var dbconn = openDbConnection();
    module.exports.dbmgr = this;
}());