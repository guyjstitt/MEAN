var app = angular.module('meetupApp', ['ngResource','ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(true);
	$routeProvider.when('/', {
		controller: 'RedirectController',
		templateUrl: '/test.html'
	})
	.when('/home' , {
		controller: 'MeetupsController',
		templateUrl: '/home.html'
	})
	.when('/:_id/edit', {
		controller: 'EditController',
		templateUrl: '/edit.html'
	})
	.when('/test', {
		controller: 'TestController',
		templateUrl: '/test.html'
	})
	.when('/login', {
		controller: 'UserController',
		templateUrl: '/login.html'
	});
});
