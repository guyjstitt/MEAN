app.controller('UserController', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams){

	$scope.logout = function() {
		var userLogout = $resource("/logout");
		userLogout.get(function(response) {
			window.location.href = "/login";
		});
	}
}]);