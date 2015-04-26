
var superagent = require('superagent');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var fs = require('fs');

module.exports = {

    getHtml: function(targetUrl, callback) {
        superagent.get(targetUrl)
            .end(function (err, res) {
                console.log(res);
                if(err) {
                    throw new Error(err);
                    return;
                }
                var html = res.text;
                var $ = cheerio.load(html);
                var title = $('title').text();
                var content = $('#editor-reader-full').html();
                fs.writeFile('public/article/'+title + '.html', content, 'utf8', function() {});
                callback(title, content);
            });
    }
}