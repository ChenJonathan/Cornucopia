/**
 * Created by kevin on 9/24/2016.
 */
var url = 'mongodb://heroku_pmrvv2vc:kbp43neuv3gnkt8br4skdq3a41@ds037145.mlab.com:37145/heroku_pmrvv2vc';

describe('Post recipe', function() {
    it('should return success after adding new recipe', function(done) {
        var request = require('supertest');
        var recipe = {
            "ingredients" : [
                {
                    "flour" : "2 cups",
                    "sugar" : "1 cup",
                    "butter" : "1 stick",
                    "eggs" : "four"
                },
            ],
            "name" : "Manhattan Cake",
            "author" : "John",
            "instructions" : [
                {
                    "prep" : "stuff",
                    "cooking" : "cook",
                    "serve" : "lightly incinerated"
                },
            ],
            "name" : "Chen",
            "rating" : 1
        };

        request(url)
            .post('/api/recipe')

            .end(function(err, res) {
                if (err) {
                    throw err;
                }
                res.should.have.property('status', 201);
                done();
            });
    });
});