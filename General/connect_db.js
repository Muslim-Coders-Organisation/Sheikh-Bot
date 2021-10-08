"use strict";
exports.__esModule = true;
exports.connect = void 0;
var mongoose = require("mongoose");
var dotenv = require("dotenv");
var process = dotenv.config().parsed;
//console.log(process)
var getLink = function (obj) {
    var db = obj.db;
    return db;
};
var mongoAtlasUri = getLink(process);
function connect() {
    try {
        // Connect to the MongoDB cluster
        mongoose.connect(mongoAtlasUri, { useNewUrlParser: true, useUnifiedTopology: true }, function () { return console.log(" Mongoose is connected"); });
    }
    catch (e) {
        console.log("could not connect", e);
    }
    var dbConnection = mongoose.connection;
    dbConnection.on("error", function (err) { return console.log("Connection error " + err); });
    dbConnection.once("open", function () { return ''; });
    return 'Success';
}
exports.connect = connect;
