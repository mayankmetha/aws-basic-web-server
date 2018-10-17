(function () {
    var db = require("./dbconn.js");

    exports.getAllBooks = function () {
        return db.query();
    }

    exports.searchBooks = function (searchKey) {
        console.log("Searching for books that contain the string: [", searchKey, "]");
        searchKey = searchKey.toLowerCase();
        books = this.getAllBooks();
        var booksToReturn = [];
        for (var i = 0; i < books.books.length; ++i) {
            var book = books.books[i];
            if (book.title.toLowerCase().indexOf(searchKey) >= 0 ||
                book.description.toLowerCase().indexOf(searchKey) >= 0 ||
                book.author.toLowerCase().indexOf(searchKey) >= 0) {
                booksToReturn.push(book);
            }
        }
        return booksToReturn;
    }

    exports.getBookByIsbn = function (isbn) {
        return db.query(isbn);
    }

    exports.buyBook = function (isbn, quantity) {
        console.log("Buying book with ISBN ", isbn, ", quantity ", quantity);
        var book = this.getBookByIsbn(isbn);
        console.log("Found Book: ", book);
        if (!book) {
            throw "The Book bearing ID " + isbn + " was not found!";
        }

        console.log("Found book ", book);
        if (book.quantity < quantity) {
            throw "There are not enough books left in stock. Current Stock " + book.quantity;
        }
        book.quantity -= quantity;
        db.update(isbn, book);
        return 0;
    }

    exports.addBook = function (book) {
        console.log("Adding or updating book:", book);
        var findIsbn = this.getBookByIsbn(book.isbn);
        if (!findIsbn) {
            db.createObj(book);
        } else {
            findIsbn.price = book.price;
            findIsbn.quantity = book.quantity + findIsbn.quantity;
            db.update(book.isbn, findIsbn);
        }

        return 0;
    }

    module.exports.booksManager = this;
}());