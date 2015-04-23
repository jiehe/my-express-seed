
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
                var content = $('#wmd-preview').html();
                fs.writeFile('public/article/'+title + '.html', $('#wmd-preview').html(), 'utf8', function() {});
                callback(title, content);
            });
    }
}