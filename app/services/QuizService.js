quizApp.factory('QuizService', ['DataService','NavigationService', function(DataService, NavigateService) {
    var quizService = {};
     quizService.path = 'backend-api//db/Quizs/';
    quizService.getQuizQuestions = function(courseId) {
        return DataService.getData(quizService.path, courseId);     
    };
    quizService.getTests = function(quizzes){
            var tests = [];
            for (var i = 0; i < quizzes.length; i += 10) {
                tests.push(quizzes.slice(i, i + 10));
            }
            return tests;
        }
    quizService.getQuizQuestion = function(quizzes, quizId){
        return quizzes[quizId];
    }
    quizService.navigateToQuiz = function() {
        NavigateService.navigateToFragment('quiz');
    };
    return quizService;
}]);
