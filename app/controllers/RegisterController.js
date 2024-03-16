
angular.module('quizApp')
    .controller('RegisterController', ['$scope', 'AuthService', '$location', function($scope, AuthService, $location) {
        $scope.user = {
            username: '',
            password: ''
        };
        $scope.register = function() {
            AuthService.register($scope.user).then(function(data) {
                $location.path('/profile');
            }, function(error) {
                alert('Registration failed: ' + error); 
            });
        };
    }]);
