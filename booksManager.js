(function(){
    var db = require("./dbconn.js");

    exports.getAllBooks = function() {
        return db.query("books");
    }

    exports.searchBooks = function(searchKey) {
        console.log("Searching for books that contain the string: [", searchKey, "]");
        searchKey = searchKey.toLowerCase();
        books = this.getAllBooks();
        var booksToReturn = [];
        for ( var i = 0; i < books.books.length; ++i) {
            var book = books.books[i];
            if(book.title.toLowerCase().indexOf(searchKey) >= 0
               || book.description.toLowerCase().indexOf(searchKey) >= 0
               || book.author.toLowerCase().indexOf(searchKey) >= 0) {
                booksToReturn.push(book);
            }
        }
        return booksToReturn;
    }

    module.exports.booksManager = this;
}());