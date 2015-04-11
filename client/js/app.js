var app = angular.module('meetupApp', ['ngResource','ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/' , {
		controller: 'MeetupsController',
		templateUrl: '/home.html'
	})
	.when('/:_id/edit', {
		controller: 'EditController',
		templateUrl: '/edit.html'
	});
});