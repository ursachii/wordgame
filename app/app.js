'use strict';

angular.module('words', ['ngRoute', 'words.start', 'words.game', 'words.end', 'ui.bootstrap'])
    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
      $locationProvider.hashPrefix('words');
      $routeProvider.otherwise({redirectTo: '/start'});
    }]);
