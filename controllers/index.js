// index:
'use strict'
let Contents = require('../models/Contents');
let res = {
    title: 'Welcome',
    contents: null
}
module.exports = {
    'GET /': async (ctx, next) => {
        Contents.find().then(function (cots) {
            res.contents = cots;
            console.log(res);
        });
        ctx.render('index.html',res);
    }
};
