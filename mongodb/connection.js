var mongoose = require('mongoose');
mongoose.Promise = global.Promise

var config = require('./config');

mongoose.connect('mongodb://'+config.user+':'+config.password+'@'+config.host+':'+config.port+'/'+config.databaseName);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
    console.log('MongoDB connection opened!');
});

module.exports = mongoose;