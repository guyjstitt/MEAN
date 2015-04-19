module.exports = function(app) {
    var index = require('../controllers/index');

    app.get('/', function(req, res) {
        res.render('default',
            { title: 'Home'}
        )
    });
};