quizApp.controller('QuizController', ['$scope', 'QuizService', '$routeParams','$location', function($scope, QuizService, $routeParams,$location ) {
    $scope.quizQuestions = [];
    $scope.courseId = $routeParams.courseId; 
    $scope.quizId = $routeParams.quizId;
    $scope.testId = $routeParams.testId;
    QuizService.getQuizQuestions($scope.courseId).then(function(data) {
       $scope.quizQuestions = data;
       $scope.tests = QuizService.getTests(data);
       $scope.quiz = $scope.tests[$scope.testId][$scope.quizId];
       console.log($scope.quiz)
       console.log($scope.tests);
    });
   
    
}]);
