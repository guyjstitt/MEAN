app.controller('UserController', ['$scope', '$resource', '$routeParams', 'users', function($scope, $resource, $routeParams, users){
	$scope.user = users;
	$scope.logout = function() {
		var userLogout = $resource("/logout");
		userLogout.get(function(response) {
			window.location.href = "/login";
		});
	}
}]);