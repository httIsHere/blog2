// index:
'use strict'
let Contents = require('../models/Contents');
module.exports = {
    'GET /comment': async (ctx, next) => {
        ctx.render('comment.html');
    }
};
