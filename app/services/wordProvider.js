'use strict';

angular.module('words.game')
    .factory('wordProvider', function () {

        function getWords() {
            return [
                {answer: "pizza", word: "zzaip"},
                {answer: "door", word: "oodr"},
                {answer: "car", word: "rac"},
                {answer: "answer", word: "rewans"},
                {answer: "bus", word: "ubs"},
                {answer: "words", word: "sword"}
            ]
        }

        return {
            getWords: getWords
        }
    });