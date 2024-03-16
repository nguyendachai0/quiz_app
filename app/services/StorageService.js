
quizApp.factory('StorageService', ['$window', function($window) {
    return {
        setItem: function(key, value) {
            $window.localStorage.setItem(key, JSON.stringify(value));
        },
        getItem: function(key) {
            return JSON.parse($window.localStorage.getItem(key));
        },
        removeItem: function(key) {
            $window.localStorage.removeItem(key);
        },
        setCookie: function(name, value, days) {
            let date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/`;
        },
        removeCookie: function(name) {
            document.cookie = `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
        },
        generateSessionId: function() {
            const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
            let sessionId = '';
            for (let i = 0; i < 16; i++) {
                sessionId += chars.charAt(Math.floor(Math.random() * chars.length));
            }
            return sessionId;
        }
    };
}])
