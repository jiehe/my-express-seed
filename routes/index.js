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



module.exports = router;
