var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Ticino Team Server',
                        subTitle: 'Pollution Problem'});
});

module.exports = router;
