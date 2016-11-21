'use strict';

// Declare app level module which depends on views, and components
angular.module('words', [
  'ngRoute',
  'words.start'
]).
config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
  $locationProvider.hashPrefix('words');

  $routeProvider.otherwise({redirectTo: '/start'});
}]);
