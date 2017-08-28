// schemas文件夹下的tags.js

var mongoose = require('mongoose');
var BSON = require('bson').BSONPure
module.exports = new mongoose.Schema({
    tag: String,
    content: String,
    title: String,
    isDelete: Number
});