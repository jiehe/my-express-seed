

var util = require('../util/util.js');

module.exports = {
    index: index,
    uploadArticle: uploadArticle,
    getArticle: getArticle
}

function index(req, res) {

    util.getHtml('https://www.zybuluo.com/lijiehe/note/23909', function(data, content) {

        res.render('index', {title:data, content: content});

    })

}

function uploadArticle(req, res) {
    util.getHtml(req.body.link, function(data, content, msg) {
        res.render('upload');

    })
}

function getArticle(req, res) {
    var _id = req.query.id;

}
