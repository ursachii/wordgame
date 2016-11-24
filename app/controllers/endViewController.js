'use strict';

angular.module('words.end')
    .controller('EndViewCtrl', ['$scope', '$rootScope', 'scoreService',
        function ($scope, $rootScope, scoreService) {
            $scope.username = $rootScope.username;
            $scope.score = $rootScope.currentScore;
            scoreService.pushNewScore($scope.username, $scope.score);
        }]);