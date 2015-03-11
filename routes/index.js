var express = require('express');
var router = express.Router();

var open = require('../api/open-api');

/* GET home page. */
router.get('/', function(req, res) {

  //res.render('index', { title: 'Express' ,arr:[2,3,4,5,6]});

  /**
   * for render html(spa); need the html's extension
   */
  res.render('index.html');
});


/**
 * 上传文件
 */
router.get('/upload', function(req, res) {

  res.render('upload.html');
});
router.post('/upload', open.uploadFile);



module.exports = router;
