var express 			= require('express'),
 	app 				= express(),
 	bodyParser			= require('body-parser'),
 	mongoose			= require('mongoose'),
 	meetupsController	= require('./server/controllers/meetups-controller');

mongoose.connect('mongodb://admin:#Encrypted1@ds061751.mongolab.com:61751/heroku_app35658026');
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

app.listen(3000, function(){
	console.log('I\'m Listenining...');
})

\
ds061751.mongolab.com:61751/heroku_app35658026 -u heroku_app35658026 -p #Encrypted1