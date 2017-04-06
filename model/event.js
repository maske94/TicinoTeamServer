var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// // create schema that defines the unit of measure of the pollution value
// var pollutionSchema = new Schema({
//     type:String,
//     value:Number
// });

// create the 'event' schema
var eventSchema = new Schema({
    username: {type: String, required: true},
    childId: {type: String, required: true},
    pollutionValue: {type: Number, required: true},
    gpsValue: {
        lat: {type: Number, required: true},
        long: {type: Number, required: true}
    },
    timeStamp: {type: String, required: true}
});

// Create a model using the 'event' schema
var Event = mongoose.model('Event', eventSchema);

module.exports = Event;
