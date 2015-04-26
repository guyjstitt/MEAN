var users = require('../controllers/users-controller'),
    passport = require('passport');

//var router 		= express.Router();

module.exports = function(app) {
    app.route('/users').post(users.create).get(users.list);

    app.route('/users/:userId').get(users.read).post(users.update).delete(users.delete);

    app.param('userId', users.userByID);

    app.route('/register')
        .get(users.renderRegister)
        .post(users.register);

    app.route('/login')
        .get(users.renderLogin)
        .post(passport.authenticate('local', {
            successRedirect: '/',
            failureRedirect: '/login',
            failureFlash: true
        }));

    app.get('/profile', isLoggedIn, function(req,res){
        res.render('profile', {
            user: req.user
        });
    });

    app.get('/logout', users.logout);

    // route middleware to make sure a user is logged in
    function isLoggedIn(req, res, next) {

        // if user is authenticated in the session, carry on 
        if (req.isAuthenticated())
            return next();

        // if they aren't redirect them to the home page
        res.redirect('/login');
    }
};

