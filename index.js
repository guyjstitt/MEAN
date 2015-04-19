/*var express 			= require('express'),
 	app 				= express(),
 	bodyParser			= require('body-parser'),
 	mongoose			= require('mongoose'),
 	core                = require('./server/routes/core'),
	passport            = require('passport');

http				= require('http').Server(app);
io					= require('socket.io')(http);

var router 		= express.Router();
var Meetup      = require('./server/models/meetup');
var meetupRoutes = require('./server/routes/meetup');
var user                = require('./server/routes/user');


app.use(passport.initialize());
app.use(passport.session());

var mongoURI = 'mongodb://localhost:27017/mean-demo';
app.set('port', (process.env.PORT || 5000));
mongoose.connect(process.env.MONGOLAB_URI || mongoURI);



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use('/js', express.static(__dirname + '/client/js'));
app.use(express.static(__dirname + '/client/templates'));

app.use(express.static(__dirname + '/public'));
app.use('/static', express.static(__dirname + '/public'));

//REST API
//app.get('/api/meetups', meetupsController.list)
//app.post('/api/meetups', meetupsController.create);

// router.user(function(req, res, next) {
// 	next();
// });



app.set('views', __dirname + '/client/views');
app.set('css', __dirname + '/client/css')
app.set('view engine', 'jade');




app.get('/', function(req, res) {
	res.render('default', 
		{ title: 'Home'}
	)
});

app.get('/:name', function(req, res) {
	res.render('default', 
		{ title: 'Temp'}
	)
});

app.get('/login', function(req, res) {
	var name = req.params.name;
	res.render('login', 
		{ title: 'login'}
	)
});



app.use('/api', user);
app.use('/api', meetupRoutes);
app.use('/api', router);
app.use('/', core);


//PORT
http.listen(process.env.PORT || 5000, function(){
	console.log('I\'m Listenining...');
});

exports.io = io;*/