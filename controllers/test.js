'use strict'

let test = async (ctx, next) => {
    ctx.render('test.html');
};
let testPost = async (ctx, next) => {
    let d = ctx.request.body;
    console.log(d);
    ctx.body = {
        d: d
    };
};

module.exports = {
    'GET /test': test,
    'POST /test': testPost
};