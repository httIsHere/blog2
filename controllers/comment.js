// index:
'use strict'
let Comments = require('../models/Comments');

let getCommentPage = async (ctx, next) => {
    await Comments.find({
        isDelete: false
    }).then(function(comments){
        ctx.render('comment.html', {
            comments: comments
        });
    });
};

let postNewComment = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data);
    await new Comments({
        user: data.name,
        email: data.email,
        comment: data.comment,
        url: data.url,
        date: new Date().toLocaleString()
    }).save().then(function(newComment){
        ctx.redirect('/comment');
    });
};

let replyComment = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data);
    await Comments.findOne({
        _id: data.id
    }).then(function(comment){
        console.log(comment);
        let reply = {
            content: data.reply,
            date: new Date().toLocaleString()
        };
        comment.reply.push(reply);
        return comment.save();
    }).then(function(comment){
        ctx.body = {
            result: 'ok',
            comment: comment
        };
    });
};

module.exports = {
    'GET /comment': getCommentPage,
    'POST /comment': postNewComment,
    'POST /reply': replyComment
};
