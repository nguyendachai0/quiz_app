var quizApp = angular.module('quizApp', ['ngRoute']);
quizApp.config(['$locationProvider', function($locationProvider) {  
    $locationProvider.hashPrefix('');
}]);
quizApp.config([`$routeProvider`, function ($routeProvider) {
   
    $routeProvider
        .when('/', {
            templateUrl: 'views/subjects/courses.html'
        })
        .when('/login', {
            templateUrl: 'views/auth/login.html'
        })
        .when('/register', {
            templateUrl: 'views/auth/register.html'
        })
        .when('/profile', {
            templateUrl: 'views/auth/profile.html'
        })
        .when('/courses', {
            templateUrl: 'views/subjects/courses.html'
        })
        .when('/course/:courseId', {
            templateUrl: 'views/subjects/course-detail.html',
        })
        
        .when('/about-us', {
            templateUrl: 'views/static/about-us.html'
        })
        .when('/contact', {
            templateUrl: 'views/static/contact.html'
        })
        .when('/course/:courseId/test', {
            templateUrl: 'views/tests/tests.html'
        }) 
        .when('/course/:courseId/test/:testId/quiz/:quizId', {
            templateUrl: 'views/tests/quiz.html'
        }) 
        .when('/assignment-result', {
            templateUrl: 'views/tests/assignment-result.html'
        })
        .when('/q&a', {
            templateUrl: 'views/static/q&a.html'
        })
       
}])

