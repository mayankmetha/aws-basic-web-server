(function () {
    var aws = require("aws-sdk");
    var config = require("./config.js")
    aws.config.update(config);
    var dynamoDB = new aws.DynamoDB.DocumentClient();
    var TABLENAME = "Books";

    exports.query = function (key) {
        var params = {
            TableName: TABLENAME
        };

        if (key) {
            params.FilterExpression = "contains(title, :title) OR contains(subtitle, :subtitle) \
                                            OR contains(author, :author) OR contains(description, :desc)";
            params.ExpressionAttributeValues = {
                ":title": key,
                ":subtitle": key,
                ":author": key,
                ":desc": key
            };
        }

        return new Promise(function (resolve, reject) {
            dynamoDB.scan(params, function (err, dbBooks) {
                if (err) {
                    reject(err);
                    return;
                }

                if (!dbBooks || !dbBooks.Items || dbBooks.Items.length === 0) {
                    reject("No books found in the DB");
                    return;
                }

                resolve(dbBooks.Items);
            });
        });
    }

    exports.getItem = function (key) {
        var params = {
            TableName: TABLENAME
        };

        params.KeyConditionExpression = "isbn=:isbn";
        params.ExpressionAttributeValues = {
            ":isbn": key
        };

        return new Promise(function (resolve, reject) {
            if (!key || key === "") {
                reject("The provided key is invalid");
            }

            dynamoDB.query(params, function (err, dbBooks) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }

                if (!dbBooks || !dbBooks.Items || dbBooks.Items.length !== 1) {
                    reject("Key " + key + " was not found");
                    return;
                }
                resolve(dbBooks.Items[0]);
            });
        });
    }

    exports.update = function (isbn, newBook) {
        console.log("Updating book ", isbn, " to new value: ", newBook);
        return new Promise(function (resolve, reject) {
            var params = {
                TableName: TABLENAME,
                Key: {
                    "isbn": isbn
                }
            };

            var attributeUpdates = {};

            for (var attr in newBook) {
                if (attr !== "isbn") {
                    attributeUpdates[attr] = {
                        Action: "PUT",
                        Value: newBook[attr]
                    }
                }
            }

            params["AttributeUpdates"] = attributeUpdates;
            dynamoDB.update(params, function (err, data) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve();
            })
        });
    }

    exports.createObj = function (book) {
        console.log("Creating and adding new book ", book.title, " with quantity ", book.quantity, ", price ", book.price);
        // Convert the book model into a suitable representation for DynamoDB
        var params = {
            "TableName": TABLENAME,
            "Item": book
        }

        return new Promise(function (resolve, reject) {
            dynamoDB.put(params, function (err) {
                if (err) {
                    console.log(err);
                    reject(err);
                    return;
                }
                resolve();
            })
        });
    }
}());