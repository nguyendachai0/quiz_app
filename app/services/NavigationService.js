quizApp.factory('NavigationService', ['$location', function($location) {
    var navigateService  = {};
    navigateService.navigateToFragment = function(fragment) {
        var currentPath = $location.path();
        var newPath = currentPath.endsWith('/') ? currentPath + fragment : currentPath + '/' + fragment;
        $location.path(newPath).replace();
    };
    navigateService.isAdminRoute = function() {
        var pathSegments = $location.path().split('/').filter(Boolean); 
        console.log(pathSegments);
        return  pathSegments[0] === 'admin';
    };

    return navigateService ;
}]);
