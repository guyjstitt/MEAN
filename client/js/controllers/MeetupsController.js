// app.controller('MeetupsController', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams, socketio, Meetups){
// 	//var Meetup = $resource('/api/meetups');
	
// 	//list all 
// 	//Meetup.query(function(results){
// 	//	$scope.meetups = results;
// 	//});

// 	$scope.meetups = Meetups.query();

// 	socketio.on('meetup' , function(msg) {
// 		$scope.meetups.push(msg);
// 	})

// 	$scope.meetups = []; 	//holds initial list
// 	$scope.dynamic = []; 	//holds dynamic list
// 	$scope.users = [];

// 	$scope.createUser = function(){
// 		var user = new User();
// 		user.username = $scope.username;
// 		user.password = $scope.password;
// 		user.name = $scope.name;
// 		user.email = $scope.email;
// 		user.$save(function	(result){
// 			$scope.users.push(result);
// 		});
// 	}

// 	$scope.createMeetup = function(){
// 		var meetup = new Meetup();
// 		meetup.name = $scope.meetupName;
// 		meetup.$save(function	(result){
// 			$scope.meetups.push(result);
// 			$scope.meetupName = '';
// 		});
// 	}

// 	$scope.deleteMeetup = function($id, $index) {
// 		var meetup = $resource('/api/meetups/:_id/delete', {_id:$id});
// 		meetup.delete();

// 		//remove from inital array
// 		$scope.meetups.splice($index,1);
// 	}

// 	$scope.editMeetup = function($id, $index) {
// 		var SingleMeetup = $resource('/api/meetups/:_id/edit');
		
// 		//get a single meetup
// 		$scope.single = SingleMeetup.get({_id:$id});

// 		//assign to indexed array
// 		$scope.dynamic[$index] = $scope.single;
// 	}	

// 	$scope.updateMeetup = function($id, $index) {
// 		var UpdateMeetup = $resource('/api/meetups/:_id/edit', {_id:$id});

// 		//update the name of the initial list
// 		$scope.meetups[$index].name = $scope.dynamic[$index].name;

// 		//pass the entire object to be updated
// 		UpdateMeetup.save({_id: $id}, $scope.meetups[$index]);
// 	}

// 	// From http://briantford.com/blog/angular-socket-io
//     .factory('socketio', ['$rootScope', function ($rootScope) {
//         'use strict';
        
//         var socket = io.connect();
//         return {
//             on: function (eventName, callback) {
//                 socket.on(eventName, function () {
//                     var args = arguments;
//                     $rootScope.$apply(function () {
//                         callback.apply(socket, args);
//                     });
//                 });
//             },
//             emit: function (eventName, data, callback) {
//                 socket.emit(eventName, data, function () {
//                     var args = arguments;
//                     $rootScope.$apply(function () {
//                         if (callback) {
//                             callback.apply(socket, args);
//                         }
//                     });
//                 });
//             }
//         };
//     }]);
// }]);

