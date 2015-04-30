var superagent = require('superagent');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var fs = require('fs');
var _ = require('lodash');

module.exports = {

  getHtml: function (targetUrl, callback) {
    superagent.get(targetUrl)
      .end(function (err, res) {
        if (err) {
          throw new Error(err);
          return;
        }
        var article = require('../data/article.json');
        var html = res.text;
        var $ = cheerio.load(html);
        var title = $('title').text();
        var updateTime = $('.article-updated-date').text();
        var formatUpdateTime = updateTime.slice(0, updateTime.lastIndexOf('.'));
        $('.article-updated-date').text(formatUpdateTime);
        //var content = $('#editor-reader-full').html();


        var item = {
          "title": title.slice(0, title.lastIndexOf(' - ')),
          "url": targetUrl,
          "_id": targetUrl.slice(-5),
          //"content": content,
          "updateTime": formatUpdateTime
        };

        //验证是不是id重复的文章
        var filterId =_.filter(article, function(value) {
          return value._id == item._id;
        });
        if(filterId.length) {
          article.splice(article.indexOf(filterId), 1);
        }


        article.push(item);
        fs.writeFile('data/article.json', JSON.stringify(article), 'utf8', function(err, data) {
          if (err) {
            throw new Error(err);
            return;
          }
        })
        fs.writeFile('public/tpl/article/' + item._id + '.html', content, 'utf8', function (err) {
          if (err) {
            throw new Error(err);
            return;
          }
        });
        callback(title, content);
      });
  }
}