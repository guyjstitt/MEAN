var config = require('./config'),
    express = require('express'),
    bodyParser = require('body-parser'),
    passport = require('passport'),
    flash = require('connect-flash'),
    session = require('express-session')
    path = require('path');




module.exports = function() {
    var app = express();

    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.use(bodyParser.json());

    app.use(session({
        saveUninitialized: true,
        resave: true,
        secret: 'OurSuperSecretCookieSecret'
    }));

    app.use(flash());
    app.use(passport.initialize());
    app.use(passport.session());


    require('../server/routes/index')(app);
    require('../server/routes/user')(app);

    app.set('views', path.join(__dirname, '../', 'client/views'));
    app.set('view engine', 'jade');


    app.use('/js', express.static(path.join(__dirname, '../', 'client/js')));
    console.log(path.join(__dirname, '../', 'client/js'));

    app.use(express.static(path.join(__dirname, '../', 'client/templates')));

    app.use(express.static(path.join(__dirname, '../', 'public')));
    app.use('/static', express.static(path.join(__dirname, '../', 'public')));


    var meetupRoutes = require('../server/models/meetup');

    app.use('/api', meetupRoutes);


    return app;
};