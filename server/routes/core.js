var express 	= require('express');
var router 		= express.Router();

// route middleware that will happen on every request
router.use(function(req, res, next) {

    // log each request to the console
    console.log(req.method, req.url);

    // continue doing what we were doing and go to the route
    next(); 
});

router.route('/#/:_id/edit')
	.post(function(req, res) {
		console.log('post');
	})

	.get(function(req, res) {
		console.log('get');
	});

module.exports = router;