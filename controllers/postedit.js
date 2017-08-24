// add article
'use strict'
let fs = require('fs');
let Content = require('../models/Contents');
let Tag = require('../models/Tags');

// show page
let getAddPage = async (ctx, next) => {
    let data = {
        title: 'My Articles',
        contents: null,
        content: null,
        tags: null
    };
    let id = ctx.query.contentid || '';
    console.log(`id: ${id}`);
    if (id != '') {
        await Content.findOne({
            _id: id
        }).then(function (cont) {
            if (cont) {
                console.log(cont);
                data.content = cont;
            }
            return Content.find({
                isDelete: false
            }).sort({ lastEditTime: -1 });
        }).then(function (contents) {
            console.log(contents);
            data.contents = contents;
            return Tag.find();
        }).then(function(tags){
            data.tags = tags;
            console.log(data);
            ctx.render('add.html', data);
        });
    }
    else {
        await Content.find({
            isDelete: false
        }).sort({ 
            lastEditTime: -1 
        }).then(function (contents) {
            console.log(contents);
            data.contents = contents;
            return Tag.find();
        }).then(function(tags){
            data.tags = tags;
            console.log(data);
            ctx.render('add.html', data);
        });
    }
};
// submit new article
let postAddPage = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data);
    if (data.title === '') {
        ctx.throw(400, '标题不能为空')
    } else if (data.content === undefined || data.content.length === 0) {
        ctx.throw(400, `文章内容不能为空`)
    }
    await new Content({
        title: data.title,
        description: data.description,
        content: data.content,
        date: new Date().toLocaleString(),
        isPublic: true,
        lastEditTime: new Date().toLocaleString(),
        description: data.content.substring(0, 100),
        tags: data.tags
    }).save().then(function (newContent) {
        data.tags.forEach(function(element) {
            new Tag({
                tag: element,
                content: newContent._id.toString(),
                title: newContent.title
            }).save();
        }, this);
        ctx.redirect('/postedit');
    });
};

// upload images
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

// save draft
let saveDraft = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data);
    await new Content({
        title: data.title,
        content: data.content,
        isPublic: false,
        date: new Date().toLocaleString(),
        lastEditTime: new Date().toLocaleString(),
        tags: data.tags
    }).save().then(function (newContent) {
        ctx.body = {
            result: '保存成功',
            newContent: newContent
        }
    });
};

// delete article
let deleteArticle = async (ctx, next) => {
    let id = ctx.request.body.contentid || '';
    if (id != '') {
        await Content.findOne({
            _id: id
        }).then(function (content) {
            console.log(content);
            content.isDelete = true;
            content.lastEditTime = new Date().toLocaleString();
            content.save();
            ctx.body = {
                result: 'delete success'
            };
        });
    }
};

// save article
let saveArticle = async (ctx, next) => {
    let data = ctx.request.body;
    console.log(data);
    let id = ctx.request.body.contentid || '';
    if (id != '') {
        await Content.findOne({
            _id: id
        }).then(function (content) {
            console.log(content);
            content.title = data.title;
            content.content = data.content;
            content.lastEditTime = new Date().toLocaleString();
            content.tags = data.tags;
            content.save();
            ctx.body = {
                result: 'save success'
            };
        });
    }
};

// post draft
let postDraft = async (ctx, next) => {
    let data = ctx.request.body;
    let id = ctx.request.body.contentid || '';
    if (id != '') {
        await Content.findOne({
            _id: id
        }).then(function (content) {
            console.log(content);
            content.title = data.title;
            content.content = data.content;
            content.lastEditTime = new Date().toLocaleString();
            content.isPublic = true;
            content.description = data.content.substring(0, 100);
            content.tags = data.tags;
            content.save();
            ctx.body = {
                result: 'save success'
            };
        });
    }
};

module.exports = {
    'GET /postedit': getAddPage,
    'POST /postedit': postAddPage,
    'POST /uploadImage': uploadImage,
    'POST /saveDraft': saveDraft,
    'POST /deleteArticle': deleteArticle,
    'POST /saveArticle': saveArticle,
    'POST /postDraft': postDraft
};
