quizApp
    .controller('NavbarController', ['$scope', 'AuthService', '$window','$rootScope', function($scope, AuthService, $window, $rootScope) {
        function updateUser() {
            $scope.user = JSON.parse($window.localStorage.getItem('userInfo'));
            $scope.isLoggedIn = AuthService.isAuthenticated();
        }
        $scope.logout = function() {
            AuthService.logout();
            updateUser();
        };
        $rootScope.$on('auth:logout', function() {
            $scope.isLoggedIn = false;
            $scope.user = null; // Or however you want to update the user information
        });
        updateUser();
        $scope.$on('loginSuccess', function() {
            updateUser(); // Update user information
        });

    }]);