var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the user schema
var userSchema = new Schema({
    firstName: String,
    lastName: String,
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    city: String,
    birthDate: Date
});

// Create a model using the schema
var User = mongoose.model('User', userSchema);

module.exports = User;
