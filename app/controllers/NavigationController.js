quizApp.controller('NavigationController', ['$scope', 'NavigationService', function($scope, NavigationService) {
    $scope.navigateTo = function(fragment) {
        NavigationService.navigateToFragment(fragment);
    };
    $scope.isAdmin = NavigationService.isAdminRoute();
    console.log($scope.isAdmin);
}]);