var express = require('express');
var router = express.Router();
var queryManager = require('../mongodb/queryManager');
var check = require('validator');

router.post('/addUser', function (req, res, next) {

    // Fields validation
    if (req.body.username === undefined || req.body.username === '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'username\' field in the request');
        return;
    }

    if (req.body.password === undefined || req.body.password === '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'password\' field in the request');
        return;
    }

    queryManager.addUser(req, res);
});


router.post('/addChild', function (req, res, next) {

    // Fields validation
    if (req.body.username === undefined) {
        buildAndSendRes(res, null, null, 'Missed mandatory \'username\' field in the request');
        return;
    }

    if (req.body.deviceId === undefined || req.body.deviceId === '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'deviceId\' field in the request');
        return;
    }

    queryManager.addChild(req, res);
});

router.post('/addEvent', function (req, res, next) {

    // Fields validation
    if (req.body.username === undefined) {
        buildAndSendRes(res, null, null, 'Missed mandatory \'username\' field in the request');
        return;
    }

    if (req.body.childId === undefined || req.body.childId == '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'childId\' field in the request');
        return;
    }

    if (req.body.pollutionValue === undefined || req.body.pollutionValue == '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'pollutionValue\' field in the request');
        return;
    }

    if (req.body.gpsLat === undefined || req.body.gpsLat == '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'gpsLat\' field in the request');
        return;
    }

    if (req.body.gpsLong === undefined || req.body.gpsLong == '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'gpsLong\' field in the request');
        return;
    }

    if (req.body.timeStamp === undefined || req.body.timeStamp == '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'timeStamp\' field in the request');
        return;
    }

    if (!check.isISO8601(req.body.timeStamp)) {
        buildAndSendRes(res, null, null, 'Filed \'timeStamp\' is not a valid ISO date format');
        return;
    }

    queryManager.addEvent(req, res);
});


/**
 * Build a json response with 3 standard optional fields:
 * - error : is set if any error occurs with a description of it. If set no body or message filed is set.
 * - body : if no error occurred, it contains the requested resource.
 * - message : if no error occurred, it contains a successful message with a description of what has been done.
 *
 * @param res Required
 * @param body The requested resource or a resource on which has been done an update/add/remove operation
 * @param msg Description of the successful operation
 * @param error Description of the error
 */
function buildAndSendRes(res, body, msg, error) {
    var jsonRes = {};
    if (error)
        jsonRes.error = error;
    else {
        jsonRes.body = body;
        jsonRes.message = msg;
    }
    res.contentType('application/json');
    res.send(JSON.stringify(jsonRes));
}

module.exports.buildAndSendRes = buildAndSendRes;
module.exports = router;