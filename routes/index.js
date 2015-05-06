var express = require('express');
var router = express.Router();
var app = require('../api/api');

var open = require('../api/open-api');

/* GET home page. */
router.get('/', app.index);

router.get('/uploadArticle', function(req, res) {
  res.render('upload');
});
router.post('/uploadArticle', app.uploadArticle);

/**
 * 上传文件
 */
router.get('/upload', function(req, res) {

  res.render('upload.html');
});
router.post('/upload', open.uploadFile);



module.exports = router;
