var mongoose = require('../mongodb/connection');
var User = require('../model/user');
var Event = require('../model/event');

exports.addUser = function (req, res) {

    var user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        password: req.body.password,
        city: req.body.city,
        birthDate: req.body.birthDate
    });

    // Save the user into mongoDb.
    // Mongoose understands automatically that the collection is "users".
    // It returns a promise.
    user.save().then(function (doc) {
        console.log('User \'' + req.body.username + '\' added successfully!');
        res.send('Add user:' + doc);
    }).catch(function (err) {
        console.error(err);
        res.send('Error:' + err);
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


