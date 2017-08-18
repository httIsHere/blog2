// index:
'use strict'
let Contents = require('../models/Contents');
let res = {
    title: 'Welcome',
    contents: null
}
module.exports = {
    'GET /': async (ctx, next) => {
        await Contents.find({
            isDelete: false
        }).then(function (cots) {
            res.contents = cots;
            console.log(res);
            ctx.render('index.html',res);
        });
    }
};
