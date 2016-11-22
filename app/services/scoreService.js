'use strict';

angular.module('words')
    .factory('scoreService', function () {

        var scores = [];

        function pushNewScore(user, score) {
            scores.push({
                user: user,
                score: score
            });
        }

        function fetchScore(user) {
            var score = 0;
            scores.forEach(function (item) {
                if (item.user == user) {
                    score = item.score;
                }
            });
            return score;
        }

        return {
            pushNewScore: pushNewScore,
            fetchScore: fetchScore
        }
    });