var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var childSchema = new Schema({
    child_id: { type: String, required: true, unique: true },
    firstName: String,
    lastName: String,
    birthDate: Date
});

module.exports = childSchema;