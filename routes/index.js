var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {

  res.render('index', { title: 'Express' ,arr:[2,3,4,5,6]});

  /**
   * for render html(spa); need the html's extension
   */
  //res.render('index.html');
});

module.exports = router;
