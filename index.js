var express 			= require('express'),
 	app 				= express(),
 	bodyParser			= require('body-parser'),
 	mongoose			= require('mongoose'),
	passport            = require('passport');




var meetup				= require('./server/routes/meetup'),
    user                = require('./server/routes/user');


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

//REST API
//app.get('/api/meetups', meetupsController.list)
//app.post('/api/meetups', meetupsController.create);

// router.user(function(req, res, next) {
// 	next();
// });

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
});

app.use('/api', meetup);
app.use('/api', user);

console.log(meetup);


//PORT
app.listen(process.env.PORT || 5000, function(){
	console.log('I\'m Listenining...');
});
