angular.module('quizApp').service('AdminSubjectsService', ['$http', 'DataService', 'NavigationService','$location', function($http, DataService, NavigationService, $location) {

    var adminSubject = {};
    adminSubject.path = 'backend-api/db/';
    adminSubject.fileName = 'Subjects';
    adminSubject.getAllSubjects = function() {
            return DataService.getData(adminSubject.path, adminSubject.fileName);
        };      
        adminSubject.addSubject = function(subject) {
          return  $http.post('http://localhost:3000/api/subjects', subject).then(function(response){
                console.log('Subjects:', response.data);
            })
            .catch(function(error) {
                console.error('Error fetching subjects:', error);
            });
        };
        adminSubject.getSubjectById = function(id) {
            return adminSubject.getAllSubjects().then(function(data) {  
                var subject = data.find(function(subject) {
                    return subject.Id === id;
                });
                return subject;
            }).catch(function(error) {
                console.error('Error fetching subject by ID:', error);
                throw error; 
            });
        }
    

    adminSubject.updateCourse = function(id, course) {
        return $http.put(`/api/courses/${id}`, course);
    };

    adminSubject.deleteCourse = function(id) {
        return $http.delete(`/api/courses/${id}`);
    };
    adminSubject.navigateToEdit = function(fragment){
        let currentPath = $location.path();
        let newPath;
        console.log(fragment);
        if (currentPath.includes('edit/')) {
            newPath = currentPath.replace(/edit\/\w+/, 'edit/' + fragment);
            console.log(newPath);
        } else {
            newPath = currentPath.endsWith('/') ? currentPath + fragment : currentPath + '/edit/' + fragment;
        }
        $location.path(newPath).replace();
    } 
    return adminSubject;
}]);
