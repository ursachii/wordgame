'use strict';

angular.module('words.game')
    .controller('GameViewCtrl', ['$scope', '$rootScope', '$timeout', '$location', 'wordProvider',
        function ($scope, $rootScope, $timeout, $location, wordProvider) {

            wordProvider.getWords().then(function (response) {
                startGame(response);
            });

            $rootScope.$on('timerDoneEvent', function () {
                stopGame();
            });

            function startGame(response) {
                var words = response.data.sort(function () {
                    return (Math.round(Math.random()) - 0.5);
                });
                $scope.game = new Game(words);
                $scope.game.start();
                $scope.$watch('game.solution', function (newVal, oldVal) {
                    $scope.game.onSolutionChanged(oldVal, newVal);
                });
            }

            function stopGame() {
                $scope.game.stop();
                $rootScope.currentScore = $scope.game.totalScore;
                $location.path('/end');
            }

            function Game(words) {
                this.solution = "";
                this.currentWordScore = 0;
                this.currentWordIndex = 0;
                this.totalScore = 0;

                this.start = function () {
                    this.currentWordIndex = 0;
                };

                this.stop = function () {
                    this.updateScore();
                };

                this.currentWord = function () {
                    return words[this.currentWordIndex];
                };

                this.letterMatched = function (newVal) {
                    var index = newVal.length - 1;
                    return this.currentWord().answer[index] == newVal[index];
                };

                this.isWordChangedUpdate = function (oldVal, newVal) {
                    return this.currentWordIndex > 0 && newVal.length == 0 && words[this.currentWordIndex - 1].answer == oldVal;
                };

                this.scoreDiff = function (oldVal, newVal, letterScore) {
                    if (this.isWordChangedUpdate(oldVal, newVal)) {
                        return 0;
                    }
                    if (oldVal.length >= newVal.length) {
                        return newVal.length - oldVal.length;
                    }

                    if (this.letterMatched(newVal)) {
                        return letterScore;
                    }
                    return 0;
                };

                this.updateScore = function () {
                    if (this.currentWordScore < 0) {
                        this.currentWordScore = 0;
                    }
                    this.currentWordScore = Math.floor(this.currentWordScore);
                    this.totalScore += this.currentWordScore;
                };

                this.nextWord = function () {
                    this.solution = "";
                    this.currentWordIndex++;
                    this.currentWordScore = 0;
                };

                this.onSolutionChanged = function (oldVal, newVal) {
                    var letterScore = Math.floor(Math.pow(1.95, this.currentWord().word.length / 3)) / this.currentWord().word.length;
                    this.currentWordScore += this.scoreDiff(oldVal, newVal, letterScore);
                    if (this.currentWord().answer == newVal) {
                        this.updateScore();
                        this.nextWord();
                    }
                }
            }

        }]);
