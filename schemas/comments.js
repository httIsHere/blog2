// schemas文件夹下的content.js

var mongoose = require('mongoose');
var BSON = require('bson').BSONPure
module.exports = new mongoose.Schema({
    user: String,
    email: String,
    comment: String,
    url: String,
    // 当前时间
    date: String,
    //是否删除
    isDelete: {
        type: Boolean,
        default: false
    },
    reply: {
        type: Array,
        default: []
    }
});