app.controller('ProfileController', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams){

	$scope.logout = function() {
		var userLogout = $resource("/profile");
		userLogout.get(function(response) {
			window.location.href = "/profile";
		});
	}
}]);