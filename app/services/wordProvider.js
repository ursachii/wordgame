'use strict';

angular.module('words.game')
    .factory('wordProvider', ['$http', function ($http) {
        var RESOURCE_URL = 'https://words-8f15f.firebaseio.com/words.json';

        function getWords() {
            //TODO - get only a list of correct words and dynamically mix and scramble them
            return $http.get(RESOURCE_URL);
        }

        return {
            getWords: getWords
        }
    }]);