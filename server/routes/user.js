/**
 * Created by Hao on 4/11/2015.
 */
var express 	= require('express');
var router 		= express.Router();
var User     = require('../models/user');
var users = require('../controllers/users-controller');



router.route('/users')
    .post(function(req, res, next) {
        var user = new User(req.body);
        user.save(function(err) {
            if (err) {
                return next(err);
            }
            else {
                res.json(user);
            }
        });
    });

router.route('/users')
    .get(function(req, res) {
        if (!req.user) {
            res.render('register', {
                title: 'Register Form'
            });
        }
        else {
            return res.redirect('/');
        }
    })
    .post(function(req, res, next) {
        if (!req.user) {
            var user = new User(req.body);
            user.save(function(err) {
                if (err) {
                    return res.redirect('/register');
                }

                req.login(user, function(err) {
                    if (err)
                        return next(err);

                    return res.redirect('/');
                });
            });
        }
        else {
            return res.redirect('/');
        }
    });

module.exports = router;
