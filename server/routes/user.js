var users = require('../controllers/users-controller'),
    passport = require('passport');

//var router 		= express.Router();

module.exports = function(app) {
    app.route('/users').post(users.create).get(users.list);

    app.route('/users/:userId').get(users.read).put(users.update).delete(users.delete);

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

    app.get('/profile', function(req,res){
        res.render('profile', {
            user: req.user
        });
    });

    app.get('/logout', users.logout);
};

