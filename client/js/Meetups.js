// angular.module('meetupApp.data', ['ngResource']).factory('Meetups',['$resource' ,function($resource) {
// 	'use strict';

// 	var server = $resource('/meetups');

// 	return {
// 		save: function(newMeetup) {
// 			server.save(newMeetup);
// 		},
// 		query: function() {
// 			return server.query();
// 		}
// 	};
// }]);