var mongoose = require('../mongodb/connection');
var User = require('../model/user');
var Event = require('../model/event');
var childSchema = require('../model/child');
var api = require('../routes/api');
var c = require('../constants');

var Child = mongoose.model('Child', childSchema);

exports.addUser = function (req, res) {

    // New user creation
    var user = new User({
        username: req.body.username,
        password: req.body.password,// TODO password must be encrypted
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
        api.buildAndSendRes(res, doc, c.SUCCESS_USER_ADDED);
    }).catch(function (err) {
        //console.error(err);
        if (err.code == '11000')// 11000 is the mongoDB error code when there is a duplicate key
            api.buildAndSendRes(res, null, null, c.ERROR_USERNAME_ALREADY_EXISTS);
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
            api.buildAndSendRes(res, null, null, c.ERROR_USERNAME_NOT_EXIST);
            return;
        }

        // Check if device_id is not already used (meaning that that wearable device is already paired with a child)
        var deviceAlreadyPaired = user.children.some(function (child) {
            return child.deviceId == req.body.deviceId;
        });
        if (deviceAlreadyPaired) {
            api.buildAndSendRes(res, null, null, c.ERROR_DEVICE_ALREADY_PAIRED);
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
            api.buildAndSendRes(res, child, c.SUCCESS_CHILD_ADDED + req.body.username + '\' ');
        }).catch(function (err) {
            console.error(err);
            api.buildAndSendRes(res, null, null, err);
        });

    });
};

exports.addEvent = function (req, res) {

    User.findOne({username: req.body.username}, function (err, user) {

        if (err) {
            api.buildAndSendRes(res, null, null, err);
            return;
        }

        // If given parent username does not exist
        if (user === null) {
            api.buildAndSendRes(res, null, null, c.ERROR_USERNAME_NOT_EXIST);
            return;
        }

        // Check if childId is a child of the given parent
        var childExists = user.children.some(function (child) {
            return child._id == req.body.childId;
        });
        if (!childExists) {
            api.buildAndSendRes(res, null, null, c.ERROR_CHILDID_NOT_EXIST + '\'' + req.body.username + '\'');
            return;
        }

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
            api.buildAndSendRes(res, doc, c.SUCCESS_EVENT_ADDED);

        }).catch(function (err) {
            console.error(err);
            api.buildAndSendRes(res, null, null, err);
        });
    });
};

exports.getChildInfo = function (req, res) {
    User.findOne({username: req.query.username}, function (err, user) {
        if (err) {
            api.buildAndSendRes(res, null, null, err);
            return;
        }

        // If given parent username does not exist
        if (user === null) {
            api.buildAndSendRes(res, null, null, c.ERROR_USERNAME_NOT_EXIST);
            return;
        }

        // Check if childId is a child of the given parent
        var searchedChild = user.children.find(function (child) {
            return child._id == req.query.childId;

        });
        if (searchedChild === undefined) {
            api.buildAndSendRes(res, null, null, c.ERROR_CHILDID_NOT_EXIST + '\'' + req.query.username + '\'');
            return;
        }

        api.buildAndSendRes(res, searchedChild, c.SUCCESS_GENERAL, null);


    });
};

