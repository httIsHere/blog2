// index:
'use strict'
let Contents = require('../models/Contents');
module.exports = {
    'GET /': async (ctx, next) => {
        let res = {
            title: "HTT's blog",
            contents: null,
            count: 0,
            page: Number(ctx.query.page || 1),
            limit: 5,
            pages: 0
        };
        await Contents.count().then(function (cnt) {
            res.count = cnt;
            res.pages = Math.ceil(res.count / res.limit);
            res.page = Math.min(res.page, res.pages);
            res.page = Math.max(res.page, 1);
            let skip = (res.page - 1) * res.limit;
            return Contents.find({
                isDelete: false,
                isPublic: true
            }).limit(res.limit).skip(skip).sort({ date: -1 });
        }).then(function (cots) {
            res.contents = cots;
            console.log(res);
            ctx.render('index.html', res);
        });
    }
};
