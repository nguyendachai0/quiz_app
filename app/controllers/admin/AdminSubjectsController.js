

angular.module('quizApp').controller('AdminSubjectsController', ['$scope','$http','$routeParams', 'AdminSubjectsService', 'NavigationService', function($scope,  $http,$routeParams, AdminSubjectsService, NavigationService) {
    $scope.subjects = [];
    $scope.subject = {};
    $scope.id = $routeParams.id;
    $scope.isEditing = false;
    $scope.currentEditingId = null;

    const loadSubjects = () => {
        AdminSubjectsService.getAllSubjects().then(subjects => {
            $scope.subjects = subjects;
        });
    };
    $scope.isEditing = ($routeParams.id !== undefined);
    if ($scope.isEditing) {
     AdminSubjectsService.getSubjectById($scope.id).then(function(data) {
        $scope.subject = data;
    });
      
    }
    $scope.addSubject = function() {
        let formData = new FormData();
        formData.append('Id', $scope.subject.Id);
        formData.append('Name', $scope.subject.Name);
        formData.set('Logo', $scope.subject.Logo); 
        console.log(formData);
        $http.post('http://localhost:3000/api/subjects', formData, {
        headers: {
            'Content-Type': undefined 
        }
    }).then(function(response) {
        console.log('Subject added successfully', response);
        $scope.subject = {}; 
    }, function(error) {
        console.error('Error adding subject', error);
    });
    };
    $scope.updateSubject = function() {
        let formData = new FormData();
        console.log($scope.subject);
        formData.append('Id', $scope.subject.Id);
        formData.append('Name', $scope.subject.Name);
        // formData.set('Logo', $scope.subject.Logo); 
        if ($scope.subject.Logo) {
            formData.append('Logo', $scope.subject.Logo);
        }
        console.log(formData);
        $http.put('http://localhost:3000/api/subjects/' + $scope.id, formData, {
        headers: {
            transformRequest: angular.identity,
            'Content-Type': undefined 
        }
    }).then(function(response) {
        console.log('Subject added successfully', response);
        $scope.subject = {}; 
    }, function(error) {
        console.error('Error adding subject', error);
    });
    };
    $scope.deleteSubject = function(subjectId) {
        const isConfirmed = confirm('Are you sure you want to delete this subject?');
        if (!isConfirmed) {
            return;
        }
        $http.delete('http://localhost:3000/api/subjects/' + subjectId)
            .then(function(response) {
                console.log('Subject deleted successfully', response);
                loadSubjects();
            }, function(error) {
                console.error('Error deleting subject', error);
            });
    };
    $scope.navigateToEdit = function(subjectId){
        AdminSubjectsService.navigateToEdit(subjectId); 
    }
    
    $scope.resetForm = function() {
        $scope.isEditing = false;
        $scope.currentEditingId = null;
        $scope.subject = {};
    };

    loadSubjects();
}]);
