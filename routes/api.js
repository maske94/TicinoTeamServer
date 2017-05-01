var express = require('express');
var router = express.Router();
var queryManager = require('../mongodb/queryManager');
var validator = require('validator');
var c = require('../constants');

/**
 * PATH: /api/addUser
 * METHOD: POST
 * PARAMS: username,password,firstName,lastName,birthDate,city
 * RETURN: The added user
 */
router.post('/addUser', function (req, res, next) {

    // Fields validation
    if (req.body.username === undefined || req.body.username === '') {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_USERNAME);
        return;
    }

    if (req.body.password === undefined || req.body.password === '') {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_PASSWORD);
        return;
    }

    queryManager.addUser(req, res);
});

/**
 * PATH: /api/addChild
 * METHOD: POST
 * PARAMS: username,deviceId,firstName,lastName,birthDate
 * RETURN: The added child
 */
router.post('/addChild', function (req, res, next) {

    // Fields validation
    if (req.body.username === undefined) {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_USERNAME);
        return;
    }

    if (req.body.deviceId === undefined || req.body.deviceId === '') {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_DEVICEID);
        return;
    }

    queryManager.addChild(req, res);
});

/**
 * PATH: /api/addEvent
 * METHOD: POST
 * PARAMS: username,childId,pollutionValue,gpsLat,gpsLong,timeStamp
 * RETURN: The added event
 */
router.post('/addEvent', function (req, res, next) {

    // Fields validation
    if (req.body.username === undefined) {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_USERNAME);
        return;
    }

    if (req.body.childId === undefined || req.body.childId == '') {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_CHILDID);
        return;
    }

    if (req.body.pollutionValue === undefined || req.body.pollutionValue == '') {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_POLLVALUE);
        return;
    }

    if (req.body.gpsLat === undefined || req.body.gpsLat == '') {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_GPSLAT);
        return;
    }

    if (req.body.gpsLong === undefined || req.body.gpsLong == '') {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_GPSLONG);
        return;
    }

    if (req.body.timeStamp === undefined || req.body.timeStamp == '') {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_TIMESTAMP);
        return;
    }

    if (!validator.isISO8601(req.body.timeStamp)) {
        buildAndSendRes(res, null, null, c.ERROR_INVALID_FIELD_TIMESTAMP);
        return;
    }

    queryManager.addEvent(req, res);
});

/**
 * PATH: /api/getChild
 * METHOD: GET
 * PARAMS: username,childId
 * RETURN: Information about the given childId
 */
router.get('/getChild', function (req, res, next) {

    // Fields validation
    if (req.query.username === undefined) {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_USERNAME);
        return;
    }

    if (req.query.childId === undefined) {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_CHILDID);
        return;
    }

    queryManager.getChildInfo(req, res);
});

/**
 * PATH: /api/getChildren
 * METHOD: GET
 * PARAMS: username
 * RETURN: Information about all children of the given username
 */
router.get('/getChildren', function (req, res, next) {

    // Fields validation
    if (req.query.username === undefined) {
        buildAndSendRes(res, null, null, c.ERROR_MISSING_FIELD_USERNAME);
        return;
    }

    queryManager.getChildren(req, res);
});

/**
 * Build a json response with 3 standard optional fields:
 * - error : is set if any error occurs with a description of it. If set no body or message filed is set.
 * - body : if no error occurred, it contains the requested resource or the posted resource.
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