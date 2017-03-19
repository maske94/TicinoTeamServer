var express = require('express');
var router = express.Router();
var queryManager = require('../mongodb/queryManager');

router.post('/addUser', function(req, res, next) {
    queryManager.addUser(req,res);
});

router.post('/addEvent', function(req, res, next) {
    queryManager.addEvent(req,res);
});

module.exports = router;