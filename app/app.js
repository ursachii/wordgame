'use strict';

angular.module('words', ['ngRoute', 'words-timer', 'focus-if'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {

        $locationProvider.hashPrefix('words');
        $routeProvider.otherwise({redirectTo: '/start'});

        $routeProvider.when('/start', {
            templateUrl: 'views/startView.html',
            controller: 'StartViewCtrl'
        });
        $routeProvider.when('/game', {
            templateUrl: 'views/gameView.html',
            controller: 'GameViewCtrl'
        });
        $routeProvider.when('/end', {
            templateUrl: 'views/endView.html',
            controller: 'EndViewCtrl'
        });
        $routeProvider.when('/scores', {
            templateUrl: 'views/scoresView.html',
            controller: 'HighScoresCtrl'
        });

    }]);
