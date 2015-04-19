var app = angular.module('meetupApp', ['ngResource','ngRoute']);

app.config(function($routeProvider, $locationProvider) {
	$routeProvider.when('/' , {
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
	});
});

app.factory('meetupFactory',['$resource', function($resource) {

	var server = $resource('/api/meetups');

	return {
		save: function(newMeetup) {
			server.save(newMeetup);
		},
		query: function() {
			return server.query();
		}
	};
}]);

// From http://briantford.com/blog/angular-socket-io
app.factory('socketio', ['$rootScope', function ($rootScope) {
        
        var socket = io.connect();
        return {
            on: function (eventName, callback) {
                socket.on(eventName, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        callback.apply(socket, args);
                    });
                });
            },
            emit: function (eventName, data, callback) {
                socket.emit(eventName, data, function () {
                    var args = arguments;
                    $rootScope.$apply(function () {
                        if (callback) {
                            callback.apply(socket, args);
                        }
                    });
                });
            }
        };
    }]);

app.controller('TestController', ['$scope','$resource', function($scope, $resource) {
	var Test = $resource('/api/test');
	Test.query(function(result) {
		console.log(result);
	});
}]);

app.controller('MeetupsController', ['$scope', '$resource', '$routeParams','meetupFactory','socketio', function($scope, $resource, $routeParams, meetupFactory, socketio){
	var Meetup = $resource('/api/meetups');
	
	//list all 
	Meetup.query(function(results){
		$scope.meetups = results;
	});

	socketio.on('meetup', function(msg) {
		$scope.meetups.push(msg);
		console.log(msg);
		console.log($scope.meetups);
	})

	$scope.meetups = []; 	//holds initial list
	$scope.dynamic = []; 	//holds dynamic list
	$scope.users = [];

	$scope.createUser = function(){
		var user = new User();
		user.username = $scope.username;
		user.password = $scope.password;
		user.name = $scope.name;
		user.email = $scope.email;
		user.$save(function	(result){
			$scope.users.push(result);

		});
	}

	$scope.createMeetup = function(){
		var meetup = new Meetup();
		meetup.name = $scope.meetupName;
		meetup.$save(function	(result){
			$scope.meetupName = '';
		});
	}

	$scope.deleteMeetup = function($id, $index) {
		var meetup = $resource('/api/meetups/:_id/delete', {_id:$id});
		meetup.delete({}, 
			function(data) {
			//remove from inital array
			$scope.meetups.splice($index,1);
		}, 
			function(err) {
				console.log(err);
		});
	}

	$scope.editMeetup = function($id, $index) {
		var SingleMeetup = $resource('/api/meetups/:_id/edit');
		
		//get a single meetup
		$scope.single = SingleMeetup.get({_id:$id});

		//assign to indexed array
		$scope.dynamic[$index] = $scope.single;
	}	

	$scope.updateMeetup = function($id, $index) {
		var UpdateMeetup = $resource('/api/meetups/:_id/edit', {_id:$id});

		//update the name of the initial list
		$scope.meetups[$index].name = $scope.dynamic[$index].name;

		//pass the entire object to be updated
		UpdateMeetup.save({_id: $id}, $scope.meetups[$index]);
	}
}]);

