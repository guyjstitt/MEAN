module.exports = function(app) {
    var index = require('../controllers/index');

    app.get('/', function(req, res) {
		res.render('default', 
			{ title: 'Home',
				user: JSON.stringify(req.user)}
			)
		});	
    app.get('/my-events', function(req, res) {
		var name = req.params.name;
		res.render('default', 
			{ title: 'temp'}
		)
	});

	app.get('/login', function(req, res) {
		var name = req.params.name;
		res.render('login', 
			{ title: 'login'}
		)
	});
};