module.exports = function(app) {
    var index = require('../controllers/index');

    app.get('/', function(req, res) {
    	var noUser = false;
    	console.log(req.user);
		res.render('default', 
			{ title: 'Home',
				user: JSON.stringify(req.user || noUser)}
			)
		});	
    app.get('/my-events', function(req, res) {
		var name = req.params.name;
		var noUser = false;
    	console.log(req.user);
		res.render('default', 
			{ title: 'temp',
				user: JSON.stringify(req.user || noUser)}
		)
	});

	app.get('/login', function(req, res) {
		var name = req.params.name;
		res.render('login', 
			{ title: 'login'}
		)
	});
};