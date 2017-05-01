var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = new Schema({
    deviceId: {type: String, required: true}, // An unique identifier of the wearable device
    firstName: {type: String, required: true},
    lastName: String,
    birthDate: Date
});

module.exports = childSchema;