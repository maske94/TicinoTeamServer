var mongoose = require('../mongodb/connection');
var User = require('../model/user');
var Event = require('../model/event');
var childSchema = require('../model/child');
var api = require('../routes/api');

var Child = mongoose.model('Child', childSchema);

exports.addUser = function (req, res) {

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
        api.buildAndSendRes(res, doc, 'User added successfully');
    }).catch(function (err) {
        console.error(err);
        if (err.code == '11000')// 11000 is the mongoDB error code when there is a duplicate key
            api.buildAndSendRes(res, null, null, 'Username already exists');
        else
            api.buildAndSendRes(res, null, null, err);
    });
};

exports.addChild = function (req, res) {

    User.findOne({username: req.body.username}, function (err, user) {

        if (err) {
            api.buildAndSendRes(res, null, null, err);
            return;
        }

        // If given parent username does not exist
        if (user === null) {
            api.buildAndSendRes(res, null, null, 'The given username does not exist');
            return;
        }

        // Check if device_id is not already used (meaning that that wearable device is already paired with a child)
        var deviceAlreadyPaired = user.children.some(function (child) {
            return child.deviceId == req.body.deviceId;
        });
        if (deviceAlreadyPaired) {
            api.buildAndSendRes(res, null, null, 'The wearable device is already paired with a child');
            return;
        }

        // Everything ok, can add new child
        var child = new Child({
            deviceId: req.body.deviceId,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            birthDate: req.body.birthDate
        });

        // Add child to the parent
        user.children.push(child);

        // Save parent object into mongoDb
        user.save().then(function (doc) {
            console.log('Added child to \'' + req.body.username + '\' successfully!');
            api.buildAndSendRes(res, doc, 'Child added successfully to the parent \'' + req.body.username + '\' ');
        }).catch(function (err) {
            console.error(err);
            api.buildAndSendRes(res, null, null, err);
        });

    });
};


exports.addEvent = function (req, res) {

    //TODO Check if username and childId exist

    var event = new Event({
        username: req.body.username,
        childId: req.body.childId,
        pollutionValue: req.body.pollutionValue,
        gpsValue: {
            lat: req.body.gpsLat,
            long: req.body.gpsLong
        },
        timeStamp: req.body.timeStamp

    });

    // Save the new event into mongoDB.
    // Mongoose understands automatically that the collection is "events"
    // Mongoose returns a promise
    event.save().then(function (doc) {
        //console.log('Event added successfully!');
        api.buildAndSendRes(res, doc, 'Event added successfully');

    }).catch(function (err) {
        console.error(err);
        api.buildAndSendRes(res, null, null, err);
    });
};


