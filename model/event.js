var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create schema that defines the unit of measure of the pollution value
var pollutionSchema = new Schema({
    type:String,
    value:Number
});

// create the 'event' schema
var eventSchema = new Schema({
    username: String,
    child_id : String,
    pollutionValue: [pollutionSchema],
    gpsValue: {
        lat: Number,
        long: Number
    },
    timeStamp: Date
});

// Create a model using the 'event' schema
var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
