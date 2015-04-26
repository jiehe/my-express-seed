

var util = require('../util/util.js');

module.exports = {
    index: index
}

function index(req, res) {

    util.getHtml('https://www.zybuluo.com/lijiehe/note/23909', function(data, content) {

        res.render('index', {title:data, content: content});

    })

}