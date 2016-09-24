var mongoose = require('mongoose');
var shutdown;

var dbURI = 'mongodb://heroku_pmrvv2vc:kbp43neuv3gnkt8br4skdq3a41@ds037145.mlab.com:37145/heroku_pmrvv2vc';
mongoose.connect(dbURI);

mongoose.connection.on('connected', function() {
    console.log('Mongoose connected to ' + dbURI);
});

mongoose.connection.on('error', function(err) {
    console.log('Mongoose connection error: ' + err);
});

mongoose.connection.on('disconnected', function() {
    console.log('Mongoose disconnected');
});

shutdown = function(msg, callback) {
    console.log('Mongoose disconnected through ' + msg);
    callback();
}

process.once('SIGUSR2', function() {
    shutdown('Nodemon restart', function() {
        process.kill(process.pid, 'SIGUSR2');
    });
});

process.on('SIGINT', function() {
    shutdown('app termination', function() {
        process.exit(0);
    });
});

process.on('SIGTERM', function() {
    shutdown('Heroku app shutdown', function() {
        process.exit(0);
    });
});

require('./recipe');
require('./user');