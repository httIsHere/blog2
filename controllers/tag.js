// index:
'use strict'
let Contents = require('../models/Contents');
let Tags = require('../models/Tags');

let getTagPage = async (ctx, next) => {
    await Tags.distinct('tag').then(function(tags){
        console.log(tags);
        ctx.render('tag.html');
    });
};

module.exports = {
    'GET /tag': getTagPage
};
