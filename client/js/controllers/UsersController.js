app.controller('UserController', ['$scope', '$resource', '$routeParams', function($scope, $resource, $routeParams){
	var User = $resource('/api/users');

	$scope.users = [];

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
}]);