app.controller('ProfileController', ['$scope', '$resource', '$routeParams','users', function($scope, $resource, $routeParams, users){
	$scope.user = users;
}]);