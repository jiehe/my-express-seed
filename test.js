

var cheerio = require('cheerio');
var superagent = require('superagent');
var fs = require('fs');

var targetUrl = 'https://www.zybuluo.com/lijiehe/note/23909';
superagent.get(targetUrl)
    .end(function (err, res) {
        console.log(res);
    });
fs.rename('views/load.html','views/upload.html');
fs.readdir('node_modules',function(err,files) {
    console.log(files);
});
