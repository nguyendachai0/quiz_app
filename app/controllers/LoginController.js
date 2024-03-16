quizApp.controller('LoginController', ['$scope','$rootScope', 'AuthService', '$location', function($scope, $rootScope, AuthService, $location) {
    $scope.credentials = {
        username: '',
        password: ''
    };

    $scope.login = function() {
        AuthService.login($scope.credentials).then(function(data) {
            $rootScope.$broadcast('loginSuccess');
            $location.path('/profile');
        }, function(error) {
            alert('Login failed: ' + error); 
        });
    };
}]);
