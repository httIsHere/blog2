// add article
'use strict'
let fs = require('fs');
let Content = require('../models/Contents');

let getAddPage = async (ctx, next) => {
    await Content.find({
        isDelete: false
    }).then(function(contents){
        console.log(contents);
        ctx.render('add.html', {
            title: 'Add ur articles',
            contents:contents
        });
    });
};
let postAddPage = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data);
    if (data.title === '') {
        ctx.throw(400, '标题不能为空')
    } else if (data.content === undefined || data.content.length === 0) {
        ctx.throw(400, `文章内容不能为空`)
    } else if (data.description === ''){
        ctx.throw(400, '简介不能为空')
    }
    await new Content({
        title: data.title,
        description: data.description,
        content: data.content,
        date: new Date().toLocaleString()
    }).save().then(function () {
        ctx.redirect('/postedit');
    });
};

//upload images
let uploadImage = async (ctx, next) => {
    let type = 'jpg';
    let typeDir = ctx.request.body.type;
    let data = ctx.request.body.data;
    let base64 = data.replace(/^data:image\/\w+;base64,/, "");
    let dataBuffer = new Buffer(base64, 'base64');
    let num = Math.random();
    let filename = new Date().getTime() + '&' + num + '.' + type;
    let des_file = `static\\${typeDir}\\${filename}`;
    let suc = false;
    await fs.writeFile(des_file, dataBuffer, function (err) {
        if (err) {
            console.error;
        }
        else {
            console.log('success');
        }
    });
    ctx.body = {
        result: 'ok',
        image: `../../static/${typeDir}/${filename}`
    };
};

module.exports = {
    'GET /postedit': getAddPage,
    'POST /postedit': postAddPage,
    'POST /uploadImage': uploadImage
};
