var express = require('express');
var router = express.Router();

var open = require('../api/open-api');

var api = require('../api/api');

/* GET home page. */
router.get('/', api.index);


/**
 * 上传文件
 */
router.get('/upload', function(req, res) {

  res.render('upload.html');
});
router.post('/upload', open.uploadFile);

/**
 * 输入链接上传文章
 */
router.get('/upload/article', function(req, res) {
  res.render('upload');
});

router.post('/upload/article', api.uploadArticle);

/**
 * 读取文章
 */

router.get('/article/:id', api.getArticle);



module.exports = router;
