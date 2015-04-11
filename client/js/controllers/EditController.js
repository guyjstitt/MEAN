app.controller('EditController', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams){
	var Meetup = $resource('/api/meetups/:_id/edit');
	
	$scope.meetup = Meetup.get({_id:$routeParams._id});
	console.log($scope.meetup);
	$scope.meetupId = $routeParams._id;
	console.log("route params " + $routeParams._id);
}]);

