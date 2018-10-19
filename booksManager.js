(function () {
    var db = require("./dbconn.js");

    exports.getAllBooks = function () {
        return new Promise(function (resolve, reject) {
            db.query().then(function (data) {
                resolve(data);
            }).catch(function (err) {
                reject(err);
            })
        });
    }

    exports.searchBooks = function (searchKey) {
        console.log("Searching for books that contain the string: [", searchKey, "]");

        return new Promise(function (resolve, reject) {
            db.query(searchKey).then(function (books) {
                resolve(books);
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    exports.getBookByIsbn = function (isbn) {
        return new Promise(function (resolve, reject) {
            db.getItem(isbn).then(function (book) {
                resolve(book);
            }).catch(function (err) {
                reject(err);
            });
        });
    }

    exports.buyBook = function (isbn, quantity) {
        console.log("Buying book with ISBN ", isbn, ", quantity ", quantity);
        return new Promise(function (resolve, reject) {
            db.getItem(isbn).then(function (book) {
                if (book.quantity < quantity) {
                    reject("There are not enough books left in stock. Current Stock " + book.quantity);
                    return;
                }

                book.quantity -= quantity;
                db.update(isbn, book).then(function (data) {
                    resolve();
                }).catch(function (err) {
                    reject("Failed to buy the book: " + err);
                });
            }).catch(function (err) {
                console.log("Book " + isbn + " was not found");
                reject("The Book bearing ID " + isbn + " was not found: " + err);
            });
        });
    }

    isNullOrEmpty = function(value) {
        if (value && value !== "") {
            return true;
        }
        return false;
    }

    exports.addBook = function (book) {
        console.log("Adding or updating book:", book);
        return new Promise(function (resolve, reject) {
            db.getItem(book.isbn).then(function (findIsbn) {
                if (book.price && typeof book.price === 'number') {
                    findIsbn.price = book.price;
                }
                findIsbn.quantity = book.quantity + findIsbn.quantity;
                db.update(book.isbn, findIsbn).then(function (data) {
                    resolve();
                }).catch(function (err) {
                    reject("Failed to add the book: " + err);
                });
            }).catch(function (err) {
                if (isNullOrEmpty(book.title) ||
                    isNullOrEmpty(book.subtitle) ||
                    isNullOrEmpty(book.author) ||
                    (isNullOrEmpty(book.price) || typeof book.price !== 'number') ||
                    (isNullOrEmpty(book.quantity) || typeof book.price !== 'number')) {
                    reject("The book details are not sufficient, enter all details");
                }
                db.createObj(book).then(function (data) {
                    resolve();
                }).catch(function (err) {
                    reject(err);
                });
            });
        });
    }
}());