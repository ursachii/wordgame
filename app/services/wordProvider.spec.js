describe('Words Provider', function () {

    var wordProvider;

    beforeEach(angular.mock.module('words'));
    beforeEach(inject(function (_wordProvider_) {
        wordProvider = _wordProvider_;
    }));

    it('should exist', function () {
        expect(wordProvider).toBeDefined();
    });

    describe('.getWords', function() {
        it('should exist', function() {
            expect(wordProvider.getWords).toBeDefined();
        });
        it('should return a non empty list of words', inject(function($httpBackend) {
            wordProvider.getWords().then(function (response) {
                var words = response.data;
                expect(words).toEqual([
                    {answer: "pizza", word: "zzaip"},
                    {answer: "door", word: "oodr"}
                ]);
            });
            $httpBackend
                .when('GET', 'https://words-8f15f.firebaseio.com/words.json')
                .respond(200, [
                    {answer: "pizza", word: "zzaip"},
                    {answer: "door", word: "oodr"}
                ]);

            $httpBackend.flush();
        }))
    });
});