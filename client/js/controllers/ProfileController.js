app.controller('ProfileController', ['$scope', '$resource', '$routeParams','users', function($scope, $resource, $routeParams, users){
	$scope.user = users;
	$scope.logout = function() {
		var userLogout = $resource("/profile");
		userLogout.get(function(response) {
			window.location.href = "/profile";
		});
	}
}]);