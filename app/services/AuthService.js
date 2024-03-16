quizApp
       .factory('AuthService', ['DataService','$location', '$q', '$rootScope',  'StorageService', function(DataService,$location, $q, $rootScope, StorageService) {
        var authService = {};
        authService.path = 'db/';
        authService.fileName = 'Students';
        authService.getUsers = function() {
            return DataService.getData(authService.path, authService.fileName);
        };      
        authService.login = function(credentials) {
            var deferred = $q.defer();
            authService.getUsers().then(function(users) {
                var user = users.find(u => u.username === credentials.username && u.password === credentials.password);
                if (user) {
                    console.log('User found:', user);
                    var uniqueSessionId = StorageService.generateSessionId();
                    StorageService.setCookie('sessionId', uniqueSessionId, 1);
                    console.log('User object before stringification:', user);
                    StorageService.setItem('userInfo', {
                        username: user.username,
                        fullname: user.fullname,
                        email: user.email,
                        gender: user.gender,
                        birthday: user.birthday,
                        schoolfee: user.schoolfee,
                        marks: user.marks,
                    });
                deferred.resolve({ token: uniqueSessionId });
            } else {
                deferred.reject('Invalid credentials');
            }
        })
        return deferred.promise;
        ;}
        authService.isAuthenticated = function() {
            return !!StorageService.getItem('userInfo');
        };
        authService.logout = function() {
            StorageService.removeItem('userInfo');
            StorageService.removeCookie('sessionId');
            $rootScope.$broadcast('auth:logout');
            $location.path('/login'); 
        };
        return authService;
    }]);

    