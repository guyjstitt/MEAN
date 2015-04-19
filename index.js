var express 			= require('express'),
 	app 				= express(),
 	bodyParser			= require('body-parser'),
 	mongoose			= require('mongoose'),
 	core                = require('./server/routes/core'),
	passport            = require('passport'),
	http				= require('http').Server(app),
	io					= require('socket.io')(http);

var router 		= express.Router();
var Meetup      = require('./server/models/meetup');

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


// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

router.route('/test')
	.get(function(req, res) {
		 res.send(req.ip);
	});

router.route('/meetups')
	.post(function(req, res) {
		var meetup = new Meetup();
		meetup.name = req.body.name;

		meetup.save(function(err) {
			if(err) {
				res.send(err);
			} else {

				io.emit('meetup', req.body);
				
				return res.sendStatus(200);
			}
		});

		//return res.sendStatus(200);
	})

	.get(function(req, res) {
		Meetup.find(function(err, meetups) {
			if(err) {
				res.send(err);
			} else {
				res.json(meetups);
			}

		});
	});

router.route('/meetups/:_id/edit')
	.get(function(req, res) {
		 Meetup.findById(req.params._id ,function(err, meetup) {
			if(err) {
				return console.error(err);
			} else {
				console.log('edit successful', meetup);
				res.json(meetup);
			}
		});
	})
	.post(function(req, res) {
		var name = req.body.name;
		console.log(req.body);

		//find it
		Meetup.findById(req.params._id, function(err, meetup) {
			//update it
			meetup.update({
				name: name
			}, function( err, meetupId) {
				if(err) {
					console.log(err);
				} else {
					console.log('successfully updated ' + name);
				}
			});
		});
	});

router.route('/meetups/:_id/delete')
	.delete(function(req, res) {
		 Meetup.findById(req.params._id ,function(err, meetup) {
			if(err) {
				return console.error(err);
			} else {
				meetup.remove(function(err, meetup) {
					if(err) {
						console.error(err);
					} else {
						res.send("deleted " + meetup._id);
					}
				})
			}
		})
	});

app.use('/api', user);
app.use('/api', router);
app.use('/', core);


//PORT
http.listen(process.env.PORT || 5000, function(){
	console.log('I\'m Listenining...');
});

exports.io = io;