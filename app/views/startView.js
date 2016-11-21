'use strict';

angular.module('words.start', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/start', {
    templateUrl: 'views/startView.html',
    controller: 'StartViewCtrl'
  });
}]).controller('StartViewCtrl', ['$scope', '$rootScope', '$location',
  function ($scope, $rootScope, $location) {
    $scope.username = "Your name";
    $scope.submit = function () {
      //todo - is using root scope bad practice?
      //todo - use a service (kind of hacky) or some kind of angular storage module (overhead) instead?
      $rootScope.username = $scope.username;
      $location.path("/game");
    }
}]);