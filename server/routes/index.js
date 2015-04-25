module.exports = function(app) {
    var index = require('../controllers/index');

    app.get('/', function(req, res) {
    	var noUser = false;
    	console.log(req.user);
    	if(!(req.user)) {
			res.redirect('/login');
		} else {
			console.log(req.user);
			res.render('default', 
				{ title: 'Home',
					user: JSON.stringify(req.user)}
				)
		}
	});	
    app.get('/my-events', function(req, res) {
		var name = req.params.name;
		var noUser = false;
		if(!(req.user)) {
			res.redirect('/login');
		} else {
			console.log(req.user);
			res.render('default', 
				{ title: 'temp',
					user: JSON.stringify(req.user)}
			)
		}
	});

    app.get('/profile', function(req, res) {
		var name = req.params.name;
		var noUser = false;
		if(!(req.user)) {
			res.redirect('/login');
		} else {
			console.log(req.user);
			res.render('default', 
				{ title: 'Profile',
					user: JSON.stringify(req.user)}
			)
		}
	});


	app.get('/login', function(req, res) {
		var name = req.params.name;
		res.render('login', 
			{ title: 'login'}
		)
	});
};