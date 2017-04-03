var mongoose = require('mongoose');
var child = require('./child');

var Schema = mongoose.Schema;

// create the user schema
var userSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    birthDate: Date,
    city: String,
    children: [child]
});

// Create a model using the schema
var User = mongoose.model('User', userSchema);

module.exports = User;
