// article
'use strict'
let Contents = require('../models/Contents');
let res = {
    title: '',
    content: null,
    contents: null,
    index: 0
}
let getArticlePage = async (ctx, next) => {
    let id = ctx.query.contentid || '';
    console.log(`id: ${id}`);
    await Contents.find({
        isDelete: false,
        isPublic: true
    }).sort({
        date: -1
    }).then(function (contents) {
        res.contents = contents;
        for(let i = 0; i < contents.length; i++){
            if(contents[i]._id.toString() == id){
                res.content = contents[i];
                res.title = contents[i].title;
                res.index = i;
                break;
            }
        }
        console.log(res);
        ctx.render('article.html', res);
    });
};

let getContent = async (ctx, next) => {
    let id = ctx.request.body.contentid || '';
    console.log(`id: ${id}`);
    await Contents.findOne({
        _id: id,
        isDelete: false,
        isPublic: true
    }).then(function (cot) {
        console.log(cot);
        res.title = cot.title;
        res.content = cot;
        console.log(res);
        ctx.body = {
            data: res.content
        };
    });
};
module.exports = {
    'GET /article': getArticlePage,
    'POST /article': getContent
};
