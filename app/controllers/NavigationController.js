quizApp.controller('NavigationController', ['$scope', 'NavigationService', function($scope, NavigationService) {
    $scope.navigateTo = function(fragment) {
        NavigationService.navigateToFragment(fragment);
    };
}]);