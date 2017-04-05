var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = new Schema({
    device_id: {type: String, required: true},
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    birthDate: Date
});

module.exports = childSchema;