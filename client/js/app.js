var app = angular.module('meetupApp', ['ngResource','ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', {
		controller: 'MeetupsController',
		templateUrl: 'home.html'
	})
	.when('/:_id/edit', {
		controller: 'EditController',
		templateUrl: 'edit.html'
	})
	.when('/my-events', {
		controller: 'MeetupsController',
		templateUrl: '/my-events.html'
	})
	.when('/login', {
		controller: 'UserController',
		templateUrl: 'login.html'
	}).
	when('/profile', {
		controller: "ProfileController",
		templateUrl: "profile.html"
	})
	.when('/register', {
		controller: 'UserController',
		templateUrl: 'register.html'
	});
});

