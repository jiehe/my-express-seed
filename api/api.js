/**
 * Created by lijiehe on 15/5/6.
 */


var util = require('../util/utils.js');

module.exports = {
    index: index,
    uploadArticle: uploadArticle,
    getArticle: getArticle
}

function index(req, res) {

    res.render('index');


}

function uploadArticle(req, res) {
    console.log(req.body.link);
    util.getHtml(req.body.link, function(data, content, msg) {

        var model = {};
        model.message = "上传成功，么么哒！"

        res.render('upload', model);

    })
}

function getArticle(req, res) {
    var _id = req.query.id;

}
