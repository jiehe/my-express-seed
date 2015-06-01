/**
 * Created by lijiehe on 15/5/6.
 */


var util = require('../util/utils.js');
var _ = require('lodash');

module.exports = {
    index: index,
    uploadArticle: uploadArticle,
    getArticle: getArticle,
    article: article,
    resetArticle:resetArticle,
    addTime: addTime,
    category: category,
    tags:tags
}


function tags(req, res, next) {
    util.getTags()
        .then(function(tags) {
            res.json(tags);
        }).catch(function(err) {
            next(err);
        })
}

function index(req, res, next) {

    var model = {};
    var data = [
        util.getHotArticles()
    ]

    Promise.all(data)
        .then(function(data) {
            model.hotArticles = data[0];

            res.render('index', model);
        })
}

function category(req, res, next) {


    var model = {};
    var data = [
        util.getHotArticles(),
        util.getArticles()
    ]
    Promise.all(data)
        .then(function(data) {
            model.hotArticles = data[0];
            var articles = data[1];

            console.log(req.params.tag)
            if(req.params.tag) {
                var tags = util.tags(articles);
                var tag = _.filter(tags, function(tag) {
                    return tag.tag == req.params.tag;
                })
                model.tag = tag;

            } else {
                var years = [2015, 2014];
                model.articles = getYearCategory(articles, years);
            }
            console.log(model);
            res.render('category', model);
        }).catch(function(err) {
            next(err);
        })

}


function addTime(req, res, next) {
    util.addTime()
        .then(function(articles) {
            res.send(articles);
        }).catch(function(err) {
            next(err)
        })
}


function article(req, res, next) {
    var model = {};
    var articleId = req.params.id;
    var data = [
        util.getHotArticles(),
        util.readArticle(articleId)
    ]
    Promise.all(data)
        .then(function(data) {
            model.hotArticles = data[0];
            model.content = data[1];
            res.render('article', model);
        }).catch(function(err) {
            next(err);
        })
}

function uploadArticle(req, res, next) {
    util.getHtml(req.body.link)
        .then(function(data) {
            var model = {};
            model.message = "上传成功，么么哒！"

            res.render('upload', model);

        }).catch(function(err) {
            next(err)
        })
}

function resetArticle(req, res, next) {
    //res.send('不开放');
    //return;
    util.resetArticle()
        .then(function(data) {
            res.send(data);
        }).catch(function(err){
            next(err);
        })
}

function getArticle(req, res, next) {
    var _id = req.query.id;

}

function getYearCategory(articles, arrYear) {

    var formatYear = [];

    _.each(arrYear, function(year) {
        var item = {
            year: year,
            articlesList: _.filter(articles, function(article) {
                return article.year == year;
            })
        }

        item.articlesList = _.sortBy(item.articlesList, function(article) {
            return -article.time;
        })
        formatYear.push(item);
    })
    return formatYear;
}

