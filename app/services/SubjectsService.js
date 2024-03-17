quizApp
    .factory('SubjectsService', ['DataService', function(DataService) {
        var subjectService = {};
            subjectService.path = 'backend-api/db/';
            subjectService.fileName = 'Subjects';
            subjectService.getSubjects = function() {
                    return DataService.getData(subjectService.path, subjectService.fileName);
                };      
                console.log(subjectService.getSubjects());
            subjectService.getSubjectById = function(id) {
                return subjectService.getSubjects().then(function(data) {
                    var subject = data.find(function(subject) {
                        return subject.Id === id;
                    });
                    return subject;
                }).catch(function(error) {
                    console.error('Error fetching subject by ID:', error);
                    throw error; 
                });
            }
            return subjectService;
        }   
    ]);