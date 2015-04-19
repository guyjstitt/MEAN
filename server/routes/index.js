module.exports = function(app) {
    var index = require('../controllers/index');

    app.get('/', function(req, res) {
		res.render('default', 
			{ title: 'Home'}
			)
		});	

	app.get('/login', function(req, res) {
		var name = req.params.name;
		res.render('login', 
			{ title: 'login'}
		)
	});
};