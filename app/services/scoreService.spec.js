describe('Score Service', function () {

    var scoreService;

    beforeEach(angular.mock.module('words'));
    beforeEach(inject(function (_scoreService_) {
        scoreService = _scoreService_;
    }));

    it('should exist', function () {
        expect(scoreService).toBeDefined();
    });

    describe('.fetchHighScores', function () {
        it('should exist', function () {
            expect(scoreService.fetchHighScores).toBeDefined();
        });
        it('should return a non empty list of scores', inject(function ($httpBackend) {
            scoreService.fetchHighScores().then(function (response) {
                var scores = response.data;
                expect(scores).toEqual([
                    {user: "user1", score: "10"},
                    {answer: "user2", word: "9"}
                ]);
            });
            $httpBackend
                .when('GET', 'https://words-8f15f.firebaseio.com/highscores.json')
                .respond(200, [
                    {user: "user1", score: "10"},
                    {answer: "user2", word: "9"}
                ]);

            $httpBackend.flush();
        }))
    });

    describe('.pushNewScore', function () {

        it('should exist', function () {
            expect(scoreService.pushNewScore).toBeDefined();
        });

        it('should push new high score', inject(function ($httpBackend) {
            scoreService.pushNewScore("newUser", 15);
            $httpBackend
                .when('GET', 'https://words-8f15f.firebaseio.com/highscores.json')
                .respond(200,
                    [
                        {user: "user1", score: 11},
                        {user: "user2", score: 10},
                        {user: "user3", score: 9},
                        {user: "user4", score: 8},
                        {user: "user5", score: 7},
                        {user: "user6", score: 6},
                        {user: "user7", score: 5},
                        {user: "user8", score: 4},
                        {user: "user9", score: 3},
                        {user: "user10", score: 2}
                    ]);
            $httpBackend
                .expect('PUT', 'https://words-8f15f.firebaseio.com/highscores.json',
                    [
                        {user: "newUser", score: 15},
                        {user: "user1", score: 11},
                        {user: "user2", score: 10},
                        {user: "user3", score: 9},
                        {user: "user4", score: 8},
                        {user: "user5", score: 7},
                        {user: "user6", score: 6},
                        {user: "user7", score: 5},
                        {user: "user8", score: 4},
                        {user: "user9", score: 3}
                    ]).respond(200, []);

            $httpBackend.flush();
        }));

        it('should update second place', inject(function ($httpBackend) {
            scoreService.pushNewScore("newUser", 11);
            $httpBackend
                .when('GET', 'https://words-8f15f.firebaseio.com/highscores.json')
                .respond(200,
                    [
                        {user: "user1", score: 12},
                        {user: "user2", score: 10},
                        {user: "user3", score: 9},
                        {user: "user4", score: 8},
                        {user: "user5", score: 7},
                        {user: "user6", score: 6},
                        {user: "user7", score: 5},
                        {user: "user8", score: 4},
                        {user: "user9", score: 3},
                        {user: "user10", score: 2}
                    ]);
            $httpBackend
                .expect('PUT', 'https://words-8f15f.firebaseio.com/highscores.json',
                    [
                        {user: "user1", score: 12},
                        {user: "newUser", score: 11},
                        {user: "user2", score: 10},
                        {user: "user3", score: 9},
                        {user: "user4", score: 8},
                        {user: "user5", score: 7},
                        {user: "user6", score: 6},
                        {user: "user7", score: 5},
                        {user: "user8", score: 4},
                        {user: "user9", score: 3}
                    ]).respond(200, []);

            $httpBackend.flush();
        }));
    });
});