

angular.module('quizApp').controller('AdminSubjectsController', ['$scope','$http', 'AdminSubjectsService', function($scope,  $http, AdminSubjectsService) {
    $scope.subjects = [];
    $scope.newSubject = {};
    $scope.isEditing = false;
    $scope.currentEditingId = null;

    const loadSubjects = () => {
        AdminSubjectsService.getAllSubjects().then(subjects => {
            $scope.subjects = subjects;
        });
    };
    $scope.addSubject = function() {
        var formData = new FormData();
        formData.append('Id', $scope.newSubject.Id);
        formData.append('Name', $scope.newSubject.Name);
        formData.set('Logo', $scope.newSubject.Logo); 
        console.log(formData);
        $http.post('http://localhost:3000/api/subjects', formData, {
        headers: {
            'Content-Type': undefined 
        }
    }).then(function(response) {
        console.log('Subject added successfully', response);
        $scope.newSubject = {}; 
    }, function(error) {
        console.error('Error adding subject', error);
    });
    };
    
    $scope.resetForm = function() {
        $scope.isEditing = false;
        $scope.currentEditingId = null;
        $scope.newCourse = {};
    };

    loadSubjects();
}]);
