angular.module('words')
    .directive('wrdTimer', ['$timeout', function ($timeout) {

        var controller = ['$scope', '$rootScope', function ($scope, $rootScope) {
            $scope.counter = $scope.timeout;
            $scope.type = 'success';
            $scope.onTimeout = function () {
                if ($scope.counter < 10) {
                    $scope.type = 'danger';
                }
                if ($scope.counter <= 0) {
                    $rootScope.$broadcast('timerDoneEvent');
                } else {
                    $scope.counter -= 0.1;
                    $scope.timer = $timeout($scope.onTimeout, 100);
                }
            };

            $scope.timer = $timeout($scope.onTimeout, 100);
        }];

        return {
            restrict: 'E',
            scope: {
                timeout: '=timeout'
            },
            templateUrl: 'directives/timer.html',
            controller: controller
        };
    }]);