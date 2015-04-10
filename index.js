var express 			= require('express'),
 	app 				= express(),
 	bodyParser			= require('body-parser'),
 	mongoose			= require('mongoose'),
 	Meetup              = require('./server/models/meetup');

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

//ROUTES FOR API
var router = express.Router();

// router.user(function(req, res, next) {
// 	next();
// });

app.get('/', function (req, res) {
	res.sendFile(__dirname + '/client/views/index.html');
});

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

router.route('/meetups')
	.post(function(req, res) {
		var meetup = new Meetup();
		meetup.name = req.body.name;

		meetup.save(function(err) {
			if(err) {
				res.send(err);
			} else {
				res.json({message: 'Meetup Created'});
			}
		});
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
			}
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
						console.log("deleted " + meetup._id);
					}
				})
			}
		})
	});

app.use('/api', router);


//PORT
app.listen(process.env.PORT || 5000, function(){
	console.log('I\'m Listenining...');
});
