var mongoose = require('../mongodb/connection');
var User = require('../model/user');

exports.addUser = function (req, res) {

    var ale = new User({
        firstName: 'Alessandro',
        lastName: 'Mascheroni',
        username: 'maske94',
        password: 'pass',
        city: 'Gravedona',
        birthDate: '1994-05-04'
    });

    ale.save().then(function (doc) {
        console.log('User saved successfully!');
        res.send('Add user:' + doc);
    }).catch(function (err) {
        console.error(err);
        res.send('Error:' + err);

    });
};

exports.addEvent = function (req, res) {
    res.send('Add event');
};


