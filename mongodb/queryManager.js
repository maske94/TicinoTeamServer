var mongoose = require('../mongodb/connection');
var User = require('../model/user');
var Event = require('../model/event');
var childSchema = require('../model/child');
var Child = mongoose.model('Child', childSchema);

exports.addUser = function (req, res) {

    // Fields validation
    if (req.body.username === undefined || req.body.username === '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'username\' field in the request');
        return;
    }

    if (req.body.password === undefined || req.body.password === '') {
        buildAndSendRes(res, null, null, 'Missed mandatory \'password\' field in the request');
        return;
    }

    // New user creation
    var user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        city: req.body.city
    });

    // Save the user into mongoDB.
    // Mongoose understands automatically that the collection is "users" from the word 'user'.
    // It returns a promise.
    user.save().then(function (doc) {
        console.log('User \'' + req.body.username + '\' added successfully!');
        buildAndSendRes(res, doc, 'User added successfully');
    }).catch(function (err) {
        console.error(err);
        if (err.code == '11000')// 11000 is the mongoDB error code when there is a duplicate key
            buildAndSendRes(res, null, null, 'Username already exists');
        else
            buildAndSendRes(res, null, null, err);
    });
};

exports.addChild = function (req, res) {

    // Check if the parent username is present in the request
    if (req.body.username === undefined) {
        buildAndSendRes(res, null, null, 'Missed mandatory \'username\' field in the request');
        return;
    }

    User.findOne({username: req.body.username}, function (err, user) {

        if (err) {
            buildAndSendRes(res, null, null, err);
            return;
        }

        // If given parent username does not exist
        if (user === null) {
            buildAndSendRes(res, null, null, 'The given username does not exist');
            return;
        }

        // Everything ok, can add new child
        var child = new Child({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate
        });

        // Add child to the parent
        user.children.push(child);

        // Save parent object into mongoDb
        user.save().then(function (doc) {
            console.log('Added child to \'' + req.body.username + '\' successfully!');
            buildAndSendRes(res, doc, 'Child added successfully to the parent \'' + req.body.username + '\' ');
        }).catch(function (err) {
            console.error(err);
            buildAndSendRes(res, null, null, err);
        });

    });
};


exports.addEvent = function (req, res) {

    var event = new Event({
        username: req.body.username,
        pollutionValue: req.body.pollutionValue,
        timeStamp: req.body.timeStamp,
        gpsValue: {
            lat: req.body.gpsLat,
            long: req.body.gpsLong
        }
    });

    // Save the new event into mongoDB.
    // Mongoose understands automatically that the collection is "events"
    // Mongoose returns a promise
    event.save().then(function (doc) {
        console.log('Event added successfully!');
        res.send('Add event:' + doc);
    }).catch(function (err) {
        console.error(err);
        res.send('Error:' + err);
    });
};

/**
 * Build a json response with 3 standard optional fields:
 * - error : is set if any error occurs with a description of it. If set no body or message filed is set.
 * - body : if no error occurred, it contains the requested resource.
 * - message : if no error occurred, it contains a successful message with a description of what has been done.
 *
 * @param res
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
