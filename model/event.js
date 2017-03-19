var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create the event schema
var eventSchema = new Schema({
    username: String,
    pollutionValue: Number,
    gpsValue: {
        lat: Number,
        long: Number
    },
    timeStamp: Date
});

// Create a model using the schema
var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
