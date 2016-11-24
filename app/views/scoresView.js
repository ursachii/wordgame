'use strict';

angular.module('words.highscores', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/scores', {
            templateUrl: 'views/scoresView.html',
            controller: 'HighScoresCtrl'
        });
    }]);