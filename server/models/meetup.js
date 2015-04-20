var mongoose = require('mongoose');

module.exports = mongoose.model('Meetup', {
	name: String,
	host: Number,
	users: [{id: Number}],
	attend: Array
});