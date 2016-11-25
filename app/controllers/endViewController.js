'use strict';

angular.module('words')
    .controller('EndViewCtrl', ['$scope', '$rootScope', '$location', 'scoreService',
        function ($scope, $rootScope, $location, scoreService) {
            if($rootScope.username == undefined){
                $location.path('/start');//TODO - global routing rules?
                return;
            }
            $scope.username = $rootScope.username;
            $scope.score = $rootScope.currentScore;
            scoreService.pushNewScore($scope.username, $scope.score);
        }]);