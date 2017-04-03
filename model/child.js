var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = new Schema({
    firstName: String,
    lastName: String,
    birthDate: Date
});

module.exports = childSchema;