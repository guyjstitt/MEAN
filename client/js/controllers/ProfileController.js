app.controller('ProfileController', ['$scope', '$resource', '$routeParams','users', function($scope, $resource, $routeParams, users){
	$scope.user = users;

	var User = $resource("/users/:_id", {_id: $scope.user._id});
	User.get({}, function(data) {
		console.log(data)
	});

	$scope.logout = function() {
		var userLogout = $resource("/profile");
		userLogout.get(function(response) {
			window.location.href = "/profile";
		});
	}
}]);