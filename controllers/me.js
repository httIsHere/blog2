// index:
'use strict'
let Contents = require('../models/Contents');
module.exports = {
    'GET /me': async (ctx, next) => {
        ctx.render('me.html');
    }
};
