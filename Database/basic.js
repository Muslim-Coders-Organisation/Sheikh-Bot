"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var prefix = new Schema({
    'server_id': String,
    'prefix': String
});
var Model = mongoose.model('Prefix', prefix);
exports["default"] = Model;
