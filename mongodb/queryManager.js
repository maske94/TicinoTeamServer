require('../mongodb/connection');
var User = require('../model/user');
var Event = require('../model/event');

exports.addUser = function (req, res) {

    var user = new User({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        birthDate: req.body.birthDate,
        city: req.body.city
    });

    // Save the user into mongoDB.
    // Mongoose understands automatically that the collection is "users".
    // It returns a promise.
    user.save().then(function (doc) {
        console.log('User \'' + req.body.username + '\' added successfully!');
        buildAndSendRes(res,doc,'User added successfully');
    }).catch(function (err) {
        console.error(err.errmsg);
        if(err.code == '11000')
            buildAndSendRes(res,null,null,'Username already exists');
        else
            buildAndSendRes(res,null,null,err.errmsg);
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

function buildAndSendRes(res, body, msg, error) {
    var jsonRes = {};
    if(error)
        jsonRes.error = error;
    else {
        jsonRes.body = body;
        jsonRes.message = msg;
    }
    res.contentType('application/json');
    res.send(JSON.stringify(jsonRes));
}
