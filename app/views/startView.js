'use strict';

angular.module('words.start', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/start', {
            templateUrl: 'views/startView.html',
            controller: 'StartViewCtrl'
        });
    }]);