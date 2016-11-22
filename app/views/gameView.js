'use strict';

angular.module('words.game', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/game', {
            templateUrl: 'views/gameView.html',
            controller: 'GameViewCtrl'
        });
    }]);
