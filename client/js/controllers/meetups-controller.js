app.controller('meetupsController', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams){
	var Meetup = $resource('/api/meetups');
	var User = $resource('/api/users');
	
	Meetup.query(function	(results){
		$scope.meetups = results;
	});

	$scope.users = []

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
	
	$scope.meetups = []

	$scope.createMeetup = function(){
		var meetup = new Meetup();
		meetup.name = $scope.meetupName;
		meetup.$save(function	(result){
			$scope.meetups.push(result);
			$scope.meetupName = '';
		});

	}
	$scope.deleteMeetup = function($id, $index) {
		var meetup = $resource('/api/meetups/:_id/delete', {_id:$id});
		meetup.delete();
		$scope.meetups.splice($index,1);
	}

	$scope.editMeetup = function($id) {
		var Meetup = $resource('/api/meetups/:_id/edit', {_id:$id});
		var res = Meetup.get();
		console.log(res);
	}
}]);

