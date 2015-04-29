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

app.controller('MeetupsController', ['$scope', '$resource', '$routeParams','socketio', 'users', function($scope, $resource, $routeParams, socketio, users){
	var Meetup = $resource('/api/meetups');
	var Users = $resource('/users/:_id')
	var meetup = new Meetup();

	$scope.userIds = [];
	$scope.attendance = [];
	$scope.userIdsByIndex = [];
	$scope.userInfo = [];
	$scope.userInfoHolder = [];
	$scope.user = users;
	$scope.user.events = [];
	//list all 
	Meetup.query({})
	.$promise.then(function(results) {
		$scope.meetups = results;
	});

	//add meetup to array when added to db
	socketio.on('meetup', function(msg) {
		$scope.meetups.push(msg);
	});

	socketio.on('attend', function(res) {
		for (var i = 0; i < $scope.meetups.length; i++) {
			if ($scope.meetups[i]._id == res.meetupId) {
				$scope.meetups[i].attend.push(res);
			}
		};
	});

	socketio.on('unattend', function(res) {
		for (var i = 0; i < $scope.meetups.length; i++) {
			if ($scope.meetups[i]._id == res.meetupId) {
				for (var index = 0; index < $scope.meetups[i].attend.length; index++) {
					if ($scope.meetups[i].attend[index].userId == res.userId) {
						$scope.meetups[i].attend.splice(index, 1);
					}
				};
			}
		};
	});

	//delete meetup from array when deleted from db
	socketio.on('deleteMeetup', function(meetup) {
		for (var i = 0; i < $scope.meetups.length; i++) {
			if($scope.meetups[i]._id == meetup._id) {
				$scope.meetups.splice(i,1);
			} 
		};

	});

	$scope.meetups = []; 	//holds initial list

	$scope.createMeetup = function(){
		meetup.name = $scope.meetupName;
		meetup.dek = $scope.meetupDek;
		meetup.user = $scope.user;

		meetup.$save(function	(result){
			$scope.meetupName = '';
			$scope.meetupDek = '';

		});
		Users.save({_id: $scope.user._id}, $scope.user, $scope.user.events.push({eventName: meetup.name, eventDek: meetup.dek}));
	}

	$scope.deleteMeetup = function($id, $index) {
		var meetup = $resource('/api/meetups/:_id/delete', {_id:$id});
		meetup.delete({}, 
			function(data) {
			//deleted on emit deletedMeetup
		}, 
			function(err) {
				alert('Event could not be deleted!')
		});
	}

	$scope.editMeetup = function($id, $index) {
		var SingleMeetup = $resource('/api/meetups/:_id/edit');
		
		//get a single meetup
		$scope.single = SingleMeetup.get({_id:$id});
	}	

	$scope.updateMeetup = function($id, $index) {
		var UpdateMeetup = $resource('/api/meetups/:_id/edit', {_id:$id});

		//pass the entire object to be updated
		UpdateMeetup.save({_id: $id}, $scope.meetups[$index]);
	}

	$scope.attendEvent = function($index, $id) {
		var UpdateMeetup = $resource('/api/meetups/:_id/attend', {_id:$id});
		var userName = $scope.user.name;
		var userId = $scope.user._id;
		var userExists = false;
		var meetupId = $scope.meetups[$index]._id;

		for (var i = 0; i < $scope.meetups[$index].attend.length; i++) {
			if($scope.meetups[$index].attend[i].userId == userId) {
				userExists = true;
			}
		}
		
		if(!(userExists)) {
			//pass the entire object to be updated
			UpdateMeetup.save({_id: $id, meetupId: meetupId}, $scope.user, function(data) {

			});
		} else {
			alert("You are already attending this event.");
		}

	}

	$scope.unattendEvent = function($index, $id) {
		var UpdateMeetup = $resource('/api/meetups/:_id/attend', {_id:$id});
		var userId = $scope.user._id;
		var attendeeIndex;

		UpdateMeetup.delete({_id: $id, userId: userId}, function(data) {
			//handled in unattend event 
		});

	}
}]);

