process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var config = require('./config/config'),
    mongoose = require('./config/mongoose'),
    express = require('./config/express'),
    passport = require('./config/passport');


var db = mongoose(),
    app = express(),
    passport = passport();

http				= require('http').Server(app);
io					= require('socket.io')(http);

http.listen(config.port);

module.exports = http;
console.log(process.env.NODE_ENV + ' server running at http://localhost:' + config.port);