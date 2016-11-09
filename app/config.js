var path = require('path');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shortly');

var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});

module.exports = mongoose;
