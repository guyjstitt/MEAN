var port = process.env.PORT || 5000;
var mongoURI = 'mongodb://localhost:27017/mean-demo';
var db = process.env.MONGOLAB_URI || mongoURI;

module.exports = {
    port: port,
    db: db
};

