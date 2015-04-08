var express 			= require('express'),
 	app 				= express(),
 	bodyParser			= require('body-parser'),
 	mongoose			= require('mongoose'),
 	meetupsController	= require('./server/controllers/meetups-controller');

var mongoURI = 'mongodb://localhost:27017/mean-demo';
app.set('port', (process.env.PORT || 5000));
mongoose.connect(process.env.MONGOLAB_URI || mongoURI);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.get('/', function	(req, res){
	res.sendFile(__dirname + '/client/views/index.html');
});

app.use('/js', express.static(__dirname + '/client/js'));

//REST API
app.get('/api/meetups', meetupsController.list)
app.post('/api/meetups', meetupsController.create);

app.listen(process.env.PORT || 5000, function(){
	console.log('I\'m Listenining...');
})
