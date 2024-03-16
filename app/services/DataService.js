quizApp.factory('DataService', ['$http', function($http) {
    var dataService = {};
    dataService.getData = function(path, fileName) {
        return $http.get(path + fileName + '.js')
            .then(function(response) {
                return response.data;
            })
            .catch(function(error) {
                console.error('Error fetching quiz data:', error);
                throw error; 
            });
    };
    dataService.getDataById = function(data, id) {
               
                var item = data.find(item => item.id === id);
                return item; 
            }

    
    return dataService;
}]);
