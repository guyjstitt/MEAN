var mongoose = require('mongoose');

module.exports = mongoose.model('Meetup', {
	name: String,
	dek: String,
	host: Number,
	users: [{id: Number}],
	host: {id:String, username: String, name: String, email: String, password: String},
	attend: Array
});