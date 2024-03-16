quizApp.factory('NavigationService', ['$location', function($location) {
    var navigateService  = {};
    navigateService.navigateToFragment = function(fragment) {
        var currentPath = $location.path();
        var newPath = currentPath.endsWith('/') ? currentPath + fragment : currentPath + '/' + fragment;
        $location.path(newPath).replace();
    };

    return navigateService ;
}]);
