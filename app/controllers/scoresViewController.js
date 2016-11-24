'use strict';

angular.module('words.highscores')
    .controller('HighScoresCtrl', ['$scope', '$rootScope', 'scoreService',
        function ($scope, $rootScope, scoreService) {
            scoreService.fetchHighScores().then(function (response) {
                $scope.scores = response.data;
            })
        }]);