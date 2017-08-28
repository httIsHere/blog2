// index:
'use strict'
let Contents = require('../models/Contents');
let Tags = require('../models/Tags');

let tag = {
    tagArray: [],
    tags: null
};
let tagContent = {
};

let getTagPage = async (ctx, next) => {
    await Tags.distinct('tag',{ isDelete: 0 }).then(function (tagArray) {
        console.log(tagArray);
        tag.tagArray = tagArray;
        // tagContent.tagArray = tagArray;
        return Tags.aggregate([
            {
                $match: {
                    isDelete: {
                        $gt: -1
                    }
                }
            },
            {
                $group: {
                    _id: {
                        tag: '$tag',
                        content: '$content',
                        title: '$title'
                    }
                }
            }
        ]);
    }).then(function (tags) {
        tag.tags = tags;
        console.log(tags);
        tag.tagArray.forEach(function (tagname) {
            tagContent[tagname] = [];
            tag.tags.forEach(function (content) {
                if (content._id.tag == tagname) {
                    // console.log(content._id.title + "~" + tagname);
                    tagContent[tagname].push(content);
                }
            }, this);
        }, this);
        let data = {
            tagArray: tag.tagArray,
            tagContent: tagContent
        };
        console.log(data);
        ctx.render('tag.html', data);
    });
};

module.exports = {
    'GET /tag': getTagPage
};
