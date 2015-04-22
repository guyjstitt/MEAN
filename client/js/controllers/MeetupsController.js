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

app.controller('RegisterController', ['$scope','$resource', function($scope, $resource) {

}]);


app.controller('MeetupsController', ['$scope', '$resource', '$routeParams','meetupFactory','socketio', 'users', function($scope, $resource, $routeParams, meetupFactory, socketio, users){
	var Meetup = $resource('/api/meetups');
	var Users = $resource('/users/:_id')
	var meetup = new Meetup();

	/*
	script userData = !{JSON.stringify(user)}
 	script if(user) { data = userData } }
 	script if(data) { sessionStorage.setItem('user', data) }
  	script if(sessionStorage.getItem('user')) { userInfo = JSON.parse(sessionStorage.getItem('user')); }
  	script if(userInfo) { userId = userInfo._id; }
  	*/

  	if(users == false) {
  		window.location.href = "/login";
  	} else {
  		$scope.users = users;
  	}


	$scope.userIds = [];
	$scope.attendance = [];
	$scope.userIdsByIndex = [];
	$scope.userInfo = [];
	$scope.userInfoHolder = [];
	//list all 
	Meetup.query({})
	.$promise.then(function(results) {
		$scope.meetups = results;
		// for (var i = 0; i < results.length; i++) {
		// 	$scope.result = results[i];
		// 	$scope.resultIndex = i;
		// 	$scope.attendees = [];
		// 	for (var iTwo = 0; iTwo < $scope.result.attend.length; iTwo++) {
		// 		var attendeeId = $scope.result.attend[iTwo];
		// 		var attendanceLength = $scope.result.attend.length -1;
		// 		$scope.attendance.push({"eventId": $scope.result._id ,"userId":attendeeId,'userName':""});
		// 	};
		// };
		// for (var loopIndex = 0; loopIndex < $scope.attendance.length; loopIndex++) {
		// 	var id = $scope.attendance[loopIndex].userId;
		// 	Users.get({_id: id}, function(data) {
		// 		$scope.userInfoHolder.push({"_id": data._id,"userName":data.name});
		// 		var searchTerm = data._id,
		// 	    index = -1;
		// 		for(var i = 0, len = $scope.attendance.length; i < len; i++) {
		// 		    if ($scope.attendance[i].userId === searchTerm) {
		// 		        index = i;
		// 		        $scope.attendance[index].userName = $scope.userInfoHolder[index].userName;
		// 		        console.log('check')
		// 		    }
		// 		}

		// 		for (var i = 0; i < $scope.meetups.length; i++) {
		// 			var eventId = $scope.meetups[i]._id;
		// 			$scope.meetups[i].attendees = [];
		// 			for (var iTwo = 0; iTwo < $scope.attendance.length; iTwo++) {
		// 				if($scope.attendance[iTwo].eventId == eventId) {
		// 					$scope.meetups[i].attendees[iTwo] = $scope.attendance[iTwo].userName;
		// 				}
		// 			};
		// 		};
		// 	});
		// }
		// console.log('check')
	});

	console.log('check');
	socketio.on('meetup', function(msg) {
		$scope.meetups.push(msg);
		console.log(msg);
		console.log($scope.meetups);
	})

	$scope.meetups = []; 	//holds initial list
	$scope.dynamic = []; 	//holds dynamic list
	//$scope.userId = userId;
	//$scope.user = user;

	$scope.createMeetup = function(){
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

	$scope.attendEvent = function($index, $id) {
		var UpdateMeetup = $resource('/api/meetups/:_id/attend', {_id:$id});
		console.log($scope.users)
		//pass the entire object to be updated
		UpdateMeetup.save({_id: $id}, $scope.users);

	}
}]);

