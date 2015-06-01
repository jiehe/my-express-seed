/**
 * Created by lijiehe on 15/5/6.
 */
var superagent = require('superagent');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var fs = require('fs');
var _ = require('lodash');
var readFile = Promise.promisify(require("fs").readFile);
var writeFile = Promise.promisify(require("fs").writeFile);
var moment = require('moment');

module.exports = {
  getHtml: getHtml,
  readArticle: readArticle,  //根据id获取文章详情
  resetArticle: resetArticle,
  addTime: addTime,
  getArticles: getArticles,
  getHotArticles: getHotArticles,
  getTags: getTags,
  tags: tags
}

function getHotArticles() {
  return new Promise(function (resolve, reject) {
    getArticles()
        .then(function (articles) {
          var hotArticles = _.sortBy(articles, function (item) {
            return -item.time
          }).slice(0, 10);
          resolve(hotArticles);
        }).catch(function (err) {
          reject(err);
        })
  })
}

function getTags() {
  return new Promise(function (resolve, reject) {
    getArticles()
        .then(function (articles) {
        var tag = tags(articles);
          resolve(tag);
        }).catch(function (err) {
          reject(err);
        })
  })
}

function getArticles() {
  return new Promise(function (resolve, reject) {
    readFile('./data/article.json', 'utf8')
        .then(function (articles) {
          articles = JSON.parse(articles);
          resolve(articles);
        }).catch(function (err) {
          reject(err);
        })

  })
}

function addTime() {
  return new Promise(function (resolve, reject) {
    readFile('./data/article.json', 'utf8')
        .then(function (articles) {
          var articles = JSON.parse(articles);
          _.each(articles, function (article) {
            formatTime(article);
          })
          writeFile('./data/article.json', JSON.stringify(articles), 'utf8')
              .then(function () {
                resolve(articles);
              }).catch(function (err) {
                reject(err);
              })
        }).catch(function (err) {
          reject(err);
        })
  })
}


function resetArticle() {
  return new Promise(function (resolve, reject) {

    readFile('./data/article.json', 'utf8')
        .then(function (articles) {
          var links = [];
          _.each(JSON.parse(articles), function (article) {
            links.push(getHtml(article.url));
          })


          Promise.all(links)
              .then(function (arrData) {
                resolve(arrData);
              }).catch(function (err) {
                reject(err);
              })
        })
  })
}


var article = {};
function readArticle(id) {

  return new Promise(function (resolve, reject) {

    if (article[id]) {
      resolve(article[id]);
      console.log("article" + id + "cache");
    } else {
      readFile('./public/tpl/article/' + id + '.html', 'utf8')
          .then(function (content) {
            article[id] = content;
            resolve(content);
          }).catch(function (err) {
            reject(err);
          })
    }
  })

}

function getHtml(targetUrl, callback) {

  return new Promise(function (resolve, reject) {
    superagent.get(targetUrl)
        .end(function (err, res) {
          if (err) {
            reject(err);
            return;
          }
          var html = res.text;
          var $ = cheerio.load(html);
          var title = $('title').text();
          var updateTime = $('.article-updated-date').text();
          //默认time "2015-05-29T01:58:41.000000Z"
          var formatUpdateTime = updateTime.slice(0, updateTime.lastIndexOf('.')).replace("T", " ");
          $('.article-updated-date').text(formatUpdateTime);
          $('#reader-full-topInfo').find('span').eq(0).remove();
          $('#wmd-preview').find('code').eq(0).parent().append($('#reader-full-topInfo'));
          var content = $('#editor-reader-full').html();
          var read = parseInt($('.article-read').text());
          var tag = $('#wmd-preview').find('code').eq(0).text();
          var item = {
            "title": title.slice(0, title.lastIndexOf(' - ')),
            "url": targetUrl,
            "_id": targetUrl.slice(-5),
            //"content": content,
            "updateTime": formatUpdateTime,
            read: read,
            tag: tag
          };

          formatTime(item);

          readFile('./data/article.json', 'utf8')
              .then(function (data) {
                var article = JSON.parse(data);
                //过滤掉id重复的文章
                var filterId = _.filter(article, function (value) {
                  return value._id != item._id;
                });

                var sameId = _.filter(article, function (value) {
                  return value._id == item._id;
                });
                item.read = sameId.read ? sameId.read : item.read;
                article = filterId;
                article.push(item);
                writeFile('data/article.json', JSON.stringify(article), 'utf8')
                    .then(function () {

                    })
                    .catch(function (err) {
                      reject(err);
                      return;
                    })
                writeFile('public/tpl/article/' + item._id + '.html', content, 'utf8')
                    .then(function () {

                    })
                    .catch(function (err) {
                      reject(err);
                      return;
                    })
                var model = {
                  title: title,
                  content: content
                }
                resolve(model);

              }).catch(function (err) {
                reject(err);
              })
        });
  })
}

function formatTime(article) {
  var momentFormat = moment(article.updateTime);
  article.year = momentFormat.year();
  article.month = momentFormat.month() + 1;
  article.date = momentFormat.date();
  article.time = momentFormat._d.getTime();
}

function tags(articles) {

  var tags = [];
  var item = {};
  item.articlesList = [];
  item.tag = articles[0].tag;
  tags.push(item);
  _.each(articles, function (article) {

    var hasTag = false;
    _.each(tags, function (tag) {
      if (article.tag == tag.tag) {
        hasTag = true;
        tag.articlesList.push(article)
      }
    })
    if (!hasTag) {
      var item = {
        tag: "",
        articlesList: []
      };
      item.tag = article.tag;
      item.articlesList.push(article);
      tags.push(item);
    }
  })

  _.each(tags, function (tag) {

    var read = 0;
    var fontSize = 0.05;
    _.each(tag.articlesList, function (article) {
      read += article.read;
    })

    tag.fontSize = fontSize + read / 100;
    tag.read = read;
  })

  return tags;

}