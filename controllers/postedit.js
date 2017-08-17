// add article
'use strict'
let Content = require('../models/Contents');

let getAddPage = async (ctx, next) => {
    ctx.render('add.html', {
        title: 'Add ur articles'
    })
};
let postAddPage = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data);
    new Content({
        title: data.title,
        description: data.description,
        content: data.content,
        date: new Date().toLocaleString
    }).save();
    ctx.redirect('/postedit');
};

module.exports = {
    'GET /postedit': getAddPage,
    'POST /postedit': postAddPage
};
