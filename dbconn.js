(function(){
    var fs = require("fs");
    var path = require("path");

    openDbConnection = function() {
        console.log("Opened a DB connection");
        return 1;
    };

    exports.query = function(key) {
        console.log("Querying DB for Key ", key);
        return JSON.parse(fs.readFileSync(path.join(__dirname + "/db")));
    }

    exports.openDbConnection = openDbConnection;
    
    var dbconn = openDbConnection();
    module.exports.dbmgr = this; 
}());