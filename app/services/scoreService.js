'use strict';

angular.module('words')
    .factory('scoreService', ['$http', function ($http) {
        var RESOURCE_URL = 'https://words-8f15f.firebaseio.com/highscores.json';

        function fetchHighScores() {
            return $http.get(RESOURCE_URL);
        }

        function putHighScores(scores) {
            $http.put(RESOURCE_URL, scores);
        }

        function pushNewScore(user, score) {
            fetchHighScores().then(function (response) {
                var scores = computeNewBoard(response, score, user);
                putHighScores(scores);//TODO - update only if high scores changed
            });
        }

        function computeNewBoard(response, score, user) {
            var scores = response.data == undefined ? [] : response.data;
            scores.sort(function (left, right) {
                return right.score - left.score;
            });

            if (score > scores[0].score) {
                scores.splice(0, 0, {"user": user, "score": score})
            }
            for (var i = 0; i < scores.length - 1; i++) {
                if (scores[i].score > score > scores[i + 1].score) {
                    scores.splice(i + 1, 0, {"user": user, "score": score})
                }
            }
            scores = scores.slice(0, 10);
            return scores;
        }

        return {
            pushNewScore: pushNewScore,
            fetchHighScores: fetchHighScores
        }
    }]);