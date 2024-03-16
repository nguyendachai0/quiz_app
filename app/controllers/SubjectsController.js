quizApp
    .controller('SubjectsController', ['$scope', 'SubjectsService', function ($scope, SubjectsService) {
        $scope.subjects = [];
        SubjectsService.getSubjects().then(function(data) {
            $scope.subjects = data;
        });
       
    }]);