'use strict';

angular.module('words.end', ['ngRoute'])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/end', {
            templateUrl: 'views/endView.html',
            controller: 'EndViewCtrl'
        });
    }]);